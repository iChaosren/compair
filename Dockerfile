FROM node:16-alpine

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED 1

RUN apk add --no-cache libc6-compat

COPY . .

RUN ls

RUN yarn --frozen-lockfile
RUN yarn build

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
# TODO - Make initial db.json file, if it doesn't exist - See: https://www.howtogeek.com/devops/understanding-the-dockerfile-volume-instruction/
VOLUME ["/db", "/site-screenshots"]

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["yarn", "run", "docker-serve"]
