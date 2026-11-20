import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy hero-variant link: now one of the four concepts on the landing page.
export const Route = createFileRoute("/variant-c")({
  beforeLoad: () => {
    throw redirect({ to: "/", search: { experience: "immersive", preview: "hero" }, replace: true });
  },
});
