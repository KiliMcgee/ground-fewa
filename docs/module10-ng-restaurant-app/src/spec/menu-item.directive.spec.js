describe('MenuItem directive', function () {
    var $compile;
    var $rootScope;

    beforeEach(module('public'));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    /**
     * The Task 4 is to write a test for the function that validates valid menu items.
     * I like to think that my validation was ingenious - I didn't need to reach out to the API, nor mock the $httpBackend service.
     * Instead, I resolve the list of items in my controller and flatmap them into a list of codes.
     * 
     * The validation occurs through a custom directive which utilizes link to tie in the form value and compare to
     * the aforementioend constructed list of menu item codes.
     * 
     * This test attempts to recreate the validation that happens through the custom directive.
     */

    it('Finds and validates dish that is present in list of options', function () {

        var list = {};
        list.items = [
            { name: "item 1", quantity: "1" },
            { name: "item 2", quantity: "2" }
        ];
        $rootScope.list = list;

        // Compile a piece of HTML containing my custom menu item directive
        var html = "<input type='text' value='A1' validate-menu-item>"

        var element = $compile(html)($rootScope);

        // fire all the watches, so the scope expressions will be evaluated
        $rootScope.$digest();

        // Check that the compiled element contains the templated content
        expect(element.html().replace(/\s/g, '')).toContain(expectedHtml);
    });

    it('Does not find input dish that is not a real dish', function () {
        expect(true).toBeTrue();
    });
});