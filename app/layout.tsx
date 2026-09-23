import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Matias Rosenblatt — Finanzas y análisis de negocios",
  description:
    "CV de Matias Rosenblatt: finanzas corporativas (ExxonMobil), co-fundador de SupplyO, análisis de datos y automatización con IA.",
  openGraph: {
    title: "Matias Rosenblatt",
    description: "Finanzas y análisis de negocios · Datos · Automatización con IA",
    type: "profile",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
