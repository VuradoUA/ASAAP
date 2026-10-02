import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useDashboard } from "@/lib/app-state";
import type { View } from "@/lib/data";
import type { SectionDef } from "@/features/types";

/** Lista de secções na página principal de cada dashboard. Cada linha abre uma sub-página. */
export function SectionList({
  sections,
  to,
  view,
}: {
  sections: SectionDef[];
  to: "/cliente/$secao" | "/asaap/$secao";
  view: View;
}) {
  const d = useDashboard();
  const visible = sections.filter((s) => !s.cumulativeOnly || d.cumulative);
  return (
    <nav
      aria-label={d.t("sections")}
      className="card-surface divide-y divide-border overflow-hidden"
    >
      {visible.map((s) => {
        const headline = s.headline?.(view, d) ?? null;
        return (
          <Link
            key={s.id}
            to={to}
            params={{ secao: s.id }}
            className="group flex items-center gap-4 px-6 py-5 hover:bg-secondary/60 focus-visible:bg-secondary focus-visible:outline-none"
          >
            <div className="min-w-0 flex-1">
              <div className="font-display text-xl">{d.t(s.title)}</div>
              <p className="text-sm text-muted-foreground">{d.t(s.description)}</p>
            </div>
            {headline && (
              <div className="hidden text-right font-display text-2xl font-light tabular-nums sm:block">
                {headline}
              </div>
            )}
            <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </Link>
        );
      })}
    </nav>
  );
}
