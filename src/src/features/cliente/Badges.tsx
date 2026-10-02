import { Award } from "lucide-react";
import { Panel } from "@/components/dashboard";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useDashboard } from "@/lib/app-state";
import type { View } from "@/lib/data";

/** Só os badges conquistados aparecem; o critério surge ao passar o rato. */
export function Badges({ view }: { view: View }) {
  const { t } = useDashboard();
  if (!view.badges.length)
    return (
      <Panel>
        <p className="text-muted-foreground">{t("noBadges")}</p>
      </Panel>
    );
  return (
    <ul className="flex flex-wrap gap-3">
      {view.badges.map((b) => (
        <li key={b.name}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-positive-soft py-2 pl-2 pr-4 text-sm font-medium text-foreground focus-visible:outline-2 focus-visible:outline-ring"
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-positive text-primary-foreground">
                  <Award className="h-4 w-4" />
                </span>
                {b.name}
              </button>
            </TooltipTrigger>
            {b.criterion && (
              <TooltipContent className="max-w-xs text-xs">{b.criterion}</TooltipContent>
            )}
          </Tooltip>
        </li>
      ))}
    </ul>
  );
}
