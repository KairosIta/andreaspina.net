import type { MetadataRoute } from "next";

import { isIndexable, PRODUCTION_URL } from "@/lib/site";

// Valutato a ogni richiesta, non congelato nella build: la stessa immagine
// Docker gira su staging e in produzione e deve rispondere diversamente.
export const dynamic = "force-dynamic";

export default function robots(): MetadataRoute.Robots {
  if (!isIndexable()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${PRODUCTION_URL}/sitemap.xml`,
  };
}
