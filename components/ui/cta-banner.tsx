import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import { routes, withLocale } from "@/lib/navigation";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { RadarMotif } from "@/components/ui/motif";
import { Reveal } from "@/components/ui/reveal";

export function CtaBanner({
  locale,
  eyebrow,
  title,
  body,
  ctaLabel,
  href,
}: {
  locale: Locale;
  eyebrow?: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  ctaLabel: string;
  href?: string;
}) {
  return (
    <section className="bg-background py-20 sm:py-24">
      <Container>
        <Reveal className="relative overflow-hidden rounded-xl bg-navy-700 px-6 py-14 text-white sm:px-14 sm:py-16">
          <RadarMotif className="pointer-events-none absolute -bottom-28 -right-16 h-110 w-110 text-amber-400/45" />
          <div className="relative max-w-2xl">
            {eyebrow ? <Eyebrow onDark>{eyebrow}</Eyebrow> : null}
            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
              {title}
            </h2>
            {body ? (
              <p className="mt-4 text-lg leading-relaxed text-navy-100">{body}</p>
            ) : null}
            <div className="mt-8">
              <Button
                href={href ?? withLocale(routes.contact.path, locale)}
                variant="primary"
                size="lg"
                withArrow
              >
                {ctaLabel}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
