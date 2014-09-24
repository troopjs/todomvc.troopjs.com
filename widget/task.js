/*global browser:true, define:false */
define([ "troopjs-dom/component/widget", "poly/array" ],

	function Task(Widget) {
		"use strict";

		var ENTER_KEY = 13;
		var ESC_KEY = 27;

		return Widget.extend(function(element, type, id, title, completed){
			this.id = id;
			this.title = title;
			this.completed = completed;
			this.editing = false

			this.finishEdit = function () {
				var $el = this.$element;
				var $input = $el.find(".edit");
				var title = $input.val().trim();
				this.editing = false;
				$el.removeClass("editing");
				$input.prop("disabled", true);
				if (title === "") {
					this.publish("todos/remove", this.id);
				} else {
					this.title = title;
					$el.find(".title").text(title);
					this.publish("todos/titleChange", this.id, this.title);
				}
			}
		}, {
			"sig/start": function start(){
				this.$element
					.toggleClass("completed", this.completed)
					.toggleClass("active", !this.completed);
				this.$element.find(".title").text(this.title);
				this.$element.find(".toggle").prop("checked", this.completed)
			},

			"hub/todos/remove": function onRemove(id) {
				if (id === this.id) this.$element.remove();
			},

			"dom:.toggle/change": function onToggleChange($event) {
				this.completed = !this.completed;

				this.$element
					.toggleClass("completed", this.completed)
					.toggleClass("active", !this.completed);

				this.publish("todos/completeToggle", this.id);
			},

			"dom:.destroy/click": function onDestroyClick($event) {
				this.publish("todos/remove", this.id);
			},

			"dom:.view label/dblclick": function onViewDblClick() {
				var $el = this.$element;
				var $input = $el.find(".edit");

				this.editing = true;
				$el.addClass("editing");
				$input.val(this.title).prop("disabled", false).focus();
			},

			"dom:.edit/keyup": function onEditKeyUp($event) {
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

			"dom:.edit/focusout": function onEditFocusOut(){
				if (this.editing) this.finishEdit();
			}

		});

});
