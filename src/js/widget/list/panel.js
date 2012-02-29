define( [ "troopjs/component/widget", "jquery", "template!./panel.html" ], function ListPanelModule(Widget, $, template) {
	var data = [{
			"id": 1,
			"completed": false,
			"text": "Work"
		}, {
			"id": 2,
			"completed": true,
			"text": "Play"
		}, {
			"id": 3,
			"completed": true,
			"text": "Sleep"
		}];

	return Widget.extend(function ListPanelWidget(element, name) {
		this.html(template, data);
	}, {
		"dom/action/status": function onStatus(topic, $event, id) {
			console.log("status", id);
		},

		"dom/action/delete": function onDelete(topic, $event, id) {
			console.log("delete", id);
		},

		"dom/action/edit.keyup": function onEditKeyUp(topic, $event, id) {
			console.log("edit", id);
		},

		"dom/action.keyup": function () {}
	});
});