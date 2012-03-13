define( [ "troopjs/component/widget" ], function CountModule(Widget) {
	return Widget.extend({
		"hub/todos/count": function onCount(topic, count) {
			this.$element.text(count > 0 ? count + (count > 1 ? " items left" : " item left") : "no items left");
		}
	});
});