import { defineRouting } from "next-intl/routing";

/**
 * Configurazione unica del routing bilingue.
 * Ogni pagina vive sotto /it o /en: `localePrefix: "always"` rende
 * l'URL esplicito anche per l'italiano, cosi' i due siti sono
 * simmetrici per gli utenti e per i motori di ricerca.
 */
export const routing = defineRouting({
  locales: ["it", "en"],
  defaultLocale: "it",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
