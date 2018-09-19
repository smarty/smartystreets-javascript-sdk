#!/usr/bin/make -f

clean:
	rm -rf ./dist

test: node_modules
	npm run test

node_modules:
	npm install

publish:
	npm publish
	node browserify.js
	node s3.js

##########################################################

workspace:
	docker-compose run sdk /bin/sh

release:
	docker-compose run sdk tagit -p && make publish

# node_modules is a real directory target
.PHONY: clean test publish workspace release
