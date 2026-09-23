// ─────────────────────────────────────────────────────────────
// Todo el contenido del sitio vive en este archivo.
// Para actualizar tu CV web, editá solo esto.
// ─────────────────────────────────────────────────────────────

export type Lang = "es" | "en";
type T = Record<Lang, string>;

export const profile = {
  name: "Matias Rosenblatt",
  email: "matirosen2@gmail.com",
  // Pegá tu URL de LinkedIn acá (ej: "https://www.linkedin.com/in/tu-usuario").
  // Si queda vacío, el botón no se muestra.
  linkedin: "https://www.linkedin.com/in/matias-rosenblatt/",
  // Se muestra solo como ícono chico en la sección de contacto. Dejalo vacío ("") para ocultarlo.
  instagram: "https://www.instagram.com/matirosenblatt_/",
  location: { es: "Buenos Aires, Argentina", en: "Buenos Aires, Argentina" } as T,
  headline: {
    es: "Finanzas y análisis de negocios · Datos · Automatización con IA",
    en: "Finance & business analysis · Data · AI-powered automation",
  } as T,
  summary: {
    es: "Estudiante avanzado de Administración de Empresas y Marketing (UADE) con experiencia en finanzas corporativas en ExxonMobil y co-fundador de SupplyO, un marketplace B2B que construí de punta a punta. Combino análisis financiero con capacidad técnica para crear herramientas que mejoran procesos y la toma de decisiones basada en datos.",
    en: "Advanced Business Administration and Marketing student (UADE) with corporate finance experience at ExxonMobil and co-founder of SupplyO, a B2B marketplace I built end to end. I combine financial analysis with hands-on technical skills to build tools that improve processes and data-driven decision-making.",
  } as T,
  cv: {
    es: "/CV_Matias_Rosenblatt_ES.pdf",
    en: "/CV_Matias_Rosenblatt_EN.pdf",
  } as T,
};

export const labels = {
  about: { es: "Sobre mí", en: "About" },
  experience: { es: "Experiencia", en: "Experience" },
  projects: { es: "Proyectos", en: "Projects" },
  education: { es: "Educación", en: "Education" },
  skills: { es: "Habilidades", en: "Skills" },
  languages: { es: "Idiomas", en: "Languages" },
  contact: { es: "Contacto", en: "Contact" },
  downloadCv: { es: "Descargar CV", en: "Download CV" },
  visit: { es: "Visitar sitio", en: "Visit site" },
  contactText: {
    es: "¿Querés conversar sobre una oportunidad? Escribime.",
    en: "Want to talk about an opportunity? Get in touch.",
  },
} satisfies Record<string, T>;

export type Job = {
  role: T;
  org: string;
  url?: string;
  dates: T;
  context?: T;
  bullets: Record<Lang, string[]>;
};

export const experience: Job[] = [
  {
    role: { es: "Co-fundador", en: "Co-founder" },
    org: "SupplyO Network",
    url: "https://supplyonetwork.com",
    dates: { es: "Ene. 2026 – Presente", en: "Jan 2026 – Present" },
    context: {
      es: "Marketplace B2B que conecta compradores y proveedores de packaging en Argentina.",
      en: "B2B marketplace connecting packaging buyers and suppliers in Argentina.",
    },
    bullets: {
      es: [
        "Evaluación económica del proyecto y diseño del modelo de monetización basado en créditos.",
        "Desarrollo integral de la plataforma y su base de datos, apoyado en agentes de IA para automatizar procesos.",
        "Liderazgo del desarrollo comercial: red de +50 proveedores en Argentina.",
      ],
      en: [
        "Ran the financial evaluation of the venture and designed its credit-based monetization model.",
        "Built the full platform and its database, using AI agents to automate workflows.",
        "Led business development, building a network of 50+ suppliers across Argentina.",
      ],
    },
  },
  {
    role: { es: "Financial Services Intern", en: "Financial Services Intern" },
    org: "ExxonMobil",
    dates: { es: "Oct. 2024 – Feb. 2026", en: "Oct 2024 – Feb 2026" },
    context: { es: "Industria de petróleo y gas", en: "Oil & gas" },
    bullets: {
      es: [
        "Gestión y análisis de la información contable de activos fijos en SAP, asegurando calidad y confiabilidad de los datos.",
        "Validación de datos críticos como soporte al reporting financiero y a los cierres mensuales.",
        "Coordinación con equipos regionales e internacionales, en inglés.",
      ],
      en: [
        "Managed and analyzed fixed asset accounting data in SAP, ensuring data quality and reliability.",
        "Validated critical data supporting financial reporting and month-end close.",
        "Partnered with regional and international Finance teams in English.",
      ],
    },
  },
  {
    role: { es: "Junior Contable", en: "Junior Accountant" },
    org: "WNS & Asociados",
    dates: { es: "Ago. 2022 – Dic. 2022", en: "Aug 2022 – Dec 2022" },
    bullets: {
      es: ["Registro de libros diarios y asientos contables; soporte en cierres contables."],
      en: ["Maintained general journals and accounting entries; supported month-end close."],
    },
  },
  {
    role: { es: "Advisor", en: "Advisor" },
    org: "BBYO",
    dates: { es: "Abr. 2022 – Ago. 2024", en: "Apr 2022 – Aug 2024" },
    bullets: {
      es: ["Liderazgo de grupos de trabajo, seguimiento de objetivos y coordinación con stakeholders."],
      en: ["Led work groups, tracked goals and coordinated with stakeholders."],
    },
  },
];

