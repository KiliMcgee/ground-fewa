(function () {
    'use strict';

    angular.module('ShoppingList', [])
        .controller('BuyController', BuyController)
        .controller('BoughtController', BoughtController)
        .service('ShoppingListService', ShoppingListService)
        .filter('ngDollars', ngDollarsFilter);

    // BuyController logic below
    BuyController.$inject = ['ShoppingListService'];
    function BuyController(ShoppingListService) {
        var buyCtlr = this;

        buyCtlr.toBuyList = ShoppingListService.getItemsToBuy();

        buyCtlr.buy = function (itemName) {
            ShoppingListService.buyItem(itemName);
        }
    }

    // BoughtController logic below
    BoughtController.$inject = ['ShoppingListService'];
    function BoughtController(ShoppingListService) {
        var boughtCtlr = this;

        boughtCtlr.boughtList = ShoppingListService.getItemsBought();
    }

    // ShoppingListService business logic below
    function ShoppingListService() {
        var service = this;

        var itemsToBuy = [
            {'name': 'Peanut Butter', 'quantity': 1, 'price': 10},
            {'name': 'Honey', 'quantity': 2, 'price': 20},
            {'name': 'Coconut Oils', 'quantity': 3, 'price': 30},
            {'name': 'Flaxseed Meal', 'quantity': 4, 'price': 40},
            {'name': 'Dark Chocolates', 'quantity': 5, 'price': 50},
            {'name': 'Vanilla Extract', 'quantity': 6, 'price': 60},
            {'name': 'Protein Powder', 'quantity': 7, 'price': 70},
            {'name': 'Chia Seeds', 'quantity': 8, 'price': 80},
            {'name': 'Almonds', 'quantity': 9, 'price': 90},            
        ];
        var itemsBought = [];

        service.buyItem = function (itemName) {
            var targetIndex = itemsToBuy.findIndex((item) => item.name === itemName)
            itemsBought.push(itemsToBuy[targetIndex]);
            itemsToBuy.splice(targetIndex, 1);
        };

        // Accessor for retrieving the list of items to buy
        service.getItemsToBuy = function () {
            return itemsToBuy;
        };

        // Accessor for retrieving the list of items that have already been bought
        service.getItemsBought = function () {
            return itemsBought;
        };
    }

    // Custom implemented filter for "Angular Dollars" currency
    function ngDollarsFilter() {
        return function (total) {
            return `$$$${ total }.00`;
        };
    }
})();