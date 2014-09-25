/*global browser:true, define:false */
define([
		"troopjs-dom/component/widget",
		"jquery",
		"template!./task.html",
		"when",
		"poly/array"
	],

	/**
	 * The 'taskList' widget is reponsible for rendering and managing the
	 * interactions with the task list of the UI.
	 */
	function ListModule(Widget, $, template, when) {
		"use strict";

		var FILTER_ACTIVE = "filter-active";
		var FILTER_COMPLETED = "filter-completed";
		var TASKS_STORE = window.localStorage[ "todos-troopjs" ];

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
				
				return when.map(tasks, function (item) {
					return me.append(template, item);
				}).then(function () {
					// publish an initial 'change' message to update other UI
					// elements
					return me.publish("todos/change", tasks);
				});
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

				return this.append(template, item).then(function(){
					// after the item is added, publish a 'change' message.
					return this.publish("todos/change", tasks);
				});

			},

			/**
			 * Subscribe to 'remove' messages and respond by removing the task
			 * from the list.
			 */
			"hub/todos/remove": function onRemove(id) {
				tasks = tasks.filter(function(task){
					return task.id !== id;
				});
				this.publish("todos/change", tasks);
			},

			/**
			 * Update the tasks whenever a task completion is changed.
			 */
			"hub/todos/complete": function onComplete(id, completed) {
				tasks.forEach(function(task){
					if (task.id === id) {
						task.completed = completed;
					}
				});
				this.publish("todos/change", tasks);
			},

			/**
			 * trigger a complete message for each task
			 */
			"hub/todos/completeAll": function onCompleteAll(complete) {
				var me = this;
				tasks.forEach(function(task){
					me.publish("todos/complete", task.id, complete);
				});
			},

			/**
			 * Update the tasks whenever a task title is changed.
			 */
			"hub/todos/titleChange": function onTitleChange(id, title) {
				tasks.forEach(function(task){
					if (task.id === id) task.title = title;
				});
				this.publish("todos/change", tasks);
			},

			/**
			 * trigger a remove message for each completed task
			 */
			"hub/todos/clearCompleted": function onClearCompleted() {
				var me = this;
				tasks.filter(function(task){
					return task.completed;
				}).forEach(function(task){
					me.publish("todos/remove", task.id);
				});
			},

			/**
			 * respond to task filtering by applying appropriate css
			 * classes on the list element.
			 */
			"hub:memory/todos/filter": function onFilter(filter) {
				switch (filter) {
					case "completed":
						this.$element
							.removeClass(FILTER_ACTIVE)
							.addClass(FILTER_COMPLETED);
						break;
					case "active":
						this.$element
							.removeClass(FILTER_COMPLETED)
							.addClass(FILTER_ACTIVE);
						break;
					default:
						this.$element
							.removeClass(FILTER_ACTIVE)
							.removeClass(FILTER_COMPLETED);
				}
			},

		});

	});
