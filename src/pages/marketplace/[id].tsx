import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import {
  BadgeCheck,
  Banknote,
  Building2,
  CalendarClock,
  ChartNoAxesColumnIncreasing,
  CircleDollarSign,
  ClipboardCheck,
  FileCheck2,
  Globe,
  Landmark,
  Layers,
  Lock,
  MapPinned,
  Network,
  ShieldCheck,
  SquareChartGantt,
  Vote,
} from "lucide-react";

import { getProjectById } from "@/components/equity/mockData";
import { Button } from "@/components/ui/button";

type ProjectStatus = "Activo" | "En preventa" | "Cerrado";

type NearbyAmenity = {
  name: string;
  eta: string;
  mode: "A pie" | "En auto";
};

type ProjectInsight = {
  projectType: string;
  status: ProjectStatus;
  briefDescription: string;
  yearBuiltOrDelivery: string;
  totalArea: string;
  occupancyRate: string;
  ratings: string[];
  nearbyAmenities: NearbyAmenity[];
  regulatory: {
    authority: string;
    permits: string[];
    standards: string[];
    auditFrequency: string;
    availableDocs: string[];
  };
  blockchain: {
    network: string;
    tokenStandard: string;
    contractAddress: string;
    availableTokens: number;
    securityMeasures: string[];
    tokenUtility: string;
  };
  investmentTerms: {
    minimumInvestmentUsd: number;
    lockupPeriod: string;
    dividendFrequency: string;
    votingRights: string;
    secondaryMarket: string;
  };
  locationInfo: {
    strategicContext: string;
    growthPotential: string;
    mapImageUrl: string;
  };
};

const CATEGORY_DEFAULTS: Record<
  string,
  Omit<ProjectInsight, "briefDescription" | "status" | "regulatory" | "blockchain">
