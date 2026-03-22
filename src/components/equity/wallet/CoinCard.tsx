import React from "react";

import { FinancialFigure } from "@/components/ui/FinancialFigure";

type CoinCardProps = {
  symbol: string;
  amount: number;
  usdValue: number;
};

export function CoinCard({ symbol, amount, usdValue }: CoinCardProps) {
  return (
    <div
      className="flex flex-wrap items-center justify-between gap-4 glass-panel glass-hover px-4 py-3"
      style={{ "--glass-accent-rgb": "var(--eq-page-accent-rgb)" } as React.CSSProperties}
    >
      <div>
        <div className="text-sm text-muted-foreground">Activo</div>
        <div className="mt-1 text-xl font-semibold text-foreground">{symbol}</div>
      </div>
      <div className="text-right">
        <div className="text-xs text-muted-foreground">Cantidad</div>
        <div className="mt-1 text-xl text-foreground">
          <FinancialFigure
            value={amount.toLocaleString(undefined, { maximumFractionDigits: 6 })}
            format="raw"
          />
        </div>
        <div className="mt-1 text-xs text-muted-foreground">Valor estimado</div>
        <div className="text-xl eq-accent-text">
          <FinancialFigure value={usdValue} format="currency" />
        </div>
      </div>
    </div>
  );
}
