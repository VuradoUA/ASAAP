import { useState } from "react";
import { DataTable } from "@/components/dashboard";
import { Input } from "@/components/ui/input";
import { useDashboard } from "@/lib/app-state";
import { NFC_ACTIONS, nfcColumns, nfcRows } from "@/lib/demo-content";
import { cn } from "@/lib/utils";

/** Única área com dados ao nível de copo/lote (cup_id, lote_id). */
export function Nfc() {
  const { t, selectedEvent } = useDashboard();
  const [search, setSearch] = useState("");
  const [action, setAction] = useState<string>("all");

  const q = search.trim().toLowerCase();
  const rows = nfcRows(selectedEvent?.event_date ?? "").filter(
    (r) =>
      (action === "all" || r["action"] === action) &&
      (!q || [r["cup"], r["lote"], r["staff"]].some((v) => String(v).toLowerCase().includes(q))),
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("nfcSearch")}
          className="max-w-xs rounded-xl bg-card"
        />
        {["all", ...NFC_ACTIONS].map((a) => (
          <button
            key={a}
            onClick={() => setAction(a)}
            aria-pressed={action === a}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm",
              action === a ? "border-primary bg-accent" : "border-border text-muted-foreground",
            )}
          >
            {a === "all" ? t("allActions") : a}
          </button>
        ))}
      </div>
      <DataTable columns={nfcColumns} rows={rows} empty={t("noData")} />
    </div>
  );
}
