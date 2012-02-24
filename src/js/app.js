require({
	"baseUrl": "js",
	"paths": {
		"jquery": "lib/jquery/dist/jquery",
		"compose": "lib/composejs/compose",
		"deferred": "lib/troopjs-jquery/src/deferred",
		"troopjs": "lib/troopjs/src"
	}
}, [ "jquery", "troopjs/component/widget", "troopjs/pubsub/hub" ], function App(jQuery, Widget, hub) {
	jQuery(document).ready(function ready($) {
		$.Deferred(function deferredStart(dfdStart) {
			var widget = new Widget(this);

			dfdStart.resolve(widget);
		}).done(function doneStart(widget) {
			
		});
	});
});