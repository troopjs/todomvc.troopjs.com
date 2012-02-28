require({
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
	}
}, [
	"jquery",
	"troopjs/component/widget",
	"troopjs/pubsub/hub",
	"troopjs-jquery/action",
	"troopjs-jquery/destroy",
	"troopjs-jquery/dimensions",
	"troopjs-jquery/hashchange",
	"troopjs-jquery/weave",
	"troopjs-jquery/wire" ], function App(jQuery, Widget, hub) {
	jQuery(document).ready(function ready($) {
		var body = this.body;

		$.Deferred(function deferredStart(dfdStart) {
			var widget = new Widget(body, "widget/body");

			widget.weave(widget.$element, dfdStart);
		}).done(function doneStart() {
		});
	});
});