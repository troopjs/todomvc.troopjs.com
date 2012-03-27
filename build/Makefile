DIST := ../dist
SOURCES := $(wildcard ../src/*)

all: prepare copy css js

clean:
	@@echo "Removing" $(DIST)
	@@rm -rf $(DIST)

copy: prepare $(DIST) $(SOURCES)
	@@echo "Copying [" $(SOURCES) "] to" $(DIST)
	@@cp --update --recursive --target-directory=$(DIST) $(SOURCES)

prepare:
	@@echo "Creating" $(DIST)
	@@mkdir -p $(DIST)

js: copy
	@@echo "Compiling JS"
	@@node lib/rjs/dist/r.js -o \
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
	@@echo "Compiling CSS"
	@@node lib/rjs/dist/r.js -o \
		out=$(DIST)/css/app-built.css\
		cssIn=$(DIST)/css/app.css

.PHONY: all clean
