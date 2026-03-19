export type MarketplaceCategory =
  | "Hospitality"
  | "Residential"
  | "Commercial"
  | "Energy"
  | "Entertainment"
  | "Public"
  | "Bonds";

export type MarketplaceProject = {
  id: string;
  title: string;
  category: MarketplaceCategory;
  roiAnnual: number;
  location: string;
  progressFondeo: number; // funded 0-100
  constructionProgress: number; // construction 0-100
  pricePerTokenUsd: number;
  totalSupply: number;
  description: string;
  legalDocs: { name: string }[];
  gallery: { label: string }[];
  imageUrl: string;
};

export type GovernanceProposal = {
  id: string;
  title: string;
  description: string;
  startsAt: number;
  endsAt: number;
  options: ("A favor" | "En contra" | "Abstención")[];
};

export type DividendPayment = {
  id: string;
  date: string;
  amountUsd: number;
  status: "Pendiente" | "Cobrado";
};

export type OrderLine = {
  priceUsd: number;
  quantityTokens: number;
  totalUsd: number;
};

export type PortfolioHolding = {
  projectId: string;
  projectName: string;
  tokens: number;
  invested: number;
  current: number;
  isBond?: boolean;
};

export const projects: MarketplaceProject[] = [
  {
    id: "torres-del-pacifico",
    title: "Torres del Pacifico",
    category: "Residential",
    roiAnnual: 10.5,
    location: "Golfo de Fonseca, El Salvador",
    progressFondeo: 40,
    constructionProgress: 16,
    pricePerTokenUsd: 75,
    totalSupply: 1_000_000,
    description:
      "Complejo residencial de lujo ubicado a orillas del Golfo de Fonseca. Cada token representa derechos económicos sobre una fracción del activo subyacente. El proyecto ofrece unidades premium con vistas panorámicas al golfo y marina privada.",
    legalDocs: [
      { name: "Escritura / Título" },
      { name: "Permisos de construcción" },
      { name: "Contrato de custodia" },
      { name: "Resumen legal (PDF)" },
    ],
    gallery: [
      { label: "Vista aérea" },
      { label: "Lobby / área común" },
      { label: "Plantas y distribución" },
      { label: "Vista nocturna" },
      { label: "Marina privada" },
      { label: "Detalle de acabados" },
    ],
    imageUrl: "https://picsum.photos/seed/torres-pacifico/800/450",
  },
  {
    id: "metro-cable-del-pacifico",
    title: "Metro Cable del Pacifico",
    category: "Public",
    roiAnnual: 6.5,
    location: "Golfo de Fonseca, El Salvador",
    progressFondeo: 0,
    constructionProgress: 0,
    pricePerTokenUsd: 75,
    totalSupply: 800_000,
    description:
      "Sistema de teleférico sobre el Golfo de Fonseca que conectará puertos y zonas turísticas. Infraestructura pública tokenizada con respaldo gubernamental y flujos de peaje como fuente de rendimiento.",
    legalDocs: [
      { name: "Concesión gubernamental" },
      { name: "Estudio de impacto ambiental" },
      { name: "Contrato operador" },
      { name: "Resumen legal (PDF)" },
    ],
    gallery: [
      { label: "Render principal" },
      { label: "Estación principal" },
      { label: "Vista de cabinas" },
      { label: "Ruta y trayecto" },
    ],
    imageUrl: "https://picsum.photos/seed/metro-cable/800/450",
  },
  {
    id: "serenity-tower",
    title: "Serenity Tower",
    category: "Residential",
    roiAnnual: 10.8,
    location: "San Miguel, El Salvador",
    progressFondeo: 40,
    constructionProgress: 16,
    pricePerTokenUsd: 54,
    totalSupply: 500_000,
    description:
      "Torre residencial de alto estándar en San Miguel con amenidades de clase mundial. Tokenización que permite a inversores acceder a flujos de renta y valorización patrimonial en una de las ciudades de mayor crecimiento del país.",
    legalDocs: [
      { name: "Escritura / Título" },
      { name: "Permisos municipales" },
      { name: "Reglamento y estatutos" },
      { name: "Oficio legal (PDF)" },
    ],
    gallery: [
      { label: "Fachada principal" },
      { label: "Roof garden" },
      { label: "Unidades tipo" },
      { label: "Amenidades" },
      { label: "Vista nocturna" },
    ],
    imageUrl: "https://picsum.photos/seed/serenity-tower/800/450",
  },
  {
    id: "costa-del-golfo",
    title: "Costa del Golfo",
    category: "Residential",
    roiAnnual: 8.5,
    location: "La Unión, El Salvador",
    progressFondeo: 62,
    constructionProgress: 24,
    pricePerTokenUsd: 110,
    totalSupply: 200_000,
    description:
      "Desarrollo costero premium en La Unión con villas y residencias frente al mar. Proyecto de alto valor patrimonial con acceso privado a playa y marina, orientado a inversores que buscan exposición al mercado inmobiliario costero.",
    legalDocs: [
      { name: "Escrituras costeras" },
      { name: "Permiso MARN" },
      { name: "Contrato de fideicomiso" },
      { name: "Resumen legal (PDF)" },
    ],
    gallery: [
      { label: "Vista aérea costera" },
      { label: "Villas frente al mar" },
      { label: "Marina privada" },
      { label: "Amenidades" },
    ],
    imageUrl: "https://picsum.photos/seed/costa-golfo/800/450",
  },
  {
    id: "sigma-plaza",
    title: "Sigma Plaza",
    category: "Commercial",
    roiAnnual: 9.5,
    location: "San Salvador, El Salvador",
    progressFondeo: 55,
    constructionProgress: 22,
    pricePerTokenUsd: 136,
    totalSupply: 500_000,
    description:
      "Edificio comercial premium en el corazón financiero de San Salvador. Torre de oficinas clase A con certificación LEED, orientada a corporaciones internacionales y fondos de inversión. Flujo de caja estable por contratos de arrendamiento a largo plazo.",
    legalDocs: [
      { name: "Escrituras" },
      { name: "Permisos de obra" },
      { name: "Contratos de arrendamiento" },
      { name: "Certificación LEED (PDF)" },
    ],
    gallery: [
      { label: "Fachada" },
      { label: "Lobby corporativo" },
      { label: "Plantas y distribución" },
      { label: "Vista nocturna" },
      { label: "Detalle de acabados" },
    ],
    imageUrl: "https://picsum.photos/seed/sigma-plaza/800/450",
  },
  {
    id: "surf-city-resort",
    title: "Surf City Resort",
    category: "Hospitality",
    roiAnnual: 8.1,
    location: "Surf City 2, El Salvador",
    progressFondeo: 48,
    constructionProgress: 19,
    pricePerTokenUsd: 120,
    totalSupply: 100_000,
    description:
      "Resort boutique de playa en la marca Surf City, el destino turístico estrella de El Salvador. Genera rendimientos mediante operación hotelera, con alta ocupación estacional y eventos internacionales de surf.",
    legalDocs: [
      { name: "Escritura / Título" },
      { name: "Licencia turística" },
      { name: "Contrato de operación hotelera" },
      { name: "Resumen legal (PDF)" },
    ],
    gallery: [
      { label: "Vista desde el mar" },
      { label: "Lobby" },
      { label: "Habitaciones" },
      { label: "Piscina y amenidades" },
      { label: "Playa privada" },
    ],
    imageUrl: "https://picsum.photos/seed/surf-city/800/450",
  },
  {
    id: "volcano-digital-bonds",
    title: "Volcano Digital Bonds",
    category: "Bonds",
    roiAnnual: 7.2,
    location: "El Salvador",
    progressFondeo: 85,
    constructionProgress: 100,
    pricePerTokenUsd: 100,
    totalSupply: 5_000_000,
    description:
      "Bonos digitales respaldados por el Estado de El Salvador con rendimiento fijo garantizado. Instrumento de deuda tokenizado que combina la seguridad de un bono soberano con la liquidez del mercado digital.",
    legalDocs: [
      { name: "Prospecto de emisión" },
      { name: "Garantía soberana" },
      { name: "Contrato de fideicomiso" },
      { name: "Marco regulatorio (PDF)" },
    ],
    gallery: [
      { label: "Volcán (símbolo nacional)" },
      { label: "Infraestructura respaldo" },
      { label: "Estructura financiera" },
      { label: "Flujo de pagos" },
    ],
    imageUrl: "https://picsum.photos/seed/volcano-bonds/800/450",
  },
  {
    id: "aurora-solar",
    title: "Aurora Solar (RWA Energy)",
    category: "Energy",
    roiAnnual: 12.5,
    location: "El Salvador",
    progressFondeo: 64,
    constructionProgress: 45,
    pricePerTokenUsd: 102,
    totalSupply: 2_000_000,
    description:
      "Proyecto tokenizado basado en flujo de caja de energía renovable solar. Cada token representa derechos económicos sobre una fracción del activo subyacente y se audita mediante eventos on-chain.",
    legalDocs: [
      { name: "Escritura / Título" },
      { name: "Permisos y habilitaciones" },
      { name: "Contrato de custodia" },
      { name: "Resumen legal (PDF)" },
    ],
    gallery: [
      { label: "Render principal" },
      { label: "Planta y paneles" },
      { label: "Infraestructura" },
      { label: "Equipo / operación" },
      { label: "Detalle de seguridad" },
      { label: "Mapa del proyecto" },
    ],
    imageUrl: "https://picsum.photos/seed/aurora-solar/800/450",
  },
  {
    id: "cascade-hydro",
    title: "Cascade Hydro (RWA Energy)",
    category: "Energy",
    roiAnnual: 14.1,
    location: "Centroamérica",
    progressFondeo: 78,
    constructionProgress: 60,
    pricePerTokenUsd: 92,
    totalSupply: 3_000_000,
    description:
      "Proyecto RWA de generación basada en recurso hídrico con rendimiento anual estimado. La tokenización permite fraccionamiento y trazabilidad de derechos económicos.",
    legalDocs: [
      { name: "Concesión / Licencia" },
      { name: "Estudios de impacto" },
      { name: "Contrato operador" },
      { name: "Resumen legal (PDF)" },
    ],
    gallery: [
      { label: "Represa" },
      { label: "Turbinado" },
      { label: "Sistemas de monitoreo" },
      { label: "Vista aérea" },
    ],
    imageUrl: "https://picsum.photos/seed/cascade-hydro/800/450",
  },
];

