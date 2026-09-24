"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { flushSync } from "react-dom";
import {
  type Lang,
  type Job,
  type T,
  profile,
  labels,
  experience,
  volunteering,
  projects,
  education,
  skills,
  languages,
  certifications,
  coverLetter,
} from "@/content/cv";
import { Icon } from "./Icons";
import { CommandPalette, type Command } from "./CommandPalette";

type Theme = "light" | "dark";
const LANG_KEY = "cv-lang";
const THEME_KEY = "cv-theme";
const NAV = ["about", "letter", "experience", "projects", "education", "skills", "contact"] as const;
type NavId = (typeof NAV)[number];

export default function Resume() {
  const [lang, setLang] = useState<Lang>("es");
  const [theme, setTheme] = useState<Theme>("light");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [active, setActive] = useState<NavId>("about");
  const [isMac, setIsMac] = useState(true);
  const [letterOpen, setLetterOpen] = useState(false);
  const [time, setTime] = useState<string>("");
  const t = useCallback((v: T) => v[lang], [lang]);

  // ── Preferencias iniciales (idioma y tema) ──
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
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {}
  }, [lang]);

  // ── Hora local de Buenos Aires ──
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat(lang === "es" ? "es-AR" : "en-US", {
        timeZone: "America/Argentina/Buenos_Aires",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date());
    setTime(fmt());
    const id = window.setInterval(() => setTime(fmt()), 30_000);
    return () => window.clearInterval(id);
  }, [lang]);

  // ── Cambio de tema con transición circular ──
  const applyTheme = useCallback((th: Theme, origin?: { x: number; y: number }) => {
    const commit = () => {
      flushSync(() => setTheme(th));
      document.documentElement.dataset.theme = th;
      try {
        localStorage.setItem(THEME_KEY, th);
      } catch {}
    };
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!doc.startViewTransition || reduce) return commit();
    const x = origin?.x ?? 40;
    const y = origin?.y ?? 40;
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const vt = doc.startViewTransition(commit);
    vt.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 550, easing: "cubic-bezier(.4,0,.2,1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
  }, []);

  // ── Atajo ⌘K / Ctrl K ──
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ── Animación de entrada + sección activa en el menú ──
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
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

    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.35;
      let current: NavId = "about";
      for (const id of NAV) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) current = "contact";
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // ── Luz que sigue al cursor (solo con mouse) ──
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const root = document.documentElement;
    const onMove = (e: PointerEvent) => {
      root.style.setProperty("--cx", `${e.clientX}px`);
      root.style.setProperty("--cy", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 1800);
  };

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      showToast(t(labels.copied));
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }, [t]);

  const copyLetter = useCallback(async () => {
    const text = [
      t(coverLetter.greeting),
      "",
      ...coverLetter.body[lang].flatMap((p) => [p, ""]),
      t(coverLetter.closing),
      profile.name,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      showToast(t(labels.letterCopied));
    } catch {}
  }, [t, lang]);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const commands: Command[] = useMemo(() => {
    const nav = t(labels.cmdNavigate);
    const act = t(labels.cmdActions);
    const lnk = t(labels.cmdLinks);
    const list: Command[] = NAV.map((id) => ({
      id,
      group: nav,
      icon: "hash",
      label: t(labels.nav[id]),
      run: () => {
        if (id === "letter") setLetterOpen(true);
        go(id);
      },
    }));
    list.push(
      {
        id: "cv",
        group: act,
        icon: "download",
        label: t(labels.downloadCv),
        run: () => {
          const a = document.createElement("a");
          a.href = t(profile.cv);
          a.download = "";
          a.click();
        },
      },
      { id: "copy", group: act, icon: "copy", label: t(labels.copyEmail), run: copyEmail },
      { id: "copyl", group: act, icon: "copy", label: t(labels.copyLetter), run: copyLetter },
      {
        id: "theme",
        group: act,
        icon: theme === "light" ? "moon" : "sun",
        label: `${t(labels.cmdTheme)} ${theme === "light" ? t(labels.dark) : t(labels.light)}`,
        run: () => applyTheme(theme === "light" ? "dark" : "light"),
      },
      { id: "lang", group: act, icon: "globe", label: t(labels.switchLang), run: () => setLang(lang === "es" ? "en" : "es") }
    );
    if (profile.whatsapp)
      list.push({ id: "wa", group: lnk, icon: "whatsapp", label: "WhatsApp", run: () => window.open(`https://wa.me/${profile.whatsapp}`, "_blank") });
    if (profile.linkedin)
      list.push({ id: "li", group: lnk, icon: "linkedin", label: "LinkedIn", run: () => window.open(profile.linkedin, "_blank") });
    if (profile.instagram)
      list.push({ id: "ig", group: lnk, icon: "instagram", label: "Instagram", run: () => window.open(profile.instagram, "_blank") });
    projects.forEach((p) => {
      if (p.url) list.push({ id: "p-" + p.name, group: lnk, icon: "arrow", label: p.name, run: () => window.open(p.url, "_blank") });
    });
    return list;
  }, [t, theme, lang, applyTheme, copyEmail, copyLetter]);

  const themeLabel = (th: Theme) =>
    th === "light" ? (lang === "es" ? "Modo claro" : "Light mode") : lang === "es" ? "Modo oscuro" : "Dark mode";

  const socials = (
    <ul className="socials" aria-label="Links">
      {profile.linkedin && (
        <li>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
            <Icon name="linkedin" />
          </a>
        </li>
      )}
      {profile.whatsapp && (
        <li>
          <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" title="WhatsApp">
            <Icon name="whatsapp" />
          </a>
        </li>
      )}
      {profile.instagram && (
        <li>
          <a href={profile.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram">
            <Icon name="instagram" />
          </a>
        </li>
      )}
      <li>
        <button onClick={copyEmail} aria-label={t(labels.copyEmail)} title={profile.email}>
          <Icon name="mail" />
        </button>
      </li>
    </ul>
  );

  const toggles = (
    <div className="toggles">
      <button className="kbd-btn" onClick={() => setPaletteOpen(true)} aria-label={t(labels.cmdPlaceholder)}>
        <Icon name="search" />
        <kbd>{isMac ? "⌘" : "Ctrl"} K</kbd>
      </button>
      <div className="seg" role="group" aria-label={lang === "es" ? "Tema" : "Theme"}>
        {(["light", "dark"] as Theme[]).map((th) => (
          <button
            key={th}
            aria-pressed={theme === th}
            onClick={(e) => theme !== th && applyTheme(th, { x: e.clientX, y: e.clientY })}
            aria-label={themeLabel(th)}
            title={themeLabel(th)}
          >
            <Icon name={th === "light" ? "sun" : "moon"} />
          </button>
        ))}
      </div>
      <div className="seg" role="group" aria-label="Idioma / Language">
        {(["es", "en"] as Lang[]).map((l) => (
          <button key={l} aria-pressed={lang === l} onClick={() => setLang(l)} lang={l}>
            {l.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <a href="#content" className="skip">
        {t(labels.skip)}
      </a>
      <div className="spotlight" aria-hidden />

      {/* Barra superior solo en celular */}
      <div className="mobilebar">{toggles}</div>

      <div className="layout">
        {/* ───────── Panel izquierdo ───────── */}
        <header className="side">
          <div className="side-top">
            <div className="side-tools">{toggles}</div>
            <div className="avatar">
              <Image src={profile.photo} alt={profile.name} width={337} height={421} priority sizes="72px" />
            </div>
            <h1>
              <a href="#top">{profile.name}</a>
            </h1>
            <p className="role">{t(profile.eyebrow)}</p>
            {t(profile.status) && (
              <p className="status">
                <span className="dot" aria-hidden />
                {t(profile.status)}
              </p>
            )}
            <nav className="nav" aria-label={lang === "es" ? "Secciones" : "Sections"}>
              <ul>
                {NAV.map((id) => (
                  <li key={id}>
                    <a href={`#${id}`} className={active === id ? "active" : undefined} aria-current={active === id ? "true" : undefined}>
                      <span className="nav-line" aria-hidden />
                      <span className="nav-text">{t(labels.nav[id])}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="side-bottom">
            <a className="btn primary sm" href={t(profile.cv)} download>
              <Icon name="download" /> {t(labels.downloadCv)}
            </a>
            {socials}
            <p className="meta">
              <Icon name="pin" /> {t(profile.location)}
              {time && (
                <>
                  <span className="sep" aria-hidden>·</span>
                  <span title={t(labels.localTime)}>{time}</span>
                </>
              )}
            </p>
          </div>
        </header>

        {/* ───────── Contenido ───────── */}
        <main id="content" className="content" tabIndex={-1}>
          <span id="top" />
          <Section id="about" title={t(labels.about)}>
            <p className="lead">{t(profile.summary)}</p>
          </Section>

          <Section id="letter" title={t(labels.letter)}>
            <article className={`letter ${letterOpen ? "open" : ""}`}>
              <button
                className="letter-toggle"
                onClick={() => setLetterOpen((o) => !o)}
                aria-expanded={letterOpen}
                aria-controls="letter-body"
              >
                <span className="letter-icon" aria-hidden>
                  <Icon name="mail" />
                </span>
                <span className="letter-head">
                  <strong>{t(labels.letter)}</strong>
                  <span>{t(labels.letterTeaser)}</span>
                </span>
                <span className="letter-cta">
                  {letterOpen ? t(labels.hideLetter) : t(labels.readLetter)}
                  <Icon name="chevron" />
                </span>
              </button>
              <div className="letter-collapse" id="letter-body">
                <div className="letter-inner" inert={!letterOpen}>
                  <div className="letter-content">
                    <p className="letter-greeting">{t(coverLetter.greeting)}</p>
                    {coverLetter.body[lang].map((para) => (
                      <p key={para}>{para}</p>
                    ))}
                    <div className="letter-sign">
                      <p>{t(coverLetter.closing)}</p>
                      <p className="signature">{profile.name}</p>
                    </div>
                    <div className="letter-actions">
                      <button className="btn sm" onClick={copyLetter}>
                        <Icon name="copy" /> {t(labels.copyLetter)}
                      </button>
                      <a className="btn sm" href={t(profile.cv)} download>
                        <Icon name="download" /> {t(labels.downloadCv)}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </Section>

          <Section id="experience" title={t(labels.experience)}>
            <JobList items={experience} lang={lang} />
            <a className="more-link" href={t(profile.cv)} target="_blank" rel="noopener noreferrer">
              {t(labels.viewCv)} <Icon name="arrow" />
            </a>
            <h3 className="subhead">{t(labels.volunteering)}</h3>
            <JobList items={volunteering} lang={lang} />
          </Section>

          <Section id="projects" title={t(labels.projects)}>
            <ol className="hover-list">
              {projects.map((p) => (
                <li key={p.name}>
                  <div className="card project">
                    {p.image && (
                      <div className="project-thumb">
                        <Image src={p.image} alt="" width={1200} height={750} sizes="(max-width: 1024px) 100vw, 200px" />
                      </div>
                    )}
                    <div className="card-body">
                      <h3>
                        {p.url ? (
                          <a className="stretch" href={p.url} target="_blank" rel="noopener noreferrer">
                            {p.name} <Icon name="arrow" />
                          </a>
                        ) : (
                          p.name
                        )}
                      </h3>
                      <p>{t(p.description)}</p>
                      <ul className="tags" aria-label="Stack">
                        {p.tags.map((tag) => (
                          <li className="tag" key={tag}>
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </Section>

          <Section id="education" title={t(labels.training)}>
            <ol className="plain-list">
              {education.map((e) => (
                <li className="row-item" key={e.org}>
                  <span className="date">{t(e.dates)}</span>
                  <div>
                    <h3>{t(e.title)}</h3>
                    <p className="sub">{e.org}</p>
                    <p className="muted small">{t(e.note)}</p>
                  </div>
                </li>
              ))}
            </ol>
            <h3 className="subhead">{t(labels.certifications)}</h3>
            <ol className="plain-list">
              {certifications.map((c) => (
                <li className="row-item" key={c.issuer + c.year + c.name.en}>
                  <span className="date">{c.year}</span>
                  <div className="cert">
                    <span className="cert-icon" aria-hidden>
                      <Icon name="award" />
                    </span>
                    <div>
                      <h3>
                        {c.url ? (
                          <a href={c.url} target="_blank" rel="noopener noreferrer">
                            {t(c.name)} <Icon name="arrow" />
                          </a>
                        ) : (
                          t(c.name)
                        )}
                      </h3>
                      <p className="sub muted">{c.issuer}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </Section>

          <Section id="skills" title={t(labels.skills)}>
            <div className="skills">
              {skills.map((s) => (
                <div className="skill-row" key={s.group.en}>
                  <h3 className="skill-title">{t(s.group)}</h3>
                  <ul className="tags">
                    {s.items[lang].map((i) => (
                      <li className="tag" key={i}>
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <h3 className="subhead">{t(labels.languages)}</h3>
            <ul className="langs">
              {languages.map((l) => (
                <li key={l.name.en}>
                  <span>{t(l.name)}</span>
                  <span className="bar" aria-hidden>
                    <span style={{ ["--w" as string]: `${l.value}%` }} />
                  </span>
                  <span className="level">{t(l.level)}</span>
                </li>
              ))}
            </ul>
          </Section>

          <section id="contact" className="contact reveal" aria-labelledby="contact-title">
            <h2 className="section-title">{t(labels.contact)}</h2>
            <p id="contact-title" className="contact-title">
              {t(labels.contactTitle)}
            </p>
            <p className="muted">{t(labels.contactText)}</p>
            <div className="contact-actions">
              <a className="btn primary" href={`mailto:${profile.email}`}>
                <Icon name="mail" /> {profile.email}
              </a>
              {profile.whatsapp && (
                <a className="btn" href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noopener noreferrer">
                  <Icon name="whatsapp" /> WhatsApp
                </a>
              )}
              <button className="btn" onClick={copyEmail}>
                <Icon name="copy" /> {t(labels.copyEmail)}
              </button>
            </div>
          </section>

          <footer className="footer">
            <p>{t(labels.footer)}</p>
            <p>
              © {new Date().getFullYear()} {profile.name}
            </p>
          </footer>
        </main>
      </div>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        commands={commands}
        placeholder={t(labels.cmdPlaceholder)}
        empty={t(labels.cmdEmpty)}
      />

      <div className={`toast ${toast ? "show" : ""}`} role="status" aria-live="polite">
        {toast && (
          <>
            <Icon name="check" /> {toast}
          </>
        )}
      </div>
    </>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="section reveal" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="section-title">
        {title}
      </h2>
      {children}
    </section>
  );
}

function JobList({ items, lang }: { items: Job[]; lang: Lang }) {
  return (
    <ol className="hover-list">
      {items.map((job) => (
        <li key={job.org + job.dates.en}>
          <div className="card job">
            <span className="date">{job.dates[lang]}</span>
            <div className="card-body">
              <h3>
                {job.role[lang]} <span className="at">·</span> <OrgName job={job} lang={lang} />
              </h3>
              {job.context && <p className="context">{job.context[lang]}</p>}
              <ul className="bullets">
                {job.bullets[lang].map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              {job.tags && (
                <ul className="tags">
                  {job.tags[lang].map((tag) => (
                    <li className="tag" key={tag}>
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

function OrgName({ job, lang }: { job: Job; lang: Lang }) {
  const name = job.url ? (
    <a href={job.url} target="_blank" rel="noopener noreferrer">
      {job.org}
    </a>
  ) : (
    job.org
  );
  if (!job.about) return <span className="org">{name}</span>;
  return (
    <span className="org org-tip" tabIndex={job.url ? undefined : 0}>
      <span className="org-name">{name}</span>
      <span className="bubble" role="tooltip">
        <strong>{job.org}</strong>
        {job.about[lang]}
      </span>
    </span>
  );
}
