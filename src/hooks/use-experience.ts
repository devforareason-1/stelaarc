import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState, type RefObject } from "react";
import { resolveExperience } from "@/lib/experiences";

/**
 * The active concept, read from the URL so the root-level header/footer and the
 * landing page always agree. Returns `active: false` on every page other than "/".
 */
export function useExperience() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const search = useRouterState({ select: (s) => s.location.search as Record<string, unknown> });
  const resolved = resolveExperience(search);
  const active = pathname === "/";
  return { ...resolved, active, full: active && resolved.full };
}

export function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > threshold);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [threshold]);
  return scrolled;
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Writes the element's scroll progress through the viewport (-1 → 1) to a CSS variable
 * `--p` on the element. No React re-renders; listener only does work while visible.
 */
export function useScrollProgressVar<T extends HTMLElement>(): RefObject<T | null> {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let visible = false;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
      el.style.setProperty("--p", Math.max(-1, Math.min(1, p)).toFixed(4));
    };
    const on = () => { if (visible && !raf) raf = requestAnimationFrame(update); };
    const io = new IntersectionObserver(([e]) => { visible = !!e?.isIntersecting; if (visible) on(); });
    io.observe(el);
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { io.disconnect(); cancelAnimationFrame(raf); window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, []);
  return ref;
}
