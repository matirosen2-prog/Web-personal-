import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

// Dirección pública del sitio (Vercel la completa sola en producción).
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

const title = "Matias Rosenblatt — Finanzas y análisis de negocios";
const description =
  "Finanzas corporativas (ExxonMobil), co-fundador de SupplyO, análisis de datos y automatización con IA. Buenos Aires, Argentina.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "profile",
    locale: "es_AR",
    siteName: "Matias Rosenblatt",
  },
  twitter: { card: "summary_large_image", title, description },
};

// Aplica el tema guardado antes de pintar la página (evita el parpadeo).
const themeScript = `(function(){try{var t=localStorage.getItem('cv-theme');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t;}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
