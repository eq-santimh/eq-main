import React from "react";
import { FinancialFigure } from "@/components/ui/FinancialFigure";

type Slice = { label: string; value: number; color: string };

export default function PieChart({ slices }: { slices: Slice[] }) {
  const total = slices.reduce((sum, s) => sum + s.value, 0) || 1;

  const gradient = slices
    .map((s, i) => {
      const start = (slices.slice(0, i).reduce((sum, x) => sum + x.value, 0) / total) * 100;
      const end =
        ((slices.slice(0, i).reduce((sum, x) => sum + x.value, 0) + s.value) / total) *
        100;
      return `${s.color} ${start.toFixed(2)}% ${end.toFixed(2)}%`;
    })
    .join(", ");

  return (
    <div className="grid gap-4 lg:grid-cols-[220px_1fr] items-center">
      <div className="relative mx-auto aspect-square w-[220px]">
        <div
          className="absolute inset-0 rounded-full"
          style={{ backgroundImage: `conic-gradient(${gradient})` }}
        />
        <div className="absolute left-1/2 top-1/2 h-[140px] w-[140px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#08070e] border border-border/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-xs text-muted-foreground">Diversificación</div>
            <div className="text-xl font-semibold text-foreground">RWA</div>
          </div>
        </div>
      </div>

      <div className="grid gap-2">
        {slices.map((s) => {
          const pct = (s.value / total) * 100;
          return (
            <div key={s.label} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: s.color }}
                />
                <span className="text-sm text-muted-foreground">{s.label}</span>
              </div>
              <FinancialFigure value={pct} format="percent" className="text-base text-foreground" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

