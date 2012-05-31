SRC=../src
SRC_JS := $(SRC)/js
DIST := ../dist
DIST_JS := $(DIST)/js
DIST_CSS := $(DIST)/css
R := lib/rjs/dist/r.js

# All widgets
WIDGET := $(patsubst $(SRC_JS)/%.js,%,$(shell find $(SRC_JS)/widget -type f -name "*.js"))

#  All modules
INCLUDE := jquery \
	requireLib \
	config \
	troopjs-bundle \
	$(WIDGET) \
	app

# A literal comma
comma :=,

# A literal space
space :=
space +=

# Joins elements of the list in arg 2 with the given separator
#   1. Element separator
#   2. The list
join-with = $(subst $(space),$1,$(strip $2))

all: prepare copy js css

clean:
	@@echo "Removing" $(DIST)
	@@rm -rf $(DIST)

copy: prepare $(DIST) $(SRC)
	@@echo "Copying" $(SRC) "to" $(DIST)
	@@cp --update --recursive $(SRC)/* $(DIST)

prepare:
	@@echo "Creating" $(DIST)
	@@mkdir -p $(DIST)

js: copy header.txt footer.txt
	@@echo "Compiling JS"
	@@node $(R) -o \
		out=$(DIST_JS)/app-built.js \
		baseUrl=$(DIST_JS) \
		paths.jquery=lib/jquery/dist/jquery \
		paths.troopjs-bundle=lib/troopjs-bundle/dist/troopjs-bundle \
		paths.template=lib/troopjs-bundle/src/lib/troopjs-requirejs/src/template \
		paths.requireLib=lib/almond/almond \
		include=$(call join-with,$(comma),$(INCLUDE)) \
		excludeShallow=template \
		preserveLicenseComments=false \
		wrap.startFile=header.txt \
		wrap.endFile=footer.txt

css: copy
	@@echo "Compiling CSS"
	@@node $(R) -o \
		out=$(DIST_CSS)/app-built.css\
		cssIn=$(DIST_CSS)/app.css

.PHONY: all clean
