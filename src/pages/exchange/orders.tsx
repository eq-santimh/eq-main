import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

type Side = "BUY" | "SELL";

type PlacedOrder = {
  id: string;
  side: Side;
  priceUsd: number;
  quantityTokens: number;
  totalUsd: number;
  createdAt: number;
};

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<PlacedOrder[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem("eq_orders_demo");
    if (raw) {
      try {
        setOrders(JSON.parse(raw) as PlacedOrder[]);
      } catch {
        // ignore
      }
    } else {
      setOrders([]);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Mis Órdenes - EQ</title>
      </Head>

      <div className="eq-page">
        <div className="eq-card">
          <div className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
            P2P Exchange
          </div>
          <h2 className="mt-2 text-2xl font-semibold text-foreground">
            Mis Órdenes (demo)
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Historial de transacciones realizadas en el mercado secundario.
            Se guarda en `localStorage` (demo).
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button asChild className="eq-cta">
              <Link href="/exchange/terminal">
                Volver a Trading Terminal <span aria-hidden>→</span>
              </Link>
            </Button>
          </div>
        </div>

        <div className="eq-card eq-section-line">
          <div className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
            Historial (últimas {Math.min(20, orders.length)})
          </div>

          {orders.length === 0 ? (
            <div className="mt-6 rounded-sm border border-border/40 bg-black/20 p-6 text-sm text-muted-foreground">
              No hay órdenes todavía. Coloca una orden en el Terminal para verla
              aquí.
            </div>
          ) : (
            <div className="mt-4 grid gap-3">
              {orders.slice(0, 20).map((o) => (
                <div
                  key={o.id}
                  className="rounded-sm border border-border/40 bg-black/20 p-4 flex flex-wrap items-center justify-between gap-4"
                >
                  <div>
                    <div className="text-xs text-muted-foreground">Orden</div>
                    <div className="mt-1 text-sm font-semibold text-foreground">
                      {o.side} • {o.id}
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      {new Date(o.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Precio</div>
                    <div className="mt-1 text-sm font-semibold text-primary">
                      ${o.priceUsd.toFixed(2)}
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Cantidad / Total
                    </div>
                    <div className="mt-1 text-sm font-semibold text-foreground">
                      {o.quantityTokens} tokens • ${o.totalUsd.toFixed(0)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

