FROM node:alpine

WORKDIR '/var/opt/webapp'

COPY ./package.json ./

RUN npm config set strict-ssl false
RUN npm install

COPY ./ ./

CMD ["npm", "start"]