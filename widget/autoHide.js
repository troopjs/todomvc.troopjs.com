/*global browser:true, define:false */
define([ "troopjs-dom/component/widget", "poly/array" ],

	/**
	 * The 'autoHide' widget is responsible for showing an element if
	 * there are items, and hiding it otherwise. We use it to toggle the
	 * display of the list element and the footer element.
	 *
	 * This is done by subscribing to the 'change' message on the 'todos'
	 * channel and counting the number of items whenever there is a change.
	 */
	function AutoHideModule(Widget) {
		"use strict";

		return Widget.extend({

			// update the UI when the number of tasks changes
			"hub:memory/todos/change": function onChange(items) {
				// if the number of items is not zero, show the list
				this.$element.toggle(items.length > 0);
			}

		});

	}

);
