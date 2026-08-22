<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# andreaspina.net

Sito personale e portfolio di Andrea Spina, con assistente AI integrato.
Repository pubblico: il codice fa parte di quello che il sito mostra.

## Comandi

|                                            |                                                         |
| ------------------------------------------ | ------------------------------------------------------- |
| `pnpm dev`                                 | sviluppo su http://localhost:3000 (redirige su `/it`)   |
| `pnpm build`                               | build di produzione                                     |
| `pnpm lint`                                | ESLint                                                  |
| `pnpm typecheck`                           | `tsc --noEmit`                                          |
| `pnpm format`                              | Prettier (riordina anche le classi Tailwind)            |
| `docker compose up -d postgres`            | Postgres 18 + pgvector in locale                        |
| `docker compose --profile prod up --build` | prova in locale la stessa immagine che va in produzione |

Il gestore di pacchetti è **pnpm**. Non usare npm o yarn: il lockfile è di pnpm.

## Regole del progetto

**Le versioni sono fissate esatte.** In `package.json` non ci sono `^` né `~`,
e `.npmrc` ha `save-exact=true`. È voluto: diverse dipendenze sono in 0.x e un
aggiornamento silenzioso romperebbe la build. Si aggiorna a mano, una alla volta.

**Tailwind è alla versione 4.** Non esiste `tailwind.config.js`: il tema si
configura in CSS dentro `@theme` in `src/app/globals.css`. Buona parte del
materiale che si trova in rete è ancora per la v3 — verificare sempre.

**Colori solo tramite token.** Usare `bg-background`, `text-muted-foreground`,
`border-border` e simili, mai `bg-neutral-900` o `text-white`. I token sono
definiti in `globals.css` e gestiscono da soli il tema chiaro e scuro.

**Ogni pagina vive sotto `src/app/[locale]/`.** Non creare rotte fuori da lì.

**Per i link usare `@/i18n/navigation`, non `next/link`.** Il `Link` di
`@/i18n/navigation` aggiunge da sé il prefisso di lingua; quello di Next no,
e il risultato è un link che perde la lingua corrente.

**Ogni stringa visibile sta in `messages/it.json` e `messages/en.json`.**
Le due lingue devono avere le stesse chiavi. Niente testo scritto nel JSX.

**`middleware.ts` non esiste più**: in Next 16 la convenzione è `src/proxy.ts`.

**`SITE_URL` decide se il sito è indicizzabile.** Solo se vale esattamente
`https://andreaspina.net` il sito si lascia indicizzare; in ogni altro caso
risponde `Disallow: /` su `robots.txt` e aggiunge `X-Robots-Tag: noindex`.
Deve restare **senza** prefisso `NEXT_PUBLIC_`: Next sostituisce quelle
variabili durante la build e il valore resterebbe congelato nell'immagine.
Per lo stesso motivo il controllo sta in `src/proxy.ts` e non in `headers()`
di `next.config.ts`, che viene valutato a build time.

**Niente segreti nel repository.** `.env*` è ignorato; `.env.example` elenca
le variabili con valori finti. Il repository è pubblico: prima di committare,
controllare che non ci finisca nulla di specifico all'infrastruttura.

## Struttura

```
src/
  app/[locale]/     pagine — layout, home, 404
  app/globals.css   Tailwind 4 + token del tema shadcn
  components/       componenti condivisi
  components/ui/    componenti generati da shadcn (non modificarli a mano)
  i18n/             routing, navigation e caricamento dei messaggi
  lib/              utility (cn)
  proxy.ts          rilevamento della lingua e redirect
messages/           traduzioni it / en
docker/postgres/    SQL eseguito alla creazione del database locale
```

## Deploy

Va in produzione come immagine Docker costruita da questo `Dockerfile`, non
da buildpack. `next.config.ts` ha `output: "standalone"`:
l'immagine finale contiene solo il codice raggiungibile, non `node_modules`
per intero. Se si tocca il Dockerfile, provarlo con
`docker compose --profile prod up --build` prima di fare push.
