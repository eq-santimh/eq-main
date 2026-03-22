import Head from "next/head";

import { walletBalances } from "@/components/equity/mockData";
import { PageAccentHeader } from "@/components/equity/PageAccentHeader";
import { CoinCard } from "@/components/equity/wallet/CoinCard";
import { EquittyPrimary } from "@/components/ui/EquittyPrimary";

export default function WalletHubPage() {
  return (
    <>
      <Head>
        <title>Wallet Hub - EQ</title>
      </Head>

      <div className="eq-page">
        <PageAccentHeader
          eyebrow="Billetera de Fondos"
          title="Wallet Hub (demo)"
          description="Muestra los balances en las criptomonedas soportadas. Usa la pasarela multicripto para convertir instantáneamente a USDT/USDC."
          actions={(
            <EquittyPrimary href="/deposit">
              Depositar / Pagar
            </EquittyPrimary>
          )}
        />

        <div className="eq-card eq-section-line">
          <div className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
            Balances por red/activo
          </div>

          <div className="mt-4 grid gap-3">
            {walletBalances.map((b) => (
              <CoinCard
                key={b.symbol}
                symbol={b.symbol}
                amount={b.amount}
                usdValue={b.usdValue}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

