(function () {
    "use strict";

    /**
     * Schedule's abstract root route
     */
    angular.module("app.schedule.routes")
        .constant('SCHEDULE_ROOT_ROUTE',
        {
            abstract: true,
            name: 'schedule',
            url: '/schedule',
            template: "<div ui-view></div>"
        });
})();