import Head from "next/head";
import React, { useState } from "react";
import Link from "next/link";

import { dividendHistory } from "@/components/equity/mockData";
import { DividendPaymentCard } from "@/components/equity/dividends/DividendPaymentCard";
import { PageAccentHeader } from "@/components/equity/PageAccentHeader";
import { Button } from "@/components/ui/button";
import { EquittyPrimary } from "@/components/ui/EquittyPrimary";

export default function DividendsPage() {
  const [autoInvest, setAutoInvest] = useState(false);

  return (
    <>
      <Head>
        <title>Dividendos - EQ</title>
      </Head>

      <div className="eq-page">
        <PageAccentHeader
          eyebrow="Centro de Dividendos"
          title="Historial + Auto-Invest (demo)"
          description="Historial de pagos recibidos, estado 'Pendiente' o 'Cobrado', y botón para auto-invertir dividendos en nuevos tokens."
          actions={
            <>
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
            </>
          }
        />

        <div className="eq-card eq-section-line">
          <div className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
            Historial de pagos (demo)
          </div>

          <div className="mt-4 grid gap-3">
            {dividendHistory.map((d) => (
              <DividendPaymentCard key={d.id} payment={d} />
            ))}
          </div>

          <div className="mt-5 glass-panel p-5">
            <div className="text-sm font-semibold text-foreground">Auto-Invest (demo)</div>
            <div className="mt-2 text-sm text-muted-foreground">
              Cuando está habilitado, los dividendos cobrados se reinvierten
              automáticamente para diversificar el portafolio (según sector).
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <EquittyPrimary
                onClick={() => setAutoInvest(true)}
                disabled={autoInvest}
              >
                Activar Auto-Invest
              </EquittyPrimary>
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

