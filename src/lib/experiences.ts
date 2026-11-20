/**
 * Central registry for the four landing-page concepts shown in the client demo.
 * Visual tokens live in styles.css under `.exp-<id>`; this file holds identity + behaviour.
 */
export const experienceIds = ["architectural", "cinematic", "editorial", "immersive"] as const;
export type ExperienceId = (typeof experienceIds)[number];

export const previewModes = ["full", "hero"] as const;
export type PreviewMode = (typeof previewModes)[number];

export type NavStyle = "minimal" | "cinematic" | "masthead" | "floating";

export interface ExperienceConfig {
  id: ExperienceId;
  index: string;
  label: string;
  /** Name of the original hero concept this direction grew from. */
  hero: string;
  mood: string;
  /** Overall page tone — decides logo colour and whether the header goes dark over the hero. */
  tone: "light" | "dark";
  nav: NavStyle;
  className: `exp-${ExperienceId}`;
}

export const experiences: Record<ExperienceId, ExperienceConfig> = {
  architectural: { id: "architectural", index: "01", label: "Architectural", hero: "Steel Shutters", mood: "Quiet luxury", tone: "light", nav: "minimal", className: "exp-architectural" },
  cinematic: { id: "cinematic", index: "02", label: "Cinematic", hero: "Film", mood: "Dark & dramatic", tone: "dark", nav: "cinematic", className: "exp-cinematic" },
  editorial: { id: "editorial", index: "03", label: "Editorial", hero: "Window in Steel", mood: "Design-forward", tone: "light", nav: "masthead", className: "exp-editorial" },
  immersive: { id: "immersive", index: "04", label: "Immersive", hero: "Light Study", mood: "Tactile & material", tone: "dark", nav: "floating", className: "exp-immersive" },
};

export const experienceList = experienceIds.map((id) => experiences[id]);

export const DEFAULT_EXPERIENCE: ExperienceId = "cinematic";
export const DEFAULT_PREVIEW: PreviewMode = "full";

export const isExperience = (v: unknown): v is ExperienceId => typeof v === "string" && (experienceIds as readonly string[]).includes(v);
export const isPreview = (v: unknown): v is PreviewMode => typeof v === "string" && (previewModes as readonly string[]).includes(v);

export interface ExperienceSearch {
  experience?: ExperienceId;
  preview?: PreviewMode;
}

/** validateSearch for "/": unknown or invalid values are dropped, never thrown. */
export function validateExperienceSearch(search: Record<string, unknown>): ExperienceSearch {
  const out: ExperienceSearch = {};
  const rawE = search["experience"], rawP = search["preview"];
  const e = typeof rawE === "string" ? rawE.toLowerCase() : rawE;
  const p = typeof rawP === "string" ? rawP.toLowerCase() : rawP;
  if (isExperience(e)) out.experience = e;
  if (isPreview(p)) out.preview = p;
  return out;
}

/**
 * Always re-validates: TanStack merges the root's raw search into child routes, so
 * `useSearch()` can still carry unvalidated values (e.g. ?experience=neon).
 */
export function resolveExperience(search: Record<string, unknown> | undefined) {
  const valid = validateExperienceSearch(search ?? {});
  const config = experiences[valid.experience ?? DEFAULT_EXPERIENCE];
  const preview = valid.preview ?? DEFAULT_PREVIEW;
  return { config, preview, full: preview === "full" };
}
