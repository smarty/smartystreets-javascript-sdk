#!/usr/bin/make -f

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

examples: build
	@echo "Running examples..."
	@node examples/us_street.mjs || true
	@node examples/us_street_iana_timezone.mjs || true
	@node examples/us_zipcode.mjs || true
	@node examples/us_autocomplete_pro.mjs || true
	@node examples/us_extract.mjs || true
	@node examples/us_reverse_geo.mjs || true
	@node examples/us_enrichment.mjs || true
	@node examples/international_street.mjs || true
	@node examples/international_address_autocomplete.mjs || true
	@node examples/international_postal_code.mjs || true

integrate: examples

version:
	sed -i.bak -e 's/^ "version": "0\.0\.0",/ "version": "$(VERSION)",/g' "$(VERSION_FILE1)" && rm -f "$(VERSION_FILE1).bak"
	sed -i.bak -e 's/^ "version": "0\.0\.0",/ "version": "$(VERSION)",/g' "$(VERSION_FILE2)" && rm -f "$(VERSION_FILE2).bak"

publish: test build version
	npm publish

.PHONY: test fmt clean build compile cover examples integrate version publish
