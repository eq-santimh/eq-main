import Head from "next/head";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Coins,
  Grid2X2,
  Layers,
  Shield,
  TrendingUp,
  Wallet,
  Clock,
} from "lucide-react";

import { projects } from "@/components/equity/mockData";

/* ── Stat card ── */
type StatProps = {
  label: string;
  value: string;
  sub?: string;
  icon: React.ReactNode;
  color: "primary" | "green" | "amber" | "red";
};

const colorMap = {
  primary: {
    bg: "bg-primary/10 border-primary/20",
    icon: "text-primary",
    value: "text-primary",
  },
  green: {
    bg: "bg-emerald-500/10 border-emerald-500/20",
    icon: "text-emerald-400",
    value: "text-emerald-400",
  },
  amber: {
    bg: "bg-amber-500/10 border-amber-500/20",
    icon: "text-amber-400",
    value: "text-amber-400",
  },
  red: {
    bg: "bg-red-500/10 border-red-500/20",
    icon: "text-red-400",
    value: "text-red-400",
  },
};

function StatCard({ label, value, sub, icon, color }: StatProps) {
  const c = colorMap[color];
  return (
    <div className={`rounded-2xl border p-4 backdrop-blur ${c.bg}`}>
      <div className="flex items-start justify-between">
        <div className={`rounded-lg p-1.5 bg-black/20 ${c.icon}`}>{icon}</div>
      </div>
      <div className={`mt-3 text-2xl font-bold leading-none ${c.value}`}>
        {value}
      </div>
      <div className="mt-1.5 text-xs text-muted-foreground">{label}</div>
      {sub && <div className="mt-0.5 text-[10px] text-muted-foreground/60">{sub}</div>}
    </div>
  );
}

/* ── Module card ── */
type ModuleProps = {
  href: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  accent: string; // tailwind bg+border classes
  iconColor: string;
};

function ModuleCard({ href, label, description, icon, accent, iconColor }: ModuleProps) {
  return (
    <Link href={href} className="group block">
      <div className="h-full rounded-2xl border border-border/40 bg-card/10 p-5 backdrop-blur transition-all duration-200 hover:bg-white/4 hover:border-border/70">
        <div className={`inline-flex items-center justify-center rounded-xl p-2.5 border ${accent}`}>
          <span className={iconColor}>{icon}</span>
        </div>
        <div className="mt-4 text-sm font-semibold text-foreground">{label}</div>
        <div className="mt-1 text-xs text-muted-foreground leading-relaxed">{description}</div>
        <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground/60 group-hover:text-muted-foreground transition-colors">
          <span>Abrir</span>
          <ArrowUpRight className="size-3" />
        </div>
      </div>
    </Link>
  );
}

