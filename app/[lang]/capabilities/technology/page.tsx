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
}: PageProps<"/[lang]/capabilities/technology">): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata(isLocale(lang) ? lang : "en", "technology");
}

export default async function TechnologyPage({
  params,
}: PageProps<"/[lang]/capabilities/technology">) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const dict = await getDictionary(locale);
  const t = dict.technology;

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        subtitle={t.hero.intro}
        breadcrumbs={[
          { key: "capabilities", label: dict.nav.capabilities },
          { key: "technology", label: dict.nav.technology },
        ]}
        homeLabel={dict.nav.home}
        breadcrumbLabel={dict.a11y.breadcrumb}
        photo="bim"
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {t.items.map((item, i) => (
            <Reveal
              as="article"
              key={item.title}
              delay={i}
              className="flex flex-col rounded-xl border border-hairline bg-white p-8"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy-700 text-amber-400">
                <Icon name={item.icon as IconName} size={24} />
              </span>
              <h2 className="mt-5 text-xl font-bold text-navy-900">{item.title}</h2>
              <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="navy">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            onDark
            eyebrow={dict.nav.technology}
            title={t.benefitsTitle}
          />
          <Reveal className="self-center">
            <CheckList items={t.benefits} onDark columns={1} />
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
