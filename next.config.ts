import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Necessario per il Dockerfile: Next copia in .next/standalone
  // solo il codice e le dipendenze effettivamente raggiungibili.
  output: "standalone",

  // Il file di lock e' nella root del progetto: lo dichiariamo per evitare
  // che Next risalga oltre e includa file estranei nel tracing.
  outputFileTracingRoot: import.meta.dirname,

  poweredByHeader: false,

  typedRoutes: true,
};

export default withNextIntl(nextConfig);
