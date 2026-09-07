import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "../dictionaries";
import { buildMetadata } from "../seo";
import { isLocale, type Locale } from "@/lib/i18n";
import { routes, withLocale } from "@/lib/navigation";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { Icon, type IconName } from "@/components/ui/icon";
import { CheckList } from "@/components/ui/check-list";
import { CtaBanner } from "@/components/ui/cta-banner";
import { Reveal } from "@/components/ui/reveal";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/capabilities">): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata(isLocale(lang) ? lang : "en", "capabilities");
}

export default async function CapabilitiesPage({
  params,
}: PageProps<"/[lang]/capabilities">) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const dict = await getDictionary(locale);
  const t = dict.capabilities;

  const subRoute = { technology: routes.technology, hseq: routes.hseq } as const;

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        breadcrumbs={[{ key: "capabilities", label: dict.nav.capabilities }]}
        homeLabel={dict.nav.home}
        breadcrumbLabel={dict.a11y.breadcrumb}
        photo="engineering"
      />

      {/* Capability cards */}
      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          {t.cards.map((card, i) => (
            <Reveal
              as="article"
              key={card.key}
              id={card.anchor}
              delay={i % 2}
              className="scroll-mt-28 flex flex-col rounded-xl border border-hairline bg-white p-8 transition-shadow hover:shadow-(--shadow-card)"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-navy-700 text-amber-400">
                  <Icon name={card.icon as IconName} size={24} />
                </span>
                <h2 className="pt-1.5 text-xl font-bold leading-snug text-navy-900">
                  {card.title}
                </h2>
              </div>
              <div className="mt-6 border-t border-hairline pt-6">
                <CheckList items={card.points} />
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Specialist assurance sub-nav */}
      <Section tone="surface">
        <SectionHeading eyebrow={dict.nav.capabilities} title={t.subnav.title} />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {t.subnav.items.map((item) => (
            <Reveal
              key={item.key}
              className="group rounded-xl border border-hairline bg-white p-8 transition-shadow hover:shadow-(--shadow-card)"
            >
              <Link
                href={withLocale(subRoute[item.key as "technology" | "hseq"].path, locale)}
                className="flex h-full flex-col"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-hairline text-navy-700">
                  <Icon name={item.icon as IconName} size={24} />
                </span>
                <h3 className="mt-5 text-lg font-bold text-navy-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.975rem] leading-relaxed text-muted">
                  {item.blurb}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold text-navy-700 transition-colors group-hover:text-amber-600">
                  {dict.common.cta.seeInAction}
                  <Icon
                    name="arrowRight"
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <Button
            href={withLocale(routes.projects.path, locale)}
            variant="secondary"
            withArrow
          >
            {t.cta}
          </Button>
        </div>
      </Section>

      <CtaBanner
        locale={locale}
        eyebrow={dict.contact.hero.eyebrow}
        title={dict.home.closing.title}
        body={dict.home.closing.body}
        ctaLabel={dict.common.cta.contactUs}
      />
    </>
  );
}
