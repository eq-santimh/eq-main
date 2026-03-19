import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import "../styles/globals.css";
import DashboardShell from "@/components/equity/DashboardShell";

export default function App({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter();

  return (
    <DashboardShell>
      {/* key causes React to remount only the page content — sidebar stays alive */}
      <div key={asPath} className="eq-page-transition">
        <Component {...pageProps} />
      </div>
    </DashboardShell>
  );
}
