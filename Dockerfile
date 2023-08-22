FROM node:19-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install --legacy-peer-deps

RUN npm run prisma:generate

COPY . .

EXPOSE 8000

CMD [ "npm", "run", "start:docker" ]