import type { MetadataRoute } from "next";
import { locales, localeHtmlLang } from "@/lib/i18n";
import { routes } from "@/lib/navigation";
import { company } from "@/lib/company";

const paths = Object.values(routes).map((r) => r.path);

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return locales.flatMap((locale) =>
    paths.map((path) => {
      const url =
        path === "/"
          ? `${company.siteUrl}/${locale}`
          : `${company.siteUrl}/${locale}${path}`;

      return {
        url,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: path === "/" ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [
              localeHtmlLang[l],
              path === "/"
                ? `${company.siteUrl}/${l}`
                : `${company.siteUrl}/${l}${path}`,
            ]),
          ),
        },
      };
    }),
  );
}
