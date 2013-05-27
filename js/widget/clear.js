/*global define:false */
define([ "troopjs-browser/component/widget", "jquery" ], function ClearModule(Widget, $) {
	"use strict";

	function filter(item) {
		return item !== null && item.completed;
	}

	return Widget.extend({
		"hub:memory/todos/change" : function onChange(items) {
			var count = $.grep(items, filter).length;

			this.$element.text("Clear completed (" + count + ")").toggle(count > 0);
		},

		"dom/click" : function onClear() {
			this.publish("todos/clear");
		}
	});
});