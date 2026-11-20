import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useScrollProgressVar } from "@/hooks/use-experience";

export function useInView<T extends Element>(options: IntersectionObserverInit = { threshold: 0.15 }) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { setInView(true); io.disconnect(); } }, options);
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { ref, inView };
}

interface ImgProps { src: string; alt: string; className?: string; imgClassName?: string; style?: CSSProperties; imgStyle?: CSSProperties }

/** Image that wipes in (clip-path) once it enters the viewport. */
export function ClipReveal({ src, alt, className = "", imgClassName = "", style, imgStyle, axis = "y" }: ImgProps & { axis?: "x" | "y" }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  return (
    // Observe the unclipped wrapper: Chrome treats a fully clip-path'd target as never intersecting.
    <div ref={ref} style={style} className={`relative overflow-hidden ${className}`}>
      <div data-in={inView ? "" : undefined} className={`absolute inset-0 ${axis === "y" ? "clip-reveal" : "clip-reveal-x"}`}>
        <img src={src} alt={alt} loading="lazy" decoding="async" style={imgStyle} className={`h-full w-full object-cover ${imgClassName}`} />
      </div>
    </div>
  );
}

/** Image drifting slightly against scroll. `drift` is the max offset in px at the viewport edges. */
export function Parallax({ src, alt, className = "", imgClassName = "", drift = 60, zoom = 1.15, imgStyle }: ImgProps & { drift?: number; zoom?: number }) {
  const ref = useScrollProgressVar<HTMLDivElement>();
  return (
    <div ref={ref} className={`overflow-hidden ${/absolute/.test(className) ? "" : "relative"} ${className}`}>
      <img src={src} alt={alt} loading="lazy" decoding="async" className={`parallax h-full w-full object-cover ${imgClassName}`}
        style={{ ...imgStyle, ["--drift" as string]: `${drift}px`, ["--zoom" as string]: zoom }} />
    </div>
  );
}

export const pad = (n: number) => String(n).padStart(2, "0");
