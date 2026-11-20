import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useExperience, useScrolled } from "@/hooks/use-experience";
import { studioContact } from "@/lib/content";
import type { ExperienceConfig } from "@/lib/experiences";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { setShown(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[1400ms] ease-[cubic-bezier(.2,.7,.1,1)] ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}>
      {children}
    </div>
  );
}

export function Logo({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Link to="/" aria-label="STELAARC home" className={`group flex items-center ${className}`}>
      <span className="flex flex-col leading-none transition-transform duration-700 group-hover:-translate-y-0.5">
        <span className="text-[15px] font-medium tracking-[0.42em] text-foreground">STELAARC</span>
        {!compact && <span className="mt-1.5 text-[8px] uppercase tracking-[0.38em] text-steel">Architecture in Steel</span>}
      </span>
    </Link>
  );
}

/** Text wordmark. `tone` = the background it sits on; omit to follow the current text colour (site theme / concept tokens). */
export function FullLogo({ className = "", tone }: { className?: string; tone?: "light" | "dark" }) {
  const color = tone === "dark" ? "text-[#f2eee6]" : tone === "light" ? "text-[#1c1c1c]" : "text-foreground";
  return (
    <span role="img" aria-label="STELAARC — Architecture in Steel" className={`flex flex-col justify-center leading-none ${color} ${className}`}>
      <span aria-hidden className="text-[1.6rem] font-medium tracking-[0.42em]">STELAARC</span>
      <span aria-hidden className="mt-2.5 text-[9px] uppercase tracking-[0.38em] opacity-60">Architecture in Steel</span>
    </span>
  );
}

function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => { setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light"); }, []);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    try { localStorage.setItem("stelaarc-theme", next); } catch { /* storage blocked — theme still applies for this visit */ }
    setTheme(next);
  };
  return { theme, toggle };
}

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";
  return (
    <button type="button" onClick={toggle} aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="group relative flex h-9 items-center gap-2 rounded-full border border-steel/30 px-1 text-foreground transition-colors hover:border-foreground/60">
      <span className={`flex h-7 w-7 items-center justify-center rounded-full transition-all duration-500 ${!dark ? "bg-foreground text-background" : "text-steel"}`} aria-hidden>
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
      </span>
      <span className={`flex h-7 w-7 items-center justify-center rounded-full transition-all duration-500 ${dark ? "bg-foreground text-background" : "text-steel"}`} aria-hidden>
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
      </span>
    </button>
  );
}

export const navItems = [
  { to: "/studio", label: "Studio" },
  { to: "/spaces", label: "Spaces" },
  { to: "/craft", label: "Craft" },
  { to: "/enquire", label: "Enquire" },
] as const;

function MenuButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button type="button" className="md:hidden flex h-9 w-9 flex-col items-center justify-center gap-1.5 text-foreground" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={onClick}>
      <span className={`block h-px w-6 bg-current transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
      <span className={`block h-px w-6 bg-current transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
    </button>
  );
}

function MobileMenu({ display = "font-display" }: { display?: string }) {
  return (
    <nav aria-label="Mobile" className="md:hidden flex flex-col gap-2 px-6 pb-10 pt-4">
      {navItems.map((n, i) => (
        <Link key={n.to} to={n.to} className={`rise ${display} text-4xl py-2 border-b border-steel/15`} style={{ animationDelay: `${i * 60}ms` }}>{n.label}</Link>
      ))}
    </nav>
  );
}

