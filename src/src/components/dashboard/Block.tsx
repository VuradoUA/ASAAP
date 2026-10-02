import type { ReactNode } from "react";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

/** Superfície base de todos os blocos. */
export function Panel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string | undefined;
}) {
  return <div className={cn("card-surface p-6", className)}>{children}</div>;
}

/** Ícone (i) com tooltip. Descreve o KPI em palavras, nunca a fórmula. */
export function InfoTip({ text }: { text: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={text}
          className="rounded-full text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
        >
          <Info className="h-3.5 w-3.5" />
        </button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs text-xs leading-relaxed">{text}</TooltipContent>
    </Tooltip>
  );
}

/** Selo "Em validação". */
export function ValidationSeal({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-validation-soft px-2.5 py-1 text-xs font-medium text-validation">
      <span className="h-1.5 w-1.5 rounded-full bg-validation" />
      {label}
    </span>
  );
}

/** Painel com título (e tooltip opcional) — o contentor da maioria das métricas. */
export function Block({
  title,
  tip,
  aside,
  className,
  children,
}: {
  title: ReactNode;
  tip?: string | undefined;
  aside?: ReactNode;
  className?: string | undefined;
  children: ReactNode;
}) {
  return (
    <Panel className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 font-sans text-sm font-medium text-muted-foreground">
          {title}
          {tip && <InfoTip text={tip} />}
        </h3>
        {aside}
      </div>
      {children}
    </Panel>
  );
}

/** Grupo de blocos dentro de uma página de secção. */
export function Group({ title, children }: { title?: string | undefined; children: ReactNode }) {
  return (
    <section className="space-y-4">
      {title && <h2 className="text-xl font-normal">{title}</h2>}
      {children}
    </section>
  );
}
