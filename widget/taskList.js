/*global browser:true, define:false */
define([
		"troopjs-dom/component/widget",
		"jquery",
		"template!./item.html",
		"poly/array"
	],

	/**
	 * The 'taskList' widget is reponsible for rendering and managing the
	 * interactions with the tasks list of the UI.
	 */
	function ListModule(Widget, $, template) {
		"use strict";

		var FILTER_ACTIVE = "filter-active";
		var FILTER_COMPLETED = "filter-completed";
		var TASKS_STORE = window.localStorage["todos-troopjs"];

		var tasks = TASKS_STORE ? JSON.parse(TASKS_STORE) : [];
		var nextId = tasks.length ? tasks[tasks.length - 1].id + 1 : 0;

		return Widget.extend({

			/**
			 * When we receive the 'start' signal (part of the component's
			 * lifecycle) it's a good time to check if we already have tasks
			 * in storage. If so, we populate the tasks list with those initial
			 * tasks.
			 */
			"sig/start": function start() {
				var me = this;
				tasks.forEach(function(item) {
					me.append(template, item);
				});

				// publish an initial 'change' message to update other UI
				// elements
				me.publish("todos/change", tasks);
			},

			/**
			 * Subscribe to 'add' messages on the 'todos' channel and handle
			 * adding a new item when a message is received.
			 */
			"hub/todos/add": function onAdd(title) {
				var item = tasks[tasks.length] = {
					"id": nextId++,
					"completed": false,
					"title": title
				};

				this.append(template, item);

				// after the item is added, publish a 'change' message.
				this.publish("todos/change", tasks);
			},

			"hub/todos/remove": function onRemove(id) {
				tasks = tasks.filter(function(task){
					return task.id !== id;
				});
				this.publish("todos/change", tasks);
			},

			"hub/todos/completeToggle": function onCompleteToggle(id) {
				tasks.forEach(function(task){
					if (task.id === id) task.completed = !task.completed;
				});
				this.publish("todos/change", tasks);
			},

			"hub/todos/titleChange": function onTitleChange(id, title) {
				tasks.forEach(function(task){
					if (task.id === id) task.title = title;
				});
				this.publish("todos/change", tasks);
			},

			"hub/todos/clearCompleted": function onClearCompleted() {
				var me = this;
				tasks.filter(function(task){
					return task.completed;
				}).forEach(function(task){
					me.publish("todos/remove", task.id);
				});
			},

			// "hub:memory/todos/filter": function onFilter(filter) {
			// 	var $element = this.$element;
			// 	switch (filter) {
			// 		case "completed":
			// 			$element
			// 				.removeClass(FILTER_ACTIVE)
			// 				.addClass(FILTER_COMPLETED);
			// 			break;

			// 		case "active":
			// 			$element
			// 				.removeClass(FILTER_COMPLETED)
			// 				.addClass(FILTER_ACTIVE);
			// 			break;

			// 		default:
			// 			$element.removeClass([FILTER_ACTIVE, FILTER_COMPLETED].join(" "));
			// 	}
			// },

		});

	});