export const portfolioHoldings: PortfolioHolding[] = [
  {
    projectId: "torres-del-pacifico",
    projectName: "Torres del Pacifico",
    tokens: 10,
    invested: 600,
    current: 750,
  },
  {
    projectId: "sigma-plaza",
    projectName: "Sigma Plaza",
    tokens: 3,
    invested: 300,
    current: 408,
  },
  {
    projectId: "metro-cable-del-pacifico",
    projectName: "Metro Cable",
    tokens: 500,
    invested: 500,
    current: 530,
  },
  {
    projectId: "volcano-digital-bonds",
    projectName: "Volcano Digital Bonds",
    tokens: 1000,
    invested: 1000,
    current: 1200,
    isBond: true,
  },
  {
    projectId: "surf-city-resort",
    projectName: "Coastal Resort & Spa",
    tokens: 10,
    invested: 1000,
    current: 1160,
  },
];

export const proposals: GovernanceProposal[] = [
  {
    id: "prop-accept-offer",
    title: "¿Aceptar oferta de compra del activo completo?",
    description:
      "Se propone aceptar una oferta por el activo subyacente y ejecutar el flujo de distribución de rendimientos conforme al smart contract del proyecto.",
    startsAt: Date.now() - 1000 * 60 * 60 * 6,
    endsAt: Date.now() + 1000 * 60 * 60 * 20,
    options: ["A favor", "En contra", "Abstención"],
  },
  {
    id: "prop-reinvest-dividends",
    title: "¿Reinvertir dividendos en mejoras estéticas?",
    description:
      "Se votará sobre la reasignación parcial de dividendos para mejorar componentes del proyecto, buscando elevar el rendimiento futuro y la valorización del activo.",
    startsAt: Date.now() - 1000 * 60 * 60 * 2,
    endsAt: Date.now() + 1000 * 60 * 60 * 48,
    options: ["A favor", "En contra", "Abstención"],
  },
];

