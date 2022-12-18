FROM node:14-alpine
ENV CI=true
#ENV CHOKIDAR_USEPOLLING=true

WORKDIR /translator

COPY package.json .
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]