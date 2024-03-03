FROM node:18-alpine as base
ENV PORT=3000
EXPOSE $PORT
WORKDIR /usr/src/app



FROM base as dev
COPY . .
RUN npm install 
CMD npm run start:dev


FROM base as prod
COPY . .
RUN npm install && npm run build
CMD npm run start:prod
