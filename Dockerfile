FROM node:alpine

COPY . /code
WORKDIR /code

RUN apk add -U make git nodejs nodejs-npm \
	&& wget -O - "https://github.com/smartystreets/version-tools/releases/download/0.0.6/release.tar.gz" | tar -xz -C /usr/local/bin/ \
	&& echo "${NPMRC}" > ~/.npmrc
