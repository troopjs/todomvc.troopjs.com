define([ "troopjs-browser/component/widget" ], function CreateModule(Widget) {
	var ENTER_KEY = 13;

	return Widget.extend({
		"dom/keyup": function onKeyUp($event) {
			var self = this;
			var $element = self.$element;
			var value;

			switch ($event.keyCode) {
				case ENTER_KEY:
					// Get $element value
					value = $element.val().trim();

					// Check that the value is not empty
					if (value !== "") {
						// Publish todos/add
						self.publish("todos/add", value)
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
