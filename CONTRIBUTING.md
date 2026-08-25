# Contribuire / Contributing

Grazie per l'interesse verso `andreaspina.net`. Issue ben circoscritte e pull
request focalizzate sono benvenute.

Thank you for your interest in `andreaspina.net`. Well-scoped issues and
focused pull requests are welcome.

## Prima di iniziare / Before you start

- Per bug e proposte usare il relativo
  [template GitHub](https://github.com/KairosIta/andreaspina.net/issues/new/choose).
- Per vulnerabilità seguire [SECURITY.md](SECURITY.md), senza aprire issue
  pubbliche.
- For bugs and proposals, use the matching
  [GitHub template](https://github.com/KairosIta/andreaspina.net/issues/new/choose).
- For vulnerabilities, follow [SECURITY.md](SECURITY.md) and do not open a
  public issue.

## Ambiente / Environment

Servono Node.js 24 o successivo e pnpm 11.20.0.

Node.js 24 or newer and pnpm 11.20.0 are required.

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

## Regole del progetto / Project rules

- Usare esclusivamente `pnpm`; le versioni delle dipendenze restano esatte.
- Inserire ogni stringa visibile sia in `messages/it.json` sia in
  `messages/en.json`.
- Creare le pagine sotto `src/app/[locale]/` e usare `@/i18n/navigation` per
  la navigazione interna.
- Usare i token semantici del tema invece di colori Tailwind diretti.
- Non aggiungere segreti, dati personali, valori reali di infrastruttura o
  affermazioni pubbliche non verificabili.
- Use `pnpm` exclusively and keep dependency versions exact.
- Add every visible string to both `messages/it.json` and `messages/en.json`.
- Create pages under `src/app/[locale]/` and use `@/i18n/navigation` for
  internal navigation.
- Use semantic theme tokens instead of direct Tailwind colors.
- Never add secrets, personal data, real infrastructure values, or
  unverifiable public claims.

## Verifiche / Checks

Prima di aprire una pull request, eseguire:

Run these commands before opening a pull request:

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm build
```

Per modifiche visive includere screenshot desktop e mobile. Descrivere il
problema risolto, non soltanto i file modificati.

For visual changes, include desktop and mobile screenshots. Describe the
problem being solved, not only the files that changed.
