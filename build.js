({
	"baseUrl" : "js",
	"paths" : {
		"json" : "lib/jsonjs/json2",
		"jquery" : "lib/jquery/dist/jquery",
		"compose" : "lib/composejs/compose",
		"deferred" : "lib/troopjs-jquery/src/deferred",
		"text" : "lib/requirejs/text",
		"template" : "lib/troopjs-require/src/template",
		"detect" : "lib/troopjs-require/src/detect",
		"troopjs" : "lib/troopjs/src",
		"troopjs-jquery" : "lib/troopjs-jquery/src"
	},

	appDir : "./src/",

	fileExclusionRegExp: "lib/troopjs",

	modules : [ {
		name : "app",
		include : [
			"widget/display/panel"
		]
	} ]
})
