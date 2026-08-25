# andreaspina.net

[Italiano](README.md) · [English](README.en.md)

[![CI](https://github.com/KairosIta/andreaspina.net/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/KairosIta/andreaspina.net/actions/workflows/ci.yml)
[![MIT License](https://img.shields.io/badge/license-MIT-5b5bf7.svg)](LICENSE)

Andrea Spina's open-source personal website and portfolio.

The repository is public because the project is part of the portfolio: in
addition to describing what I build, it demonstrates how I work through
readable code, a bilingual interface, a reproducible build, and automated
checks.

## What it demonstrates today

- A responsive Italian and English Hero with content managed through
  `next-intl`.
- Keyboard navigation, visible focus, adequate touch targets, and animations
  compatible with `prefers-reduced-motion`.
- Localized metadata, canonical URLs, `hreflang`, and safeguards against
  accidentally indexing non-production environments.
- A multi-stage Docker image running as a non-privileged user.
- Public CI covering formatting, linting, type checking, the application
  build, the Docker build, and a container smoke test.

## Stack

| Area                 | Technology                        |
| -------------------- | --------------------------------- |
| Framework            | Next.js 16.3.2, App Router        |
| UI                   | React 19.2.8, Tailwind CSS 4.3.3  |
| Internationalization | next-intl 4.13.7                  |
| Language             | TypeScript 5.9.3                  |
| Runtime              | Node.js 24                        |
| Package manager      | pnpm 11.20.0                      |
| Distribution         | Docker, Next.js standalone output |
| Automation           | GitHub Actions                    |

Versions are pinned exactly in `package.json` and the lockfile. Updates are
reviewed and applied explicitly.

## Local development

Node.js 24 or newer and pnpm 11.20.0 are required.

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

The development server runs at <http://localhost:3000> and redirects to the
Italian version at `/it`. The English version is available at `/en`.

The current Hero requires no external services or credentials.

## Quality checks

Before proposing a change, run:

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm build
```

`pnpm format` applies Prettier and also sorts Tailwind classes.

To build and run locally the same standalone image checked by CI:

```bash
docker compose --profile prod up --build
```

## Project layout

```text
messages/               Italian and English translations
src/app/[locale]/       localized pages
src/app/globals.css     Tailwind 4 and theme tokens
src/components/         shared components
src/i18n/               routing and message loading
src/proxy.ts            locale handling and indexing safeguards
docker/                 local service initialization
.github/workflows/      public CI pipeline
```

## Safe indexing

The website becomes indexable only when `SITE_URL` exactly matches
`https://andreaspina.net`. Development and other environments return
`X-Robots-Tag: noindex, nofollow` and a restrictive `robots.txt`.

Real environment values are never committed. `.env.example` contains local
placeholder values only.

## Collaboration and security

- [Contributing guide](CONTRIBUTING.md)
- [Security policy](SECURITY.md)
- [Issues](https://github.com/KairosIta/andreaspina.net/issues)

Security reports must not be disclosed in public issues. Use the private
channel described in the security policy.

## License

The source code is available under the [MIT License](LICENSE). Identity,
editorial copy, images, and other personal website content remain © Andrea
Spina unless stated otherwise.

---

Andrea Spina · [GitHub](https://github.com/KairosIta)
