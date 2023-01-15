FROM node:16.19.0-alpine
RUN npm install -g npm@8.19.3
RUN npm install -g rimraf
RUN npm install -g @nestjs/cli
RUN rm -rf /var/www/user-service
RUN mkdir -p /var/www/user-service
WORKDIR /var/www/user-service
ADD . /var/www/user-service
RUN npm install
CMD npm run build && npm run start:dev
