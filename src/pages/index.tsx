import Head from "next/head";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { projects } from "@/components/equity/mockData";
import { ModuleCard, StatCard } from "@/components/home/cards";
import { HOME_MODULES, HOME_STATS } from "@/components/home/home-data";
import { StatusBadge } from "@/components/ui/status-badge";

/* ── Main ── */
export default function Home() {
  const topProjects = projects.slice(0, 4);

  return (
    <>
      <Head>
        <title>EQ — Dashboard</title>
      </Head>
    
      <div className="eq-page pt-24 sm:pt-28">
        {/* ── Hero ── */}
        <section className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
          {/* Left: headline */}
          <div className="eq-card relative overflow-hidden">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
            <div className="relative">
              <StatusBadge
                variant="info"
                label="RWA · Multicripto · Gobernanza · Liquidez"
                className="normal-case tracking-[0.06em] text-foreground/80"
              />

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
            {HOME_STATS.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </section>

        {/* ── Modules ── */}
        <section>
          <div className="mb-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Módulos
          </div>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
            {HOME_MODULES.map((module) => (
              <ModuleCard key={module.href} {...module} />
            ))}
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
