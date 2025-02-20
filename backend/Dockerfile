FROM node:19-alpine
WORKDIR /usr/app

COPY package.json package-lock.json ./
RUN npm install && npm install -g nodemon

COPY . .

EXPOSE 3000
CMD ["nodemon", "index.js"]
