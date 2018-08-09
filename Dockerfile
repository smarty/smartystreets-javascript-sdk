FROM node:alpine

COPY . /code
WORKDIR /code

RUN apk add -U make git nodejs nodejs-npm && npm i
