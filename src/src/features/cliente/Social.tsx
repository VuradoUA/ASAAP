import { Block, Heatmap, Meter, SplitBar } from "@/components/dashboard";
import { useDashboard } from "@/lib/app-state";
import { TARGETS } from "@/lib/config";
import type { View } from "@/lib/data";
import { circularity, communitySplit } from "@/lib/metrics";

export function Social({ view }: { view: View }) {
  const { t, fmt, rrLabel, cumulative } = useDashboard();
  const split = communitySplit(view);
  // Recovery by Location: só Por Evento e só com mais de 1 Smart Bin.
  const showLocations = !cumulative && view.locations.length > 1;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Um único meter de RR. Muda o rótulo, nunca o cálculo; o tooltip diz sempre "= Return Rate (RR)". */}
      <Block title={t(rrLabel)} tip={t("tipRR")}>
        <Meter value={view.returnRate} target={TARGETS.returnRate} targetLabel={t("target")} />
      </Block>

      <Block title={t("circularity")} tip={t("tipCircularity")}>
        <Meter value={circularity(view)} unit="/100" />
        <p className="text-sm">
          <span className="font-display text-2xl">{fmt(view.reuseCycles)}</span>{" "}
          <span className="text-muted-foreground">{t("reuseCycles")}</span>
        </p>
      </Block>

      <Block title={`${t("contamination")}, ${t("lowerBetter")}`} tip={t("tipContamination")}>
        <Meter
          value={view.contamination}
          max={TARGETS.contaminationScale}
          target={TARGETS.contaminationMax}
          targetLabel={t("limit")}
          invert
        />
      </Block>

      <Block title={t("community")} tip={t("tipCommunity")} className="md:col-span-3">
        <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-center">
          <div className="font-display text-5xl font-light">
            {view.community}
            <span className="ml-1 font-sans text-base text-muted-foreground">/100</span>
          </div>
          <SplitBar
            a={{ label: t("direct"), value: split.direct }}
            b={{ label: t("indirect"), value: split.indirect }}
          />
        </div>
      </Block>

      {showLocations && (
        <Block title={t("recoveryByLocation")} className="md:col-span-3">
          <Heatmap cells={view.locations} />
        </Block>
      )}
    </div>
  );
}
