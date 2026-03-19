import Head from "next/head";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";

import {
  projects,
  type MarketplaceProject,
  type MarketplaceCategory,
} from "@/components/equity/mockData";
import { Button } from "@/components/ui/button";

type SortKey = "roi-desc" | "price-asc" | "price-desc" | "funded-desc" | "name-asc";

const CATEGORY_TABS: ("All" | MarketplaceCategory)[] = [
  "All",
  "Hospitality",
  "Residential",
  "Commercial",
  "Energy",
  "Entertainment",
  "Public",
  "Bonds",
];

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "roi-desc", label: "Mayor ROI" },
  { value: "price-asc", label: "Menor precio" },
  { value: "price-desc", label: "Mayor precio" },
  { value: "funded-desc", label: "Más fondeado" },
  { value: "name-asc", label: "Nombre A–Z" },
];

function formatSupply(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toString();
}

function LightboxModal({
  project,
  onClose,
}: {
  project: MarketplaceProject;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl overflow-hidden border border-white/10 bg-[#0e0d1a] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Full image */}
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full aspect-video object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0e0d1a]/80 via-transparent to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 rounded-full bg-black/60 border border-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/10 transition-all"
          >
            ✕
          </button>
          <span className="absolute top-3 left-3 rounded-full bg-primary/20 border border-primary/30 px-3 py-1 text-xs text-primary font-medium">
            {project.category}
          </span>
          <div className="absolute bottom-4 left-4">
            <div className="text-xs text-white/60">{project.location}</div>
            <h3 className="text-xl font-semibold text-white">{project.title}</h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-black/30 border border-border/30 p-3 text-center">
              <div className="text-xs text-muted-foreground">Precio Token</div>
              <div className="mt-1 text-lg font-bold text-foreground">
                ${project.pricePerTokenUsd.toLocaleString("en-US")}
              </div>
            </div>
            <div className="rounded-xl bg-black/30 border border-border/30 p-3 text-center">
              <div className="text-xs text-muted-foreground">ROI Anual</div>
              <div className="mt-1 text-lg font-bold text-primary">
                {project.roiAnnual.toFixed(1)}%
              </div>
            </div>
            <div className="rounded-xl bg-black/30 border border-border/30 p-3 text-center">
              <div className="text-xs text-muted-foreground">Supply Total</div>
              <div className="mt-1 text-lg font-bold text-foreground">
                {formatSupply(project.totalSupply)}
              </div>
            </div>
          </div>

          {/* Progress bars */}
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                <span>Construcción</span>
                <span className="font-medium text-orange-400">{project.constructionProgress}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/5 border border-border/20 overflow-hidden">
                <div
                  className="h-full rounded-full bg-orange-400 transition-all"
                  style={{ width: `${project.constructionProgress}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                <span>Fondeado</span>
                <span className="font-medium text-primary">{project.progressFondeo}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/5 border border-border/20 overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${project.progressFondeo}%` }}
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* CTA */}
          <Button asChild className="eq-cta w-full">
            <Link href={`/marketplace/${project.id}`}>
              Ver detalle completo <span aria-hidden>→</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  onImageClick,
}: {
  project: MarketplaceProject;
  onImageClick: () => void;
}) {
  return (
    <div className="eq-card overflow-hidden p-0 flex flex-col group transition-all hover:border-white/20">
      {/* Cover image */}
      <div className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full aspect-video object-cover cursor-zoom-in transition-transform duration-500 group-hover:scale-105"
          onClick={onImageClick}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Category badge */}
        <span className="absolute top-3 left-3 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 px-3 py-1 text-xs text-white font-medium">
          {project.category}
        </span>

        {/* Expand button */}
        <button
          onClick={onImageClick}
          title="Expandir imagen"
          className="absolute top-3 right-3 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 w-8 h-8 flex items-center justify-center text-white hover:bg-primary/70 transition-all opacity-0 group-hover:opacity-100"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        </button>
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* Title */}
        <div>
          <div className="text-xs text-muted-foreground">{project.location}</div>
          <div className="mt-0.5 text-base font-semibold text-foreground">{project.title}</div>
        </div>

        {/* Progress bars */}
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
              <span className="font-medium text-primary">{project.progressFondeo}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/5 border border-border/20 overflow-hidden">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${project.progressFondeo}%` }}
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-xl bg-black/20 border border-border/30 py-2 px-1">
            <div className="text-[10px] text-muted-foreground leading-tight">Token Price</div>
            <div className="text-sm font-semibold text-foreground mt-0.5">
              ${project.pricePerTokenUsd.toLocaleString("en-US")}
            </div>
          </div>
          <div className="rounded-xl bg-black/20 border border-border/30 py-2 px-1">
            <div className="text-[10px] text-muted-foreground leading-tight">Annual Return</div>
            <div className="text-sm font-semibold text-primary mt-0.5">
              {project.roiAnnual.toFixed(1)}%
            </div>
          </div>
          <div className="rounded-xl bg-black/20 border border-border/30 py-2 px-1">
            <div className="text-[10px] text-muted-foreground leading-tight">Total Supply</div>
            <div className="text-sm font-semibold text-foreground mt-0.5">
              {formatSupply(project.totalSupply)}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-auto pt-1">
          <Button asChild className="eq-cta w-full">
            <Link href={`/marketplace/${project.id}`}>
              Invest Now <span aria-hidden>→</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState<"All" | MarketplaceCategory>("All");
  const [sortBy, setSortBy] = useState<SortKey>("roi-desc");
  const [lightboxProject, setLightboxProject] = useState<MarketplaceProject | null>(null);

  const filtered = useMemo(() => {
    const list =
      activeCategory === "All"
        ? [...projects]
        : projects.filter((p) => p.category === activeCategory);

    return list.sort((a, b) => {
      switch (sortBy) {
        case "roi-desc":
          return b.roiAnnual - a.roiAnnual;
        case "price-asc":
          return a.pricePerTokenUsd - b.pricePerTokenUsd;
        case "price-desc":
          return b.pricePerTokenUsd - a.pricePerTokenUsd;
        case "funded-desc":
          return b.progressFondeo - a.progressFondeo;
        case "name-asc":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  }, [activeCategory, sortBy]);

  return (
    <>
      <Head>
        <title>Marketplace - EQ</title>
      </Head>

      {lightboxProject && (
        <LightboxModal
          project={lightboxProject}
          onClose={() => setLightboxProject(null)}
        />
      )}

      <div className="eq-page">
        {/* Header */}
        <div className="eq-card">
          <div className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
            Catálogo de Inversión
          </div>
          <h2 className="mt-2 text-2xl font-semibold text-foreground">
            Marketplace de RWA
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Activos del mundo real tokenizados: inmuebles, energía, infraestructura y bonos digitales.
            Haz clic en las imágenes para expandirlas y ver el detalle de cada proyecto.
          </p>
        </div>

        {/* Filters + Sort */}
        <div className="eq-card">
          <div className="flex flex-wrap items-center gap-y-3 gap-x-2">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 flex-1 min-w-0">
              {CATEGORY_TABS.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={[
                    "rounded-full px-4 py-2 text-sm font-medium transition-all whitespace-nowrap",
                    activeCategory === cat
                      ? "bg-primary text-white shadow-[0_0_12px_rgba(0,180,196,0.3)]"
                      : "border border-border/40 text-muted-foreground hover:border-primary/40 hover:text-foreground",
                  ].join(" ")}
                >
                  {cat === "All" ? "All Properties" : cat}
                </button>
              ))}
            </div>

            {/* Sort dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-muted-foreground whitespace-nowrap">Ordenar por:</span>
              <select
                className="eq-input px-3 py-2 text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-3 text-xs text-muted-foreground">
            {filtered.length} proyecto{filtered.length !== 1 ? "s" : ""} encontrado
            {filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "All" && (
              <span className="ml-1">
                en <span className="text-primary">{activeCategory}</span>
              </span>
            )}
          </div>
        </div>

        {/* Project grid */}
        {filtered.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                onImageClick={() => setLightboxProject(p)}
              />
            ))}
          </div>
        ) : (
          <div className="eq-card flex flex-col items-center justify-center py-16 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <div className="text-base font-semibold text-foreground">
              No hay proyectos en esta categoría
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Selecciona otra categoría o{" "}
              <button
                className="text-primary underline underline-offset-2"
                onClick={() => setActiveCategory("All")}
              >
                ver todos
              </button>
            </p>
          </div>
        )}
      </div>
    </>
  );
}
