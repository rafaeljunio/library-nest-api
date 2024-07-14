FROM node:20.5.1-slim

WORKDIR /usr/src/app

copy package*.json ./

RUN npm i

COPY . .

EXPOSE 3333

CMD ["npm", "run", "start:dev"]