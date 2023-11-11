(function () {
    'use strict';

    angular.module('MenuApp')
        .component('itemsComponent', {
            templateUrl: 'src/menuapp/templates/items-component.template.html',
            bindings: {
                element: '<',
                message: '<'
            }
        });

})();
