/**
 * The four original hero concepts. Visual design is unchanged from the original routes;
 * motion now writes styles through refs inside rAF instead of re-rendering React on
 * every scroll / mouse frame, and pauses when the hero is off-screen.
 */
import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import hero from "@/assets/hero.jpg";
import wardrobe from "@/assets/wardrobe.jpg";
import factory from "@/assets/factory.jpg";
import heroFilm from "@/assets/hero-film.mp4";
import { Ctas, ScrollCue } from "@/components/HeroCopy";
import { prefersReducedMotion } from "@/hooks/use-experience";
import { heroCopy } from "@/lib/content";
import type { ExperienceId } from "@/lib/experiences";

/* ── 02 · Film (original main hero) ─────────────────────────────────────────── */
export function FilmHero() {
  const section = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (prefersReducedMotion()) { video.current?.pause(); return; }
    let raf = 0, mx = 0, my = 0;
    const apply = () => {
      raf = 0;
      const y = window.scrollY;
      if (y > window.innerHeight * 1.2 || !media.current || !copy.current) return;
      media.current.style.transform = `translate3d(${mx * -18}px, ${y * 0.35 + my * -12}px, 0)`;
      copy.current.style.transform = `translateY(${y * -0.15}px)`;
      copy.current.style.opacity = String(Math.max(0, 1 - y / 600));
    };
    const req = () => { if (!raf) raf = requestAnimationFrame(apply); };
    const move = (e: MouseEvent) => { mx = e.clientX / window.innerWidth - 0.5; my = e.clientY / window.innerHeight - 0.5; req(); };
    const el = section.current;
    window.addEventListener("scroll", req, { passive: true });
    el?.addEventListener("mousemove", move);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", req); el?.removeEventListener("mousemove", move); };
  }, []);
  return (
    <section ref={section} className="dark relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-background text-foreground">
      <div ref={media} className="absolute inset-0 hero-reveal will-change-transform">
        <video ref={video} src={heroFilm} poster={hero} autoPlay muted loop playsInline preload="auto" aria-label="Slow cinematic walk through a dark steel kitchen" className="h-[115%] w-[110%] -ml-[5%] object-cover hero-zoom" />
      </div>
      <div className="absolute inset-0 light-sweep pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/30 to-transparent" />
      <div className="grain absolute inset-0 pointer-events-none" />
      <div className="absolute inset-0 hidden md:grid grid-cols-4 pointer-events-none">
        {[0, 1, 2, 3].map((i) => <div key={i} className="border-l border-steel/10 line-grow" style={{ animationDelay: `${600 + i * 150}ms` }} />)}
      </div>
      <div ref={copy} className="relative z-10 flex h-full flex-col justify-end px-6 md:px-12 pb-24 md:pb-28">
        <p className="rise text-[10px] md:text-xs uppercase tracking-[0.45em] text-steel" style={{ animationDelay: "900ms" }}>
          <span className="inline-block w-10 h-px bg-steel align-middle mr-4" />{heroCopy.eyebrow}
        </p>
        <h1 className="font-display mt-6 text-[15vw] md:text-[8.5vw] leading-[0.9] tracking-tight">
          <span className="mask"><span className="mask-inner" style={{ animationDelay: "1100ms" }}>{heroCopy.lines[0]}</span></span>
          <span className="mask"><span className="mask-inner italic text-steel-light" style={{ animationDelay: "1350ms" }}>{heroCopy.lines[1]}</span></span>
        </h1>
        <div className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <p className="rise max-w-md text-base md:text-lg font-light leading-relaxed text-foreground/75" style={{ animationDelay: "1700ms" }}>{heroCopy.intro}</p>
          <div className="rise flex flex-wrap gap-4" style={{ animationDelay: "1900ms" }}>
            <Link to="/studio" className="btn-primary">Explore STELAARC <span aria-hidden>→</span></Link>
            <Link to="/enquire" className="btn-ghost">Start a Project</Link>
          </div>
        </div>
      </div>
      <a href="#intro" aria-label="Scroll down" className="rise absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3" style={{ animationDelay: "2300ms" }}>
        <span className="text-[9px] uppercase tracking-[0.4em] text-steel">Scroll</span>
        <span className="relative block h-12 w-px bg-steel/25 overflow-hidden"><span className="scroll-dot" /></span>
      </a>
      <div className="rise absolute bottom-8 right-6 md:right-12 z-10 hidden md:block text-[10px] uppercase tracking-[0.35em] text-steel" style={{ animationDelay: "2300ms" }}>Bengaluru, Karnataka</div>
    </section>
  );
}

/* ── 01 · Steel Shutters (variant A) ────────────────────────────────────────── */
const panels = [hero, wardrobe, factory, hero];