/* ── Main ── */
export default function Home() {
  const topProjects = projects.slice(0, 4);

  return (
    <>
      <Head>
        <title>EQ — Dashboard</title>
      </Head>

      <div className="eq-page">
        {/* ── Hero ── */}
        <section className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
          {/* Left: headline */}
          <div className="eq-card relative overflow-hidden">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-black/20 px-3 py-1 text-xs text-foreground/80">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                RWA · Multicripto · Gobernanza · Liquidez
              </div>

              <h1 className="mt-5 text-balance text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
                Dashboard de{" "}
                <span className="eq-rwa">
                  Real World Assets
                  <span className="eq-cursor">▍</span>
                </span>
              </h1>

              <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
                Emite, fracciona y negocia activos tokenizados. Gobernanza
                on-chain, dividendos automáticos y mercado secundario P2P.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/marketplace" className="eq-cta">
                  Explorar Marketplace <span aria-hidden>→</span>
                </Link>
                <Link
                  href="/wallet-hub"
                  className="eq-btn-outline inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-medium transition-all hover:bg-white/5"
                >
                  Wallet Hub
                </Link>
              </div>
            </div>
          </div>

          {/* Right: stats */}
          <div className="grid grid-cols-2 gap-3 content-start">
            <StatCard
              label="Portafolio Total"
              value="$18,420"
              sub="↑ $648 este mes"
              icon={<TrendingUp className="size-4" />}
              color="primary"
            />
            <StatCard
              label="ROI Anual Est."
              value="+11.2%"
              sub="Promedio ponderado"
              icon={<BarChart3 className="size-4" />}
              color="green"
            />
            <StatCard
              label="Dividendos Pend."
              value="$0"
              sub="Próximo: 2026-03-30"
              icon={<Clock className="size-4" />}
              color="amber"
            />
            <StatCard
              label="Activos RWA"
              value="3"
              sub="Tokens en portafolio"
              icon={<Layers className="size-4" />}
              color="primary"
            />
          </div>
        </section>

        {/* ── Modules ── */}
        <section>
          <div className="mb-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Módulos
          </div>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
            <ModuleCard
              href="/marketplace"
              label="Marketplace"
              description="RWA tokenizados, filtros y fondeo en tiempo real."
              icon={<Grid2X2 className="size-5" />}
              accent="bg-primary/10 border-primary/25"
              iconColor="text-primary"
            />
            <ModuleCard
              href="/wallet-hub"
              label="Wallet Hub"
              description="Balances, conversión multicripto y QR de pago."
              icon={<Wallet className="size-5" />}
              accent="bg-blue-500/10 border-blue-500/25"
              iconColor="text-blue-400"
            />
            <ModuleCard
              href="/governance"
              label="Gobernanza"
              description="Propuestas on-chain. 1 token = 1 voto."
              icon={<Shield className="size-5" />}
              accent="bg-violet-500/10 border-violet-500/25"
              iconColor="text-violet-400"
            />
            <ModuleCard
              href="/analytics"
              label="Analytics"
              description="Portafolio, diversificación e interés compuesto."
              icon={<BarChart3 className="size-5" />}
              accent="bg-emerald-500/10 border-emerald-500/25"
              iconColor="text-emerald-400"
            />
            <ModuleCard
              href="/dividends"
              label="Dividendos"
              description="Historial de pagos y auto-inversión de rendimientos."
              icon={<Coins className="size-5" />}
              accent="bg-amber-500/10 border-amber-500/25"
              iconColor="text-amber-400"
            />
            <ModuleCard
              href="/exchange/terminal"
              label="Mercado Secundario"
              description="Order book P2P y terminal de trading."
              icon={<Activity className="size-5" />}
              accent="bg-orange-500/10 border-orange-500/25"
              iconColor="text-orange-400"
            />
          </div>
        </section>

        {/* ── Featured projects ── */}
        <section className="eq-card p-0 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border/30">
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Proyectos destacados
            </div>
            <Link
              href="/marketplace"
              className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
            >
              Ver todos <ArrowUpRight className="size-3" />
            </Link>
          </div>

          <div className="divide-y divide-border/20">
            {topProjects.map((p, i) => {
              const categoryColor: Record<string, string> = {
                Residential: "bg-blue-400",
                Commercial: "bg-violet-400",
                Energy: "bg-amber-400",
                Hospitality: "bg-emerald-400",
                Public: "bg-primary",
                Bonds: "bg-orange-400",
                Entertainment: "bg-pink-400",
              };
              const dot = categoryColor[p.category] ?? "bg-primary";

              return (
                <Link
                  key={p.id}
                  href={`/marketplace/${p.id}`}
                  className="group flex items-center gap-4 px-5 py-3.5 hover:bg-white/3 transition-colors"
                >
                  {/* Index */}
                  <span className="w-5 shrink-0 text-xs font-mono text-muted-foreground/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Category dot + name */}
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <span className={`h-2 w-2 shrink-0 rounded-full ${dot}`} />
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-foreground truncate">
                        {p.title}
                      </div>
                      <div className="text-[10px] text-muted-foreground/60 truncate">
                        {p.location} · {p.category}
                      </div>
                    </div>
                  </div>

                  {/* Progress bar (hidden on small) */}
                  <div className="hidden sm:block w-24 shrink-0">
                    <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${p.progressFondeo}%` }}
                      />
                    </div>
                    <div className="mt-1 text-[10px] text-muted-foreground/50 text-right">
                      {p.progressFondeo}% fondeado
                    </div>
                  </div>

                  {/* ROI */}
                  <div className="text-right shrink-0">
                    <div className="text-base font-bold text-emerald-400">
                      +{p.roiAnnual.toFixed(1)}%
                    </div>
                    <div className="text-[10px] text-muted-foreground/50">
                      ${p.pricePerTokenUsd.toLocaleString("en-US")}/token
                    </div>
                  </div>

                  {/* Arrow */}
                  <ArrowUpRight className="size-3.5 text-muted-foreground/30 group-hover:text-primary transition-colors shrink-0" />
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
