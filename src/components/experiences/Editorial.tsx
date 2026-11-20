/** 03 — Contemporary Editorial: paper & ink, oversized serif display, magazine spreads, split screens. */
import { Link } from "@tanstack/react-router";
import factory from "@/assets/factory.jpg";
import vanity from "@/assets/vanity.jpg";
import { FullLogo, Reveal, navItems } from "@/components/site";
import { categories, factoryStory, principles, processSteps, studioContact, studioIntro } from "@/lib/content";
import { ClipReveal, pad } from "./primitives";

const wrap = "px-5 md:px-10";
const kicker = "text-[11px] font-medium uppercase tracking-[0.22em]";
const spreads = categories.slice(0, 4);
const index = categories.slice(4);

export function EditorialSections() {
  return (
    <>
      <section id="intro" className={`${wrap} pt-20 md:pt-28 pb-20 md:pb-28`}>
        <div className={`${kicker} flex flex-wrap justify-between gap-x-6 gap-y-2 border-y-2 border-foreground py-3`}>
          <span>No. 01 — The Studio</span><span className="hidden sm:inline">{studioContact.city}</span><span>Design · Manufacturing · Installation</span>
        </div>
        <Reveal>
          <h2 className="font-exp mt-10 md:mt-14 text-[21vw] md:text-[14.5vw] leading-[0.8] tracking-[-0.035em]">
            <span className="block">Architecture</span>
            <em className="block text-right text-steel-light">in Steel.</em>
          </h2>
        </Reveal>
        <div className="mt-14 md:mt-20 grid md:grid-cols-12 gap-10">
          <Reveal className="md:col-span-5">
            <p className="text-lg md:text-xl leading-[1.55] first-letter:font-exp first-letter:float-left first-letter:mr-3 first-letter:text-[5.2rem] first-letter:leading-[0.8]">
              {studioIntro.lead} {studioIntro.accent}
            </p>
            <Link to="/studio" className={`${kicker} mt-10 inline-flex items-center gap-3 link-line`}>Read about the studio <span aria-hidden>→</span></Link>
          </Reveal>
          <Reveal delay={150} className="md:col-span-6 md:col-start-7 md:border-l md:border-foreground/20 md:pl-10">
            <blockquote className="font-exp text-4xl md:text-6xl leading-[1.02] italic">"Drawn by us. <span className="not-italic text-steel-light">Made by us.</span>"</blockquote>
            <p className={`${kicker} mt-6 text-steel`}>— On owning the process end to end</p>
          </Reveal>
        </div>
      </section>

      <div aria-hidden className="overflow-hidden border-y border-foreground bg-foreground text-background py-5 md:py-7">
        <div className="marquee font-exp italic text-5xl md:text-7xl whitespace-nowrap">
          {[0, 1].map((k) => (
            <span key={k} className="flex">
              {categories.map((c) => <span key={c.slug} className="px-8 flex items-center gap-16">{c.name}<span className="inline-block h-2.5 w-2.5 rounded-full bg-steel" /></span>)}
            </span>
          ))}
        </div>
      </div>

      <section aria-labelledby="ed-spaces" className={`${wrap} py-20 md:py-32`}>
        <div className="flex items-end justify-between gap-6">
          <h2 id="ed-spaces" className="font-exp text-6xl md:text-[8vw] leading-[0.85] tracking-[-0.03em]">The Spaces</h2>
          <p className={`${kicker} hidden md:block max-w-[16rem] text-right text-foreground/60`}>{categories.length} disciplines, one studio — drawn, built and installed by us.</p>
        </div>
        {spreads.map((c, i) => {
          const flip = i % 2 === 1;
          return (
            <article key={c.slug} className="grid md:grid-cols-12 gap-8 md:gap-10 items-end border-t border-foreground/20 mt-14 md:mt-20 pt-8 md:pt-10">
              <div className={`md:col-span-7 ${flip ? "md:order-2 md:col-start-6" : ""}`}>
                <ClipReveal src={c.image} alt={c.name} axis="x" className={i % 2 ? "aspect-[4/5] md:aspect-[6/5]" : "aspect-[4/5] md:aspect-[5/6]"} />
              </div>
              <div className={`md:col-span-5 ${flip ? "md:order-1" : ""}`}>
                <Reveal><span className="font-exp text-outline block text-[30vw] md:text-[13vw] leading-[0.8]">{pad(i + 1)}</span></Reveal>
                <Reveal delay={100}><h3 className="font-exp mt-6 text-5xl md:text-7xl leading-[0.92] tracking-[-0.02em]">{c.name}</h3></Reveal>
                <Reveal delay={180}><p className="mt-6 max-w-md text-[17px] leading-[1.6] text-foreground/70">{c.text}</p></Reveal>
                <Reveal delay={240}><Link to="/spaces" hash={c.slug} className={`${kicker} mt-8 inline-flex items-center gap-3 border-b-2 border-foreground pb-1 hover:text-steel-light hover:border-steel-light transition-colors`}>See {c.name.toLowerCase()} <span aria-hidden>→</span></Link></Reveal>
              </div>
            </article>
          );
        })}

        <div className="mt-20 md:mt-28 border-t-2 border-foreground pt-6">
          <p className={kicker}>Also from the studio</p>
          <ul className="mt-6">
            {index.map((c, i) => (
              <li key={c.slug}>
                <Link to="/spaces" hash={c.slug} className="group grid grid-cols-[2.5rem_1fr_auto] md:grid-cols-[4rem_1.2fr_2fr_5rem] items-center gap-x-6 gap-y-2 border-b border-foreground/20 py-6">
                  <span className="text-sm tabular-nums text-steel">{pad(i + spreads.length + 1)}</span>
                  <span className="font-exp text-3xl md:text-5xl transition-transform duration-500 group-hover:translate-x-2 group-hover:italic">{c.name}</span>
                  <span className="col-start-2 md:col-start-auto text-[15px] leading-relaxed text-foreground/60">{c.text}</span>
                  <span className="row-start-1 col-start-3 md:col-start-auto md:row-start-auto justify-self-end overflow-hidden h-14 w-14 md:h-16 md:w-20">
                    <img src={c.image} alt="" loading="lazy" className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="ed-method" className="grid md:grid-cols-2 border-y-2 border-foreground">
        <div className="relative md:order-2 h-[60svh] md:h-auto md:min-h-full">
          <div className="md:sticky md:top-0 h-full md:h-[100svh] overflow-hidden">
            <img src={factory} alt="Precision steel fabrication in the STELAARC factory" loading="lazy" className="h-full w-full object-cover grayscale-[.3]" />
            <span className={`${kicker} absolute bottom-5 left-5 bg-background px-3 py-2`}>Plate — The factory floor</span>
          </div>
        </div>
        <div className={`${wrap} py-20 md:py-32 md:border-r-2 md:border-foreground`}>
          <p className={kicker}>No. 03 — Method</p>
          <Reveal><h2 id="ed-method" className="font-exp mt-8 text-6xl md:text-8xl leading-[0.85] tracking-[-0.03em]">{factoryStory.title} <em className="text-steel-light">{factoryStory.accent}</em></h2></Reveal>
          <Reveal delay={100}><p className="mt-8 max-w-lg text-lg leading-[1.6] text-foreground/70">{factoryStory.text}</p></Reveal>
          <ol className="mt-16 space-y-12">
            {processSteps.map((s, i) => (
              <li key={s.n}>
                <Reveal delay={i * 60} className="grid grid-cols-[4.5rem_1fr] gap-6">
                  <span className="font-exp text-6xl leading-none text-steel-light">{s.n}</span>
                  <div className="border-t border-foreground/25 pt-4">
                    <h3 className={kicker}>{s.t}</h3>
                    <p className="mt-3 text-[17px] leading-[1.6] text-foreground/70">{s.d}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
          <div className="mt-20 grid sm:grid-cols-3 gap-8 border-t-2 border-foreground pt-8">
            {principles.map((p) => (
              <div key={p.t}><h3 className="font-exp text-3xl italic">{p.t}</h3><p className="mt-3 text-sm leading-relaxed text-foreground/65">{p.d}</p></div>
            ))}
          </div>
          <Link to="/craft" className={`${kicker} mt-14 inline-flex items-center gap-3 link-line`}>The full process <span aria-hidden>→</span></Link>
        </div>
      </section>

      <section aria-labelledby="ed-cta" className="grid md:grid-cols-2 min-h-[85svh]">
        <div className="bg-foreground text-background flex flex-col justify-between gap-16 px-5 md:px-10 py-16 md:py-20">
          <p className={kicker}>No. 04 — Commission</p>
          <div>
            <Reveal><h2 id="ed-cta" className="font-exp text-[15vw] md:text-[7vw] leading-[0.86] tracking-[-0.03em]">Let's build something <em>considered.</em></h2></Reveal>
            <Reveal delay={150}>
              <div className="mt-12 flex flex-wrap items-center gap-6">
                <Link to="/enquire" className="inline-flex items-center gap-3 bg-background text-foreground px-7 py-4 text-[11px] font-medium uppercase tracking-[0.2em] transition-all duration-500 hover:tracking-[0.26em]">Start a Project <span aria-hidden>→</span></Link>
                <a href={`mailto:${studioContact.email}`} className={`${kicker} link-line`}>{studioContact.email}</a>
              </div>
            </Reveal>
          </div>
        </div>
        <ClipReveal src={vanity} alt="Vanity designed by STELAARC" className="min-h-[50svh] md:min-h-full" />
      </section>
    </>
  );
}

export function EditorialFooter() {
  return (
    <footer className={`exp-editorial bg-background text-foreground ${wrap} pt-16 pb-8`}>
      <div className="border-t-2 border-foreground pt-10 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="font-exp text-6xl md:text-8xl leading-[0.85] tracking-[-0.03em]">Architecture <em className="text-steel-light">in Steel.</em></p>
        </div>
        <nav aria-label="Footer" className="md:col-span-2 md:col-start-8">
          <p className={kicker}>Contents</p>
          <ul className="mt-5 space-y-2 text-[15px]">{navItems.map((n, i) => <li key={n.to}><Link to={n.to} className="link-line"><span className="text-steel tabular-nums mr-3">{pad(i + 1)}</span>{n.label}</Link></li>)}</ul>
        </nav>
        <address className="md:col-span-3 not-italic text-[15px] leading-[1.75] text-foreground/70">
          <p className={`${kicker} text-foreground`}>Studio</p>
          <span className="mt-5 block">{studioContact.city}<br />{studioContact.showroom}<br />{studioContact.person}<br />
            <a href={`tel:${studioContact.tel}`} className="link-line">{studioContact.phone}</a><br />
            <a href={`mailto:${studioContact.email}`} className="link-line">{studioContact.email}</a></span>
        </address>
      </div>
      <div className="mt-16 flex flex-col-reverse md:flex-row md:items-end justify-between gap-6 border-t border-foreground/20 pt-6">
        <span className={`${kicker} text-steel`}>© STELAARC</span>
        <FullLogo tone="light" className="h-12 w-auto" />
      </div>
    </footer>
  );
}
