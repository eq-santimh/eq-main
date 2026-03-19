import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="es" className="dark">
      <Head>
        <link rel="icon" href="/equitty_isotipo.webp" type="image/webp" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

