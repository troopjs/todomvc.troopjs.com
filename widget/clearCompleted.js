/*global browser:true, define:false */
define([ "troopjs-dom/component/widget", "poly/array" ],

	/**
	 * The 'clearCompleted' widget is responsible for:
	 *  1. Updating the view when the number of completed tasks change.
	 *  2. To cause the completed tasks to be cleared when a button is
	 *     clicked.
	 *
	 * (1) is achieved by subscribing to 'change' messages on the 'todos'
	 * channel in the hub. Every time a task is changed, this message is
	 * publushed to the hub.
	 *
	 * (2) is achieved by publishing a 'clear' message to the 'todos'
	 * channel in the hub. This message is later picked up by the 'list'
	 * widget which takes care of clearing the tasks and updating the dom.
	 */
	function ClearCompletedModule(Widget) {
		"use strict";

		return Widget.extend({

			// Subscribe to changes in the todo tasks:
			"hub:memory/todos/change": function onChange(items) {
				var count = items.filter(function(item){
					return item.completed;
				}).length;
				this.$element
					.text("Clear completed (" + count + ")")
					.toggle(count > 0);
			},

			// Register callback for button click:
			"dom/click": function onClick() {
				this.publish("todos/clearCompleted");
			}

		});

	}

);
