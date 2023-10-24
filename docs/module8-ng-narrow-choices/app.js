(function () {
    'use strict';

    angular.module('NarrowChoicesApp', [])
        .controller('NarrowChoicesController', NarrowChoicesController)
        .service('MenuSearchService', MenuSearchService);
        // .direct('foundItems', FoundItems);

    // NarrowChoicesController logic below
    NarrowChoicesController.$inject = ['MenuSearchService'];
    function NarrowChoicesController(MenuSearchService) {
        var narrowCtlr = this;

        narrowCtlr.searchTerm = undefined;
        narrowCtlr.foundItemsList = undefined;

        // Exposing the buy method on the controller that utilizes a method from the service
        narrowCtlr.search = function () {
            MenuSearchService.searchForItems(narrowCtlr.searchTerm);
            // narrowCtlr.foundItemsList = promise response..
        }
    }

    // MenuSearchService business logic below
    function MenuSearchService() {
        var service = this;

        var itemsResponse = [];
        var itemsFound = [];

        service.searchForItems = function (searchTerm) {
            if (itemsResponse.length < 1) {
                // If the response has not been cached previously we need to reach out to server.
                // TODO -- api request
            }
        };
    }

})();