export function SiteHeader() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { full, config } = useExperience();
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path, config.id, full]);
  const overHero = path === "/" && !scrolled && !open;
  if (full) return <ExperienceHeader config={config} overHero={overHero} scrolled={scrolled} open={open} toggle={() => setOpen(!open)} />;
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${overHero ? "dark bg-transparent" : "bg-background/85 backdrop-blur-xl border-b border-steel/15"}`}>
      <div className={`flex items-center justify-between px-6 md:px-12 transition-all duration-700 ${scrolled ? "py-4" : "py-6"}`}>
        <Logo />
        <nav className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.3em] text-foreground/75">
          {navItems.map((n) => (
            <Link key={n.to} to={n.to} className="link-line hover:text-foreground" activeProps={{ className: "text-foreground link-active" }}>{n.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <MenuButton open={open} onClick={() => setOpen(!open)} />
        </div>
      </div>
      {open && <MobileMenu />}
    </header>
  );
}

const pageLinks = navItems.filter((n) => n.to !== "/enquire");

/** Concept-specific navigation (Full Experience mode on "/"). Same links and behaviour, different art direction. */
function ExperienceHeader({ config, overHero, scrolled, open, toggle }: { config: ExperienceConfig; overHero: boolean; scrolled: boolean; open: boolean; toggle: () => void }) {
  const nav = config.nav;
  const solid = !overHero;
  // Light concepts flip to the dark palette while transparent over the (always dark) hero.
  const tone = overHero && config.tone === "light" ? "dark" : "";
  const skin = {
    minimal: solid ? "bg-background/92 backdrop-blur-md border-b border-foreground/10" : "bg-transparent border-b border-foreground/10",
    cinematic: solid ? "bg-background/80 backdrop-blur-xl border-b border-steel/15" : "bg-transparent",
    masthead: solid ? "bg-background border-b-2 border-foreground" : "bg-transparent",
    floating: `rounded-[28px] border border-foreground/15 backdrop-blur-xl shadow-[0_20px_60px_-25px_rgb(0_0_0/0.8)] ${solid ? "bg-background/85" : "bg-background/30"}`,
  }[nav];
  const pos = nav === "floating" ? "top-3 md:top-5 inset-x-3 md:inset-x-0 md:mx-auto md:max-w-4xl" : "inset-x-0 top-0";
  const linkCls = "link-line text-foreground/75 hover:text-foreground";
  const active = { className: "text-foreground link-active" };
  const py = scrolled ? "py-3.5" : "py-5 md:py-6";
  return (
    <header className={`fixed z-50 text-foreground transition-[background-color,border-color,padding] duration-700 ${pos} ${config.className} ${tone} ${skin}`}>
      {nav === "masthead" ? (
        <div className={`grid grid-cols-[1fr_auto_1fr] items-center px-5 md:px-10 transition-all duration-700 ${py}`}>
          <nav aria-label="Primary" className="hidden md:flex gap-8 text-[11px] font-medium uppercase tracking-[0.2em]">
            {pageLinks.map((n, i) => <Link key={n.to} to={n.to} className={linkCls} activeProps={active}><span className="mr-2 text-steel tabular-nums">0{i + 1}</span>{n.label}</Link>)}
          </nav>
          <Logo className="col-start-2" />
          <div className="col-start-3 flex justify-end items-center gap-4">
            <Link to="/enquire" className="hidden md:inline-flex items-center gap-2 border-b-2 border-current pb-0.5 text-[11px] font-medium uppercase tracking-[0.2em]">Enquire <span aria-hidden>→</span></Link>
            <MenuButton open={open} onClick={toggle} />
          </div>
        </div>
      ) : (
        <div className={`flex items-center justify-between transition-all duration-700 ${nav === "floating" ? "pl-4 pr-2 md:pl-5 py-2" : `px-6 md:px-12 ${nav === "minimal" ? "lg:px-20" : ""} ${py}`}`}>
          <Logo compact={nav === "floating"} />
          <nav aria-label="Primary" className={`hidden md:flex items-center text-[11px] uppercase ${nav === "cinematic" ? "gap-10 tracking-[0.3em]" : nav === "minimal" ? "gap-9 tracking-[0.24em] font-light" : "gap-7 tracking-[0.26em]"}`}>
            {(nav === "cinematic" ? navItems : pageLinks).map((n) => <Link key={n.to} to={n.to} className={linkCls} activeProps={active}>{n.label}</Link>)}
            {nav === "minimal" && <Link to="/enquire" className="border border-foreground/30 px-4 py-2 transition-colors hover:bg-foreground hover:text-background">Enquire</Link>}
            {nav === "floating" && <Link to="/enquire" className="rounded-full bg-exp-accent px-5 py-2.5 text-background transition-colors hover:bg-foreground">Enquire</Link>}
          </nav>
          <MenuButton open={open} onClick={toggle} />
        </div>
      )}
      {open && <MobileMenu display="font-exp" />}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-steel/15 px-6 md:px-12 pt-20 pb-10">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5"><FullLogo className="h-20 w-auto" /></div>
        <div className="md:col-span-3">
          <p className="eyebrow">Explore</p>
          <ul className="mt-6 space-y-3 text-sm">
            {navItems.map((n) => <li key={n.to}><Link to={n.to} className="link-line">{n.label}</Link></li>)}
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="eyebrow">Studio</p>
          <p className="mt-6 text-sm text-foreground/70 leading-relaxed">{studioContact.city}<br />{studioContact.showroom}<br />{studioContact.person}<br /><a href={`tel:${studioContact.tel}`} className="link-line">{studioContact.phone}</a><br /><a href={`mailto:${studioContact.email}`} className="link-line">{studioContact.email}</a></p>
        </div>
      </div>
      <div className="mt-20 flex flex-col md:flex-row justify-between gap-3 text-[10px] uppercase tracking-[0.3em] text-steel">
        <span>© STELAARC</span><span>Design · Manufacturing · Installation</span>
      </div>
    </footer>
  );
}

/** Gradient hand-off placed directly after a dark hero. */
export function Seam() {
  return <div aria-hidden className="seam" />;
}

export function PageHero({ eyebrow, title, accent, intro, image }: { eyebrow: string; title: string; accent: string; intro: string; image: string }) {
  return (
    <>
    <section className="dark relative min-h-[78svh] overflow-hidden bg-background text-foreground flex items-end">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover hero-zoom" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/30" />
      <div className="grain absolute inset-0 pointer-events-none" />
      <div className="relative z-10 px-6 md:px-12 pb-20 pt-40 max-w-5xl">
        <p className="rise eyebrow" style={{ animationDelay: "300ms" }}>{eyebrow}</p>
        <h1 className="font-display mt-6 text-6xl md:text-8xl leading-[0.95]">
          <span className="mask"><span className="mask-inner" style={{ animationDelay: "500ms" }}>{title}</span></span>
          <span className="mask"><span className="mask-inner italic text-steel-light" style={{ animationDelay: "700ms" }}>{accent}</span></span>
        </h1>
        <p className="rise mt-8 max-w-xl text-lg font-light text-foreground/75" style={{ animationDelay: "1000ms" }}>{intro}</p>
      </div>
    </section>
    <Seam />
    </>
  );
}

export function CtaBand() {
  return (
    <section className="px-6 md:px-12 py-28 md:py-40 text-center">
      <Reveal><h2 className="font-display text-5xl md:text-7xl leading-[0.95]">Let's build something <span className="italic text-steel">considered.</span></h2></Reveal>
      <Reveal delay={150}><div className="mt-12 flex justify-center"><Link to="/enquire" className="btn-primary">Start a Project <span aria-hidden>→</span></Link></div></Reveal>
    </section>
  );
}

export const meta = (t: string, d: string) => [
  { title: t }, { name: "description", content: d },
  { property: "og:title", content: t }, { property: "og:description", content: d },
  { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
];
