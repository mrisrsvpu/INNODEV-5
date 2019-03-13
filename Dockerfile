FROM node:alpine

ENV PORT 80
ENV NODE_ENV production

EXPOSE 80

COPY package.json /app
WORKDIR /app

RUN npm i yarn \
    && yarn install
#    && apk add curl

COPY . /app

HEALTHCHECK --interval=5m --timeout=3s CMD curl -f http://localhost:$PORT/group/1 || exit 1
CMD ["yarn", "start"]
