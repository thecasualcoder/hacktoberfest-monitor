FROM node:10.16.3 as source
WORKDIR /opt/app
COPY ./package.json ./
RUN npm install --production
ENV PUBLIC_URL https://hacktoberfest2020.geeknight.in/submit/
COPY . ./
RUN npm run build

FROM nginx:1.17.4
WORKDIR /opt/app
COPY --from=source /opt/app/build .
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx",  "-g",  "daemon off;"]
