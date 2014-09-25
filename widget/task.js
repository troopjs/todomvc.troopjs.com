/*global browser:true, define:false */
define([ "troopjs-dom/component/widget", "poly/array" ],

	/**
	 * The 'task' widget is responsible for user interactions with a task.
	 */
	function Task(Widget) {
		"use strict";

		var ENTER_KEY = 13;
		var ESC_KEY = 27;

		return Widget.extend(

			// initialize the widget's internal state
			function(element, type, id, title, completed){
				this.id = id;
				this.title = title;
				this.completed = completed;
				this.editing = false;

				/**
				 * Whenever the user finishes editing the title of the task
				 * this function is called in order to:
				 *  1. Update the UI.
				 *  2. Publish the change to the hub.
				 */
				this.finishEdit = function () {
					var $el = this.$element;
					var $input = $el.find(".edit");
					var title = $input.val().trim();
					this.editing = false;
					$el.removeClass("editing");
					$input.prop("disabled", true);
					if (title === "") {
						this.publish("todos/remove", this.id);
					} else if (title !== this.title) {
						this.title = title;
						$el.find(".title").text(title);
						this.publish("todos/titleChange", this.id, this.title);
					}
				}
			},

			{

				// initialize the UI
				"sig/start": function start(){
					this.$element
						.toggleClass("completed", this.completed)
						.toggleClass("active", !this.completed);
					this.$element.find(".title").text(this.title);
					this.$element.find(".toggle").prop("checked", this.completed)
				},

				// task removal can be triggered from various places in the UI.
				// Whenever a remove is triggered, it is published as a 'remove'
				// message in the hub.
				"hub/todos/remove": function onRemove(id) {
					// remove the task from the DOM
					if (id === this.id) this.$element.remove();
				},

				// task completion can be toggled from various places in the UI.
				// task completion is triggered by publishing the 'complete'
				// message in the hub.
				"hub/todos/complete": function onComplete(id, completed) {
					if (id === this.id){
						this.completed = completed;
						this.$element
							.toggleClass("completed", this.completed)
							.toggleClass("active", !this.completed);
						this.$element.find('.toggle').prop('checked', this.completed);
					}
				},

				// respond to task checkbox changes
				"dom:.toggle/change": function onToggleChange() {
					var completed = this.$element.find('.toggle').prop('checked');
					this.publish("todos/complete", this.id, completed);
				},

				// trigger task removal when the 'X' button is clicked
				"dom:.destroy/click": function onClick() {
					this.publish("todos/remove", this.id);
				},

				// switch to 'edit' mode when double clicking the task
				"dom:.view label/dblclick": function onDblClick() {
					var $el = this.$element;
					var $input = $el.find(".edit");

					this.editing = true;
					$el.addClass("editing");
					$input.val(this.title).prop("disabled", false).focus();
				},

				// exit edit mode when the user presses ENTER or ESC
				"dom:.edit/keyup": function onKeyUp($event) {
					var $el = this.$element;
					var $input = $el.find(".edit");

					switch ($event.keyCode) {
						case ENTER_KEY :
							this.finishEdit();
							break;
						case ESC_KEY :
							$el.removeClass("editing");
							$input.prop("disabled", true);
							this.editing = false;
							break;
					}
				},

				// exit edit mode when the textbox looses focus
				"dom:.edit/focusout": function onFocusOut(){
					if (this.editing) this.finishEdit();
				}

			}

		);

	}

);
