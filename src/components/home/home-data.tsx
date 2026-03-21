import {
  Activity,
  BarChart3,
  Clock,
  Coins,
  Grid2X2,
  Layers,
  Shield,
  TrendingUp,
  Wallet,
} from "lucide-react";

import type { ModuleCardProps, StatCardProps } from "@/components/home/cards";

const HOME_STATS: StatCardProps[] = [
  {
    label: "Portafolio Total",
    value: "$18,420",
    sub: "↑ $648 este mes",
    icon: <TrendingUp className="size-4" />,
    color: "primary",
  },
  {
    label: "ROI Anual Est.",
    value: "+11.2%",
    sub: "Promedio ponderado",
    icon: <BarChart3 className="size-4" />,
    color: "green",
  },
  {
    label: "Dividendos Pend.",
    value: "$0",
    sub: "Próximo: 2026-03-30",
    icon: <Clock className="size-4" />,
    color: "amber",
  },
  {
    label: "Activos RWA",
    value: "3",
    sub: "Tokens en portafolio",
    icon: <Layers className="size-4" />,
    color: "primary",
  },
];

const HOME_MODULES: ModuleCardProps[] = [
  {
    href: "/marketplace",
    label: "Marketplace",
    description: "RWA tokenizados, filtros y fondeo en tiempo real.",
    icon: <Grid2X2 className="size-5" />,
    accent: "bg-primary/10 border-primary/25",
    iconColor: "text-primary",
  },
  {
    href: "/wallet-hub",
    label: "Wallet Hub",
    description: "Balances, conversión multicripto y QR de pago.",
    icon: <Wallet className="size-5" />,
    accent: "bg-blue-500/10 border-blue-500/25",
    iconColor: "text-blue-400",
  },
  {
    href: "/governance",
    label: "Gobernanza",
    description: "Propuestas on-chain. 1 token = 1 voto.",
    icon: <Shield className="size-5" />,
    accent: "bg-violet-500/10 border-violet-500/25",
    iconColor: "text-violet-400",
  },
  {
    href: "/analytics",
    label: "Analytics",
    description: "Portafolio, diversificación e interés compuesto.",
    icon: <BarChart3 className="size-5" />,
    accent: "bg-emerald-500/10 border-emerald-500/25",
    iconColor: "text-emerald-400",
  },
  {
    href: "/dividends",
    label: "Dividendos",
    description: "Historial de pagos y auto-inversión de rendimientos.",
    icon: <Coins className="size-5" />,
    accent: "bg-amber-500/10 border-amber-500/25",
    iconColor: "text-amber-400",
  },
  {
    href: "/exchange/terminal",
    label: "Mercado Secundario",
    description: "Order book P2P y terminal de trading.",
    icon: <Activity className="size-5" />,
    accent: "bg-orange-500/10 border-orange-500/25",
    iconColor: "text-orange-400",
  },
];

export { HOME_MODULES, HOME_STATS };
