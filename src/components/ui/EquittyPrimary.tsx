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
  "cursor-pointer rounded-lg bg-accent text-white font-semibold shadow-lg " +
  "transition-all duration-300 hover:bg-accent/90 hover:scale-[1.02] " +
  "hover:shadow-xl hover:shadow-accent/30 disabled:hover:scale-100 " +
  "flex items-center justify-center gap-2"

function SpinnerIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}

interface EquittyPrimaryProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: React.ReactNode
  size?: "sm" | "md" | "lg"
  isPending?: boolean
  href?: string
  className?: string
  icon?: LucideIcon | null
}

export function EquittyPrimary({
  children,
  size = "md",
  isPending = false,
  href,
  className,
  disabled,
  icon: Icon = ArrowRight,
  ...props
}: EquittyPrimaryProps) {
  const classes = cn(BASE_CLASSES, sizeClasses[size], className)

  const content = (
    <>
      {isPending ? <SpinnerIcon className="mr-2 h-5 w-5" /> : null}
      <span className="flex items-center gap-2">
        <span>{children}</span>
        {Icon ? <Icon className="h-4 w-4" /> : null}
      </span>
    </>
  )

  if (href) {
    return (
      <Button asChild className={classes}>
        <Link href={href}>{content}</Link>
      </Button>
    )
  }

  return (
    <Button
      className={classes}
      disabled={isPending || disabled}
      {...props}
    >
      {content}
    </Button>
  )
}
