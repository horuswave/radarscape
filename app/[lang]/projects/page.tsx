import type { Metadata } from "next";
import { getDictionary } from "../dictionaries";
import { buildMetadata } from "../seo";
import { isLocale, type Locale } from "@/lib/i18n";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { PageHero } from "@/components/ui/page-hero";
import { CheckList } from "@/components/ui/check-list";
import { CtaBanner } from "@/components/ui/cta-banner";
import { Reveal } from "@/components/ui/reveal";
import { Photo, type PhotoName } from "@/components/ui/photo";

/** One photo per project, in dictionary order. */
const PROJECT_PHOTOS: PhotoName[] = [
  "facilities",
  "structure",
  "road-corridor",
  "construction-aerial",
  "solar-aerial",
  "earthworks",
];

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
        photo="road-corridor"
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
              <div className="relative aspect-16/10 overflow-hidden">
                <Photo
                  name={PROJECT_PHOTOS[i % PROJECT_PHOTOS.length]}
                  alt={item.name}
                  overlay="bottom"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute right-4 top-4 font-display text-[0.7rem] font-semibold tracking-[0.25em] text-amber-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
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
