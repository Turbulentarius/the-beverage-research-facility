FROM node:20-slim

WORKDIR /srv/sandboxer

COPY host-www/. .
RUN chown -R node:node /srv/sandboxer

RUN npm ci

USER node

CMD ["npm", "start"]