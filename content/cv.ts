// ─────────────────────────────────────────────────────────────
// Todo el contenido del sitio vive en este archivo.
// Para actualizar tu CV web, editá solo esto.
// ─────────────────────────────────────────────────────────────

export type Lang = "es" | "en";
export type T = Record<Lang, string>;

export const profile = {
  name: "Matias Rosenblatt",
  email: "matirosen2@gmail.com",
  photo: "/matias.jpg",
  // Dejá cualquiera vacío ("") para ocultarlo.
  linkedin: "https://www.linkedin.com/in/matias-rosenblatt/",
  instagram: "https://www.instagram.com/matirosenblatt_/",
  location: { es: "Buenos Aires, Argentina", en: "Buenos Aires, Argentina" } as T,
  eyebrow: {
    es: "Finanzas · Análisis de negocios · Datos",
    en: "Finance · Business analysis · Data",
  } as T,
  summary: {
    es: "Soy estudiante avanzado de Administración de Empresas y Marketing en UADE. Trabajé en el área de Financial Services de ExxonMobil y co-fundé SupplyO, un marketplace B2B que construí de punta a punta: desde el modelo de negocio hasta la plataforma. Me muevo cómodo entre los números y el código, y disfruto diseñar soluciones simples que mejoran procesos.",
    en: "I'm an advanced Business Administration and Marketing student at UADE. I worked in ExxonMobil's Financial Services team and co-founded SupplyO, a B2B marketplace I built end to end—from the business model to the platform. I'm equally comfortable with numbers and code, and I enjoy designing simple solutions that improve processes.",
  } as T,
  // Mensaje del indicador verde en la portada. Dejalo vacío para ocultarlo.
  status: {
    es: "Disponible para nuevas oportunidades",
    en: "Open to new opportunities",
  } as T,
  cv: {
    es: "/CV_Matias_Rosenblatt_ES.pdf",
    en: "/CV_Matias_Rosenblatt_EN.pdf",
  } as T,
};

export const labels = {
  nav: {
    about: { es: "Sobre mí", en: "About" },
    letter: { es: "Carta", en: "Letter" },
    experience: { es: "Experiencia", en: "Experience" },
    interests: { es: "Intereses", en: "Interests" },
    contact: { es: "Contacto", en: "Contact" },
  },
  about: { es: "Sobre mí", en: "About" },
  letter: { es: "Carta de presentación", en: "Cover letter" },
  copyLetter: { es: "Copiar carta", en: "Copy letter" },
  letterCopied: { es: "Carta copiada", en: "Letter copied" },
  experience: { es: "Experiencia", en: "Experience" },
  projects: { es: "Proyectos", en: "Projects" },
  volunteering: { es: "Liderazgo y voluntariado", en: "Leadership & volunteering" },
  education: { es: "Educación", en: "Education" },
  skills: { es: "Habilidades", en: "Skills" },
  languages: { es: "Idiomas", en: "Languages" },
  interests: { es: "Intereses", en: "Interests" },
  interestsIntro: {
    es: "Lo que me mueve fuera del trabajo, y que muchas veces termina influyendo en cómo trabajo.",
    en: "What drives me outside of work—and often shapes how I work.",
  },
  contact: { es: "Contacto", en: "Contact" },
  contactTitle: { es: "Hablemos.", en: "Let's talk." },
  contactText: {
    es: "¿Tenés una oportunidad o un proyecto en mente? Escribime y te respondo a la brevedad.",
    en: "Have an opportunity or a project in mind? Drop me a line and I'll get back to you soon.",
  },
  downloadCv: { es: "Descargar CV", en: "Download CV" },
  writeMe: { es: "Escribime", en: "Get in touch" },
  visit: { es: "Visitar sitio", en: "Visit site" },
  copyEmail: { es: "Copiar email", en: "Copy email" },
  copied: { es: "Email copiado", en: "Email copied" },
  cmdPlaceholder: { es: "Buscá una acción o sección…", en: "Search for an action or section…" },
  cmdEmpty: { es: "Sin resultados", en: "No results" },
  cmdNavigate: { es: "Navegar", en: "Navigate" },
  cmdActions: { es: "Acciones", en: "Actions" },
  cmdLinks: { es: "Links", en: "Links" },
  cmdTheme: { es: "Cambiar a modo", en: "Switch to" },
  light: { es: "claro", en: "light mode" },
  dark: { es: "oscuro", en: "dark mode" },
  switchLang: { es: "Switch to English", en: "Cambiar a español" },
} as const;

