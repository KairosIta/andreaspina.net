import { useTranslations } from "next-intl";

export function SiteFooter() {
  const t = useTranslations("Footer");

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-muted-foreground">
        © 2026 Andrea Spina. {t("rights")}
      </div>
    </footer>
  );
}
