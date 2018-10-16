FROM node:alpine as builder

WORKDIR /usr/app
COPY package.json .
RUN npm install
COPY ./ ./
RUN npm run build

CMD ["npm","start"]
EXPOSE 3000