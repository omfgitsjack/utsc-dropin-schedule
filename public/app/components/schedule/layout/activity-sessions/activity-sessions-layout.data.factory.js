(function () {
    "use strict";

    /**
     * Data Service object to retrieve data for
     * activity-sessions-layout Controller
     */
    angular
        .module('jp.schedule.layouts')
        .factory('activitySessionsLayoutDataService', activitySessionsLayoutDataFactory);

    /**
     * Retrieves data for activity-sessions-layout Controller
     * @param $q,
     * @returns {{activitySessions: activitySessions}}
     * @ngInject
     */
    function activitySessionsLayoutDataFactory($q, scheduleService)
    {
        return {
            load: load
        };

        function load(activityId, weeksFromToday) {

            var data = [
                loadActivitySessionsThisWeek(activityId),
                loadActivitySessionsNextWeek(activityId),
                loadActivity(activityId)
            ];

            return $q.all(data).then(
                function(results) {
                   return {
                       activitySessionsThisWeek: results[0],
                       activitySessionsNextWeek: results[1],
                       activity: results[2],
                       selectedWeek: weeksFromToday
                   }
                });

            // Data Loaders
            ///////////////////////////

            // Loads all data into this.data and returns a promise
            function loadActivitySessionsThisWeek(activityId) {
                return scheduleService.getActivitySessions(activityId, 0);
            }

            function loadActivitySessionsNextWeek(activityId) {
                return scheduleService.getActivitySessions(activityId, 1);
            }

            function loadActivity(activityId) {
                return scheduleService.getActivity(activityId);
            }
        }
    }
})();