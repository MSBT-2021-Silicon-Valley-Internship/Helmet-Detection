# first building react project, using node base image
FROM node:latest as build-stage

# setting working dir inside container
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

# required to install packages
COPY package*.json /usr/src/app/

# installing npm packages
RUN npm install --silent

# copying over react source material
COPY . /usr/src/app

# creating production build to serve through nginx
RUN npm run build

# starting second, nginx build-stage
FROM nginx:latest

# removing default nginx config file
RUN rm /etc/nginx/conf.d/default.conf

# copying our nginx config
COPY --from=build-stage /usr/src/app/container_server.conf /etc/nginx/conf.d/

# copying production build from last stage to serve through nginx
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html

# exposing port 8080 on container
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]