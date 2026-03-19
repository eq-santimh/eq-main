import Head from "next/head";
import React, { useState } from "react";
import Link from "next/link";

import { dividendHistory } from "@/components/equity/mockData";
import { Button } from "@/components/ui/button";

export default function DividendsPage() {
  const [autoInvest, setAutoInvest] = useState(false);

  return (
    <>
      <Head>
        <title>Dividendos - EQ</title>
      </Head>

      <div className="eq-page">
        <div className="eq-card">
          <div className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
            Centro de Dividendos
          </div>
          <h2 className="mt-2 text-2xl font-semibold text-foreground">
            Historial + Auto-Invest (demo)
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Historial de pagos recibidos, estado “Pendiente” o “Cobrado”, y
            botón para auto-invertir dividendos en nuevos tokens.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <Button
              onClick={() => setAutoInvest((v) => !v)}
              className="eq-cta"
            >
              {autoInvest ? (
                <>
                  Auto-Invest: ON <span aria-hidden>→</span>
                </>
              ) : (
                <>
                  Auto-Invest: OFF <span aria-hidden>→</span>
                </>
              )}
            </Button>
            <Button
              asChild
              variant="outline"
              className="eq-btn-outline rounded-full px-6 py-3"
            >
              <Link href="/analytics">Volver a Analytics</Link>
            </Button>
          </div>
        </div>

        <div className="eq-card eq-section-line">
          <div className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
            Historial de pagos (demo)
          </div>

          <div className="mt-4 grid gap-3">
            {dividendHistory.map((d) => (
              <div
                key={d.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-sm border border-border/40 bg-black/20 px-4 py-3"
              >
                <div>
                  <div className="text-xs text-muted-foreground">Fecha</div>
                  <div className="mt-1 text-sm font-semibold text-foreground">
                    {d.date}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">Monto</div>
                  <div className="mt-1 text-lg font-semibold text-primary">
                    ${d.amountUsd.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{d.status}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-sm border border-border/40 bg-black/20 p-5">
            <div className="text-sm font-semibold text-foreground">Auto-Invest (demo)</div>
            <div className="mt-2 text-sm text-muted-foreground">
              Cuando está habilitado, los dividendos cobrados se reinvierten
              automáticamente para diversificar el portafolio (según sector).
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button
                onClick={() => setAutoInvest(true)}
                className="eq-cta disabled:opacity-50"
                disabled={autoInvest}
              >
                Activar Auto-Invest <span aria-hidden>→</span>
              </Button>
              <Button
                onClick={() => setAutoInvest(false)}
                variant="outline"
                className="eq-btn-outline rounded-full px-6 py-3 disabled:opacity-50"
                disabled={!autoInvest}
              >
                Desactivar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

