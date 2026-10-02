/**
 * Acesso aos dados (Supabase) e agregação numa "View" única,
 * usada tanto pela aba Por Evento (1 evento) como pela aba Acumulado (vários).
 */
import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Client = Tables<"clients">;
export type EventRow = Tables<"events">;
export type Metrics = Tables<"event_metrics">;
export type LocationRow = Tables<"event_locations">;
export type BadgeRow = Tables<"badges">;

export type AllData = {
  clients: Client[];
  events: EventRow[];
  metrics: Metrics[];
  locations: LocationRow[];
  badges: BadgeRow[];
};

async function fetchAll(): Promise<AllData> {
  const [clients, events, metrics, locations, badges] = await Promise.all([
    supabase.from("clients").select("*").order("name"),
    supabase.from("events").select("*").order("event_date"),
    supabase.from("event_metrics").select("*"),
    supabase.from("event_locations").select("*"),
    supabase.from("badges").select("*"),
  ]);
  for (const r of [clients, events, metrics, locations, badges]) if (r.error) throw r.error;
  return {
    clients: clients.data ?? [],
    events: events.data ?? [],
    metrics: metrics.data ?? [],
    locations: locations.data ?? [],
    badges: badges.data ?? [],
  };
}

export const ALL_DATA_KEY = ["all-data"] as const;
export const allDataQuery = queryOptions({ queryKey: ALL_DATA_KEY, queryFn: fetchAll });

export type LocationStat = { name: string; recovery: number; returns: number };

export type View = {
  label: string;
  eventCount: number;
  participants: number;
  impact: number;
  plastic: number;
  co2: number;
  micro: number | null;
  ecotox: number | null;
  tei: number;
  returnRate: number;
  contamination: number;
  reuseCycles: number;
  community: number;
  adoption: number;
  consistency: number;
  staff: number;
  compost: number;
  locations: LocationStat[];
  badges: { name: string; criterion: string | null }[];
};

const num = (v: number | null | undefined) => Number(v ?? 0);
const avg = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);
const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);
export const round = (v: number, digits = 1) => Math.round(v * 10 ** digits) / 10 ** digits;

/** Soma ou devolve null quando nenhum evento tem o valor (ex.: métricas ainda em validação). */
const sumOrNull = (xs: (number | null)[]) => {
  const known = xs.filter((x): x is number => x != null);
  return known.length ? round(sum(known), 2) : null;
};

export function buildView(data: AllData, events: EventRow[], label: string): View | null {
  const ms = events
    .map((e) => data.metrics.find((m) => m.event_id === e.id))
    .filter((m): m is Metrics => Boolean(m));
  if (!ms.length) return null;

  const ids = new Set(events.map((e) => e.id));

  const byLocation = new Map<string, { rates: number[]; returns: number }>();
  for (const l of data.locations) {
    if (!ids.has(l.event_id)) continue;
    const cur = byLocation.get(l.location_name) ?? { rates: [], returns: 0 };
    cur.rates.push(num(l.recovery_rate));
    cur.returns += num(l.returns);
    byLocation.set(l.location_name, cur);
  }

  const badges = new Map<string, string | null>();
  for (const b of data.badges)
    if (ids.has(b.event_id) && b.achieved) badges.set(b.name, b.description);

  return {
    label,
    eventCount: events.length,
    participants: sum(events.map((e) => num(e.actual_participants))),
    impact: Math.round(avg(ms.map((m) => num(m.impact_score)))),
    plastic: round(sum(ms.map((m) => num(m.plastic_avoided)))),
    co2: round(sum(ms.map((m) => num(m.co2_avoided)))),
    micro: sumOrNull(ms.map((m) => m.microplastics_avoided)),
    ecotox: sumOrNull(ms.map((m) => m.ecotoxicity_avoided)),
    tei: round(avg(ms.map((m) => num(m.tei)))),
    returnRate: round(avg(ms.map((m) => num(m.return_rate)))),
    contamination: round(avg(ms.map((m) => num(m.contamination)))),
    reuseCycles: round(avg(ms.map((m) => num(m.reuse_cycles)))),
    community: Math.round(avg(ms.map((m) => num(m.community_participation_score)))),
    adoption: Math.round(avg(ms.map((m) => num(m.adoption_speed)))),
    consistency: Math.round(avg(ms.map((m) => num(m.consistency)))),
    staff: sum(ms.map((m) => num(m.volunteers_staff))),
    compost: round(sum(ms.map((m) => num(m.compost_generated)))),
    locations: [...byLocation].map(([name, v]) => ({
      name,
      recovery: round(avg(v.rates)),
      returns: v.returns,
    })),
    badges: [...badges].map(([name, criterion]) => ({ name, criterion })),
  };
}

export type EvolutionPoint = {
  label: string;
  date: string;
  impact: number;
  tei: number;
  returnRate: number;
  contamination: number;
  community: number;
  adoption: number;
  consistency: number;
};

/** Um ponto por evento, para os gráficos de "A sua evolução". */
export function evolution(data: AllData, events: EventRow[]): EvolutionPoint[] {
  const points: EvolutionPoint[] = [];
  for (const e of events) {
    const m = data.metrics.find((x) => x.event_id === e.id);
    if (!m) continue;
    points.push({
      label: e.name,
      date: e.event_date,
      impact: num(m.impact_score),
      tei: num(m.tei),
      returnRate: num(m.return_rate),
      contamination: num(m.contamination),
      community: num(m.community_participation_score),
      adoption: num(m.adoption_speed),
      consistency: num(m.consistency),
    });
  }
  return points;
}
