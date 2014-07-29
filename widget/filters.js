/*global browser:true, define:false */
define([ "troopjs-dom/component/widget", "troopjs-opt/route/gadget", "jquery" ],
	function FiltersModule(Widget, Route, $) {
		"use strict";

		return Widget.extend(Route, {
			"route/change/:state?": function onRoute(uri, matches) {
				this.publish("todos/filter", matches.state || "all");
			},

			"hub:memory/todos/filter": function onFilter(state) {
				$("a[href^='#']")
					.removeClass("selected")
					.filter("[class='" + state + "']")
					.addClass("selected");
			}
		});
	});
