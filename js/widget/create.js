/*global define:false */
define([ "troopjs-browser/component/widget" ], function CreateModule(Widget) {
	"use strict";

	var ENTER_KEY = 13;

	return Widget.extend({
		"dom/keyup": function onKeyUp($event) {
			var me = this;
			var $element = me.$element;
			var value;

			switch ($event.keyCode) {
				case ENTER_KEY:
					// Get $element value
					value = $element.val().trim();

					// Check that the value is not empty
					if (value !== "") {
						// Publish todos/add
						me.publish("todos/add", value)
							// When all handlers are done
							.then(function () {
								// Reset val
								$element.val("");
							});
					}
					break;
			}
		}
	});
});
