# andreaspina.net

[Italiano](README.md) · [English](README.en.md)

[![CI](https://github.com/KairosIta/andreaspina.net/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/KairosIta/andreaspina.net/actions/workflows/ci.yml)
[![Licenza MIT](https://img.shields.io/badge/licenza-MIT-5b5bf7.svg)](LICENSE)

Il sito personale e portfolio open source di Andrea Spina.

Il repository è pubblico perché il progetto fa parte del portfolio: oltre a
raccontare cosa realizzo, mostra come lavoro attraverso codice consultabile,
un'interfaccia bilingue, una build riproducibile e controlli automatici.

## Cosa dimostra oggi

- Hero responsive in italiano e inglese, con contenuti gestiti tramite
  `next-intl`.
- Navigazione da tastiera, focus visibile, target touch adeguati e animazioni
  compatibili con `prefers-reduced-motion`.
- Metadata localizzati, URL canonici, `hreflang` e protezione
  dall'indicizzazione accidentale degli ambienti non produttivi.
- Immagine Docker multi-stage eseguita come utente non privilegiato.
- CI pubblica con formattazione, lint, typecheck, build applicativa, build
  Docker e smoke test del container.

## Stack

| Area                   | Tecnologia                           |
| ---------------------- | ------------------------------------ |
| Framework              | Next.js 16.3.2, App Router           |
| Interfaccia            | React 19.2.8, Tailwind CSS 4.3.3     |
| Internazionalizzazione | next-intl 4.13.7                     |
| Linguaggio             | TypeScript 5.9.3                     |
| Runtime                | Node.js 24                           |
| Packaging              | pnpm 11.20.0                         |
| Distribuzione          | Docker, output standalone di Next.js |
| Automazione            | GitHub Actions                       |

Le versioni sono fissate esattamente nel `package.json` e nel lockfile: gli
aggiornamenti vengono valutati e applicati in modo esplicito.

## Avvio in locale

Servono Node.js 24 o successivo e pnpm 11.20.0.

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Il server di sviluppo risponde su <http://localhost:3000> e reindirizza alla
versione italiana su `/it`. La versione inglese è disponibile su `/en`.

Per la Hero attuale non sono necessari servizi esterni o credenziali.

## Verifiche

Prima di proporre una modifica:

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm build
```

`pnpm format` applica Prettier e riordina anche le classi Tailwind.

Per costruire e avviare localmente la stessa immagine standalone verificata
dalla CI:

```bash
docker compose --profile prod up --build
```

## Struttura essenziale

```text
messages/               traduzioni italiane e inglesi
src/app/[locale]/       pagine localizzate
src/app/globals.css     Tailwind 4 e token del tema
src/components/         componenti condivisi
src/i18n/               routing e caricamento dei messaggi
src/proxy.ts            lingua e protezione dall'indicizzazione
docker/                 inizializzazione dei servizi locali
.github/workflows/      pipeline pubblica
```

## Indicizzazione sicura

Il sito diventa indicizzabile soltanto quando `SITE_URL` vale esattamente
`https://andreaspina.net`. In sviluppo e negli altri ambienti espone
`X-Robots-Tag: noindex, nofollow` e un `robots.txt` restrittivo.

I valori reali delle variabili d'ambiente non vengono versionati. Il file
`.env.example` contiene esclusivamente valori locali fittizi.

## Collaborazione e sicurezza

- [Guida ai contributi](CONTRIBUTING.md)
- [Policy di sicurezza](SECURITY.md)
- [Issue](https://github.com/KairosIta/andreaspina.net/issues)

Le segnalazioni di sicurezza non devono essere pubblicate nelle issue: usare
il canale privato indicato nella policy.

## Licenza

Il codice sorgente è distribuito con [licenza MIT](LICENSE). Identità, testi
editoriali, immagini e altri contenuti personali del sito restano © Andrea
Spina, salvo indicazione diversa.

---

Andrea Spina · [GitHub](https://github.com/KairosIta)
