import Head from "next/head";
import Link from "next/link";
import React, { useMemo, useState } from "react";

import PieChart from "@/components/equity/charts/PieChart";
import LineChart from "@/components/equity/charts/LineChart";
import { portfolioHoldings } from "@/components/equity/mockData";
import { Button } from "@/components/ui/button";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function fmt(n: number, prefix = "$") {
  return `${prefix}${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

const portfolioStats = {
  totalInvested: portfolioHoldings.reduce((s, h) => s + h.invested, 0),
  currentValue: portfolioHoldings.reduce((s, h) => s + h.current, 0),
  get totalEarnings() {
    return this.currentValue - this.totalInvested;
  },
  get avgAnnualReturn() {
    return ((this.currentValue - this.totalInvested) / this.totalInvested) * 100;
  },
};

export default function AnalyticsPage() {
  const [initialCapital, setInitialCapital] = useState("10000");
  const [dividendYieldAnnual, setDividendYieldAnnual] = useState("11");
  const [reinvestPercent, setReinvestPercent] = useState("100");
  const [months, setMonths] = useState(18);

  const prediction = useMemo(() => {
    const P0 = Number(initialCapital || 0);
    const annual = Number(dividendYieldAnnual || 0) / 100;
    const reinv = clamp(Number(reinvestPercent || 0) / 100, 0, 1);
    const monthly = annual / 12;
    const effectiveMonthlyRate = reinv * monthly;
    const m = clamp(months, 1, 120);
    const final = P0 * Math.pow(1 + effectiveMonthlyRate, m);
    const gain = final - P0;
    return { final, gain };
  }, [initialCapital, dividendYieldAnnual, reinvestPercent, months]);

  const pieSlices = [
    { label: "Real Estate", value: 58, color: "#00B4C4" },
    { label: "Energía", value: 42, color: "#306598" },
  ];

  const growthValues = [7200, 8000, 8600, 9300, 10150, 11220, 12480, 13390, 14710, 15420, 16200, 18420];

  return (
    <>
      <Head>
        <title>Analytics - EQ</title>
      </Head>

      <div className="eq-page">
        {/* Header */}
        <div className="eq-card">
          <div className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
            Dashboard Analítico de Rendimiento Patrimonial
          </div>
          <h2 className="mt-2 text-2xl font-semibold text-foreground">
            Interés compuesto + diversificación (demo)
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Panel que consolida inversiones RWA y permite simular crecimiento
            reinvirtiendo dividendos en nuevos tokens de otros proyectos.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <Button asChild className="eq-cta">
              <a href="/dividends">
                Ir a Centro de Dividendos <span aria-hidden>→</span>
              </a>
            </Button>
            <Button asChild variant="outline" className="eq-btn-outline rounded-full px-6 py-3">
              <a href="/exchange/terminal">Terminal de Trading</a>
            </Button>
          </div>
        </div>

        {/* ── Portfolio Summary ── */}
        <section>
          <div className="mb-4">
            <div className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
              Resumen de portafolio
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="eq-card p-5">
              <div className="text-xs text-muted-foreground uppercase tracking-wider">
                Total Invertido
              </div>
              <div className="mt-2 text-2xl font-bold text-foreground">
                {fmt(portfolioStats.totalInvested)}
              </div>
            </div>
            <div className="eq-card p-5">
              <div className="text-xs text-muted-foreground uppercase tracking-wider">
                Valor Actual
              </div>
              <div className="mt-2 text-2xl font-bold text-foreground">
                {fmt(portfolioStats.currentValue)}
              </div>
            </div>
            <div className="eq-card p-5">
              <div className="text-xs text-muted-foreground uppercase tracking-wider">
                Retorno Promedio Anual
              </div>
              <div className="mt-2 text-2xl font-bold text-primary">
                +{portfolioStats.avgAnnualReturn.toFixed(1)}%
              </div>
            </div>
            <div className="eq-card p-5">
              <div className="text-xs text-muted-foreground uppercase tracking-wider">
                Ganancias Totales
              </div>
              <div className="mt-2 text-2xl font-bold text-emerald-400">
                +{fmt(portfolioStats.totalEarnings)}
              </div>
            </div>
          </div>

          {/* Holdings list */}
          <div className="mt-4 eq-card p-0 overflow-hidden">
            <div className="px-5 pt-5 pb-3 border-b border-border/30">
              <div className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
                Mis posiciones
              </div>
            </div>

            <div className="divide-y divide-border/20">
              {portfolioHoldings.map((h) => {
                const pnl = h.current - h.invested;
                const pnlPct = (pnl / h.invested) * 100;

                return (
                  <div key={h.projectId} className="px-5 py-4 hover:bg-white/2 transition-colors">
                    {/* Project name */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-base font-semibold text-foreground">
                        {h.projectName}
                      </span>
                      {h.isBond && (
                        <span title="Bono digital" className="text-base">⭐</span>
                      )}
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-sm mb-3">
                      <div>
                        <div className="text-xs text-muted-foreground mb-0.5">Tokens</div>
                        <div className="font-semibold text-foreground">
                          {h.tokens.toLocaleString("en-US")}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-0.5">Invertido</div>
                        <div className="font-semibold text-foreground">{fmt(h.invested)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-0.5">Actual</div>
                        <div className="font-semibold text-foreground">{fmt(h.current)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-0.5">P&L</div>
                        <div className={`font-semibold ${pnl >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                          {pnl >= 0 ? "+" : ""}{fmt(pnl)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-0.5">%</div>
                        <div className={`font-semibold ${pnlPct >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                          {pnlPct >= 0 ? "+" : ""}{pnlPct.toFixed(1)}%
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2">
                      <Button
                        asChild
                        className="eq-cta flex-1 text-sm py-2"
                      >
                        <Link href={`/exchange/terminal`}>
                          🏛 Trade
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="flex-1 rounded-full border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 text-sm py-2"
                      >
                        <Link href={`/dividends`}>
                          🔥 Earnings
                        </Link>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Charts ── */}
        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="eq-card">
            <h3 className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
              Diversificación por sector (demo)
            </h3>
            <div className="mt-4">
              <PieChart slices={pieSlices} />
            </div>
          </div>

          <div className="space-y-6">
            <LineChart values={growthValues} />
          </div>
        </section>

        {/* ── Compound interest calculator ── */}
        <section className="eq-card eq-section-line">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
                Calculadora predictiva (interés compuesto)
              </div>
              <h3 className="mt-2 text-2xl font-semibold text-foreground">
                Simulación de reinversión
              </h3>
            </div>
            <div className="rounded-sm border border-border/40 bg-black/20 p-4 text-right">
              <div className="text-xs text-muted-foreground">Capital proyectado</div>
              <div className="mt-1 text-2xl font-semibold text-primary">
                ${prediction.final.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                Ganancia neta: $
                {prediction.gain.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="text-xs text-muted-foreground">Capital inicial (USD)</label>
              <input
                className="eq-input mt-2 w-full px-3 py-2"
                value={initialCapital}
                inputMode="decimal"
                onChange={(e) => setInitialCapital(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Dividend yield anual (%)</label>
              <input
                className="eq-input mt-2 w-full px-3 py-2"
                value={dividendYieldAnnual}
                inputMode="decimal"
                onChange={(e) => setDividendYieldAnnual(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Reinvertir (%)</label>
              <input
                className="eq-input mt-2 w-full px-3 py-2"
                value={reinvestPercent}
                inputMode="decimal"
                onChange={(e) => setReinvestPercent(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Horizonte (meses)</label>
              <input
                type="number"
                min={1}
                max={120}
                className="eq-input mt-2 w-full px-3 py-2"
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="mt-4 text-xs text-muted-foreground">
            Demo: el cálculo usa un rendimiento anual dividido en mensualidad y
            la reinversión aplica un factor sobre el crecimiento mensual. En
            producción se alimenta del historial real de dividendos y
            rendimiento por sector.
          </div>
        </section>
      </div>
    </>
  );
}
