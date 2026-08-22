import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PRODUCTION_URL } from "@/lib/site";
import { routing } from "@/i18n/routing";

import "../globals.css";

/** Prerendera /it e /en a build time invece che su richiesta. */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    // Sempre il dominio di produzione, anche quando la pagina e' servita da
    // staging: il canonical deve indicare ai motori qual e' l'originale.
    metadataBase: new URL(PRODUCTION_URL),
    title: {
      default: t("title"),
      template: `%s — Andrea Spina`,
    },
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      // hreflang: dice ai motori di ricerca che le due versioni sono la
      // stessa pagina in lingue diverse, non contenuto duplicato.
      languages: {
        it: "/it",
        en: "/en",
        "x-default": `/${routing.defaultLocale}`,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Senza questa chiamata le pagine figlie diventano dinamiche.
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col antialiased">
        <NextIntlClientProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
