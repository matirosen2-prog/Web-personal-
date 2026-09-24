import Link from "next/link";

export default function NotFound() {
  return (
    <main className="notfound">
      <p className="notfound-code">404</p>
      <h1>Página no encontrada · Page not found</h1>
      <p className="muted">El link que seguiste no existe o fue movido. · The link you followed doesn&apos;t exist.</p>
      <Link className="btn primary" href="/">
        ← Volver al inicio · Back home
      </Link>
    </main>
  );
}