export const walletBalances = [
  { symbol: "BTC", amount: 0.042, usdValue: 2730.0 },
  { symbol: "ETH", amount: 0.75, usdValue: 2550.0 },
  { symbol: "SOL", amount: 12.0, usdValue: 1800.0 },
  { symbol: "ADA", amount: 4200.0, usdValue: 2100.0 },
  { symbol: "BNB", amount: 0.95, usdValue: 690.0 },
  { symbol: "LTC", amount: 8.2, usdValue: 410.0 },
  { symbol: "DOGE", amount: 1300.0, usdValue: 115.0 },
];

export const dividendHistory: DividendPayment[] = [
  { id: "div-2026-01", date: "2026-01-30", amountUsd: 58.4, status: "Cobrado" },
  { id: "div-2026-02", date: "2026-02-28", amountUsd: 62.1, status: "Cobrado" },
  { id: "div-2026-03", date: "2026-03-30", amountUsd: 0, status: "Pendiente" },
];

export const orderBookMock = {
  buy: [
    { priceUsd: 1.01, quantityTokens: 1400, totalUsd: 1414 },
    { priceUsd: 1.0, quantityTokens: 900, totalUsd: 900 },
    { priceUsd: 0.99, quantityTokens: 650, totalUsd: 643.5 },
  ],
  sell: [
    { priceUsd: 1.02, quantityTokens: 1200, totalUsd: 1224 },
    { priceUsd: 1.03, quantityTokens: 700, totalUsd: 721 },
    { priceUsd: 1.05, quantityTokens: 450, totalUsd: 472.5 },
  ],
};

export function getProjectById(id: string) {
  return projects.find((p) => p.id === id) ?? projects[0];
}
