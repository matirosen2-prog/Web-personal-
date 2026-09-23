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

type Theme = "light" | "dark";
const LANG_KEY = "cv-lang";
const THEME_KEY = "cv-theme";

export default function Resume() {
  const [lang, setLang] = useState<Lang>("es");
  const [theme, setTheme] = useState<Theme>("light");
  const t = (v: T) => v[lang];

  // Idioma y tema iniciales: lo guardado por el visitante o lo de su sistema.
  useEffect(() => {
    let l: Lang | null = null;
    let th: Theme | null = null;
    try {
      const sl = localStorage.getItem(LANG_KEY);
      if (sl === "es" || sl === "en") l = sl;
      const st = localStorage.getItem(THEME_KEY);
      if (st === "light" || st === "dark") th = st;
    } catch {}
    if (!l && !navigator.language.toLowerCase().startsWith("es")) l = "en";
    if (!th) th = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    if (l) setLang(l);
    setTheme(th);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {}
  }, [lang]);

  const chooseTheme = (th: Theme) => {
    setTheme(th);
    document.documentElement.dataset.theme = th;
    try {
      localStorage.setItem(THEME_KEY, th);
    } catch {}
  };

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
      { rootMargin: "0px 0px -5% 0px" }
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
        <div className="topbar-inner">
          <a href="#top" className="brand">
            {profile.name}
          </a>
          <div className="navlinks">
            <a href="#about">{t(labels.nav.about)}</a>
            <a href="#experience">{t(labels.nav.experience)}</a>
            <a href="#interests">{t(labels.nav.interests)}</a>
            <a href="#contact">{t(labels.nav.contact)}</a>
          </div>
          <div className="toggles">
            <div className="seg" role="group" aria-label={lang === "es" ? "Tema" : "Theme"}>
              {(["light", "dark"] as Theme[]).map((th) => (
                <button
                  key={th}
                  aria-pressed={theme === th}
                  onClick={() => chooseTheme(th)}
                  aria-label={th === "light" ? (lang === "es" ? "Modo claro" : "Light mode") : lang === "es" ? "Modo oscuro" : "Dark mode"}
                  title={th === "light" ? (lang === "es" ? "Modo claro" : "Light mode") : lang === "es" ? "Modo oscuro" : "Dark mode"}
                >
                  <Icon name={th === "light" ? "sun" : "moon"} />
                </button>
              ))}
            </div>
            <div className="seg" role="group" aria-label="Idioma / Language">
              {(["es", "en"] as Lang[]).map((l) => (
                <button key={l} aria-pressed={lang === l} onClick={() => setLang(l)}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main id="top" className="wrap">
        {/* ───────── Hero ───────── */}
        <header className="hero">
          <div className="avatar">
            <Image src={profile.photo} alt={profile.name} width={337} height={421} priority />
          </div>
          <div className="hero-text">
            <h1>{profile.name}</h1>
            <p className="eyebrow">{t(profile.eyebrow)}</p>
          </div>
          <p className="tagline">{t(profile.tagline)}</p>
          <div className="hero-actions">
            <a className="btn primary" href={t(profile.cv)} download>
              <Icon name="download" /> {t(labels.downloadCv)}
            </a>
            <a className="btn" href="#contact">
              {t(labels.writeMe)}
            </a>
            <span className="divider" aria-hidden />
            {socials}
          </div>
          <p className="location">
            <Icon name="pin" /> {t(profile.location)}
          </p>
        </header>

        {/* ───────── Stats ───────── */}
        <dl className="stats reveal">
          {stats.map((s) => (
            <div key={s.value + s.label.en}>
              <dt>{s.value}</dt>
              <dd>{t(s.label)}</dd>
            </div>
          ))}
        </dl>

        <Section id="about" title={t(labels.about)}>
          <p className="lead">{t(profile.summary)}</p>
        </Section>

        <Section id="experience" title={t(labels.experience)}>
          <JobList items={experience} lang={lang} />
        </Section>

        {projects.length > 0 && (
          <Section id="projects" title={t(labels.projects)}>
            {projects.map((p) => (
              <a
                className="card project"
                key={p.name}
                href={p.url}
                target={p.url ? "_blank" : undefined}
                rel="noopener noreferrer"
              >
                <div className="card-head">
                  <h3>{p.name}</h3>
                  {p.url && <Icon name="arrow" />}
                </div>
                <p>{t(p.description)}</p>
                <div className="tags">
                  {p.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </Section>
        )}

        <Section id="volunteering" title={t(labels.volunteering)}>
          <JobList items={volunteering} lang={lang} />
        </Section>

        <Section id="education" title={t(labels.education)}>
          <div className="list">
            {education.map((e) => (
              <div className="item" key={e.org}>
                <div className="item-head">
                  <div>
                    <h3>{t(e.title)}</h3>
                    <p className="sub">{e.org}</p>
                  </div>
                  <span className="date">{t(e.dates)}</span>
                </div>
                <p className="muted small">{t(e.note)}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="skills" title={t(labels.skills)}>
          <div className="skills">
            {skills.map((s) => (
              <div className="skill-row" key={s.group.en}>
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
        </Section>

        <Section id="languages" title={t(labels.languages)}>
          <ul className="langs">
            {languages.map((l) => (
              <li key={l.name.en}>
                <span>{t(l.name)}</span>
                <span className="bar" aria-hidden>
                  <span style={{ width: `${l.value}%` }} />
                </span>
                <span className="level">{t(l.level)}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="interests" title={t(labels.interests)}>
          <p className="muted intro">{t(labels.interestsIntro)}</p>
          <div className="interests">
            {interests.map((i) => (
              <div className="card interest" key={i.icon}>
                <span className="interest-icon">
                  <Icon name={i.icon} />
                </span>
                <div>
                  <h3>{t(i.title)}</h3>
                  <p>{t(i.text)}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <section id="contact" className="contact reveal">
          <h2>{t(labels.contactTitle)}</h2>
          <p className="muted">{t(labels.contactText)}</p>
          <div className="hero-actions center">
            <a className="btn primary" href={`mailto:${profile.email}`}>
              <Icon name="mail" /> {profile.email}
            </a>
            <a className="btn" href={t(profile.cv)} download>
              <Icon name="download" /> {t(labels.downloadCv)}
            </a>
          </div>
        </section>

        <footer className="footer">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          {socials}
        </footer>
      </main>
    </>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="section reveal">
      <h2 className="section-title">{title}</h2>
      <div className="section-body">{children}</div>
    </section>
  );
}

function JobList({ items, lang }: { items: Job[]; lang: Lang }) {
  return (
    <div className="list">
      {items.map((job) => (
        <div className="item" key={job.org + job.dates.en}>
          <div className="item-head">
            <div>
              <h3>{job.role[lang]}</h3>
              <p className="sub">
                {job.url ? (
                  <a href={job.url} target="_blank" rel="noopener noreferrer">
                    {job.org}
                  </a>
                ) : (
                  job.org
                )}
                {job.context && <span className="muted"> · {job.context[lang]}</span>}
              </p>
            </div>
            <span className="date">{job.dates[lang]}</span>
          </div>
          <ul className="bullets">
            {job.bullets[lang].map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
