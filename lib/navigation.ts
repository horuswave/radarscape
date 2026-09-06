/**
 * Canonical route table for the marketing site.
 *
 * `key` maps into the `nav` block of every dictionary so labels stay localized.
 * `path` is the locale-agnostic pathname; `withLocale()` prefixes it.
 */

import type { Locale } from "./i18n";

export type NavKey =
  | "home"
  | "about"
  | "capabilities"
  | "technology"
  | "hseq"
  | "projects"
  | "deliveryModel"
  | "whyRadarscape"
  | "contact";

export type RouteDef = {
  key: NavKey;
  path: string;
};

export const routes: Record<NavKey, RouteDef> = {
  home: { key: "home", path: "/" },
  about: { key: "about", path: "/about" },
  capabilities: { key: "capabilities", path: "/capabilities" },
  technology: { key: "technology", path: "/capabilities/technology" },
  hseq: { key: "hseq", path: "/capabilities/hseq" },
  projects: { key: "projects", path: "/projects" },
  deliveryModel: { key: "deliveryModel", path: "/delivery-model" },
  whyRadarscape: { key: "whyRadarscape", path: "/why-radarscape" },
  contact: { key: "contact", path: "/contact" },
};

/** Primary header navigation, in display order. */
export const primaryNav: NavKey[] = [
  "about",
  "capabilities",
  "projects",
  "deliveryModel",
  "whyRadarscape",
  "contact",
];

/** Footer "quick links" column. */
export const footerQuickLinks: NavKey[] = [
  "home",
  "about",
  "capabilities",
  "projects",
  "deliveryModel",
  "whyRadarscape",
  "contact",
];

export function withLocale(path: string, locale: Locale): string {
  if (path === "/") return `/${locale}`;
  return `/${locale}${path}`;
}
