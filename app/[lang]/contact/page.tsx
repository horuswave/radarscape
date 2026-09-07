import type { Metadata } from "next";
import { getDictionary } from "../dictionaries";
import { buildMetadata } from "../seo";
import { isLocale, type Locale } from "@/lib/i18n";
import { company } from "@/lib/company";
import { Section } from "@/components/ui/primitives";
import { PageHero } from "@/components/ui/page-hero";
import { Icon } from "@/components/ui/icon";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/ui/reveal";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata(isLocale(lang) ? lang : "en", "contact");
}

export default async function ContactPage({
  params,
}: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const dict = await getDictionary(locale);
  const t = dict.contact;

  const details = [
    {
      icon: "location" as const,
      label: t.officeLabel,
      value: (
        <>
          {company.address.line1}
          <br />
          {company.address.line2}
          <br />
          {company.address.city}, {company.address.country}
        </>
      ),
    },
    {
      icon: "phone" as const,
      label: t.phoneLabel,
      value: (
        <a href={company.phoneHref} className="hover:text-amber-600">
          {company.phone}
        </a>
      ),
    },
    {
      icon: "mail" as const,
      label: t.emailLabel,
      value: (
        <a href={company.emailHref} className="break-all hover:text-amber-600">
          {company.email}
        </a>
      ),
    },
    {
      icon: "clock" as const,
      label: t.hoursLabel,
      value: t.hoursValue,
    },
  ];

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        subtitle={t.hero.body}
        breadcrumbs={[{ key: "contact", label: dict.nav.contact }]}
        homeLabel={dict.nav.home}
        breadcrumbLabel={dict.a11y.breadcrumb}
        photo="site-team"
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <Reveal className="flex flex-col gap-8">
            <div>
              <h2 className="rs-eyebrow mb-6">{t.detailsTitle}</h2>
              <ul className="flex flex-col gap-6">
                {details.map((d) => (
                  <li key={d.label} className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy-700 text-amber-400">
                      <Icon name={d.icon} size={22} />
                    </span>
                    <div>
                      <p className="font-display text-xs font-semibold uppercase tracking-wide text-navy-600">
                        {d.label}
                      </p>
                      <p className="mt-1 text-[0.975rem] leading-relaxed text-foreground">
                        {d.value}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="overflow-hidden rounded-xl border border-hairline">
              <div className="flex items-center justify-between border-b border-hairline bg-surface px-4 py-3">
                <span className="font-display text-sm font-semibold text-navy-800">
                  {t.mapTitle}
                </span>
                <a
                  href={company.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-600 hover:text-amber-600"
                >
                  {t.mapLinkLabel}
                  <Icon name="arrowUpRight" size={13} />
                </a>
              </div>
              <iframe
                title={t.mapTitle}
                src={company.mapEmbedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-64 w-full border-0 bg-sand-100"
              />
            </div>
          </Reveal>

          <Reveal delay={1}>
            <ContactForm locale={locale} form={t.form} />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
