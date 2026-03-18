import type { AppProps } from "next/app";
import "../app/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen bg-[#08070e] text-[hsl(var(--foreground))]">
      <Component {...pageProps} />
    </div>
  );
}

