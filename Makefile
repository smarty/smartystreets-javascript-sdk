#!/usr/bin/make -f

local-test:
	npm run test

clean:
	rm -rf ./dist

version-patch: clean
	npm version patch

version-minor: clean
	npm version minor

version-major: clean
	npm version major

local-publish:
	npm publish
	node browserify.js
	node s3.js
	git push origin master --tags

##############################################################

nuke:
	docker system prune -a

shell:
	docker-compose run sdk sh	

test:
	docker-compose run sdk make local-test

publish-patch: copy-gitconfig
	docker-compose run sdk make version-patch && make local-publish

publish-minor: copy-gitconfig
	docker-compose run sdk make local-publish-minor

publish-major: copy-gitconfig
	docker-compose run sdk make local-publish-major	

copy-gitconfig:
	test -d .gitconfig || cp -r ~/.gitconfig .