> = {
  Residential: {
    projectType: "Residencial",
    yearBuiltOrDelivery: "Entrega estimada 2028",
    totalArea: "38,500 m2",
    occupancyRate: "87%",
    ratings: ["Infraestructura A-", "Sostenibilidad LEED Silver", "Conectividad alta"],
    nearbyAmenities: [
      { name: "Centro comercial principal", eta: "8 min", mode: "En auto" },
      { name: "Hospital regional", eta: "12 min", mode: "En auto" },
      { name: "Zona gastronomica", eta: "10 min", mode: "A pie" },
    ],
    investmentTerms: {
      minimumInvestmentUsd: 250,
      lockupPeriod: "12 meses",
      dividendFrequency: "Trimestral",
      votingRights: "1 token = 1 voto en decisiones clave",
      secondaryMarket: "Disponible en mercado secundario EQ",
    },
    locationInfo: {
      strategicContext:
        "Ubicacion en corredor de alta demanda habitacional con acceso a vias principales y servicios esenciales.",
      growthPotential:
        "Zona con crecimiento sostenido por expansion urbana, turismo interno y nueva infraestructura vial.",
      mapImageUrl: "https://picsum.photos/seed/residential-map/900/520",
    },
  },
  Commercial: {
    projectType: "Comercial",
    yearBuiltOrDelivery: "Entrega estimada 2027",
    totalArea: "56,000 m2",
    occupancyRate: "91%",
    ratings: ["Infraestructura A", "Sostenibilidad LEED Gold", "Conectividad premium"],
    nearbyAmenities: [
      { name: "Distrito financiero", eta: "4 min", mode: "En auto" },
      { name: "Centro de convenciones", eta: "6 min", mode: "En auto" },
      { name: "Estacion de transporte", eta: "9 min", mode: "A pie" },
    ],
    investmentTerms: {
      minimumInvestmentUsd: 500,
      lockupPeriod: "18 meses",
      dividendFrequency: "Trimestral",
      votingRights: "Voto ponderado por tokens para mejoras del activo",
      secondaryMarket: "Disponible con ventana de liquidez continua",
    },
    locationInfo: {
      strategicContext:
        "Activo dentro de un cluster corporativo con alta densidad de empresas y flujo comercial constante.",
      growthPotential:
        "Potencial de valorizacion impulsado por ocupacion estable y nuevos desarrollos de uso mixto.",
      mapImageUrl: "https://picsum.photos/seed/commercial-map/900/520",
    },
  },
  Hospitality: {
    projectType: "Turismo y hoteleria",
    yearBuiltOrDelivery: "Apertura operativa 2027",
    totalArea: "29,300 m2",
    occupancyRate: "74%",
    ratings: ["Infraestructura B+", "Sostenibilidad B", "Conectividad alta"],
    nearbyAmenities: [
      { name: "Playa principal", eta: "5 min", mode: "A pie" },
      { name: "Marina y muelle turistico", eta: "11 min", mode: "En auto" },
      { name: "Zona de restaurantes", eta: "7 min", mode: "En auto" },
    ],
    investmentTerms: {
      minimumInvestmentUsd: 300,
      lockupPeriod: "12 meses",
      dividendFrequency: "Mensual",
      votingRights: "Votacion en presupuesto de mejora de amenidades",
      secondaryMarket: "Disponible con fee de salida reducido",
    },
    locationInfo: {
      strategicContext:
        "Ubicado en polo turistico de alta visibilidad internacional, con eventos estacionales de gran traccion.",
      growthPotential:
        "Incremento esperado de flujo turistico por inversiones publicas y posicionamiento de marca pais.",
      mapImageUrl: "https://picsum.photos/seed/hospitality-map/900/520",
    },
  },
  Energy: {
    projectType: "Infraestructura energetica",
    yearBuiltOrDelivery: "Puesta en marcha 2027",
    totalArea: "64,000 m2",
    occupancyRate: "N/A (activo productivo)",
    ratings: ["Infraestructura A", "Sostenibilidad A", "Conectividad industrial"],
    nearbyAmenities: [
      { name: "Subestacion electrica", eta: "9 min", mode: "En auto" },
      { name: "Puerto logistico", eta: "25 min", mode: "En auto" },
      { name: "Centro de mantenimiento", eta: "14 min", mode: "En auto" },
    ],
    investmentTerms: {
      minimumInvestmentUsd: 400,
      lockupPeriod: "24 meses",
      dividendFrequency: "Trimestral",
      votingRights: "Voto tecnico en expansiones y upgrades",
      secondaryMarket: "Disponible con market makers internos",
    },
    locationInfo: {
      strategicContext:
        "Proyecto en corredor energetico con acceso a infraestructura de transmision y cadena logistica.",
      growthPotential:
        "Demanda regional de energia limpia en alza, favoreciendo contratos de largo plazo y estabilidad de flujos.",
      mapImageUrl: "https://picsum.photos/seed/energy-map/900/520",
    },
  },
  Public: {
    projectType: "Infraestructura publica",
    yearBuiltOrDelivery: "Entrega estimada 2029",
    totalArea: "120,000 m2",
    occupancyRate: "N/A (uso publico)",
    ratings: ["Infraestructura A-", "Sostenibilidad B+", "Conectividad regional"],
    nearbyAmenities: [
      { name: "Terminal de transporte", eta: "15 min", mode: "En auto" },
      { name: "Puerto comercial", eta: "18 min", mode: "En auto" },
      { name: "Nodo logistico", eta: "22 min", mode: "En auto" },
    ],
    investmentTerms: {
      minimumInvestmentUsd: 200,
      lockupPeriod: "24 meses",
      dividendFrequency: "Semestral",
      votingRights: "Voto en fases de expansion y contratos operadores",
      secondaryMarket: "Disponible sujeto a ventana regulatoria",
    },
    locationInfo: {
      strategicContext:
        "Infraestructura con impacto economico transversal y soporte estatal en etapa de desarrollo.",
      growthPotential:
        "Mejora esperada de movilidad y comercio regional, con efecto directo en uso y monetizacion del activo.",
      mapImageUrl: "https://picsum.photos/seed/public-map/900/520",
    },
  },
  Bonds: {
    projectType: "Instrumento financiero",
    yearBuiltOrDelivery: "Emision vigente",
    totalArea: "N/A",
    occupancyRate: "N/A",
    ratings: ["Riesgo soberano BBB", "Cumplimiento KYC/AML", "Liquidez media-alta"],
    nearbyAmenities: [
      { name: "Institucion emisora", eta: "N/A", mode: "En auto" },
      { name: "Mercado secundario digital", eta: "24/7", mode: "A pie" },
      { name: "Custodio regulado", eta: "N/A", mode: "En auto" },
    ],
    investmentTerms: {
      minimumInvestmentUsd: 100,
      lockupPeriod: "Sin lock-up estricto",
      dividendFrequency: "Mensual",
      votingRights: "Sin voto de gobernanza inmobiliaria",
      secondaryMarket: "Disponible 24/7",
    },
    locationInfo: {
      strategicContext:
        "Instrumento digital con respaldo institucional y estructura de emision orientada a mercado global.",
      growthPotential:
        "Potencial de adopcion por ampliacion de canales de distribucion y profundidad de mercado.",
      mapImageUrl: "https://picsum.photos/seed/bonds-map/900/520",
    },
  },
  Entertainment: {
    projectType: "Entretenimiento",
    yearBuiltOrDelivery: "Entrega estimada 2028",
    totalArea: "34,700 m2",
    occupancyRate: "79%",
    ratings: ["Infraestructura B+", "Sostenibilidad B+", "Conectividad alta"],
    nearbyAmenities: [
      { name: "Zona hotelera", eta: "6 min", mode: "En auto" },
      { name: "Centro urbano", eta: "10 min", mode: "En auto" },
      { name: "Parque publico", eta: "12 min", mode: "A pie" },
    ],
    investmentTerms: {
      minimumInvestmentUsd: 300,
      lockupPeriod: "15 meses",
      dividendFrequency: "Trimestral",
      votingRights: "Voto en calendario de eventos y alianzas",
      secondaryMarket: "Disponible",
    },
    locationInfo: {
      strategicContext:
        "Activo en area de alto trafico de visitantes, cercano a nodos hoteleros y gastronomicos.",
      growthPotential:
        "Demanda creciente de experiencias de entretenimiento y eventos de formato mixto.",
      mapImageUrl: "https://picsum.photos/seed/entertainment-map/900/520",
    },
  },
};

