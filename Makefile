#!/usr/bin/make -f

tests:
	npm run test

clean:
	rm -rf ./dist

publish-patch: clean
	npm version patch
	npm publish
	node browserify.js
	node s3.js

publish-minor: clean
	npm version minor
	npm publish
	node browserify.js
	node s3.js

publish-major: clean
	npm version major
	npm publish
	node browserify.js
	node s3.js
