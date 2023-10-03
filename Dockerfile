# Dockerfile for Nest.js
FROM node:20.8.0-alpine

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start"]
