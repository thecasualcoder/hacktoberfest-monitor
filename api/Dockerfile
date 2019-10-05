FROM node:10.16.3

ENV NODE_ENV production
ENV APP_DIR /opt/app
WORKDIR ${APP_DIR}

ADD package.json package-lock.json ./
RUN npm install --production
ADD . ./

EXPOSE 3000

CMD ["npm", "start"]
