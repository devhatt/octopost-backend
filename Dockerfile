FROM node:22 AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /usr/src/app

RUN corepack enable && corepack prepare pnpm@8.6.0 --activate

COPY ./package.json ./pnpm-lock.yaml ./

COPY ./ .

FROM base AS prod-deps

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM base AS build

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN npx prisma generate
RUN pnpm build

FROM node:22-alpine3.19

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"


RUN corepack enable && corepack prepare pnpm@8.6.0 --activate


WORKDIR /usr/src/app
COPY --from=build /usr/src/app/build ./build
COPY --from=prod-deps /usr/src/app/node_modules ./node_modules

EXPOSE 3000

CMD ["pnpm", "start"]
