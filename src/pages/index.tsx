import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>EQ - Prototipo Web3</title>
        <meta name="description" content="Plataforma de inversión tokenizada" />
      </Head>

      <main className="min-h-[calc(100vh-1px)] bg-[#08070e]">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
          <div className="flex flex-col gap-8">
            <header className="rounded-2xl border border-border bg-card/50 p-6 sm:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-black/20 px-3 py-1 text-sm text-foreground">
                <span className="h-2 w-2 rounded-full bg-primary" />
                WEB3 • Tokenization • Smart Contracts
              </div>

              <h1 className="mt-6 text-balance text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
                Invierte y tokeniza activos con una experiencia estilo{" "}
                <span className="text-primary">Robinhood</span>, pero con tu propia
                marca.
              </h1>

              <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
                Este es un prototipo inicial: arquitectura escalable, base de
                UI con shadcn y un sistema preparado para blockchain, tokens y
                smart contracts.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[0_0_0_1px_rgba(0,180,196,0.35)] hover:opacity-95"
                >
                  Empezar
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-full border border-border bg-transparent px-5 py-2.5 text-sm font-medium text-foreground hover:bg-white/5"
                >
                  Ver arquitectura
                </a>
              </div>
            </header>

            <section className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-border bg-card/50 p-5">
                <div className="text-sm text-muted-foreground">Tokenization</div>
                <div className="mt-2 text-lg font-medium text-foreground">
                  Mapea activos en tokens
                </div>
                <div className="mt-3 text-sm text-muted-foreground">
                  Servicios y modelos para emitir, trazar y transferir.
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card/50 p-5">
                <div className="text-sm text-muted-foreground">Smart Contracts</div>
                <div className="mt-2 text-lg font-medium text-foreground">
                  Contratos listos para desplegar
                </div>
                <div className="mt-3 text-sm text-muted-foreground">
                  Scaffold para ABIs, despliegues y verificación.
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card/50 p-5">
                <div className="text-sm text-muted-foreground">Web3 Platform</div>
                <div className="mt-2 text-lg font-medium text-foreground">
                  Backend modular
                </div>
                <div className="mt-3 text-sm text-muted-foreground">
                  Separación clara entre dominios: tokens, chain, wallets.
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

