import { Panel, StatTile } from "@/components/dashboard";
import { useDashboard } from "@/lib/app-state";

const hhmm = (time: string | null) => (time ? time.slice(0, 5) : null);

function duration(start: string | null, end: string | null) {
  if (!start || !end) return null;
  const [sh = 0, sm = 0] = start.split(":").map(Number);
  const [eh = 0, em = 0] = end.split(":").map(Number);
  let mins = eh * 60 + em - (sh * 60 + sm);
  if (mins < 0) mins += 24 * 60;
  return `${Math.floor(mins / 60)}h${String(mins % 60).padStart(2, "0")}`;
}

/** Registo simples previsto → real. Mostra sempre o evento selecionado. */
export function DadosEvento() {
  const { t, fmt, selectedEvent: e } = useDashboard();
  if (!e)
    return (
      <Panel>
        <p className="text-muted-foreground">{t("noData")}</p>
      </Panel>
    );
  const notRecorded = t("notRecorded");

  return (
    <div className="space-y-8">
      <p className="text-sm text-muted-foreground">
        {e.name}, {e.event_date}
      </p>
      <Pair title={t("startTime")} planned={hhmm(e.start_time)} actual={null} empty={notRecorded} />
      <Pair
        title={t("duration")}
        planned={duration(e.start_time, e.end_time)}
        actual={null}
        empty={notRecorded}
      />
      <section className="space-y-3">
        <h2 className="text-xl font-normal">{t("expectedParticipants")}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <StatTile
            size="sm"
            label={t("planned")}
            value={e.expected_participants == null ? undefined : fmt(e.expected_participants)}
          />
        </div>
        <p className="text-xs text-muted-foreground">{t("participantsNote")}</p>
      </section>
    </div>
  );
}

function Pair({
  title,
  planned,
  actual,
  empty,
}: {
  title: string;
  planned: string | null;
  actual: string | null;
  empty: string;
}) {
  const { t } = useDashboard();
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-normal">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <StatTile size="sm" label={t("planned")} value={planned ?? undefined} />
        <StatTile
          size="sm"
          label={t("actual")}
          value={actual ?? undefined}
          note={actual ? undefined : empty}
        />
      </div>
    </section>
  );
}
