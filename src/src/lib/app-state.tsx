import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { DEFAULT_RR_LABEL, type RrLabel } from "./config";
import { allDataQuery, buildView, type View } from "./data";
import { translate, type DictKey, type Lang } from "./i18n";
import { formatNumber } from "./storytelling";

export type Mode = "event" | "cumulative";

type Preferences = {
  lang: Lang;
  setLang: (l: Lang) => void;
  mode: Mode;
  setMode: (m: Mode) => void;
  rrLabel: RrLabel;
  setRrLabel: (l: RrLabel) => void;
};

type Filters = {
  clientId: string;
  setClientId: (id: string) => void;
  eventId: string;
  setEventId: (id: string) => void;
  year: string;
  setYear: (y: string) => void;
  location: string;
  setLocation: (l: string) => void;
};

type State = Preferences & Filters;

const Ctx = createContext<State | null>(null);

/** Preferências globais (idioma, aba) e filtros, partilhados por todas as páginas. */
export function AppStateProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("pt");
  const [mode, setMode] = useState<Mode>("event");
  const [rrLabel, setRrLabel] = useState<RrLabel>(DEFAULT_RR_LABEL);
  const [clientId, setClientIdRaw] = useState("");
  const [eventId, setEventId] = useState("");
  const [year, setYear] = useState("all");
  const [location, setLocation] = useState("all");

  const value = useMemo<State>(
    () => ({
      lang,
      setLang,
      mode,
      setMode,
      rrLabel,
      setRrLabel,
      clientId,
      setClientId: (id) => {
        setClientIdRaw(id);
        setEventId("");
        setLocation("all");
      },
      eventId,
      setEventId,
      year,
      setYear,
      location,
      setLocation,
    }),
    [lang, mode, rrLabel, clientId, eventId, year, location],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

function useAppState() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAppState tem de estar dentro de <AppStateProvider>");
  return v;
}

/** Só idioma e tradução — para páginas que não precisam de dados. */
export function useI18n() {
  const { lang, setLang } = useAppState();
  return {
    lang,
    setLang,
    t: (k: DictKey) => translate(lang, k),
    fmt: (x: number) => formatNumber(lang, x),
  };
}

/** Resolve os filtros nos eventos em âmbito e na View da aba atual. */
export function useDashboard() {
  const s = useAppState();
  const i18n = useI18n();
  const query = useQuery(allDataQuery);
  const data = query.data;

  const clientId = s.clientId || data?.clients[0]?.id || "";
  const client = data?.clients.find((c) => c.id === clientId) ?? null;
  const clientEvents = data ? data.events.filter((e) => e.client_id === clientId) : [];
  const years = [...new Set(clientEvents.map((e) => e.event_date.slice(0, 4)))].sort();
  const locations = [...new Set(clientEvents.map((e) => e.location ?? "").filter(Boolean))].sort();
  const filtered = clientEvents.filter(
    (e) =>
      (s.year === "all" || e.event_date.startsWith(s.year)) &&
      (s.location === "all" || e.location === s.location),
  );
  const selectedEvent =
    filtered.find((e) => e.id === s.eventId) ?? filtered[filtered.length - 1] ?? null;

  // Mantém a seleção de evento válida quando os filtros mudam.
  const eventStillValid = !s.eventId || filtered.some((e) => e.id === s.eventId);
  useEffect(() => {
    if (!eventStillValid) s.setEventId("");
  }, [eventStillValid, s]);

  const cumulative = s.mode === "cumulative";
  let view: View | null = null;
  if (data) {
    view = cumulative
      ? buildView(data, filtered, client?.name ?? "")
      : selectedEvent
        ? buildView(data, [selectedEvent], selectedEvent.name)
        : null;
  }

  return {
    ...s,
    ...i18n,
    query,
    data,
    cumulative,
    clientId,
    client,
    clientEvents,
    filtered,
    years,
    locations,
    selectedEvent,
    view,
  };
}

export type Dashboard = ReturnType<typeof useDashboard>;
