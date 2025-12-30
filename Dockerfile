FROM node:20-alpine

WORKDIR /app

COPY package.json /app/

RUN npm install

COPY . /app/

RUN npx prisma migrate deploy && npx prisma generate && npm i nodemon -g

CMD [ "node","index.js" ]