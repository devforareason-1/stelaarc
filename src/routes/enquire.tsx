import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import commercial from "@/assets/commercial.jpg";
import { PageHero, Reveal, meta } from "@/components/site";
import { categories } from "@/lib/content";

export const Route = createFileRoute("/enquire")({
  validateSearch: (s: Record<string, unknown>): { space?: string } => (typeof s["space"] === "string" ? { space: s["space"] } : {}),
  head: () => ({ meta: meta("Enquire — STELAARC | Start a Project", "Start a project with STELAARC — tell us about your home, development or commercial interior in Bengaluru.") }),
  component: Enquire,
});

const roles = ["Homeowner", "Builder / Developer", "Architect / Interior Designer", "Other"];
const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(7, "Please enter a phone number").max(20),
  role: z.string().min(1, "Please choose one"),
  spaces: z.array(z.string()).min(1, "Choose at least one space"),
  location: z.string().trim().max(120),
  message: z.string().trim().max(1500),
});

function Enquire() {
  const { space } = Route.useSearch();
  const [spaces, setSpaces] = useState<string[]>(space ? [space] : []);
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const toggle = (s: string) => setSpaces((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const r = schema.safeParse({ name: f.get("name"), email: f.get("email"), phone: f.get("phone"), role, spaces, location: f.get("location") ?? "", message: f.get("message") ?? "" });
    if (!r.success) { const errs: Record<string, string> = {}; r.error.issues.forEach((i) => { errs[String(i.path[0])] = i.message; }); setErrors(errs); return; }
    setErrors({}); setSent(true);
  };

  return (
    <main>
      <PageHero eyebrow="Enquire" title="Start a project." accent="Let's consider it together." image={commercial}
        intro="Tell us about your space. Whether it's a single room, a full home or a development, we'll begin by understanding what you need." />
      <section className="px-6 md:px-12 py-24 md:py-36 grid md:grid-cols-12 gap-16">
        <aside className="md:col-span-4 space-y-12">
          <Reveal><p className="eyebrow">Studio</p><p className="mt-5 font-display text-3xl">Bengaluru, Karnataka</p></Reveal>
          <Reveal delay={100}><p className="eyebrow">Showroom</p><p className="mt-5 text-foreground/70">Planned — opening soon.</p></Reveal>
          <Reveal delay={200}><p className="eyebrow">Contact</p><p className="mt-5 text-foreground/70">Matthew<br /><a href="tel:+917788818999" className="link-line">+91 77888 18999</a><br /><a href="mailto:info@stelaarc.com" className="link-line">info@stelaarc.com</a></p></Reveal>
        </aside>
        <div className="md:col-span-8">
          {sent ? (
            <div className="rise border border-steel/25 p-10 md:p-16">
              <p className="eyebrow">Thank you</p>
              <h2 className="font-display mt-6 text-4xl md:text-5xl">Your enquiry details are complete.</h2>
              <p className="mt-6 text-foreground/70 font-light">Online sending is being connected. Until then, please reach Matthew directly on +91 77888 18999 or info@stelaarc.com.</p>
              <button type="button" onClick={() => setSent(false)} className="btn-ghost mt-10">Edit enquiry</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-12">
              <div className="grid md:grid-cols-2 gap-10">
                {[["name", "Full name", "text"], ["email", "Email", "email"], ["phone", "Phone", "tel"], ["location", "Project location (optional)", "text"]].map(([n = "", l, t]) => (
                  <label key={n} className="block">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-steel">{l}</span>
                    <input name={n} type={t} className="field" maxLength={n === "location" ? 120 : 255} />
                    {errors[n] && <span className="mt-2 block text-xs text-destructive">{errors[n]}</span>}
                  </label>
                ))}
              </div>
              <fieldset>
                <legend className="text-[10px] uppercase tracking-[0.3em] text-steel">I am a</legend>
                <div className="mt-5 flex flex-wrap gap-3">
                  {roles.map((r) => <button type="button" key={r} onClick={() => setRole(r)} className={`px-5 py-3 text-xs tracking-[0.15em] border transition-all duration-500 ${role === r ? "bg-foreground text-background border-foreground" : "border-steel/30 hover:border-foreground/60"}`}>{r}</button>)}
                </div>
                {errors["role"] && <span className="mt-2 block text-xs text-destructive">{errors["role"]}</span>}
              </fieldset>
              <fieldset>
                <legend className="text-[10px] uppercase tracking-[0.3em] text-steel">Spaces of interest</legend>
                <div className="mt-5 flex flex-wrap gap-3">
                  {categories.map((c) => <button type="button" key={c.slug} onClick={() => toggle(c.name)} aria-pressed={spaces.includes(c.name)} className={`px-5 py-3 text-xs tracking-[0.15em] border transition-all duration-500 ${spaces.includes(c.name) ? "bg-foreground text-background border-foreground" : "border-steel/30 hover:border-foreground/60"}`}>{c.name}</button>)}
                </div>
                {errors["spaces"] && <span className="mt-2 block text-xs text-destructive">{errors["spaces"]}</span>}
              </fieldset>
              <label className="block">
                <span className="text-[10px] uppercase tracking-[0.3em] text-steel">Tell us about your project (optional)</span>
                <textarea name="message" rows={4} maxLength={1500} className="field resize-none" />
              </label>
              <button type="submit" className="btn-primary">Send Enquiry <span aria-hidden>→</span></button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
