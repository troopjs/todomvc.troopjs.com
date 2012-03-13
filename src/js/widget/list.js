define( [ "troopjs/component/widget", "troopjs/store/local", "jquery", "template!./item.html" ], function ListModule(Widget, store, $, template) {
	var NULL = null;
	var ITEMS = "todo-items";

	function compact(item, index) {
		return item !== NULL;
	}

	return Widget.extend(function ListWidget(element, name) {
		var self = this;

		// Defer init
		$.Deferred(function deferredInit(dfdInit) {
			// Defer get
			$.Deferred(function deferredGet(dfdGet) {
				store.get(ITEMS, dfdGet);
			})
			.done(function doneGet(items) {
				// Initialize or compact items
				items = (items === NULL)
					? []
					: $.grep(items, compact);

				// Set items - then resolve init
				store.set(ITEMS, items, dfdInit);
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
			// Update UI
			$($event.target)
				.closest("li")
				.hide("slow", function hidden() {
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
					delete items[index];
				})
				.done(function doneGet(items) {
					// Set items and resolve set
					store.set(ITEMS, items, dfdSet);
				});
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