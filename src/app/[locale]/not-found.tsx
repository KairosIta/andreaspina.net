import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("Nav");

  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-4 px-6 py-24">
      <h1 className="text-4xl font-semibold">404</h1>
      <Link href="/" className="underline underline-offset-4">
        {t("home")}
      </Link>
    </section>
  );
}
