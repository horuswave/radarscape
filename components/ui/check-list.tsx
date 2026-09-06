import type { ReactNode } from "react";
import { Icon } from "@/components/ui/icon";

export function CheckList({
  items,
  onDark = false,
  className = "",
  columns = 1,
}: {
  items: ReactNode[];
  onDark?: boolean;
  className?: string;
  columns?: 1 | 2;
}) {
  return (
    <ul
      className={`grid gap-x-8 gap-y-3.5 ${
        columns === 2 ? "sm:grid-cols-2" : ""
      } ${className}`}
    >
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
              onDark ? "bg-amber-400/20 text-amber-300" : "bg-amber-100 text-amber-700"
            }`}
          >
            <Icon name="check" size={13} strokeWidth={2.2} />
          </span>
          <span
            className={`text-[0.975rem] leading-relaxed ${
              onDark ? "text-navy-100" : "text-foreground"
            }`}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
