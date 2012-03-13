define( [ "troopjs/component/widget", "jquery" ], function ClearModule(Widget, $) {

	var IDS = "ids";

	function filter(item, index) {
		return item === null ? null : item.completed ? index : null;
	}

	return Widget.extend({
		"hub/todos/change" : function onChange(topic, items) {
			var ids = $.map(items, filter);
			var count = ids.length;
			var $element = this.$element;

			if (count > 0) {
				$element
					.data(IDS, ids)
					.text("Clear " + count + (count > 1 ? " completed items" : " completed item"))
					.show("fast");
			}
			else {
				$element
					.removeData(IDS)
					.text("Clear no completed items")
					.hide("fast");
			}
		},

		"dom/action/clear" : function onClear(topic, $event, ids) {
		},

		"dom/action.click" : $.noop
	});
});