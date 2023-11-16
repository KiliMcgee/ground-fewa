describe('MenuItem directive', function () {
    var $compile;
    var $rootScope;

    beforeEach(module('common'));
    beforeEach(module('public'));
    beforeEach(module('restaurant'));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    /**
     * The Task 4 is to write a test for the function that validates valid menu items.
     * 
     * In order to implement the validation, I didn't need to reach out to the API lest mock the $httpBackend service.
     * Instead, I resolve the list of items in my controller and flatmap them into a list of valid menu item codes.
     * 
     * The validation then occurs through a custom directive which utilizes the link function to tie in the form value
     * and compare the form's modelView value to the aforementionend constructed list of menu item codes.
     * 
     * This test attempts to recreate the validation that happens through the custom directive.
     */

    it('Finds and validates dish that is present in list of options', function () {

        const controller = {};
        controller.flattenedMenuItems = [ 'A1', 'A2' ];
        $rootScope.controller = controller;

        // Compile a piece of HTML containing my custom menu item directive
        // The value for this input IS contained in the flattened list
        var html = "<input type='text' value='A1' validate-menu-item>"

        var element = $compile(html)($rootScope);

        // fire all the watches, so the scope expressions will be evaluated
        $rootScope.$digest();

        // Check that the compiled element DOES NOT contain the validation error message
        expect(element.html()).not.toContain('Favorite Dish is required and must be valid.');
    });

    it('Does not find input dish that is missing from list of options', function () {

        const controller = {};
        controller.flattenedMenuItems = [ 'A1', 'A3' ];
        $rootScope.controller = controller;

        // Compile a piece of HTML containing my custom menu item directive
        // The value for this input IS NOT contained in the flattened list
        var html = "<input type='text' value='A2' validate-menu-item>"

        var element = $compile(html)($rootScope);

        // fire all the watches, so the scope expressions will be evaluated
        $rootScope.$digest();

        // Check that the compiled element DOES contain the validation error message
        expect(element.html()).toContain('Favorite Dish is required and must be valid.');
    });
});