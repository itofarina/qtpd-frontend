##### Stage 1

FROM node:10.15.0 as builder

# those variables need to be defined when running the dockerfile (e.g.: in the docker-compose.yml)
ARG APIEndpoint
ARG ENVIRONMENT
ARG googleMapsApiKey

WORKDIR /app

# Copy project files to the docker image
COPY . .

# install angular/cli globally (latest version, change this to the version you are using)
# RUN yarn global add @angular/cli@latest

# if you prefer npm, replace the above command with
RUN npm install @angular/cli@latest -g

# install packages
# RUN yarn install

# FOR NPM
RUN npm install

# SET ENVIRONMENT VARIABLES
ENV APIEndpoint "$APIEndpoint"
ENV ENVIRONMENT="$ENVIRONMENT"
ENV googleMapsApiKey="$googleMapsApiKey"
ENV googleAnalyticsKey="$googleAnalyticsKey"

# Build Angular Application in Production
RUN ng build --prod

#### STAGE 2
#### Deploying the application

FROM nginx:alpine

VOLUME  /var/cache/nginx

# Copy the build files from the project
COPY --from=builder /app/dist/qtpd-presentation /usr/share/nginx/html

# Copy Nginx Files
COPY --from=builder /app/.docker/.config/nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE Port 80
EXPOSE 80