import { useLocale, useTranslations } from "next-intl";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { getPathname } from "@/i18n/navigation";

export function SiteHeader() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const homePath = getPathname({ href: "/", locale });
  const topHref = `${homePath}#top`;
  const projectsHref = `${homePath}#projects`;

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70">
      <nav
        aria-label={t("primaryNavigation")}
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5"
      >
        <a
          href={topHref}
          className="rounded-sm py-1 font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        >
          Andrea Spina
        </a>
        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href={projectsHref}
            className="hidden min-h-10 items-center rounded-full px-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:inline-flex"
          >
            {t("work")}
          </a>
          <LocaleSwitcher />
        </div>
      </nav>
    </header>
  );
}
