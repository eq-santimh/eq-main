import { useRouter } from "next/router";

import { getPageAccentColor } from "@/components/equity/dashboard-shell.config";
import { hexToRgbString } from "@/lib/color";

export function usePageAccent() {
  const { pathname } = useRouter();
  const hex = getPageAccentColor(pathname);
  const rgbString = hexToRgbString(hex);

  return { hex, rgbString };
}
