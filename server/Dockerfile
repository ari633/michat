FROM node:18-alpine

ENV PORT=9090

WORKDIR /usr/src/app
COPY . .
RUN npm install
CMD npm run start:dev
EXPOSE $PORT