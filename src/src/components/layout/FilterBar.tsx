import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDashboard } from "@/lib/app-state";

/** Uma linha de filtros, acima de todo o conteúdo. Todos os blocos respondem a ela. */
export function FilterBar() {
  const d = useDashboard();
  const { t } = d;
  if (!d.data) return null;
  return (
    <div className="mx-auto flex max-w-6xl flex-wrap items-end gap-3 px-4 pb-3 md:px-8">
      <Filter
        label={t("client")}
        value={d.clientId}
        onChange={d.setClientId}
        items={d.data.clients.map((c) => ({ value: c.id, label: c.name }))}
      />
      {!d.cumulative && (
        <Filter
          label={t("event")}
          value={d.selectedEvent?.id ?? ""}
          onChange={d.setEventId}
          items={d.filtered.map((e) => ({ value: e.id, label: `${e.name} (${e.event_date})` }))}
        />
      )}
      <Filter
        label={t("date")}
        value={d.year}
        onChange={d.setYear}
        items={[{ value: "all", label: t("all") }, ...d.years.map((y) => ({ value: y, label: y }))]}
      />
      <Filter
        label={t("location")}
        value={d.location}
        onChange={d.setLocation}
        items={[
          { value: "all", label: t("allF") },
          ...d.locations.map((l) => ({ value: l, label: l })),
        ]}
      />
      <span className="ml-auto pb-2 text-xs text-muted-foreground">{t("demoNote")}</span>
    </div>
  );
}

function Filter({
  label,
  value,
  onChange,
  items,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  items: { value: string; label: string }[];
}) {
  return (
    <label className="flex min-w-[150px] flex-1 flex-col gap-1 md:max-w-[240px]">
      <span className="text-xs text-muted-foreground">{label}</span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-9 rounded-xl bg-card">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {items.map((i) => (
            <SelectItem key={i.value} value={i.value}>
              {i.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
}
