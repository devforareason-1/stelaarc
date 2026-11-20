import type { ComponentType } from "react";
import type { ExperienceId } from "@/lib/experiences";
import { SiteFooter } from "@/components/site";
import { useExperience } from "@/hooks/use-experience";
import { ArchitecturalFooter, ArchitecturalSections } from "./Architectural";
import { CinematicFooter, CinematicSections } from "./Cinematic";
import { EditorialFooter, EditorialSections } from "./Editorial";
import { ImmersiveFooter, ImmersiveSections } from "./Immersive";

/** Below-the-hero page body for each concept in "Full Experience" mode. */
export const sectionsByExperience: Record<ExperienceId, ComponentType> = {
  architectural: ArchitecturalSections,
  cinematic: CinematicSections,
  editorial: EditorialSections,
  immersive: ImmersiveSections,
};

export const footerByExperience: Record<ExperienceId, ComponentType> = {
  architectural: ArchitecturalFooter,
  cinematic: CinematicFooter,
  editorial: EditorialFooter,
  immersive: ImmersiveFooter,
};


/** Root footer: the concept's own footer in Full Experience mode, the baseline footer everywhere else. */
export function ExperienceFooter() {
  const { full, config } = useExperience();
  const Footer = full ? footerByExperience[config.id] : SiteFooter;
  return <Footer />;
}
