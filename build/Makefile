DIST := ../dist
SOURCES := $(wildcard ../src/*)

all: clean prepare copy css js

clean:
	rm -rf $(DIST)

copy: prepare $(DIST) $(SOURCES)
	cp --recursive --target-directory=$(DIST) $(SOURCES)

prepare:
	mkdir -p $(DIST)

js: copy
	node lib/rjs/dist/r.js -o \
		out=$(DIST)/js/app-built.js \
		baseUrl=../dist/js \
		paths.jquery=lib/jquery/dist/jquery \
		paths.troopjs-bundle=lib/troopjs-bundle/dist/troopjs-bundle \
		paths.template=lib/troopjs-bundle/src/lib/troopjs-requirejs/src/template \
		paths.text=lib/troopjs-bundle/src/lib/requirejs/text \
		paths.requireLib=lib/almond/almond \
		deps=requireLib,jquery,config,troopjs-bundle \
		include=app,widget/clear,widget/count,widget/create,widget/display,widget/list,widget/mark \
		excludeShallow=template,text

css: copy
	node lib/rjs/dist/r.js -o \
		out=$(DIST)/css/app-built.css\
		cssIn=$(DIST)/css/app.css

.PHONY: all