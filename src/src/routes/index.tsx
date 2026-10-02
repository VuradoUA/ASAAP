import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Database, Lock, Users } from "lucide-react";
import type { ReactNode } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { useI18n } from "@/lib/app-state";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead("Início", "Escolha o Dashboard Cliente, o Dashboard ASAAP ou a gestão de dados."),
  component: Home,
});

function Home() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen">
      <TopBar />
      <main className="mx-auto max-w-3xl space-y-10 px-4 py-16 md:px-8">
        <div className="space-y-2">
          <h1 className="text-5xl font-light">{t("appName")}</h1>
          <p className="text-lg text-muted-foreground">{t("chooseDashboard")}</p>
        </div>
        <nav className="card-surface divide-y divide-border overflow-hidden">
          <Entry
            to="/cliente"
            icon={<Users className="h-5 w-5" />}
            title={t("clientDash")}
            description={t("clientDashDesc")}
          />
          <Entry
            to="/asaap"
            icon={<Lock className="h-5 w-5" />}
            title={t("asaapDash")}
            description={t("asaapDashDesc")}
          />
          <Entry
            to="/dados"
            icon={<Database className="h-5 w-5" />}
            title={t("data")}
            description={t("dataDesc")}
          />
        </nav>
        <p className="text-xs text-muted-foreground">{t("demoNote")}</p>
      </main>
    </div>
  );
}

function Entry({
  to,
  icon,
  title,
  description,
}: {
  to: "/cliente" | "/asaap" | "/dados";
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-5 px-6 py-6 hover:bg-secondary/60 focus-visible:bg-secondary focus-visible:outline-none"
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent text-primary">
        {icon}
      </span>
      <div className="flex-1">
        <div className="font-display text-2xl">{title}</div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
