import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Panel } from "@/components/dashboard";
import { useDashboard } from "@/lib/app-state";
import type { SectionDef } from "@/features/types";
import { DashboardGate } from "./DashboardGate";

/** Moldura comum de uma sub-página: voltar, título, conteúdo e "secção seguinte". */
export function SectionPage({
  section,
  sections,
  base,
}: {
  section: SectionDef;
  sections: SectionDef[];
  base: "/cliente" | "/asaap";
}) {
  const d = useDashboard();
  const { t } = d;
  const visible = sections.filter((s) => !s.cumulativeOnly || d.cumulative);
  const next = visible[visible.indexOf(section) + 1];
  const { Component } = section;

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Link
          to={base}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          {base === "/cliente" ? t("clientDash") : t("asaapDash")}
        </Link>
        <h1 className="text-4xl font-light">{t(section.title)}</h1>
        <p className="text-muted-foreground">{t(section.description)}</p>
      </div>

      {section.cumulativeOnly && !d.cumulative ? (
        <Panel className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-muted-foreground">{t("onlyCumulative")}</p>
          <button
            onClick={() => d.setMode("cumulative")}
            className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            {t("switchToCumulative")}
          </button>
        </Panel>
      ) : (
        <DashboardGate>{(view) => <Component view={view} />}</DashboardGate>
      )}

      {next && (
        <div className="flex justify-end border-t border-border pt-6">
          <Link
            to={base === "/cliente" ? "/cliente/$secao" : "/asaap/$secao"}
            params={{ secao: next.id }}
            className="group inline-flex items-center gap-2 text-sm"
          >
            <span className="text-muted-foreground">{t("nextSection")}:</span>
            <span className="font-medium">{t(next.title)}</span>
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
