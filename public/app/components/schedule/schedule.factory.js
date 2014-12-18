(function(){
    "use strict";

    angular
        .module('app.components.schedule')
        .factory('scheduleService', scheduleFactory);

    /**
     * Dependency Injections
     * @type {string[]}
     */
    scheduleFactory.$inject = ['apiService', 'API_ROUTES_CONFIG'];

    /**
     * Provides activities and their activity sessions
     * @param apiService - API Provider
     * @param API_ROUTES_CONFIG - API Route Constants
     * @returns {{getDropins: getDropins, getActivitySessions: getActivitySessions}}
     */
    function scheduleFactory(apiService, API_ROUTES_CONFIG)
    {
        return {
            getDropins: getDropins,
            getActivitySessions: getActivitySessions
        };

        /**
         * Retrieves all activity sessions for a given activity
         * @param activityId - Activity Id
         * @returns {ng.IPromise<TResult>|*} - Promise of activity sessions
         */
        function getActivitySessions(activityId) {
            return apiService.get(API_ROUTES_CONFIG.DROPINS + '/' + activityId).then(
                function (activitySessions) {
                    return activitySessions;
                }
            );
        }

        /**
         * Retrieves all dropin activities
         * @returns {ng.IPromise<TResult>|*} - Promise of activities
         */
        function getDropins() {
            return apiService.get(API_ROUTES_CONFIG.DROPINS).then(
                function (activities) {
                    return activities;
                }
            );
        }
    }

})();