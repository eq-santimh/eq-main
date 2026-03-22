import React from "react";

import type { StatCardProps, StatTone } from "@/components/home/cards/types";

const statAccentRgbMap: Record<Exclude<StatTone, "page">, string> = {
  primary: "0, 180, 196",
  green: "52, 211, 153",
  amber: "245, 158, 11",
  red: "239, 68, 68",
};

const statColorMap: Record<
  StatTone,
  { tint: string; icon: string; value: string; accentRgb?: string }
> = {
  primary: {
    tint: "bg-primary/8",
    icon: "text-primary",
    value: "text-primary",
    accentRgb: statAccentRgbMap.primary,
  },
  green: {
    tint: "bg-emerald-500/8",
    icon: "text-emerald-400",
    value: "text-emerald-400",
    accentRgb: statAccentRgbMap.green,
  },
  amber: {
    tint: "bg-amber-500/8",
    icon: "text-amber-400",
    value: "text-amber-400",
    accentRgb: statAccentRgbMap.amber,
  },
  red: {
    tint: "bg-red-500/8",
    icon: "text-red-400",
    value: "text-red-400",
    accentRgb: statAccentRgbMap.red,
  },
  page: {
    tint: "bg-[rgba(var(--eq-page-accent-rgb),0.08)]",
    icon: "eq-accent-text",
    value: "eq-accent-text",
  },
};

function StatCard({ label, value, sub, icon, color }: StatCardProps) {
  const palette = statColorMap[color];
  const accentRgb = palette.accentRgb ?? "var(--eq-page-accent-rgb)";

  return (
    <div
      className="glass-surface glass-hover p-4 relative overflow-hidden"
      style={{ "--glass-accent-rgb": accentRgb } as React.CSSProperties}
    >
      <div className={`absolute inset-0 rounded-[16px] pointer-events-none ${palette.tint}`} />
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div className={`rounded-sm p-1.5 bg-black/20 ${palette.icon}`}>{icon}</div>
        </div>
        <div className={`mt-3 text-3xl font-bold leading-none ${palette.value}`}>{value}</div>
        <div className="mt-1.5 text-xs text-muted-foreground">{label}</div>
        {sub && <div className="mt-0.5 text-[10px] text-muted-foreground/60">{sub}</div>}
      </div>
    </div>
  );
}

export { StatCard };
