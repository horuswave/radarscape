import type { Metadata } from "next";
import { getDictionary } from "../dictionaries";
import { buildMetadata } from "../seo";
import { isLocale, type Locale } from "@/lib/i18n";
import { routes, withLocale } from "@/lib/navigation";
import {
  Section,
  SectionHeading,
  Eyebrow,
} from "@/components/ui/primitives";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { Icon, type IconName } from "@/components/ui/icon";
import { CheckList } from "@/components/ui/check-list";
import { CtaBanner } from "@/components/ui/cta-banner";
import { Reveal } from "@/components/ui/reveal";
import { Photo } from "@/components/ui/photo";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata(isLocale(lang) ? lang : "en", "about");
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const dict = await getDictionary(locale);
  const t = dict.about;

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        breadcrumbs={[{ key: "about", label: dict.nav.about }]}
        homeLabel={dict.nav.home}
        breadcrumbLabel={dict.a11y.breadcrumb}
        photo="structure"
      />

      {/* Snapshot */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <Reveal>
            <SectionHeading title={t.snapshot.title} titleAs="h2" />
          </Reveal>
          <Reveal delay={1} className="flex flex-col gap-5">
            {t.snapshot.body.map((para, i) => (
              <p
                key={i}
                className={`leading-relaxed ${
                  i === 0 ? "text-lg text-foreground" : "text-muted"
                }`}
              >
                {para}
              </p>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* Corporate snapshot */}
      <Section tone="surface">
        <SectionHeading eyebrow={dict.nav.about} title={t.corporate.title} />
        <div className="mt-12 overflow-hidden rounded-xl border border-hairline bg-white">
          <dl className="divide-y divide-hairline">
            {t.corporate.rows.map((row) => (
              <div
                key={row.item}
                className="grid gap-1 px-6 py-4 sm:grid-cols-[240px_1fr] sm:gap-6 sm:py-5"
              >
                <dt className="font-display text-sm font-semibold uppercase tracking-wide text-navy-600">
                  {row.item}
                </dt>
                <dd className="text-[0.975rem] text-foreground">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* Vision & Mission */}
      <section className="bg-navy-700 py-20 text-white sm:py-24">
        <div className="rs-container grid gap-6 md:grid-cols-2">
          {[
            { label: t.visionMission.visionLabel, body: t.visionMission.vision, icon: "compass" as IconName },
            { label: t.visionMission.missionLabel, body: t.visionMission.mission, icon: "delivery" as IconName },
          ].map((block) => (
            <Reveal
              key={block.label}
              className="rounded-xl border border-white/10 bg-navy-800/60 p-8"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500 text-ink">
                <Icon name={block.icon} size={24} />
              </span>
              <h2 className="mt-5 rs-eyebrow" data-on-dark>
                {block.label}
              </h2>
              <p className="mt-3 text-xl font-medium leading-snug text-white">
                {block.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Core values */}
      <Section>
        <SectionHeading eyebrow={t.values.eyebrow} title={t.values.title} />
        <ul className="mt-14 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {t.values.items.map((value, i) => (
            <Reveal as="li" key={value.title} delay={i % 3} className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-hairline text-navy-700">
                <Icon name={value.icon as IconName} size={22} />
              </span>
              <span className="pt-2 text-[1.05rem] font-semibold text-navy-900">
                {value.title}
              </span>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Team */}
      <Section tone="surface">
        <Reveal className="relative mb-12 aspect-video overflow-hidden rounded-xl border border-hairline sm:aspect-21/9">
          <Photo
            name="site-team"
            alt={t.team.title}
            overlay="bottom"
            sizes="(min-width: 1200px) 1140px, 100vw"
          />
        </Reveal>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <Eyebrow>{t.team.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
              {t.team.title}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">{t.team.body}</p>
            <div className="mt-8">
              <Button
                href={withLocale(routes.deliveryModel.path, locale)}
                variant="secondary"
                withArrow
              >
                {t.team.cta}
              </Button>
            </div>
          </Reveal>
          <Reveal delay={1} className="flex flex-col gap-8 rounded-xl border border-hairline bg-white p-8">
            <CheckList items={t.team.roles} />
            <div className="border-t border-hairline pt-6">
              <p className="rs-eyebrow mb-4">{t.team.reinforcedByTitle}</p>
              <CheckList items={t.team.reinforcedBy} />
            </div>
          </Reveal>
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
