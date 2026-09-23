import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Imagen de vista previa (LinkedIn, WhatsApp, etc.)
export const alt = "Matias Rosenblatt — Finanzas y análisis de negocios";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const photo = await readFile(join(process.cwd(), "public", "matias.jpg"));
  const src = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "80px",
          background: "#0b0b10",
          color: "#ededf2",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            right: 0,
            height: 10,
            background: "linear-gradient(90deg, #6366f1, #a855f7, #06b6d4)",
          }}
        />
        <div
          style={{
            display: "flex",
            width: 300,
            height: 300,
            borderRadius: 300,
            padding: 8,
            background: "linear-gradient(135deg, #6366f1, #a855f7, #06b6d4)",
            flexShrink: 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            width={284}
            height={284}
            style={{ borderRadius: 284, objectFit: "cover", objectPosition: "50% 20%", border: "6px solid #0b0b10" }}
            alt=""
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginLeft: 64 }}>
          <div style={{ fontSize: 68, fontWeight: 700, letterSpacing: -2, lineHeight: 1.1 }}>Matias Rosenblatt</div>
          <div style={{ fontSize: 32, color: "#a0a0ab", marginTop: 16 }}>
            Finanzas · Análisis de negocios · Datos
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: 40 }}>
            {["ExxonMobil", "SupplyO", "UADE"].map((t) => (
              <div
                key={t}
                style={{
                  fontSize: 24,
                  padding: "8px 18px",
                  borderRadius: 999,
                  border: "1px solid #2b2b34",
                  background: "#15151c",
                  color: "#d4d4dc",
                }}
              >
                {t}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 24, color: "#66666f", marginTop: 40 }}>Buenos Aires, Argentina</div>
        </div>
      </div>
    ),
    size
  );
}
