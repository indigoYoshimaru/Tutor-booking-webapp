FROM node:14
COPY package*.json ./
RUN npm install
EXPOSE 8888
COPY . .
CMD npm run dev