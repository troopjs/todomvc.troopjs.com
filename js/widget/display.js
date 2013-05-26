define([ "troopjs-browser/component/widget", "jquery" ], function DisplayModule(Widget, $) {
	"use strict";

	function filter(item) {
		return item !== null;
	}

	return Widget.extend({
		"hub:memory/todos/change": function onChange(items) {
			this.$element[$.grep(items, filter).length > 0 ? "show" : "hide"]();
		}
	});
});
