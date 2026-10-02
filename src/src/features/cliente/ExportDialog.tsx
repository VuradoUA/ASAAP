import { useState } from "react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDashboard, type Dashboard } from "@/lib/app-state";
import { EXTERNAL_BENCHMARK } from "@/lib/config";
import type { View } from "@/lib/data";
import type { DictKey } from "@/lib/i18n";
import { equivalences } from "@/lib/metrics";
import { narrative } from "@/lib/storytelling";
import { cn } from "@/lib/utils";

type Line = [metric: string, value: string | number];

/**
 * Só dados do Dashboard Cliente. Nunca inclui secções internas,
 * mesmo que quem exporta seja da ASAAP a testar como cliente.
 */
const EXPORTABLE: { id: string; title: DictKey; lines: (v: View, d: Dashboard) => Line[] }[] = [
  {
    id: "summary",
    title: "summary",
    lines: (v, d) => [
      [d.t("impactScore"), v.impact],
      [d.t("summary"), narrative(v, d.lang, d.cumulative)],
    ],
  },
  {
    id: "environmental",
    title: "environmental",
    lines: (v, d) => {
      const eq = equivalences(v);
      return [
        [`${d.t("plastic")} (kg)`, v.plastic],
        [`${d.t("co2")} (kg CO₂e)`, v.co2],
        [d.t("micro"), d.t("inValidation")],
        [d.t("ecotox"), d.t("inValidation")],
        [d.t("tei"), v.tei],
        [d.t("km"), eq.km],
        [d.t("trees"), eq.trees],
        [d.t("showers"), eq.showers],
        [d.t("bottles"), eq.bottles],
      ];
    },
  },
  {
    id: "composting",
    title: "composting",
    lines: (v, d) => [
      [`${d.t("compost")} (kg) ${d.t("estimate")}`, v.compost],
      [d.t("biovalue"), d.t("inValidation")],
    ],
  },
  {
    id: "social",
    title: "social",
    lines: (v, d) => [
      [`${d.t(d.rrLabel)} (%)`, v.returnRate],
      [d.t("reuseCycles"), v.reuseCycles],
      [`${d.t("contamination")} (%)`, v.contamination],
      [d.t("community"), v.community],
    ],
  },
  {
    id: "behaviour",
    title: "behaviour",
    lines: (v, d) => [
      [d.t("adoption"), v.adoption],
      [d.t("consistency"), v.consistency],
      [d.t("staff"), v.staff],
    ],
  },
  {
    id: "badges",
    title: "badges",
    lines: (v) => [["Badges", v.badges.map((b) => b.name).join(", ") || "—"]],
  },
  {
    id: "benchmarking",
    title: "benchmarking",
    lines: (v, d) => [
      [d.t("yourScore"), v.impact],
      [d.t("btype"), EXTERNAL_BENCHMARK.btype],
      [d.t("bmarket"), EXTERNAL_BENCHMARK.bmarket],
    ],
  },
];

const escapeHtml = (s: string) =>
  s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] ?? c);

export function ExportDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const d = useDashboard();
  const { t, view } = d;
  const [selected, setSelected] = useState<string[]>(EXPORTABLE.map((s) => s.id));
  const [format, setFormat] = useState<"pdf" | "excel">("pdf");

  const generate = () => {
    if (!view) return;
    const rows = EXPORTABLE.filter((s) => selected.includes(s.id)).flatMap((s) =>
      s.lines(view, d).map(([metric, value]) => [t(s.title), metric, String(value)] as const),
    );
    const title = `PlastNatur, ${d.client?.name ?? ""}, ${view.label}`;
    if (format === "excel") downloadCsv(rows);
    else openPrintable(title, t("demoNote"), rows);
    toast.success(t("exported"));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-normal">
            {t("exportTitle")}
          </DialogTitle>
          <DialogDescription>{t("exportDesc")}</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3 py-2">
          {EXPORTABLE.map((s) => (
            <label key={s.id} className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={selected.includes(s.id)}
                onCheckedChange={(c) =>
                  setSelected((p) => (c ? [...p, s.id] : p.filter((x) => x !== s.id)))
                }
              />
              {t(s.title)}
            </label>
          ))}
        </div>
        <fieldset className="space-y-2">
          <legend className="text-sm text-muted-foreground">{t("format")}</legend>
          <div className="flex gap-2">
            {(["pdf", "excel"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                aria-pressed={format === f}
                className={cn(
                  "flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium",
                  format === f ? "border-primary bg-accent" : "border-border text-muted-foreground",
                )}
              >
                {f === "pdf" ? "PDF" : "Excel"}
              </button>
            ))}
          </div>
        </fieldset>
        <DialogFooter>
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-full px-4 py-2 text-sm text-muted-foreground"
          >
            {t("cancel")}
          </button>
          <button
            onClick={generate}
            disabled={!selected.length || !view}
            className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
          >
            {t("generate")}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/** CSV com separador ";" e BOM — abre diretamente no Excel. */
function downloadCsv(rows: readonly (readonly string[])[]) {
  const csv = [["Secção", "Métrica", "Valor"], ...rows]
    .map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(";"))
    .join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" }));
  a.download = "plastnatur-relatorio.csv";
  a.click();
  URL.revokeObjectURL(a.href);
}

/** Abre uma página simples e chama a impressão do browser (Guardar como PDF). */
function openPrintable(title: string, note: string, rows: readonly (readonly string[])[]) {
  const w = window.open("", "_blank");
  if (!w) return;
  const body = rows
    .map(
      (r) =>
        `<tr>${r.map((c, i) => (i === 2 ? `<td><b>${escapeHtml(c)}</b></td>` : `<td>${escapeHtml(c)}</td>`)).join("")}</tr>`,
    )
    .join("");
  w.document.write(
    `<html><head><title>${escapeHtml(title)}</title><style>body{font-family:Georgia,serif;padding:40px;color:#1f3a30}` +
      `td{padding:8px 12px;border-bottom:1px solid #ddd;font-family:sans-serif;font-size:13px}h1{font-weight:400}</style></head>` +
      `<body><h1>${escapeHtml(title)}</h1><p style="font-family:sans-serif;font-size:12px;color:#777">${escapeHtml(note)}</p>` +
      `<table>${body}</table><script>setTimeout(()=>print(),300)</script></body></html>`,
  );
  w.document.close();
}
