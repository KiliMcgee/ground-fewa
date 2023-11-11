(function () {
    'use strict';

    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

        // Redirect to home page if no other URL matches
        $urlRouterProvider.otherwise('/');

        // Configure UI States below
        $stateProvider

            // Home view
            .state('home', {
                url: '/',
                templateUrl: 'src/menuapp/templates/home.template.html'
            })

            // Categories view
            .state('categories', {
                url: '/categories',
                templateUrl: 'src/menuapp/templates/categories.template.html',
                controller: 'CategoriesController as controller',
                resolve: {
                    elements: ['MenuDataService',
                        function (MenuDataService) {
                            return MenuDataService.getAllCategories();
                        }]
                }
            })

            // Items view
            .state('items', {
                url: '/categories/{categoryShortName}',
                templateUrl: 'src/menuapp/templates/items.template.html',
                controller: 'ItemsController as controller',
                resolve: {
                    element: ['$stateParams', 'MenuDataService',
                        function ($stateParams, MenuDataService) {
                            return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
                        }]
                }
            })
    }

})();
