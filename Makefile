default: build

version := $(shell node -p "require('./package.json').version")
build: 
	npm run build
release:
	npm install
	npm run build 
	if [ -d 'docs/$(version)' ]; then rm -Rf docs/$(version); fi
	mkdir docs/$(version)
	cp dist/* docs/$(version)
