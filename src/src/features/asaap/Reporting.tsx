import { toast } from "sonner";
import { StatTile } from "@/components/dashboard";
import { ImpactHero } from "@/features/cliente/Resumo";
import { useDashboard } from "@/lib/app-state";
import type { View } from "@/lib/data";

/** Reutiliza o resumo do Dashboard Cliente (mesmo hero, mesmo motor de storytelling). */
export function Reporting({ view }: { view: View }) {
  const { t, fmt } = useDashboard();
  return (
    <div className="space-y-6">
      <ImpactHero view={view} />
      <h2 className="text-xl font-normal">{t("keyKpis")}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile size="sm" label={t("plastic")} value={fmt(view.plastic)} unit="kg" />
        <StatTile size="sm" label={t("co2")} value={fmt(view.co2)} unit="kg CO₂e" />
        <StatTile size="sm" label={t("returnRate")} value={fmt(view.returnRate)} unit="%" />
        <StatTile size="sm" label={t("contamination")} value={fmt(view.contamination)} unit="%" />
        <StatTile size="sm" label={t("tei")} value={fmt(view.tei)} unit="/100" />
        <StatTile size="sm" label={t("community")} value={view.community} unit="/100" />
        <StatTile
          size="sm"
          label={t("compost")}
          value={fmt(view.compost)}
          unit="kg"
          note={t("estimate")}
        />
        <StatTile size="sm" label={t("staff")} value={fmt(view.staff)} />
      </div>
      {/* Base para o relatório ESG-ready final. Distinto do Exportar do Dashboard Cliente. */}
      <button
        onClick={() => toast.success(t("reportExported"))}
        className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
      >
        {t("exportReport")}
      </button>
    </div>
  );
}
