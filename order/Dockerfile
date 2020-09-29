FROM node:12

WORKDIR /usr/src/app

COPY order/package*.json ./

RUN npm install

COPY order .
COPY protos ../protos

EXPOSE 8052

CMD ["npm", "start"]
