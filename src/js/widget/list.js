define( [ "troopjs-core/component/widget", "troopjs-core/store/local", "jquery", "template!./item.html" ], function ListModule(Widget, store, $, template) {
	var RE = /^\s+|\s+$/;
	var EMPTY = "";
	var DISABLED = "disabled";

	function filter(item, index) {
		return item === null;
	}

	return Widget.extend(function ListWidget(element, name) {
		var self = this;

		// Defer initialization
		$.Deferred(function deferredInit(dfdInit) {
			// Defer get
			$.Deferred(function deferredGet(dfdGet) {
				store.get(self.config.store, dfdGet);
			})
			.done(function doneGet(items) {
				// Set items (empty or compacted) - then resolve
				store.set(self.config.store, items === null ? [] : $.grep(items, filter, true), dfdInit);
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
		"hub/todos/add" : function onAdd(topic, text) {
			var self = this;

			// Defer set
			$.Deferred(function deferredSet(dfdSet) {
				// Defer get
				$.Deferred(function deferredGet(dfdGet) {
					store.get(self.config.store, dfdGet);
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

					// Set items and resolve set
					store.set(self.config.store, items, dfdSet);
				});
			})
			.done(function doneSet(items) {
				self.publish("todos/change", items);
			});
		},

		"hub/todos/mark" : function onMark(topic, value) {
			this.$element.find(":checkbox").prop("checked", value).change();
		},

		"hub/todos/clear" : function onClear(topic) {
			this.$element.find(".completed .destroy").click();
		},

		"dom/action.change.click.dblclick.focusout.keyup" : $.noop,

		"dom/action/status.change" : function onStatus(topic, $event, index) {
			var self = this;
			var $target = $($event.target);
			var completed = $target.prop("checked");

			// Update UI
			$target
				.closest("li")
				.toggleClass("completed", completed);

			// Defer set
			$.Deferred(function deferredSet(dfdSet) {
				// Defer get
				$.Deferred(function deferredGet(dfdGet) {
					store.get(self.config.store, dfdGet);
				})
				.done(function doneGet(items) {
					// Update completed
					items[index].completed = completed;

					// Set items and resolve set
					store.set(self.config.store, items, dfdSet);
				});
			})
			.done(function doneSet(items) {
				self.publish("todos/change", items);
			});
		},

		"dom/action/delete.click" : function onDelete(topic, $event, index) {
			var self = this;

			// Update UI
			$($event.target)
				.closest("li")
				.slideUp("slow", function hidden() {
					// Remove LI
					$(this).remove();
				});

			// Defer set
			$.Deferred(function deferredSet(dfdSet) {
				// Defer get
				$.Deferred(function deferredGet(dfdGet) {
					// Get the items
					store.get(self.config.store, dfdGet);
				})
				.done(function doneGet(items) {
					// Delete item
					items[index] = null;

					// Set items and resolve set
					store.set(self.config.store, items, dfdSet);
				});
			})
			.done(function doneSet(items) {
				self.publish("todos/change", items);
			});
		},

		"dom/action/prepare.dblclick" : function onPrepare(topic, $event, index) {
			var self = this;

			// Get LI and update
			var $li = $($event.target)
				.closest("li")
				.addClass("editing");

			// Get INPUT and disable
			var $input = $li
				.find("input")
				.prop(DISABLED, true);

			// Defer get
			$.Deferred(function deferredGet(dfdGet) {
				// Get items
				store.get(self.config.store, dfdGet);
			})
			.done(function doneGet(items) {
				// Update input value, enable and select
				$input
					.val(items[index].text)
					.removeProp(DISABLED)
					.select();
			})
			.fail(function failGet() {
				$li.removeClass("editing");
			});
		},

		"dom/action/commit.keyup" : function onCommitKeyUp(topic, $event) {
			switch($event.originalEvent.keyCode) {
			case 13:
				$($event.target).focusout();
			}
		},

		"dom/action/commit.focusout" : function onCommitFocusOut(topic, $event, index) {
			var self = this;
			var $target = $($event.target);
			var text = $target
				.val()
				.replace(RE, EMPTY);

			// Defer set
			$.Deferred(function deferredSet(dfdSet) {
				// Disable
				$target.prop(DISABLED, true);

				// Defer get
				$.Deferred(function deferredGet(dfdGet) {
					// Get items
					store.get(self.config.store, dfdGet);
				})
				.done(function doneGet(items) {
					// Update text
					items[index].text = text;

					// Set items and resolve set
					store.set(self.config.store, items, dfdSet);
				});
			})
			.done(function doneSet(items) {
				// Update UI
				$target
					.closest("li")
					.removeClass("editing")
					.find("label")
					.text(text);

				self.publish("todos/change", items);
			})
			.always(function alwaysSet() {
				// Enable
				$target.removeProp(DISABLED);
			});
		}
	});
});