FROM node:alpine

COPY . /code
COPY .gitconfig /root/.gitconfig
WORKDIR /code

RUN apk add -U make git nodejs nodejs-npm && npm install
