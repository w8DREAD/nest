#FROM ubuntu:latest
#FROM node:latest
#WORKDIR /app
#
#COPY package*.json ./
#COPY tsconfig.json tsconfig.json
#COPY src src
#RUN ["npm","install","global","@nestjs/cli"]
#RUN ["npm", "install"]
#
#EXPOSE 3000
#
#ENTRYPOINT ["npm","run","start"]

FROM node:latest
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run start
