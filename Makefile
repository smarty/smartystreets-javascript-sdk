#!/usr/bin/make -f

VERSION           := $(shell tagit -p --dry-run)
VERSION_FILE1     := package.json
VERSION_FILE2     := package-lock.json

clean:
	rm -rf ./dist
	git checkout "$(VERSION_FILE1)" "$(VERSION_FILE2)"

test: node_modules
	npm run test

node_modules:
	npm install

version:
	sed -i -E 's/^ "version": "0\.0\.0",/ "version": "$(VERSION)",/g' "$(VERSION_FILE1)"
	sed -i -E 's/^ "version": "0\.0\.0",/ "version": "$(VERSION)",/g' "$(VERSION_FILE2)"

publish: clean test version
	npm publish \
		&& node browserify.js && node s3.js \
		&& git checkout "$(VERSION_FILE1)" "$(VERSION_FILE2)"

##########################################################

workspace:
	docker-compose run sdk /bin/sh

release:
	docker-compose run sdk make publish && tagit -p && git push origin --tags

# node_modules is a real directory target
.PHONY: clean test publish workspace release
