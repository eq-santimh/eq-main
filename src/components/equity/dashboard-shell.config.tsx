import React from "react";
import {
  Activity,
  BarChart3,
  Coins,
  Grid2X2,
  LayoutDashboard,
  Shield,
  Wallet,
} from "lucide-react";

export type DashboardNavItem = {
  href: string;
  label: string;
  shortLabel: string;
  icon: React.ReactNode;
  color: string;
};

export const DASHBOARD_NAV: DashboardNavItem[] = [
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

export function isDashboardNavActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function getDashboardPageMeta(pathname: string) {
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