// ─── Carta de presentación ───
// Cada string de "body" es un párrafo. Editala libremente.
export const coverLetter: { greeting: T; body: Record<Lang, string[]>; closing: T } = {
  greeting: { es: "Estimado/a equipo de selección:", en: "Dear Hiring Team," },
  body: {
    es: [
      "Mi nombre es Matias Rosenblatt. Soy estudiante avanzado de Administración de Empresas y Marketing en UADE —me recibo en diciembre de 2026— y busco sumarme a un equipo de finanzas, análisis de negocios o control de gestión donde pueda aportar desde el análisis y la ejecución.",
      "Durante 16 meses formé parte del área de Financial Services de ExxonMobil, donde gestioné la información contable de activos fijos en SAP y validé datos críticos para el reporting financiero y los cierres mensuales, trabajando en inglés con equipos regionales e internacionales. Ahí aprendí cuánto depende una buena decisión de la calidad y la confiabilidad de la información.",
      "En paralelo co-fundé SupplyO, un marketplace B2B de packaging. Evalué la viabilidad económica del proyecto, diseñé su modelo de monetización, sumé más de 50 proveedores y desarrollé la plataforma completa apoyándome en agentes de IA. Esa experiencia me dio una mirada integral del negocio y la capacidad de construir herramientas que automatizan procesos y ahorran tiempo.",
      "Me considero una persona proactiva, analítica y con muchas ganas de aprender. Me encantaría conversar sobre cómo puedo sumar valor a su equipo. Muchas gracias por su tiempo.",
    ],
    en: [
      "My name is Matias Rosenblatt. I'm an advanced Business Administration and Marketing student at UADE—graduating in December 2026—and I'm looking to join a finance, business analysis or performance management team where I can contribute through analysis and execution.",
      "For 16 months I was part of ExxonMobil's Financial Services team, where I managed fixed asset accounting data in SAP and validated critical data for financial reporting and month-end close, working in English with regional and international teams. It taught me how much good decisions depend on reliable, high-quality information.",
      "At the same time, I co-founded SupplyO, a B2B packaging marketplace. I evaluated the venture's economics, designed its monetization model, onboarded 50+ suppliers and built the entire platform with the help of AI agents. That experience gave me an end-to-end view of the business and the ability to build tools that automate processes and save time.",
      "I'm proactive, analytical and eager to learn. I'd love to talk about how I can add value to your team. Thank you for your time.",
    ],
  },
  closing: { es: "Saludos cordiales,", en: "Best regards," },
};

export type Job = {
  role: T;
  org: string;
  // Descripción corta que aparece en un globo al pasar el mouse sobre la empresa.
  about?: T;
  url?: string;
  dates: T;
  context?: T;
  bullets: Record<Lang, string[]>;
};

export const experience: Job[] = [
  {
    role: { es: "Co-fundador", en: "Co-founder" },
    org: "SupplyO Network",
    about: {
      es: "Marketplace B2B que conecta a empresas compradoras con proveedores de packaging en Argentina, a través de pedidos de cotización y un modelo de créditos.",
      en: "B2B marketplace connecting buying companies with packaging suppliers in Argentina through quote requests and a credit-based model.",
    },
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
    about: {
      es: "Una de las mayores compañías de energía y química del mundo, con operaciones de exploración, producción, refinación y productos químicos.",
      en: "One of the world’s largest energy and chemical companies, with operations spanning exploration, production, refining and chemicals.",
    },
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
    about: {
      es: "Consultora legal y contable de Buenos Aires fundada en 2015, con más de 120 especialistas en servicios contables, impositivos, legales y de tecnología.",
      en: "Buenos Aires legal and accounting firm founded in 2015, with 120+ specialists in accounting, tax, legal and technology services.",
    },
    dates: { es: "Ago. 2022 – Dic. 2022", en: "Aug 2022 – Dec 2022" },
    bullets: {
      es: ["Registro de libros diarios y asientos contables; soporte en cierres contables."],
      en: ["Maintained general journals and accounting entries; supported month-end close."],
    },
  },
];

