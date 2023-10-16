FROM node:16 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:16-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY package*.json ./
RUN npm install --only=production
CMD [ "npm", "start" ]