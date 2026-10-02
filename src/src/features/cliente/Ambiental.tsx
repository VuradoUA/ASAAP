import { Car, Droplets, Milk, Trees } from "lucide-react";
import { Block, Group, Meter, StatTile } from "@/components/dashboard";
import { useDashboard } from "@/lib/app-state";
import { FEATURES } from "@/lib/config";
import type { View } from "@/lib/data";
import { equivalences } from "@/lib/metrics";

export function Ambiental({ view }: { view: View }) {
  const { t, fmt } = useDashboard();
  const eq = equivalences(view);
  const pending = t("inValidation");

  return (
    <div className="space-y-10">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label={t("plastic")} value={fmt(view.plastic)} unit="kg" tip={t("tipPlastic")} />
        <StatTile label={t("co2")} value={fmt(view.co2)} unit="kg CO₂e" tip={t("tipCo2")} />
        <StatTile
          label={t("micro")}
          value={view.micro == null ? undefined : fmt(view.micro)}
          unit="kg"
          tip={t("tipMicro")}
          validation={FEATURES.microplasticsValidated ? undefined : pending}
        />
        {/* Slot reservado: falta a fórmula CTUe. */}
        <StatTile label={t("ecotox")} tip={t("tipEcotox")} validation={pending} />
      </div>

      <Block title={t("tei")} tip={t("tipTei")}>
        <Meter value={view.tei} unit="/100" />
      </Block>

      <Group title={t("equivalences")}>
        {/* Água poupada só entra quando estiver validada. */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatTile
            size="sm"
            icon={<Car className="h-4 w-4" />}
            label={t("km")}
            value={fmt(eq.km)}
            tip={t("tipFromCo2")}
          />
          <StatTile
            size="sm"
            icon={<Trees className="h-4 w-4" />}
            label={t("trees")}
            value={fmt(eq.trees)}
            tip={t("tipFromCo2")}
          />
          <StatTile
            size="sm"
            icon={<Droplets className="h-4 w-4" />}
            label={t("showers")}
            value={fmt(eq.showers)}
            tip={t("tipFromCo2")}
          />
          <StatTile
            size="sm"
            icon={<Milk className="h-4 w-4" />}
            label={t("bottles")}
            value={fmt(eq.bottles)}
            tip={t("tipFromPlastic")}
          />
        </div>
      </Group>
    </div>
  );
}
