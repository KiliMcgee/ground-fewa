(function () {
    'use strict';

    angular.module('MenuApp')
        .component('categoriesComponent', {
            templateUrl: 'src/menuapp/templates/categories-component.template.html',
            bindings: {
                elements: '<'
            }
        });

})();
