import { BarList, Block, Heatmap, LineMetric, Meter } from "@/components/dashboard";
import { useDashboard } from "@/lib/app-state";
import { TARGETS } from "@/lib/config";
import type { View } from "@/lib/data";
import { fleetLocations, performanceParts, performanceScore, returnCurve } from "@/lib/metrics";

export function Operacoes({ view }: { view: View }) {
  const { t, fmt, data, cumulative } = useDashboard();
  const parts = performanceParts(view);
  const fleet = data ? fleetLocations(data) : [];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Block title={t("performanceScore")} className="md:col-span-3">
        <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-center">
          <div className="font-display text-7xl font-light tabular-nums">
            {performanceScore(view)}
            <span className="ml-1 font-sans text-base text-muted-foreground">/100</span>
          </div>
          <BarList
            items={[
              { label: t("behaviourPart"), value: parts.behaviour, highlight: true },
              { label: t("circularityPart"), value: parts.circularity, highlight: true },
            ]}
          />
        </div>
      </Block>

      <Block title={t("returnRate")}>
        <Meter value={view.returnRate} target={TARGETS.returnRate} targetLabel={t("target")} />
      </Block>
      <Block title={t("contamination")}>
        <Meter
          value={view.contamination}
          max={TARGETS.contaminationScale}
          target={TARGETS.contaminationMax}
          targetLabel={t("limit")}
          invert
        />
      </Block>
      <Block title={t("circularity")}>
        <p className="font-display text-4xl font-light">
          {fmt(view.reuseCycles)}
          <span className="ml-1 font-sans text-base text-muted-foreground">{t("reuseCycles")}</span>
        </p>
      </Block>

      {!cumulative && (
        <Block title={`${t("returnCurve")} (%)`} className="md:col-span-3">
          <LineMetric
            data={returnCurve(view)}
            dataKey="value"
            xKey="hour"
            target={TARGETS.returnRate}
            height={220}
            unit="%"
          />
        </Block>
      )}

      <Block title={t("fleetRecovery")} className="md:col-span-3">
        <Heatmap cells={fleet} />
      </Block>
    </div>
  );
}
