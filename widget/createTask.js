/*global browser:true, define:false */
define([ "troopjs-dom/component/widget" ],

	/**
	 * The 'createTask' widget is responsible for:
	 *  1. Detecting when the user has finished entering text and is ready to
	 *     create a new task.
	 *  2. Reseting the text box when the new task is created.
	 *
	 * This is achieved by registering a callback when the 'Enter' key is
	 * pressed while in the text box DOM element.
	 * After the user entered some text and preses 'Enter', we publish an 'add'
	 * message to the 'todos' channel, which is later picked up by the 'list'
	 * widget to actually add the new task to the DOM.
	 */
	function CreateTaskModule(Widget) {
		"use strict";

		var ENTER_KEY = 13;

		return Widget.extend({

			// register a callback for when the user finishes typing
			"dom/keyup": function onKeyUp($event) {
				var $el = this.$element;
				if ($event.keyCode === ENTER_KEY) {
					var value = $el.val().trim();
					if (value !== "") {
						// publish an 'add' event to the hub
						this.publish("todos/add", value)
							.then(function() {
								// when the entry is added, reset the text box
								$el.val("");
							});
					}
				}
			}

		});

	}

);
