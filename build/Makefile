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

js: copy header.txt footer.txt
	@@echo "Compiling JS"
	@@node lib/rjs/dist/r.js -o \
		out=$(DIST)/js/app-built.js \
		baseUrl=../dist/js \
		paths.jquery=lib/jquery/dist/jquery \
		paths.troopjs-bundle=lib/troopjs-bundle/dist/troopjs-bundle \
		paths.template=lib/troopjs-bundle/src/lib/troopjs-requirejs/src/template \
		paths.text=lib/troopjs-bundle/src/lib/requirejs/text \
		paths.requireLib=lib/almond/almond \
		include=requireLib,jquery,config,troopjs-bundle,app,widget/clear,widget/count,widget/create,widget/display,widget/list,widget/mark \
		excludeShallow=template,text \
		preserveLicenseComments=false \
		wrap.startFile=header.txt \
		wrap.endFile=footer.txt

css: copy
	@@echo "Compiling CSS"
	@@node lib/rjs/dist/r.js -o \
		out=$(DIST)/css/app-built.css\
		cssIn=$(DIST)/css/app.css

.PHONY: all clean
