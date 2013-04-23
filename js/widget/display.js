define([ "troopjs-browser/component/widget", "jquery" ], function DisplayModule(Widget, $) {

	function filter(item) {
		return item === null;
	}

	return Widget.extend({
		"hub:memory/todos/change": function onChange(items) {
			this.$element[$.grep(items, filter, true).length > 0 ? "show" : "hide"]();
		}
	});
});