export function ShutterHero() {
  return (
    <section className="dark relative h-[100svh] min-h-[640px] overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 gap-px bg-steel/20">
        {panels.map((src, i) => (
          <div key={i} className={`relative overflow-hidden bg-background ${i > 1 ? "hidden md:block" : ""}`}>
            <img src={src} alt="" decoding="async" fetchPriority={i < 2 ? "high" : "auto"} className="shutter absolute inset-0 h-full w-full object-cover"
              style={{ animationDelay: `${300 + i * 180}ms`, objectPosition: `${i * 33}% center` }} />
            <div className="absolute inset-0 bg-background/55 transition-colors duration-1000 hover:bg-background/10" />
            <span className="rise absolute top-24 left-6 text-[10px] tracking-[0.4em] text-steel" style={{ animationDelay: `${1400 + i * 120}ms` }}>0{i + 1}</span>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent pointer-events-none" />
      <div className="relative z-10 flex h-full flex-col justify-end px-6 md:px-12 pb-28 pointer-events-none [&_a]:pointer-events-auto">
        <p className="rise eyebrow" style={{ animationDelay: "1200ms" }}>{heroCopy.eyebrow}</p>
        <h1 className="font-display mt-6 text-[14vw] md:text-[8vw] leading-[0.9]">
          <span className="mask"><span className="mask-inner" style={{ animationDelay: "1400ms" }}>{heroCopy.lines[0]}</span></span>
          <span className="mask"><span className="mask-inner italic text-steel-light" style={{ animationDelay: "1600ms" }}>{heroCopy.lines[1]}</span></span>
        </h1>
        <div className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <p className="rise max-w-md text-lg font-light text-foreground/75" style={{ animationDelay: "1800ms" }}>{heroCopy.intro}</p>
          <Ctas />
        </div>
      </div>
      <ScrollCue />
    </section>
  );
}

/* ── 03 · Window in Steel (variant B) ───────────────────────────────────────── */
export function WindowHero() {
  const section = useRef<HTMLElement>(null);
  const win = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const shade = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLDivElement>(null);
  const slide = useRef<HTMLSpanElement>(null);
  const outro = useRef<HTMLDivElement>(null);
  const cue = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const apply = () => {
      raf = 0;
      const el = section.current; if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.bottom < 0) return;
      const p = Math.min(1, Math.max(0, -r.top / (window.innerHeight * 1.2)));
      const inset = (1 - p) * 22;
      if (win.current) win.current.style.clipPath = `inset(${inset}% ${inset * 1.4}% ${inset}% ${inset * 1.4}% round ${(1 - p) * 4}px)`;
      if (vid.current) vid.current.style.transform = `scale(${1.3 - p * 0.3})`;
      if (shade.current) shade.current.style.opacity = String(0.3 + p * 0.5);
      if (title.current) title.current.style.opacity = String(Math.max(0, 1 - p * 1.6));
      if (slide.current) slide.current.style.transform = `translateX(${-p * 30}vw)`;
      if (outro.current) {
        outro.current.style.opacity = String(Math.min(1, Math.max(0, (p - 0.55) * 2.5)));
        outro.current.style.transform = `translateY(${(1 - p) * 40}px)`;
        outro.current.style.pointerEvents = p > 0.6 ? "auto" : "none";
      }
      if (cue.current) cue.current.style.opacity = String(Math.max(0, 1 - p * 3));
    };
    const req = () => { if (!raf) raf = requestAnimationFrame(apply); };
    apply();
    window.addEventListener("scroll", req, { passive: true });
    window.addEventListener("resize", req);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", req); window.removeEventListener("resize", req); };
  }, []);
  return (
    <section ref={section} className="dark relative h-[230vh] bg-background text-foreground">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div ref={win} className="absolute inset-0" style={{ clipPath: "inset(22% 30.8% 22% 30.8% round 4px)" }}>
          <video ref={vid} src={heroFilm} poster={hero} autoPlay muted loop playsInline preload="metadata" aria-hidden className="h-full w-full object-cover" style={{ transform: "scale(1.3)" }} />
          <div ref={shade} className="absolute inset-0 bg-background/40" style={{ opacity: 0.3 }} />
        </div>
        <div ref={title} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="rise eyebrow" style={{ animationDelay: "600ms" }}>{heroCopy.eyebrow}</p>
          <h1 className="font-display mt-4 text-center text-[13vw] md:text-[10vw] leading-[0.85] mix-blend-difference">
            <span className="mask"><span className="mask-inner" style={{ animationDelay: "900ms" }}><span ref={slide} className="inline-block">Not Just</span></span></span>
            <span className="mask"><span className="mask-inner" style={{ animationDelay: "1100ms" }}>Designed.</span></span>
          </h1>
        </div>
        <div ref={outro} className="absolute inset-0 flex flex-col items-center justify-center text-center px-6" style={{ opacity: 0, transform: "translateY(40px)", pointerEvents: "none" }}>
          <h2 className="font-display italic text-[16vw] md:text-[11vw] leading-none text-steel-light">{heroCopy.lines[1]}</h2>
          <p className="mt-6 max-w-md text-lg font-light text-foreground/80">{heroCopy.intro}</p>
          <div className="mt-10"><Ctas center /></div>
        </div>
        <div ref={cue} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.4em] text-steel">Scroll to open</div>
      </div>
    </section>
  );
}

