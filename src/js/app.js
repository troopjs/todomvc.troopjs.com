require({
	"baseUrl" : "js",
	"paths" : {
		"json" : "lib/jsonjs/json2",
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
	"json",
	"troopjs-jquery/action",
	"troopjs-jquery/destroy",
	"troopjs-jquery/dimensions",
	"troopjs-jquery/hashchange",
	"troopjs-jquery/weave",
	"troopjs-jquery/wire" ], function App(jQuery) {
	jQuery(document).ready(function ready($) {
		var body = this.body;

		$.Deferred(function deferredStart(dfdStart) {
			$(body).find("[data-weave]").weave(dfdStart);
		}).done(function doneStart() {
		});
	});
});