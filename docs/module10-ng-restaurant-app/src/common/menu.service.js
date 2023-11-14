(function () {
    "use strict";

    angular.module('common')
        .service('MenuService', MenuService);

    MenuService.$inject = ['$http', 'ApiPath'];
    function MenuService($http, ApiPath) {
        var service = this;

        service.getCategories = function () {
            return $http.get(ApiPath + '/categories.json').then(function (response) {
                return response.data;
            });
        };

        service.getMenuItemsForCategory = function (category) {
            return $http.get(ApiPath + '/menu_items/' + category + '.json').then(function (response) {
                return response.data;
            });
        };

        // Service method to retrieve the list of all available menu items
        service.getAllMenuItems = function () {
            return $http.get(ApiPath + '/menu_items.json')
                .then((response) => response.data)
                .catch((error) => {
                    console.log('Encountered error when fetching all menu items: ', error);
                });
        };
    }

})();
