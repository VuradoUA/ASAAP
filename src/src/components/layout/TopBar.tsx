import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";
import { useDashboard, useI18n, type Mode } from "@/lib/app-state";
import { cn } from "@/lib/utils";

/** Cabeçalho fixo: marca, nome do dashboard, abas Por Evento/Acumulado e idioma. */
export function TopBar({
  title,
  titleTo,
  showModes = false,
  actions,
  children,
}: {
  title?: string | undefined;
  titleTo?: "/cliente" | "/asaap" | undefined;
  showModes?: boolean;
  actions?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="no-print sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3 md:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-full focus-visible:outline-2 focus-visible:outline-ring"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground">
            <Leaf className="h-4 w-4" />
          </span>
          <span className="font-display text-lg leading-none">PlastNatur</span>
        </Link>
        {title && (
          <>
            <span className="text-border" aria-hidden>
              /
            </span>
            {titleTo ? (
              <Link to={titleTo} className="text-sm font-medium hover:underline">
                {title}
              </Link>
            ) : (
              <span className="text-sm font-medium">{title}</span>
            )}
          </>
        )}
        <div className="ml-auto flex items-center gap-2">
          {showModes && <ModeTabs />}
          <LangToggle />
          {actions}
        </div>
      </div>
      {children}
    </header>
  );
}

function ModeTabs() {
  const { t, mode, setMode } = useDashboard();
  const modes: { id: Mode; label: string }[] = [
    { id: "event", label: t("perEvent") },
    { id: "cumulative", label: t("cumulative") },
  ];
  return (
    <div role="tablist" className="flex rounded-full bg-secondary p-1">
      {modes.map((m) => (
        <button
          key={m.id}
          role="tab"
          aria-selected={mode === m.id}
          onClick={() => setMode(m.id)}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-ring",
            mode === m.id
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}

function LangToggle() {
  const { lang, setLang } = useI18n();
  return (
    <button
      onClick={() => setLang(lang === "pt" ? "en" : "pt")}
      aria-label={lang === "pt" ? "Switch to English" : "Mudar para português"}
      className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
    >
      {lang === "pt" ? "EN" : "PT"}
    </button>
  );
}
