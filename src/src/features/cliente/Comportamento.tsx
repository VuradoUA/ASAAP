import { Block, LineMetric, Meter, StatTile } from "@/components/dashboard";
import { useDashboard } from "@/lib/app-state";
import { TARGETS } from "@/lib/config";
import type { View } from "@/lib/data";
import { returnCurve } from "@/lib/metrics";

export function Comportamento({ view }: { view: View }) {
  const { t, fmt, cumulative } = useDashboard();
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Block title={t("adoption")} tip={t("tipAdoption")}>
        <Meter value={view.adoption} unit="/100" />
      </Block>
      <Block title={t("consistency")} tip={t("tipConsistency")}>
        <Meter value={view.consistency} unit="/100" />
      </Block>
      <StatTile label={t("staff")} value={fmt(view.staff)} />

      {/* A curva de retorno é de um evento específico: só na aba Por Evento. */}
      {!cumulative && (
        <Block
          title={`${t("returnCurve")} (%)`}
          tip={t("tipReturnCurve")}
          className="md:col-span-3"
        >
          <LineMetric
            data={returnCurve(view)}
            dataKey="value"
            xKey="hour"
            target={TARGETS.returnRate}
            height={240}
            unit="%"
          />
        </Block>
      )}
    </div>
  );
}