export const volunteering: Job[] = [
  {
    role: { es: "Advisor", en: "Advisor" },
    org: "BBYO",
    about: {
      es: "Movimiento juvenil judío pluralista líder a nivel mundial, con más de 700 grupos en más de 60 países, enfocado en liderazgo, servicio comunitario e identidad.",
      en: "The leading pluralistic Jewish teen movement, with 700+ chapters in 60+ countries, focused on leadership, community service and Jewish identity.",
    },
    dates: { es: "Abr. 2022 – Ago. 2024", en: "Apr 2022 – Aug 2024" },
    context: { es: "Movimiento juvenil internacional", en: "International youth movement" },
    bullets: {
      es: ["Liderazgo de grupos de trabajo, seguimiento de objetivos y coordinación con stakeholders."],
      en: ["Led work groups, tracked goals and coordinated with stakeholders."],
    },
  },
  {
    role: { es: "Educador no formal", en: "Non-formal Educator" },
    org: "Sociedad Hebraica Argentina",
    about: {
      es: "Institución cultural, deportiva y educativa de Buenos Aires fundada en 1926, con actividades de deporte, cultura y educación no formal para todas las edades.",
      en: "Cultural, sports and educational institution in Buenos Aires founded in 1926, offering sports, culture and non-formal education for all ages.",
    },
    dates: { es: "2019 – 2021", en: "2019 – 2021" },
    bullets: {
      es: [
        "Planificación y conducción de actividades educativas y recreativas para la comunidad.",
        "Trabajo en equipo en programas y eventos semanales.",
      ],
      en: [
        "Planned and led educational and recreational activities for the community.",
        "Worked as part of a team on weekly programs and events.",
      ],
    },
  },
  {
    role: { es: "Voluntario", en: "Volunteer" },
    org: "TECHO (Un Techo para mi País)",
    about: {
      es: "Organización latinoamericana fundada en Chile en 1997 que moviliza a jóvenes voluntarios junto a habitantes de asentamientos populares para superar la pobreza. Presente en 18 países.",
      en: "Latin American organization founded in Chile in 1997 that mobilizes young volunteers alongside residents of informal settlements to overcome poverty. Active in 18 countries.",
    },
    dates: { es: "2019", en: "2019" },
    bullets: {
      es: ["Colaboración en proyectos comunitarios."],
      en: ["Collaborated on community projects."],
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
    items: { es: ["SAP", "Excel", "PowerPoint"], en: ["SAP", "Excel", "PowerPoint"] },
  },
  {
    group: { es: "Datos y tecnología", en: "Data & tech" },
    items: {
      es: ["Supabase (PostgreSQL)", "TypeScript", "Next.js", "Agentes de IA", "Automatización"],
      en: ["Supabase (PostgreSQL)", "TypeScript", "Next.js", "AI agents", "Automation"],
    },
  },
];

// value: 0–100, solo para la barra visual.
export const languages: { name: T; level: T; value: number }[] = [
  { name: { es: "Español", en: "Spanish" }, level: { es: "Nativo", en: "Native" }, value: 100 },
  { name: { es: "Inglés", en: "English" }, level: { es: "C1/C2 · Cambridge", en: "C1/C2 · Cambridge" }, value: 92 },
  { name: { es: "Portugués", en: "Portuguese" }, level: { es: "B1", en: "B1" }, value: 55 },
  { name: { es: "Francés", en: "French" }, level: { es: "A2", en: "A2" }, value: 35 },
];

// icon: "growth" | "finance" | "sport" | "music" | "tech"
export const interests: { icon: string; title: T; text: T }[] = [
  {
    icon: "growth",
    title: { es: "Desarrollo personal", en: "Personal growth" },
    text: {
      es: "Me interesa aprender de forma continua: hábitos, liderazgo y cómo ser un poco mejor cada día.",
      en: "I'm into continuous learning: habits, leadership and getting a little better every day.",
    },
  },
  {
    icon: "finance",
    title: { es: "Finanzas e inversiones", en: "Finance & investing" },
    text: {
      es: "Me apasionan los mercados, las inversiones y entender cómo las empresas crean valor.",
      en: "I'm passionate about markets, investing and understanding how companies create value.",
    },
  },
  {
    icon: "sport",
    title: { es: "Deporte", en: "Sports" },
    text: {
      es: "El deporte me da disciplina, constancia y energía, y lo llevo a todo lo que hago.",
      en: "Sports give me discipline, consistency and energy that I bring to everything I do.",
    },
  },
  {
    icon: "music",
    title: { es: "Música", en: "Music" },
    text: {
      es: "La música me acompaña en el día a día y es una fuente constante de inspiración.",
      en: "Music is part of my everyday life and a constant source of inspiration.",
    },
  },
  {
    icon: "tech",
    title: { es: "Tecnología e IA", en: "Tech & AI" },
    text: {
      es: "Disfruto construir productos y automatizar procesos con IA; siempre estoy probando herramientas nuevas.",
      en: "I enjoy building products and automating processes with AI—always trying out new tools.",
    },
  },
];
