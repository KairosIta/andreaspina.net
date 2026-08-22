# andreaspina.net

Il mio sito personale e portfolio, con un assistente AI integrato che risponde
sui progetti che ho realizzato.

Il repository è pubblico di proposito: se il sito racconta che scrivo software,
il modo più diretto di dimostrarlo è lasciare leggere il codice con cui è fatto.

> My personal site and portfolio, with a built-in AI assistant.
> The repository is public on purpose — the site is itself the work sample.

## Stack

|           |                                     |
| --------- | ----------------------------------- |
| Framework | Next.js 16 (App Router, React 19)   |
| Stile     | Tailwind CSS 4 + shadcn/ui          |
| Lingue    | italiano e inglese, con next-intl   |
| Database  | PostgreSQL 18 + pgvector            |
| AI        | AI SDK, con OpenRouter come gateway |
| Deploy    | Docker, self-hosted                 |

## Avvio in locale

Servono **Node 24** e **pnpm 11**.

```bash
pnpm install
cp .env.example .env.local
docker compose up -d postgres
pnpm dev
```

Il sito risponde su <http://localhost:3000> e redirige su `/it`.
La versione inglese è su `/en`.

## Verifiche

```bash
pnpm lint        # ESLint
pnpm typecheck   # tsc --noEmit
pnpm build       # build di produzione
pnpm format      # Prettier, riordina anche le classi Tailwind
```

Per provare in locale la stessa immagine Docker che finisce in produzione:

```bash
docker compose --profile prod up --build
```

## Stato

In costruzione. Le fondamenta ci sono — routing bilingue, tema, build Docker,
CI — e il resto arriva un pezzo alla volta.

## Licenza

Il codice è sotto licenza MIT. I testi, le immagini e i contenuti del sito
non lo sono: restano miei.

---

Andrea Spina — [andreaspina.net](https://andreaspina.net)
