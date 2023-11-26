FROM node:18-alpine

ENV PORT=3000

WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build

CMD npm run start
EXPOSE $PORT