import Link from "next/link";
import { lang as langParam } from "next/root-params";
import { isLocale, defaultLocale } from "@/lib/i18n";
import { Container } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/icon";

const copy = {
  en: { code: "404", title: "Page not found", body: "The page you are looking for may have moved or no longer exists.", cta: "Back to home" },
  pt: { code: "404", title: "Página não encontrada", body: "A página que procura pode ter sido movida ou já não existe.", cta: "Voltar ao início" },
  fr: { code: "404", title: "Page introuvable", body: "La page que vous recherchez a peut-être été déplacée ou n'existe plus.", cta: "Retour à l'accueil" },
};

export default async function NotFound() {
  let locale = defaultLocale;
  try {
    const raw = await langParam();
    if (raw && isLocale(raw)) locale = raw;
  } catch {
    // root param unavailable in this context, fall back to the default locale
  }
  const c = copy[locale];

  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      <div className="rs-grid-texture absolute inset-0 opacity-30" data-on-dark aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-navy-900/0 to-navy-950/70"
        aria-hidden
      />
      <Container className="relative flex min-h-[60vh] flex-col items-start justify-center py-24">
        <span className="font-display text-6xl font-extrabold tracking-tight text-amber-400 sm:text-7xl">
          {c.code}
        </span>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          {c.title}
        </h1>
        <p className="mt-4 max-w-md text-lg text-navy-100">{c.body}</p>
        <Link
          href={`/${locale}`}
          className="group mt-8 inline-flex items-center gap-2 rounded-md bg-amber-500 px-6 py-3 font-display text-sm font-semibold text-ink transition-colors hover:bg-amber-400"
        >
          {c.cta}
          <Icon
            name="arrowRight"
            size={16}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </Container>
    </section>
  );
}
