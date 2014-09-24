/*global browser:true, define:false */
define([ "troopjs-dom/component/widget", "troopjs-opt/route/gadget" ],

	function PersistItemsModule(Widget) {
		"use strict";

		return Widget.extend({

			"hub:memory/todos/change": function onChange(items) {
				window.localStorage["todos-troopjs"] = JSON.stringify(items);
			}

		});

	});
