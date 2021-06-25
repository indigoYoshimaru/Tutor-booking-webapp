FROM node:14
COPY package*.json ./
RUN npm install
EXPOSE 3333
COPY . .
CMD npm run start