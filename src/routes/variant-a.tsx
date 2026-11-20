import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy hero-variant link: now one of the four concepts on the landing page.
export const Route = createFileRoute("/variant-a")({
  beforeLoad: () => {
    throw redirect({ to: "/", search: { experience: "architectural", preview: "hero" }, replace: true });
  },
});
