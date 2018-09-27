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
			//'click @ui.toggle': 'onToggleAllClick'
		},

		collectionEvents: {
			//	'change:completed': 'render',
			//	all: 'setCheckAllState'
		},
		serializeData: function () {
			return {
				pet: this.model
			}
		},

		initialize: function (data) {
			console.log('the id is', data.id)
			var currentPet = this.getPetData(data.id)
			if (!currentPet) {
				console.log('could not find pet!!!')
			}

			this.model = currentPet
			//	this.listenTo(filterChannel.request('filterState'), 'change:filter', this.render, this);
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
