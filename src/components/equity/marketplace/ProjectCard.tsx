import React from "react";

import type { MarketplaceProject } from "@/components/equity/mockData";
import { EquittyPrimary } from "@/components/ui/EquittyPrimary";
import { FinancialFigure } from "@/components/ui/FinancialFigure";

type ProjectCardProps = {
  project: MarketplaceProject;
  onImageClick: () => void;
};

function formatSupply(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toString();
}

export function ProjectCard({ project, onImageClick }: ProjectCardProps) {
  return (
    <div
      className="eq-card overflow-hidden p-0 flex flex-col group glass-hover"
      style={{ "--glass-accent-rgb": "var(--eq-page-accent-rgb)" } as React.CSSProperties}
    >
      <div className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full aspect-video object-cover cursor-zoom-in transition-transform duration-500 group-hover:scale-105"
          onClick={onImageClick}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        <span className="absolute top-3 left-3 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 px-3 py-1 text-xs text-white font-medium">
          {project.category}
        </span>

        <button
          onClick={onImageClick}
          title="Expandir imagen"
          className="absolute top-3 right-3 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 w-8 h-8 flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100"
          style={{ backgroundColor: "rgba(var(--eq-page-accent-rgb),0.42)" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        </button>
      </div>

      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <div className="text-xs text-muted-foreground">{project.location}</div>
          <div className="mt-0.5 text-base font-semibold text-foreground">{project.title}</div>
        </div>

        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Construcción</span>
              <span className="font-medium text-orange-400">{project.constructionProgress}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/5 border border-border/20 overflow-hidden">
              <div
                className="h-full rounded-full bg-orange-400"
                style={{ width: `${project.constructionProgress}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Fondeado</span>
              <span className="font-medium eq-accent-text">{project.progressFondeo}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/5 border border-border/20 overflow-hidden">
              <div
                className="h-full rounded-full eq-accent-fill"
                style={{ width: `${project.progressFondeo}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="glass-cell py-2 px-1">
            <div className="text-[10px] text-muted-foreground leading-tight">Token Price</div>
            <div className="text-base text-foreground mt-0.5">
              <FinancialFigure value={project.pricePerTokenUsd} format="currency" decimals={0} />
            </div>
          </div>
          <div className="glass-cell py-2 px-1">
            <div className="text-[10px] text-muted-foreground leading-tight">Annual Return</div>
            <div className="text-base eq-accent-text mt-0.5">
              <FinancialFigure value={project.roiAnnual} format="percent" delta />
            </div>
          </div>
          <div className="glass-cell py-2 px-1">
            <div className="text-[10px] text-muted-foreground leading-tight">Total Supply</div>
            <div className="text-sm font-semibold text-foreground mt-0.5">
              {formatSupply(project.totalSupply)}
            </div>
          </div>
        </div>

        <div className="mt-auto pt-1">
          <EquittyPrimary href={`/marketplace/${project.id}`} className="w-full">
            Invest Now
          </EquittyPrimary>
        </div>
      </div>
    </div>
  );
}
