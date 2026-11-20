import { heroByExperience } from "@/components/heroes";
import { HomeSections } from "@/components/HomeSections";
import { Seam } from "@/components/site";
import { sectionsByExperience } from "@/components/experiences";
import { experiences, type ExperienceId, type PreviewMode } from "@/lib/experiences";

/**
 * Landing page for one concept. "hero" mode swaps only the hero over the stable
 * baseline page; "full" mode applies the concept's tokens and its own section set.
 * Keys force a clean remount of the hero/body on switch so effects & media are torn down.
 */
export function Landing({ experience, preview }: { experience: ExperienceId; preview: PreviewMode }) {
  const config = experiences[experience];
  const full = preview === "full";
  const Hero = heroByExperience[experience];
  const Body = full ? sectionsByExperience[experience] : HomeSections;
  return (
    <main data-experience={experience} data-preview={preview} className={`overflow-x-clip ${full ? `${config.className} bg-background text-foreground` : ""}`}>
      <Hero key={experience} />
      <Seam />
      <Body key={`${experience}-${preview}`} />
    </main>
  );
}
