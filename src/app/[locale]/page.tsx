import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Blocks,
  BrainCircuit,
  CheckCircle2,
  Code2,
  Layers3,
  Music2,
  SearchCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { JsonLd } from "@/components/json-ld";
import { Link } from "@/i18n/navigation";
import {
  buildHomePageStructuredData,
  type PublicSourceDetails,
} from "@/lib/structured-data";

const proofSteps = [
  { key: "understand", icon: SearchCheck },
  { key: "build", icon: Blocks },
  { key: "verify", icon: BadgeCheck },
] as const;

type FeaturedProject = {
  key: "website" | "ares" | "onda";
  name: string;
  href: string;
  source: PublicSourceDetails | null;
  linkKind: "external" | "internal";
  statusKey: string;
  ctaKey: string;
  icon: LucideIcon;
  proofKeys: readonly string[];
  tagKeys: readonly string[];
};

const featuredProjects: readonly FeaturedProject[] = [
  {
    key: "website",
    name: "andreaspina.net",
    href: "https://github.com/KairosIta/andreaspina.net",
    source: {
      repositoryUrl: "https://github.com/KairosIta/andreaspina.net",
      licenseUrl:
        "https://github.com/KairosIta/andreaspina.net/blob/main/LICENSE",
      programmingLanguage: "TypeScript",
    },
    linkKind: "external",
    statusKey: "openSource",
    ctaKey: "source",
    icon: Code2,
    proofKeys: ["experience", "delivery", "source"],
    tagKeys: ["nextjs", "typescript", "docker", "ci"],
  },
  {
    key: "ares",
    name: "Ares",
    href: "https://github.com/KairosIta/Ares",
    source: {
      repositoryUrl: "https://github.com/KairosIta/Ares",
      licenseUrl: "https://github.com/KairosIta/Ares/blob/main/LICENSE",
      programmingLanguage: "Python",
    },
    linkKind: "external",
    statusKey: "openSource",
    ctaKey: "source",
    icon: BrainCircuit,
    proofKeys: ["local", "memory", "reliability"],
    tagKeys: ["python", "ollama", "agno", "localFirst"],
  },
  {
    key: "onda",
    name: "Onda",
    href: "https://github.com/KairosIta/Onda",
    source: {
      repositoryUrl: "https://github.com/KairosIta/Onda",
      licenseUrl: "https://github.com/KairosIta/Onda/blob/main/LICENSE",
      programmingLanguage: "TypeScript",
    },
    linkKind: "external",
    statusKey: "openSource",
    ctaKey: "source",
    icon: Music2,
    proofKeys: ["catalog", "playback", "privacy"],
    tagKeys: ["reactNative", "expo", "android", "typescript"],
  },
] as const;

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, tMetadata] = await Promise.all([
    getTranslations("Home"),
    getTranslations("Metadata"),
  ]);

  const jsonLd = buildHomePageStructuredData({
    locale,
    title: tMetadata("title"),
    description: tMetadata("description"),
    projects: featuredProjects.flatMap(({ key, name, source }) =>
      source
        ? [
            {
              name,
              description: t(`projects.items.${key}.description`),
              source,
            },
          ]
        : [],
    ),
  });

  return (
    <>
      <JsonLd data={jsonLd} />
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
              <a
                href="#projects"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-lg shadow-brand/20 transition-[transform,box-shadow,background-color] hover:-translate-y-0.5 hover:bg-brand/90 hover:shadow-xl hover:shadow-brand/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                {t("primaryCta")}
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
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
                  href="https://github.com/KairosIta/Ares"
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
      <section
        id="projects"
        aria-labelledby="projects-title"
        className="relative isolate scroll-mt-20 overflow-hidden border-t border-border/70 bg-muted/25"
      >
        <div
          className="projects-grid absolute inset-0 -z-10"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <header className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">
              {t("projects.eyebrow")}
            </p>
            <h2
              id="projects-title"
              className="mt-4 text-3xl leading-tight font-semibold tracking-[-0.03em] text-balance sm:text-5xl"
            >
              {t("projects.title")}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {t("projects.description")}
            </p>
          </header>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredProjects.map(
              ({
                key,
                href,
                linkKind,
                statusKey,
                ctaKey,
                icon: Icon,
                proofKeys,
                tagKeys,
              }) => (
                <article
                  key={key}
                  aria-labelledby={`${key}-title`}
                  className="project-card group relative flex min-h-full flex-col overflow-hidden rounded-4xl border border-border/80 bg-card/90 p-6 shadow-sm transition-[border-color,box-shadow,background-color] hover:border-brand/25 hover:bg-card hover:shadow-xl hover:shadow-brand/8 sm:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="project-card-icon flex size-12 items-center justify-center rounded-2xl border border-brand/15 bg-brand/8 text-brand shadow-sm transition-[translate,background-color] group-hover:-translate-y-0.5 group-hover:bg-brand/12">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <span className="rounded-full border border-brand/15 bg-brand/7 px-3 py-1.5 text-[0.6875rem] font-semibold tracking-[0.12em] text-brand uppercase">
                      {t(`projects.statuses.${statusKey}`)}
                    </span>
                  </div>

                  <p className="mt-8 text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                    {t(`projects.items.${key}.category`)}
                  </p>
                  <h3
                    id={`${key}-title`}
                    className="mt-3 text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-3xl"
                  >
                    {t(`projects.items.${key}.title`)}
                  </h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {t(`projects.items.${key}.description`)}
                  </p>

                  <ul className="mt-7 space-y-3">
                    {proofKeys.map((proofKey) => (
                      <li
                        key={proofKey}
                        className="flex items-start gap-3 text-sm"
                      >
                        <CheckCircle2
                          className="mt-0.5 size-4 shrink-0 text-brand"
                          aria-hidden="true"
                        />
                        <span>
                          {t(`projects.items.${key}.proofs.${proofKey}`)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {tagKeys.map((tagKey) => (
                      <span
                        key={tagKey}
                        className="rounded-full border border-border bg-muted/70 px-3 py-1.5 text-xs font-medium text-muted-foreground"
                      >
                        {t(`projects.tags.${tagKey}`)}
                      </span>
                    ))}
                  </div>

                  {linkKind === "external" ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={t(`projects.items.${key}.ariaLabel`)}
                      className="group/cta mt-8 inline-flex min-h-11 items-center gap-2 self-start rounded-full font-semibold text-brand underline-offset-4 transition-colors hover:text-brand/80 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                    >
                      {t(`projects.ctas.${ctaKey}`)}
                      <ArrowUpRight
                        className="size-4 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  ) : (
                    <Link
                      href={href}
                      aria-label={t(`projects.items.${key}.ariaLabel`)}
                      className="group/cta mt-8 inline-flex min-h-11 items-center gap-2 self-start rounded-full font-semibold text-brand underline-offset-4 transition-colors hover:text-brand/80 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                    >
                      {t(`projects.ctas.${ctaKey}`)}
                      <ArrowRight
                        className="size-4 transition-transform group-hover/cta:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  )}
                </article>
              ),
            )}
          </div>

          <div className="mt-8 flex flex-col gap-5 rounded-3xl border border-border/80 bg-background/75 p-6 backdrop-blur-sm sm:flex-row sm:items-center sm:p-8">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand text-brand-foreground shadow-lg shadow-brand/20">
              <Layers3 className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-lg font-semibold tracking-tight">
                {t("projects.growth.title")}
              </h3>
              <p className="mt-1 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {t("projects.growth.description")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
