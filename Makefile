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
	git commit --tags

local-publish-minor: clean
	npm version minor
	npm publish
	node browserify.js
	node s3.js
	git commit --tags

local-publish-major: clean
	npm version major
	npm publish
	node browserify.js
	node s3.js
	git commit --tags

##############################################################

publish-patch:
	docker-compose run sdk make local-publish-patch

publish-minor:
	docker-compose run sdk make local-publish-minor

publish-major:
	docker-compose run sdk make local-publish-major	

test:
	docker-compose run sdk make local-test
