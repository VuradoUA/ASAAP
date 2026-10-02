import { Fragment } from "react";
import { ArrowRight, CornerDownRight } from "lucide-react";
import { Block, Meter, Panel } from "@/components/dashboard";
import { useDashboard } from "@/lib/app-state";
import { TARGETS } from "@/lib/config";
import type { View } from "@/lib/data";
import type { Bilingual } from "@/lib/i18n";
import { pipeline, type PipelineKey, type PipelineStep } from "@/lib/metrics";
import { cn } from "@/lib/utils";

const STEP_LABEL: Record<PipelineKey, Bilingual> = {
  distributed: { pt: "Distribuídos", en: "Distributed" },
  used: { pt: "Usados", en: "Used" },
  returned: { pt: "Devolvidos", en: "Returned" },
  washed: { pt: "Lavados", en: "Washed" },
  restocked: { pt: "Repostos", en: "Restocked" },
  reused: { pt: "Reutilizados", en: "Reused" },
  toCompost: { pt: "Entregues para compostagem", en: "Sent to composting" },
  composted: { pt: "Compostados", en: "Composted" },
};

/** Diagrama de fluxo desenhado: ciclo principal com perdas entre etapas e ramificação para compostagem. */
export function Pipeline({ view }: { view: View }) {
  const { t } = useDashboard();
  const p = pipeline(view);

  return (
    <div className="space-y-4">
      <Panel className="space-y-6">
        <Flow steps={p.mainLoop} total={p.distributed} showLosses />
        <div className="flex flex-wrap items-center gap-3 border-t border-dashed border-border pt-5">
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <CornerDownRight className="h-4 w-4" />
            {t("compostBranch")}
          </span>
          <Flow steps={p.compostBranch} total={p.distributed} compost />
        </div>
      </Panel>
      <div className="grid gap-4 md:grid-cols-3">
        <Block title={t("pei")}>
          <Meter value={p.pei} unit="/100" target={TARGETS.pei} targetLabel={t("target")} />
          <p className="text-xs text-muted-foreground">{t("peiNote")}</p>
        </Block>
      </div>
    </div>
  );
}

function Flow({
  steps,
  total,
  showLosses = false,
  compost = false,
}: {
  steps: PipelineStep[];
  total: number;
  showLosses?: boolean;
  compost?: boolean;
}) {
  const { lang, fmt } = useDashboard();
  return (
    <ol className="flex flex-wrap items-center gap-2">
      {steps.map((s, i) => {
        const next = steps[i + 1];
        const loss = next ? s.value - next.value : 0;
        return (
          <Fragment key={s.key}>
            <li
              className={cn(
                "min-w-[120px] rounded-xl border p-3",
                compost ? "border-positive/40 bg-positive-soft" : "border-border bg-secondary",
              )}
            >
              <div className="text-xs text-muted-foreground">{STEP_LABEL[s.key][lang]}</div>
              <div className="font-display text-xl tabular-nums">{fmt(s.value)}</div>
              <div className="mt-1 h-1 rounded-full bg-track">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${total ? (s.value / total) * 100 : 0}%` }}
                />
              </div>
            </li>
            {next && (
              <li aria-hidden className="flex flex-col items-center text-muted-foreground">
                <ArrowRight className="h-4 w-4" />
                {showLosses && loss > 0 && (
                  <span className="text-[11px] tabular-nums text-attention">−{fmt(loss)}</span>
                )}
              </li>
            )}
          </Fragment>
        );
      })}
    </ol>
  );
}
