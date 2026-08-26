import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import { PRODUCTION_URL } from "@/lib/site";

const languageAlternates = {
  ...Object.fromEntries(
    routing.locales.map((locale) => [locale, `${PRODUCTION_URL}/${locale}`]),
  ),
  "x-default": `${PRODUCTION_URL}/${routing.defaultLocale}`,
};

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => ({
    url: `${PRODUCTION_URL}/${locale}`,
    alternates: {
      languages: languageAlternates,
    },
  }));
}
