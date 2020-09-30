FROM node:12

WORKDIR /usr/src/app

COPY payment/package*.json ./

RUN npm install

COPY payment .

CMD ["npm", "start"]
