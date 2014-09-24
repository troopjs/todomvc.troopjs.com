/*global browser:true, define:false */
define([ "troopjs-dom/component/widget", "troopjs-opt/route/gadget" ],

	/**
	 * The 'taskFilter' widget is responsible for hidding tasks according
	 * to the current route. This is achieved by subscribing to state
	 * 'change' messages with the routing gadget; and publishing a
	 * corresponding 'filter' message on the 'todos' channel.
	 */
	function TasksFilterModule(Widget, Route) {
		"use strict";

		return Widget.extend(Route, {
			"route/change/:state?": function onState(uri, matches) {
				console.log("onState", arguments);
				this.publish("todos/filter", matches.state || "all");
			}
		});

	});
