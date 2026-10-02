import { BarList, Block, Panel } from "@/components/dashboard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDashboard } from "@/lib/app-state";
import { buildView, type View } from "@/lib/data";
import { avgOf, performanceScore } from "@/lib/metrics";

/** Usa o Performance Score (nunca o Impact Score). Mostra clientes por nome: só interno. */
export function BenchmarkingInterno({ view }: { view: View }) {
  const { t, fmt, data, clientId, clientEvents } = useDashboard();
  if (!data) return null;

  const rows = data.clients
    .map((c) => ({
      client: c,
      view: buildView(
        data,
        data.events.filter((e) => e.client_id === c.id),
        c.name,
      ),
    }))
    .filter((r): r is { client: (typeof data.clients)[number]; view: View } => r.view != null)
    .map((r) => ({ ...r, perf: performanceScore(r.view) }))
    .sort((a, b) => b.perf - a.perf);

  // Bhistorical: média dos eventos anteriores do cliente (sem o mais recente).
  const past = clientEvents
    .slice(0, -1)
    .map((e) => buildView(data, [e], e.name))
    .filter((v): v is View => v != null);

  return (
    <div className="space-y-4">
      <Block title={t("performanceScore")}>
        <BarList
          items={[
            { label: t("bclient"), value: performanceScore(view), highlight: true },
            { label: t("bpilot"), value: avgOf(rows.map((r) => r.perf)) },
            ...(past.length
              ? [{ label: t("bhistorical"), value: avgOf(past.map(performanceScore)) }]
              : []),
          ]}
        />
      </Block>
      <Panel className="overflow-x-auto p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("client")}</TableHead>
              <TableHead>{t("events")}</TableHead>
              <TableHead>{t("performanceScore")}</TableHead>
              <TableHead>{t("impactScore")}</TableHead>
              <TableHead>{t("returnRate")}</TableHead>
              <TableHead>{t("contamination")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow
                key={r.client.id}
                className={r.client.id === clientId ? "bg-accent/50" : undefined}
              >
                <TableCell className="font-medium">{r.client.name}</TableCell>
                <TableCell>{r.view.eventCount}</TableCell>
                <TableCell className="font-semibold">{r.perf}</TableCell>
                <TableCell>{r.view.impact}</TableCell>
                <TableCell>{fmt(r.view.returnRate)}%</TableCell>
                <TableCell>{fmt(r.view.contamination)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </div>
  );
}
