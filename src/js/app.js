require({
	"baseUrl" : "js",
	"paths" : {
		"jquery" : "lib/jquery/dist/jquery",
		"compose" : "lib/composejs/compose",
		"deferred" : "lib/troopjs-jquery/src/deferred",
		"troopjs" : "lib/troopjs/src",
		"troopjs-jquery" : "lib/troopjs-jquery/src"
	}
}, [ "jquery", "troopjs/component/widget", "troopjs/pubsub/hub", "troopjs-jquery/weave", "troopjs-jquery/wire" ], function App(jQuery, Widget, hub) {
	jQuery(document).ready(function ready($) {
		var element = this.body;

		$.Deferred(function deferredStart(dfdStart) {
			var widget = new Widget(element, "widget/body");

			widget.weave(widget.$element, dfdStart);

			console.log(widget);
		}).done(function doneStart(widget) {
			console.log(arguments);
		});
	});
});