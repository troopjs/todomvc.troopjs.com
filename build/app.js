({
	"baseUrl" : "js",

	"paths" : {
		"jquery" : "lib/jquery/dist/jquery",
		"troopjs-bundle" : "lib/troopjs-bundle/dist/troopjs-bundle",
		"template" : "lib/troopjs-bundle/src/lib/troopjs-requirejs/src/template",
		"text" : "lib/troopjs-bundle/src/lib/requirejs/text",
		"almond" : "lib/almond/almond"
	},

	"deps": [ "almond", "config", "jquery", "troopjs-bundle" ],

	"appDir" : "../src/",

	"modules": [{
		"name" : "app-built",
		"include" : [
			"app",
			"widget/clear",
			"widget/count",
			"widget/create",
			"widget/display",
			"widget/list",
			"widget/mark"
		],
		"create": true
	}]
})
