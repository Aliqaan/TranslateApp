FROM node:14-alpine
ENV CI=true
#ENV CHOKIDAR_USEPOLLING=true

WORKDIR /translator

COPY ./package.json /translator/package.json
RUN npm install

COPY ./src /translator/src
COPY ./public /translator/public
RUN npm run test
CMD ["npm", "start"]