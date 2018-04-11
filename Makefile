#!/usr/bin/make -f

tests:
	npm run test

publish-patch:
	npm version patch
	npm publish

publish-minor:
	npm version minor
	npm publish

publish-major:
	npm version major
	npm publish