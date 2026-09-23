"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  type Lang,
  type Job,
  type T,
  profile,
  stats,
  labels,
  experience,
  volunteering,
  projects,
  education,
  skills,
  languages,
  interests,
} from "@/content/cv";
import { Icon } from "./Icons";

const STORAGE_KEY = "cv-lang";

export default function Resume() {
  const [lang, setLang] = useState<Lang>("es");
  const t = (v: T) => v[lang];

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

  // Animación suave al hacer scroll.
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const socials = (
    <div className="socials">
      {profile.linkedin && (
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
          <Icon name="linkedin" />
        </a>
      )}
      {profile.instagram && (
        <a href={profile.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram">
          <Icon name="instagram" />
        </a>
      )}
      <a href={`mailto:${profile.email}`} aria-label="Email" title={profile.email}>
        <Icon name="mail" />
      </a>
    </div>
  );

  return (
    <>
      <nav className="topbar">
        <a href="#top" className="brand" aria-label={profile.name}>
          M<span>R</span>
        </a>
        <div className="navlinks">
          <a href="#about">{t(labels.nav.about)}</a>
          <a href="#experience">{t(labels.nav.experience)}</a>
          <a href="#interests">{t(labels.nav.interests)}</a>
          <a href="#contact">{t(labels.nav.contact)}</a>
        </div>
        <div className="lang" role="group" aria-label="Idioma / Language">
          {(["es", "en"] as Lang[]).map((l) => (
            <button key={l} aria-pressed={lang === l} onClick={() => setLang(l)}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </nav>

      <main id="top">
        {/* ───────── Hero ───────── */}
        <header className="hero wrap">
          <div className="hero-text">
            <p className="eyebrow">{t(profile.eyebrow)}</p>
            <h1>
              Matias
              <br />
              <em>Rosenblatt</em>
            </h1>
            <p className="tagline">{t(profile.tagline)}</p>
            <div className="actions">
              <a className="btn primary" href={t(profile.cv)} download>
                <Icon name="download" /> {t(labels.downloadCv)}
              </a>
              <a className="btn ghost" href="#contact">
                {t(labels.writeMe)} <span aria-hidden>→</span>
              </a>
            </div>
            <div className="hero-meta">
              <span>
                <Icon name="pin" /> {t(profile.location)}
              </span>
              {socials}
            </div>
          </div>
          <div className="portrait">
            <div className="portrait-frame">
              <Image src={profile.photo} alt={profile.name} width={337} height={421} priority />
            </div>
          </div>
        </header>

        {/* ───────── Stats ───────── */}
        <div className="wrap">
          <dl className="stats reveal">
            {stats.map((s) => (
              <div key={s.value + s.label.en}>
                <dt>{s.value}</dt>
                <dd>{t(s.label)}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ───────── Sobre mí ───────── */}
        <Section id="about" n="01" title={t(labels.about)}>
          <p className="lead">{t(profile.summary)}</p>
        </Section>

        {/* ───────── Experiencia ───────── */}
        <Section id="experience" n="02" title={t(labels.experience)}>
          <Timeline items={experience} lang={lang} />
        </Section>

        {/* ───────── Proyectos ───────── */}
        {projects.length > 0 && (
          <Section id="projects" n="03" title={t(labels.projects)}>
            <div className="cards">
              {projects.map((p) => (
                <article className="card project" key={p.name}>
                  <div className="card-head">
                    <h3>{p.name}</h3>
                    {p.url && (
                      <a className="link" href={p.url} target="_blank" rel="noopener noreferrer">
                        {t(labels.visit)} ↗
                      </a>
                    )}
                  </div>
                  <p>{t(p.description)}</p>
                  <div className="tags">
                    {p.tags.map((tag) => (
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </Section>
        )}

        {/* ───────── Voluntariado ───────── */}
        <Section id="volunteering" n="04" title={t(labels.volunteering)}>
          <Timeline items={volunteering} lang={lang} />
        </Section>

        {/* ───────── Educación ───────── */}
        <Section id="education" n="05" title={t(labels.education)}>
          {education.map((e) => (
            <div className="edu" key={e.org}>
              <div className="row">
                <h3>{t(e.title)}</h3>
                <span className="date">{t(e.dates)}</span>
              </div>
              <p className="org">{e.org}</p>
              <p className="muted small">{t(e.note)}</p>
            </div>
          ))}
        </Section>

        {/* ───────── Habilidades e idiomas ───────── */}
        <Section id="skills" n="06" title={t(labels.skills)}>
          <div className="skills-grid">
            <div>
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
              <h4>{t(labels.languages)}</h4>
              <ul className="langs">
                {languages.map((l) => (
                  <li key={l.name.en}>
                    <div className="row">
                      <span>{t(l.name)}</span>
                      <span className="muted small">{t(l.level)}</span>
                    </div>
                    <div className="bar">
                      <span style={{ width: `${l.value}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* ───────── Intereses ───────── */}
        <Section id="interests" n="07" title={t(labels.interests)}>
          <p className="lead small-lead">{t(labels.interestsIntro)}</p>
          <div className="interests">
            {interests.map((i) => (
              <article className="card interest" key={i.icon}>
                <span className="interest-icon">
                  <Icon name={i.icon} />
                </span>
                <h3>{t(i.title)}</h3>
                <p>{t(i.text)}</p>
              </article>
            ))}
          </div>
        </Section>

        {/* ───────── Contacto ───────── */}
        <section id="contact" className="contact reveal">
          <div className="wrap">
            <p className="eyebrow">{t(labels.contact)}</p>
            <h2 className="contact-title">{t(labels.contactTitle)}</h2>
            <p className="contact-text">{t(labels.contactText)}</p>
            <div className="actions">
              <a className="btn primary" href={`mailto:${profile.email}`}>
                <Icon name="mail" /> {profile.email}
              </a>
              <a className="btn ghost" href={t(profile.cv)} download>
                <Icon name="download" /> {t(labels.downloadCv)}
              </a>
            </div>
            {socials}
          </div>
        </section>

        <footer className="wrap footer">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>{t(profile.location)}</span>
        </footer>
      </main>
    </>
  );
}

function Section({ id, n, title, children }: { id: string; n: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="section wrap reveal">
      <div className="section-label">
        <span className="num">{n}</span>
        <h2>{title}</h2>
      </div>
      <div className="section-body">{children}</div>
    </section>
  );
}

function Timeline({ items, lang }: { items: Job[]; lang: Lang }) {
  return (
    <ol className="timeline">
      {items.map((job) => (
        <li key={job.org + job.dates.en}>
          <div className="row">
            <h3>{job.role[lang]}</h3>
            <span className="date">{job.dates[lang]}</span>
          </div>
          <p className="org">
            {job.url ? (
              <a href={job.url} target="_blank" rel="noopener noreferrer">
                {job.org} ↗
              </a>
            ) : (
              job.org
            )}
            {job.context && <span className="muted"> · {job.context[lang]}</span>}
          </p>
          <ul>
            {job.bullets[lang].map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
