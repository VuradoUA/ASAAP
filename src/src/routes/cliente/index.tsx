import { createFileRoute } from "@tanstack/react-router";
import { DashboardGate } from "@/components/layout/DashboardGate";
import { SectionList } from "@/components/layout/SectionList";
import { ImpactHero } from "@/features/cliente/Resumo";
import { CLIENT_SECTIONS } from "@/features/cliente/sections";

/** Página principal do cliente: Resumo + lista de secções. */
export const Route = createFileRoute("/cliente/")({
  component: () => (
    <DashboardGate>
      {(view) => (
        <div className="space-y-10">
          <ImpactHero view={view} />
          <SectionList sections={CLIENT_SECTIONS} to="/cliente/$secao" view={view} />
        </div>
      )}
    </DashboardGate>
  ),
});
