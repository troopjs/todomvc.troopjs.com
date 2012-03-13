define( [ "troopjs/component/widget" ], function DisplayModule(Widget) {
	return Widget.extend({
		"hub/todos/count": function onCount(topic, count) {
			this.$element[count > 0 ? "show" : "hide"]("fast");
		}
	});
});