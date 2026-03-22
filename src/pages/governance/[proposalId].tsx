import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";

import { proposals } from "@/components/equity/mockData";
import { PageAccentHeader } from "@/components/equity/PageAccentHeader";
import { Button } from "@/components/ui/button";

function formatTimeLeft(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (h >= 24) return `${Math.floor(h / 24)}d ${m}m`;
  return `${h}h ${m}m`;
}

export default function VotingPage() {
  const router = useRouter();
  const { proposalId } = router.query;

  const proposal = useMemo(() => {
    const id = typeof proposalId === "string" ? proposalId : proposals[0]?.id;
    return proposals.find((p) => p.id === id) ?? proposals[0];
  }, [proposalId]);

  const [now, setNow] = useState<number>(0);
  const [vote, setVote] = useState<null | "A favor" | "En contra" | "Abstención">(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 20_000);
    return () => clearInterval(t);
  }, []);

  const left = proposal ? proposal.endsAt - now : 0;

  return (
    <>
      <Head>
        <title>Votación - EQ</title>
      </Head>

      <div className="eq-page">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button
            asChild
            variant="outline"
            className="eq-btn-outline rounded-full px-6 py-3"
          >
            <Link href="/governance">Volver a Gobernanza</Link>
          </Button>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Tiempo restante</div>
            <div className="text-lg font-semibold text-primary">
              {formatTimeLeft(left)}
            </div>
          </div>
        </div>

        <PageAccentHeader
          eyebrow="Propuesta on-chain (demo)"
          title={proposal?.title}
          titleClassName="text-3xl"
          description={proposal?.description}
        >
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {proposal?.options.map((opt) => {
              const active = vote === opt;
              return (
                <Button
                  key={opt}
                  type="button"
                  onClick={() => {
                    setVote(opt);
                    setSubmitted(false);
                  }}
                  className={[
                    "rounded-sm border",
                    active
                      ? "text-foreground"
                      : "border-border/60 bg-black/20 hover:bg-white/5",
                  ].join(" ")}
                  style={
                    active
                      ? {
                          borderColor: "rgba(var(--eq-page-accent-rgb),0.55)",
                          background: "rgba(var(--eq-page-accent-rgb),0.15)",
                          boxShadow: "0 0 0 1px rgba(var(--eq-page-accent-rgb),0.35)",
                        }
                      : undefined
                  }
                >
                  {opt}
                </Button>
              );
            })}
          </div>

          <div className="mt-6 rounded-sm border border-border/40 bg-black/20 p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs text-muted-foreground">Tu estado</div>
                <div className="mt-1 text-sm font-semibold text-foreground">
                  {submitted
                    ? `Voto registrado: ${vote}`
                    : vote
                      ? `Selección: ${vote}`
                      : "Selecciona una opción"}
                </div>
              </div>
              <Button
                type="button"
                disabled={!vote || submitted}
                onClick={() => setSubmitted(true)}
                className="eq-cta disabled:opacity-50"
              >
                {submitted ? (
                  "Votación confirmada (demo)"
                ) : (
                  <>
                    Confirmar voto <span aria-hidden>→</span>
                  </>
                )}
              </Button>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              Demo UI. En producción se integraría el signing y la llamada al
              smart contract de gobernanza.
            </div>
          </div>
        </PageAccentHeader>
      </div>
    </>
  );
}

