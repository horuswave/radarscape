import type { Metadata } from "next";
import { getDictionary } from "../dictionaries";
import { buildMetadata } from "../seo";
import { isLocale, type Locale } from "@/lib/i18n";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/primitives";
import { PageHero } from "@/components/ui/page-hero";
import { Icon } from "@/components/ui/icon";
import { CheckList } from "@/components/ui/check-list";
import { CtaBanner } from "@/components/ui/cta-banner";
import { Reveal } from "@/components/ui/reveal";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/why-radarscape">): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata(isLocale(lang) ? lang : "en", "whyRadarscape");
}

export default async function WhyRadarscapePage({
  params,
}: PageProps<"/[lang]/why-radarscape">) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const dict = await getDictionary(locale);
  const t = dict.whyRadarscape;

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        breadcrumbs={[{ key: "whyRadarscape", label: dict.nav.whyRadarscape }]}
        homeLabel={dict.nav.home}
        breadcrumbLabel={dict.a11y.breadcrumb}
        photo="port"
      />

      {/* Strategic advantage */}
      <Section>
        <SectionHeading eyebrow={t.hero.eyebrow} title={dict.home.advantage.title} />
        <ol className="mt-14 grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {t.advantages.map((adv, i) => (
            <Reveal
              as="li"
              key={adv}
              delay={i % 2}
              className="flex gap-5 border-t border-hairline pt-6"
            >
              <span className="font-display text-lg font-extrabold tabular-nums text-amber-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-[1.05rem] leading-relaxed text-foreground">{adv}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Market position */}
      <Section tone="navy">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <Eyebrow onDark>{dict.nav.whyRadarscape}</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {t.marketPosition.title}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-navy-100">
              {t.marketPosition.body}
            </p>
            <div className="mt-8">
              <p className="rs-eyebrow mb-4" data-on-dark>
                {t.marketPosition.focusTitle}
              </p>
              <CheckList items={t.marketPosition.focusAreas} onDark />
            </div>
          </Reveal>
          <Reveal
            delay={1}
            className="self-center rounded-xl border border-white/10 bg-navy-800/50 p-8"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500 text-ink">
                <Icon name="growth" size={20} />
              </span>
              <p className="rs-eyebrow" data-on-dark>
                {t.marketPosition.growthTitle}
              </p>
            </div>
            <ol className="mt-6 flex flex-col gap-4">
              {t.marketPosition.growth.map((g, i) => (
                <li key={g} className="flex gap-4">
                  <span className="font-display text-sm font-bold tabular-nums text-amber-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.975rem] leading-relaxed text-navy-100">
                    {g}
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Section>

      <CtaBanner
        locale={locale}
        eyebrow={dict.contact.hero.eyebrow}
        title={dict.home.closing.title}
        body={dict.home.closing.body}
        ctaLabel={t.cta}
      />
    </>
  );
}
