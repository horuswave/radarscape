import type { Metadata } from "next";
import { getDictionary } from "../../dictionaries";
import { buildMetadata } from "../../seo";
import { isLocale, type Locale } from "@/lib/i18n";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { PageHero } from "@/components/ui/page-hero";
import { Icon, type IconName } from "@/components/ui/icon";
import { CheckList } from "@/components/ui/check-list";
import { CtaBanner } from "@/components/ui/cta-banner";
import { Reveal } from "@/components/ui/reveal";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/capabilities/hseq">): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata(isLocale(lang) ? lang : "en", "hseq");
}

export default async function HseqPage({
  params,
}: PageProps<"/[lang]/capabilities/hseq">) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const dict = await getDictionary(locale);
  const t = dict.hseq;

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        subtitle={t.hero.intro}
        breadcrumbs={[
          { key: "capabilities", label: dict.nav.capabilities },
          { key: "hseq", label: dict.nav.hseq },
        ]}
        homeLabel={dict.nav.home}
        breadcrumbLabel={dict.a11y.breadcrumb}
        photo="site-team"
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {t.pillars.map((pillar, i) => (
            <Reveal
              key={pillar.title}
              delay={i}
              className="flex flex-col rounded-xl border border-hairline bg-white p-7"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-hairline text-navy-700">
                <Icon name={pillar.icon as IconName} size={24} />
              </span>
              <h2 className="mt-5 text-lg font-bold leading-snug text-navy-900">
                {pillar.title}
              </h2>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="ink">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            onDark
            eyebrow={dict.nav.hseq}
            title={t.forClientsTitle}
          />
          <Reveal className="self-center">
            <CheckList items={t.forClients} onDark />
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
