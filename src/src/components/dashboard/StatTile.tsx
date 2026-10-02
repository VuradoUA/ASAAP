import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { InfoTip, Panel, ValidationSeal } from "./Block";

type Props = {
  label: string;
  value?: ReactNode;
  unit?: string | undefined;
  tip?: string | undefined;
  icon?: ReactNode;
  /** Texto pequeno sempre visível por baixo do valor, ex.: "(estimativa)". */
  note?: string | undefined;
  /** Mostra o selo de validação. Se não houver `value`, o tile fica vazio (slot reservado). */
  validation?: string | undefined;
  size?: "md" | "sm";
  className?: string | undefined;
};

/** Um número-chave que se lê sozinho. Também serve de slot reservado ("Em validação", sem valor). */
export function StatTile({
  label,
  value,
  unit,
  tip,
  icon,
  note,
  validation,
  size = "md",
  className,
}: Props) {
  const hasValue = value !== undefined && value !== null;
  return (
    <Panel
      className={cn(
        "flex flex-col justify-between",
        size === "md" ? "gap-6" : "gap-3 p-5",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          {icon}
          {label}
        </span>
        {tip && <InfoTip text={tip} />}
      </div>
      <div className="space-y-2">
        {hasValue ? (
          <div
            className={cn(
              "font-display font-light tracking-tight",
              size === "md" ? "text-4xl" : "text-2xl",
            )}
          >
            {value}
            {unit && (
              <span className="ml-1.5 font-sans text-base font-medium text-muted-foreground">
                {unit}
              </span>
            )}
          </div>
        ) : (
          <div
            aria-hidden
            className={cn(
              "font-display text-muted-foreground/40",
              size === "md" ? "text-4xl" : "text-2xl",
            )}
          >
            —
          </div>
        )}
        {note && <p className="text-xs text-muted-foreground">{note}</p>}
        {validation && <ValidationSeal label={validation} />}
      </div>
    </Panel>
  );
}
