#!/usr/bin/make -f

VERSION           := $(shell tagit -p --dry-run)
VERSION_FILE1     := package.json
VERSION_FILE2     := package-lock.json

clean: unversion
	rm -rf ./dist

test: node_modules
	npm run test

node_modules:
	npm install

publish: clean test version upload unversion

upload:
	npm publish && node browserify.js && node s3.js

version:
	sed -i.bak -e 's/^ "version": "0\.0\.0",/ "version": "$(VERSION)",/g' "$(VERSION_FILE1)" && rm -f "$(VERSION_FILE1).bak"
	sed -i.bak -e 's/^ "version": "0\.0\.0",/ "version": "$(VERSION)",/g' "$(VERSION_FILE2)" && rm -f "$(VERSION_FILE2).bak"

unversion:
	git checkout "$(VERSION_FILE1)" "$(VERSION_FILE2)"

##########################################################

workspace:
	docker-compose run sdk /bin/sh

release:
	docker-compose run sdk make publish && tagit -p && git push origin --tags

# node_modules is a real directory target
.PHONY: clean test publish upload version unversion workspace release
