import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz", "SOFT"],
  display: "swap",
});
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
