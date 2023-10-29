(function () {
    'use strict';

    angular.module('NarrowChoicesApp', [])
        .constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com")
        .controller('NarrowChoicesController', NarrowChoicesController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective);

    // NarrowChoicesController logic below
    NarrowChoicesController.$inject = ['MenuSearchService'];
    function NarrowChoicesController(MenuSearchService) {
        var narrowCtlr = this;
        narrowCtlr.clicked = false;
        narrowCtlr.searchTerm = undefined;
        narrowCtlr.foundItemsList = undefined;

        // Exposing the search method on the controller that utilizes a MenuSearchService method
        narrowCtlr.search = function () {
            if (narrowCtlr.searchTerm === "" || !narrowCtlr.searchTerm) {
                // If the search term is empty, return an empty list
                narrowCtlr.foundItemsList = [];
                return;
            }
            MenuSearchService.getMatchedMenuItems(narrowCtlr.searchTerm)
            .then((response) => {
                console.log('Found items response from search service: ', response);
                narrowCtlr.foundItemsList = response;
            })
            .catch((error) => console.log('Caught error from MenuSearchService.getMatchedMenuItems: ', error));
        }

        narrowCtlr.removeItemAtIndex = function (index) {
            console.log('Removing item at index: ', index);
            narrowCtlr.foundItemsList.splice(index, 1);
        }
    }

    // MenuSearchService business logic below
    MenuSearchService.$inject = ['$http', '$q', 'ApiBasePath'];
    function MenuSearchService($http, $q, ApiBasePath) {
        var service = this;
        var itemsResponse = [];

        service.getMatchedMenuItems = function (searchTerm) {
            var deferred = $q.defer();

            if (itemsResponse.length < 1) {
                // If the response has not been cached previously we need to reach out to server.
                $http({
                    method: "GET",
                    url: (ApiBasePath + "/menu_items.json"),
                }).then((response) => {
                    console.log('Received response from API: ', response.data);
                    // Map the response data's entries for menu items to the cached list
                    itemsResponse = Object.entries(response.data).flatMap((item) => item[1].menu_items);
                    deferred.resolve(itemsResponse);
                }).catch((error) => deferred.reject(error));
            } else {
                deferred.resolve(itemsResponse);
            }

            // Process the list of menu items against the input search term
            return deferred.promise
                .then((list) => list.filter((item) => item.description.includes(searchTerm)));
        };
    }

    // FoundItems custom directive logic below
    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                'items': '<',
                'onRemove': '&'
            }
        };

        return ddo;
    }

})();