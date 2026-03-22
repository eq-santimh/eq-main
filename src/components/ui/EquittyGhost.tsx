import * as React from "react"
import Link from "next/link"
import { ArrowRight, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const sizeClasses: Record<"sm" | "md" | "lg", string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-12 px-6 text-base",
  lg: "h-14 px-8 text-lg",
}

const BASE_CLASSES =
  "cursor-pointer rounded-lg bg-transparent text-accent font-semibold transition-all duration-300  hover:scale-[1.01] hover:bg-white border border-white/10 flex items-center justify-center gap-2"

interface EquittyGhostProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: React.ReactNode
  size?: "sm" | "md" | "lg"
  href?: string
  className?: string
  icon?: LucideIcon | null
}

export function EquittyGhost({
  children,
  size = "md",
  href,
  className,
  disabled,
  icon: Icon = ArrowRight,
  ...props
}: EquittyGhostProps) {
  const classes = cn(BASE_CLASSES, sizeClasses[size], className)

  const content = (
    <span className="flex items-center gap-2">
      <span>{children}</span>
      {Icon ? <Icon className="h-4 w-4" /> : null}
    </span>
  )

  if (href) {
    return (
      <Button asChild className={classes}>
        <Link href={href}>{content}</Link>
      </Button>
    )
  }

  return (
    <Button className={classes} disabled={disabled} {...props}>
      {content}
    </Button>
  )
}
