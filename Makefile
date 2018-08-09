#!/usr/bin/make -f

local-test:
	npm run test

clean:
	rm -rf ./dist

local-publish-patch: clean
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

##############################################################

publish-patch:
	docker-compose run sdk make local-publish-patch

test:
	docker-compose run sdk make local-test
