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

examples-ts: build
	@echo "Running TypeScript examples..."
	@npx tsx examples/us_street.ts || true
	@npx tsx examples/us_street_iana_timezone.ts || true
	@npx tsx examples/us_zipcode.ts || true
	@npx tsx examples/us_autocomplete_pro.ts || true
	@npx tsx examples/us_extract.ts || true
	@npx tsx examples/us_reverse_geo.ts || true
	@npx tsx examples/us_enrichment.ts || true
	@npx tsx examples/us_enrichment_business.ts || true
	@npx tsx examples/us_enrichment_etag.ts || true
	@npx tsx examples/international_street.ts || true
	@npx tsx examples/international_address_autocomplete.ts || true
	@npx tsx examples/international_postal_code.ts || true

examples-js: build
	@echo "Running JavaScript examples..."
	@node examples/us_street.mjs || true
	@node examples/us_street_iana_timezone.mjs || true
	@node examples/us_zipcode.mjs || true
	@node examples/us_autocomplete_pro.mjs || true
	@node examples/us_extract.mjs || true
	@node examples/us_reverse_geo.mjs || true
	@node examples/us_enrichment.mjs || true
	@node examples/us_enrichment_business.mjs || true
	@node examples/us_enrichment_etag.mjs || true
	@node examples/international_street.mjs || true
	@node examples/international_address_autocomplete.mjs || true
	@node examples/international_postal_code.mjs || true

examples: examples-ts examples-js

integrate: examples

version:
	sed -i.bak -e 's/^ "version": "0\.0\.0",/ "version": "$(VERSION)",/g' "$(VERSION_FILE1)" && rm -f "$(VERSION_FILE1).bak"
	sed -i.bak -e 's/^ "version": "0\.0\.0",/ "version": "$(VERSION)",/g' "$(VERSION_FILE2)" && rm -f "$(VERSION_FILE2).bak"

publish: test build version
	npm publish

.PHONY: test fmt clean build compile cover examples examples-ts examples-js integrate version publish
