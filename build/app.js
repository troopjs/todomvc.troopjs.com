({
	"baseUrl" : "js",
	"paths" : {
		"jquery" : "lib/jquery/dist/jquery",
		"compose" : "lib/troopjs-bundle/src/lib/composejs/compose",
		"deferred" : "lib/troopjs-bundle/src/lib/troopjs-jquery/src/deferred",
		"text" : "lib/troopjs-bundle/src/lib/requirejs/text",
		"template" : "lib/troopjs-bundle/src/lib/troopjs-requirejs/src/template",
		"troopjs" : "lib/troopjs-bundle/src/lib/troopjs/src",
		"troopjs-jquery" : "lib/troopjs-bundle/src/lib/troopjs-jquery/src"
	},

	"appDir" : "../src/",

	"name" : "app",
	"include" : [
		"widget/clear",
		"widget/count",
		"widget/create",
		"widget/display",
		"widget/list",
		"widget/mark"
	]
})
