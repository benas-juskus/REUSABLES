FROM node:18-alpine

RUN mkdir -p /app

WORKDIR /app

COPY . .

COPY package.json /app

COPY package-lock.json /app


RUN npm install

RUN npm install -g nodemon


CMD ["npm", "start"]
