#!/usr/bin/make -f

VERSION       := $(shell tagit -p --dry-run)
VERSION_FILE1 := package.json
VERSION_FILE2 := package-lock.json

test: node_modules fmt
	npm run test

node_modules:
	npm install

fmt:
	npx prettier --write .

clean:
	@git checkout "$(VERSION_FILE1)" "$(VERSION_FILE2)"

build: node_modules
	npm run build

compile: build

cover: node_modules
	npm run test -- --reporter=spec

integrate: build
	@echo "Running integration examples..."
	@node examples/us_street.mjs > /dev/null || true
	@node examples/us_zipcode.mjs > /dev/null || true
	@node examples/us_autocomplete_pro.mjs > /dev/null || true
	@node examples/us_extract.mjs > /dev/null || true
	@node examples/us_reverse_geo.mjs > /dev/null || true
	@node examples/us_enrichment.mjs > /dev/null || true
	@node examples/international_street.mjs > /dev/null || true
	@node examples/international_address_autocomplete.mjs > /dev/null || true
	@node examples/international_postal_code.mjs > /dev/null || true

version:
	sed -i.bak -e 's/^ "version": "0\.0\.0",/ "version": "$(VERSION)",/g' "$(VERSION_FILE1)" && rm -f "$(VERSION_FILE1).bak"
	sed -i.bak -e 's/^ "version": "0\.0\.0",/ "version": "$(VERSION)",/g' "$(VERSION_FILE2)" && rm -f "$(VERSION_FILE2).bak"

publish: test build version
	npm publish
	git checkout "$(VERSION_FILE1)" "$(VERSION_FILE2)"
	tagit -p
	git push origin --tags

.PHONY: test fmt clean build compile cover integrate version publish
