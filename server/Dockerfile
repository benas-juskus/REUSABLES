FROM node:18-alpine

RUN mkdir -p /app

WORKDIR /app

COPY . .
COPY package.json /app
COPY package-lock.json /app

RUN npm install

# RUN npm i @prisma/client

# RUN npx prisma generate


CMD ["npm", "start"]
