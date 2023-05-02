FROM node:14.16.0

WORKDIR /usr/src/app/client
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm","run", "start"]