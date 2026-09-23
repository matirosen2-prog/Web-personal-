"use client";

import { useEffect, useState } from "react";
import {
  type Lang,
  profile,
  labels,
  experience,
  projects,
  education,
  skills,
  languages,
} from "@/content/cv";

const STORAGE_KEY = "cv-lang";

export default function Resume() {
  const [lang, setLang] = useState<Lang>("es");

  // Idioma inicial: el guardado por el visitante o el de su navegador.
  useEffect(() => {
    let initial: Lang | null = null;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "es" || saved === "en") initial = saved;
    } catch {}
    if (!initial && !navigator.language.toLowerCase().startsWith("es")) initial = "en";
    if (initial) setLang(initial);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {}
  }, [lang]);

  const t = (v: Record<Lang, string>) => v[lang];

  return (
    <>
      <nav className="topbar">
        <span className="brand">MR</span>
        <div className="lang" role="group" aria-label="Idioma / Language">
          {(["es", "en"] as Lang[]).map((l) => (
            <button key={l} aria-pressed={lang === l} onClick={() => setLang(l)}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </nav>

      <main className="wrap">
        <header className="hero">
          <h1>{profile.name}</h1>
          <p className="headline">{t(profile.headline)}</p>
          <p className="muted">{t(profile.location)}</p>
          <div className="actions">
            <a className="btn primary" href={t(profile.cv)} download>
              {t(labels.downloadCv)}
            </a>
            <a className="btn" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            {profile.linkedin && (
              <a className="btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            )}
          </div>
        </header>

        <section>
          <h2>{t(labels.about)}</h2>
          <p className="lead">{t(profile.summary)}</p>
        </section>

        <section>
          <h2>{t(labels.experience)}</h2>
          <ol className="timeline">
            {experience.map((job) => (
              <li key={job.org + job.dates.en}>
                <div className="row">
                  <h3>
                    {t(job.role)} ·{" "}
                    {job.url ? (
                      <a href={job.url} target="_blank" rel="noopener noreferrer">
                        {job.org}
                      </a>
                    ) : (
                      job.org
                    )}
                  </h3>
                  <span className="date">{t(job.dates)}</span>
                </div>
                {job.context && <p className="muted small">{t(job.context)}</p>}
                <ul>
                  {job.bullets[lang].map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        {projects.length > 0 && (
          <section>
            <h2>{t(labels.projects)}</h2>
            <div className="cards">
              {projects.map((p) => (
                <article className="card" key={p.name}>
                  <h3>{p.name}</h3>
                  <p>{t(p.description)}</p>
                  <div className="tags">
                    {p.tags.map((tag) => (
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  {p.url && (
                    <a className="link" href={p.url} target="_blank" rel="noopener noreferrer">
                      {t(labels.visit)} →
                    </a>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2>{t(labels.education)}</h2>
          {education.map((e) => (
            <div className="edu" key={e.org}>
              <div className="row">
                <h3>
                  {t(e.title)} · {e.org}
                </h3>
                <span className="date">{t(e.dates)}</span>
              </div>
              <p className="muted small">{t(e.note)}</p>
            </div>
          ))}
        </section>

        <section className="grid2">
          <div>
            <h2>{t(labels.skills)}</h2>
            {skills.map((s) => (
              <div className="skillgroup" key={s.group.en}>
                <h4>{t(s.group)}</h4>
                <div className="tags">
                  {s.items[lang].map((i) => (
                    <span className="tag" key={i}>
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div>
            <h2>{t(labels.languages)}</h2>
            <ul className="plain">
              {languages.map((l) => (
                <li key={l.name.en}>
                  <strong>{t(l.name)}</strong> <span className="muted">— {t(l.level)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="contact">
          <h2>{t(labels.contact)}</h2>
          <p>{t(labels.contactText)}</p>
          <div className="social">
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11.25H3zM9.5 9.75h3.8v1.54h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-4.98c0-1.19-.02-2.72-1.66-2.72-1.66 0-1.91 1.3-1.91 2.63V21h-4z"/></svg>
              </a>
            )}
            {profile.instagram && (
              <a href={profile.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram">
                <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor"/></svg>
              </a>
            )}
          </div>
          <div className="actions">
            <a className="btn primary" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <a className="btn" href={t(profile.cv)} download>
              {t(labels.downloadCv)}
            </a>
          </div>
        </section>

        <footer className="muted small">© {new Date().getFullYear()} {profile.name}</footer>
      </main>
    </>
  );
}
