(function () {
    'use strict';

    angular.module('Data')
        .service('MenuDataService', MenuDataService);

    MenuDataService.$inject = ['$http']
    function MenuDataService($http) {
        var service = this;

        // Service method for fetching list of all categories
        service.getAllCategories = function () {
            const apiUrl = 'https://coursera-jhu-default-rtdb.firebaseio.com/categories.json';
            console.log('MenuDataService: Call to getAllCategories.');
            return $http({
                method: "GET",
                url: apiUrl,
            }).then((response) => {
                console.log('MenuDataService: getAllCategories() received response: ', response.data);
                return response.data;
            }).catch((error) => console.log('MenuDataService: getAllCategories() encountered error: ', error));
        }

        // Service method for fetching list of items from select category
        service.getItemsForCategory = function (categoryShortName) {
            const apiUrl = `https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/${categoryShortName}.json`
            console.log('MenuDataService: Call to getItemsForCategory() with category short name: ', categoryShortName);
            return $http({
                method: "GET",
                url: apiUrl,
            }).then((response) => {
                console.log('MenuDataService: getItemsForCategory() received response: ', response.data);
                return response.data;
            }).catch((error) => console.log('MenuDataService: getItemsForCategory() encountered error: ', error));
        };
    }

})();
