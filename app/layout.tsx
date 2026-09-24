import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { profile, education, languages } from "@/content/cv";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const title = "Matias Rosenblatt — Finanzas y análisis de negocios";
const description =
  "Finanzas corporativas (ExxonMobil), co-fundador de SupplyO, análisis de datos y automatización con IA. Buenos Aires, Argentina.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.url),
  title,
  description,
  applicationName: "Matias Rosenblatt",
  authors: [{ name: profile.name, url: profile.url }],
  keywords: ["Matias Rosenblatt", "finanzas", "análisis de negocios", "control de gestión", "ExxonMobil", "SupplyO", "UADE", "Buenos Aires"],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    url: "/",
    type: "profile",
    locale: "es_AR",
    alternateLocale: ["en_US"],
    siteName: "Matias Rosenblatt",
    firstName: "Matias",
    lastName: "Rosenblatt",
  },
  twitter: { card: "summary_large_image", title, description },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090c" },
  ],
};

// Datos estructurados (schema.org) para que Google entienda quién sos.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: profile.url,
  image: `${profile.url}${profile.photo}`,
  email: `mailto:${profile.email}`,
  jobTitle: "Co-founder",
  worksFor: { "@type": "Organization", name: "SupplyO Network", url: "https://supplyonetwork.com" },
  alumniOf: education.map((e) => ({ "@type": "CollegeOrUniversity", name: e.org })),
  address: { "@type": "PostalAddress", addressLocality: "Buenos Aires", addressCountry: "AR" },
  knowsLanguage: languages.map((l) => l.name.en),
  knowsAbout: ["Finance", "Financial reporting", "Business analysis", "SAP", "Data analysis", "AI automation"],
  sameAs: [profile.linkedin, profile.instagram].filter(Boolean),
};

// Aplica el tema guardado antes de pintar la página (evita el parpadeo).
const themeScript = `(function(){try{var t=localStorage.getItem('cv-theme');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t;}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
