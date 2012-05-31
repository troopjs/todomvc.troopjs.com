require({
	"baseUrl" : "js",
	"paths" : {
		"jquery" : "lib/jquery/dist/jquery",
		"troopjs-bundle" : "lib/troopjs-bundle/dist/troopjs-bundle"
	},
	"deps": [ "troopjs-bundle" ]
}, [ "require", "jquery", "widget/application" ], function App(parentRequire, jQuery, Application) {

	// Load jQuery modules
	parentRequire([
		"troopjs-jquery/weave",
		"troopjs-jquery/destroy",
		"troopjs-jquery/hashchange",
		"troopjs-jquery/action"
	]);

	// Hook ready
	jQuery(document).ready(function ready($) {
		Application($(this.body), "app/todos").start();
	});
});
