import hero from "@/assets/hero.jpg";
import wardrobe from "@/assets/wardrobe.jpg";
import vanity from "@/assets/vanity.jpg";
import tv from "@/assets/tv-unit.jpg";
import storage from "@/assets/storage.jpg";
import commercial from "@/assets/commercial.jpg";

export const categories = [
  { slug: "kitchens", name: "Modular Kitchens", image: hero, text: "Kitchens planned around how you cook, gather and store — layouts, finishes and fittings tailored to your space and built in our own factory." },
  { slug: "wardrobes", name: "Wardrobes", image: wardrobe, text: "Wardrobes and walk-ins designed to the inch, with internal layouts shaped around what you actually own and how you use it." },
  { slug: "vanities", name: "Vanities", image: vanity, text: "Bathroom vanities that balance material, storage and light — made to fit your room rather than a standard size." },
  { slug: "entertainment", name: "TV & Entertainment Units", image: tv, text: "Media walls and entertainment units that integrate screens, storage and cable management into one considered composition." },
  { slug: "storage", name: "Storage Solutions", image: storage, text: "Built-in storage that disappears into the architecture — for living rooms, studies, utility spaces and every awkward corner." },
  { slug: "full-home", name: "Full-Home Interiors", image: hero, text: "End-to-end interiors for the whole home, designed as one language and delivered by a single team from drawing to installation." },
  { slug: "commercial", name: "Commercial Interiors", image: commercial, text: "Interiors for workplaces and commercial spaces, engineered for daily use and manufactured with the same precision as our residential work." },
] as const;

export const audiences = [
  { title: "Homeowners", text: "For luxury and upper-middle-class homes that want interiors made for them, not picked from a catalogue." },
  { title: "Builders & Developers", text: "A design and manufacturing partner that can take projects from drawings through production to installation." },
  { title: "Architects & Interior Designers", text: "A studio that understands design intent and has the factory to build it faithfully." },
] as const;

/** Hero copy shared by all four concepts. */
export const heroCopy = {
  eyebrow: "STELAARC — Architecture in Steel",
  lines: ["Not Just Designed.", "Considered."],
  intro: "Contemporary interiors shaped through design thinking, customization and in-house manufacturing.",
} as const;

export const studioIntro = {
  lead: "A design and manufacturing studio,",
  accent: "where every line is drawn, built and installed under one roof.",
} as const;

export const factoryStory = {
  title: "From the drawing board to",
  accent: "our own factory floor.",
  text: "Our in-house factory gives us control over every detail — so each piece is made to fit your space, your routine and your intent, not a catalogue.",
} as const;

/** Stainless steel is the structure; the visible finish follows the interior. */
export const materialStory = {
  title: "Steel inside.",
  accent: "Your finish outside.",
  text: "Every piece is built on a stainless-steel core, then finished in the colours and surfaces your interior calls for — so the structure lasts and the look is entirely yours.",
} as const;

export const processSteps = [
  { n: "01", t: "Listen", d: "We start with your space, your routines and your intent — and the practical constraints of the site." },
  { n: "02", t: "Design", d: "Layouts, materials and details are drawn specifically for your project and refined with you." },
  { n: "03", t: "Manufacture", d: "Each piece is produced in our in-house factory, where we control quality, finish and fit." },
  { n: "04", t: "Install", d: "Our own team installs on site, so what was designed is exactly what is delivered." },
] as const;

export const principles = [
  { t: "Customised", d: "Every piece is sized and configured for its specific space — never a standard module forced to fit." },
  { t: "Accountable", d: "One team carries the project from design through manufacturing to installation." },
  { t: "Practical", d: "Industry experience shapes designs that work as beautifully day-to-day as they look." },
] as const;

export const studioContact = {
  city: "Bengaluru, Karnataka",
  showroom: "Showroom coming soon",
  person: "Matthew",
  phone: "+91 77888 18999",
  tel: "+917788818999",
  email: "info@stelaarc.com",
} as const;
