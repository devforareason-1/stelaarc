import { createFileRoute, Link } from "@tanstack/react-router";
import wardrobe from "@/assets/wardrobe.jpg";
import storage from "@/assets/storage.jpg";
import { CtaBand, PageHero, Reveal, meta } from "@/components/site";
import { audiences } from "@/lib/content";

export const Route = createFileRoute("/studio")({
  head: () => ({ meta: meta("Studio — STELAARC | Design & Manufacturing, Bengaluru", "STELAARC is a Bengaluru design and manufacturing studio creating customised interiors, from design through in-house production to installation.") }),
  component: Studio,
});

const values = [
  { n: "01", t: "Practical experience", d: "Our approach is grounded in hands-on industry experience — we design what we know can be built well." },
  { n: "02", t: "Understanding needs", d: "Every project begins by listening: how you live, what you store, what matters to you in a space." },
  { n: "03", t: "Customised solutions", d: "Nothing is off the shelf. Each piece is drawn and made for its specific room, use and owner." },
  { n: "04", t: "One accountable team", d: "Design, manufacturing and installation sit with us, so the intent on paper is the result on site." },
];

function Studio() {
  return (
    <main>
      <PageHero eyebrow="The Studio" title="Designed with intent." accent="Built in steel." image={wardrobe}
        intro="STELAARC is a design and manufacturing studio in Bengaluru, Karnataka — creating contemporary interiors that are considered from the first sketch to the final fitting." />
      <section className="px-6 md:px-12 py-28 md:py-40 grid md:grid-cols-12 gap-10">
        <Reveal className="md:col-span-3"><p className="eyebrow">Who we are</p></Reveal>
        <div className="md:col-span-9 space-y-10">
          <Reveal><p className="font-display text-3xl md:text-5xl leading-[1.15]">We bring design, manufacturing and installation together — so every interior is <span className="italic text-steel">shaped by one vision and delivered by one team.</span></p></Reveal>
          <Reveal delay={150}><p className="max-w-2xl text-lg font-light text-foreground/70 leading-relaxed">With our own factory running and clients already being served, we work across modular kitchens, wardrobes, vanities, entertainment units, storage, full-home and commercial interiors. Our showroom in Bengaluru is planned and coming soon.</p></Reveal>
        </div>
      </section>
      <section className="px-6 md:px-12 pb-28 md:pb-40">
        <Reveal><p className="eyebrow">What guides us</p></Reveal>
        <div className="mt-12 grid md:grid-cols-2 gap-px bg-steel/20 border border-steel/20">
          {values.map((v, i) => (
            <Reveal key={v.n} delay={i * 100} className="bg-background p-10 md:p-14 h-full">
              <p className="text-xs text-steel">{v.n}</p>
              <h3 className="font-display mt-6 text-3xl md:text-4xl">{v.t}</h3>
              <p className="mt-4 text-foreground/65 font-light leading-relaxed max-w-md">{v.d}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="dark blend-y text-foreground px-6 md:px-12 py-28 md:py-40">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 overflow-hidden aspect-[4/5]"><img src={storage} alt="Handleless steel and oak storage wall" loading="lazy" width={1024} height={1280} className="h-full w-full object-cover" /></div>
          <div className="md:col-span-7">
            <Reveal><p className="eyebrow">Who we work with</p></Reveal>
            <div className="mt-10 divide-y divide-steel/20 border-y border-steel/20">
              {audiences.map((a, i) => (
                <Reveal key={a.title} delay={i * 100}><div className="py-8"><h3 className="font-display text-3xl md:text-4xl">{a.title}</h3><p className="mt-3 text-foreground/65 font-light max-w-lg">{a.text}</p></div></Reveal>
              ))}
            </div>
            <Reveal delay={300}><Link to="/spaces" className="mt-10 inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] link-line">See what we create <span aria-hidden>→</span></Link></Reveal>
          </div>
        </div>
      </section>
      <CtaBand />
    </main>
  );
}
