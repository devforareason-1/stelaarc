# STELAARC — project notes

Marketing site + client demo for STELAARC (Architecture in Steel), a Bengaluru stainless-steel interiors design & manufacturing studio. Also read `AGENTS.md` (Lovable rules: no hand-edited migrations/generated files, no history rewrites).

## Stack
TanStack Start (React 19, file routes, SSR) · Tailwind v4 (config lives in `src/styles.css`) · Vite via `@lovable.dev/vite-tanstack-config` · Vitest.
Logo + hero film are Lovable-hosted (`src/assets/*.asset.json` → `/__l5e/...`); they 404 on a plain local dev server — expected.

## Commands
- `npm run dev -- --port 5321 --host 127.0.0.1` (5180 is often taken by another local project)
- `npx tsc --noEmit -p .` · `npm test` · `npm run build`
- Deploy: `npm run deploy` → Cloudflare Worker `stelaarc` at https://stelaarc.preview.forareason.in (needs `npx wrangler login`). Compatibility date is pinned in the script because nitro stamps the local (IST) date, which Cloudflare rejects as "in the future" while UTC is still a day behind.
- Lint: the codebase is intentionally not Prettier-formatted; check real issues with `npx eslint src --rule "prettier/prettier: off"`.

## Concept showcase (landing page "/")
Four art directions, each grown from one original hero:

| id | label | hero (`src/components/heroes.tsx`) | tone |
|---|---|---|---|
| architectural | 01 Architectural | ShutterHero (was /variant-a) | light ivory, Manrope light |
| cinematic (default) | 02 Cinematic | FilmHero (original main) | near-black, Cormorant |
| editorial | 03 Editorial | WindowHero (was /variant-b) | paper/ink, Instrument Serif + Inter Tight |
| immersive | 04 Immersive | LightHero (was /variant-c) | warm graphite + champagne |

- URL is the single source of truth: `/?experience=<id>&preview=full|hero` (`validateSearch` in `src/routes/index.tsx`; defaults cinematic/full). Always resolve via `resolveExperience()` — TanStack merges raw root search into child routes, so `useSearch()` can carry invalid values.
- `/variant-a|b|c` redirect to the matching concept in hero mode.
- `preview=hero` → concept hero + baseline `HomeSections` + baseline header/footer (respects the user light/dark toggle). `preview=full` → concept tokens + its own sections, header style and footer.
- Registry/identity: `src/lib/experiences.ts`. Palettes/fonts/button shape: `.exp-<id>` blocks in `src/styles.css` (palette only applies where the element is not `.dark`, so light concepts can flip the header dark over the hero).
- Sections + footers per concept: `src/components/experiences/{Architectural,Cinematic,Editorial,Immersive}.tsx`; mapping + `ExperienceFooter` in `experiences/index.tsx`; header variants (`ExperienceHeader`, keyed by `config.nav`) in `src/components/site.tsx`. Header/footer read the concept from the URL via `useExperience()`.
- Demo toolbar: `src/components/demo/ExperienceSwitcher.tsx` (only on "/"). Keys: 1–4 concept, M hero/full, H hide/show.
- Shared factual copy lives in `src/lib/content.ts` — never invent facts, stats, testimonials or projects.

## Conventions / decisions
- Motion: scroll/mouse effects write styles via refs in rAF (no per-frame React state); pause off-screen; honour `prefers-reduced-motion` (CSS also zeroes animation delays).
- `ClipReveal` observes an unclipped wrapper — Chrome never reports a fully clip-path'd target as intersecting.
- Section transitions (all pages): put `<Seam />` after any dark hero; use `blend-y` instead of `bg-card` for tinted/dark-island bands. Both fade to `--page`, which only html/concept roots set — so nested `.dark` islands still blend into a light page.
- Only the active hero renders, so alternative hero videos are never downloaded.
- Avoid Tailwind `dark:` variants inside concept components (html `.dark` reflects the user theme, not the concept); use tokens or `FullLogo tone=`.
