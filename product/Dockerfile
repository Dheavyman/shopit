FROM node:12

WORKDIR /usr/src/app

COPY product/package*.json ./

RUN npm install

COPY product .

EXPOSE 8051

CMD ["npm", "start"]
