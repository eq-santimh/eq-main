import Link from "next/link";
import React from "react";
import { ArrowUpRight } from "lucide-react";

type StatTone = "primary" | "green" | "amber" | "red";

type StatCardProps = {
  label: string;
  value: string;
  sub?: string;
  icon: React.ReactNode;
  color: StatTone;
};

type ModuleCardProps = {
  href: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  accent: string;
  iconColor: string;
};

const statColorMap: Record<
  StatTone,
  { bg: string; icon: string; value: string }
> = {
  primary: {
    bg: "bg-primary/10 border-primary/20",
    icon: "text-primary",
    value: "text-primary",
  },
  green: {
    bg: "bg-emerald-500/10 border-emerald-500/20",
    icon: "text-emerald-400",
    value: "text-emerald-400",
  },
  amber: {
    bg: "bg-amber-500/10 border-amber-500/20",
    icon: "text-amber-400",
    value: "text-amber-400",
  },
  red: {
    bg: "bg-red-500/10 border-red-500/20",
    icon: "text-red-400",
    value: "text-red-400",
  },
};

function StatCard({ label, value, sub, icon, color }: StatCardProps) {
  const palette = statColorMap[color];

  return (
    <div className={`rounded-sm border p-4 backdrop-blur ${palette.bg}`}>
      <div className="flex items-start justify-between">
        <div className={`rounded-sm p-1.5 bg-black/20 ${palette.icon}`}>{icon}</div>
      </div>
      <div className={`mt-3 text-2xl font-bold leading-none ${palette.value}`}>
        {value}
      </div>
      <div className="mt-1.5 text-xs text-muted-foreground">{label}</div>
      {sub && <div className="mt-0.5 text-[10px] text-muted-foreground/60">{sub}</div>}
    </div>
  );
}

function ModuleCard({
  href,
  label,
  description,
  icon,
  accent,
  iconColor,
}: ModuleCardProps) {
  return (
    <Link href={href} className="group block">
      <div className="h-full rounded-sm border border-border/40 bg-card/10 p-5 backdrop-blur transition-all duration-200 hover:bg-white/4 hover:border-border/70">
        <div className={`inline-flex items-center justify-center rounded-sm p-2.5 border ${accent}`}>
          <span className={iconColor}>{icon}</span>
        </div>
        <div className="mt-4 text-sm font-semibold text-foreground">{label}</div>
        <div className="mt-1 text-xs text-muted-foreground leading-relaxed">{description}</div>
        <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground/60 group-hover:text-muted-foreground transition-colors">
          <span>Abrir</span>
          <ArrowUpRight className="size-3" />
        </div>
      </div>
    </Link>
  );
}

export type { ModuleCardProps, StatCardProps, StatTone };
export { ModuleCard, StatCard };
