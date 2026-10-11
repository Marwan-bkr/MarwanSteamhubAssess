FROM node:20-alpine AS builder

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

FROM node:20-alpine

WORKDIR /src

COPY --from=builder /src ./

ENV NODE_ENV=production
ENV PORT=8080
ENV REDIS_URL=redis://redis:6379

EXPOSE 8080

CMD [ "node", "src/index.js" ]
