import type { Metadata } from "next";
import { getDictionary } from "../dictionaries";
import { buildMetadata } from "../seo";
import { isLocale, type Locale } from "@/lib/i18n";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { PageHero } from "@/components/ui/page-hero";
import { CheckList } from "@/components/ui/check-list";
import { CtaBanner } from "@/components/ui/cta-banner";
import { Reveal } from "@/components/ui/reveal";
import { ProjectVisual } from "@/components/ui/project-visual";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/projects">): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata(isLocale(lang) ? lang : "en", "projects");
}

export default async function ProjectsPage({
  params,
}: PageProps<"/[lang]/projects">) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const dict = await getDictionary(locale);
  const t = dict.projects;

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        breadcrumbs={[{ key: "projects", label: dict.nav.projects }]}
        homeLabel={dict.nav.home}
        breadcrumbLabel={dict.a11y.breadcrumb}
      />

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((item, i) => (
            <Reveal
              as="article"
              key={item.name}
              delay={i % 3}
              className="group flex flex-col overflow-hidden rounded-xl border border-hairline bg-white transition-shadow hover:shadow-(--shadow-card)"
            >
              <ProjectVisual index={i + 1} className="aspect-16/10" />
              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-[1.05rem] font-bold leading-snug text-navy-900">
                  {item.name}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {item.caption}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-hairline bg-sand-50 px-2.5 py-1 font-display text-[0.7rem] font-semibold uppercase tracking-wide text-navy-600"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="navy">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <SectionHeading
            onDark
            eyebrow={dict.nav.projects}
            title={t.demonstrates.title}
          />
          <Reveal className="self-center">
            <CheckList items={t.demonstrates.points} onDark />
          </Reveal>
        </div>
      </Section>

      <CtaBanner
        locale={locale}
        eyebrow={dict.contact.hero.eyebrow}
        title={dict.contact.hero.title}
        body={dict.home.closing.body}
        ctaLabel={t.cta}
      />
    </>
  );
}
