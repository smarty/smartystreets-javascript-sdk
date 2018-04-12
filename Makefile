#!/usr/bin/make -f

tests:
	npm run test

publish-patch:
	npm version patch
	npm publish
	node browserify.js

publish-minor:
	npm version minor
	npm publish
	node browserify.js

publish-major:
	npm version major
	npm publish
	node browserify.js
