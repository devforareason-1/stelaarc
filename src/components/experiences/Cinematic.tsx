/** 02 — Dark Cinematic Luxury: near-black ground, full-bleed stacked "reel", serif drama, slow reveals. */
import { Link } from "@tanstack/react-router";
import factory from "@/assets/factory.jpg";
import commercial from "@/assets/commercial.jpg";
import { FullLogo, Reveal, navItems } from "@/components/site";
import { categories, factoryStory, heroCopy, processSteps, studioContact, studioIntro } from "@/lib/content";
import { ClipReveal, Parallax, pad } from "./primitives";

const reel = categories.slice(0, 4);
const more = categories.slice(4);

export function CinematicSections() {
  return (
    <>
      <section id="intro" className="relative px-6 md:px-12 py-36 md:py-56 text-center overflow-hidden">
        <Reveal><p className="eyebrow justify-center"><span className="h-px w-10 bg-steel" />01 — The Studio<span className="h-px w-10 bg-steel" /></p></Reveal>
        <Reveal delay={120}>
          <h2 className="font-exp mx-auto mt-12 max-w-6xl text-[2.6rem] sm:text-6xl md:text-[5.4vw] font-light leading-[1.02] tracking-[-0.01em]">
            {studioIntro.lead} <span className="italic text-steel-light">{studioIntro.accent}</span>
          </h2>
        </Reveal>
        <Reveal delay={260}><Link to="/studio" className="mt-14 inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] text-steel-light link-line">About the studio <span aria-hidden>→</span></Link></Reveal>
        <div aria-hidden className="mx-auto mt-20 h-24 w-px bg-gradient-to-b from-steel/60 to-transparent" />
      </section>

      {/* Reel: each space is a full-screen frame that slides over the last (pure CSS sticky). */}
      <section aria-label="Spaces" className="relative">
        {reel.map((c, i) => (
          <article key={c.slug} className="sticky top-0 h-[100svh] min-h-[560px] overflow-hidden bg-background shadow-[0_-30px_80px_-10px_rgb(0_0_0/0.7)]">
            <Parallax src={c.image} alt={c.name} className="absolute inset-0" drift={50} zoom={1.12} imgClassName="brightness-[.9] saturate-[.9]" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-background/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />
            {i === 0 && <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-background to-transparent" />}
            <div className="relative z-10 flex h-full flex-col justify-between px-6 md:px-12 pt-28 pb-14 md:pb-20">
              <div className="flex justify-between text-[10px] uppercase tracking-[0.4em] text-steel">
                <span>02 — Spaces</span><span className="tabular-nums">{pad(i + 1)} / {pad(categories.length)}</span>
              </div>
              <div className="grid md:grid-cols-12 gap-8 items-end">
                <h3 className="md:col-span-8 font-exp text-[15vw] md:text-[8vw] font-light leading-[0.88] tracking-[-0.02em]">
                  {c.name.split(" ").map((w, j) => <span key={j} className={j % 2 ? "italic text-steel-light" : ""}>{w} </span>)}
                </h3>
                <div className="md:col-span-4 md:pb-4">
                  <p className="max-w-sm text-base font-light leading-relaxed text-foreground/75">{c.text}</p>
                  <Link to="/spaces" hash={c.slug} className="mt-8 inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] link-line">Explore {c.name.split(" ")[0]} <span aria-hidden>→</span></Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section aria-label="More spaces" className="relative z-10 grid md:grid-cols-3 gap-px bg-steel/15">
        {more.map((c, i) => (
          <Link key={c.slug} to="/spaces" hash={c.slug} className="group relative block aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-background">
            <img src={c.image} alt={c.name} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover brightness-[.55] saturate-[.8] transition-all duration-[1800ms] ease-out group-hover:scale-105 group-hover:brightness-[.8]" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
              <span className="text-[10px] tabular-nums tracking-[0.4em] text-steel">{pad(i + reel.length + 1)}</span>
              <h3 className="font-exp mt-3 text-4xl md:text-5xl font-light transition-transform duration-700 group-hover:-translate-y-1">{c.name}</h3>
              <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-foreground/70 md:opacity-0 md:translate-y-3 transition-all duration-700 group-hover:opacity-100 group-hover:translate-y-0">{c.text}</p>
            </div>
          </Link>
        ))}
      </section>

      <section aria-labelledby="cin-craft" className="relative blend-y px-6 md:px-12 py-32 md:py-48">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-5 md:sticky md:top-28 self-start">
            <Reveal><p className="eyebrow">03 — Design × Manufacturing</p></Reveal>
            <Reveal delay={100}><h2 id="cin-craft" className="font-exp mt-8 text-5xl md:text-7xl font-light leading-[1]">{factoryStory.title} <span className="italic text-steel-light">{factoryStory.accent}</span></h2></Reveal>
            <Reveal delay={200}><p className="mt-8 max-w-md text-lg font-light leading-relaxed text-foreground/65">{factoryStory.text}</p></Reveal>
            <Reveal delay={300}><Link to="/craft" className="mt-10 inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] link-line">How we build <span aria-hidden>→</span></Link></Reveal>
          </div>
          <div className="md:col-span-7">
            <ClipReveal src={factory} alt="Precision steel fabrication in the STELAARC factory" className="aspect-[16/10]" imgClassName="brightness-90" />
            <ol className="mt-16">
              {processSteps.map((s, i) => (
                <li key={s.n} className="group border-t border-steel/20 py-8 md:py-10">
                  <Reveal delay={i * 80} className="grid grid-cols-[3rem_1fr] md:grid-cols-[5rem_1fr_1.3fr] gap-x-6 gap-y-3 items-baseline">
                    <span className="text-xs tabular-nums text-steel">{s.n}</span>
                    <h3 className="font-exp text-4xl md:text-5xl font-light transition-all duration-700 group-hover:italic group-hover:text-steel-light">{s.t}</h3>
                    <p className="col-start-2 md:col-start-3 text-foreground/60 font-light leading-relaxed">{s.d}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section aria-labelledby="cin-cta" className="relative min-h-[90svh] flex items-center justify-center overflow-hidden text-center">
        <Parallax src={commercial} alt="" className="absolute inset-0" drift={70} zoom={1.2} imgClassName="brightness-[.35] saturate-[.7]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        <div className="grain absolute inset-0 pointer-events-none" />
        <div className="relative z-10 px-6 py-32">
          <Reveal><p className="eyebrow justify-center">04 — Begin</p></Reveal>
          <Reveal delay={120}><h2 id="cin-cta" className="font-exp mt-10 text-[13vw] md:text-[7.5vw] font-light leading-[0.9]">Let's build something<br /><span className="italic text-steel-light">considered.</span></h2></Reveal>
          <Reveal delay={260}>
            <div className="mt-14 flex flex-wrap justify-center gap-4">
              <Link to="/enquire" className="btn-primary">Start a Project <span aria-hidden>→</span></Link>
              <a href={`tel:${studioContact.tel}`} className="btn-ghost">Call the studio</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export function CinematicFooter() {
  return (
    <footer className="exp-cinematic bg-background text-foreground border-t border-steel/15 px-6 md:px-12 pt-24 pb-10">
      <p className="font-exp text-4xl md:text-6xl font-light leading-none">{heroCopy.lines[0]} <span className="italic text-steel-light">{heroCopy.lines[1]}</span></p>
      <div className="mt-20 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5"><FullLogo tone="dark" className="h-20 w-auto" /></div>
        <nav aria-label="Footer" className="md:col-span-3">
          <p className="eyebrow">Explore</p>
          <ul className="mt-6 space-y-3 text-sm">{navItems.map((n) => <li key={n.to}><Link to={n.to} className="link-line">{n.label}</Link></li>)}</ul>
        </nav>
        <div className="md:col-span-4">
          <p className="eyebrow">Studio</p>
          <address className="mt-6 not-italic text-sm leading-relaxed text-foreground/70">
            {studioContact.city}<br />{studioContact.showroom}<br />{studioContact.person}<br />
            <a href={`tel:${studioContact.tel}`} className="link-line">{studioContact.phone}</a><br />
            <a href={`mailto:${studioContact.email}`} className="link-line">{studioContact.email}</a>
          </address>
        </div>
      </div>
      <div className="mt-20 flex flex-col md:flex-row justify-between gap-3 text-[10px] uppercase tracking-[0.3em] text-steel">
        <span>© STELAARC</span><span>Design · Manufacturing · Installation</span>
      </div>
    </footer>
  );
}
