import { BarList, Block } from "@/components/dashboard";
import { useDashboard } from "@/lib/app-state";
import { EXTERNAL_BENCHMARK } from "@/lib/config";
import { buildView, type View } from "@/lib/data";

/** Benchmarking Externo: usa o Impact Score (nunca o Performance Score) e não mostra nomes de outros clientes. */
export function Benchmarking({ view }: { view: View }) {
  const { t, data, clientId } = useDashboard();
  const scores = (data?.clients ?? [])
    .map((c) => ({
      id: c.id,
      impact: data
        ? buildView(
            data,
            data.events.filter((e) => e.client_id === c.id),
            "",
          )?.impact
        : undefined,
    }))
    .filter((x): x is { id: string; impact: number } => x.impact != null)
    .sort((a, b) => b.impact - a.impact);
  const position = scores.findIndex((s) => s.id === clientId) + 1;

  return (
    <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
      <Block title={t("impactScore")} tip={t("tipImpact")}>
        <BarList
          items={[
            { label: t("yourScore"), value: view.impact, highlight: true },
            { label: t("btype"), value: EXTERNAL_BENCHMARK.btype },
            { label: t("bmarket"), value: EXTERNAL_BENCHMARK.bmarket },
          ]}
        />
      </Block>
      {position > 0 && (
        <Block title={t("rank")}>
          <div className="font-display text-5xl font-light">
            {position}.º
            <span className="ml-2 font-sans text-base text-muted-foreground">
              / {scores.length}
            </span>
          </div>
        </Block>
      )}
    </div>
  );
}
