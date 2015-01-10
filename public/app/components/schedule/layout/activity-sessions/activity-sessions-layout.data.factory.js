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

        function load(activityId) {

            var data = [
                loadActivitySessions(activityId),
                loadActivity(activityId)
            ];

            return $q.all(data).then(
                function(results) {
                   return {
                       activitySessions: results[0],
                       activity: results[1]
                   }
                });

            // Data Loaders
            ///////////////////////////

            // Loads all data into this.data and returns a promise
            function loadActivitySessions(activityId) {
                return scheduleService.getActivitySessions(activityId);
            }

            function loadActivity(activityId) {
                return scheduleService.getActivity(activityId);
            }
        }
    }
})();