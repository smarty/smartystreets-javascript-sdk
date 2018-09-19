#!/usr/bin/make -f

VERSION_INCREMENT ?= -p
VERSION           := $(shell tagit $(VERSION_INCREMENT) --dry-run)
VERSION_FILE1     := package.json
VERSION_FILE2     := package-lock.json

clean:
	rm -rf ./dist
	git checkout "$(VERSION_FILE1)" "$(VERSION_FILE2)"

test: node_modules
	npm run test

node_modules:
	npm install

identity:
	@echo "$(NPMRC)" > ~/.npmrc

version:
	sed -i -E 's/^ "version": "\d+\.\d+\.\d+",/ "version": "$(VERSION)",/g' "$(VERSION_FILE1)"
	sed -i -E 's/^ "version": "\d+\.\d+\.\d+",/ "version": "$(VERSION)",/g' "$(VERSION_FILE2)"

publish: clean test identity version
	npm publish && node browserify.js && node s3.js

##########################################################

workspace:
	docker-compose run sdk /bin/sh

release:
	docker-compose run sdk make publish \
		&& git commit -am "Incremented version to $(VERSION)" \
		&& tagit -p \
		&& git push origin master --tags


# node_modules is a real directory target
.PHONY: clean test publish workspace release
