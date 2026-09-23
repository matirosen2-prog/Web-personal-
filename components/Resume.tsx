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
  interests,
  coverLetter,
} from "@/content/cv";
import { Icon } from "./Icons";
import { CommandPalette, type Command } from "./CommandPalette";

type Theme = "light" | "dark";
const LANG_KEY = "cv-lang";
const THEME_KEY = "cv-theme";
const NAV = ["about", "letter", "experience", "interests", "contact"] as const;

export default function Resume() {
  const [lang, setLang] = useState<Lang>("es");
  const [theme, setTheme] = useState<Theme>("light");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("");
  const [isMac, setIsMac] = useState(true);
  const t = useCallback((v: T) => v[lang], [lang]);

  // ── Preferencias iniciales ──
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

  // ── Tema con transición circular (View Transitions API) ──
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
    const x = origin?.x ?? window.innerWidth - 60;
    const y = origin?.y ?? 28;
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const vt = doc.startViewTransition(commit);
    vt.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 550, easing: "cubic-bezier(.4,0,.2,1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
  }, []);

  // ── Atajos de teclado ──
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

  // ── Barra de progreso de lectura ──
  useEffect(() => {
    const bar = document.getElementById("progress");
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
      if (bar) bar.style.transform = `scaleX(${p})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Animación al hacer scroll + sección activa en el menú ──
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

    const spy = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    document.querySelectorAll("main section[id]").forEach((s) => spy.observe(s));
    return () => {
      io.disconnect();
      spy.disconnect();
    };
  }, []);

  // ── Brillo que sigue al mouse en las tarjetas ──
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const card = (e.target as HTMLElement)?.closest?.(".spot") as HTMLElement | null;
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
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
    const list: Command[] = [
      { id: "about", group: nav, icon: "hash", label: t(labels.about), run: () => go("about") },
      { id: "letter", group: nav, icon: "hash", label: t(labels.letter), run: () => go("letter") },
      { id: "experience", group: nav, icon: "hash", label: t(labels.experience), run: () => go("experience") },
      { id: "projects", group: nav, icon: "hash", label: t(labels.projects), run: () => go("projects") },
      { id: "volunteering", group: nav, icon: "hash", label: t(labels.volunteering), run: () => go("volunteering") },
      { id: "education", group: nav, icon: "hash", label: t(labels.education), run: () => go("education") },
      { id: "skills", group: nav, icon: "hash", label: t(labels.skills), run: () => go("skills") },
      { id: "interests", group: nav, icon: "hash", label: t(labels.interests), run: () => go("interests") },
      { id: "contact", group: nav, icon: "hash", label: t(labels.contact), run: () => go("contact") },
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
      {
        id: "lang",
        group: act,
        icon: "globe",
        label: t(labels.switchLang),
        run: () => setLang(lang === "es" ? "en" : "es"),
      },
    ];
    if (profile.linkedin)
      list.push({ id: "li", group: lnk, icon: "linkedin", label: "LinkedIn", run: () => window.open(profile.linkedin, "_blank") });
    if (profile.instagram)
      list.push({ id: "ig", group: lnk, icon: "instagram", label: "Instagram", run: () => window.open(profile.instagram, "_blank") });
    projects.forEach((p) => {
      if (p.url) list.push({ id: "p-" + p.name, group: lnk, icon: "arrow", label: p.name, run: () => window.open(p.url, "_blank") });
    });
    return list;
  }, [t, theme, lang, applyTheme, copyEmail, copyLetter]);

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
      <button onClick={copyEmail} aria-label={t(labels.copyEmail)} title={t(labels.copyEmail)}>
        <Icon name="mail" />
      </button>
    </div>
  );

  const themeLabel = (th: Theme) =>
    th === "light" ? (lang === "es" ? "Modo claro" : "Light mode") : lang === "es" ? "Modo oscuro" : "Dark mode";

  return (
    <>
      <div id="progress" aria-hidden />
      <nav className="topbar">
        <div className="topbar-inner">
          <a href="#top" className="brand">
            <span className="brand-mark" aria-hidden>
              MR
            </span>
            <span className="brand-name">{profile.name}</span>
          </a>
          <div className="navlinks">
            {NAV.map((id) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? "active" : undefined}>
                {t(labels.nav[id])}
              </a>
            ))}
          </div>
          <div className="toggles">
            <button className="kbd-btn" onClick={() => setPaletteOpen(true)} aria-label="Command menu">
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
                <button key={l} aria-pressed={lang === l} onClick={() => setLang(l)}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main id="top" className="wrap">
        {/* ───────── Encabezado ───────── */}
        <header className="profile">
          <div className="profile-row">
            <div className="avatar">
              <Image src={profile.photo} alt={profile.name} width={337} height={421} priority />
            </div>
            <div className="profile-text">
              <h1>{profile.name}</h1>
              <p className="eyebrow">{t(profile.eyebrow)}</p>
              <p className="location">
                <Icon name="pin" /> {t(profile.location)}
              </p>
            </div>
          </div>
          <div className="profile-actions">
            {t(profile.status) && (
              <span className="status">
                <span className="dot" aria-hidden />
                {t(profile.status)}
              </span>
            )}
            <div className="profile-buttons">
              <a className="btn primary sm" href={t(profile.cv)} download>
                <Icon name="download" /> {t(labels.downloadCv)}
              </a>
              {socials}
            </div>
          </div>
        </header>

        <Section id="about" title={t(labels.about)}>
          <p className="lead">{t(profile.summary)}</p>
        </Section>

        <Section id="letter" title={t(labels.letter)}>
          <article className="letter spot">
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
          </article>
        </Section>

        <Section id="experience" title={t(labels.experience)}>
          <JobList items={experience} lang={lang} />
        </Section>

        {projects.length > 0 && (
          <Section id="projects" title={t(labels.projects)}>
            {projects.map((p) => (
              <a
                className="card project spot"
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
                  <span style={{ ["--w" as string]: `${l.value}%` }} />
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
              <div className="card interest spot" data-kind={i.icon} key={i.icon}>
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
          <div className="contact-glow" aria-hidden />
          <h2>
            {t(labels.contactTitle)}
          </h2>
          <p className="muted">{t(labels.contactText)}</p>
          <div className="hero-actions center">
            <a className="btn primary" href={`mailto:${profile.email}`}>
              <Icon name="mail" /> {profile.email}
            </a>
            <button className="btn" onClick={copyEmail}>
              <Icon name="copy" /> {t(labels.copyEmail)}
            </button>
          </div>
          <p className="hint">
            {lang === "es" ? "Tip: probá" : "Tip: try"} <kbd>{isMac ? "⌘" : "Ctrl"} K</kbd>
          </p>
        </section>

        <footer className="footer">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          {socials}
        </footer>
      </main>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        commands={commands}
        placeholder={t(labels.cmdPlaceholder)}
        empty={t(labels.cmdEmpty)}
      />

      <div className={`toast ${toast ? "show" : ""}`} role="status" aria-live="polite">
        <Icon name="check" /> {toast}
      </div>
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
    <div className="list timeline">
      {items.map((job) => (
        <div className="item" key={job.org + job.dates.en}>
          <div className="item-head">
            <div>
              <h3>{job.role[lang]}</h3>
              <p className="sub">
                <OrgName job={job} lang={lang} />
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

function OrgName({ job, lang }: { job: Job; lang: Lang }) {
  const name = job.url ? (
    <a href={job.url} target="_blank" rel="noopener noreferrer">
      {job.org}
    </a>
  ) : (
    job.org
  );
  if (!job.about) return name;
  return (
    <span className="org-tip" tabIndex={job.url ? -1 : 0}>
      <span className="org-name">{name}</span>
      <span className="bubble" role="tooltip">
        <strong>{job.org}</strong>
        {job.about[lang]}
      </span>
    </span>
  );
}
