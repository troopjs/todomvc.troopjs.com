define( [ "troopjs/component/widget", "troopjs/store/local", "jquery", "template!./item.html" ], function ListModule(Widget, store, $, template) {
	var NULL = null;
	var ITEMS = "todo-items";

	/**
	 * Compacts array by removing values that are null
	 * @param item Array item
	 * @param index Item index
	 * @returns {Boolean} FALSE if item === NULL otherwise TRUE
	 */
	function compact(item, index) {
		return item !== NULL;
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
				store.set(ITEMS, items === NULL ? [] : $.grep(items, compact), dfdInit);
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
			// Count
			self.publish("todos/count", items.length);
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
				// Count
				self.publish("todos/count", $.grep(items, compact).length);
			});
		},

		"dom/action/status": function onStatus(topic, $event, index) {
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
					items[index] = NULL;
				})
				.done(function doneGet(items) {
					// Set items and resolve set
					store.set(ITEMS, items, dfdSet);
				});
			})
			.done(function doneSet(items) {
				// Count
				self.publish("todos/count", $.grep(items, compact).length);
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
				});
			});
		},

		"dom/action.keyup": function () {}
	});
});