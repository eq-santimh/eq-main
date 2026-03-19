import React from "react";

export default function LineChart({
  values,
  height = 240,
}: {
  values: number[];
  height?: number;
}) {
  const width = 560;
  const pad = 24;

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const points = values.map((v, i) => {
    const x = pad + (i * (width - pad * 2)) / (values.length - 1 || 1);
    const y = pad + (1 - (v - min) / range) * (height - pad * 2);
    return { x, y };
  });

  const d = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border/40 bg-black/20 p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-muted-foreground">Crecimiento histórico (demo)</div>
          <div className="mt-1 text-lg font-semibold text-foreground">Portafolio</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground">Último</div>
          <div className="text-lg font-semibold text-primary">
            ${values[values.length - 1]?.toFixed(0) ?? 0}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-[240px] w-full"
          role="img"
          aria-label="Line chart (mock)"
        >
          {/* grid */}
          {Array.from({ length: 5 }).map((_, i) => {
            const y = pad + (i * (height - pad * 2)) / 4;
            return (
              <line
                key={i}
                x1={pad}
                x2={width - pad}
                y1={y}
                y2={y}
                stroke="rgba(48,101,152,0.35)"
                strokeWidth="1"
              />
            );
          })}

          <path d={d} fill="none" stroke="#00B4C4" strokeWidth="3" />

          {points.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="5"
              fill="#08070e"
              stroke="#00B4C4"
              strokeWidth="2"
            />
          ))}
        </svg>
      </div>
    </div>
  );
}

