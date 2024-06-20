ARG NODE_IMAGE=oven/bun:1-alpine

FROM --platform=linux/amd64 $NODE_IMAGE AS base
WORKDIR /usr/src/app

# Installing Dependencies
FROM base AS install
COPY . .
RUN apk --no-cache add git
RUN bun install --frozen-lockfile --production
RUN mkdir -p ./migrations && mkdir -p ./seeders

# Production
FROM base AS release
COPY --chown=bun:bun --from=install /usr/src/app/node_modules node_modules
COPY --chown=bun:bun --from=install /usr/src/app/migrations migrations
COPY --chown=bun:bun --from=install /usr/src/app/seeders seeders
COPY --chown=bun:bun --from=install /usr/src/app/src src
COPY --chown=bun:bun --from=install /usr/src/app/package.json package.json

USER bun
