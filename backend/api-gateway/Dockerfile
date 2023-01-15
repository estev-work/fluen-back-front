FROM node:16.19.0-alpine
RUN npm install -g npm@8.19.3
RUN npm install -g rimraf
RUN npm install -g @nestjs/cli
RUN rm -rf /var/www/api-gateway
RUN mkdir -p /var/www/api-gateway
WORKDIR /var/www/api-gateway
ADD . /var/www/api-gateway
RUN npm install
CMD npm run build && npm run start:dev
