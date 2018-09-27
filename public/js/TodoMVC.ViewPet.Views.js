/*global TodoMVC: true, Backbone */

var TodoMVC = TodoMVC || {};

(function () {
	'use strict';


	TodoMVC.ViewPetView = Mn.View.extend({

		template: '#template-viewpet',

		regions: {
			listBody: {
				el: 'ul',
				replaceElement: true
			}
		},

		ui: {
			toggle: '.toggle-all'
		},

		events: {
			'click .upvote': 'upvote',
			'click .downvote': 'downvote',
		},

		collectionEvents: {
			//	'change:completed': 'render',
			//	all: 'setCheckAllState'
		},
		serializeData: function () {
			return {
				pet: this.currentPet
			}
		},

		initialize: function (data) {
			console.log('the id is', data.id)
			this.currentPet = this.getPetData(data.id)
			if (!this.currentPet) {
				console.log('could not find pet!!!')
			}


			//	this.listenTo(filterChannel.request('filterState'), 'change:filter', this.render, this);
		},

		upvote: function () {
			console.log('upvoted')

			//does this array contain the adoptionId?
			if (!window.likedPets.find(x => x.AdoptionID == this.currentPet.AdoptionID[0])) {
				window.likedPets.push({
					Name: this.currentPet.Name[0],
					AdoptionID: this.currentPet.AdoptionID[0],
					Photo: this.currentPet.Photo[0]
				})
				localStorage.setItem("likedpets", JSON.stringify(window.likedPets));
			}

			this.gotoNextPet()
		},
		downvote: function () {
			if (!window.dislikedPets.find(x => x.AdoptionID == this.currentPet.AdoptionID[0])) {

				window.dislikedPets.push({
					Name: this.currentPet.Name[0],
					AdoptionID: this.currentPet.AdoptionID[0],
					Photo: this.currentPet.Photo[0]
				})
				localStorage.setItem("dislikedPets", JSON.stringify(window.dislikedPets));
			}

			this.gotoNextPet()
		},


		gotoNextPet: function () {

			var nextId = this.getIdWeHaveNotSeenYet()

			window.goToNextPet(nextId)
			//Backbone.history.navigate(nextId, true);
		},
		getIdWeHaveNotSeenYet: function () {

			var notSeenYet = window.allPets.filter(function (item) {
				return !window.dislikedPets.find(x => x.AdoptionID == item.AdoptionID[0]);
			});

			return notSeenYet[0].AdoptionID[0]
		},


		getPetData: function (id) {
			var currentPet = window.allPets.find(x => x.AdoptionID[0] == id)
			//todo fallback 

			return currentPet
		},


		onRender: function () {
			// this.showChildView('listBody', new TodoMVC.ListViewBody({
			// 	collection: this.collection
			// }));
		}
	});
})();
