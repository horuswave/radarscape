import Image from "next/image";
import type { ReactNode } from "react";

/** Photo names available in `public/photos`. */
export type PhotoName =
  | "road-corridor"
  | "solar-aerial"
  | "earthworks"
  | "site-team"
  | "structure"
  | "port"
  | "terminal"
  | "facilities"
  | "construction-aerial"
  | "engineering"
  | "bim";

type Overlay = "none" | "navy" | "navy-strong" | "hero" | "ink" | "bottom";

const overlays: Record<Overlay, string> = {
  none: "",
  navy: "bg-linear-to-br from-navy-950/82 via-navy-900/62 to-navy-950/85",
  "navy-strong": "bg-navy-950/80",
  // strong, text-side-weighted: keeps left copy legible over any photo
  hero: "bg-linear-to-r from-navy-950/92 from-10% via-navy-950/72 to-navy-900/45",
  ink: "bg-linear-to-t from-ink/90 via-ink/55 to-ink/30",
  bottom: "bg-linear-to-t from-navy-950/88 via-navy-950/25 to-transparent",
};

/**
 * Cover photo that fills its (positioned) parent. Real project photography from
 * the Radarscape profile plus context-matched stock; see photos/CREDITS.md.
 */
export function Photo({
  name,
  alt,
  priority = false,
  overlay = "none",
  sizes = "100vw",
  className = "",
  children,
}: {
  name: PhotoName;
  alt: string;
  priority?: boolean;
  overlay?: Overlay;
  sizes?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <Image
        src={`/photos/${name}.jpg`}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
      {overlay !== "none" ? (
        <div className={`absolute inset-0 ${overlays[overlay]}`} aria-hidden />
      ) : null}
      {children}
    </div>
  );
}
