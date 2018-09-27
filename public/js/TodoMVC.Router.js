/*global TodoMVC:true, Backbone, $ */

var TodoMVC = TodoMVC || {};

(function () {
	'use strict';

	var filterChannel = Backbone.Radio.channel('filter');

	TodoMVC.Router = Mn.AppRouter.extend({
		appRoutes: {
			':id': 'viewPet',
			'main': 'viewPet',
			//'*filter': 'filterItems'
		}
	});

	TodoMVC.Controller = Mn.Object.extend({

		initialize: function () {
			this.todoList = new TodoMVC.TodoList();
		},

		// Start the app by showing the appropriate views
		// and fetching the list of todo items, if there are any
		start: function () {
			this.showHeader(this.todoList);
			//	this.showFooter(this.todoList);
			//this.showTodoList();
			//	this.todoList.on('all', this.updateHiddenElements, this);
			//	this.todoList.fetch();
		},



		showHeader: function (todoList) {
			var header = new TodoMVC.HeaderLayout({
				collection: todoList
			});
			TodoMVC.App.root.showChildView('header', header);
		},

		viewPet: function (id) {
			TodoMVC.App.root.showChildView('main', new TodoMVC.ViewPetView({
				id: id
			}));
		},


		showTodoList: function (todoList) {
			TodoMVC.App.root.showChildView('main', new TodoMVC.ListView({
				collection: todoList
			}));
		},

		// Set the filter to show complete or all items
		filterItems: function (filter) {
			var newFilter = filter && filter.trim() || 'all';
			filterChannel.request('filterState').set('filter', newFilter);
		}
	});
})();
