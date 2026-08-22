import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Home");

  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-24 sm:py-32">
      <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
        {t("eyebrow")}
      </p>
      <h1 className="text-4xl font-semibold text-balance sm:text-5xl">
        {t("title")}
      </h1>
      <p className="max-w-2xl text-lg text-muted-foreground">{t("subtitle")}</p>
      <div>
        <Link
          href="/"
          className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
        >
          {t("cta")}
        </Link>
      </div>
    </section>
  );
}
