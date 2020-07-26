ARG NODE_MAJOR
FROM node:$NODE_MAJOR-slim

# Create a directory for the app code
RUN mkdir -p /app

# Installing dependencies
COPY package.json /app
COPY package-lock.json /app

WORKDIR /app

RUN npm install

# Copying source files
COPY . /app

RUN npx next telemetry disable