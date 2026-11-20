import { createFileRoute, Link } from "@tanstack/react-router";
import tv from "@/assets/tv-unit.jpg";
import { CtaBand, PageHero, Reveal, meta } from "@/components/site";
import { categories } from "@/lib/content";

export const Route = createFileRoute("/spaces")({
  head: () => ({ meta: meta("Spaces — STELAARC | Kitchens, Wardrobes & Interiors", "Modular kitchens, wardrobes, vanities, TV units, storage, full-home and commercial interiors — designed and manufactured by STELAARC in Bengaluru.") }),
  component: Spaces,
});

function Spaces() {
  return (
    <main>
      <PageHero eyebrow="Spaces" title="Seven disciplines." accent="One standard." image={tv}
        intro="Every category is designed to your space and made in our own factory — from a single vanity to a complete home or commercial interior." />
      <nav className="sticky top-[72px] z-30 bg-background/85 backdrop-blur-xl border-b border-steel/15 overflow-x-auto">
        <ul className="flex gap-8 px-6 md:px-12 py-4 text-[10px] uppercase tracking-[0.3em] whitespace-nowrap text-foreground/70">
          {categories.map((c) => <li key={c.slug}><a href={`#${c.slug}`} className="link-line hover:text-foreground">{c.name}</a></li>)}
        </ul>
      </nav>
      <div className="px-6 md:px-12 py-20 md:py-32 space-y-28 md:space-y-44">
        {categories.map((c, i) => (
          <section key={c.slug} id={c.slug} className="scroll-mt-36 grid md:grid-cols-12 gap-10 md:gap-16 items-center">
            <Reveal className={`md:col-span-7 ${i % 2 ? "md:order-2" : ""}`}>
              <div className="group overflow-hidden aspect-[4/3] md:aspect-[16/11]">
                <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover scale-105 transition-transform duration-[2000ms] group-hover:scale-100" />
              </div>
              <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-steel">Illustrative image — project photography to follow</p>
            </Reveal>
            <div className="md:col-span-5">
              <Reveal><p className="text-xs text-steel tabular-nums">{String(i + 1).padStart(2, "0")} / 07</p></Reveal>
              <Reveal delay={100}><h2 className="font-display mt-4 text-5xl md:text-6xl leading-[1]">{c.name}</h2></Reveal>
              <Reveal delay={200}><p className="mt-6 text-lg font-light text-foreground/70 leading-relaxed">{c.text}</p></Reveal>
              <Reveal delay={300}><Link to="/enquire" search={{ space: c.name }} className="mt-8 inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] link-line">Enquire about {c.name.toLowerCase()} <span aria-hidden>→</span></Link></Reveal>
            </div>
          </section>
        ))}
      </div>
      <CtaBand />
    </main>
  );
}
