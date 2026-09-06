import type { ElementType, ReactNode } from "react";

/* -------------------------------------------------------------------------- */
/*  Container                                                                  */
/* -------------------------------------------------------------------------- */

export function Container({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return <Tag className={`rs-container ${className}`}>{children}</Tag>;
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                    */
/* -------------------------------------------------------------------------- */

type Tone = "default" | "surface" | "navy" | "ink";

const toneClasses: Record<Tone, string> = {
  default: "bg-background text-foreground",
  surface: "bg-surface text-foreground",
  navy: "bg-navy-700 text-navy-50",
  ink: "bg-ink text-sand-100",
};

export function Section({
  children,
  tone = "default",
  className = "",
  containerClassName = "",
  id,
  bleedTop = false,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  id?: string;
  /** Remove the top padding so the section can butt against a hero. */
  bleedTop?: boolean;
}) {
  return (
    <section
      id={id}
      className={`${toneClasses[tone]} ${
        bleedTop ? "pb-16 sm:pb-24" : "py-16 sm:py-24"
      } ${className}`}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Eyebrow                                                                    */
/* -------------------------------------------------------------------------- */

export function Eyebrow({
  children,
  onDark = false,
  className = "",
}: {
  children: ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <span className={`rs-eyebrow ${className}`} data-on-dark={onDark || undefined}>
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section heading                                                            */
/* -------------------------------------------------------------------------- */

export function SectionHeading({
  eyebrow,
  title,
  intro,
  onDark = false,
  align = "left",
  className = "",
  titleAs: TitleTag = "h2",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  onDark?: boolean;
  align?: "left" | "center";
  className?: string;
  titleAs?: ElementType;
}) {
  return (
    <div
      className={`flex flex-col gap-4 ${
        align === "center" ? "items-center text-center mx-auto max-w-3xl" : "max-w-3xl"
      } ${className}`}
    >
      {eyebrow ? <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow> : null}
      <TitleTag
        className={`text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08] ${
          onDark ? "text-white" : "text-navy-900"
        }`}
      >
        {title}
      </TitleTag>
      {intro ? (
        <p
          className={`text-lg leading-relaxed ${
            onDark ? "text-navy-100" : "text-muted"
          }`}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Stat                                                                       */
/* -------------------------------------------------------------------------- */

export function Stat({
  value,
  label,
  onDark = false,
}: {
  value: ReactNode;
  label: ReactNode;
  onDark?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={`font-display text-2xl font-extrabold leading-tight tracking-tight wrap-break-word sm:text-[1.75rem] ${
          onDark ? "text-white" : "text-navy-800"
        }`}
      >
        {value}
      </div>
      <div
        className={`h-px w-8 ${onDark ? "bg-amber-400" : "bg-amber-500"}`}
        aria-hidden
      />
      <div
        className={`text-sm leading-snug ${
          onDark ? "text-navy-100" : "text-muted"
        }`}
      >
        {label}
      </div>
    </div>
  );
}
