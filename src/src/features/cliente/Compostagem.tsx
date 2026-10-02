import { Sprout } from "lucide-react";
import { Group, StatTile } from "@/components/dashboard";
import { useDashboard } from "@/lib/app-state";
import { FEATURES } from "@/lib/config";
import type { View } from "@/lib/data";
import type { DictKey } from "@/lib/i18n";

const QUALITY: DictKey[] = ["ph", "humidity", "npk", "heavyMetals", "fragments", "maturation"];

export function Compostagem({ view }: { view: View }) {
  const { t, fmt } = useDashboard();
  const pending = t("inValidation");

  return (
    <div className="space-y-10">
      <div className="grid gap-4 sm:grid-cols-2">
        <StatTile
          icon={<Sprout className="h-4 w-4" />}
          label={t("compost")}
          value={fmt(view.compost)}
          unit="kg"
          note={t("estimate")}
        />
        {/* Não publicar com valor até 2027. */}
        <StatTile label={t("biovalue")} validation={pending} />
      </div>

      {/* Slots reservados até aos ensaios ISA/GAIKER. */}
      <Group title={t("compostQuality")}>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {QUALITY.map((k) => (
            <StatTile key={k} size="sm" label={t(k)} validation={pending} />
          ))}
        </div>
      </Group>

      {FEATURES.showSoilImpact && (
        <Group title={t("soilImpact")}>
          <div className="grid gap-4 sm:grid-cols-2">
            <StatTile label={t("soilCarbon")} validation={pending} />
            <StatTile label={t("soilWater")} validation={pending} />
          </div>
        </Group>
      )}
    </div>
  );
}
