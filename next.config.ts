import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

import { PRODUCTION_URL } from "./src/lib/site";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
const productionHostname = new URL(PRODUCTION_URL).hostname;

const nextConfig: NextConfig = {
  // Necessario per il Dockerfile: Next copia in .next/standalone
  // solo il codice e le dipendenze effettivamente raggiungibili.
  output: "standalone",

  // Il file di lock e' nella root del progetto: lo dichiariamo per evitare
  // che Next risalga oltre e includa file estranei nel tracing.
  outputFileTracingRoot: import.meta.dirname,

  poweredByHeader: false,

  typedRoutes: true,

  redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: `www.${productionHostname}` }],
        destination: `${PRODUCTION_URL}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
