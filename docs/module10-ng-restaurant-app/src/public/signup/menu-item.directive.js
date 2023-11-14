(function () {
    "use strict";

    // This custom directive acts a validator for the favorite dish form input.
    angular.module('public')
        .directive('validateMenuItem', function () {

            return {
                require: 'ngModel',
                link: function (scope, element, attrs, ctrl) {

                    const availableMenuItems = scope.controller.flattenedMenuItems;

                    ctrl.$validators.menuItem = function (modelValue) {
                        return modelValue
                        ? availableMenuItems.indexOf(modelValue.toUpperCase()) !== -1
                        : false;
                    };

                }
            };

        })
})();
