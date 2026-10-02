import { Block, LineMetric } from "@/components/dashboard";
import { useDashboard } from "@/lib/app-state";
import { TARGETS } from "@/lib/config";
import { evolution, type EvolutionPoint } from "@/lib/data";
import type { DictKey } from "@/lib/i18n";

type MetricKey = Exclude<keyof EvolutionPoint, "label" | "date">;

/** Pequenos múltiplos: um gráfico de linhas por métrica, nunca dois eixos. */
const CHARTS: { key: MetricKey; title: DictKey; unit?: string; target?: number }[] = [
  { key: "impact", title: "impactScore" },
  { key: "tei", title: "tei" },
  { key: "returnRate", title: "returnRate", unit: "%", target: TARGETS.returnRate },
  { key: "contamination", title: "contamination", unit: "%", target: TARGETS.contaminationMax },
  { key: "community", title: "community" },
  { key: "adoption", title: "adoption" },
  { key: "consistency", title: "consistency" },
  // BioValue Score entra aqui a partir de 2027, quando tiver valor.
];

export function Evolucao() {
  const { t, data, filtered } = useDashboard();
  if (!data) return null;
  const points = evolution(data, filtered).map((p) => ({ ...p, month: p.date.slice(0, 7) }));

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {CHARTS.map((c) => (
        <Block key={c.key} title={c.unit ? `${t(c.title)} (${c.unit})` : t(c.title)}>
          <LineMetric
            data={points}
            dataKey={c.key}
            xKey="month"
            target={c.target}
            unit={c.unit ?? ""}
          />
        </Block>
      ))}
    </div>
  );
}
