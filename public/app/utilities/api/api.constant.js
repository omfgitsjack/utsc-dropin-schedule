(function () {
    "use strict";

    /**
     * API (non-route) constants, preferbly this should be refactored to be configured
     * by core
     */
    angular.module("utilities.api")
        .constant('API_CONFIG',
        {
            BASE_ROUTE: 'api'
        });

})();