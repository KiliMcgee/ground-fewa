(function () {
    "use strict";

    angular.module('public')
        .service('MyInfoService', MyInfoService);

    MyInfoService.$inject = ['$http', 'ApiPath'];
    function MyInfoService($http, ApiPath) {
        var service = this;

        service.profile = null;

        // The following is a sample profile used for testing purposes to ensure that details rendered as expected.
        // service.profile = {
        //     firstName: "John",
        //     lastName: "Smith",
        //     email: "superlongemail@superlongdomain.com",
        //     phone: "123-123-1234",
        //     dish: "a1"
        // };

        // Service method to locally save the profile information
        service.setProfile = (submission) => {
            service.profile = submission;
        }

        // Service method to retrieve the currently stored profile information, including resolving favorite dish
        service.getProfile = async () => {
            if (!service.profile) {
                return null;
            }

            // If the favorite dish has already been fetched, no need to dispatch another request.
            if (service.profile.fetchedDish) {
                console.log('MyInfoService: Favorite dish has already been fetched - returning profile.');
                return service.profile;
            }

            // Otherwise, fetch the favorite dish and set it on profile.
            console.log('MyInfoService: Fetching favorite dish to set on returned profile.');
            const dishParts = service.profile.dish.match(/[a-zA-Z]+|[0-9]+/g);
            const fetchedMenuItem = await $http.get(ApiPath + `/menu_items/${dishParts[0].toUpperCase()}/menu_items/${--dishParts[1]}.json`)
                .then((response) => response.data)
                .catch((error) => {
                    console.log('Encountered error when fetching favorite menu item: ', error);
                });

            const src = `/docs/module10-ng-restaurant-app/images/menu/${ dishParts[0].toUpperCase() }/${ service.profile.dish.toUpperCase() }.jpg`;
            console.log('Dumping constructed src: ', src);

            service.profile.fetchedDish = {
                src,
                ...fetchedMenuItem
            };
            return service.profile;
        }
    }

})();
