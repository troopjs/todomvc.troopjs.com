all: clean dist

dist: app.js
	node lib/rjs/dist/r.js -o app.js dir=../dist

clean:
	rm -rf ../dist
