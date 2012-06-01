require({
	"paths" : {
		"jquery" : "lib/jquery/dist/jquery",
		"troopjs-bundle" : "lib/troopjs-bundle/dist/troopjs-bundle"
	},
}, [ "require", "jquery", "troopjs-bundle" ], function Deps(parentRequire, jQuery) {

	// Application and plug-ins
	parentRequire([
		"widget/application",
		"troopjs-jquery/weave",
		"troopjs-jquery/destroy",
		"troopjs-jquery/hashchange",
		"troopjs-jquery/action" ], function App(Application) {

		// Hook ready
		jQuery(document).ready(function ready($) {
			Application($(this.body), "app/todos").start();
		});
	});
});