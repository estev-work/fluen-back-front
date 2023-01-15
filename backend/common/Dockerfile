FROM node:16.19.0-alpine
RUN npm install -g npm@9.3.0
RUN npm install -g rimraf
RUN npm install -g @nestjs/cli
RUN rm -rf /var/www/common
RUN mkdir -p /var/www/common
WORKDIR /var/www/common
ADD ./package.json /var/www/common/
ADD ./package-lock.json /var/www/common/
ADD ./tsconfig*.json /var/www/common/
ADD ./nest-cli.json /var/www/common/
RUN cd /var/www/common/
RUN npm install && npm cache clean --force
ADD ./src /var/www/common/src
