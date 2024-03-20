FROM node:18-alpine AS base
RUN mkdir -p /home/node/app
RUN chown -R node:node /home/node && chmod -R 770 /home/node
WORKDIR /home/node/app

# client build
FROM base AS builder-client
WORKDIR /home/node/app
COPY --chown=node:node . ./
USER node
RUN npm install --loglevel warn
RUN npm install --save react-dropzone
EXPOSE 3000
CMD ["npm", "start"]

#FROM node:10-alpine

#RUN mkdir -p /app
#WORKDIR /app

#COPY package.json /app
#COPY package-lock.json /app
#COPY . /app

#RUN npm install

#CMD ["npm", "start"]
