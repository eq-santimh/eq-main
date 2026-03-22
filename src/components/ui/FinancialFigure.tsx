import { cn } from "@/lib/utils";

type Format = "currency" | "percent" | "raw";

interface FinancialFigureProps {
  value: number | string;
  format?: Format;
  /** When true, applies semantic color based on sign and prepends + for positives */
  delta?: boolean;
  currency?: string;
  locale?: string;
  /** Override decimal places (default: 2 for currency, 1 for percent) */
  decimals?: number;
  /**
   * CSS color value applied as inline style — overrides delta colors and
   * inherited color, letting the figure match the surrounding UI accent.
   * e.g. accent="var(--primary)" | accent="#00B4C4" | accent="currentColor"
   */
  accent?: string;
  className?: string;
}

function formatValue(
  value: number | string,
  format: Format,
  locale: string,
  currency: string,
  decimals?: number
): string {
  if (format === "raw") return String(value);

  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return String(value);

  if (format === "currency") {
    const fractionDigits = decimals ?? 2;
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    }).format(num);
  }

  // percent
  const fractionDigits = decimals ?? 1;
  return `${num.toFixed(fractionDigits)}%`;
}

export function FinancialFigure({
  value,
  format = "raw",
  delta = false,
  currency = "USD",
  locale = "en-US",
  decimals,
  accent,
  className,
}: FinancialFigureProps) {
  const num = typeof value === "string" ? parseFloat(value) : value;
  const formatted = formatValue(value, format, locale, currency, decimals);

  // Prepend + for positive deltas except on raw (already pre-formatted)
  const displayValue =
    delta && !isNaN(num) && num > 0 && format !== "raw"
      ? `+${formatted}`
      : formatted;

  // CSS selectors:
  //   [data-positive="true"]  → #00C896 (green)
  //   [data-positive="false"] → #FF4D6A (red)
  //   [data-neutral="true"]   → rgba(255,255,255,0.6)
  const deltaAttrs = delta
    ? isNaN(num) || num === 0
      ? { "data-neutral": "true" as const }
      : num > 0
        ? { "data-positive": "true" as const }
        : { "data-positive": "false" as const }
    : {};

  return (
    <span
      className={cn("financial-figure", delta && "financial-delta", className)}
      style={accent ? { color: accent } : undefined}
      {...deltaAttrs}
    >
      {displayValue}
    </span>
  );
}
