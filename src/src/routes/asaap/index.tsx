import { createFileRoute } from "@tanstack/react-router";
import { DashboardGate } from "@/components/layout/DashboardGate";
import { SectionList } from "@/components/layout/SectionList";
import { ASAAP_SECTIONS } from "@/features/asaap/sections";
import { useDashboard } from "@/lib/app-state";

export const Route = createFileRoute("/asaap/")({
  component: AsaapHome,
});

function AsaapHome() {
  const { t, cumulative, selectedEvent, client } = useDashboard();
  return (
    <DashboardGate>
      {(view) => (
        <div className="space-y-8">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              {cumulative
                ? `${t("cumulative")}, ${client?.name ?? ""}`
                : `${t("perEvent")}, ${selectedEvent?.event_date ?? ""}`}
            </p>
            <h1 className="text-4xl font-light">{view.label}</h1>
          </div>
          <SectionList sections={ASAAP_SECTIONS} to="/asaap/$secao" view={view} />
        </div>
      )}
    </DashboardGate>
  );
}
