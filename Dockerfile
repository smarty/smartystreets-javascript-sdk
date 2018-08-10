FROM node:alpine

COPY . /code
COPY .gitconfig /root/.gitconfig
COPY .ssh /root/.ssh
WORKDIR /code

RUN apk add -U make git openssh nodejs nodejs-npm && npm install
