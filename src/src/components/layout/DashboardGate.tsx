import type { ReactNode } from "react";
import { Panel } from "@/components/dashboard";
import { useDashboard } from "@/lib/app-state";
import type { View } from "@/lib/data";

/** Trata carregamento, erro e "sem dados" num só sítio; só renderiza o conteúdo quando há View. */
export function DashboardGate({ children }: { children: (view: View) => ReactNode }) {
  const { query, view, t } = useDashboard();
  if (query.isLoading) return <p className="text-muted-foreground">{t("loading")}</p>;
  if (query.error)
    return (
      <Panel>
        <p className="text-destructive">{String(query.error)}</p>
      </Panel>
    );
  if (!view)
    return (
      <Panel>
        <p className="text-muted-foreground">{t("noData")}</p>
      </Panel>
    );
  return <>{children(view)}</>;
}
