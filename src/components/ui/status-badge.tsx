import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  AlertCircle,
  CheckCircle2,
  Info,
  Loader2,
  Sparkles,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

const statusBadgeVariants = cva(
  "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] transition-colors",
  {
    variants: {
      variant: {
        info: "border-primary/40 bg-primary/10 text-primary shadow-[0_0_18px_rgba(0,180,196,0.2)]",
        success:
          "border-emerald-500/45 bg-emerald-500/12 text-emerald-300 shadow-[0_0_18px_rgba(16,185,129,0.22)]",
        warning:
          "border-amber-500/45 bg-amber-500/12 text-amber-300 shadow-[0_0_18px_rgba(245,158,11,0.2)]",
        error:
          "border-rose-500/45 bg-rose-500/12 text-rose-300 shadow-[0_0_18px_rgba(244,63,94,0.22)]",
        neutral:
          "border-border/45 bg-muted/25 text-muted-foreground shadow-[0_0_16px_rgba(148,163,184,0.12)]",
        comingSoon:
          "border-accent/40 bg-accent/10 text-accent shadow-[0_0_20px_rgba(0,180,196,0.22)]",
        loading:
          "border-violet-500/45 bg-violet-500/12 text-violet-300 shadow-[0_0_18px_rgba(139,92,246,0.22)]",
      },
      size: {
        sm: "px-2.5 py-1 text-[10px]",
        md: "px-3 py-1.5 text-xs",
        lg: "px-4 py-2 text-sm",
      },
    },
    defaultVariants: {
      variant: "info",
      size: "md",
    },
  }
)

const defaultIcons: Record<NonNullable<StatusBadgeProps["variant"]>, LucideIcon> = {
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  error: AlertCircle,
  neutral: Info,
  comingSoon: Sparkles,
  loading: Loader2,
}

type StatusBadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof statusBadgeVariants> & {
    label: string
    icon?: LucideIcon
    showIcon?: boolean
  }

function StatusBadge({
  className,
  variant = "info",
  size = "md",
  label,
  icon,
  showIcon = true,
  ...props
}: StatusBadgeProps) {
  const Icon = icon ?? defaultIcons[variant]

  return (
    <span className={cn(statusBadgeVariants({ variant, size }), className)} {...props}>
      {showIcon && (
        <Icon className={cn("size-3.5 shrink-0", variant === "loading" && "animate-spin")} />
      )}
      {label}
    </span>
  )
}

export { StatusBadge, statusBadgeVariants }
