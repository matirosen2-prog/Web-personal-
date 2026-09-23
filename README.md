# CV web — Matias Rosenblatt

Sitio personal (Next.js + TypeScript), bilingüe ES/EN, sin dependencias extra.

## Editar el contenido
Todo el texto está en **`content/cv.ts`**. Ahí también:
- `linkedin`: pegá tu URL para que aparezca el botón.
- `projects`: sumá nuevos proyectos (ej. un dashboard de Power BI).

Los PDFs descargables están en `public/`. Si actualizás el CV, reemplazalos con el mismo nombre.

## Correr en local
```bash
npm install
npm run dev   # http://localhost:3000
```

## Publicar (gratis, ~5 min)
1. Creá un repo **nuevo** en GitHub (ej. `matias-cv`), separado del de SupplyO:
   ```bash
   git init && git add . && git commit -m "CV web"
   git branch -M main
   git remote add origin https://github.com/<tu-usuario>/matias-cv.git
   git push -u origin main
   ```
2. En vercel.com → **Add New → Project** → importá ese repo → Deploy.
3. (Opcional) Dominio propio: compralo (ej. `matiasrosenblatt.com`) y agregalo en
   **Project → Settings → Domains**.
