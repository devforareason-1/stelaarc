/** 04 — Immersive Material: warm graphite + champagne, layered parallax, macro crops, tactile gallery, scrollytelling. */
import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import hero from "@/assets/hero.jpg";
import factory from "@/assets/factory.jpg";
import wardrobe from "@/assets/wardrobe.jpg";
import vanity from "@/assets/vanity.jpg";
import tv from "@/assets/tv-unit.jpg";
import storage from "@/assets/storage.jpg";
import { FullLogo, Reveal, navItems } from "@/components/site";
import { categories, materialStory, processSteps, studioContact, studioIntro } from "@/lib/content";
import { ClipReveal, Parallax, pad } from "./primitives";

const wrap = "px-5 md:px-12";
const tag = "text-[10px] uppercase tracking-[0.38em] text-exp-accent";

/** Tight crops of existing photography, framed as material studies (no new claims). */
const details = [
  { t: "Edge", d: "Lines drawn to the inch.", src: vanity, pos: "70% 60%" },
  { t: "Surface", d: "Finished to your palette.", src: wardrobe, pos: "40% 35%" },
  { t: "Fit", d: "Made for its room, not a standard size.", src: storage, pos: "55% 65%" },
];
const stepImages = [tv, wardrobe, factory, hero];

export function ImmersiveSections() {
  return (
    <>
      <section id="intro" className={`relative ${wrap} pt-28 md:pt-40 pb-24 md:pb-40 overflow-hidden`}>
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="relative md:col-span-6 md:col-start-7 md:order-2">
            <Parallax src={tv} alt="TV and entertainment unit with integrated storage" className="aspect-[4/5] rounded-[28px]" drift={-50} zoom={1.18} />
            <div className="absolute -bottom-10 -left-4 md:-left-24 w-[46%] md:w-[42%] rounded-[22px] overflow-hidden ring-1 ring-foreground/10 shadow-[0_40px_80px_-20px_rgb(0_0_0/0.7)]">
              <Parallax src={vanity} alt="" className="aspect-square" drift={40} zoom={1.6} imgStyle={{ objectPosition: "65% 55%" }} />
            </div>
          </div>
          <div className="md:col-span-5 md:order-1 relative z-10 pt-10 md:pt-0">
            <Reveal><p className={tag}>01 · Material</p></Reveal>
            <Reveal delay={100}><h2 className="font-exp mt-8 text-5xl md:text-7xl font-light leading-[0.95]">{materialStory.title}<br /><span className="italic text-exp-accent">{materialStory.accent}</span></h2></Reveal>
            <Reveal delay={200}><p className="mt-8 max-w-md text-base md:text-lg font-light leading-relaxed text-foreground/70">{materialStory.text}</p></Reveal>
            <Reveal delay={280}><p className="mt-6 max-w-md text-sm font-light leading-relaxed text-foreground/55">{studioIntro.lead} {studioIntro.accent}</p></Reveal>
            <Reveal delay={340}><Link to="/studio" className="btn-ghost mt-10">About the studio</Link></Reveal>
          </div>
        </div>
      </section>

      <section aria-label="Material details" className={`${wrap} pb-24 md:pb-36`}>
        <div className="grid sm:grid-cols-3 gap-4 md:gap-6">
          {details.map((x, i) => (
            <Reveal key={x.t} delay={i * 120}>
              <figure className="group relative aspect-[3/4] overflow-hidden rounded-[22px]">
                <img src={x.src} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover scale-[1.9] transition-transform duration-[2400ms] ease-out group-hover:scale-[2.15]" style={{ objectPosition: x.pos }} />
                <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />
                <span aria-hidden className="absolute top-5 right-5 h-9 w-9 rounded-full border border-foreground/30 grid place-items-center text-[10px] tabular-nums text-foreground/70">{pad(i + 1)}</span>
                <figcaption className="absolute inset-x-0 bottom-0 p-6">
                  <p className={tag}>Detail</p>
                  <p className="font-exp mt-2 text-4xl font-light">{x.t}</p>
                  <p className="mt-2 text-sm font-light text-foreground/70">{x.d}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <Gallery />
      <Process />

      <section aria-labelledby="im-cta" className={`${wrap} py-24 md:py-36`}>
        <div className="relative overflow-hidden rounded-[32px] min-h-[75svh] flex items-end">
          <Parallax src={hero} alt="" className="absolute inset-0" drift={60} zoom={1.2} imgClassName="brightness-[.5] saturate-[.85]" />
          <div className="absolute inset-0 bg-gradient-to-tr from-background/90 via-background/40 to-transparent" />
          <div className="relative z-10 p-7 md:p-16 max-w-3xl">
            <Reveal><p className={tag}>04 · Begin</p></Reveal>
            <Reveal delay={120}><h2 id="im-cta" className="font-exp mt-6 text-5xl md:text-8xl font-light leading-[0.92]">Let's build something <span className="italic text-exp-accent">considered.</span></h2></Reveal>
            <Reveal delay={240}>
              <div className="mt-12 flex flex-wrap gap-4">
                <Link to="/enquire" className="btn-primary">Start a Project <span aria-hidden>→</span></Link>
                <a href={`tel:${studioContact.tel}`} className="btn-ghost">{studioContact.phone}</a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

/** Native horizontal scroll with snap — swipe on touch, buttons/keys on desktop, no scroll hijacking. */
function Gallery() {
  const track = useRef<HTMLUListElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = track.current; if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  };
  return (
    <section aria-labelledby="im-spaces" className="pb-24 md:pb-36">
      <div className={`${wrap} flex items-end justify-between gap-6`}>
        <div>
          <p className={tag}>02 · Spaces</p>
          <h2 id="im-spaces" className="font-exp mt-5 text-5xl md:text-7xl font-light leading-none">Explore the <span className="italic text-exp-accent">collection.</span></h2>
        </div>
        <div className="hidden md:flex gap-3">
          {([-1, 1] as const).map((d) => (
            <button key={d} type="button" onClick={() => scroll(d)} aria-label={d < 0 ? "Previous spaces" : "Next spaces"}
              className="h-12 w-12 rounded-full border border-foreground/25 grid place-items-center transition-colors hover:bg-foreground hover:text-background">
              <span aria-hidden>{d < 0 ? "←" : "→"}</span>
            </button>
          ))}
        </div>
      </div>
      <ul ref={track} tabIndex={0} aria-label="Spaces — scroll horizontally"
        className="mt-12 flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-px-5 md:scroll-px-12 px-5 md:px-12 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-none">
        {categories.map((c, i) => (
          <li key={c.slug} className="snap-start shrink-0 w-[80vw] sm:w-[46vw] lg:w-[30vw]">
            <Link to="/spaces" hash={c.slug} className="group relative block aspect-[3/4] overflow-hidden rounded-[24px] ring-1 ring-foreground/10">
              <img src={c.image} alt={c.name} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-[1.06]" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <span className="text-[10px] tabular-nums tracking-[0.38em] text-exp-accent">{pad(i + 1)}</span>
                <h3 className="font-exp mt-2 text-3xl md:text-4xl font-light">{c.name}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-foreground/70 lg:max-h-0 lg:opacity-0 overflow-hidden transition-all duration-700 group-hover:max-h-40 group-hover:opacity-100 group-focus-visible:max-h-40 group-focus-visible:opacity-100">{c.text}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Scrollytelling: the frame on the left crossfades to the step currently in the middle of the viewport. */
function Process() {
  const [active, setActive] = useState(0);
  const steps = useRef<(HTMLLIElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset["i"]));
    }, { rootMargin: "-45% 0px -45% 0px" });
    steps.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <section aria-labelledby="im-process" className="blend-y py-24 md:py-36">
      <div className={`${wrap} grid md:grid-cols-2 gap-10 md:gap-20`}>
        <div className="hidden md:block">
          <div className="sticky top-24 h-[calc(100svh-8rem)] overflow-hidden rounded-[28px]">
            {stepImages.map((src, i) => (
              <img key={i} src={src} alt="" loading="lazy" className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1200ms] ease-out ${active === i ? "opacity-100 scale-100" : "opacity-0 scale-105"}`} />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex gap-2" aria-hidden>
              {processSteps.map((s, i) => <span key={s.n} className={`h-px flex-1 transition-colors duration-700 ${i <= active ? "bg-exp-accent" : "bg-foreground/25"}`} />)}
            </div>
          </div>
        </div>
        <div>
          <p className={tag}>03 · Craft</p>
          <h2 id="im-process" className="font-exp mt-6 text-5xl md:text-7xl font-light leading-[0.95]">Drawn by us. <span className="italic text-exp-accent">Made by us.</span></h2>
          <ol className="mt-10 md:mt-0">
            {processSteps.map((s, i) => (
              <li key={s.n} data-i={i} ref={(el) => { steps.current[i] = el; }} className="md:min-h-[70svh] flex flex-col justify-center py-10 md:py-0">
                <ClipReveal src={stepImages[i] ?? hero} alt="" className="md:hidden mb-8 aspect-[4/3] rounded-[20px]" />
                <span className={`font-exp text-7xl md:text-8xl font-light transition-colors duration-700 ${active === i ? "text-exp-accent" : "text-foreground/20"}`}>{s.n}</span>
                <h3 className="mt-4 text-2xl md:text-3xl font-light">{s.t}</h3>
                <p className="mt-4 max-w-md text-base md:text-lg font-light leading-relaxed text-foreground/65">{s.d}</p>
              </li>
            ))}
          </ol>
          <Link to="/craft" className="btn-ghost mt-6">How we build</Link>
        </div>
      </div>
    </section>
  );
}

export function ImmersiveFooter() {
  return (
    <footer className={`exp-immersive bg-background text-foreground ${wrap} pt-20 pb-10`}>
      <div className="flex flex-col items-center text-center">
        <FullLogo tone="dark" className="h-20 w-auto" />
        <nav aria-label="Footer" className="mt-12 flex flex-wrap justify-center gap-3">
          {navItems.map((n) => <Link key={n.to} to={n.to} className="rounded-full border border-foreground/20 px-5 py-2.5 text-[11px] uppercase tracking-[0.28em] transition-colors hover:bg-foreground hover:text-background">{n.label}</Link>)}
        </nav>
        <address className="mt-12 not-italic text-sm font-light leading-relaxed text-foreground/65">
          {studioContact.city} · {studioContact.showroom}<br />{studioContact.person} ·{" "}
          <a href={`tel:${studioContact.tel}`} className="link-line">{studioContact.phone}</a> ·{" "}
          <a href={`mailto:${studioContact.email}`} className="link-line">{studioContact.email}</a>
        </address>
      </div>
      <div className="mt-16 pt-6 border-t border-foreground/10 flex flex-col md:flex-row justify-between gap-3 text-[10px] uppercase tracking-[0.3em] text-exp-accent">
        <span>© STELAARC</span><span>Design · Manufacturing · Installation</span>
      </div>
    </footer>
  );
}
