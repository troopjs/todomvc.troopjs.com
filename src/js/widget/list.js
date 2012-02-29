define( [ "troopjs/component/widget", "jquery", "template!./item.html" ], function ListModule(Widget, $, template) {
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

	return Widget.extend(function ListWidget(element, name) {
		var self = this;

		$.each(data, function itemIterator(i, item) {
			self.append(template, {
				"i": i,
				"item": item
			});
		});
	}, {
		"hub/todos/add": function onAdd(topic, text) {
			var i = data.length;
			var item = data[i] = {
				"i": i,
				"item": {
					"completed": false,
					"text": text
				}
			};

			this.append(template, item);
		},

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