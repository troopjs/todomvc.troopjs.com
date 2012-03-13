define( [ "troopjs/component/widget", "troopjs/store/local", "jquery", "template!./item.html" ], function ListModule(Widget, store, $, template) {
	var ITEMS = "todo-items";

	function filter(item, index) {
		return item === null;
	}

	return Widget.extend(function ListWidget(element, name) {
		var self = this;

		// Defer initialization
		$.Deferred(function deferredInit(dfdInit) {
			// Defer get
			$.Deferred(function deferredGet(dfdGet) {
				store.get(ITEMS, dfdGet);
			})
			.done(function doneGet(items) {
				// Set items (empty or compacted) - then resolve
				store.set(ITEMS, items === null ? [] : $.grep(items, filter, true), dfdInit);
			});
		})
		.done(function doneInit(items) {
			// Iterate each item
			$.each(items, function itemIterator(i, item) {
				// Append to self
				self.append(template, {
					"i": i,
					"item": item
				});
			});
		})
		.done(function doneInit(items) {
			self.publish("todos/change", items);
		});
	}, {
		"hub/todos/add": function onAdd(topic, text) {
			var self = this;

			// Defer set
			$.Deferred(function deferredSet(dfdSet) {
				// Defer get
				$.Deferred(function deferredGet(dfdGet) {
					store.get(ITEMS, dfdGet);
				})
				.done(function doneGet(items) {
					// Get the next index
					var i = items.length;
					// Create new item, store in items
					var item = items[i] = {
						"completed": false,
						"text": text
					};

					// Append new item to self
					self.append(template, {
						"i": i,
						"item": item
					});
				})
				.done(function doneGet(items) {
					// Set items and resolve set
					store.set(ITEMS, items, dfdSet);
				});
			})
			.done(function doneSet(items) {
				self.publish("todos/change", items);
			});
		},

		"dom/action/status": function onStatus(topic, $event, index) {
			var self = this;
			var $target = $($event.target);
			var completed = $target.prop("checked");

			// Update UI
			$target
				.closest("li")
				.toggleClass("done", completed);

			// Defer get
			$.Deferred(function deferredSet(dfdSet) {
				// Defer set
				$.Deferred(function deferredGet(dfdGet) {
					store.get(ITEMS, dfdGet);
				})
				.done(function doneGet(items) {
					// Update completed
					items[index].completed = completed;
				})
				.done(function doneGet(items) {
					// Set items and resolve set
					store.set(ITEMS, items, dfdSet);
				});
			})
			.done(function doneSet(items) {
				self.publish("todos/change", items);
			});
		},

		"dom/action/delete": function onDelete(topic, $event, index) {
			var self = this;

			// Update UI
			$($event.target)
				.closest("li")
				.hide("slow", function hidden() {
					// Remove LI
					$(this).remove();
				});

			// Defer set
			$.Deferred(function deferredSet(dfdSet) {
				// Defer get
				$.Deferred(function deferredGet(dfdGet) {
					// Get the items
					store.get(ITEMS, dfdGet);
				})
				.done(function doneGet(items) {
					// Delete item
					items[index] = null;
				})
				.done(function doneGet(items) {
					// Set items and resolve set
					store.set(ITEMS, items, dfdSet);
				});
			})
			.done(function doneSet(items) {
				self.publish("todos/change", items);
			});
		},

		"dom/action/edit.keyup": function onEditKeyUp(topic, $event, index) {
			// Defer set
			$.Deferred(function deferredSet(dfdSet) {
				// Defer get
				$.Deferred(function deferredGet(dfdGet) {
					// Get items
					store.get(ITEMS, dfdGet);
				})
				.done(function doneGet(items) {
					// Update text
					items[index].text = $($event.target).text();
				})
				.done(function doneGet(items) {
					// Set items and resolve set
					store.set(ITEMS, items, dfdSet);
				})
				.done(function doneSet(items) {
					self.publish("todos/change", items);
				});
			});
		},

		"dom/action.keyup": function () {}
	});
});