# Pull Docker Hub base image
FROM node:lts

# Set working directory
WORKDIR /client

COPY . /client/

# Install app dependencies
COPY package*.json /client/
RUN npm install --legacy-peer-deps --silent
RUN npm install --location=global --save serve

RUN npm run build

# Copy app to container
COPY . /client/

EXPOSE 3000