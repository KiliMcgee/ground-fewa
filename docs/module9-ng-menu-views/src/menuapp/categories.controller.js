(function () {
    'use strict';

    angular.module('MenuApp')
        .controller('CategoriesController', CategoriesController);

    CategoriesController.$inject = ['elements'];
    function CategoriesController(elements) {
        var controller = this;
        console.log('CategoriesController: Dumping injected elements: ', elements);
        controller.elements = elements;
    }

})();
