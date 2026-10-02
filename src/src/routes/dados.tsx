import { useEffect, useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Panel } from "@/components/dashboard";
import { FilterBar } from "@/components/layout/FilterBar";
import { TopBar } from "@/components/layout/TopBar";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import type { TablesUpdate } from "@/integrations/supabase/types";
import { useDashboard } from "@/lib/app-state";
import type { RrLabel } from "@/lib/config";
import { ALL_DATA_KEY } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dados")({
  head: () => ({
    meta: [
      { title: "Gestão de dados | PlastNatur Impact Engine" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DataPage,
});

const METRIC_FIELDS = [
  "impact_score",
  "plastic_avoided",
  "co2_avoided",
  "microplastics_avoided",
  "ecotoxicity_avoided",
  "tei",
  "return_rate",
  "contamination",
  "reuse_cycles",
  "community_participation_score",
  "adoption_speed",
  "consistency",
  "volunteers_staff",
  "compost_generated",
] as const satisfies readonly (keyof TablesUpdate<"event_metrics">)[];
type MetricField = (typeof METRIC_FIELDS)[number];

const RR_LABELS: RrLabel[] = ["returnRate", "landfill", "leakage"];
const button =
  "rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50";

function DataPage() {
  const d = useDashboard();
  const { t } = d;
  return (
    <div className="min-h-screen">
      <TopBar title={t("data")}>
        <FilterBar />
      </TopBar>
      <main className="mx-auto max-w-6xl space-y-10 px-4 py-10 md:px-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-light">{t("data")}</h1>
          <p className="text-muted-foreground">{t("dataDesc")}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <NewClient />
          <NewEvent />
        </div>
        <EditMetrics />
        <Card title={t("settings")}>
          <p className="text-sm text-muted-foreground">{t("rrLabelSetting")}</p>
          <div className="flex flex-wrap gap-2">
            {RR_LABELS.map((l) => (
              <button
                key={l}
                onClick={() => d.setRrLabel(l)}
                aria-pressed={d.rrLabel === l}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm",
                  d.rrLabel === l
                    ? "border-primary bg-accent"
                    : "border-border text-muted-foreground",
                )}
              >
                {t(l)}
              </button>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-normal">{title}</h2>
      <Panel className="space-y-3">{children}</Panel>
    </section>
  );
}

function useRefresh() {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: ALL_DATA_KEY });
}

function NewClient() {
  const { t } = useDashboard();
  const refresh = useRefresh();
  const [form, setForm] = useState({ name: "", company: "" });

  const submit = async () => {
    const { error } = await supabase
      .from("clients")
      .insert({ name: form.name, company: form.company || null });
    if (error) {
      toast.error(error.message);
      return;
    }
    setForm({ name: "", company: "" });
    toast.success(t("saved"));
    await refresh();
  };

  return (
    <Card title={t("newClient")}>
      <Input
        placeholder={t("name")}
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <Input
        placeholder={t("company")}
        value={form.company}
        onChange={(e) => setForm({ ...form, company: e.target.value })}
      />
      <button className={button} disabled={!form.name} onClick={submit}>
        {t("addClient")}
      </button>
    </Card>
  );
}

function NewEvent() {
  const d = useDashboard();
  const { t } = d;
  const refresh = useRefresh();
  const empty = { name: "", location: "", event_date: "", participants: "" };
  const [form, setForm] = useState(empty);

  const submit = async () => {
    const participants = Number(form.participants) || 0;
    const { data, error } = await supabase
      .from("events")
      .insert({
        client_id: d.clientId,
        name: form.name,
        location: form.location || null,
        event_date: form.event_date || new Date().toISOString().slice(0, 10),
        expected_participants: participants,
        actual_participants: participants,
      })
      .select()
      .single();
    if (error) {
      toast.error(error.message);
      return;
    }
    await supabase.from("event_metrics").insert({ event_id: data.id });
    setForm(empty);
    d.setEventId(data.id);
    toast.success(t("saved"));
    await refresh();
  };

  return (
    <Card title={`${t("newEvent")}, ${d.client?.name ?? ""}`}>
      <Input
        placeholder={t("name")}
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <div className="grid grid-cols-3 gap-2">
        <Input
          placeholder={t("location")}
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <Input
          type="date"
          aria-label={t("date")}
          value={form.event_date}
          onChange={(e) => setForm({ ...form, event_date: e.target.value })}
        />
        <Input
          type="number"
          placeholder={t("participants")}
          value={form.participants}
          onChange={(e) => setForm({ ...form, participants: e.target.value })}
        />
      </div>
      <button className={button} disabled={!form.name || !d.clientId} onClick={submit}>
        {t("addEvent")}
      </button>
    </Card>
  );
}

function EditMetrics() {
  const d = useDashboard();
  const { t } = d;
  const refresh = useRefresh();
  const event = d.selectedEvent;
  const metrics = d.data?.metrics.find((m) => m.event_id === event?.id);
  const [form, setForm] = useState<Record<MetricField, string>>(() => toForm(metrics));

  useEffect(() => setForm(toForm(metrics)), [metrics]);

  const save = async () => {
    if (!event) return;
    const payload: TablesUpdate<"event_metrics"> = {};
    for (const f of METRIC_FIELDS) payload[f] = form[f] === "" ? null : Number(form[f]);
    const { error } = metrics
      ? await supabase.from("event_metrics").update(payload).eq("id", metrics.id)
      : await supabase.from("event_metrics").insert({ ...payload, event_id: event.id });
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(t("saved"));
    await refresh();
  };

  return (
    <Card title={`${t("editMetrics")}: ${event?.name ?? "—"}`}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {METRIC_FIELDS.map((f) => (
          <label key={f} className="space-y-1">
            <span className="text-xs text-muted-foreground">{f.replace(/_/g, " ")}</span>
            <Input
              type="number"
              step="any"
              value={form[f]}
              onChange={(e) => setForm({ ...form, [f]: e.target.value })}
            />
          </label>
        ))}
      </div>
      <button className={button} disabled={!event} onClick={save}>
        {t("save")}
      </button>
    </Card>
  );
}

function toForm(
  m: Partial<Record<MetricField, number | null>> | undefined,
): Record<MetricField, string> {
  const out = {} as Record<MetricField, string>;
  for (const f of METRIC_FIELDS) out[f] = m?.[f] == null ? "" : String(m[f]);
  return out;
}
