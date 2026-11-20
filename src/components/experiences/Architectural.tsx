/** 01 — Architectural Minimalism: ivory ground, light sans type, asymmetric gallery grid, hairlines. */
import { Link } from "@tanstack/react-router";
import factory from "@/assets/factory.jpg";
import { FullLogo, Reveal, navItems } from "@/components/site";
import { categories, factoryStory, materialStory, processSteps, studioContact, studioIntro } from "@/lib/content";
import { ClipReveal, pad } from "./primitives";

const wrap = "px-6 md:px-12 lg:px-20";
const label = "text-[11px] uppercase tracking-[0.28em] text-steel";

/** Grid placement per category — composed like a plate layout, not a card grid. */
const plates = [
  { col: "md:col-span-7", ratio: "aspect-[4/5]", pos: "center" },
  { col: "md:col-span-4 md:col-start-9 md:mt-48", ratio: "aspect-[3/4]", pos: "center" },
  { col: "md:col-span-4 md:col-start-2", ratio: "aspect-[4/5]", pos: "center" },
  { col: "md:col-span-6 md:col-start-7 md:mt-28", ratio: "aspect-[4/3]", pos: "center" },
  { col: "md:col-span-4", ratio: "aspect-square", pos: "center" },
  { col: "md:col-span-4 md:mt-20", ratio: "aspect-square", pos: "30% center" },
  { col: "md:col-span-4 md:mt-40", ratio: "aspect-square", pos: "center" },
];

