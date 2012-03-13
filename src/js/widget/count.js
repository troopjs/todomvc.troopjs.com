define( [ "troopjs/component/widget" ], function CountModule(Widget) {

	function filter(item, index) {
		return item === null || item.completed;
	}

	return Widget.extend({
		"hub/todos/change": function onChange(topic, items) {
			var count = $.grep(items, filter, true).length;

			this.$element.text(count > 0 ? count + (count > 1 ? " items left" : " item left") : "no items left");
		}
	});
});