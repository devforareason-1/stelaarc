import { createFileRoute } from "@tanstack/react-router";
import { ExperienceSwitcher } from "@/components/demo/ExperienceSwitcher";
import { Landing } from "@/components/Landing";
import { meta } from "@/components/site";
import { resolveExperience, validateExperienceSearch } from "@/lib/experiences";

// ?experience=architectural|cinematic|editorial|immersive & preview=full|hero — invalid values fall back to defaults.
export const Route = createFileRoute("/")({
  validateSearch: validateExperienceSearch,
  head: () => ({ meta: meta("STELAARC — Architecture in Steel | Bengaluru", "Design and manufacturing studio in Bengaluru crafting modular kitchens, wardrobes and full-home interiors from our in-house factory.") }),
  component: Index,
});

function Index() {
  const { config, preview } = resolveExperience(Route.useSearch());
  return (
    <>
      <Landing experience={config.id} preview={preview} />
      <ExperienceSwitcher experience={config.id} preview={preview} />
    </>
  );
}
