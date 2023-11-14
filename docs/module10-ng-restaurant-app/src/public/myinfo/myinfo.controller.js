(function () {
    'use strict';

    angular.module('public')
        .controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['profile'];
    function MyInfoController(profile) {
        var controller = this;

        controller.profile = profile;
        
        console.log('MyInfoController: Dumping injected profile: ', profile);
    }

})();
