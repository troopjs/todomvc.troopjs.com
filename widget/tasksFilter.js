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

			/**
			 * Detect route changes and publish a coresponding filter message.
			 */
			"route/change/:state?": function onState(match) {
				this.publish("todos/filter", match.state);
			},

			/**
			 * Detect when the route is reset to the root route and publish a
			 * coresponding filter message.
			 */
			"route/change": function onState(match) {
				if (match.input === "") this.publish("todos/filter", "all");
			},

		});

	});
