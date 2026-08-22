# syntax=docker/dockerfile:1

# Immagine di base condivisa: una sola versione di Node in tutto il file.
FROM node:24-alpine AS base
# libc6-compat serve ai binari nativi di Next (SWC) su Alpine.
RUN apk add --no-cache libc6-compat
ENV PNPM_HOME="/pnpm" \
    PATH="/pnpm:$PATH"
RUN corepack enable
WORKDIR /app


# --- Dipendenze -------------------------------------------------------------
# Stage separato: cambia solo quando cambiano package.json o il lockfile,
# quindi Docker riusa la cache anche quando modifichiamo il codice.
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
# --ignore-scripts: le build native (@parcel/watcher, @swc/core) servono solo
# al watcher in sviluppo e richiederebbero un toolchain C++ nell'immagine.
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile --ignore-scripts


# --- Build ------------------------------------------------------------------
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build


# --- Runtime ----------------------------------------------------------------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# Il processo non gira come root.
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# `output: "standalone"` produce un server.js con dentro solo le dipendenze
# effettivamente usate: l'immagine finale non contiene node_modules interi.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

# L'orchestratore usa questo healthcheck per sapere quando il container e' pronto.
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
    CMD node -e "fetch('http://127.0.0.1:3000/it').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
