/*global Backbone, TodoMVC:true */

var TodoMVC = TodoMVC || {};

(function () {
	'use strict';




	window.likedPets = localStorage.getItem("likedpets") || []

	window.allPets = [
		{
			id: '123',
			name: 'Snoopy',
			img: 'http://g.petango.com/photos/652/7fcc3051-19d1-48f2-8e09-8e00650b21bd.jpg',
			breed: 'Doverman',
			sex: 'male'
		},
	]


	//localStorage.setItem("key", "value");



	var TodoApp = Mn.Application.extend({
		setRootLayout: function () {
			this.root = new TodoMVC.RootLayout();
		}
	});

	TodoMVC.App = new TodoApp();

	TodoMVC.App.on('before:start', function () {
		TodoMVC.App.setRootLayout();
	});

})();
