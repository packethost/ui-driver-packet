default: build

version := 1.0.3
build: 
	npm run build
release:
	npm install
	npm run build 
	if [ -d 'docs/$(version)' ]; then rm -Rf docs/$(version); fi
	mkdir docs/$(version)
	cp dist/* docs/$(version)
