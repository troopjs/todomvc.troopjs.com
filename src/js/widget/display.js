define( [ "troopjs/component/widget", "jquery" ], function DisplayModule(Widget, $) {
	return Widget.extend({
		"hub/todos/count": function onCount(topic, count) {
			this.$element[count > 0 ? "show" : "hide"]("fast");
		}
	});
});