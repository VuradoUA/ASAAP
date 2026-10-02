import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { FilterBar } from "@/components/layout/FilterBar";
import { TopBar } from "@/components/layout/TopBar";
import { useI18n } from "@/lib/app-state";
import { pageHead } from "@/lib/seo";

/** Moldura do Dashboard ASAAP (interno): mesmo eixo Por Evento/Acumulado e idioma. */
export const Route = createFileRoute("/asaap")({
  head: () =>
    pageHead("Dashboard ASAAP", "Operações, pipeline CupFlow, benchmarking interno e auditoria.", {
      internal: true,
    }),
  component: AsaapLayout,
});

function AsaapLayout() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen">
      <TopBar
        title={t("asaapDash")}
        titleTo="/asaap"
        showModes
        actions={
          <span className="hidden items-center gap-1.5 rounded-full bg-attention-soft px-3 py-1.5 text-xs font-medium md:inline-flex">
            <Lock className="h-3.5 w-3.5" />
            {t("internalOnly")}
          </span>
        }
      >
        <FilterBar />
      </TopBar>
      <main className="mx-auto max-w-6xl px-4 py-10 md:px-8">
        <Outlet />
      </main>
    </div>
  );
}
