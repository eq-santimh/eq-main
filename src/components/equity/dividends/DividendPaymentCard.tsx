import React from "react";

import type { DividendPayment } from "@/components/equity/mockData";
import { FinancialFigure } from "@/components/ui/FinancialFigure";

type DividendPaymentCardProps = {
  payment: DividendPayment;
};

export function DividendPaymentCard({ payment }: DividendPaymentCardProps) {
  return (
    <div
      className="flex flex-wrap items-center justify-between gap-4 glass-panel glass-hover px-4 py-3"
      style={{ "--glass-accent-rgb": "var(--eq-page-accent-rgb)" } as React.CSSProperties}
    >
      <div>
        <div className="text-xs text-muted-foreground">Fecha</div>
        <div className="mt-1 text-sm font-semibold text-foreground">{payment.date}</div>
      </div>
      <div className="text-right">
        <div className="text-xs text-muted-foreground">Monto</div>
        <div className="mt-1 text-xl eq-accent-text">
          <FinancialFigure value={payment.amountUsd} format="currency" />
        </div>
        <div className="mt-1 text-xs text-muted-foreground">{payment.status}</div>
      </div>
    </div>
  );
}
