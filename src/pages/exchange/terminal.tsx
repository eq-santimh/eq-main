import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

import { orderBookMock } from "@/components/equity/mockData";
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

function computeId(seed: string) {
  // eslint-disable-next-line no-bitwise
  const h = Array.from(seed).reduce((acc, c) => (acc * 33 + c.charCodeAt(0)) >>> 0, 5381);
  return `ord_${h.toString(16).slice(0, 10).toUpperCase()}`;
}

export default function ExchangeTerminalPage() {
  const [side, setSide] = useState<Side>("BUY");
  const [price, setPrice] = useState("1.01");
  const [quantity, setQuantity] = useState("250");

  const [orders, setOrders] = useState<PlacedOrder[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem("eq_orders_demo");
    if (raw) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setOrders(JSON.parse(raw) as PlacedOrder[]);
      } catch {
        // ignore
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("eq_orders_demo", JSON.stringify(orders));
  }, [orders]);

  const parsedPrice = Number(price || 0);
  const parsedQty = Number(quantity || 0);
  const total = parsedPrice * parsedQty;

  const [book, setBook] = useState(orderBookMock);

  const tokenSymbol = "EQ-RWA";

  const previewSummary = useMemo(() => {
    const bestBuy = book.buy[0];
    const bestSell = book.sell[0];
    return {
      spreadUsd: bestSell.priceUsd - bestBuy.priceUsd,
      midUsd: (bestSell.priceUsd + bestBuy.priceUsd) / 2,
    };
  }, [book]);

  return (
    <>
      <Head>
        <title>Terminal Trading - EQ</title>
      </Head>

      <div className="eq-page">
        <div className="eq-card">
          <div className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
            Mercado Secundario de Liquidez (P2P)
          </div>
          <h2 className="mt-2 text-2xl font-semibold text-foreground">
            Terminal de Trading (demo)
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Order book interno para listar tokens para venta antes de que el
            activo subyacente se liquide. Demo con un book simplificado.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button asChild className="eq-cta">
              <Link href="/exchange/orders">
                Mis Órdenes <span aria-hidden>→</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="eq-btn-outline rounded-full px-6 py-3">
              <Link href="/marketplace">Marketplace</Link>
            </Button>
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="eq-card">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Order Book</div>
                <div className="mt-1 text-xl font-semibold text-foreground">
                  {tokenSymbol}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Spread (demo)</div>
                <div className="mt-1 text-lg font-semibold text-primary">
                  ${previewSummary.spreadUsd.toFixed(3)}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Mid: ${previewSummary.midUsd.toFixed(3)}
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-border/40 bg-black/20 p-4">
                <div className="text-sm font-semibold text-foreground">Compra</div>
                <div className="mt-3 grid gap-2">
                  {book.buy.map((l, idx) => (
                    <div
                      key={`${l.priceUsd}-${idx}`}
                      className="flex items-center justify-between gap-3 rounded-xl border border-border/30 bg-black/10 px-3 py-2"
                    >
                      <div className="text-sm text-primary font-semibold">
                        ${l.priceUsd.toFixed(2)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {l.quantityTokens} tokens
                      </div>
                      <div className="text-xs text-muted-foreground">
                        ${l.totalUsd.toFixed(0)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border/40 bg-black/20 p-4">
                <div className="text-sm font-semibold text-foreground">Venta</div>
                <div className="mt-3 grid gap-2">
                  {book.sell.map((l, idx) => (
                    <div
                      key={`${l.priceUsd}-${idx}`}
                      className="flex items-center justify-between gap-3 rounded-xl border border-border/30 bg-black/10 px-3 py-2"
                    >
                      <div className="text-sm text-primary font-semibold">
                        ${l.priceUsd.toFixed(2)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {l.quantityTokens} tokens
                      </div>
                      <div className="text-xs text-muted-foreground">
                        ${l.totalUsd.toFixed(0)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="eq-card">
              <div className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
                Colocar orden (demo)
              </div>

              <div className="mt-4 grid gap-4">
                <div>
                  <label className="text-xs text-muted-foreground">Tipo</label>
                  <div className="mt-2 flex gap-3">
                    <Button
                      type="button"
                      onClick={() => setSide("BUY")}
                      className={[
                        "flex-1 rounded-xl",
                        side === "BUY"
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "border border-border/60 bg-black/20 hover:bg-white/5 text-foreground",
                      ].join(" ")}
                    >
                      Comprar
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setSide("SELL")}
                      className={[
                        "flex-1 rounded-xl",
                        side === "SELL"
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "border border-border/60 bg-black/20 hover:bg-white/5 text-foreground",
                      ].join(" ")}
                    >
                      Vender
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground">Precio (USD)</label>
                  <input
                    className="eq-input mt-2 w-full px-3 py-2"
                    inputMode="decimal"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-xs text-muted-foreground">
                    Cantidad (tokens)
                  </label>
                  <input
                    className="eq-input mt-2 w-full px-3 py-2"
                    inputMode="decimal"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>

                <div className="rounded-2xl border border-border/40 bg-black/20 p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">Total</div>
                    <div className="text-lg font-semibold text-primary">
                      ${total.toFixed(0)}
                    </div>
                  </div>
                </div>

                <Button
                  type="button"
                  className="eq-cta disabled:opacity-50"
                  disabled={!parsedPrice || !parsedQty}
                  onClick={() => {
                    const id = computeId(`${side}:${price}:${quantity}:${Date.now()}`);
                    const newOrder: PlacedOrder = {
                      id,
                      side,
                      priceUsd: parsedPrice,
                      quantityTokens: parsedQty,
                      totalUsd: total,
                      createdAt: Date.now(),
                    };

                    setOrders((prev) => [newOrder, ...prev].slice(0, 20));

                    // Update book preview locally (mock)
                    setBook((prev) => {
                      const line = { priceUsd: parsedPrice, quantityTokens: parsedQty, totalUsd: total };
                      if (side === "BUY") {
                        return { ...prev, buy: [line, ...prev.buy] };
                      }
                      return { ...prev, sell: [line, ...prev.sell] };
                    });
                  }}
                >
                  Colocar orden <span aria-hidden>→</span>
                </Button>
              </div>
            </div>

            <div className="eq-card eq-section-line">
              <div className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
                Notas (prototype)
              </div>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground list-disc pl-5">
                <li>En producción se ejecuta match engine interno.</li>
                <li>Las órdenes se registran y liquidan con settlement on-chain.</li>
                <li>Esta UI simula el book y la lista de “Mis Órdenes”.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

