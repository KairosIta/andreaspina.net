"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

export function LocaleSwitcher() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function onSelect(next: Locale) {
    const query = window.location.search;
    const hash = window.location.hash;

    startTransition(() => {
      // Il pathname restituito da next-intl conserva la rotta corrente;
      // query e hash mantengono anche il contesto dentro la pagina.
      router.replace(`${pathname}${query}${hash}`, { locale: next });
    });
  }

  return (
    <div
      className="flex items-center gap-1 text-sm"
      aria-label={t("switchLanguage")}
    >
      {routing.locales.map((option) => (
        <button
          key={option}
          type="button"
          disabled={isPending || option === locale}
          onClick={() => onSelect(option)}
          aria-label={
            option === "it" ? t("switchToItalian") : t("switchToEnglish")
          }
          aria-current={option === locale ? "true" : undefined}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full px-2 text-xs font-semibold tracking-wider uppercase transition-colors enabled:text-muted-foreground enabled:hover:bg-muted enabled:hover:text-foreground enabled:focus-visible:outline-2 enabled:focus-visible:outline-offset-2 enabled:focus-visible:outline-brand disabled:bg-muted disabled:text-foreground"
        >
          {option}
        </button>
      ))}
    </div>
  );
}
