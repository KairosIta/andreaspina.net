import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Blocks,
  SearchCheck,
  Sparkles,
} from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";

const proofSteps = [
  { key: "understand", icon: SearchCheck },
  { key: "build", icon: Blocks },
  { key: "verify", icon: BadgeCheck },
] as const;

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Home");

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate scroll-mt-20 overflow-hidden"
    >
      <div className="hero-grid absolute inset-0 -z-20" aria-hidden="true" />
      <div
        className="hero-orb hero-orb-primary absolute -top-24 left-[8%] -z-10 size-80 rounded-full blur-3xl sm:size-112"
        aria-hidden="true"
      />
      <div
        className="hero-orb hero-orb-secondary absolute right-[2%] bottom-0 -z-10 size-72 rounded-full blur-3xl sm:size-96"
        aria-hidden="true"
      />

      <div className="mx-auto grid min-h-[calc(100dvh-4.5rem)] max-w-6xl items-center gap-14 px-6 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:py-24">
        <div className="hero-reveal flex flex-col items-start">
          <p className="inline-flex max-w-full items-center gap-2 rounded-full border border-brand/20 bg-brand/8 px-3.5 py-2 text-[0.6875rem] font-semibold tracking-[0.08em] text-brand uppercase shadow-sm shadow-brand/5 sm:text-xs sm:tracking-[0.14em]">
            <Sparkles className="size-3.5" aria-hidden="true" />
            {t("eyebrow")}
          </p>

          <h1
            id="hero-title"
            className="mt-6 max-w-3xl text-4xl leading-[1.04] font-semibold tracking-[-0.04em] text-balance sm:text-6xl lg:text-7xl"
          >
            {t("title")}{" "}
            <span className="hero-gradient-text">{t("titleAccent")}</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {t("subtitle")}
          </p>

          <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/#proof"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-lg shadow-brand/20 transition-[transform,box-shadow,background-color] hover:-translate-y-0.5 hover:bg-brand/90 hover:shadow-xl hover:shadow-brand/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              {t("primaryCta")}
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <a
              href="https://github.com/KairosIta/andreaspina.net"
              target="_blank"
              rel="noreferrer"
              aria-label={t("secondaryCtaAria")}
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-background/75 px-6 py-3 text-sm font-semibold shadow-sm backdrop-blur-sm transition-[transform,border-color,background-color] hover:-translate-y-0.5 hover:border-brand/30 hover:bg-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              {t("secondaryCta")}
              <ArrowUpRight
                className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>

          <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
            <BadgeCheck className="size-4 text-brand" aria-hidden="true" />
            {t("trustNote")}
          </p>
        </div>

        <aside
          id="proof"
          aria-labelledby="proof-title"
          className="hero-reveal hero-reveal-delayed scroll-mt-24"
        >
          <div className="relative rounded-4xl border border-border/80 bg-card/80 p-2 shadow-2xl shadow-brand/10 backdrop-blur-xl">
            <div
              className="absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-brand/60 to-transparent"
              aria-hidden="true"
            />
            <div className="rounded-[calc(var(--radius-4xl)-0.45rem)] border border-border/70 bg-background/70 p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-brand uppercase">
                <span className="relative flex size-2" aria-hidden="true">
                  <span className="relative inline-flex size-2 rounded-full bg-brand" />
                </span>
                {t("proof.eyebrow")}
              </div>

              <h2
                id="proof-title"
                className="mt-4 text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-3xl"
              >
                {t("proof.title")}
              </h2>

              <ol className="mt-8 space-y-3">
                {proofSteps.map(({ key, icon: Icon }) => (
                  <li
                    key={key}
                    className="flex gap-4 rounded-2xl border border-border/60 bg-background/45 p-3"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-brand/15 bg-brand/8 text-brand shadow-sm">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-semibold">
                        {t(`proof.steps.${key}.title`)}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {t(`proof.steps.${key}.description`)}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <a
                href="https://github.com/KairosIta/Onda"
                target="_blank"
                rel="noreferrer"
                aria-label={t("proof.project.ariaLabel")}
                className="group mt-7 flex items-center justify-between gap-4 rounded-2xl border border-border bg-muted/60 p-4 transition-[border-color,background-color] hover:border-brand/25 hover:bg-brand/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <span>
                  <span className="block text-xs font-semibold tracking-wider text-brand uppercase">
                    {t("proof.project.eyebrow")}
                  </span>
                  <span className="mt-1 block text-sm font-medium">
                    {t("proof.project.title")}
                  </span>
                </span>
                <ArrowUpRight
                  className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
