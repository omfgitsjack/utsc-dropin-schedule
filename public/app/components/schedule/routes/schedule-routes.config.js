(function () {
    "use strict";

    /**
     * Schedule route configuration
     */
    angular
        .module('jp.schedule.routes')
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
                templateUrl: "app/components/schedule/layout/schedule-base-layout.html",
                controller: "ScheduleBaseCtrl",
                controllerAs: "vm",
                resolve: {
                    dataService: scheduleBaseLayoutDataService
                }
            });

        // Route Resolves
        /* @ngInject */
        function scheduleBaseLayoutDataService(scheduleBaseLayoutDataService) {
            return scheduleBaseLayoutDataService.load();
        }
    }
})();