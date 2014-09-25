/*global browser:true, define:false */
define([ "troopjs-dom/component/widget", "poly/array" ],

	/**
	 * The 'itemsLeft' widget is responsible for updating the view when the
	 * number of completed tasks change.
	 *
	 * This is achieved by subscribing to 'change' messages on the 'todos'
	 * channel in the hub. Every time a task is changed, this message is
	 * publushed to the hub. We can simply count the number of uncompleted
	 * items in order to know how many items are left.
	 */
	function ItemsLeftModule(Widget) {
		"use strict";

		return Widget.extend({

			// Subscribe to changes in the todo tasks:
			"hub:memory/todos/change": function onChange(items) {
				var count = items.filter(function(item){
					return !item.completed;
				}).length;
				this.$element.html(
					"<strong>" + count + "</strong> "
					+ (count === 1 ? "item" : "items") + " left"
				);
			}

		});

	}

);
