import React, { useMemo } from "react";

function hashToUint32(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function PseudoQr({ value }: { value: string }) {
  const cells = useMemo(() => {
    const seed = hashToUint32(value);
    const rand = mulberry32(seed);

    const size = 29; // compact "QR-like" grid
    const out: boolean[] = [];
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        // Finder patterns
        const isFinder =
          (x < 7 && y < 7) || (x > size - 8 && y < 7) || (x < 7 && y > size - 8);

        const fx = x % 7;
        const fy = y % 7;
        const finderRing = isFinder && fx === 0 && fy === 0;
        const quiet = x === 0 || y === 0 || x === size - 1 || y === size - 1;
        if (quiet) {
          out.push(false);
          continue;
        }

        if (isFinder) {
          // 7x7 ring in each corner block
          const inInner = fx >= 2 && fx <= 4 && fy >= 2 && fy <= 4;
          const inBorder = fx === 0 || fx === 1 || fx === 5 || fx === 6;
          out.push(inInner ? true : inBorder ? true : rand() > 0.7);
          continue;
        }

        // Random but deterministic fill
        out.push(rand() > 0.62);
        if (finderRing) out[out.length - 1] = true;
      }
    }

    return { size, out };
  }, [value]);

  return (
    <div
      className="grid gap-px bg-white/5 p-2 rounded-xl border border-border/60"
      style={{ gridTemplateColumns: `repeat(${cells.size}, minmax(0, 1fr))` }}
      aria-label="QR code (mock)"
      role="img"
    >
      {cells.out.map((on, idx) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={idx}
          className={on ? "bg-primary/90" : "bg-transparent"}
          style={{ aspectRatio: "1 / 1" }}
        />
      ))}
    </div>
  );
}

