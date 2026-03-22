export function hexToRgbTuple(hexColor: string): [number, number, number] {
  const normalized = hexColor.replace("#", "").trim();
  const hex =
    normalized.length === 3
      ? normalized
          .split("")
          .map((c) => `${c}${c}`)
          .join("")
      : normalized;

  if (!/^[\da-fA-F]{6}$/.test(hex)) {
    return [0, 180, 196];
  }

  return [
    Number.parseInt(hex.slice(0, 2), 16),
    Number.parseInt(hex.slice(2, 4), 16),
    Number.parseInt(hex.slice(4, 6), 16),
  ];
}

export function hexToRgbString(hexColor: string): string {
  const [r, g, b] = hexToRgbTuple(hexColor);
  return `${r}, ${g}, ${b}`;
}

export function hexToRgba(hexColor: string, alpha: number): string {
  const [r, g, b] = hexToRgbTuple(hexColor);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
