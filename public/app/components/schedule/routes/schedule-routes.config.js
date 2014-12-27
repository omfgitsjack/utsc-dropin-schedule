(function () {
    "use strict";

    /**
     * Schedule route configuration
     */
    angular
        .module('app.schedule.routes')
        .config(scheduleRouteConfig);

    /**
     * Route configuration,
     * uses SCHEDULE_ROOT_ROUTE as abstract parent state
     * @param $stateProvider
     * @param SCHEDULE_ROOT_ROUTE
     * @ngInject
     */
    function scheduleRouteConfig($stateProvider, SCHEDULE_ROOT_ROUTE)
    {
        // Parent State's name to be included in every state
        var parent = SCHEDULE_ROOT_ROUTE.name;

        $stateProvider
            // Local routes
            .state({
                name: 'activities',
                parent: parent,
                url: '/',
                templateUrl: "app/components/schedule/widgets/activities/activities.tmpl.html",
                controller: "ActivityCtrl",
                controllerAs: "vm",
                resolve: {
                    dataService: activitiesDataService
                }
            });

        // Route Resolves
        activitiesDataService.$inject = ['activitiesDataService'];
        function activitiesDataService(activitiesDataService) {
            return activitiesDataService.load();
        }
    }
})();