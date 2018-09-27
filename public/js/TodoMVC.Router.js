/*global TodoMVC:true, Backbone, $ */

var TodoMVC = TodoMVC || {};

(function () {
	'use strict';

	var filterChannel = Backbone.Radio.channel('filter');

	TodoMVC.Router = Mn.AppRouter.extend({
		appRoutes: {
			':id': 'viewPet',
			'*main': 'viewPet',
			//'*filter': 'filterItems'
		}
	});

	window.goToNextPet = function (loc) {
		window.location.hash = loc
	};



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
			this.loadPets(function () {
				TodoMVC.App.root.showChildView('main', new TodoMVC.ViewPetView({
					id: id
				}));
			})

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
		},

		loadPets: function (cb) {

			// window.allPets = [
			// 	{
			// 		id: '123',
			// 		name: 'Snoopy',
			// 		img: 'http://g.petango.com/photos/652/7fcc3051-19d1-48f2-8e09-8e00650b21bd.jpg',
			// 		breed: 'Doverman',
			// 		sex: 'male'
			// 	},
			// ]


			if (window.allPets) {
				return cb(window.allPets)
			}

			fetch('https://ahs.cfapps.io/getpets')
				.then(function (response) {
					return response.json();
				})
				.then(function (data) {
					//console.log(JSON.stringify(data));
					if (data && data.ArrayOfAnyType) {
						window.allPets = data.ArrayOfAnyType.anyType;
					}

					console.log('window.allPets=', window.allPets)
					return cb(window.allPets)

				});

		}


	});
})();
