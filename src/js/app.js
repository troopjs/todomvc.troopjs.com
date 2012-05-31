require({
	"baseUrl" : "js",
	"paths" : {
		"jquery" : "lib/jquery/dist/jquery",
		"troopjs-bundle" : "lib/troopjs-bundle/dist/troopjs-bundle"
	},
	"deps": [ "troopjs-bundle" ]
}, [ "jquery", "widget/application" ], function App(jQuery, Application) {
	jQuery(document).ready(function ready($) {
		Application($(this.body), "app/todos").start();
	});
});
