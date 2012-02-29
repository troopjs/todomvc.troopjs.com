define( [ "troopjs/component/widget", "jquery", "template!./item.html" ], function ListModule(Widget, $, template) {
	var UNDEFINED = undefined;
	var ITEMS = "todo-items";

	return Widget.extend(function ListWidget(element, name) {
		var self = this;

		$.Deferred(function deferredInit(dfdInit) {
			$.Deferred(function deferredGet(dfdGet) {
				self.publish("hub/store/session/get", ITEMS, dfdGet);
			})
			.done(function doneGet(items) {
				if (items !== UNDEFINED) {
					dfdInit.resolve(items);
				}
				else {
					self.publish("hub/store/session/set", ITEMS, [], dfdInit);
				}
			});
		})
		.done(function doneInit(items) {
			$.each(items, function itemIterator(i, item) {
				self.append(template, {
					"i": i,
					"item": item
				});
			});
		});
	}, {
		"hub/todos/add": function onAdd(topic, text) {
			var self = this;

			$.Deferred(function deferredGet(dfdGet) {
				self.publish("hub/store/session/get", ITEMS, dfdGet);
			})
			.done(function doneGet(items) {
				var i = items.length;
				var item = items[i] = {
					"i": i,
					"item": {
						"completed": false,
						"text": text
					}
				};

				self.append(template, item);
			});
		},

		"dom/action/status": function onStatus(topic, $event, index) {
			var self = this;

			$.Deferred(function deferredGet(dfdGet) {
				self.publish("hub/store/session/get", ITEMS, dfdGet);
			})
			.done(function doneGet(items) {
				items[index].checked = $($event.target).prop("checked");
			});
		},

		"dom/action/delete": function onDelete(topic, $event, index) {
			var self = this;

			$($event.target)
				.closest("li")
				.hide("slow", function hidden() {
					$(this).remove();

					$.Deferred(function deferredGet(dfdGet) {
						self.publish("hub/store/session/get", ITEMS, dfdGet);
					})
					.done(function doneGet(items) {
						delete items[index];
					});
				});
		},

		"dom/action/edit.keyup": function onEditKeyUp(topic, $event, index) {
			var self = this;

			$.Deferred(function deferredGet(dfdGet) {
				self.publish("hub/store/session/get", ITEMS, dfdGet);
			})
			.done(function doneGet(items) {
				items[index].text = $($event.target).text();
			});
		},

		"dom/action.keyup": function () {}
	});
});