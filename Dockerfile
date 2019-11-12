FROM node:10

WORKDIR /usr/src/app

COPY . . 

RUN npm install

CMD DB_URL="mongodb://172.17.0.1:27017/mydb" node app.js