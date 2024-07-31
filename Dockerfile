FROM node:22 AS build

WORKDIR /usr/src/app

RUN npm install -g pnpm@8

COPY ./package.json ./pnpm-lock.yaml ./

COPY ./ .

RUN pnpm install --frozen-lockfile -r
RUN npx prisma generate
RUN pnpm build

FROM node:22-alpine3.19

WORKDIR /usr/src/app
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/build ./build
COPY --from=build /usr/src/app/node_modules ./node_modules

EXPOSE 3000

CMD ["cross-env", "MODE=PROD", "node", "build/index.js"]