FROM node:12

WORKDIR /usr/src/app

COPY customer/package*.json ./

RUN npm install

COPY customer/ .
COPY protos/ ./protos

EXPOSE 8050

CMD ["npm", "start"]
