import { Lightbulb } from "lucide-react";
import { Panel } from "@/components/dashboard";
import { useDashboard } from "@/lib/app-state";
import type { View } from "@/lib/data";
import type { DictKey } from "@/lib/i18n";
import { recommendations, type Priority } from "@/lib/metrics";
import { cn } from "@/lib/utils";

const PRIORITY: Record<Priority, { label: DictKey; tone: string }> = {
  high: { label: "priorityHigh", tone: "bg-attention-soft text-foreground" },
  medium: { label: "priorityMedium", tone: "bg-secondary text-foreground" },
  low: { label: "priorityLow", tone: "bg-positive-soft text-foreground" },
};

export function Recomendacoes({ view }: { view: View }) {
  const { t, lang } = useDashboard();
  return (
    <ol className="space-y-3">
      {recommendations(view).map((r) => (
        <li key={r.text.pt}>
          <Panel className="flex gap-4">
            <Lightbulb className="h-5 w-5 shrink-0 text-attention" />
            <div className="space-y-2">
              <span
                className={cn(
                  "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
                  PRIORITY[r.priority].tone,
                )}
              >
                {t(PRIORITY[r.priority].label)}
              </span>
              <p className="text-sm leading-relaxed">{r.text[lang]}</p>
            </div>
          </Panel>
        </li>
      ))}
    </ol>
  );
}
