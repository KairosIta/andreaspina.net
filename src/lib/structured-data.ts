import type {
  Graph,
  Person,
  SoftwareSourceCode,
  WebPage,
  WebSite,
} from "schema-dts";

import { routing } from "@/i18n/routing";
import { PRODUCTION_URL } from "@/lib/site";

export type PublicSourceDetails = Readonly<{
  repositoryUrl: string;
  licenseUrl: string;
  programmingLanguage: string;
}>;

type StructuredProject = Readonly<{
  name: string;
  description: string;
  source: PublicSourceDetails;
}>;

type HomePageStructuredDataInput = Readonly<{
  locale: string;
  title: string;
  description: string;
  projects: readonly StructuredProject[];
}>;

const personId = `${PRODUCTION_URL}/#person`;
const websiteId = `${PRODUCTION_URL}/#website`;

function sourceCodeId(repositoryUrl: string) {
  return `${repositoryUrl}#software-source-code`;
}

/** Costruisce il grafo della home senza dipendere da React o dal rendering. */
export function buildHomePageStructuredData({
  locale,
  title,
  description,
  projects,
}: HomePageStructuredDataInput): Graph {
  const pageUrl = `${PRODUCTION_URL}/${locale}`;
  const person: Person = {
    "@type": "Person",
    "@id": personId,
    name: "Andrea Spina",
    url: PRODUCTION_URL,
  };
  const website: WebSite = {
    "@type": "WebSite",
    "@id": websiteId,
    url: PRODUCTION_URL,
    name: "andreaspina.net",
    description,
    inLanguage: routing.locales,
    creator: { "@id": personId },
  };
  const page: WebPage = {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: title,
    description,
    inLanguage: locale,
    isPartOf: { "@id": websiteId },
    about: { "@id": personId },
    hasPart: projects.map(({ source }) => ({
      "@id": sourceCodeId(source.repositoryUrl),
    })),
  };
  const sourceCode = projects.map(
    ({ name, description: projectDescription, source }) =>
      ({
        "@type": "SoftwareSourceCode",
        "@id": sourceCodeId(source.repositoryUrl),
        name,
        description: projectDescription,
        url: source.repositoryUrl,
        codeRepository: source.repositoryUrl,
        license: source.licenseUrl,
        programmingLanguage: source.programmingLanguage,
        author: { "@id": personId },
      }) satisfies SoftwareSourceCode,
  );

  return {
    "@context": "https://schema.org",
    "@graph": [person, website, page, ...sourceCode],
  };
}
