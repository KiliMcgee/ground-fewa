(function () {
    'use strict';

    angular.module('LunchChecker', [])
        .controller('LunchCheckerController', LunchCheckerController);
    LunchCheckerController.$inject = ['$scope'];

    function LunchCheckerController($scope) {
        $scope.input = '';
        $scope.checkMessage = '';

        $scope.checkLunchFn = function () {
            const filteredInput = $scope.input.split(',').filter(str => str && /\S/.test(str))
            // console.log('Dumping filtered input: ', filteredInput);

            $scope.checkMessage = filteredInput.length > 3
            ? 'That\'s too much food.'
            : filteredInput.length < 1
                ? 'Please enter data first.'
                : 'That\s just right. Enjoy!';

            $scope.dynamicClass = filteredInput.length > 0 ? 'green' : 'red';
        }
    }
})();