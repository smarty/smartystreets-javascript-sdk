#!/usr/bin/make -f

VERSION           := $(shell tagit -p --dry-run)
VERSION_FILE1     := package.json
VERSION_FILE2     := package-lock.json

test: node_modules
	npm run test

node_modules:
	npm install

build:
	npm run build

publish: test version build upload unversion
	tagit -p
	git push origin --tags

upload:
	npm publish

version:
	sed -i.bak -e 's/^ "version": "0\.0\.0",/ "version": "$(VERSION)",/g' "$(VERSION_FILE1)" && rm -f "$(VERSION_FILE1).bak"
	sed -i.bak -e 's/^ "version": "0\.0\.0",/ "version": "$(VERSION)",/g' "$(VERSION_FILE2)" && rm -f "$(VERSION_FILE2).bak"

unversion:
	git checkout "$(VERSION_FILE1)" "$(VERSION_FILE2)"

# node_modules is a real directory target
.PHONY: test publish upload version unversion
