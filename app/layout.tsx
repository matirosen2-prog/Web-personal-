import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Matias Rosenblatt — Finanzas y análisis de negocios",
  description:
    "Matias Rosenblatt: finanzas corporativas (ExxonMobil), co-fundador de SupplyO, análisis de datos y automatización con IA.",
  openGraph: {
    title: "Matias Rosenblatt",
    description: "Finanzas · Análisis de negocios · Datos",
    type: "profile",
    images: ["/matias.jpg"],
  },
};

// Aplica el tema guardado antes de pintar la página (evita el parpadeo).
const themeScript = `(function(){try{var t=localStorage.getItem('cv-theme');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t;}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
