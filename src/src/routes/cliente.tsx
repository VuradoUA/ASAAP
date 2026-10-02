import { useState } from "react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { FilterBar } from "@/components/layout/FilterBar";
import { TopBar } from "@/components/layout/TopBar";
import { ExportDialog } from "@/features/cliente/ExportDialog";
import { useI18n } from "@/lib/app-state";
import { pageHead } from "@/lib/seo";

/** Moldura do Dashboard Cliente: cabeçalho fixo + filtros + sub-página. */
export const Route = createFileRoute("/cliente")({
  head: () =>
    pageHead(
      "Dashboard Cliente",
      "Impact Score, ambiente, impacto social e evolução dos seus eventos.",
    ),
  component: ClientLayout,
});

function ClientLayout() {
  const { t } = useI18n();
  const [exportOpen, setExportOpen] = useState(false);
  return (
    <div className="min-h-screen">
      <TopBar
        title={t("clientDash")}
        titleTo="/cliente"
        showModes
        actions={
          <button
            onClick={() => setExportOpen(true)}
            className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            {t("export")}
          </button>
        }
      >
        <FilterBar />
      </TopBar>
      <ExportDialog open={exportOpen} onOpenChange={setExportOpen} />
      <main className="mx-auto max-w-6xl px-4 py-10 md:px-8">
        <Outlet />
      </main>
    </div>
  );
}
