/*global define:false */
define([ "troopjs-browser/component/widget", "troopjs-data/store/component", "troopjs-browser/store/adapter/local", "jquery", "template!./item.html", "poly/array" ], function ListModule(Widget, Store, Adapter, $, template) {
	"use strict";

	var ARRAY_SLICE = Array.prototype.slice;
	var ENTER_KEY = 13;
	var ESC_KEY = 27;
	var FILTER_ACTIVE = "filter-active";
	var FILTER_COMPLETED = "filter-completed";
	var KEY = "todos-troopjs";
	var STORE = "store";

	function filter(item) {
		return item !== null;
	}

	return Widget.extend(function ListWidget() {
		this[STORE] = Store(Adapter());
	}, {
		"sig/start" : function () {
			var me = this;
			var store = me[STORE];

			// Wait for store ready
			return store.ready(function () {
				// Get KEY
				return store.get(KEY, function (getItems) {
					// Set KEY
					return store.set(KEY, getItems && getItems.filter(filter) || [], function (setItems) {
						// Iterate each item
						setItems.forEach(function itemIterator(item, i) {
							// Append to me
							me.append(template, {
								"i": i,
								"item": item
							});
						});

						// Publish
						me.publish("todos/change", setItems);
					});
				});
			});
		},

		"hub/todos/add" : function onAdd(title) {
			var me = this;
			var store = me[STORE];

			// Wait for store ready
			return store.ready(function () {
				// Get KEY
				return store.get(KEY, function (getItems) {
					// Get the next index
					var i = getItems.length;

					// Create new item, store in getItems
					var item = getItems[i] = {
						"completed": false,
						"title": title
					};

					// Append new item to me
					me.append(template, {
						"i": i,
						"item": item
					});

					// Set KEY
					return store.set(KEY, getItems, function (setItems) {
						me.publish("todos/change", setItems);
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
			var me = this;
			var store = me[STORE];
			var $target = $($event.currentTarget);
			var completed = $target.prop("checked");
			var $li = $target.closest("li");
			var index = $li.data("index");

			// Update UI
			$li
				.toggleClass("completed", completed)
				.toggleClass("active", !completed);

			// Wait for store ready
			store.ready(function () {
				// Get KEY
				return store.get(KEY, function (getItems) {
					// Update completed
					getItems[index].completed = completed;

					// Set KEY
					return store.set(KEY, getItems, function (setItems) {
						me.publish("todos/change", setItems);
					});
				});
			});
		},

		"dom:.destroy/click" : function onDestroyClick($event) {
			var me = this;
			var store = me[STORE];
			var $li = $($event.currentTarget).closest("li");
			var index = $li.data("index");

			// Update UI
			$li.remove();

			// Wait for store ready
			store.ready(function () {
				// Get KEY
				return store.get(KEY, function (getItems) {
					// Delete item
					getItems[index] = null;

					// Set KEY
					return store.set(KEY, getItems, function (setItems) {
						me.publish("todos/change", setItems);
					});
				});
			});
		},

		"dom:.view label/dblclick" : function onViewDblClick($event) {
			var me = this;
			var store = me[STORE];
			var $li = $($event.currentTarget).closest("li");
			var index = $li.data("index");
			var $input = $li.find("input");

			// Update UI
			$li.addClass("editing");

			// Disable
			$input.prop("disabled", true);

			// Wait for store ready
			store.ready(function () {
				// Get KEY
				store.get(KEY, function (items) {
					// Update input value, enable and focus
					$input
						.val(items[index].title)
						.prop("disabled", false)
						.focus();
				}, function () {
					$li.removeClass("editing");
				});
			});
		},

		"dom:.edit/keyup" : function onEditKeyUp($event) {
			var $li = $($event.currentTarget).closest("li");

			switch ($event.keyCode) {
				case ENTER_KEY :
					$li
						.find("input")
						.focusout();
					break;

				case ESC_KEY :
					$li
						.find("input")
						.val($li.find("label").text())
						.focusout();
					break;
			}
		},

		"dom:.edit/focusout" : function onEditFocusOut($event) {
			var me = this;
			var store = me[STORE];
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

				// Wait for store ready
				store.ready(function () {
					// Get KEY
					return store.get(KEY, function (getItems) {
						// Update text
						getItems[index].title = title;

						// Set KEY
						return store.set(KEY, getItems, function (setItems) {
							// Update UI
							$li
								.removeClass("editing")
								.find("label")
								.text(title);

							me.publish("todos/change", setItems);
						});
					})
					.ensure(function () {
						// Enable
						$target.prop("disabled", false);
					});
				});
			}
		}
	});
});
