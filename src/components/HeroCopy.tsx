import { Link } from "@tanstack/react-router";

export function Ctas({ center = false }: { center?: boolean }) {
  return (
    <div className={`rise flex flex-wrap gap-4 ${center ? "justify-center" : ""}`} style={{ animationDelay: "1900ms" }}>
      <Link to="/studio" className="btn-primary">Explore STELAARC <span aria-hidden>→</span></Link>
      <Link to="/enquire" className="btn-ghost">Start a Project</Link>
    </div>
  );
}

export function ScrollCue() {
  return (
    <a href="#intro" aria-label="Scroll down" className="rise absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3" style={{ animationDelay: "2300ms" }}>
      <span className="text-[9px] uppercase tracking-[0.4em] text-steel">Scroll</span>
      <span className="relative block h-12 w-px bg-steel/25 overflow-hidden"><span className="scroll-dot" /></span>
    </a>
  );
}
