import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "./dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "./seo";
import { routes, withLocale } from "@/lib/navigation";
import { company } from "@/lib/company";
import {
  Container,
  Section,
  SectionHeading,
  Eyebrow,
  Stat,
} from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { Icon, type IconName } from "@/components/ui/icon";
import { RadarMotif, TopoMotif } from "@/components/ui/motif";
import { Reveal } from "@/components/ui/reveal";
import { CheckList } from "@/components/ui/check-list";
import { CtaBanner } from "@/components/ui/cta-banner";
import { ProjectVisual } from "@/components/ui/project-visual";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata(isLocale(lang) ? lang : "en", "home");
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const dict = await getDictionary(locale);
  const t = dict.home;

  return (
    <>
      {/* --------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden bg-navy-800 text-white">
        <div className="rs-grid-texture absolute inset-0 opacity-50" data-on-dark aria-hidden />
        <RadarMotif className="pointer-events-none absolute -right-32 -top-40 h-190 w-190 text-amber-400/35" />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-navy-900/30 via-transparent to-navy-950/60"
          aria-hidden
        />
        <Container className="relative">
          <div className="grid items-center gap-12 pb-24 pt-16 sm:pb-28 sm:pt-24 lg:grid-cols-[1.15fr_0.85fr] lg:pb-32 lg:pt-28">
            <div>
              <Eyebrow onDark>{t.hero.eyebrow}</Eyebrow>
              <h1 className="mt-5 text-4xl font-extrabold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.05]">
                {t.hero.title}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-100 sm:text-xl">
                {t.hero.subtitle}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button
                  href={withLocale(routes.capabilities.path, locale)}
                  variant="primary"
                  size="lg"
                  withArrow
                >
                  {t.hero.primaryCta}
                </Button>
                <Button
                  href={withLocale(routes.contact.path, locale)}
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  {t.hero.secondaryCta}
                </Button>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative aspect-square rounded-2xl border border-white/10 bg-navy-900/40 p-8 backdrop-blur-sm">
                <RadarMotif className="h-full w-full text-amber-400/70" />
                <div className="absolute inset-x-8 bottom-8 flex items-center gap-3 rounded-lg border border-white/10 bg-navy-950/70 px-4 py-3">
                  <Icon name="location" size={18} className="text-amber-400" />
                  <span className="text-sm text-navy-100">{company.coreArea}</span>
                </div>
              </div>
            </div>
          </div>
        </Container>

      </section>

      {/* Stats strip — lifted over the hero / next section boundary */}
      <Container className="relative z-10 -mt-12 sm:-mt-16">
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-hairline bg-hairline shadow-(--shadow-lift) sm:grid-cols-2 lg:grid-cols-4">
          {t.stats.map((s) => (
            <div key={s.label} className="bg-white p-6">
              <Stat value={s.value} label={s.label} />
            </div>
          ))}
        </div>
      </Container>

      {/* -------------------------------------------------------------- Intro */}
      <div className="bg-background pb-20 pt-16 sm:pb-28 sm:pt-24">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <Eyebrow>{t.intro.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
              {t.intro.title}
            </h2>
            <div className="mt-8">
              <Button
                href={withLocale(routes.about.path, locale)}
                variant="ghost"
                className="px-0 text-navy-700 hover:bg-transparent hover:text-amber-600"
                withArrow
              >
                {t.intro.cta}
              </Button>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <p className="text-lg leading-relaxed text-muted">{t.intro.body}</p>
          </Reveal>
        </Container>
      </div>

      {/* ---------------------------------------------------------------- Why */}
      <Section tone="surface">
        <SectionHeading eyebrow={t.why.eyebrow} title={t.why.title} />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {t.why.items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i}
              className="group flex h-full flex-col rounded-xl border border-hairline bg-white p-7 transition-shadow hover:shadow-(--shadow-card)"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy-700 text-amber-400">
                <Icon name={item.icon as IconName} size={24} />
              </span>
              <h3 className="mt-5 text-lg font-bold text-navy-900">{item.title}</h3>
              <p className="mt-2.5 text-[0.975rem] leading-relaxed text-muted">
                {item.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------- Capabilities */}
      <Section>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow={t.capabilities.eyebrow}
            title={t.capabilities.title}
            intro={t.capabilities.intro}
          />
          <div className="shrink-0">
            <Button
              href={withLocale(routes.capabilities.path, locale)}
              variant="secondary"
              withArrow
            >
              {t.capabilities.cta}
            </Button>
          </div>
        </div>
        <ul className="mt-14 divide-y divide-hairline border-y border-hairline">
          {t.capabilities.items.map((item, i) => (
            <li key={item.key}>
              <Link
                href={withLocale(routes.capabilities.path, locale)}
                className="group flex items-center gap-5 py-6 transition-colors hover:bg-sand-50"
              >
                <span className="font-display text-sm font-semibold tabular-nums text-amber-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-hairline text-navy-700 transition-colors group-hover:border-navy-300 group-hover:bg-white">
                  <Icon name={item.icon as IconName} size={22} />
                </span>
                <span className="flex-1 text-lg font-semibold text-navy-900">
                  {item.title}
                </span>
                <Icon
                  name="arrowRight"
                  size={20}
                  className="text-navy-300 transition-all group-hover:translate-x-1 group-hover:text-amber-600"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* ----------------------------------------------------- Featured work */}
      <Section tone="surface">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow={t.projects.eyebrow}
            title={t.projects.title}
            intro={t.projects.intro}
          />
          <div className="shrink-0">
            <Button
              href={withLocale(routes.projects.path, locale)}
              variant="secondary"
              withArrow
            >
              {t.projects.cta}
            </Button>
          </div>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {t.projects.items.map((item, i) => (
            <Reveal
              key={item.name}
              delay={i}
              className="group flex flex-col overflow-hidden rounded-xl border border-hairline bg-white transition-shadow hover:shadow-(--shadow-card)"
            >
              <ProjectVisual index={i + 1} className="aspect-4/3" />
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-bold text-navy-900">{item.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.caption}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* -------------------------------------------------- Strategic advantage */}
      <section className="relative overflow-hidden bg-ink py-20 text-sand-100 sm:py-28">
        <TopoMotif className="pointer-events-none absolute inset-x-0 top-0 h-full w-full text-white/5" />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <Eyebrow onDark>{t.advantage.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {t.advantage.title}
              </h2>
              <div className="mt-8">
                <Button
                  href={withLocale(routes.contact.path, locale)}
                  variant="primary"
                  withArrow
                >
                  {t.advantage.cta}
                </Button>
              </div>
            </div>
            <CheckList items={t.advantage.items} onDark className="self-center" />
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------ Closing */}
      <CtaBanner
        locale={locale}
        eyebrow={t.closing.eyebrow}
        title={t.closing.title}
        body={t.closing.body}
        ctaLabel={t.closing.cta}
      />
    </>
  );
}
