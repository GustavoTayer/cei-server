FROM node:14-alpine

RUN mkdir /home/node/app/ && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./

USER node

RUN npm install && npm cache clean --force --loglevel=error

# RUN --chown=node:node npm instal pm2 -g

COPY --chown=node:node src ./src

EXPOSE 3003

CMD [ "node", "src/loader.js"]