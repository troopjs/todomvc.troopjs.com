define( [ "troopjs/component/widget", "jquery", "template!./list.html" ], function TodosListModule(Widget, $, template) {
	var data = [{
			"completed": false,
			"text": "Work"
		}, {
			"completed": true,
			"text": "Play"
		}, {
			"completed": true,
			"text": "Sleep"
		}];

	return Widget.extend(function TodosListWidget(element, name) {
		this.html(template, data);
	}, {
		"dom/action/status": function onStatus(topic, $event, index) {
			data[index].checked = $($event.target).prop("checked");
		},

		"dom/action/delete": function onDelete(topic, $event, index) {
			$($event.target)
				.closest("li")
				.hide("slow", function hidden() {
					$(this).remove();
					delete data[index];
				});
		},

		"dom/action/edit.keyup": function onEditKeyUp(topic, $event, index) {
			data[index].text = $($event.target).text();
		},

		"dom/action.keyup": function () {}
	});
});