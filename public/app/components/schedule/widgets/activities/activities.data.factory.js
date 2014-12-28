(function () {
    "use strict";

    /**
     * Data Service object to retrieve data for
     * activities Controller
     */
    angular
        .module('jp.schedule.widgets')
            .factory('activitiesDataService', activitiesDataFactory);

    /**
     * Retrieves data for activities Controller
     * @param $q
     * @param scheduleService
     * @returns {{load: load}}
     * @ngInject
     */
    function activitiesDataFactory($q, scheduleService) {

        return {
            load: load
        };

        // Retrieves all data and returns an object
        // E.g. {
        //          item1: item1,
        //          item2: item2
        //      }
        function load() {
            var dropinActivities = scheduleService.getDropins();

            return $q.all([dropinActivities]).then(
                function(results) {
                   return {
                       dropinActivities: results[0]
                   }
                });
        }
    }
})();