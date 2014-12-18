(function(){
    "use strict";

    angular.module('app.components.schedule').factory('scheduleService', scheduleFactory);

    scheduleFactory.$inject(['apiService', 'API_ROUTES_CONFIG']);
    function scheduleFactory(apiService, API_ROUTES_CONFIG)
    {
        function getActivitySessions(activityId) {
            return apiService.get(API_ROUTES_CONFIG.DROPINS + '/' + activityId).then(
                function (activitySessions) {
                    return activitySessions;
                }
            )
        }

        function getDropins() {
            return apiService.get(API_ROUTES_CONFIG.DROPINS).then(
                function (activities) {
                    return activities;
                }
            )
        }

        return {
            getDropins: getDropins,
            getActivitySessions: getActivitySessions
        }
    }

})();