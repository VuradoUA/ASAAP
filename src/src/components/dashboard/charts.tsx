import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useI18n } from "@/lib/app-state";
import { cn } from "@/lib/utils";

const colors = {
  line: "var(--color-chart-1)",
  grid: "var(--color-border)",
  axis: "var(--color-muted-foreground)",
  target: "var(--color-attention)",
};

/** Série temporal única (nunca dois eixos). */
export function LineMetric<T extends object>({
  data,
  dataKey,
  xKey,
  target,
  height = 180,
  unit = "",
}: {
  data: T[];
  dataKey: keyof T & string;
  xKey: keyof T & string;
  target?: number | undefined;
  height?: number;
  unit?: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid stroke={colors.grid} vertical={false} />
        <XAxis
          dataKey={xKey}
          tick={{ fontSize: 11, fill: colors.axis }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: colors.axis }}
          axisLine={false}
          tickLine={false}
          domain={["auto", "auto"]}
        />
        <Tooltip
          contentStyle={{ borderRadius: 12, border: "1px solid var(--color-border)", fontSize: 12 }}
          formatter={(v) => `${v}${unit}`}
        />
        {target != null && (
          <ReferenceLine y={target} stroke={colors.target} strokeDasharray="4 4" />
        )}
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={colors.line}
          strokeWidth={2.5}
          dot={{ r: 3, fill: colors.line }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

function heatClass(v: number) {
  if (v >= 85) return "bg-positive text-primary-foreground";
  if (v >= 75) return "bg-positive/70 text-primary-foreground";
  if (v >= 65) return "bg-attention/60 text-foreground";
  return "bg-attention text-foreground";
}

/** Magnitude por célula (Recovery by Location). */
export function Heatmap({ cells }: { cells: { name: string; recovery: number }[] }) {
  const { fmt } = useI18n();
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
      {cells.map((c) => (
        <div key={c.name} className={cn("rounded-xl p-4", heatClass(c.recovery))}>
          <div className="text-xs opacity-80">{c.name}</div>
          <div className="font-display text-2xl">{fmt(c.recovery)}%</div>
        </div>
      ))}
    </div>
  );
}

/** Barra horizontal de 2 segmentos (em vez de pizza). */
export function SplitBar({
  a,
  b,
}: {
  a: { label: string; value: number };
  b: { label: string; value: number };
}) {
  return (
    <div className="space-y-2">
      <div className="flex h-4 overflow-hidden rounded-full">
        <div className="bg-primary" style={{ width: `${a.value}%` }} />
        <div className="bg-chart-2/50" style={{ width: `${b.value}%` }} />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>
          {a.label}: {a.value}%
        </span>
        <span>
          {b.label}: {b.value}%
        </span>
      </div>
    </div>
  );
}

/** Comparação de magnitude lado a lado. */
export function BarList({
  items,
  max = 100,
}: {
  items: { label: string; value: number; highlight?: boolean }[];
  max?: number;
}) {
  return (
    <div className="space-y-4">
      {items.map((x) => (
        <div key={x.label} className="space-y-1.5">
          <div className="flex justify-between gap-4 text-sm">
            <span className={x.highlight ? "font-semibold" : "text-muted-foreground"}>
              {x.label}
            </span>
            <span className="font-semibold tabular-nums">{x.value}</span>
          </div>
          <div className="h-3 rounded-full bg-track">
            <div
              className={cn("h-full rounded-full", x.highlight ? "bg-primary" : "bg-neutral")}
              style={{ width: `${Math.min(100, (x.value / max) * 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
