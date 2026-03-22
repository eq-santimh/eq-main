import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Pin, PinOff, EyeOff } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  DASHBOARD_NAV,
  getActiveDashboardNavItem,
  getDashboardPageMeta,
  getPageAccentColor,
  isDashboardNavActive,
} from "@/components/equity/dashboard-shell.config";

import { hexToRgbString } from "@/lib/color";
import { cn } from "@/lib/utils";

type SidebarMode = "auto" | "pinned" | "hidden";

const SIDEBAR_FULL_W = 210;
const SIDEBAR_ICON_W = 56;
const SIDEBAR_HIDDEN_W = 20;

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
  const activeNavItem = getActiveDashboardNavItem(pathname);
  const activePageAccent = getPageAccentColor(pathname);
  const activePageAccentRgb = hexToRgbString(activePageAccent);
  const isHiddenIdle = sidebarMode === "hidden" && !hovered;
  const pageMeta = getDashboardPageMeta(pathname);
  const userName = "Jose Santiago";
  const userInitials = userName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  useEffect(() => {
    document.documentElement.style.setProperty("--eq-page-accent", activePageAccent);
    document.documentElement.style.setProperty("--eq-page-accent-rgb", activePageAccentRgb);
  }, [activePageAccent, activePageAccentRgb]);

  return (
    <div className="relative min-h-screen bg-[#08070e] text-foreground overflow-x-hidden">
      {/* <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute top-1/3 left-0 h-[300px] w-[300px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-primary/6 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(48,101,152,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(48,101,152,0.06)_1px,transparent_1px)] bg-size-[64px_64px]" />
        <div className="absolute left-1/2 top-0 h-px w-[800px] -translate-x-1/2 bg-linear-to-r from-transparent via-primary/25 to-transparent" />
      </div> */}

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
              ? `1px solid rgba(${activePageAccentRgb},0.10)`
              : "none",
            boxShadow: isExpanded
              ? `6px 0 48px -8px rgba(${activePageAccentRgb},0.14)`
              : "none",
          }}
        />

        {/* Always-visible neon strip on left edge */}
        <div
          className="absolute left-0 top-0 bottom-0 w-px z-20 pointer-events-none"
          style={{
            background:
              `linear-gradient(to bottom, transparent 5%, rgba(${activePageAccentRgb},0.4) 28%, rgba(${activePageAccentRgb},0.9) 50%, rgba(${activePageAccentRgb},0.4) 72%, transparent 95%)`,
          }}
        />

        {/* Ambient glow behind the strip (fades out when expanded) */}
        <div
          className="absolute left-0 top-0 bottom-0 w-4 z-10 pointer-events-none transition-opacity duration-300"
          style={{
            background:
              `linear-gradient(to right, rgba(${activePageAccentRgb},0.07), transparent)`,
            opacity: isExpanded ? 0 : 1,
          }}
        />

        {/* Hidden mode indicator: presence + active page color */}
        {sidebarMode === "hidden" && !hovered && (
          <div className="absolute inset-y-0 left-0 right-0 z-30 pointer-events-none flex items-center justify-end">
            {/* Sidebar presence marker */}

            {/* Active page marker */}
            <div className="mt-3 flex gap-2 items-center">
              <div
                className="h-2 w-2 rounded-full transition-all duration-200"
                style={{
                  backgroundColor: activeNavItem.color,
                  boxShadow: `0 0 8px ${activeNavItem.color}`,
                }}
              />
              <span
                className="transition-all duration-200"
                style={{
                  color: activeNavItem.color,
                  filter: `drop-shadow(0 0 6px ${activeNavItem.color}88)`,
                }}
              >
                {activeNavItem.icon}
              </span>

            </div>
          </div>
        )}

        {/* Sidebar inner content */}
        <div
          className="relative z-10 flex flex-col h-full py-5 overflow-hidden transition-all duration-200"
          style={{
            opacity: isHiddenIdle ? 0 : 1,
            transform: isHiddenIdle ? "translateX(-6px)" : "translateX(0px)",
            pointerEvents: isHiddenIdle ? "none" : "auto",
          }}
        >
          {/* ── Brand ── */}
          <div className="flex items-center px-3 mb-3 shrink-0 overflow-hidden">
            <Link href="/" className="flex items-center gap-2.5 group min-w-0">
              <div
                className="relative flex h-8 shrink-0 items-center justify-center overflow-hidden rounded-sm border px-1.5 transition-all duration-300 group-hover:scale-105"
                style={{
                  width: isExpanded ? "154px" : "34px",
                  background: `rgba(${activePageAccentRgb},0.08)`,
                  borderColor: `rgba(${activePageAccentRgb},0.25)`,
                  boxShadow: isExpanded
                    ? `0 0 14px rgba(${activePageAccentRgb},0.20), inset 0 0 8px rgba(${activePageAccentRgb},0.08)`
                    : "none",
                }}
              >
                <Image
                  src="/equitty_isotipo.webp"
                  alt="EQUITY isotipo"
                  width={20}
                  height={20}
                  priority
                  className={cn(
                    "h-5 w-5 object-contain transition-all duration-200",
                    isExpanded ? "scale-90 opacity-0" : "scale-100 opacity-100"
                  )}
                />
                <Image
                  src="/logo-accent.png"
                  alt="EQUITY"
                  width={120}
                  height={24}
                  style={{ width: "auto", height: "auto" }}
                  priority
                  className={cn(
                    "absolute h-5 w-auto max-w-none object-contain transition-all duration-200",
                    isExpanded ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
                  )}
                />
              </div>
            </Link>
          </div>

          {/* Pin/fix toggle moved to top */}
          <div className="px-2 mb-2 shrink-0">
            <button
              onClick={cycleSidebarMode}
              title={modeLabel}
              className="flex items-center gap-2 w-full rounded-sm px-2.5 py-2 text-xs transition-all duration-200 overflow-hidden hover:bg-white/4"
              style={{ color: "rgba(215,207,199,0.45)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color =
                  "rgba(215,207,199,0.75)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color =
                  "rgba(215,207,199,0.45)";
              }}
            >
              {sidebarMode === "pinned" ? (
                <Pin
                  className="size-3 shrink-0"
                  style={{ color: `rgba(${activePageAccentRgb},0.65)` }}
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

          {/* Separator */}
          <div
            className="mx-3 h-px mb-2 shrink-0"
            style={{
              background:
                `linear-gradient(to right, transparent, rgba(${activePageAccentRgb},0.45), transparent)`,
            }}
          />

          {/* ── Nav ── */}
          <nav className="flex flex-col justify-start flex-1 gap-0.5 px-2 overflow-y-auto overflow-x-hidden">
            {DASHBOARD_NAV.map((item) => {
              const active = isDashboardNavActive(item.href, pathname);
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={cn(
                      "relative flex items-center gap-3 rounded-sm px-2.5 py-2.5 text-sm transition-all duration-200 cursor-pointer overflow-hidden",
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
                        className="absolute inset-0 rounded-sm pointer-events-none"
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
                `linear-gradient(to right, transparent, rgba(${activePageAccentRgb},0.30), transparent)`,
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
              ? "lg:ml-5"
              : "lg:ml-14"
        )}
      >
        <div className="mx-auto w-full max-w-[1680px] min-h-min px-4 pb-20 sm:px-6 lg:px-8 2xl:px-10">
          <main className="pt-24 sm:pt-30">
            <Header
              title={pageMeta.title}
              subtitle={pageMeta.subtitle}
              userName={userName}
              userInitials={userInitials}
              desktopLeftOffset={sidebarMode === "pinned" ? 210 : sidebarMode === "hidden" ? 20 : 56}
            />
            {children}
          </main>
        </div>
        <div
          className="w-full h-px min-h-px opacity-90"
          style={{
            background: `linear-gradient(to right, transparent, ${activePageAccent}, transparent)`,
            boxShadow: `0 0 12px 1px rgba(${activePageAccentRgb}, 0.4), 0 0 24px 2px rgba(${activePageAccentRgb}, 0.2)`,
          }}
          aria-hidden
        />
        <Footer />
      </div>

      {/* ─── Mobile bottom nav ─── */}
      <nav
        className="fixed bottom-0 inset-x-0 z-50 lg:hidden bg-[#08070e]/96 backdrop-blur-md"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="flex justify-around items-center px-1 py-2">
          {DASHBOARD_NAV.slice(0, 6).map((item) => {
            const active = isDashboardNavActive(item.href, pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-sm"
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
