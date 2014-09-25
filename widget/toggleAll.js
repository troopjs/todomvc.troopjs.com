/*global browser:true, define:false */
define([ "troopjs-dom/component/widget", "jquery", "poly/array" ],
	function MarkModule(Widget, $) {
		"use strict";

		return Widget.extend(

			/**
			 * initialize the toggleAll widget with an internal 'checked' field
			 * which helps us keep track of the state of the checkbox.
			 */
			function(){
				this.checked = false;
			},

			{
				// Subscribe to changes in the todo tasks:
				"hub:memory/todos/change": function onChange(items) {
					var $el = this.$element;
					this.checked = items.every(function(item){
						return item.completed;
					});
					$el.prop("checked", this.checked);
				},

				// respond to changes in the checkboxs
				"dom/change": function onMark($event) {
					this.checked = this.$element.prop("checked");
					this.publish("todos/completeAll", this.checked);
				}
			}
		);
});
