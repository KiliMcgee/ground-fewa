(function () {
    'use strict';

    angular.module('MenuApp')
        .controller('ItemsController', ItemsController);

    ItemsController.$inject = ['element'];
    function ItemsController(element) {
        var controller = this;
        console.log('ItemsController: Dumping injected element: ', element);

        // List of 10 random messages to spice up the display
        const staticMessages = [
            "Indulge in our exquisite flavors that dance on your taste buds!",
            "Savor the symphony of taste with our mouthwatering creations!",
            "Tantalize your senses with our culinary masterpieces!",
            "Elevate your dining experience with our delectable delights!",
            "Embark on a gastronomic journey with our sumptuous offerings!",
            "Experience the magic of flavors with our chef's special dishes!",
            "Delight in the fusion of bold and savory notes in every bite!",
            "Satisfy your cravings with our menu of irresistible delicacies!",
            "Discover a world of taste with our diverse and tempting dishes!",
            "Escape to a realm of culinary bliss with our gourmet selection!"
        ];

        controller.element = element;
        controller.message = staticMessages[Math.floor(Math.random() * 10)];
    }

})();
