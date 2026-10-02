import { useI18n } from "@/lib/app-state";
import { cn } from "@/lib/utils";

type Status = "positive" | "attention" | "neutral";
const text: Record<Status, string> = {
  positive: "text-positive",
  attention: "text-attention",
  neutral: "text-foreground",
};
const bar: Record<Status, string> = {
  positive: "bg-positive",
  attention: "bg-attention",
  neutral: "bg-neutral",
};

type Props = {
  value: number;
  max?: number;
  /** Número-meta que dá escala ao meter (fica visível). */
  target?: number | undefined;
  targetLabel?: string | undefined;
  /** Quanto menor, melhor (ex.: contaminação). */
  invert?: boolean;
  unit?: string;
};

/** Rácio contra um limite. */
export function Meter({
  value,
  max = 100,
  target,
  targetLabel,
  invert = false,
  unit = "%",
}: Props) {
  const { fmt } = useI18n();
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const status = meterStatus(value, target, invert);
  return (
    <div className="space-y-3">
      <div className={cn("font-display text-4xl font-light", text[status])}>
        {fmt(value)}
        <span className="ml-1 font-sans text-base text-muted-foreground">{unit}</span>
      </div>
      <div
        className="relative h-2.5 w-full rounded-full bg-track"
        role="meter"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div className={cn("h-full rounded-full", bar[status])} style={{ width: `${pct}%` }} />
        {target != null && (
          <div
            className="absolute -top-1.5 h-5.5 w-0.5 rounded bg-foreground/70"
            style={{ left: `${(target / max) * 100}%` }}
          />
        )}
      </div>
      {target != null && targetLabel && (
        <p className="text-xs text-muted-foreground">
          {targetLabel}: {target}
          {unit}
        </p>
      )}
    </div>
  );
}

function meterStatus(value: number, target: number | undefined, invert: boolean): Status {
  if (target == null) return value >= 70 ? "positive" : value >= 55 ? "attention" : "neutral";
  const ok = invert ? value <= target : value >= target;
  const near = invert ? value <= target * 1.25 : value >= target * 0.9;
  return ok ? "positive" : near ? "attention" : "neutral";
}
