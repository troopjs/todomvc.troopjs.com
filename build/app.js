({
	"baseUrl" : "js",
	"paths" : {
		"jquery" : "lib/jquery/dist/jquery",
		"compose" : "lib/composejs/compose",
		"deferred" : "lib/troopjs-jquery/src/deferred",
		"text" : "lib/requirejs/text",
		"template" : "lib/troopjs-requirejs/src/template",
		"detect" : "lib/troopjs-requirejs/src/detect",
		"troopjs" : "lib/troopjs/src",
		"troopjs-jquery" : "lib/troopjs-jquery/src"
	},

	appDir : "../src/",

	modules : [ {
		name : "app",
		include : [
			"widget/clear",
			"widget/count",
			"widget/create",
			"widget/display",
			"widget/list",
			"widget/mark"
		]
	} ]
})
