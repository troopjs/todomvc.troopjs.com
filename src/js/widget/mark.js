define( [ "troopjs/component/widget", "jquery" ], function MarkModule(Widget, $) {

	return Widget.extend({
		"dom/action/mark" : function onMark(topic, $event) {
			this.publish("todos/mark", $($event.target).prop("checked"));
		},

		"dom/action.change" : $.noop
	});
});