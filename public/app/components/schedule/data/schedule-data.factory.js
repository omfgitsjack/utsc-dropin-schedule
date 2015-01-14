(function () {
    "use strict";

    angular
        .module('jp.schedule.data')
        .factory('scheduleService', scheduleFactory);

    /**
     * Provides activities and their activity sessions
     * @param apiService
     * @param API_ROUTES_CONFIG
     * @param exceptionService
     * @returns {{getDropins: getDropins, getActivitySessions: getActivitySessions}}
     * @ngInject
     */
    function scheduleFactory(apiService, API_ROUTES_CONFIG, exceptionService, DateTimeService) {
        return {
            getDropins: getDropins,
            getActivity: getActivity,
            getActivitySessions: getActivitySessions,
            joinActivitySession: joinActivitySession
        };

        /**
         * Retrieves all activity sessions for a given activity
         *
         * @param activityId - Activity Id
         * @returns {ng.IPromise<TResult>|*} - Promise of activity sessions
         */
        function getActivitySessions(activityId) {
            return apiService
                .get(API_ROUTES_CONFIG.DROPINS + '/' + activityId)
                .then(getActivitySessionsComplete)
                .then(groupByDayOfWeek)
                .then(convertIsWomenBoolean)
                .catch(exceptionService.catcher('XHR Failed for getActivitySessions'));

            /**
             * Returns activity sessions for a given activityId
             * @param activitySessions
             * @returns [
             *    {
             *      "id": 12,
             *      "activity_id": 8,
             *      "crawl_session_id": 1,
             *      "date": moment,
             *      "start_time": moment,
             *      "end_time": moment,
             *      "created_at": moment,
             *      "updated_at": moment
             *    }, ...
             * ]
             */
            function getActivitySessionsComplete(activitySessions) {
                return activitySessions;
            }

            /**
             * Format activity sessions by day of week
             * @param activitySessions
             * @returns [
             *      {
             *          date: moment, // These days are unique days
             *          sessions: [
             *              activitysession,
             *              ...
             *          ]
             *      },
             *      ...
             * ]
             */
            function groupByDayOfWeek(activitySessions) {
                var dateProperty = 'date';

                // Reduce activity sessions
                activitySessions = _
                    .chain(activitySessions)
                    .reduce(function(dict, activitySession) {

                        var sessionDate = activitySession['date'].startOf('day').format();

                        if (_.has(dict, sessionDate))
                        {
                            // Append activity session
                            dict[sessionDate]['sessions'].push(activitySession);
                        }
                        else
                        {
                            // Create a key for a new date
                            dict[sessionDate] = {
                                date: activitySession['date'].startOf('day'),
                                sessions: [
                                    activitySession
                                ]
                            }
                        }

                        return dict;
                    }, {})
                    .toArray()
                    .value();

                return activitySessions;
            }
        }

        /**
         * Retrieves Activity object given an activity Id
         * @param activityId
         * @returns
         * {
         *       "id":8,
         *       "activity":"Badminton",
         *      "category":"Drop In",
         *      "women_only":0,
         *      "created_at":"2014-12-14 16:51:25",
         *      "updated_at":"2014-12-14 16:51:25"
         * }
         */
        function getActivity(activityId)
        {
            return apiService
                .get(API_ROUTES_CONFIG.ACTIVITIES  + '/' + activityId)
                .catch(exceptionService.catcher('XHR Failed for getActivitySessions'));
        }

        /**
         * Retrieves all dropin activities
         * @returns {ng.IPromise<TResult>|*} - Promise of activities
         */
        function getDropins() {
            return apiService
                .get(API_ROUTES_CONFIG.DROPINS)
                .then(getDropinsComplete)
                .then(convertIsWomenBoolean)
                .catch(exceptionService.catcher('XHR Failed for getDropins'));

            function getDropinsComplete(activities) {
                return activities;
            }
        }

        // HELPER FUNCTIONS

        /**
         * Converts women_only boolean value from 0,1 to false, true
         *
         * @param collection
         * @returns {*}
         */
        function convertIsWomenBoolean(collection)
        {
            _.forEach(collection, function(el) {
                el.women_only = el.women_only !== 0;
            });

            return collection;
        }

        function joinActivitySession(activityId, sessionId, name)
        {
            return apiService
                .post('dropins/'+activityId+'/sessions/'+sessionId+'/participants', {
                    name: name
                });
        }
    }

})();