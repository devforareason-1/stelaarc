import { createFileRoute, Link } from "@tanstack/react-router";
import factory from "@/assets/factory.jpg";
import hero from "@/assets/hero.jpg";
import { CtaBand, PageHero, Reveal, meta } from "@/components/site";
import { principles, processSteps as steps } from "@/lib/content";

export const Route = createFileRoute("/craft")({
  head: () => ({ meta: meta("Craft — STELAARC | In-House Design & Manufacturing", "How STELAARC designs, manufactures in its own factory and installs customised interiors in Bengaluru.") }),
  component: Craft,
});


function Craft() {
  return (
    <main>
      <PageHero eyebrow="Craft" title="Drawn by us." accent="Made by us." image={factory}
        intro="Design thinking meets our own factory floor. Owning the process end to end is how we keep every detail considered." />
      <section className="px-6 md:px-12 py-28 md:py-40">
        <Reveal><p className="eyebrow">The process</p></Reveal>
        <div className="mt-14 grid md:grid-cols-4 border-t border-steel/25">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 120} className="group border-b md:border-b-0 md:border-r last:border-r-0 border-steel/25 py-10 md:px-8 first:md:pl-0">
              <p className="text-xs text-steel">{s.n}</p>
              <h3 className="font-display mt-10 text-4xl md:text-5xl transition-all duration-700 group-hover:italic">{s.t}</h3>
              <p className="mt-5 text-foreground/65 font-light leading-relaxed">{s.d}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="dark blend-y text-foreground px-6 md:px-12 py-28 md:py-40">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-6">
            <Reveal><p className="eyebrow">In-house factory</p></Reveal>
            <Reveal delay={100}><h2 className="font-display mt-8 text-4xl md:text-6xl leading-[1.05]">Control from <span className="italic text-steel-light">raw material to final fit.</span></h2></Reveal>
            <Reveal delay={200}><p className="mt-8 text-lg font-light text-foreground/65 leading-relaxed">Because manufacturing happens in our own factory, design decisions don't get lost between suppliers. We can customise dimensions, internals and finishes to the project — and stand behind the result.</p></Reveal>
          </div>
          <div className="md:col-span-6 overflow-hidden aspect-[5/4]"><img src={hero} alt="Steel kitchen interior" loading="lazy" className="h-full w-full object-cover" /></div>
        </div>
      </section>
      <section className="px-6 md:px-12 py-28 md:py-40 grid md:grid-cols-3 gap-12">
        {principles.map(({ t, d }, i) => (
          <Reveal key={t} delay={i * 100}><div className="border-t border-steel/25 pt-8"><h3 className="font-display text-3xl">{t}</h3><p className="mt-4 text-foreground/65 font-light leading-relaxed">{d}</p></div></Reveal>
        ))}
      </section>
      <div className="text-center"><Link to="/spaces" className="text-[11px] uppercase tracking-[0.3em] link-line">Explore our spaces →</Link></div>
      <CtaBand />
    </main>
  );
}
