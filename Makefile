default: build

version := 1.0.1
build: 
	npm run build
release:
	npm run build 
	mkdir docs/$(version)
	cp dist/* docs/$(version)