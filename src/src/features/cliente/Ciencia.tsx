import { FlaskConical } from "lucide-react";
import { Panel, ValidationSeal } from "@/components/dashboard";
import { useDashboard } from "@/lib/app-state";
import { scienceCards } from "@/lib/demo-content";

export function Ciencia() {
  const { t, lang } = useDashboard();
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {scienceCards.map((c) => (
        <Panel key={c.title} className="space-y-3">
          <FlaskConical className="h-4 w-4 text-primary" />
          <h3 className="font-sans text-sm font-semibold">{t(c.title)}</h3>
          {c.text ? (
            <p className="text-sm text-muted-foreground">{c.text[lang]}</p>
          ) : (
            <ValidationSeal label={t("inValidation")} />
          )}
        </Panel>
      ))}
    </div>
  );
}
