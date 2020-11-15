FROM gogojungle/node:10.16.0 AS builder

WORKDIR /usr/src/app

COPY . .
RUN npm install
RUN npm run build

FROM gogojungle/node:10.16.0
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/.next/. ./.next
COPY --from=builder /usr/src/app/node_modules/. ./node_modules
COPY ./server./ ./server

EXPOSE 3033

CMD [ "node", "server/index.js" ]