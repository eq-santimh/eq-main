import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { proposals } from "@/components/equity/mockData";
import { PageAccentHeader } from "@/components/equity/PageAccentHeader";
import { Button } from "@/components/ui/button";

function formatTimeLeft(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (h >= 24) return `${Math.floor(h / 24)}d`;
  return `${h}h ${m}m`;
}

export default function GovernanceCenterPage() {
  const [now, setNow] = useState(0);

  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 20_000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <Head>
        <title>Gobernanza - EQ</title>
      </Head>

      <div className="eq-page">
        <PageAccentHeader
          eyebrow="Sistema de Gobernanza y Votación Activa"
          title="Centro de Gobernanza (demo)"
          description="Cada token equivale a un voto. Los resultados se registran en la blockchain y son inmutables. Esta UI muestra el flujo completo."
        />

        <div className="grid gap-4 lg:grid-cols-2">
          {proposals.map((p) => {
            const left = p.endsAt - now;
            return (
              <div
                key={p.id}
                className="eq-card glass-hover"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">
                      {formatTimeLeft(left)} restantes
                    </div>
                    <div className="mt-2 text-xl font-semibold text-foreground">
                      {p.title}
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <Button
                    asChild
                    className="eq-cta"
                  >
                    <Link href={`/governance/${p.id}`}>
                      Ir a votar <span aria-hidden>→</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="eq-btn-outline rounded-full px-6 py-3">
                    <Link href={`/marketplace`}>Ver token RWA</Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