function formatUsd(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function formatCompactTokens(value: number) {
  return value.toLocaleString("en-US");
}

function getStatus(progressFondeo: number): ProjectStatus {
  if (progressFondeo <= 0) return "En preventa";
  if (progressFondeo >= 95) return "Cerrado";
  return "Activo";
}

function splitLocation(location: string) {
  const chunks = location
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  if (chunks.length >= 2) {
    return { city: chunks[0], country: chunks.slice(1).join(", ") };
  }
  return { city: location, country: "N/A" };
}

function getProjectInsight(project: ReturnType<typeof getProjectById>): ProjectInsight {
  const defaults = CATEGORY_DEFAULTS[project.category];
  const status = getStatus(project.progressFondeo);
  const availableTokens = Math.max(
    Math.round(project.totalSupply * (1 - project.progressFondeo / 100)),
    0
  );
  const compactProjectName = project.title.toLowerCase().replace(/[^a-z0-9]/g, "");
  const contractSuffix = compactProjectName.padEnd(40, "0").slice(0, 40);

  return {
    ...defaults,
    status,
    briefDescription: project.description,
    regulatory: {
      authority: "Comision Nacional de Activos Digitales (CNAD), El Salvador",
      permits: [
        "Permiso de emision de activo digital",
        "Registro de emisor y custodio",
        "Cumplimiento AML/KYC",
      ],
      standards: ["ISO 19650", "IFRS", "FATF Travel Rule"],
      auditFrequency: "Auditoria financiera trimestral + auditoria tecnica anual",
      availableDocs: project.legalDocs.map((doc) => doc.name),
    },
    blockchain: {
      network: "Ethereum",
      tokenStandard: "ERC-20",
      contractAddress: `0x${contractSuffix}`,
      availableTokens,
      securityMeasures: [
        "Auditoria externa de smart contract",
        "Multisig para funciones administrativas",
        "Monitoreo on-chain y alertas de riesgo",
      ],
      tokenUtility:
        "El token otorga derechos economicos sobre rendimientos, acceso a dividendos y participacion en votaciones segun terminos del proyecto.",
    },
  };
}

function InfoCard({
  icon,
  label,
  value,
  accent = "text-primary",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="rounded-2xl border border-border/40 bg-black/25 p-4">
      <div className={`inline-flex rounded-xl border border-border/30 bg-black/20 p-2 ${accent}`}>
        {icon}
      </div>
      <div className="mt-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</div>
      <div className="mt-1 text-base font-semibold text-foreground">{value}</div>
    </div>
  );
}

export default function ProjectDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const project = useMemo(() => {
    const value = typeof id === "string" ? id : "rwa-energy-aurora";
    return getProjectById(value);
  }, [id]);

  const detail = useMemo(() => getProjectInsight(project), [project]);
  const { city, country } = useMemo(() => splitLocation(project.location), [project.location]);

  const statusClasses: Record<ProjectStatus, string> = {
    Activo: "border-emerald-500/40 bg-emerald-500/15 text-emerald-300",
    "En preventa": "border-amber-500/40 bg-amber-500/15 text-amber-300",
    Cerrado: "border-violet-500/40 bg-violet-500/15 text-violet-300",
  };

  return (
    <>
      <Head>
        <title>{project.title} - Marketplace EQ</title>
      </Head>

      <div className="eq-page">
        <div className="eq-card overflow-hidden p-0">
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.imageUrl}
              alt={`Imagen principal de ${project.title}`}
              className="aspect-16/6 w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#08070e] via-[#08070e]/35 to-transparent" />
            <div className="absolute left-5 top-5 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-primary/35 bg-primary/15 px-3 py-1 text-xs font-medium text-primary">
                {project.category}
              </span>
              <span
                className={`rounded-full border px-3 py-1 text-xs font-medium ${statusClasses[detail.status]}`}
              >
                {detail.status}
              </span>
            </div>
          </div>
          <div className="p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  Identificacion del Proyecto
                </div>
                <h2 className="mt-2 text-2xl font-semibold text-foreground">{project.title}</h2>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPinned className="size-4 text-primary" />
                    {city}, {country}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Building2 className="size-4 text-blue-400" />
                    {detail.projectType}
                  </span>
                </div>
              </div>
              <Button asChild variant="outline" className="eq-btn-outline rounded-full px-6 py-3">
                <Link href="/marketplace">Volver al Marketplace</Link>
              </Button>
            </div>
          </div>
        </div>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <InfoCard
            icon={<CircleDollarSign className="size-4" />}
            label="Precio por token"
            value={formatUsd(project.pricePerTokenUsd)}
            accent="text-primary"
          />
          <InfoCard
            icon={<ChartNoAxesColumnIncreasing className="size-4" />}
            label="Retorno anual esperado"
            value={`${project.roiAnnual.toFixed(1)}%`}
            accent="text-emerald-400"
          />
          <InfoCard
            icon={<Landmark className="size-4" />}
            label="Valor total del proyecto"
            value={formatUsd(project.pricePerTokenUsd * project.totalSupply)}
            accent="text-violet-400"
          />
          <InfoCard
            icon={<BadgeCheck className="size-4" />}
            label="Estado actual"
            value={detail.status}
            accent="text-amber-400"
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="eq-card">
              <h3 className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
                Descripcion General
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{detail.briefDescription}</p>
              <div className="mt-4 rounded-xl border border-border/40 bg-black/20 p-3">
                <div className="text-xs text-muted-foreground">Tipo de propiedad</div>
                <div className="mt-1 text-sm font-semibold text-foreground">{detail.projectType}</div>
              </div>
            </div>

            <div className="eq-card">
              <h3 className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
                Caracteristicas Clave
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-border/40 bg-black/20 p-3">
                  <div className="text-xs text-muted-foreground">Ano de construccion / entrega</div>
                  <div className="mt-1 text-sm font-semibold text-foreground">
                    {detail.yearBuiltOrDelivery}
                  </div>
                </div>
                <div className="rounded-xl border border-border/40 bg-black/20 p-3">
                  <div className="text-xs text-muted-foreground">Area total</div>
                  <div className="mt-1 text-sm font-semibold text-foreground">{detail.totalArea}</div>
                </div>
                <div className="rounded-xl border border-border/40 bg-black/20 p-3">
                  <div className="text-xs text-muted-foreground">Tasa de ocupacion</div>
                  <div className="mt-1 text-sm font-semibold text-foreground">{detail.occupancyRate}</div>
                </div>
                <div className="rounded-xl border border-border/40 bg-black/20 p-3">
                  <div className="text-xs text-muted-foreground">Progreso de fondeo</div>
                  <div className="mt-1 text-sm font-semibold text-foreground">{project.progressFondeo}%</div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {detail.ratings.map((rating) => (
                  <div
                    key={rating}
                    className="flex items-center gap-2 rounded-xl border border-border/30 bg-black/15 px-3 py-2"
                  >
                    <ClipboardCheck className="size-4 text-primary" />
                    <span className="text-sm text-foreground">{rating}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="eq-card">
              <h3 className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
                Amenidades Cercanas
              </h3>
              <div className="mt-4 space-y-2">
                {detail.nearbyAmenities.map((amenity) => (
                  <div
                    key={`${amenity.name}-${amenity.eta}`}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border/40 bg-black/20 px-4 py-3"
                  >
                    <div className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                      <MapPinned className="size-4 text-primary" />
                      {amenity.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {amenity.eta} · {amenity.mode}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="eq-card">
              <h3 className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
                Cumplimiento Regulatorio
              </h3>
              <div className="mt-4 grid gap-3">
                <div className="rounded-xl border border-border/40 bg-black/20 p-4">
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    <ShieldCheck className="size-4 text-primary" />
                    Entidad gubernamental
                  </div>
                  <div className="mt-2 text-sm font-semibold text-foreground">
                    {detail.regulatory.authority}
                  </div>
                </div>
                <div className="rounded-xl border border-border/40 bg-black/20 p-4">
                  <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    Permisos obtenidos
                  </div>
                  <ul className="mt-2 space-y-1.5 text-sm text-foreground">
                    {detail.regulatory.permits.map((permit) => (
                      <li key={permit} className="inline-flex items-center gap-2">
                        <FileCheck2 className="size-4 text-emerald-400" />
                        {permit}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-border/40 bg-black/20 p-4">
                    <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                      Estandares aplicables
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {detail.regulatory.standards.map((standard) => (
                        <span
                          key={standard}
                          className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary"
                        >
                          {standard}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl border border-border/40 bg-black/20 p-4">
                    <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                      Frecuencia de auditorias
                    </div>
                    <div className="mt-2 text-sm font-semibold text-foreground">
                      {detail.regulatory.auditFrequency}
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-border/40 bg-black/20 p-4">
                  <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    Documentos legales disponibles
                  </div>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {detail.regulatory.availableDocs.map((doc) => (
                      <div
                        key={doc}
                        className="rounded-lg border border-border/30 bg-black/20 px-3 py-2 text-sm text-foreground"
                      >
                        {doc}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="eq-card eq-section-line">
              <h3 className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
                Galeria del Activo
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {project.gallery.map((img) => {
                  const seed = `${project.id}-${img.label.toLowerCase().replace(/\s+/g, "-")}`;
                  return (
                    <div
                      key={img.label}
                      className="overflow-hidden rounded-2xl border border-border/40 bg-black/20"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://picsum.photos/seed/${seed}/640/420`}
                        alt={`${project.title} - ${img.label}`}
                        className="aspect-4/3 w-full object-cover"
                      />
                      <div className="border-t border-border/30 px-3 py-2 text-xs text-muted-foreground">
                        {img.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="eq-card">
              <h3 className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
                Detalles Blockchain / Tokenizacion
              </h3>
              <div className="mt-4 space-y-3 text-sm">
                <div className="rounded-xl border border-border/40 bg-black/20 p-3">
                  <div className="inline-flex items-center gap-2 text-muted-foreground">
                    <Network className="size-4 text-primary" />
                    Red y estandar
                  </div>
                  <div className="mt-1 font-semibold text-foreground">
                    {detail.blockchain.network} · {detail.blockchain.tokenStandard}
                  </div>
                </div>
                <div className="rounded-xl border border-border/40 bg-black/20 p-3">
                  <div className="inline-flex items-center gap-2 text-muted-foreground">
                    <Layers className="size-4 text-blue-400" />
                    Supply total y disponible
                  </div>
                  <div className="mt-1 font-semibold text-foreground">
                    {formatCompactTokens(project.totalSupply)} total ·{" "}
                    {formatCompactTokens(detail.blockchain.availableTokens)} disponibles
                  </div>
                </div>
                <div className="rounded-xl border border-border/40 bg-black/20 p-3">
                  <div className="inline-flex items-center gap-2 text-muted-foreground">
                    <SquareChartGantt className="size-4 text-violet-400" />
                    Direccion de contrato
                  </div>
                  <div className="mt-1 break-all font-mono text-xs text-foreground">
                    {detail.blockchain.contractAddress}
                  </div>
                </div>
                <div className="rounded-xl border border-border/40 bg-black/20 p-3">
                  <div className="inline-flex items-center gap-2 text-muted-foreground">
                    <Lock className="size-4 text-emerald-400" />
                    Medidas de seguridad
                  </div>
                  <ul className="mt-2 space-y-1.5 text-foreground">
                    {detail.blockchain.securityMeasures.map((measure) => (
                      <li key={measure} className="inline-flex items-center gap-2">
                        <ShieldCheck className="size-3.5 text-emerald-400" />
                        {measure}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-border/40 bg-black/20 p-3">
                  <div className="inline-flex items-center gap-2 text-muted-foreground">
                    <Globe className="size-4 text-amber-400" />
                    Utilidad del token
                  </div>
                  <p className="mt-1 text-muted-foreground">{detail.blockchain.tokenUtility}</p>
                </div>
              </div>
            </div>

            <div className="eq-card">
              <h3 className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
                Terminos de Inversion
              </h3>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between rounded-xl border border-border/40 bg-black/20 px-3 py-2.5">
                  <span className="inline-flex items-center gap-2 text-muted-foreground">
                    <Banknote className="size-4 text-primary" />
                    Inversion minima
                  </span>
                  <span className="font-semibold text-foreground">
                    {formatUsd(detail.investmentTerms.minimumInvestmentUsd)}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-border/40 bg-black/20 px-3 py-2.5">
                  <span className="inline-flex items-center gap-2 text-muted-foreground">
                    <CalendarClock className="size-4 text-blue-400" />
                    Lock-up
                  </span>
                  <span className="font-semibold text-foreground">
                    {detail.investmentTerms.lockupPeriod}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-border/40 bg-black/20 px-3 py-2.5">
                  <span className="inline-flex items-center gap-2 text-muted-foreground">
                    <CircleDollarSign className="size-4 text-emerald-400" />
                    Dividendos
                  </span>
                  <span className="font-semibold text-foreground">
                    {detail.investmentTerms.dividendFrequency}
                  </span>
                </div>
                <div className="rounded-xl border border-border/40 bg-black/20 px-3 py-2.5">
                  <div className="inline-flex items-center gap-2 text-muted-foreground">
                    <Vote className="size-4 text-violet-400" />
                    Derechos de voto
                  </div>
                  <div className="mt-1 font-semibold text-foreground">
                    {detail.investmentTerms.votingRights}
                  </div>
                </div>
                <div className="rounded-xl border border-border/40 bg-black/20 px-3 py-2.5">
                  <div className="inline-flex items-center gap-2 text-muted-foreground">
                    <ChartNoAxesColumnIncreasing className="size-4 text-amber-400" />
                    Mercado secundario
                  </div>
                  <div className="mt-1 font-semibold text-foreground">
                    {detail.investmentTerms.secondaryMarket}
                  </div>
                </div>
              </div>
            </div>

            <div className="eq-card">
              <h3 className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
                Informacion de Ubicacion
              </h3>
              <div className="mt-4 space-y-3">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {detail.locationInfo.strategicContext}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {detail.locationInfo.growthPotential}
                </p>
                <div className="overflow-hidden rounded-2xl border border-border/40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={detail.locationInfo.mapImageUrl}
                    alt={`Referencia geografica de ${project.title}`}
                    className="aspect-video w-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="eq-card">
              <h3 className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
                Enlaces utiles
              </h3>
              <div className="mt-4 grid gap-2">
                <Button asChild className="eq-cta w-full">
                  <Link href="/marketplace">Invertir en este proyecto</Link>
                </Button>
                <Button asChild variant="outline" className="eq-btn-outline w-full">
                  <Link href="/governance">Ver gobernanza del activo</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

