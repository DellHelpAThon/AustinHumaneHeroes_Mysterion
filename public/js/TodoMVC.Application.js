/*global Backbone, TodoMVC:true */

var TodoMVC = TodoMVC || {};

(function () {
	'use strict';




	window.likedPets = localStorage.getItem("likedpets") || []



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
