(function () {
    'use strict';

    angular.module('public')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['menuItems', 'MyInfoService'];
    function SignUpController(menuItems, MyInfoService) {
        var controller = this;
        console.log('SignUpController: Dumping injected menu items: ', menuItems);

        controller.submitted = false;

        // Placeholder variable to bind the form model
        controller.account = {};

        // Reduce the menu items to just a list of corresponding short names for use in validation
        controller.flattenedMenuItems = Object.values(menuItems)
            .flatMap(data => data.menu_items)
            .map(menuItem => menuItem.short_name);

        controller.submit = () => {
            MyInfoService.setProfile(controller.account);
            controller.submitted = true;
        }
    }

})();
