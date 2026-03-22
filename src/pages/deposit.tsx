import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

import PseudoQr from "@/components/equity/PseudoQr";
import { PageAccentHeader } from "@/components/equity/PageAccentHeader";
import { Button } from "@/components/ui/button";
import { EquittyPrimary } from "@/components/ui/EquittyPrimary";

type AssetSymbol = "BTC" | "ETH" | "SOL" | "ADA" | "BNB" | "LTC" | "DOGE";

const ratesToUsd: Record<AssetSymbol, number> = {
  BTC: 65000,
  ETH: 3400,
  SOL: 145,
  ADA: 0.54,
  BNB: 725,
  LTC: 85,
  DOGE: 0.075,
};

const stableOptions = [
  { id: "USDT", label: "USDT" },
  { id: "USDC", label: "USDC" },
];

export default function DepositPage() {
  const [asset, setAsset] = useState<AssetSymbol>("ETH");
  const [amount, setAmount] = useState<string>("0.75");
  const [stable, setStable] = useState<string>("USDC");

  const [txRef, setTxRef] = useState<string>("DEMO_TX_PENDING");

  useEffect(() => {
    // Generate after mount to avoid SSR/CSR mismatch
    const seed = `${asset}:${amount}:${stable}:${Date.now()}`;
    // eslint-disable-next-line no-bitwise
    const h = Array.from(seed).reduce((acc, c) => (acc * 33 + c.charCodeAt(0)) >>> 0, 5381);
    setTxRef(`DEMO_TX_${h.toString(16).slice(0, 10).toUpperCase()}`);
  }, [asset, amount, stable]);

  const amountNum = Number(amount || 0);
  const usdValue = useMemo(() => amountNum * ratesToUsd[asset], [amountNum, asset]);

  return (
    <>
      <Head>
        <title>Depósito/Pago - EQ</title>
      </Head>

      <div className="eq-page">
        <PageAccentHeader
          eyebrow="Pasarela de Pagos Multicripto"
          title="Entrada amplia + conversión instantánea (demo)"
          description="Selecciona un activo (BTC/ETH/SOL/ADA/BNB/LTC/DOGE), define la cantidad y el sistema calcula la conversión a USDT/USDC para congelar el valor al momento de la compra."
          actions={
            <>
              <Button asChild variant="outline" className="eq-btn-outline rounded-full px-6 py-3">
                <Link href="/wallet-hub">Volver a Wallet Hub</Link>
              </Button>
              <EquittyPrimary href="/marketplace">
                Invertir en Marketplace
              </EquittyPrimary>
            </>
          }
        />

        <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="eq-card">
            <h3 className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
              Calculadora de conversión
            </h3>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label className="text-xs text-muted-foreground">Red / Activo</label>
                <select
                  className="eq-input mt-2 w-full px-3 py-2"
                  value={asset}
                  onChange={(e) => setAsset(e.target.value as AssetSymbol)}
                >
                  <option value="BTC">BTC (Bitcoin)</option>
                  <option value="ETH">ETH (Ethereum)</option>
                  <option value="SOL">SOL (Solana)</option>
                  <option value="ADA">ADA (Cardano)</option>
                  <option value="BNB">BNB (Binance Coin)</option>
                  <option value="LTC">LTC (Litecoin)</option>
                  <option value="DOGE">DOGE (Dogecoin)</option>
                </select>
              </div>

              <div className="sm:col-span-1">
                <label className="text-xs text-muted-foreground">
                  Estable (USDT/USDC)
                </label>
                <select
                  className="eq-input mt-2 w-full px-3 py-2"
                  value={stable}
                  onChange={(e) => setStable(e.target.value)}
                >
                  {stableOptions.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs text-muted-foreground">
                  Monto en {asset}
                </label>
                <input
                  className="eq-input mt-2 w-full px-3 py-2"
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-5 grid gap-3 glass-panel p-5">
              <div className="flex items-center justify-between gap-4">
                <div className="text-sm text-muted-foreground">
                  Valor estimado (USD)
                </div>
                <div className="text-lg font-semibold text-foreground">
                  ${usdValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="text-sm text-muted-foreground">
                  Conversión a {stable} (freeze)
                </div>
                <div className="text-lg font-semibold text-primary">
                  {usdValue.toLocaleString(undefined, { maximumFractionDigits: 2 })} {stable}
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                Demo: la tasa usa un valor fijo por activo. En producción se
                integraría con un price feed y un motor de cotización
                multicadena.
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="eq-card">
              <h3 className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
                Código QR de transacción (mock)
              </h3>

              <div className="mt-4 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-muted-foreground">Tx ref</div>
                  <div className="mt-1 text-sm font-semibold text-foreground">
                    {txRef}
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Dirección depósito (demo)
                  </div>
                  <div className="mt-1 text-xs font-mono text-primary">
                    {asset}_ADDRESS_{stable}
                  </div>
                </div>
                <div className="hidden md:block text-right">
                  <div className="text-xs text-muted-foreground">Tiempo</div>
                  <div className="mt-1 text-sm font-semibold text-foreground">10 min</div>
                </div>
              </div>

              <div className="mt-4">
                <PseudoQr value={txRef} />
              </div>
            </div>

            <div className="eq-card eq-section-line">
              <h3 className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
                Instrucciones de pago
              </h3>
              <div className="mt-4 grid gap-3">
                <div className="glass-panel p-4 text-sm text-muted-foreground">
                  1) Envía {amount || "0"} {asset} a la dirección demo.
                </div>
                <div className="glass-panel p-4 text-sm text-muted-foreground">
                  2) El backend convierte instantáneamente a {stable}.
                </div>
                <div className="glass-panel p-4 text-sm text-muted-foreground">
                  3) Se emiten tokens de inversión (RWA) contra el valor
                  estable congelado.
                </div>
              </div>

              <Button className="eq-cta mt-4 w-full">
                Generar/Confirmar Pago <span aria-hidden>→</span>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

