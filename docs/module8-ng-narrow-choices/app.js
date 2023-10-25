(function () {
    'use strict';

    angular.module('NarrowChoicesApp', [])
        .controller('NarrowChoicesController', NarrowChoicesController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com")
        .directive('foundItems', FoundItemsDirective);

    // NarrowChoicesController logic below
    NarrowChoicesController.$inject = ['MenuSearchService'];
    function NarrowChoicesController(MenuSearchService) {
        var narrowCtlr = this;

        narrowCtlr.searchTerm = undefined;
        narrowCtlr.foundItems = [];
        // TODO - Figure out how to delay the error until button clicked? Cookie example.
        narrowCtlr.isInvalidSearch = () => !narrowCtlr.foundItems?.length || !narrowCtlr.searchTerm

        // Exposing the buy method on the controller that utilizes a method from the service
        narrowCtlr.search = function () {
            MenuSearchService.getMatchedMenuItems(narrowCtlr.searchTerm)
            .then((response) => {
                console.log('Found items response from search service: ', response);
                narrowCtlr.foundItems = response;
            })
            .catch((error) => console.log('Caught error from MenuSearchService.getMatchedMenuItems: ', error));
        }

        narrowCtlr.removeItemAtIndex = function (index) {
            console.log('Removing item at index: ', index);
            narrowCtlr.foundItems.splice(index, 1);
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
                foundItems: '<',
                onRemove: '&'
            },
            controller: 'NarrowChoicesController as narrowCtlr',
            bindToController: true
        };

        return ddo;
    }

})();