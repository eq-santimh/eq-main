import Link from "next/link";
import React from "react";
import { ArrowUpRight } from "lucide-react";

import type { ModuleCardProps } from "@/components/home/cards/types";

const accentRgbMap: Record<string, string> = {
  "bg-primary/10 border-primary/25": "0, 180, 196",
  "bg-blue-500/10 border-blue-500/25": "59, 130, 246",
  "bg-violet-500/10 border-violet-500/25": "139, 92, 246",
  "bg-emerald-500/10 border-emerald-500/25": "16, 185, 129",
  "bg-amber-500/10 border-amber-500/25": "245, 158, 11",
  "bg-orange-500/10 border-orange-500/25": "249, 115, 22",
};

function ModuleCard({ href, label, description, icon, accent, iconColor }: ModuleCardProps) {
  const accentRgb = accentRgbMap[accent] ?? "var(--eq-page-accent-rgb)";

  return (
    <Link href={href} className="group block">
      <div
        className="h-full glass-surface-interactive glass-hover p-5"
        style={{ "--glass-accent-rgb": accentRgb } as React.CSSProperties}
      >
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

export { ModuleCard };