export function ArchitecturalSections() {
  return (
    <>
      <section id="intro" className={`${wrap} pt-28 md:pt-44 pb-28 md:pb-40`}>
        <div className="grid md:grid-cols-12 gap-y-10 md:gap-x-8 border-t border-foreground/15 pt-8">
          <Reveal className="md:col-span-3"><p className={label}>(01) The Studio</p></Reveal>
          <div className="md:col-span-8 md:col-start-5">
            <Reveal><h2 className="font-exp text-[2rem] sm:text-[2.6rem] md:text-[3.5rem] font-extralight leading-[1.1] tracking-[-0.025em]">{studioIntro.lead} <span className="text-steel">{studioIntro.accent}</span></h2></Reveal>
            <div className="mt-16 grid sm:grid-cols-2 gap-10 md:gap-16">
              <Reveal delay={100}><p className="text-[15px] leading-[1.85] font-light text-foreground/70">{materialStory.text}</p></Reveal>
              <Reveal delay={200}>
                <dl className="text-[13px] divide-y divide-foreground/10 border-y border-foreground/10">
                  {[["Based", studioContact.city], ["Practice", "Design · Manufacturing · Installation"], ["Showroom", "Coming soon"]].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-6 py-3.5"><dt className="text-steel">{k}</dt><dd className="text-right">{v}</dd></div>
                  ))}
                </dl>
              </Reveal>
            </div>
            <Reveal delay={250}><Link to="/studio" className="mt-14 inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.28em] link-line">About the studio <span aria-hidden>→</span></Link></Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="arch-spaces" className={`${wrap} pb-28 md:pb-44`}>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-t border-foreground/15 pt-8">
          <p className={label}>(02) Spaces</p>
          <Reveal><h2 id="arch-spaces" className="font-exp text-3xl md:text-5xl font-extralight tracking-[-0.02em] md:text-right">Interiors, drawn <span className="text-steel">to the inch.</span></h2></Reveal>
        </div>
        <div className="mt-16 md:mt-24 grid md:grid-cols-12 gap-x-8 gap-y-16 md:gap-y-24">
          {categories.map((c, i) => {
            const p = plates[i] ?? plates[0]!;
            return (
              <Link key={c.slug} to="/spaces" hash={c.slug} className={`group block ${p.col}`}>
                <ClipReveal src={c.image} alt={c.name} className={p.ratio}
                  imgClassName="transition-[transform,filter] duration-[1600ms] ease-out group-hover:scale-[1.03] saturate-[.85] group-hover:saturate-100" imgStyle={{ objectPosition: p.pos }} />
                <div className="mt-5 grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-3 border-b border-foreground/10 pb-5">
                  <span className="text-[11px] tabular-nums text-steel">{pad(i + 1)}</span>
                  <span>
                    <span className="block text-lg md:text-xl font-light tracking-[-0.01em]">{c.name}</span>
                    <span className="mt-2 block max-w-sm text-[13px] leading-relaxed font-light text-foreground/60">{c.text}</span>
                  </span>
                  <span aria-hidden className="text-steel transition-transform duration-500 group-hover:translate-x-1">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="arch-method" className={`blend-y ${wrap} py-28 md:py-40`}>
        <div className="grid md:grid-cols-12 gap-y-12 md:gap-x-8 items-end">
          <div className="md:col-span-5">
            <p className={label}>(03) Method</p>
            <Reveal><h2 id="arch-method" className="font-exp mt-10 text-4xl md:text-6xl font-extralight leading-[1.05] tracking-[-0.03em]">Drawn by us.<br /><span className="text-steel">Made by us.</span></h2></Reveal>
            <Reveal delay={120}><p className="mt-8 max-w-md text-[15px] leading-[1.85] font-light text-foreground/70">{factoryStory.text}</p></Reveal>
          </div>
          <figure className="md:col-span-6 md:col-start-7">
            <ClipReveal src={factory} alt="Precision steel fabrication in the STELAARC factory" className="aspect-[4/3]" />
            <figcaption className="mt-4 flex justify-between text-[11px] uppercase tracking-[0.24em] text-steel"><span>Fig. — In-house factory</span><span>{studioContact.city}</span></figcaption>
          </figure>
        </div>
        <ol className="mt-20 md:mt-28 grid sm:grid-cols-2 md:grid-cols-4 border-t border-foreground/15">
          {processSteps.map((s, i) => (
            <li key={s.n} className="border-b sm:border-b-0 md:border-r last:border-r-0 border-foreground/10 py-10 md:pr-8 md:[&:not(:first-child)]:pl-8">
              <Reveal delay={i * 100}>
                <p className="font-exp text-5xl font-extralight text-steel/70 tabular-nums">{s.n}</p>
                <h3 className="mt-8 text-lg font-normal">{s.t}</h3>
                <p className="mt-3 text-[14px] leading-relaxed font-light text-foreground/65">{s.d}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="arch-cta" className={`${wrap} py-28 md:py-44`}>
        <div className="grid md:grid-cols-12 gap-y-12 md:gap-x-8 border-t border-foreground/15 pt-8">
          <p className={`${label} md:col-span-3`}>(04) Enquire</p>
          <div className="md:col-span-9">
            <Reveal><h2 id="arch-cta" className="font-exp text-[2.6rem] sm:text-6xl md:text-[5.5rem] font-extralight leading-[0.98] tracking-[-0.035em]">Let's build something <span className="text-steel">considered.</span></h2></Reveal>
            <Reveal delay={150}>
              <div className="mt-14 flex flex-col sm:flex-row sm:items-center gap-8 sm:gap-12">
                <Link to="/enquire" className="btn-primary self-start">Start a Project <span aria-hidden>→</span></Link>
                <p className="text-[13px] leading-relaxed text-foreground/65">
                  <a href={`tel:${studioContact.tel}`} className="link-line">{studioContact.phone}</a><span className="mx-3 text-steel">/</span>
                  <a href={`mailto:${studioContact.email}`} className="link-line">{studioContact.email}</a>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

export function ArchitecturalFooter() {
  return (
    <footer className={`exp-architectural bg-background text-foreground ${wrap} pt-20 pb-10 border-t border-foreground/15`}>
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5"><FullLogo tone="light" className="h-14 w-auto" /></div>
        <nav aria-label="Footer" className="md:col-span-3">
          <p className={label}>Index</p>
          <ul className="mt-6 space-y-2.5 text-[14px] font-light">{navItems.map((n) => <li key={n.to}><Link to={n.to} className="link-line">{n.label}</Link></li>)}</ul>
        </nav>
        <div className="md:col-span-4">
          <p className={label}>Studio</p>
          <address className="mt-6 not-italic text-[14px] font-light leading-[1.9] text-foreground/70">
            {studioContact.city}<br />{studioContact.showroom}<br />{studioContact.person}<br />
            <a href={`tel:${studioContact.tel}`} className="link-line">{studioContact.phone}</a><br />
            <a href={`mailto:${studioContact.email}`} className="link-line">{studioContact.email}</a>
          </address>
        </div>
      </div>
      <div className="mt-20 pt-6 border-t border-foreground/10 flex flex-col md:flex-row justify-between gap-3 text-[11px] tracking-[0.18em] text-steel">
        <span>© STELAARC</span><span>Architecture in Steel</span>
      </div>
    </footer>
  );
}