/* ── 04 · Light Study (variant C) ───────────────────────────────────────────── */
export function LightHero() {
  const section = useRef<HTMLElement>(null);
  const lit = useRef<HTMLImageElement>(null);
  const target = useRef({ x: 0.65, y: 0.45 });
  useEffect(() => {
    const el = section.current, img = lit.current;
    if (!el || !img) return;
    const still = prefersReducedMotion();
    const cur = { ...target.current };
    const t0 = performance.now();
    let raf = 0, visible = true;
    const draw = (x: number, y: number, r: number) => {
      const m = `radial-gradient(circle at ${x * 100}% ${y * 100}%, black 0%, black ${r * 0.35}%, transparent ${r}%)`;
      img.style.maskImage = m; img.style.setProperty("-webkit-mask-image", m);
      img.style.transform = `scale(1.08) translate(${(x - 0.5) * -20}px, ${(y - 0.5) * -20}px)`;
    };
    const tick = (t: number) => {
      const idle = (t - t0) / 1000;
      cur.x += (target.current.x - cur.x) * 0.06; cur.y += (target.current.y - cur.y) * 0.06;
      draw(cur.x + (still ? 0 : Math.sin(idle * 0.5) * 0.01), cur.y + (still ? 0 : Math.cos(idle * 0.4) * 0.01), still ? 32 : Math.min(32, idle * 14));
      raf = visible ? requestAnimationFrame(tick) : 0;
    };
    const io = new IntersectionObserver(([e]) => {
      visible = !!e?.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    const point = (cx: number, cy: number) => { target.current = { x: cx / window.innerWidth, y: cy / window.innerHeight }; };
    const mm = (e: MouseEvent) => point(e.clientX, e.clientY);
    const tm = (e: TouchEvent) => { const t = e.touches[0]; if (t) point(t.clientX, t.clientY); };
    el.addEventListener("mousemove", mm);
    el.addEventListener("touchmove", tm, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); io.disconnect(); el.removeEventListener("mousemove", mm); el.removeEventListener("touchmove", tm); };
  }, []);
  const initialMask = "radial-gradient(circle at 65% 45%, black 0%, black 0%, transparent 0%)";
  return (
    <section ref={section} className="dark relative h-[100svh] min-h-[640px] overflow-hidden bg-background text-foreground">
      <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.12] grayscale" />
      <img ref={lit} src={hero} alt="Steel kitchen revealed by a beam of light" className="absolute inset-0 h-full w-full object-cover will-change-transform"
        style={{ maskImage: initialMask, WebkitMaskImage: initialMask, transform: "scale(1.08)" }} />
      <div className="grain absolute inset-0 pointer-events-none" />
      <div className="relative z-10 flex h-full items-center px-6 md:px-12 pointer-events-none [&_a]:pointer-events-auto">
        <div className="max-w-3xl">
          <p className="rise eyebrow" style={{ animationDelay: "800ms" }}>{heroCopy.eyebrow}</p>
          <h1 className="font-display mt-6 text-[14vw] md:text-[7.5vw] leading-[0.92]">
            <span className="mask"><span className="mask-inner" style={{ animationDelay: "1000ms" }}>Not Just</span></span>
            <span className="mask"><span className="mask-inner" style={{ animationDelay: "1200ms" }}>Designed.</span></span>
            <span className="mask"><span className="mask-inner italic text-steel-light" style={{ animationDelay: "1500ms" }}>{heroCopy.lines[1]}</span></span>
          </h1>
          <p className="rise mt-8 max-w-md text-lg font-light text-foreground/75" style={{ animationDelay: "1700ms" }}>{heroCopy.intro}</p>
          <div className="mt-10"><Ctas /></div>
          <p className="rise mt-10 text-[10px] uppercase tracking-[0.4em] text-steel" style={{ animationDelay: "2400ms" }}>Move to light the space</p>
        </div>
      </div>
      <ScrollCue />
    </section>
  );
}

export const heroByExperience: Record<ExperienceId, () => React.JSX.Element> = {
  architectural: ShutterHero,
  cinematic: FilmHero,
  editorial: WindowHero,
  immersive: LightHero,
};