export type Project = {
  name: string;
  url?: string;
  description: T;
  tags: string[];
};

// Sumá acá nuevos proyectos (por ejemplo, un dashboard de Power BI).
export const projects: Project[] = [
  {
    name: "SupplyO Network",
    url: "https://supplyonetwork.com",
    description: {
      es: "Marketplace B2B que conecta compradores y proveedores de packaging a través de pedidos de cotización y un modelo de créditos. Incluye algoritmo de matching, cobros con MercadoPago y flujos de onboarding.",
      en: "B2B marketplace connecting packaging buyers and suppliers through quote requests and a credit-based model. Includes a matching algorithm, MercadoPago payments and onboarding flows.",
    },
    tags: ["Next.js", "TypeScript", "Supabase", "MercadoPago", "AI agents"],
  },
];

export const education = [
  {
    title: {
      es: "Lic. en Administración de Empresas y Lic. en Marketing",
      en: "B.A. in Business Administration & B.A. in Marketing",
    } as T,
    org: "UADE",
    dates: { es: "2022 – 2026", en: "2022 – 2026" } as T,
    note: { es: "Graduación prevista: diciembre 2026", en: "Expected graduation: December 2026" } as T,
  },
  {
    title: { es: "Diseño Industrial (no finalizada)", en: "Industrial Design (not finished)" } as T,
    org: "Universidad de Palermo",
    dates: { es: "2020 – 2021", en: "2020 – 2021" } as T,
    note: { es: "17 materias aprobadas", en: "17 courses completed" } as T,
  },
];

export const skills: { group: T; items: Record<Lang, string[]> }[] = [
  {
    group: { es: "Finanzas", en: "Finance" },
    items: {
      es: ["Evaluación de proyectos (VAN, TIR)", "Reporting financiero", "Contabilidad y cierre", "Activos fijos"],
      en: ["Investment evaluation (NPV, IRR)", "Financial reporting", "Accounting & close", "Fixed assets"],
    },
  },
  {
    group: { es: "Herramientas", en: "Tools" },
    items: {
      es: ["SAP", "Excel", "PowerPoint"],
      en: ["SAP", "Excel", "PowerPoint"],
    },
  },
  {
    group: { es: "Datos y tecnología", en: "Data & tech" },
    items: {
      es: ["Supabase (PostgreSQL)", "TypeScript", "Next.js", "Agentes de IA", "Automatización"],
      en: ["Supabase (PostgreSQL)", "TypeScript", "Next.js", "AI agents", "Automation"],
    },
  },
];

export const languages: { name: T; level: T }[] = [
  { name: { es: "Español", en: "Spanish" }, level: { es: "Nativo", en: "Native" } },
  { name: { es: "Inglés", en: "English" }, level: { es: "Bilingüe (Cambridge ICE)", en: "Bilingual (Cambridge ICE)" } },
  { name: { es: "Francés y portugués", en: "French & Portuguese" }, level: { es: "Básico", en: "Basic" } },
];
