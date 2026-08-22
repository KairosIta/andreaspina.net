import { useTranslations } from "next-intl";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { Link } from "@/i18n/navigation";

export function SiteHeader() {
  const t = useTranslations("Nav");

  return (
    <header className="border-b border-border">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-semibold tracking-tight">
          Andrea Spina
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm text-muted-foreground transition hover:text-foreground"
          >
            {t("home")}
          </Link>
          <LocaleSwitcher />
        </div>
      </nav>
    </header>
  );
}
