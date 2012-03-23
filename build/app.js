({
	"baseUrl" : "js",
	"paths" : {
		"jquery" : "lib/jquery/dist/jquery",
		"template" : "lib/troopjs-bundle/src/lib/troopjs-requirejs/src/template",
		"text" : "lib/troopjs-bundle/src/lib/requirejs/text",
		"troopjs-bundle" : "lib/troopjs-bundle/dist/troopjs-bundle-mini"
	},
	"deps": [ "troopjs-bundle" ],

	"appDir" : "../src/",

	"modules": [{
		"name" : "app",
		"include" : [
			"widget/clear",
			"widget/count",
			"widget/create",
			"widget/display",
			"widget/list",
			"widget/mark"
		]
	}]
})
