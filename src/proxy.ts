import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";

import { routing } from "@/i18n/routing";
import { isIndexable } from "@/lib/site";

/**
 * Next 16 ha rinominato la convenzione `middleware` in `proxy`.
 * next-intl usa questo strato per riconoscere la lingua da URL,
 * cookie NEXT_LOCALE e header Accept-Language, e per redirigere
 * `/` verso `/it`.
 */
const handleLocale = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const response = handleLocale(request);

  // Deve stare qui e non in `headers()` di next.config: quelli vengono
  // valutati durante la build e finiscono congelati nel manifest, quindi
  // l'immagine si comporterebbe allo stesso modo su staging e in produzione.
  // Il proxy gira invece a ogni richiesta e legge la variabile vera.
  if (!isIndexable()) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  // Tutto tranne le API, gli asset di Next e i file con estensione.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
