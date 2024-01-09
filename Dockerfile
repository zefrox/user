FROM node:18
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN chown -R node /usr/src/app
RUN npm run build
CMD [ "node", "dist/main.js" ]