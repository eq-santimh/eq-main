import { useRouter } from "next/router";
import React from "react";

import { getPageAccentColor } from "@/components/equity/dashboard-shell.config";
import { hexToRgbString } from "@/lib/color";
import { cn } from "@/lib/utils";

type PageAccentHeaderProps = {
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  topSlot?: React.ReactNode;
  headerRight?: React.ReactNode;
  children?: React.ReactNode;
  accentColor?: string;
  className?: string;
  titleClassName?: string;
};

export function PageAccentHeader({
  eyebrow,
  title,
  description,
  actions,
  topSlot,
  headerRight,
  children,
  accentColor,
  className,
  titleClassName,
}: PageAccentHeaderProps) {
  const { pathname } = useRouter();
  const resolvedAccent = accentColor ?? getPageAccentColor(pathname);
  const accentRgb = hexToRgbString(resolvedAccent);

  return (
    <section
      className={cn("eq-card eq-page-header glass-hover", className)}
      style={
        {
          "--glass-accent-rgb": accentRgb,
          "--eq-page-accent": resolvedAccent,
        } as React.CSSProperties
      }
    >
      <div className="relative z-10">
        {topSlot}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
              {eyebrow}
            </div>
            <h2 className={cn("mt-2 text-2xl font-semibold text-foreground", titleClassName)}>
              {title}
            </h2>
            {description ? (
              <p className="mt-3 max-w-3xl text-sm text-muted-foreground">{description}</p>
            ) : null}
          </div>
          {headerRight}
        </div>

        {actions ? <div className="mt-4 flex flex-wrap gap-3">{actions}</div> : null}
        {children}
      </div>
    </section>
  );
}
