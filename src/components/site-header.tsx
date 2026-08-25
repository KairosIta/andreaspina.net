import { useTranslations } from "next-intl";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { Link } from "@/i18n/navigation";

export function SiteHeader() {
  const t = useTranslations("Nav");

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70">
      <nav
        aria-label={t("primaryNavigation")}
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5"
      >
        <Link
          href="/#top"
          className="rounded-sm py-1 font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        >
          Andrea Spina
        </Link>
        <LocaleSwitcher />
      </nav>
    </header>
  );
}
