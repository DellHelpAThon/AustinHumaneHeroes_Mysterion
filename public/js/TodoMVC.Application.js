/*global Backbone, TodoMVC:true */

var TodoMVC = TodoMVC || {};

(function () {
	'use strict';

	var likedPets = localStorage.getItem("likedpets")
	if (likedPets && likedPets.length > 5) {
		window.likedPets = JSON.parse(likedPets)
	} else {
		window.likedPets = []
	}

	var dislikedPets = localStorage.getItem("dislikedPets")
	if (dislikedPets && dislikedPets.length > 5) {
		window.dislikedPets = JSON.parse(dislikedPets)
	} else {
		window.dislikedPets = []
	}

	//window.dislikedPets = JSON.parse(localStorage.getItem("dislikedPets")) || []




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
