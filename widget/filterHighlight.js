/*global browser:true, define:false */
define([ "troopjs-dom/component/widget", "jquery" ],

	/**
	 * The 'filterHighlight' widget is simply responsible for adding the
	 * 'selected' css class to the active filter, and removing it from non
	 * active filter.
	 * It achieves this by listening to 'filter' messages on the 'todos'
	 * channel on the hub, which are published by the tasksFilter widget.
	 */
	function FilterHighlightModule(Widget, $) {
		"use strict";

		return Widget.extend({

			// respond to changes in the active filter
			"hub:memory/todos/filter": function onFilter(state) {
				this.$element.find(".filter").removeClass("selected");
				this.$element.find("." + state).addClass("selected");
			}

		});

	}

);
