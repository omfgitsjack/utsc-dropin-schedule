(function () {
    "use strict";

    angular.module('app.core',
        [
            /*
             * Angular modules
             */

            /*
             * Our reusable cross app code modules
             */
            'utilities.api',
            'utilities.exception',
            'utilities.logger',

            /*
             * 3rd Party modules
             */
            'ui.router'
        ]);

})();