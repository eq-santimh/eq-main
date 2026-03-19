import Head from "next/head";
import Link from "next/link";

import { walletBalances } from "@/components/equity/mockData";
import { Button } from "@/components/ui/button";

export default function WalletHubPage() {
  return (
    <>
      <Head>
        <title>Wallet Hub - EQ</title>
      </Head>

      <div className="eq-page">
        <div className="eq-card">
          <div className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
            Billetera de Fondos
          </div>
          <h2 className="mt-2 text-2xl font-semibold text-foreground">
            Wallet Hub (demo)
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Muestra los balances en las criptomonedas soportadas. Usa la
            pasarela multicripto para convertir instantáneamente a USDT/USDC.
          </p>

          <div className="mt-4">
            <Button
              asChild
              className="eq-cta"
            >
              <Link href="/deposit">
                Depositar / Pagar <span aria-hidden>→</span>
              </Link>
            </Button>
          </div>
        </div>

        <div className="eq-card eq-section-line">
          <div className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
            Balances por red/activo
          </div>

          <div className="mt-4 grid gap-3">
            {walletBalances.map((b) => (
              <div
                key={b.symbol}
                className="flex flex-wrap items-center justify-between gap-4 rounded-sm border border-border/40 bg-black/20 px-4 py-3"
              >
                <div>
                  <div className="text-sm text-muted-foreground">Activo</div>
                  <div className="mt-1 text-xl font-semibold text-foreground">
                    {b.symbol}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">Cantidad</div>
                  <div className="mt-1 text-lg font-semibold text-foreground">
                    {b.amount.toLocaleString(undefined, {
                      maximumFractionDigits: 6,
                    })}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Valor estimado
                  </div>
                  <div className="text-lg font-semibold text-primary">
                    ${b.usdValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

