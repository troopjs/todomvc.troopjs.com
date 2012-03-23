require({
	"baseUrl" : "js",
	"paths" : {
		"jquery" : "lib/jquery/dist/jquery",
		"troopjs-bundle" : "lib/troopjs-bundle/dist/troopjs-bundle-mini"
	},
	"deps": [ "troopjs-bundle" ]
}, [ "jquery" ], function App(jQuery) {
	jQuery(document).ready(function ready($) {
		var body = this.body;

		$.Deferred(function deferredStart(dfdStart) {
			$(body).find("[data-weave]").weave(dfdStart);
		}).done(function doneStart() {
		});
	});
});