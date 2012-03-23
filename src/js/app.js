require({
	"baseUrl" : "js",
	"paths" : {
		"jquery" : "lib/jquery/dist/jquery",
		"troopjs-bundle" : "lib/troopjs-bundle/dist/troopjs-bundle"
	},
	"deps": [ "troopjs-bundle" ]
}, [ "jquery" ], function App(jQuery) {
	jQuery(document).ready(function ready($) {
		$(this.body).find("[data-weave]").weave();
	});
});