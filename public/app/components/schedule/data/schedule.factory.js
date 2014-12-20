(function(){
    "use strict";

    angular
        .module('app.data.schedule')
        .factory('scheduleService', scheduleFactory);

    /**
     * Dependency Injections
     * @type {string[]}
     */
    scheduleFactory.$inject = ['apiService', 'API_ROUTES_CONFIG', 'exceptionService'];

    /**
     * Provides activities and their activity sessions
     * @param apiService
     * @param API_ROUTES_CONFIG
     * @param exceptionService
     * @returns {{getDropins: getDropins, getActivitySessions: getActivitySessions}}
     */
    function scheduleFactory(apiService, API_ROUTES_CONFIG, exceptionService)
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
            return apiService
                .get(API_ROUTES_CONFIG.DROPINS + '/' + activityId)
                .then(getActivitySessionsComplete)
                .catch(exceptionService.catcher('XHR Failed for getActivitySessions'));

            function getActivitySessionsComplete(activitySessions) {
                return activitySessions;
            }
        }

        /**
         * Retrieves all dropin activities
         * @returns {ng.IPromise<TResult>|*} - Promise of activities
         */
        function getDropins() {
            return apiService
                .get(API_ROUTES_CONFIG.DROPINS)
                .then(getDropinsComplete)
                .catch(exceptionService.catcher('XHR Failed for getDropins'));

            function getDropinsComplete(activities) {
                return activities;
            }
        }
    }

})();