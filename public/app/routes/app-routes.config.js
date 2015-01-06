(function () {
    "use strict";

    /**
     * App route configuration
     */
    angular
        .module('app.routes')
        .config(routeConfig);

    /**
     * UI-Router state configuration.
     * Feature root (abstract) routes are also included.
     * @param $stateProvider
     * @param $urlRouterProvider
     * @param $locationProvider
     * @param SCHEDULE_ROOT_ROUTE Note that this is parentless.
     * @ngInject
     */
    function routeConfig($stateProvider, $urlRouterProvider, $locationProvider, SCHEDULE_ROOT_ROUTE)
    {
        // Use hashbang mode for seo purposes
        $locationProvider.hashPrefix('!');

        // Default route brings users to activities
        $urlRouterProvider
            .otherwise('/schedule/activities');

        // Define Root Parents
        SCHEDULE_ROOT_ROUTE['parent'] = '';

        $stateProvider
            // Local Routes
            // Feature Routes
            .state(SCHEDULE_ROOT_ROUTE);
    }
})();