import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  Activity,
  BarChart3,
  Bell,
  Grid2X2,
  LayoutDashboard,
  Pin,
  PinOff,
  EyeOff,
  Search,
  Shield,
  UserRound,
  Wallet,
  Zap,
  Coins,
} from "lucide-react";

import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  shortLabel: string;
  icon: React.ReactNode;
  color: string;
};

type SidebarMode = "auto" | "pinned" | "hidden";

const SIDEBAR_FULL_W = 210;
const SIDEBAR_ICON_W = 56;
const SIDEBAR_HIDDEN_W = 12;

const nav: NavItem[] = [
  {
    href: "/",
    label: "Dashboard",
    shortLabel: "Home",
    icon: <LayoutDashboard className="size-4 shrink-0" />,
    color: "#00B4C4",
  },
  {
    href: "/marketplace",
    label: "Marketplace",
    shortLabel: "Market",
    icon: <Grid2X2 className="size-4 shrink-0" />,
    color: "#4C8D99",
  },
  {
    href: "/wallet-hub",
    label: "Wallet Hub",
    shortLabel: "Wallet",
    icon: <Wallet className="size-4 shrink-0" />,
    color: "#f59e0b",
  },
  {
    href: "/governance",
    label: "Gobernanza",
    shortLabel: "Votes",
    icon: <Shield className="size-4 shrink-0" />,
    color: "#a78bfa",
  },
  {
    href: "/analytics",
    label: "Analytics",
    shortLabel: "Stats",
    icon: <BarChart3 className="size-4 shrink-0" />,
    color: "#34d399",
  },
  {
    href: "/profile",
    label: "Perfil",
    shortLabel: "Perfil",
    icon: <UserRound className="size-4 shrink-0" />,
    color: "#22d3ee",
  },
  {
    href: "/dividends",
    label: "Dividendos",
    shortLabel: "Divs",
    icon: <Coins className="size-4 shrink-0" />,
    color: "#fbbf24",
  },
  {
    href: "/exchange/terminal",
    label: "Mercado Secundario",
    shortLabel: "Trade",
    icon: <Activity className="size-4 shrink-0" />,
    color: "#f97316",
  },
];

function isNavActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function getPageMeta(pathname: string) {
  if (pathname === "/") {
    return {
      title: "Dashboard",
      subtitle: "Resumen de portafolio y actividad reciente.",
    };
  }
  if (pathname === "/marketplace") {
    return {
      title: "Marketplace",
      subtitle: "Explora oportunidades RWA y filtros de inversion.",
    };
  }
  if (pathname.startsWith("/marketplace/")) {
    return {
      title: "Detalle de activo",
      subtitle: "Informacion de proyecto, riesgo y rendimiento esperado.",
    };
  }
  if (pathname === "/wallet-hub") {
    return {
      title: "Wallet Hub",
      subtitle: "Balances multicripto, conversiones y pagos.",
    };
  }
  if (pathname === "/governance") {
    return {
      title: "Gobernanza",
      subtitle: "Gestion de propuestas y votos on-chain.",
    };
  }
  if (pathname === "/analytics") {
    return {
      title: "Analytics",
      subtitle: "Metricas de riesgo, ROI y distribucion de activos.",
    };
  }
  if (pathname === "/profile") {
    return {
      title: "Perfil",
      subtitle: "Datos personales, seguridad y preferencias de cuenta.",
    };
  }
  if (pathname === "/dividends") {
    return {
      title: "Dividendos",
      subtitle: "Seguimiento de pagos y rendimiento distribuido.",
    };
  }
  if (pathname.startsWith("/exchange")) {
    return {
      title: "Mercado Secundario",
      subtitle: "Terminal de trading y liquidez P2P.",
    };
  }
  return {
    title: "EQ Platform",
    subtitle: "Panel de control de activos tokenizados.",
  };
}

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pathname } = useRouter();
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>("auto");
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("eq-sidebar-mode");
    if (stored !== "auto" && stored !== "pinned" && stored !== "hidden") return;
    const timer = window.setTimeout(() => {
      setSidebarMode(stored);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const isExpanded = sidebarMode === "pinned" || hovered;

  const sidebarW =
    sidebarMode === "pinned"
      ? SIDEBAR_FULL_W
      : hovered
        ? SIDEBAR_FULL_W
        : sidebarMode === "hidden"
          ? SIDEBAR_HIDDEN_W
          : SIDEBAR_ICON_W;

  const cycleSidebarMode = () => {
    setSidebarMode((m) => {
      const next = m === "auto" ? "pinned" : m === "pinned" ? "hidden" : "auto";
      localStorage.setItem("eq-sidebar-mode", next);
      return next;
    });
  };

  const modeLabel =
    sidebarMode === "auto"
      ? "Fijar menú"
      : sidebarMode === "pinned"
        ? "Desfijar"
        : "Modo automático";
  const pageMeta = getPageMeta(pathname);
  const userName = "Jose Santiago";
  const userInitials = userName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div className="relative min-h-screen bg-[#08070e] text-foreground overflow-x-hidden">
      {/* Ambient atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute top-1/3 left-0 h-[300px] w-[300px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-primary/6 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(48,101,152,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(48,101,152,0.06)_1px,transparent_1px)] bg-size-[64px_64px]" />
        <div className="absolute left-1/2 top-0 h-px w-[800px] -translate-x-1/2 bg-linear-to-r from-transparent via-primary/25 to-transparent" />
      </div>

      {/* ─── Desktop Sidebar ─── */}
      <aside
        style={{ width: sidebarW }}
        className="hidden lg:flex fixed left-0 top-0 z-50 h-screen flex-col overflow-hidden transition-[width] duration-300 ease-in-out"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Background panel */}
        <div
          className="absolute inset-0 transition-all duration-300"
          style={{
            background: isExpanded
              ? "rgba(8,7,14,0.97)"
              : sidebarMode === "hidden"
                ? "transparent"
                : "rgba(11,10,18,0.82)",
            backdropFilter:
              isExpanded || sidebarMode !== "hidden" ? "blur(18px)" : "none",
            borderRight: isExpanded
              ? "1px solid rgba(0,180,196,0.10)"
              : "none",
            boxShadow: isExpanded
              ? "6px 0 48px -8px rgba(0,180,196,0.14)"
              : "none",
          }}
        />

        {/* Always-visible neon strip on left edge */}
        <div
          className="absolute left-0 top-0 bottom-0 w-px z-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent 5%, rgba(0,180,196,0.4) 28%, rgba(0,180,196,0.9) 50%, rgba(0,180,196,0.4) 72%, transparent 95%)",
          }}
        />

        {/* Ambient glow behind the strip (fades out when expanded) */}
        <div
          className="absolute left-0 top-0 bottom-0 w-4 z-10 pointer-events-none transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(to right, rgba(0,180,196,0.07), transparent)",
            opacity: isExpanded ? 0 : 1,
          }}
        />

        {/* Dot indicators in hidden mode */}
        {sidebarMode === "hidden" && !hovered && (
          <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 items-center z-30">
            {nav.map((item) => {
              const active = isNavActive(item.href, pathname);
              return (
                <div
                  key={item.href}
                  className="rounded-full transition-all duration-200"
                  style={{
                    width: active ? "5px" : "3px",
                    height: active ? "5px" : "3px",
                    backgroundColor: item.color,
                    boxShadow: `0 0 ${active ? 8 : 3}px ${item.color}`,
                    opacity: active ? 1 : 0.35,
                  }}
                />
              );
            })}
          </div>
        )}

        {/* Sidebar inner content */}
        <div className="relative z-10 flex flex-col h-full py-5 overflow-hidden">
          {/* ── Brand ── */}
          <div className="flex items-center px-3 mb-3 shrink-0 overflow-hidden">
            <Link href="/" className="flex items-center gap-2.5 group min-w-0">
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-105"
                style={{
                  background: "rgba(0,180,196,0.12)",
                  borderColor: "rgba(0,180,196,0.25)",
                  boxShadow: isExpanded
                    ? "0 0 14px rgba(0,180,196,0.20), inset 0 0 8px rgba(0,180,196,0.08)"
                    : "none",
                }}
              >
                <Zap className="size-4 text-primary" />
              </div>
              <div
                className="overflow-hidden whitespace-nowrap transition-all duration-200"
                style={{
                  maxWidth: isExpanded ? "180px" : "0px",
                  opacity: isExpanded ? 1 : 0,
                  transitionDelay: isExpanded ? "60ms" : "0ms",
                }}
              >
                <div className="text-xs font-bold tracking-[0.2em] text-foreground leading-none">
                  EQUITTY
                </div>
                <div
                  className="text-[10px] tracking-widest leading-none mt-0.5"
                  style={{ color: "rgba(0,180,196,0.65)" }}
                >
                  RWA Platform
                </div>
              </div>
            </Link>
          </div>

          {/* Separator */}
          <div
            className="mx-3 h-px mb-2 shrink-0"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(48,101,152,0.45), transparent)",
            }}
          />

          {/* ── Nav — vertically centered ── */}
          <nav className="flex flex-col justify-center flex-1 gap-0.5 px-2 overflow-y-auto overflow-x-hidden">
            {nav.map((item) => {
              const active = isNavActive(item.href, pathname);
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={cn(
                      "relative flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-sm transition-all duration-200 cursor-pointer overflow-hidden",
                      !active &&
                        "hover:bg-white/4 hover:text-foreground/80"
                    )}
                    style={
                      active
                        ? {
                            background: `${item.color}12`,
                            color: item.color,
                          }
                        : { color: "rgba(242,239,235,0.42)" }
                    }
                  >
                    {/* Active radial glow bg */}
                    {active && (
                      <div
                        className="absolute inset-0 rounded-xl pointer-events-none"
                        style={{
                          background: `radial-gradient(ellipse at 15% 50%, ${item.color}1a, transparent 65%)`,
                        }}
                      />
                    )}

                    {/* Left accent bar (expanded) */}
                    <span
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 rounded-r-full transition-all duration-300"
                      style={{
                        height: active && isExpanded ? "20px" : "0px",
                        backgroundColor: item.color,
                        boxShadow:
                          active && isExpanded ? `0 0 8px ${item.color}` : "none",
                      }}
                    />

                    {/* Active dot (collapsed/icon-only) */}
                    <span
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded-full transition-all duration-300"
                      style={{
                        width: active && !isExpanded ? "4px" : "0px",
                        height: active && !isExpanded ? "4px" : "0px",
                        backgroundColor: item.color,
                        boxShadow:
                          active && !isExpanded
                            ? `0 0 6px ${item.color}`
                            : "none",
                      }}
                    />

                    {/* Icon */}
                    <span
                      className="relative z-10 shrink-0 transition-all duration-200"
                      style={
                        active
                          ? {
                              color: item.color,
                              filter: `drop-shadow(0 0 5px ${item.color}88)`,
                            }
                          : undefined
                      }
                    >
                      {item.icon}
                    </span>

                    {/* Label — slides in/out */}
                    <span
                      className="relative z-10 font-medium whitespace-nowrap overflow-hidden transition-all duration-200"
                      style={{
                        maxWidth: isExpanded ? "160px" : "0px",
                        opacity: isExpanded ? 1 : 0,
                        transitionDelay: isExpanded ? "40ms" : "0ms",
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Separator */}
          <div
            className="mx-3 h-px mt-2 shrink-0"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(48,101,152,0.3), transparent)",
            }}
          />

          {/* ── Bottom section ── */}
          <div className="px-2 pt-3 space-y-1 shrink-0">
            {/* Network status */}
            <div className="flex items-center gap-2 px-2.5 py-1 overflow-hidden">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span
                className="text-xs text-muted-foreground whitespace-nowrap overflow-hidden transition-all duration-200"
                style={{
                  maxWidth: isExpanded ? "160px" : "0px",
                  opacity: isExpanded ? 1 : 0,
                }}
              >
                Testnet · Conectado
              </span>
            </div>

            {/* Wallet CTA */}
            <div
              className="overflow-hidden transition-all duration-200"
              style={{
                maxHeight: isExpanded ? "48px" : "0px",
                opacity: isExpanded ? 1 : 0,
                transitionDelay: isExpanded ? "50ms" : "0ms",
              }}
            >
              <button className="eq-cta w-full text-sm py-2">
                Connect Wallet <span aria-hidden>→</span>
              </button>
            </div>

            {/* Mode toggle */}
            <button
              onClick={cycleSidebarMode}
              title={modeLabel}
              className="flex items-center gap-2 w-full rounded-xl px-2.5 py-2 text-xs transition-all duration-200 overflow-hidden hover:bg-white/4"
              style={{ color: "rgba(215,207,199,0.38)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color =
                  "rgba(215,207,199,0.75)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color =
                  "rgba(215,207,199,0.38)";
              }}
            >
              {sidebarMode === "pinned" ? (
                <Pin
                  className="size-3 shrink-0"
                  style={{ color: "rgba(0,180,196,0.6)" }}
                />
              ) : sidebarMode === "hidden" ? (
                <EyeOff className="size-3 shrink-0" />
              ) : (
                <PinOff className="size-3 shrink-0" />
              )}
              <span
                className="whitespace-nowrap overflow-hidden transition-all duration-200"
                style={{
                  maxWidth: isExpanded ? "160px" : "0px",
                  opacity: isExpanded ? 1 : 0,
                }}
              >
                {modeLabel}
              </span>
            </button>
          </div>
        </div>
      </aside>

      {/* ─── Main content ─── */}
      {/*
        Margin is driven by mode (not hover) so content doesn't jump on hover.
        In auto mode the sidebar overlaps content when hovered.
      */}
      <div
        className={cn(
          "relative z-10 transition-[margin-left] duration-300 ease-in-out",
          sidebarMode === "pinned"
            ? "lg:ml-[210px]"
            : sidebarMode === "hidden"
              ? "lg:ml-3"
              : "lg:ml-14"
        )}
      >
        <div className="mx-auto max-w-5xl px-4 pb-20 pt-4">
          <header className="sticky top-0 z-30 mb-5">
            <div className="rounded-2xl border border-border/45 bg-[#0b0a12]/82 px-4 py-3 backdrop-blur-xl shadow-[0_6px_34px_-16px_rgba(0,180,196,0.35)] sm:px-5">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
                    EQ Dashboard
                  </div>
                  <h1 className="mt-1 truncate text-xl font-semibold text-foreground">
                    {pageMeta.title}
                  </h1>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {pageMeta.subtitle}
                  </p>
                </div>

                <div className="hidden md:flex items-center gap-2.5">
                  <label className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground/70" />
                    <input
                      type="text"
                      aria-label="Buscar"
                      placeholder="Buscar modulo o activo..."
                      className="eq-input h-9 w-56 rounded-full pl-9 pr-3 text-xs"
                    />
                  </label>
                </div>

                <button
                  type="button"
                  aria-label="Notificaciones"
                  className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/55 bg-black/20 text-muted-foreground transition-colors hover:text-foreground hover:bg-white/6"
                >
                  <Bell className="size-4" />
                  <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(0,180,196,0.9)]" />
                </button>

                <button
                  type="button"
                  className="inline-flex items-center gap-2.5 rounded-full border border-border/55 bg-black/20 px-2.5 py-1.5 text-left transition-colors hover:bg-white/6"
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-primary/30 bg-primary/15 text-xs font-semibold text-primary shadow-[0_0_12px_rgba(0,180,196,0.22)]">
                    {userInitials}
                  </span>
                  <span className="hidden sm:block">
                    <span className="block text-xs font-medium leading-tight text-foreground">
                      {userName}
                    </span>
                    <span className="block text-[10px] leading-tight text-muted-foreground">
                      Cuenta verificada
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </header>
          <main>{children}</main>
        </div>
        <Footer />
      </div>

      {/* ─── Mobile bottom nav ─── */}
      <nav className="fixed bottom-0 inset-x-0 z-50 lg:hidden border-t border-border/25 bg-[#08070e]/96 backdrop-blur-md">
        <div className="flex justify-around items-center px-1 py-2">
          {nav.slice(0, 6).map((item) => {
            const active = isNavActive(item.href, pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl"
              >
                <span
                  className="transition-all duration-200"
                  style={
                    active
                      ? {
                          color: item.color,
                          filter: `drop-shadow(0 0 5px ${item.color}90)`,
                        }
                      : { color: "rgba(242,239,235,0.38)" }
                  }
                >
                  {item.icon}
                </span>
                <span
                  className="text-[9px] font-medium"
                  style={
                    active
                      ? { color: item.color }
                      : { color: "rgba(242,239,235,0.38)" }
                  }
                >
                  {item.shortLabel}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
