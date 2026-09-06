import { RadarMotif, TopoMotif } from "@/components/ui/motif";

/**
 * Brand-driven placeholder visual for project cards. No stock photography is
 * used — the identity system (surveyed terrain + radar sweep) stands in for
 * imagery we do not have rights to.
 */
export function ProjectVisual({
  index,
  className = "",
}: {
  index: number;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-navy-700 via-navy-800 to-navy-950 ${className}`}
    >
      <div
        className="rs-grid-texture absolute inset-0 opacity-50"
        data-on-dark
        aria-hidden
      />
      <RadarMotif className="absolute -bottom-16 -right-12 h-56 w-56 text-amber-400/50" />
      <TopoMotif className="absolute inset-x-0 bottom-0 h-2/3 w-full text-white/15" />
      <span className="absolute left-4 top-4 font-display text-[0.7rem] font-semibold tracking-[0.25em] text-amber-300">
        {String(index).padStart(2, "0")}
      </span>
      <span
        className="absolute inset-0 ring-1 ring-inset ring-white/10"
        aria-hidden
      />
    </div>
  );
}
