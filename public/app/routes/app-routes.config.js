(function () {
    "use strict";

    /**
     * App route configuration
     */
    angular
        .module('app.routes')
        .config(routeConfig);

    /**
     * Dependency Injection
     * @type {string[]}
     */
    routeConfig.$inject = [
        '$stateProvider',
        '$urlRouterProvider',
        // Feature root routes
        'SCHEDULE_ROOT_ROUTE'
    ];

    /**
     * UI-Router state configuration.
     * Feature root (abstract) routes are also included.
     * @param $stateProvider
     * @param $urlRouterProvider
     * @param SCHEDULE_ROOT_ROUTE Note that this is parentless.
     */
    function routeConfig($stateProvider, $urlRouterProvider, SCHEDULE_ROOT_ROUTE)
    {

        // Define Root Parents
        SCHEDULE_ROOT_ROUTE['parent'] = '';

        $stateProvider
            // Local Routes
            // Feature Routes
            .state(SCHEDULE_ROOT_ROUTE);


    }
})();