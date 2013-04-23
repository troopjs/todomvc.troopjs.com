define([ "troopjs-browser/component/widget", "jquery" ], function FiltersModule(Widget, $) {

	return Widget.extend({
		"hub:memory/route" : function onRoute(uri) {
			this.publish("todos/filter", uri.source);
		},

		"hub:memory/todos/filter" : function onFilter(filter) {
			filter = filter || "/";

			// Update UI
			$("a[href^='#']")
				.removeClass("selected")
				.filter("[href='#" + filter + "']")
				.addClass("selected");
		}
	});
});
