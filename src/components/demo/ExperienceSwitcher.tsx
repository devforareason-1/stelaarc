/**
 * Client-presentation toolbar. Deliberately styled outside the STELAARC design language
 * (system font, neutral glass) so it never reads as part of a proposal.
 * Shortcuts: 1–4 concept · M hero/full · H hide/show toolbar.
 */
import { useNavigate } from "@tanstack/react-router";
import { Check, Eye, EyeOff, Link2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { experienceIds, experienceList, experiences, type ExperienceId, type PreviewMode } from "@/lib/experiences";

const shell = "font-[system-ui,-apple-system,'Segoe_UI',sans-serif] text-[12px] text-white/70 antialiased";
const glass = "bg-[#0e0f11]/85 backdrop-blur-xl ring-1 ring-white/10 shadow-[0_18px_50px_-12px_rgb(0_0_0/0.65)]";
const chip = "rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-white/70";

export function ExperienceSwitcher({ experience, preview }: { experience: ExperienceId; preview: PreviewMode }) {
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(false);
  const [copied, setCopied] = useState(false);
  const [flash, setFlash] = useState<{ key: number; label: string } | null>(null);
  const radios = useRef<(HTMLButtonElement | null)[]>([]);

  const go = useCallback((e: ExperienceId, p: PreviewMode) => {
    if (e === experience && p === preview) return;
    // Jump (not smooth-scroll) to top so the new concept starts at its hero.
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    if (e !== experience) setFlash({ key: Date.now(), label: `${experiences[e].index} — ${experiences[e].label}` });
    void navigate({ to: "/", search: { experience: e, preview: p }, resetScroll: false });
  }, [experience, preview, navigate]);

  useEffect(() => {
    const on = (ev: KeyboardEvent) => {
      if (ev.metaKey || ev.ctrlKey || ev.altKey || ev.defaultPrevented) return;
      if (ev.target instanceof Element && ev.target.closest("input, textarea, select, [contenteditable='true']")) return;
      const k = ev.key.toLowerCase();
      if (k >= "1" && k <= "4") go(experienceIds[Number(k) - 1]!, preview);
      else if (k === "m") go(experience, preview === "full" ? "hero" : "full");
      else if (k === "h") setHidden((h) => !h);
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, [go, experience, preview]);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(t);
  }, [copied]);

  const onRadioKey = (ev: ReactKeyboardEvent, i: number) => {
    const d = ev.key === "ArrowRight" || ev.key === "ArrowDown" ? 1 : ev.key === "ArrowLeft" || ev.key === "ArrowUp" ? -1 : 0;
    if (!d) return;
    ev.preventDefault();
    const n = (i + d + experienceIds.length) % experienceIds.length;
    go(experienceIds[n]!, preview);
    radios.current[n]?.focus();
  };

  const copy = async () => {
    try { await navigator.clipboard.writeText(window.location.href); setCopied(true); } catch { /* clipboard unavailable — URL bar is already shareable */ }
  };

  const active = experiences[experience];

  return (
    <>
      {flash && (
        <div key={flash.key} aria-hidden className="pointer-events-none fixed inset-0 z-[70] grid place-items-center bg-[#0b0b0c] [animation:exp-veil_.75s_cubic-bezier(.4,0,.2,1)_.12s_forwards] motion-reduce:hidden" onAnimationEnd={(e) => { if (e.target === e.currentTarget) setFlash(null); }}>
          <span className={`${shell} text-[11px] uppercase tracking-[0.5em] text-white/80 [animation:exp-label_.85s_ease_forwards]`}>{flash.label}</span>
        </div>
      )}
      <p className="sr-only" aria-live="polite">{`Showing concept ${active.index}, ${active.label}, ${preview === "full" ? "full experience" : "hero only"}.`}</p>

      {hidden ? (
        <button type="button" onClick={() => setHidden(false)} aria-label="Show presentation controls (H)" title="Show presentation controls (H)"
          className={`${shell} ${glass} ${chip} fixed z-[60] bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 grid h-10 w-10 place-items-center opacity-40 hover:opacity-100 focus-visible:opacity-100`}>
          <Eye className="h-4 w-4" aria-hidden />
        </button>
      ) : (
        <div className={`${shell} fixed z-[60] inset-x-0 bottom-[max(0.75rem,env(safe-area-inset-bottom))] flex flex-col items-center gap-2 px-3 pointer-events-none`}>
          <p className={`${glass} lg:hidden rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/80`}>
            {active.index} {active.label} <span className="text-white/40">· from {active.hero}</span>
          </p>
          <div role="toolbar" aria-label="Concept presentation controls" className={`${glass} pointer-events-auto flex max-w-full items-center gap-1 rounded-full p-1`}>
            <span className="hidden xl:flex items-center gap-2 pl-3 pr-2 text-[10px] uppercase tracking-[0.22em] text-white/45">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />Concepts
            </span>
            <div role="radiogroup" aria-label="Website concept" className="flex items-center">
              {experienceList.map((x, i) => {
                const on = x.id === experience;
                return (
                  <button key={x.id} ref={(el) => { radios.current[i] = el; }} type="button" role="radio" aria-checked={on} tabIndex={on ? 0 : -1}
                    title={`${x.label} — ${x.mood} (from the ${x.hero} hero) · key ${i + 1}`}
                    onClick={() => go(x.id, preview)} onKeyDown={(e) => onRadioKey(e, i)}
                    className={`${chip} flex h-9 items-center gap-2 px-3 ${on ? "bg-white text-[#0e0f11]" : "hover:bg-white/10 hover:text-white"}`}>
                    <span className="tabular-nums font-medium">{x.index}</span>
                    <span className="hidden lg:inline">{x.label}</span>
                  </button>
                );
              })}
            </div>
            <span aria-hidden className="mx-1 h-5 w-px bg-white/15" />
            <div role="radiogroup" aria-label="Preview mode" className="flex items-center rounded-full bg-white/5 p-0.5">
              {(["hero", "full"] as const).map((m) => {
                const on = m === preview;
                return (
                  <button key={m} type="button" role="radio" aria-checked={on} onClick={() => go(experience, m)} title={`${m === "full" ? "Full experience" : "Hero only"} · key M`}
                    className={`${chip} h-8 px-3 ${on ? "bg-white/90 text-[#0e0f11]" : "hover:text-white"}`}>
                    {m === "full" ? "Full" : "Hero"}<span className="hidden sm:inline">{m === "full" ? " page" : " only"}</span>
                  </button>
                );
              })}
            </div>
            <span aria-hidden className="mx-1 h-5 w-px bg-white/15" />
            <button type="button" onClick={copy} aria-label={copied ? "Link copied" : "Copy link to this concept"} title="Copy shareable link"
              className={`${chip} grid h-9 w-9 place-items-center hover:bg-white/10 hover:text-white`}>
              {copied ? <Check className="h-4 w-4 text-emerald-300" aria-hidden /> : <Link2 className="h-4 w-4" aria-hidden />}
            </button>
            <button type="button" onClick={() => setHidden(true)} aria-label="Hide presentation controls (H)" title="Clean preview (H)"
              className={`${chip} grid h-9 w-9 place-items-center hover:bg-white/10 hover:text-white`}>
              <EyeOff className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
