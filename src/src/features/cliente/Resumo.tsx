import { InfoTip } from "@/components/dashboard";
import { useDashboard } from "@/lib/app-state";
import type { View } from "@/lib/data";
import { narrative } from "@/lib/storytelling";

/**
 * Hero do Impact Score + narrativa automática.
 * Reutilizado pelo Reporting Automático do Dashboard ASAAP (mesmo motor de storytelling).
 */
export function ImpactHero({ view }: { view: View }) {
  const d = useDashboard();
  const { t, lang, fmt, cumulative } = d;
  const context = cumulative
    ? `${t("cumulative")}, ${view.eventCount} ${t("events")}`
    : `${t("perEvent")}, ${d.selectedEvent?.event_date ?? ""}`;

  return (
    <section className="hero-surface grid gap-8 p-8 md:grid-cols-[minmax(0,16rem)_1fr] md:items-end md:p-12">
      <div>
        <div className="flex items-center gap-2 text-sm opacity-80">
          {t("impactScore")}
          <span className="[&_button]:text-primary-foreground/70">
            <InfoTip text={t("tipImpact")} />
          </span>
        </div>
        <div className="font-display text-[7rem] font-light leading-none tabular-nums md:text-[8.5rem]">
          {view.impact}
        </div>
        <div
          className="mt-3 h-1.5 rounded-full bg-primary-foreground/20"
          role="meter"
          aria-valuenow={view.impact}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-primary-foreground"
            style={{ width: `${view.impact}%` }}
          />
        </div>
        <div className="mt-1 flex justify-between text-xs opacity-60">
          <span>0</span>
          <span>100</span>
        </div>
      </div>
      <div className="space-y-3">
        <p className="text-sm opacity-70">{context}</p>
        <h1 className="text-3xl font-light md:text-4xl">{view.label}</h1>
        <p className="max-w-[62ch] text-lg leading-relaxed opacity-90">
          {narrative(view, lang, cumulative)}
        </p>
        <p className="text-sm opacity-70">
          {fmt(view.participants)} {t("participants")}
        </p>
      </div>
    </section>
  );
}
