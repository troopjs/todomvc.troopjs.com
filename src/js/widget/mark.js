define( [ "troopjs/component/widget" ], function MarkModule(Widget) {

	return Widget.extend({
		"dom/change" : function onMark(topic, $event) {
			this.publish("todos/mark", $($event.target).prop("checked"));
		}
	});
});