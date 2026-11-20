import { Link } from "@tanstack/react-router";
import wardrobe from "@/assets/wardrobe.jpg";
import factory from "@/assets/factory.jpg";
import { CtaBand, Reveal } from "@/components/site";
import { categories } from "@/lib/content";

/** Everything below the hero — shared by the main home page and hero variants A/B/C. */
export function HomeSections() {
  return (
    <>
      <section id="intro" className="px-6 md:px-12 py-32 md:py-44">
        <div className="grid md:grid-cols-12 gap-10">
          <Reveal className="md:col-span-3"><p className="eyebrow">01 — The Studio</p></Reveal>
          <div className="md:col-span-9">
            <Reveal><h2 className="font-display text-4xl md:text-7xl leading-[1.05]">A design and manufacturing studio, <span className="italic text-steel">where every line is drawn, built and installed under one roof.</span></h2></Reveal>
            <Reveal delay={200}><Link to="/studio" className="mt-12 inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] link-line">About the studio <span aria-hidden>→</span></Link></Reveal>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-32 md:pb-44">
        <div className="grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-5 md:sticky md:top-28">
            <Reveal><p className="eyebrow">02 — Spaces</p></Reveal>
            <Reveal delay={100}><div className="mt-8 overflow-hidden aspect-[4/5]"><img src={wardrobe} alt="Steel-framed glass wardrobe" loading="lazy" width={1024} height={1280} className="h-full w-full object-cover scale-110 transition-transform duration-[2000ms] hover:scale-100" /></div></Reveal>
          </div>
          <ul className="md:col-span-7 md:pt-20">
            {categories.map((c, i) => (
              <Reveal key={c.slug} delay={i * 60}>
                <li>
                  <Link to="/spaces" hash={c.slug} className="group flex items-baseline justify-between border-t border-steel/20 py-7 md:py-9">
                    <span className="flex items-baseline gap-6">
                      <span className="text-xs text-steel tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                      <span className="font-display text-3xl md:text-5xl transition-all duration-700 group-hover:translate-x-4 group-hover:italic group-hover:text-steel">{c.name}</span>
                    </span>
                    <span className="text-steel opacity-0 -translate-x-4 transition-all duration-700 group-hover:opacity-100 group-hover:translate-x-0">→</span>
                  </Link>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="dark relative blend-y text-foreground py-32 md:py-44 px-6 md:px-12 overflow-hidden">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 overflow-hidden aspect-[5/4]"><img src={factory} alt="Precision steel fabrication in the STELAARC factory" loading="lazy" width={1280} height={1024} className="h-full w-full object-cover" /></div>
          <div className="md:col-span-5">
            <Reveal><p className="eyebrow">03 — Design × Manufacturing</p></Reveal>
            <Reveal delay={100}><h2 className="font-display mt-8 text-4xl md:text-6xl leading-[1.05]">From the drawing board to <span className="italic text-steel-light">our own factory floor.</span></h2></Reveal>
            <Reveal delay={200}><p className="mt-8 text-lg font-light text-foreground/65 leading-relaxed">Our in-house factory gives us control over every detail — so each piece is made to fit your space, your routine and your intent, not a catalogue.</p></Reveal>
            <Reveal delay={300}><Link to="/craft" className="mt-10 inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] link-line">How we build <span aria-hidden>→</span></Link></Reveal>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
