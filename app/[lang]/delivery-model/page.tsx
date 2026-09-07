import type { Metadata } from "next";
import { getDictionary } from "../dictionaries";
import { buildMetadata } from "../seo";
import { isLocale, type Locale } from "@/lib/i18n";
import { routes, withLocale } from "@/lib/navigation";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/primitives";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { Icon, type IconName } from "@/components/ui/icon";
import { CheckList } from "@/components/ui/check-list";
import { CtaBanner } from "@/components/ui/cta-banner";
import { Reveal } from "@/components/ui/reveal";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/delivery-model">): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata(isLocale(lang) ? lang : "en", "deliveryModel");
}

export default async function DeliveryModelPage({
  params,
}: PageProps<"/[lang]/delivery-model">) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const dict = await getDictionary(locale);
  const t = dict.deliveryModel;

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        breadcrumbs={[{ key: "deliveryModel", label: dict.nav.deliveryModel }]}
        homeLabel={dict.nav.home}
        breadcrumbLabel={dict.a11y.breadcrumb}
        photo="terminal"
      />

      {/* Group strength */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <Eyebrow>{t.groupStrength.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
              {t.groupStrength.title}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              {t.groupStrength.body}
            </p>
            <div className="mt-8">
              <CheckList items={t.groupStrength.points} />
            </div>
          </Reveal>
          <Reveal
            delay={1}
            className="self-center rounded-xl border border-hairline bg-surface p-8"
          >
            <p className="rs-eyebrow mb-5">{t.groupStrength.translatesToTitle}</p>
            <CheckList items={t.groupStrength.translatesTo} />
          </Reveal>
        </div>
      </Section>

      {/* Delivery model blocks */}
      <Section tone="surface">
        <SectionHeading
          eyebrow={t.model.eyebrow}
          title={t.model.title}
          intro={t.model.body}
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {t.model.blocks.map((block, i) => (
            <Reveal
              key={block.title}
              delay={i}
              className="flex flex-col rounded-xl border border-hairline bg-white p-7"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy-700 text-amber-400">
                <Icon name={block.icon as IconName} size={24} />
              </span>
              <h3 className="mt-5 text-lg font-bold leading-snug text-navy-900">
                {block.title}
              </h3>
              <div className="mt-5 border-t border-hairline pt-5">
                <CheckList items={block.points} />
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-12">
          <Button
            href={withLocale(routes.whyRadarscape.path, locale)}
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
