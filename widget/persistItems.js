/*global browser:true, define:false */
define([ "troopjs-dom/component/widget", "troopjs-opt/route/gadget" ],

	/**
     * This module is responsible for saving the task list to the local storage
     * so it can be retrieved next time the app stats.
     */
    function PersistItemsModule(Widget) {
		"use strict";

		return Widget.extend({

            // when the list of items changes, save it to localStorage
			"hub:memory/todos/change": function onChange(items) {
				window.localStorage["todos-troopjs"] = JSON.stringify(items);
			}

		});

	}

);
