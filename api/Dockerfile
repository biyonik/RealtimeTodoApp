# Specify Node Version and Image Type
FROM node:16.16.0 AS development

# Specifythhe working directory
WORKDIR /ahmet/src/app

COPY package*.json ./
COPY tsconfig.build.json ./
COPY tsconfig.json ./


RUN npm ci
RUN npm run build

EXPOSE 3000

FROM node:16.16.0 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /ahmet/src/app

COPY --from=development /ahmet/src/app .

EXPOSE 3000

CMD ["node", "dist/main"]
