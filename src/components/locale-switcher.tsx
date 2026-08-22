"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useTransition } from "react";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

export function LocaleSwitcher() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  function onSelect(next: Locale) {
    startTransition(() => {
      // `params` conserva gli eventuali segmenti dinamici della rotta
      // corrente, cosi' il cambio lingua non riporta alla home.
      router.replace(
        // @ts-expect-error -- pathname e params sono coerenti a runtime
        { pathname, params },
        { locale: next },
      );
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
          aria-current={option === locale ? "true" : undefined}
          className="rounded px-2 py-1 uppercase transition enabled:text-muted-foreground enabled:hover:text-foreground"
        >
          {option}
        </button>
      ))}
    </div>
  );
}
