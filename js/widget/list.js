define([ "troopjs-browser/component/widget", "troopjs-browser/store/local", "when", "jquery", "template!./item.html" ], function ListModule(Widget, store, when, $, template) {
	var ARRAY_SLICE = Array.prototype.slice;
	var ENTER_KEY = 13;
	var FILTER_ACTIVE = "filter-active";
	var FILTER_COMPLETED = "filter-completed";
	var STORE = "todos-troopjs";
	var LOCK = "lock";

	function filter(item) {
		return item !== null;
	}

	return Widget.extend({
		"sig/start" : function () {
			var self = this;

			// Wait for and update store LOCK
			return store[LOCK] = when(store[LOCK], function () {
				// Get STORE
				return store.get(STORE).then(function (getItems) {
					// Set STORE
					return store.set(STORE, getItems === null ? [] : $.grep(getItems, filter)).then(function (setItems) {
						// Iterate each item
						$.each(setItems, function itemIterator(i, item) {
							// Append to self
							self.append(template, {
								"i": i,
								"item": item
							});
						});

						// Publish
						self.publish("todos/change", setItems);
					});
				});
			});
		},

		"hub/todos/add" : function onAdd(title) {
			var self = this;

			// Wait for and update store LOCK
			return store[LOCK] = when(store[LOCK], function () {
				// Get STORE
				return store.get(STORE).then(function (getItems) {
					// Get the next index
					var i = getItems.length;

					// Create new item, store in getItems
					var item = getItems[i] = {
						"completed": false,
						"title": title
					};

					// Append new item to self
					self.append(template, {
						"i": i,
						"item": item
					});

					// Set STORE
					return store.set(STORE, getItems).then(function (setItems) {
						self.publish("todos/change", setItems);
					});
				});
			})
			// Yield with original arguments
			.yield(ARRAY_SLICE.call(arguments));
		},

		"hub/todos/mark" : function onMark(value) {
			this.$element.find(":checkbox").prop("checked", value).change();
		},

		"hub/todos/clear" : function onClear() {
			this.$element.find(".completed .destroy").click();
		},

		"hub:memory/todos/filter" : function onFilter(filter) {
			var $element = this.$element;

			switch (filter) {
			case "/completed":
				$element
					.removeClass(FILTER_ACTIVE)
					.addClass(FILTER_COMPLETED);
				break;

			case "/active":
				$element
					.removeClass(FILTER_COMPLETED)
					.addClass(FILTER_ACTIVE);
				break;

			default:
				$element.removeClass([FILTER_ACTIVE, FILTER_COMPLETED].join(" "));
			}
		},

		"dom:.toggle/change" : function onToggleChange($event) {
			var self = this;
			var $target = $($event.currentTarget);
			var completed = $target.prop("checked");
			var $li = $target.closest("li");
			var index = $li.data("index");

			// Update UI
			$li
				.toggleClass("completed", completed)
				.toggleClass("active", !completed);

			// Wait for and update store LOCK
			store[LOCK] = when(store[LOCK], function () {
				// Get STORE
				return store.get(STORE).then(function (getItems) {
					// Update completed
					getItems[index].completed = completed;

					// Set STORE
					return store.set(STORE, getItems).then(function (setItems) {
						self.publish("todos/change", setItems);
					});
				});
			});
		},

		"dom:.destroy/click" : function onDestroyClick($event) {
			var self = this;
			var $li = $($event.currentTarget).closest("li");
			var index = $li.data("index");

			// Update UI
			$li.remove();

			// Wait for and update store LOCK
			store[LOCK] = when(store[LOCK], function () {
				// Get STORE
				return store.get(STORE).then(function (getItems) {
					// Delete item
					getItems[index] = null;

					// Set STORE
					return store.set(STORE, getItems).then(function (setItems) {
						self.publish("todos/change", setItems);
					});
				});
			});
		},

		"dom:.view/dblclick" : function onViewDblClick($event) {
			var $li = $($event.currentTarget).closest("li");
			var index = $li.data("index");
			var $input = $li.find("input");

			// Update UI
			$li.addClass("editing");

			// Disable
			$input.prop("disabled", true);

			// Wait for store LOCK
			when(store[LOCK], function () {
				// Get STORE
				store.get(STORE).then(function (items) {
					// Update input value, enable and select
					$input
						.val(items[index].title)
						.removeProp("disabled")
						.select();
				}, function () {
					$li.removeClass("editing");
				});
			});
		},

		"dom:.edit/keyup" : function onEditKeyUp($event) {
			switch($event.originalEvent.keyCode) {
			case ENTER_KEY:
				$($event.currentTarget).focusout();
			}
		},

		"dom:.edit/focusout" : function onEditFocusOut($event) {
			var self = this;
			var $target = $($event.currentTarget);
			var title = $target.val().trim();
			var $li = $target.closest("li");
			var index = $li.data("index");

			if (title === "") {
				$li
					.removeClass("editing")
					.find(".destroy")
					.click();
			}
			else {
				// Disable
				$target.prop("disabled", true);

				// Wait for and update store LOCK
				store[LOCK] = when(store[LOCK], function () {
					// Get STORE
					return store.get(STORE)
						.then(function (getItems) {
							// Update text
							getItems[index].title = title;

							// Set STORE
							return store.set(STORE, getItems).then(function (setItems) {
								// Update UI
								$li
									.removeClass("editing")
									.find("label")
									.text(title);

								self.publish("todos/change", setItems);
							});
						})
						.ensure(function () {
							// Enable
							$target.removeProp("disabled");
						});
				});
			}
		}
	});
});
