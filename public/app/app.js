(function () {
    "use strict";

    /**
     * Main Application Module
     */
    angular.module('app.main', [
        'app.routes',
        'app.core'
    ]);

})();
(function () {
    "use strict";

    angular.module('app.core',
        [
            /*
             * Angular modules
             */
            'ngMaterial',
            /*
             * Our reusable cross app code modules
             */
            'utilities.api',
            'utilities.exception',
            'utilities.logger',
            'utilities.router',
            'utilities.datetime'
            /*
             * 3rd Party modules
             */
        ]);

})();

(function () {
    "use strict";

    /**
     * Application routes
     */
    angular.module('app.routes', [
        'jp.schedule.routes',
        'utilities.router'
    ]);

})();
(function () {
    "use strict";

    /**
     * Provides a DateTimeService utility class that provides an interface to
     * moment objects, utilities for working with MySQL UTC times etc.
     *
     * Refer to datetime.factory.js for documentation & available tools
     */
    angular.module('utilities.datetime',
        [
            'angularMoment'
        ]);

})();
(function () {
    "use strict";

    angular.module('utilities.exception',
        [
            'utilities.logger'
        ]);

})();
(function(){
    "use strict";

    angular.module('utilities.api', []);

})();

(function () {
    "use strict";

    angular.module('utilities.logger',
        []);

})();
(function () {
    "use strict";

    angular.module('utilities.router',
        [
            'ui.router'
        ]);

})();
/**
 *
 */
(function(){
    "use strict";

    angular.module('jp.schedule.data', [
        'app.core'
    ]);

})();
(function () {
    "use strict";

    angular.module('jp.schedule.layouts',
        []);

})();
(function () {
    "use strict";

    /**
     * Schedule Routing module
     */
    angular.module('jp.schedule.routes', [
        'ui.router',
        'jp.schedule.widgets',
        'jp.schedule.layouts'
    ]);

})();
(function () {
    "use strict";

    angular.module('jp.schedule.widgets',
        [
            'jp.schedule.widgets.activities',
            'jp.schedule.widgets.activitySessions'
        ]);

})();
(function(){
    "use strict";

    angular.module('jp.schedule.widgets.activities', [
        'jp.schedule.data'
    ]);

})();
(function () {
    "use strict";

    angular.module('jp.schedule.widgets.activitySessions', []);

})();
(function () {
    "use strict";

    /**
     * Core module configuration
     */
    angular
        .module('app.core')
        .config(toastrConfig)
        .config(logProviderConfig)
        .config(exceptionHandlerProviderConfig)
        .run(initCoreComponents);

    /**
     * Toastr Configuration
     * @param toastr
     * @ngInject
     */
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }
    toastrConfig.$inject = ["toastr"];

    /**
     * Log Provider Configuration
     * @param $logProvider
     * @ngInject
     */
    function logProviderConfig($logProvider) {
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
    }
    logProviderConfig.$inject = ["$logProvider"];

    /**
     * Exception Handler Provider configuration
     * @param exceptionHandlerProvider
     * @ngInject
     */
    function exceptionHandlerProviderConfig(exceptionHandlerProvider) {
        exceptionHandlerProvider.configure('[NG-JP Error] ');
    }
    exceptionHandlerProviderConfig.$inject = ["exceptionHandlerProvider"];

    /**
     * Initialzie core components
     * @param routerService
     * @ngInject
     */
    function initCoreComponents(routerService) {

    }
    initCoreComponents.$inject = ["routerService"];


})();

(function () {
    "use strict";

    /**
     * App route configuration
     */
    angular
        .module('app.routes')
        .config(routeConfig);

    /**
     * UI-Router state configuration.
     * Feature root (abstract) routes are also included.
     * @param $stateProvider
     * @param SCHEDULE_ROOT_ROUTE Note that this is parentless.
     * @ngInject
     */
    function routeConfig($stateProvider, SCHEDULE_ROOT_ROUTE)
    {
        // Define Root Parents
        SCHEDULE_ROOT_ROUTE['parent'] = '';

        $stateProvider
            // Local Routes
            // Feature Routes
            .state(SCHEDULE_ROOT_ROUTE);
    }
    routeConfig.$inject = ["$stateProvider", "SCHEDULE_ROOT_ROUTE"];
})();
(function () {
    "use strict";

    angular
        .module('utilities.datetime')
        .config(datetimeConfig);

    /**
     * Configure date time configuration, America/Detroit has same timezone as toronto
     * @param moment
     * @ngInject
     */
    function datetimeConfig(moment)
    {
        // Make sure moment is in english and the first day of week is a monday
        moment.lang('en', {
            // customizations.
            week: {
                dow: 1
            },
            calendar: {
                lastDay: '[Yesterday], dddd MMM D',
                sameDay : '[Today], dddd MMM D',
                nextDay : '[Tomorrow], dddd MMM D',
                lastWeek : 'dddd, MMM D',
                nextWeek : 'dddd, MMM D',
                sameElse : 'dddd, MMM D'
            }
        });

        // Add America/Detroit timezone, note that this is the same as Toronto
        moment.tz.add(
            [
                'America/Detroit|EST EDT|50 40|01010101010101010101010|1BQT0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0',
                "Etc/UTC|UTC|0|0|"
            ]);
    }
    datetimeConfig.$inject = ["moment"];

})();
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
            .state(parent+'.activities', {
                url: '/activities',
                templateUrl: "app/components/schedule/layout/base-layout.html",
                controller: "ScheduleBaseCtrl",
                controllerAs: "vm",
                resolve: {
                    activitiesDataService: getActivityData
                }
            })
            .state(parent+'.activities.sessions', {
                url: '/sessions/{activityId}',
                templateUrl: "app/components/schedule/layout/activity-sessions-layout.html",
                controller: "ActivitySessionLayoutController",
                controllerAs: "vm",
                resolve: {
                    activitySessionsData: getActivitySessionsData
                }
            });

        // Route Resolves

        /* @ngInject */
        function getActivityData(scheduleBaseLayoutDataService) {
            return scheduleBaseLayoutDataService.load();
        }
        getActivityData.$inject = ["scheduleBaseLayoutDataService"];

        /* @ngInject */
        function getActivitySessionsData(activitySessionsLayoutDataService, $stateParams) {
            return activitySessionsLayoutDataService.load($stateParams['activityId']);
        }
        getActivitySessionsData.$inject = ["activitySessionsLayoutDataService", "$stateParams"];
    }
    scheduleRouteConfig.$inject = ["$stateProvider", "SCHEDULE_ROOT_ROUTE"];
})();
(function () {
    "use strict";

    angular
        .module('app.core')
        // Lodash Definition
        .constant('_', _);

})();
(function () {
    "use strict";

    /**
     * Wrap moment as an angular dependency
     * whilst setting the default timezone for angular
     * moment
     */
    angular.module("utilities.datetime")
        .constant('moment', moment)
        .constant('angularMomentConfig', {
            timezone: 'America/Detroit'
        })
        .constant('UTC_TIMEFORMAT', "YYYY-MM-DD HH:MM:SS");

})();
(function () {
    "use strict";

    /**
     * API (non-route) constants
     */
    angular.module("utilities.api")
        .constant('API_CONFIG',
        {
            BASE_ROUTE: 'api'
        });

})();
(function() {
    "use strict";

    /**
     * API Resources constants
     */
    angular.module("utilities.api")
        .constant('API_ROUTES_CONFIG',
        {
            DROPINS: 'dropins',
            ACTIVITIES: 'activities'
        });

})();
(function () {
    "use strict";

    angular.module("utilities.logger")
        .constant('toastr', toastr);

})();
(function () {
    "use strict";

    /**
     * Schedule's abstract root route
     */
    angular.module("jp.schedule.routes")
        .constant('SCHEDULE_ROOT_ROUTE',
        {
            abstract: true,
            name: 'schedule',
            url: '/schedule',
            template: "<div ui-view></div>"
        });
})();
(function () {
    "use strict";



})();
(function () {
    "use strict";

    angular
        .module('jp.schedule.layouts')
        .controller('ActivitySessionLayoutController', ActivitySessionLayoutController);

    /**
     * Mediates data to underlying layout, activitySessionsData contains:
     * {
         *      activity: 'string',
         *      activitySession: [ { date: moment, sessions: [ session, session ] ]
         * }
         *
         * @param activitySessionsData
     * @constructor
     * @ngInject
     */
    function ActivitySessionLayoutController(activitySessionsData)
    {

        var vm = this;

        activate();

        //

        function activate()
        {
            vm.activitySessions = activitySessionsData.activitySessions;
            vm.activityLabel = activitySessionsData.activity.activity;
            vm.activityCategory = activitySessionsData.activity.category;
            vm.activityIsWomenOnly = activitySessionsData.activity.women_only;
        }

    }
    ActivitySessionLayoutController.$inject = ["activitySessionsData"];

})();
(function () {
    "use strict";

    angular
        .module('jp.schedule.layouts')
        .controller('ScheduleBaseCtrl', ScheduleBaseController);

    /* @ngInject */
    function ScheduleBaseController(activitiesDataService)
    {
        var vm = this;

        activate();

        function activate() {
            vm.activities = activitiesDataService.dropinActivities;
        }
    }
    ScheduleBaseController.$inject = ["activitiesDataService"];

})();
(function () {
    "use strict";

    angular
        .module('utilities.datetime')
        .factory('DateTimeService', DateTimeFactory);

    /**
     * Date Time utility belt that utilizes moment & supplies key
     * utilities for working with MySQL DateTime & time zone issues
     * @returns {{now: now, toUTC: toUTC, parseUTC: parseUTC}}
     * @constructor
     * @ngInject
     */
    function DateTimeFactory(UTC_TIMEFORMAT) {

        var service = {
            now: now,
            toUTC: toUTC,
            parseUTC: parseUTC,
            getDaysInThisWeek: getDaysInThisWeek
        };

        return service;

        /**
         * Provide an interface to retrieve a moment/date
         * @returns moment
         */
        function now() {
            return moment.tz(new Date(), 'America/Detroit');
        }

        /**
         * Transforms moment into MySQL acceptable UTC DateTime object
         * @param momentObj
         * @returns {*}
         */
        function toUTC(momentObj) {
            if (!moment.isMoment(momentObj)) {
                exceptionService.catcher('Non-moment object detected');
            }

            return momentObj.tz("Etc/UTC").format(UTC_TIMEFORMAT);
        }

        /**
         * Transforms MySQL UTC time Strings into moments
         * @param utcString
         * @returns {*}
         */
        function parseUTC(utcString) {
            return moment.tz(utcString, 'Etc/UTC').tz('America/Detroit');
        }

        /**
         * Retrieves an array of moments for this week,
         * each moment represents the start of the day.
         * @returns:
         * [
         *      moment, // Moment for Monday
         *      moment //  Moment for Tuesday
         *      ... // So on til Sunday
         * ]
         */
        function getDaysInThisWeek() {
            return getDaysInWeek(now());
        }

        /**
         * Retrieves an array of moments for a week, the week is based
         * on the inputted moment
         * @param dayInWeek
         * @returns
         * [
         *      moment, // Moment for Monday
         *      moment //  Moment for Tuesday
         *      ... // So on til Sunday
         * ]
         */
        function getDaysInWeek(dayInWeek) {
            var firstDayOfWeek = dayInWeek.startOf('week');
            var daysInWeek = [];

            for (var i = 0; i < 7; i++) {
                daysInWeek.push(angular.copy(firstDayOfWeek).add(i, 'days'));
            }

            return daysInWeek;
        }
    }
    DateTimeFactory.$inject = ["UTC_TIMEFORMAT"];
})();
(function () {
    "use strict";

    angular
        .module('utilities.exception')
        .factory('exceptionService', exceptionFactory);

    /* @ngInject */
    function exceptionFactory(loggerService) {
        var service = {
            catcher: catcher
        };

        return service;

        /**
         * Catches exceptions, logs reason into console.
         * @param message
         * @returns {Function}
         */
        function catcher(message) {
            return function(reason) {
                loggerService.error(message, reason);
            };
        }
    }
    exceptionFactory.$inject = ["loggerService"];
})();
(function () {
    "use strict";

    angular
        .module('utilities.api')
        .factory('apiTransformerService', apiTransformerService);

    /**
     * Utility functions to transform API calls
     * @returns {{prop: prop}}
     */
    function apiTransformerService(DateTimeService, UTC_TIMEFORMAT)
    {
        var service = {
            replaceDateTime: replaceDateTime
        };

        return service;

        /**
         * Replaces all MySQL DateTime strings in a JSON object/array
         * @param obj
         * @returns {*}
         */
        function replaceDateTime(obj) {
            if (typeof obj === "string" || obj instanceof String)
            {
                var dateObj = new Date(obj)
                if ( Object.prototype.toString.call(dateObj === "[object Date]" )) {
                    // it is a date
                    if ( isNaN( dateObj.getTime() ) ) {  // d.valueOf() could also work
                        // date is not valid
                        return obj;
                    }
                    else {
                        // date is valid
                        return DateTimeService.parseUTC(obj);
                    }
                }
                else {
                    // not a date
                    return obj;
                }
            }
            else if (obj.constructor === Array)
            {
                var clonedObj = [];
                // For each item, we reassign & recursively call replaceDateTime
                obj.forEach(function(element, index, array) {
                    clonedObj.push(replaceDateTime(element));
                });
                return clonedObj;
            }
            else if (obj instanceof Object)
            {
                var clonedObj = {};
                for (var prop in obj)
                {
                    if (obj.hasOwnProperty(prop))
                    {
                        clonedObj[prop] = replaceDateTime(obj[prop]);
                    }
                }
                return clonedObj;
            }
            else
            {
                return obj;
            }
        }
    }
    apiTransformerService.$inject = ["DateTimeService", "UTC_TIMEFORMAT"];
})();
(function () {
    "use strict";

    angular
        .module('utilities.api')
        .factory('apiService', apiFactory);

    /**
     * Wrapper around $http that acts as the data provider
     * @param $http - http client
     * @param API_CONFIG - API constants
     * @returns {{get: get, post: post}} - get and post services
     * @ngInject
     */
    function apiFactory($http, API_CONFIG, apiTransformerService)
    {
        return {
            get: get,
            post: post
        };

        /**
         * Takes any input and calls a HTTP POST on the given route
         * @param route - Route for posting
         * @param input - Payload
         */
        function post(route, input) {
            if (!input) {
                input = {};
            }

            $http.post(API_CONFIG.BASE_ROUTE + '/' + route, input);
        }

        /**
         * Calls a HTTP GET on the given route
         * @param route - Route to get
         * @returns {ng.IPromise<TResult>|*} - Promise of results
         */
        function get(route) {
            return $http
                .get(API_CONFIG.BASE_ROUTE + '/' + route)
                .then(getData)
                .then(apiTransformerService.replaceDateTime);
        }

        function getData(payload) {
            return payload.data
        }
    }
    apiFactory.$inject = ["$http", "API_CONFIG", "apiTransformerService"];

})();
(function () {
    "use strict";

    /**
     * Wrapper around toastr
     */
    angular
        .module('utilities.logger')
        .factory('loggerService', loggerFactory);

    /**
     * Deals with revealing & logging.
     * @returns {
     * {showToasts: boolean, error: error, info: info, success: success, warning: warning, log: ($log.log|*)}}
     * @ngInject
     */
    function loggerFactory($log, toastr) {
        var service = {
            showToasts: true,

            error: error,
            info: info,
            success: success,
            warning: warning,

            log: $log.log
        };

        return service;

        /**
         * Red error toast with a cross
         * @param message
         * @param data
         * @param title
         */
        function error(message, data, title) {
            toastr.error(message, title);
            $log.error('Error: ' + message, data);
        }

        /**
         * Light blue toast with exclamation mark
         * @param message
         * @param data
         * @param title
         */
        function info(message, data, title) {
            toastr.info(message, title);
            $log.info('Info: ' + message, data);
        }

        /**
         * Green toast with tick
         * @param message
         * @param data
         * @param title
         */
        function success(message, data, title) {
            toastr.success(message, title);
            $log.info('Success: ' + message, data);
        }

        /**
         * Red toast with Cross
         * @param message
         * @param data
         * @param title
         */
        function warning(message, data, title) {
            toastr.warning(message, title);
            $log.warn('Warning: ' + message, data);
        }
    }
    loggerFactory.$inject = ["$log", "toastr"];
})();
(function () {
    "use strict";

    angular
        .module('utilities.router')
        .factory('routerService', routerService);

    /* @ngInject */
    function routerService($state, $rootScope, loggerService) {
        var handlingRouteChangeError = false;
        var routeCounts = {
            errors: 0,
            changes: 0
        };
        var routes = [];
        var goDefaultState = function () {
            $state.go($state.$current);
        };

        init();

        return {
            goDefaultState: goDefaultState
        };

        function init() {
            handleRouteErrors();
            handleRouteSuccesses();
            handleRouteNotFound();
        }

        function handleRouteNotFound() {
            $rootScope.$on('$stateNotFound',
                function (event, unfoundState, fromState, fromParams) {
                    if (handlingRouteChangeError) {
                        return;
                    }
                    routeCounts.errors++;
                    handlingRouteChangeError = true;

                    // Log State not found
                    var msg = '[State not found] Error routing to ' +
                        unfoundState.to + ' from ' + fromState.parent + '.' +
                        fromState.name + '.';
                    loggerService.warning(msg);
                    goDefaultState();
                });
        }

        function handleRouteSuccesses() {
            $rootScope.$on('$stateChangeSuccess',
                function () {
                    routeCounts.changes++;
                    handlingRouteChangeError = false;
                });
        }

        function handleRouteErrors() {
            $rootScope.$on('$stateChangeError',
                function (event, toState, toParams, fromState, fromParams, error) {
                    if (handlingRouteChangeError) {
                        return;
                    }
                    routeCounts.errors++;
                    handlingRouteChangeError = true;

                    // Log State routing error
                    var msg = '[State Routing Error] ' +
                        'Error routing to ' + toState.name + ' from ' + fromState.name + '.' +
                        ' Error: ' + error;
                    loggerService.warning(msg, [error]);
                    goDefaultState();
                });
        }
    }
    routerService.$inject = ["$state", "$rootScope", "loggerService"];
})();
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
            getActivitySessions: getActivitySessions
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

            /**
             * Converts women_only boolean value from 0,1 to false, true
             *
             * @param activitySessions
             * @returns {*}
             */
            function convertIsWomenBoolean(activitySessions)
            {
                _.forEach(activitySessions, function(el) {
                   el.women_only = el.women_only !== 0;
                });

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
                .catch(exceptionService.catcher('XHR Failed for getDropins'));

            function getDropinsComplete(activities) {
                return activities;
            }
        }
    }
    scheduleFactory.$inject = ["apiService", "API_ROUTES_CONFIG", "exceptionService", "DateTimeService"];

})();
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
    activitySessionsLayoutDataFactory.$inject = ["$q", "scheduleService"];
})();
(function () {
    "use strict";

    /**
     * Data Service object to retrieve data for
     * schedule-base-layout Controller
     */
    angular
        .module('jp.schedule.layouts')
        .factory('scheduleBaseLayoutDataService', scheduleBaseLayoutDataFactory);

    /**
     * Retrieves data for schedule-base-layout Controller
     * @returns {{load: load}}
     * @ngInject
     */
    function scheduleBaseLayoutDataFactory($q, scheduleService)
    {
        return {
            load: load
        };

        // Loads all data into this.data and returns a promise
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
    scheduleBaseLayoutDataFactory.$inject = ["$q", "scheduleService"];
})();
(function () {
    "use strict";

    angular
        .module('jp.schedule.widgets.activities')
        .directive('jpScheduleActivityWizard', jpScheduleActivityWizard);

    function jpScheduleActivityWizard()
    {
        var directive = {
            restrict: 'E',
            templateUrl: "app/components/schedule/widgets/activities/activities.tmpl.html",
            scope: {
                activities: "="
            }
        };

        return directive;
    }


})();
(function () {
    "use strict";

    angular
        .module('jp.schedule.widgets.activitySessions')
        .directive('jpScheduleActivitySessionsDayList', jpScheduleActivitySessionsDayList);

    /* @ngIngject */
    function jpScheduleActivitySessionsDayList(DateTimeService)
    {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/schedule/widgets/activity-sessions/activity-sessions-day-list.html',
            scope: {
                sessions: '=',
                day: '='
            },
            link: function($scope, element, attr)
            {
                console.log('g');
                $scope.today = DateTimeService.now().add(0, 'days');
                $scope.tm = DateTimeService.now().add(-1, 'days');
                $scope.tmm = DateTimeService.now().add(-3, 'days');
            }
        };

        return directive;
    }
    jpScheduleActivitySessionsDayList.$inject = ["DateTimeService"];

})();
(function () {
    "use strict";

    angular
        .module('jp.schedule.widgets.activitySessions')
        .directive('jpScheduleActivitySessionsList', jpScheduleActivitySessionsList);

    function jpScheduleActivitySessionsList() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/schedule/widgets/activity-sessions/activity-sessions-list.html',
            scope: {
                schedule: '='
            },
            link: function ($scope) {
                console.log('f');
            }
        };

        return directive;
    }

})();
// Include in index.html so that app level exceptions are handled.
// Should exclude from test runner
(function() {
    'use strict';

    angular
        .module('utilities.exception')
        .provider('exceptionHandler', exceptionHandlerProvider)
        .config(config);

    /**
     * Must configure the exception handling
     * @return {[type]}
     */
    function exceptionHandlerProvider() {
        this.config = {
            appErrorPrefix: undefined
        };

        this.configure = function (appErrorPrefix) {
            this.config.appErrorPrefix = appErrorPrefix;
        };

        this.$get = function() {
            return {config: this.config};
        };
    }

    /**
     * Configure by setting an optional string value for appErrorPrefix.
     * Accessible via config.appErrorPrefix (via config value).
     * @param  {[type]} $provide
     * @return {[type]}
     * @ngInject
     */
    function config($provide) {
        $provide.decorator('$exceptionHandler', extendExceptionHandler);
    }
    config.$inject = ["$provide"];

    /**
     * Extend the $exceptionHandler service to also display a toast.
     * @param  {Object} $delegate
     * @param  {Object} exceptionHandler
     * @param  {Object} loggerService
     * @return {Function} the decorated $exceptionHandler service
     */
    function extendExceptionHandler($delegate, exceptionHandler, loggerService) {
        return function(exception, cause) {
            var appErrorPrefix = exceptionHandler.config.appErrorPrefix || '';
            var errorData = {exception: exception, cause: cause};
            exception.message = appErrorPrefix + exception.message;
            $delegate(exception, cause);
            /**
             * Could add the error to a service's collection,
             * add errors to $rootScope, log errors to remote web server,
             * or log locally. Or throw hard.
             * throw exception;
             *
             * @example
             *     throw { message: 'error message we added' };
             */
            loggerService.error(exception.message, errorData);
        };
    }
    extendExceptionHandler.$inject = ["$delegate", "exceptionHandler", "loggerService"];
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUuanMiLCJjb3JlL2NvcmUubW9kdWxlLmpzIiwicm91dGVzL2FwcC1yb3V0ZXMubW9kdWxlLmpzIiwidXRpbGl0aWVzL2RhdGV0aW1lL2RhdGV0aW1lLm1vZHVsZS5qcyIsInV0aWxpdGllcy9leGNlcHRpb24vZXhjZXB0aW9uLm1vZHVsZS5qcyIsInV0aWxpdGllcy9hcGkvYXBpLm1vZHVsZS5qcyIsInV0aWxpdGllcy9sb2dnZXIvbG9nZ2VyLm1vZHVsZS5qcyIsInV0aWxpdGllcy9yb3V0ZXIvcm91dGVyLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvZGF0YS9zY2hlZHVsZS5tb2R1bGUuanMiLCJjb21wb25lbnRzL3NjaGVkdWxlL2xheW91dC9sYXlvdXQubW9kdWxlLmpzIiwiY29tcG9uZW50cy9zY2hlZHVsZS9yb3V0ZXMvc2NoZWR1bGUtcm91dGVzLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvd2lkZ2V0cy9zY2hlZHVsZS13aWRnZXRzLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvd2lkZ2V0cy9hY3Rpdml0aWVzL2FjdGl2aXRpZXMubW9kdWxlLmpzIiwiY29tcG9uZW50cy9zY2hlZHVsZS93aWRnZXRzL2FjdGl2aXR5LXNlc3Npb25zL2FjdGl2aXR5c2Vzc2lvbnMubW9kdWxlLmpzIiwiY29yZS9jb3JlLmNvbmZpZy5qcyIsInJvdXRlcy9hcHAtcm91dGVzLmNvbmZpZy5qcyIsInV0aWxpdGllcy9kYXRldGltZS9kYXRldGltZS5jb25maWcuanMiLCJjb21wb25lbnRzL3NjaGVkdWxlL3JvdXRlcy9zY2hlZHVsZS1yb3V0ZXMuY29uZmlnLmpzIiwiY29yZS9jb3JlLmNvbnN0YW50LmpzIiwidXRpbGl0aWVzL2RhdGV0aW1lL2RhdGV0aW1lLmNvbnN0YW50LmpzIiwidXRpbGl0aWVzL2FwaS9hcGkuY29uc3RhbnQuanMiLCJ1dGlsaXRpZXMvYXBpL2FwaS5yb3V0ZXMuY29uc3RhbnQuanMiLCJ1dGlsaXRpZXMvbG9nZ2VyL2xvZ2dlci5jb25zdGFudC5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvcm91dGVzL3NjaGVkdWxlLXJvb3Qtcm91dGUuY29uc3RhbnQuanMiLCJsYXlvdXQvc2hlbGwuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvbGF5b3V0L2FjdGl2aXR5LXNlc3Npb25zLWxheW91dC5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9zY2hlZHVsZS9sYXlvdXQvYmFzZS1sYXlvdXQuY29udHJvbGxlci5qcyIsInV0aWxpdGllcy9kYXRldGltZS9kYXRldGltZS5mYWN0b3J5LmpzIiwidXRpbGl0aWVzL2V4Y2VwdGlvbi9leGNlcHRpb24uZmFjdG9yeS5qcyIsInV0aWxpdGllcy9hcGkvYXBpLXRyYW5zZm9ybWVyLmZhY3RvcnkuanMiLCJ1dGlsaXRpZXMvYXBpL2FwaS5mYWN0b3J5LmpzIiwidXRpbGl0aWVzL2xvZ2dlci9sb2dnZXIuZmFjdG9yeS5qcyIsInV0aWxpdGllcy9yb3V0ZXIvcm91dGVyLmZhY3RvcnkuanMiLCJjb21wb25lbnRzL3NjaGVkdWxlL2RhdGEvc2NoZWR1bGUuZmFjdG9yeS5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvbGF5b3V0L2FjdGl2aXR5LXNlc3Npb25zLWxheW91dC5kYXRhLmZhY3RvcnkuanMiLCJjb21wb25lbnRzL3NjaGVkdWxlL2xheW91dC9iYXNlLWxheW91dC5kYXRhLmZhY3RvcnkuanMiLCJjb21wb25lbnRzL3NjaGVkdWxlL3dpZGdldHMvYWN0aXZpdGllcy9hY3Rpdml0aWVzLmRpcmVjdGl2ZS5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvd2lkZ2V0cy9hY3Rpdml0eS1zZXNzaW9ucy9hY3Rpdml0eS1zZXNzaW9ucy1kYXktbGlzdC5kaXJlY3RpdmUuanMiLCJjb21wb25lbnRzL3NjaGVkdWxlL3dpZGdldHMvYWN0aXZpdHktc2Vzc2lvbnMvYWN0aXZpdHktc2Vzc2lvbnMtbGlzdC5kaXJlY3RpdmUuanMiLCJ1dGlsaXRpZXMvZXhjZXB0aW9uL2V4Y2VwdGlvbi1oYW5kbGVyLnByb3ZpZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLENBQUEsWUFBQTtJQUNBOzs7OztJQUtBLFFBQUEsT0FBQSxZQUFBO1FBQ0E7UUFDQTs7OztBQ1JBLENBQUEsWUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQTtRQUNBOzs7O1lBSUE7Ozs7WUFJQTtZQUNBO1lBQ0E7WUFDQTtZQUNBOzs7Ozs7OztBQ2hCQSxDQUFBLFlBQUE7SUFDQTs7Ozs7SUFLQSxRQUFBLE9BQUEsY0FBQTtRQUNBO1FBQ0E7Ozs7QUNSQSxDQUFBLFlBQUE7SUFDQTs7Ozs7Ozs7SUFRQSxRQUFBLE9BQUE7UUFDQTtZQUNBOzs7O0FDWEEsQ0FBQSxZQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBO1FBQ0E7WUFDQTs7OztBQ0xBLENBQUEsVUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxpQkFBQTs7OztBQ0hBLENBQUEsWUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQTtRQUNBOzs7QUNKQSxDQUFBLFlBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUE7UUFDQTtZQUNBOzs7Ozs7O0FDRkEsQ0FBQSxVQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLG9CQUFBO1FBQ0E7Ozs7QUNQQSxDQUFBLFlBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUE7UUFDQTs7O0FDSkEsQ0FBQSxZQUFBO0lBQ0E7Ozs7O0lBS0EsUUFBQSxPQUFBLHNCQUFBO1FBQ0E7UUFDQTtRQUNBOzs7O0FDVEEsQ0FBQSxZQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBO1FBQ0E7WUFDQTtZQUNBOzs7O0FDTkEsQ0FBQSxVQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLGtDQUFBO1FBQ0E7Ozs7QUNKQSxDQUFBLFlBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsd0NBQUE7OztBQ0hBLENBQUEsWUFBQTtJQUNBOzs7OztJQUtBO1NBQ0EsT0FBQTtTQUNBLE9BQUE7U0FDQSxPQUFBO1NBQ0EsT0FBQTtTQUNBLElBQUE7Ozs7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QUE7Ozs7Ozs7Ozs7O0lBV0EsU0FBQSxPQUFBLFVBQUE7UUFDQSxTQUFBLFVBQUEscUJBQUE7Ozs7Ozs7Ozs7O0lBVUEsU0FBQSx1QkFBQSxXQUFBLGtCQUFBLGVBQUE7UUFDQSxPQUFBLFNBQUEsV0FBQSxPQUFBO1lBQ0EsSUFBQSxpQkFBQSxpQkFBQSxPQUFBLGtCQUFBO1lBQ0EsSUFBQSxZQUFBLENBQUEsV0FBQSxXQUFBLE9BQUE7WUFDQSxVQUFBLFVBQUEsaUJBQUEsVUFBQTtZQUNBLFVBQUEsV0FBQTs7Ozs7Ozs7OztZQVVBLGNBQUEsTUFBQSxVQUFBLFNBQUE7Ozs7S0FHQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYWluIEFwcGxpY2F0aW9uIE1vZHVsZVxyXG4gICAgICovXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLm1haW4nLCBbXHJcbiAgICAgICAgJ2FwcC5yb3V0ZXMnLFxyXG4gICAgICAgICdhcHAuY29yZSdcclxuICAgIF0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb3JlJyxcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAqIEFuZ3VsYXIgbW9kdWxlc1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgJ25nTWF0ZXJpYWwnLFxyXG4gICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgKiBPdXIgcmV1c2FibGUgY3Jvc3MgYXBwIGNvZGUgbW9kdWxlc1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgJ3V0aWxpdGllcy5hcGknLFxyXG4gICAgICAgICAgICAndXRpbGl0aWVzLmV4Y2VwdGlvbicsXHJcbiAgICAgICAgICAgICd1dGlsaXRpZXMubG9nZ2VyJyxcclxuICAgICAgICAgICAgJ3V0aWxpdGllcy5yb3V0ZXInLFxyXG4gICAgICAgICAgICAndXRpbGl0aWVzLmRhdGV0aW1lJ1xyXG4gICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgKiAzcmQgUGFydHkgbW9kdWxlc1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICBdKTtcclxuXHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFwcGxpY2F0aW9uIHJvdXRlc1xyXG4gICAgICovXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLnJvdXRlcycsIFtcclxuICAgICAgICAnanAuc2NoZWR1bGUucm91dGVzJyxcclxuICAgICAgICAndXRpbGl0aWVzLnJvdXRlcidcclxuICAgIF0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcm92aWRlcyBhIERhdGVUaW1lU2VydmljZSB1dGlsaXR5IGNsYXNzIHRoYXQgcHJvdmlkZXMgYW4gaW50ZXJmYWNlIHRvXHJcbiAgICAgKiBtb21lbnQgb2JqZWN0cywgdXRpbGl0aWVzIGZvciB3b3JraW5nIHdpdGggTXlTUUwgVVRDIHRpbWVzIGV0Yy5cclxuICAgICAqXHJcbiAgICAgKiBSZWZlciB0byBkYXRldGltZS5mYWN0b3J5LmpzIGZvciBkb2N1bWVudGF0aW9uICYgYXZhaWxhYmxlIHRvb2xzXHJcbiAgICAgKi9cclxuICAgIGFuZ3VsYXIubW9kdWxlKCd1dGlsaXRpZXMuZGF0ZXRpbWUnLFxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgJ2FuZ3VsYXJNb21lbnQnXHJcbiAgICAgICAgXSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgndXRpbGl0aWVzLmV4Y2VwdGlvbicsXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICAndXRpbGl0aWVzLmxvZ2dlcidcclxuICAgICAgICBdKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgndXRpbGl0aWVzLmFwaScsIFtdKTtcclxuXHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgndXRpbGl0aWVzLmxvZ2dlcicsXHJcbiAgICAgICAgW10pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ3V0aWxpdGllcy5yb3V0ZXInLFxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgJ3VpLnJvdXRlcidcclxuICAgICAgICBdKTtcclxuXHJcbn0pKCk7IiwiLyoqXHJcbiAqXHJcbiAqL1xyXG4oZnVuY3Rpb24oKXtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdqcC5zY2hlZHVsZS5kYXRhJywgW1xyXG4gICAgICAgICdhcHAuY29yZSdcclxuICAgIF0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2pwLnNjaGVkdWxlLmxheW91dHMnLFxyXG4gICAgICAgIFtdKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2NoZWR1bGUgUm91dGluZyBtb2R1bGVcclxuICAgICAqL1xyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2pwLnNjaGVkdWxlLnJvdXRlcycsIFtcclxuICAgICAgICAndWkucm91dGVyJyxcclxuICAgICAgICAnanAuc2NoZWR1bGUud2lkZ2V0cycsXHJcbiAgICAgICAgJ2pwLnNjaGVkdWxlLmxheW91dHMnXHJcbiAgICBdKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdqcC5zY2hlZHVsZS53aWRnZXRzJyxcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgICdqcC5zY2hlZHVsZS53aWRnZXRzLmFjdGl2aXRpZXMnLFxyXG4gICAgICAgICAgICAnanAuc2NoZWR1bGUud2lkZ2V0cy5hY3Rpdml0eVNlc3Npb25zJ1xyXG4gICAgICAgIF0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKXtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdqcC5zY2hlZHVsZS53aWRnZXRzLmFjdGl2aXRpZXMnLCBbXHJcbiAgICAgICAgJ2pwLnNjaGVkdWxlLmRhdGEnXHJcbiAgICBdKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdqcC5zY2hlZHVsZS53aWRnZXRzLmFjdGl2aXR5U2Vzc2lvbnMnLCBbXSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvcmUgbW9kdWxlIGNvbmZpZ3VyYXRpb25cclxuICAgICAqL1xyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcC5jb3JlJylcclxuICAgICAgICAuY29uZmlnKHRvYXN0ckNvbmZpZylcclxuICAgICAgICAuY29uZmlnKGxvZ1Byb3ZpZGVyQ29uZmlnKVxyXG4gICAgICAgIC5jb25maWcoZXhjZXB0aW9uSGFuZGxlclByb3ZpZGVyQ29uZmlnKVxyXG4gICAgICAgIC5ydW4oaW5pdENvcmVDb21wb25lbnRzKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRvYXN0ciBDb25maWd1cmF0aW9uXHJcbiAgICAgKiBAcGFyYW0gdG9hc3RyXHJcbiAgICAgKiBAbmdJbmplY3RcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gdG9hc3RyQ29uZmlnKHRvYXN0cikge1xyXG4gICAgICAgIHRvYXN0ci5vcHRpb25zLnRpbWVPdXQgPSA0MDAwO1xyXG4gICAgICAgIHRvYXN0ci5vcHRpb25zLnBvc2l0aW9uQ2xhc3MgPSAndG9hc3QtYm90dG9tLXJpZ2h0JztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvZyBQcm92aWRlciBDb25maWd1cmF0aW9uXHJcbiAgICAgKiBAcGFyYW0gJGxvZ1Byb3ZpZGVyXHJcbiAgICAgKiBAbmdJbmplY3RcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gbG9nUHJvdmlkZXJDb25maWcoJGxvZ1Byb3ZpZGVyKSB7XHJcbiAgICAgICAgaWYgKCRsb2dQcm92aWRlci5kZWJ1Z0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgJGxvZ1Byb3ZpZGVyLmRlYnVnRW5hYmxlZCh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeGNlcHRpb24gSGFuZGxlciBQcm92aWRlciBjb25maWd1cmF0aW9uXHJcbiAgICAgKiBAcGFyYW0gZXhjZXB0aW9uSGFuZGxlclByb3ZpZGVyXHJcbiAgICAgKiBAbmdJbmplY3RcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZXhjZXB0aW9uSGFuZGxlclByb3ZpZGVyQ29uZmlnKGV4Y2VwdGlvbkhhbmRsZXJQcm92aWRlcikge1xyXG4gICAgICAgIGV4Y2VwdGlvbkhhbmRsZXJQcm92aWRlci5jb25maWd1cmUoJ1tORy1KUCBFcnJvcl0gJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsemllIGNvcmUgY29tcG9uZW50c1xyXG4gICAgICogQHBhcmFtIHJvdXRlclNlcnZpY2VcclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBpbml0Q29yZUNvbXBvbmVudHMocm91dGVyU2VydmljZSkge1xyXG5cclxuICAgIH1cclxuXHJcblxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBcHAgcm91dGUgY29uZmlndXJhdGlvblxyXG4gICAgICovXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwLnJvdXRlcycpXHJcbiAgICAgICAgLmNvbmZpZyhyb3V0ZUNvbmZpZyk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVSS1Sb3V0ZXIgc3RhdGUgY29uZmlndXJhdGlvbi5cclxuICAgICAqIEZlYXR1cmUgcm9vdCAoYWJzdHJhY3QpIHJvdXRlcyBhcmUgYWxzbyBpbmNsdWRlZC5cclxuICAgICAqIEBwYXJhbSAkc3RhdGVQcm92aWRlclxyXG4gICAgICogQHBhcmFtIFNDSEVEVUxFX1JPT1RfUk9VVEUgTm90ZSB0aGF0IHRoaXMgaXMgcGFyZW50bGVzcy5cclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiByb3V0ZUNvbmZpZygkc3RhdGVQcm92aWRlciwgU0NIRURVTEVfUk9PVF9ST1VURSlcclxuICAgIHtcclxuICAgICAgICAvLyBEZWZpbmUgUm9vdCBQYXJlbnRzXHJcbiAgICAgICAgU0NIRURVTEVfUk9PVF9ST1VURVsncGFyZW50J10gPSAnJztcclxuXHJcbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgLy8gTG9jYWwgUm91dGVzXHJcbiAgICAgICAgICAgIC8vIEZlYXR1cmUgUm91dGVzXHJcbiAgICAgICAgICAgIC5zdGF0ZShTQ0hFRFVMRV9ST09UX1JPVVRFKTtcclxuICAgIH1cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3V0aWxpdGllcy5kYXRldGltZScpXHJcbiAgICAgICAgLmNvbmZpZyhkYXRldGltZUNvbmZpZyk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25maWd1cmUgZGF0ZSB0aW1lIGNvbmZpZ3VyYXRpb24sIEFtZXJpY2EvRGV0cm9pdCBoYXMgc2FtZSB0aW1lem9uZSBhcyB0b3JvbnRvXHJcbiAgICAgKiBAcGFyYW0gbW9tZW50XHJcbiAgICAgKiBAbmdJbmplY3RcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZGF0ZXRpbWVDb25maWcobW9tZW50KVxyXG4gICAge1xyXG4gICAgICAgIC8vIE1ha2Ugc3VyZSBtb21lbnQgaXMgaW4gZW5nbGlzaCBhbmQgdGhlIGZpcnN0IGRheSBvZiB3ZWVrIGlzIGEgbW9uZGF5XHJcbiAgICAgICAgbW9tZW50LmxhbmcoJ2VuJywge1xyXG4gICAgICAgICAgICAvLyBjdXN0b21pemF0aW9ucy5cclxuICAgICAgICAgICAgd2Vlazoge1xyXG4gICAgICAgICAgICAgICAgZG93OiAxXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNhbGVuZGFyOiB7XHJcbiAgICAgICAgICAgICAgICBsYXN0RGF5OiAnW1llc3RlcmRheV0sIGRkZGQgTU1NIEQnLFxyXG4gICAgICAgICAgICAgICAgc2FtZURheSA6ICdbVG9kYXldLCBkZGRkIE1NTSBEJyxcclxuICAgICAgICAgICAgICAgIG5leHREYXkgOiAnW1RvbW9ycm93XSwgZGRkZCBNTU0gRCcsXHJcbiAgICAgICAgICAgICAgICBsYXN0V2VlayA6ICdkZGRkLCBNTU0gRCcsXHJcbiAgICAgICAgICAgICAgICBuZXh0V2VlayA6ICdkZGRkLCBNTU0gRCcsXHJcbiAgICAgICAgICAgICAgICBzYW1lRWxzZSA6ICdkZGRkLCBNTU0gRCdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBBZGQgQW1lcmljYS9EZXRyb2l0IHRpbWV6b25lLCBub3RlIHRoYXQgdGhpcyBpcyB0aGUgc2FtZSBhcyBUb3JvbnRvXHJcbiAgICAgICAgbW9tZW50LnR6LmFkZChcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgJ0FtZXJpY2EvRGV0cm9pdHxFU1QgRURUfDUwIDQwfDAxMDEwMTAxMDEwMTAxMDEwMTAxMDEwfDFCUVQwIDF6YjAgT3AwIDF6YjAgT3AwIDF6YjAgT3AwIDF6YjAgT3AwIDF6YjAgT3AwIDF6YjAgUmQwIDF6YjAgT3AwIDF6YjAgT3AwIDF6YjAgT3AwIDF6YjAgT3AwIDF6YjAnLFxyXG4gICAgICAgICAgICAgICAgXCJFdGMvVVRDfFVUQ3wwfDB8XCJcclxuICAgICAgICAgICAgXSk7XHJcbiAgICB9XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNjaGVkdWxlIHJvdXRlIGNvbmZpZ3VyYXRpb25cclxuICAgICAqL1xyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2pwLnNjaGVkdWxlLnJvdXRlcycpXHJcbiAgICAgICAgLmNvbmZpZyhzY2hlZHVsZVJvdXRlQ29uZmlnKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJvdXRlIGNvbmZpZ3VyYXRpb24sXHJcbiAgICAgKiB1c2VzIFNDSEVEVUxFX1JPT1RfUk9VVEUgYXMgYWJzdHJhY3QgcGFyZW50IHN0YXRlXHJcbiAgICAgKiBAcGFyYW0gJHN0YXRlUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSBTQ0hFRFVMRV9ST09UX1JPVVRFXHJcbiAgICAgKiBAbmdJbmplY3RcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gc2NoZWR1bGVSb3V0ZUNvbmZpZygkc3RhdGVQcm92aWRlciwgU0NIRURVTEVfUk9PVF9ST1VURSlcclxuICAgIHtcclxuICAgICAgICAvLyBQYXJlbnQgU3RhdGUncyBuYW1lIHRvIGJlIGluY2x1ZGVkIGluIGV2ZXJ5IHN0YXRlXHJcbiAgICAgICAgdmFyIHBhcmVudCA9IFNDSEVEVUxFX1JPT1RfUk9VVEUubmFtZTtcclxuXHJcbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgLy8gTG9jYWwgcm91dGVzXHJcbiAgICAgICAgICAgIC5zdGF0ZShwYXJlbnQrJy5hY3Rpdml0aWVzJywge1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnL2FjdGl2aXRpZXMnLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwL2NvbXBvbmVudHMvc2NoZWR1bGUvbGF5b3V0L2Jhc2UtbGF5b3V0Lmh0bWxcIixcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6IFwiU2NoZWR1bGVCYXNlQ3RybFwiLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlckFzOiBcInZtXCIsXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZpdGllc0RhdGFTZXJ2aWNlOiBnZXRBY3Rpdml0eURhdGFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXRlKHBhcmVudCsnLmFjdGl2aXRpZXMuc2Vzc2lvbnMnLCB7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICcvc2Vzc2lvbnMve2FjdGl2aXR5SWR9JyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcImFwcC9jb21wb25lbnRzL3NjaGVkdWxlL2xheW91dC9hY3Rpdml0eS1zZXNzaW9ucy1sYXlvdXQuaHRtbFwiLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogXCJBY3Rpdml0eVNlc3Npb25MYXlvdXRDb250cm9sbGVyXCIsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyQXM6IFwidm1cIixcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpdml0eVNlc3Npb25zRGF0YTogZ2V0QWN0aXZpdHlTZXNzaW9uc0RhdGFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFJvdXRlIFJlc29sdmVzXHJcblxyXG4gICAgICAgIC8qIEBuZ0luamVjdCAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldEFjdGl2aXR5RGF0YShzY2hlZHVsZUJhc2VMYXlvdXREYXRhU2VydmljZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gc2NoZWR1bGVCYXNlTGF5b3V0RGF0YVNlcnZpY2UubG9hZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyogQG5nSW5qZWN0ICovXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0QWN0aXZpdHlTZXNzaW9uc0RhdGEoYWN0aXZpdHlTZXNzaW9uc0xheW91dERhdGFTZXJ2aWNlLCAkc3RhdGVQYXJhbXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFjdGl2aXR5U2Vzc2lvbnNMYXlvdXREYXRhU2VydmljZS5sb2FkKCRzdGF0ZVBhcmFtc1snYWN0aXZpdHlJZCddKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAuY29yZScpXHJcbiAgICAgICAgLy8gTG9kYXNoIERlZmluaXRpb25cclxuICAgICAgICAuY29uc3RhbnQoJ18nLCBfKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV3JhcCBtb21lbnQgYXMgYW4gYW5ndWxhciBkZXBlbmRlbmN5XHJcbiAgICAgKiB3aGlsc3Qgc2V0dGluZyB0aGUgZGVmYXVsdCB0aW1lem9uZSBmb3IgYW5ndWxhclxyXG4gICAgICogbW9tZW50XHJcbiAgICAgKi9cclxuICAgIGFuZ3VsYXIubW9kdWxlKFwidXRpbGl0aWVzLmRhdGV0aW1lXCIpXHJcbiAgICAgICAgLmNvbnN0YW50KCdtb21lbnQnLCBtb21lbnQpXHJcbiAgICAgICAgLmNvbnN0YW50KCdhbmd1bGFyTW9tZW50Q29uZmlnJywge1xyXG4gICAgICAgICAgICB0aW1lem9uZTogJ0FtZXJpY2EvRGV0cm9pdCdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jb25zdGFudCgnVVRDX1RJTUVGT1JNQVQnLCBcIllZWVktTU0tREQgSEg6TU06U1NcIik7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFQSSAobm9uLXJvdXRlKSBjb25zdGFudHNcclxuICAgICAqL1xyXG4gICAgYW5ndWxhci5tb2R1bGUoXCJ1dGlsaXRpZXMuYXBpXCIpXHJcbiAgICAgICAgLmNvbnN0YW50KCdBUElfQ09ORklHJyxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEJBU0VfUk9VVEU6ICdhcGknXHJcbiAgICAgICAgfSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQVBJIFJlc291cmNlcyBjb25zdGFudHNcclxuICAgICAqL1xyXG4gICAgYW5ndWxhci5tb2R1bGUoXCJ1dGlsaXRpZXMuYXBpXCIpXHJcbiAgICAgICAgLmNvbnN0YW50KCdBUElfUk9VVEVTX0NPTkZJRycsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEUk9QSU5TOiAnZHJvcGlucycsXHJcbiAgICAgICAgICAgIEFDVElWSVRJRVM6ICdhY3Rpdml0aWVzJ1xyXG4gICAgICAgIH0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoXCJ1dGlsaXRpZXMubG9nZ2VyXCIpXHJcbiAgICAgICAgLmNvbnN0YW50KCd0b2FzdHInLCB0b2FzdHIpO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTY2hlZHVsZSdzIGFic3RyYWN0IHJvb3Qgcm91dGVcclxuICAgICAqL1xyXG4gICAgYW5ndWxhci5tb2R1bGUoXCJqcC5zY2hlZHVsZS5yb3V0ZXNcIilcclxuICAgICAgICAuY29uc3RhbnQoJ1NDSEVEVUxFX1JPT1RfUk9VVEUnLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYWJzdHJhY3Q6IHRydWUsXHJcbiAgICAgICAgICAgIG5hbWU6ICdzY2hlZHVsZScsXHJcbiAgICAgICAgICAgIHVybDogJy9zY2hlZHVsZScsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiBcIjxkaXYgdWktdmlldz48L2Rpdj5cIlxyXG4gICAgICAgIH0pO1xyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcblxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2pwLnNjaGVkdWxlLmxheW91dHMnKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCdBY3Rpdml0eVNlc3Npb25MYXlvdXRDb250cm9sbGVyJywgQWN0aXZpdHlTZXNzaW9uTGF5b3V0Q29udHJvbGxlcik7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNZWRpYXRlcyBkYXRhIHRvIHVuZGVybHlpbmcgbGF5b3V0LCBhY3Rpdml0eVNlc3Npb25zRGF0YSBjb250YWluczpcclxuICAgICAqIHtcclxuICAgICAgICAgKiAgICAgIGFjdGl2aXR5OiAnc3RyaW5nJyxcclxuICAgICAgICAgKiAgICAgIGFjdGl2aXR5U2Vzc2lvbjogWyB7IGRhdGU6IG1vbWVudCwgc2Vzc2lvbnM6IFsgc2Vzc2lvbiwgc2Vzc2lvbiBdIF1cclxuICAgICAgICAgKiB9XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0gYWN0aXZpdHlTZXNzaW9uc0RhdGFcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICogQG5nSW5qZWN0XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIEFjdGl2aXR5U2Vzc2lvbkxheW91dENvbnRyb2xsZXIoYWN0aXZpdHlTZXNzaW9uc0RhdGEpXHJcbiAgICB7XHJcblxyXG4gICAgICAgIHZhciB2bSA9IHRoaXM7XHJcblxyXG4gICAgICAgIGFjdGl2YXRlKCk7XHJcblxyXG4gICAgICAgIC8vXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFjdGl2YXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZtLmFjdGl2aXR5U2Vzc2lvbnMgPSBhY3Rpdml0eVNlc3Npb25zRGF0YS5hY3Rpdml0eVNlc3Npb25zO1xyXG4gICAgICAgICAgICB2bS5hY3Rpdml0eUxhYmVsID0gYWN0aXZpdHlTZXNzaW9uc0RhdGEuYWN0aXZpdHkuYWN0aXZpdHk7XHJcbiAgICAgICAgICAgIHZtLmFjdGl2aXR5Q2F0ZWdvcnkgPSBhY3Rpdml0eVNlc3Npb25zRGF0YS5hY3Rpdml0eS5jYXRlZ29yeTtcclxuICAgICAgICAgICAgdm0uYWN0aXZpdHlJc1dvbWVuT25seSA9IGFjdGl2aXR5U2Vzc2lvbnNEYXRhLmFjdGl2aXR5LndvbWVuX29ubHk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdqcC5zY2hlZHVsZS5sYXlvdXRzJylcclxuICAgICAgICAuY29udHJvbGxlcignU2NoZWR1bGVCYXNlQ3RybCcsIFNjaGVkdWxlQmFzZUNvbnRyb2xsZXIpO1xyXG5cclxuICAgIC8qIEBuZ0luamVjdCAqL1xyXG4gICAgZnVuY3Rpb24gU2NoZWR1bGVCYXNlQ29udHJvbGxlcihhY3Rpdml0aWVzRGF0YVNlcnZpY2UpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHZtID0gdGhpcztcclxuXHJcbiAgICAgICAgYWN0aXZhdGUoKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWN0aXZhdGUoKSB7XHJcbiAgICAgICAgICAgIHZtLmFjdGl2aXRpZXMgPSBhY3Rpdml0aWVzRGF0YVNlcnZpY2UuZHJvcGluQWN0aXZpdGllcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgndXRpbGl0aWVzLmRhdGV0aW1lJylcclxuICAgICAgICAuZmFjdG9yeSgnRGF0ZVRpbWVTZXJ2aWNlJywgRGF0ZVRpbWVGYWN0b3J5KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERhdGUgVGltZSB1dGlsaXR5IGJlbHQgdGhhdCB1dGlsaXplcyBtb21lbnQgJiBzdXBwbGllcyBrZXlcclxuICAgICAqIHV0aWxpdGllcyBmb3Igd29ya2luZyB3aXRoIE15U1FMIERhdGVUaW1lICYgdGltZSB6b25lIGlzc3Vlc1xyXG4gICAgICogQHJldHVybnMge3tub3c6IG5vdywgdG9VVEM6IHRvVVRDLCBwYXJzZVVUQzogcGFyc2VVVEN9fVxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKiBAbmdJbmplY3RcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gRGF0ZVRpbWVGYWN0b3J5KFVUQ19USU1FRk9STUFUKSB7XHJcblxyXG4gICAgICAgIHZhciBzZXJ2aWNlID0ge1xyXG4gICAgICAgICAgICBub3c6IG5vdyxcclxuICAgICAgICAgICAgdG9VVEM6IHRvVVRDLFxyXG4gICAgICAgICAgICBwYXJzZVVUQzogcGFyc2VVVEMsXHJcbiAgICAgICAgICAgIGdldERheXNJblRoaXNXZWVrOiBnZXREYXlzSW5UaGlzV2Vla1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQcm92aWRlIGFuIGludGVyZmFjZSB0byByZXRyaWV2ZSBhIG1vbWVudC9kYXRlXHJcbiAgICAgICAgICogQHJldHVybnMgbW9tZW50XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gbm93KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbW9tZW50LnR6KG5ldyBEYXRlKCksICdBbWVyaWNhL0RldHJvaXQnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRyYW5zZm9ybXMgbW9tZW50IGludG8gTXlTUUwgYWNjZXB0YWJsZSBVVEMgRGF0ZVRpbWUgb2JqZWN0XHJcbiAgICAgICAgICogQHBhcmFtIG1vbWVudE9ialxyXG4gICAgICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHRvVVRDKG1vbWVudE9iaikge1xyXG4gICAgICAgICAgICBpZiAoIW1vbWVudC5pc01vbWVudChtb21lbnRPYmopKSB7XHJcbiAgICAgICAgICAgICAgICBleGNlcHRpb25TZXJ2aWNlLmNhdGNoZXIoJ05vbi1tb21lbnQgb2JqZWN0IGRldGVjdGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBtb21lbnRPYmoudHooXCJFdGMvVVRDXCIpLmZvcm1hdChVVENfVElNRUZPUk1BVCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUcmFuc2Zvcm1zIE15U1FMIFVUQyB0aW1lIFN0cmluZ3MgaW50byBtb21lbnRzXHJcbiAgICAgICAgICogQHBhcmFtIHV0Y1N0cmluZ1xyXG4gICAgICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHBhcnNlVVRDKHV0Y1N0cmluZykge1xyXG4gICAgICAgICAgICByZXR1cm4gbW9tZW50LnR6KHV0Y1N0cmluZywgJ0V0Yy9VVEMnKS50eignQW1lcmljYS9EZXRyb2l0Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXRyaWV2ZXMgYW4gYXJyYXkgb2YgbW9tZW50cyBmb3IgdGhpcyB3ZWVrLFxyXG4gICAgICAgICAqIGVhY2ggbW9tZW50IHJlcHJlc2VudHMgdGhlIHN0YXJ0IG9mIHRoZSBkYXkuXHJcbiAgICAgICAgICogQHJldHVybnM6XHJcbiAgICAgICAgICogW1xyXG4gICAgICAgICAqICAgICAgbW9tZW50LCAvLyBNb21lbnQgZm9yIE1vbmRheVxyXG4gICAgICAgICAqICAgICAgbW9tZW50IC8vICBNb21lbnQgZm9yIFR1ZXNkYXlcclxuICAgICAgICAgKiAgICAgIC4uLiAvLyBTbyBvbiB0aWwgU3VuZGF5XHJcbiAgICAgICAgICogXVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldERheXNJblRoaXNXZWVrKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZ2V0RGF5c0luV2Vlayhub3coKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXRyaWV2ZXMgYW4gYXJyYXkgb2YgbW9tZW50cyBmb3IgYSB3ZWVrLCB0aGUgd2VlayBpcyBiYXNlZFxyXG4gICAgICAgICAqIG9uIHRoZSBpbnB1dHRlZCBtb21lbnRcclxuICAgICAgICAgKiBAcGFyYW0gZGF5SW5XZWVrXHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKiBbXHJcbiAgICAgICAgICogICAgICBtb21lbnQsIC8vIE1vbWVudCBmb3IgTW9uZGF5XHJcbiAgICAgICAgICogICAgICBtb21lbnQgLy8gIE1vbWVudCBmb3IgVHVlc2RheVxyXG4gICAgICAgICAqICAgICAgLi4uIC8vIFNvIG9uIHRpbCBTdW5kYXlcclxuICAgICAgICAgKiBdXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0RGF5c0luV2VlayhkYXlJbldlZWspIHtcclxuICAgICAgICAgICAgdmFyIGZpcnN0RGF5T2ZXZWVrID0gZGF5SW5XZWVrLnN0YXJ0T2YoJ3dlZWsnKTtcclxuICAgICAgICAgICAgdmFyIGRheXNJbldlZWsgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNzsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBkYXlzSW5XZWVrLnB1c2goYW5ndWxhci5jb3B5KGZpcnN0RGF5T2ZXZWVrKS5hZGQoaSwgJ2RheXMnKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkYXlzSW5XZWVrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3V0aWxpdGllcy5leGNlcHRpb24nKVxyXG4gICAgICAgIC5mYWN0b3J5KCdleGNlcHRpb25TZXJ2aWNlJywgZXhjZXB0aW9uRmFjdG9yeSk7XHJcblxyXG4gICAgLyogQG5nSW5qZWN0ICovXHJcbiAgICBmdW5jdGlvbiBleGNlcHRpb25GYWN0b3J5KGxvZ2dlclNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgc2VydmljZSA9IHtcclxuICAgICAgICAgICAgY2F0Y2hlcjogY2F0Y2hlclxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDYXRjaGVzIGV4Y2VwdGlvbnMsIGxvZ3MgcmVhc29uIGludG8gY29uc29sZS5cclxuICAgICAgICAgKiBAcGFyYW0gbWVzc2FnZVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBjYXRjaGVyKG1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHJlYXNvbikge1xyXG4gICAgICAgICAgICAgICAgbG9nZ2VyU2VydmljZS5lcnJvcihtZXNzYWdlLCByZWFzb24pO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3V0aWxpdGllcy5hcGknKVxyXG4gICAgICAgIC5mYWN0b3J5KCdhcGlUcmFuc2Zvcm1lclNlcnZpY2UnLCBhcGlUcmFuc2Zvcm1lclNlcnZpY2UpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXRpbGl0eSBmdW5jdGlvbnMgdG8gdHJhbnNmb3JtIEFQSSBjYWxsc1xyXG4gICAgICogQHJldHVybnMge3twcm9wOiBwcm9wfX1cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gYXBpVHJhbnNmb3JtZXJTZXJ2aWNlKERhdGVUaW1lU2VydmljZSwgVVRDX1RJTUVGT1JNQVQpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHNlcnZpY2UgPSB7XHJcbiAgICAgICAgICAgIHJlcGxhY2VEYXRlVGltZTogcmVwbGFjZURhdGVUaW1lXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNlcnZpY2U7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlcGxhY2VzIGFsbCBNeVNRTCBEYXRlVGltZSBzdHJpbmdzIGluIGEgSlNPTiBvYmplY3QvYXJyYXlcclxuICAgICAgICAgKiBAcGFyYW0gb2JqXHJcbiAgICAgICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gcmVwbGFjZURhdGVUaW1lKG9iaikge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9iaiA9PT0gXCJzdHJpbmdcIiB8fCBvYmogaW5zdGFuY2VvZiBTdHJpbmcpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRlT2JqID0gbmV3IERhdGUob2JqKVxyXG4gICAgICAgICAgICAgICAgaWYgKCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZGF0ZU9iaiA9PT0gXCJbb2JqZWN0IERhdGVdXCIgKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGl0IGlzIGEgZGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICggaXNOYU4oIGRhdGVPYmouZ2V0VGltZSgpICkgKSB7ICAvLyBkLnZhbHVlT2YoKSBjb3VsZCBhbHNvIHdvcmtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGF0ZSBpcyBub3QgdmFsaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRhdGUgaXMgdmFsaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIERhdGVUaW1lU2VydmljZS5wYXJzZVVUQyhvYmopO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG5vdCBhIGRhdGVcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG9iai5jb25zdHJ1Y3RvciA9PT0gQXJyYXkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBjbG9uZWRPYmogPSBbXTtcclxuICAgICAgICAgICAgICAgIC8vIEZvciBlYWNoIGl0ZW0sIHdlIHJlYXNzaWduICYgcmVjdXJzaXZlbHkgY2FsbCByZXBsYWNlRGF0ZVRpbWVcclxuICAgICAgICAgICAgICAgIG9iai5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQsIGluZGV4LCBhcnJheSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsb25lZE9iai5wdXNoKHJlcGxhY2VEYXRlVGltZShlbGVtZW50KSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjbG9uZWRPYmo7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgT2JqZWN0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2xvbmVkT2JqID0ge307XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBwcm9wIGluIG9iailcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHByb3ApKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmVkT2JqW3Byb3BdID0gcmVwbGFjZURhdGVUaW1lKG9ialtwcm9wXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNsb25lZE9iajtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCd1dGlsaXRpZXMuYXBpJylcclxuICAgICAgICAuZmFjdG9yeSgnYXBpU2VydmljZScsIGFwaUZhY3RvcnkpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV3JhcHBlciBhcm91bmQgJGh0dHAgdGhhdCBhY3RzIGFzIHRoZSBkYXRhIHByb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0gJGh0dHAgLSBodHRwIGNsaWVudFxyXG4gICAgICogQHBhcmFtIEFQSV9DT05GSUcgLSBBUEkgY29uc3RhbnRzXHJcbiAgICAgKiBAcmV0dXJucyB7e2dldDogZ2V0LCBwb3N0OiBwb3N0fX0gLSBnZXQgYW5kIHBvc3Qgc2VydmljZXNcclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBhcGlGYWN0b3J5KCRodHRwLCBBUElfQ09ORklHLCBhcGlUcmFuc2Zvcm1lclNlcnZpY2UpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZ2V0OiBnZXQsXHJcbiAgICAgICAgICAgIHBvc3Q6IHBvc3RcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUYWtlcyBhbnkgaW5wdXQgYW5kIGNhbGxzIGEgSFRUUCBQT1NUIG9uIHRoZSBnaXZlbiByb3V0ZVxyXG4gICAgICAgICAqIEBwYXJhbSByb3V0ZSAtIFJvdXRlIGZvciBwb3N0aW5nXHJcbiAgICAgICAgICogQHBhcmFtIGlucHV0IC0gUGF5bG9hZFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHBvc3Qocm91dGUsIGlucHV0KSB7XHJcbiAgICAgICAgICAgIGlmICghaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgIGlucHV0ID0ge307XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICRodHRwLnBvc3QoQVBJX0NPTkZJRy5CQVNFX1JPVVRFICsgJy8nICsgcm91dGUsIGlucHV0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENhbGxzIGEgSFRUUCBHRVQgb24gdGhlIGdpdmVuIHJvdXRlXHJcbiAgICAgICAgICogQHBhcmFtIHJvdXRlIC0gUm91dGUgdG8gZ2V0XHJcbiAgICAgICAgICogQHJldHVybnMge25nLklQcm9taXNlPFRSZXN1bHQ+fCp9IC0gUHJvbWlzZSBvZiByZXN1bHRzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0KHJvdXRlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cFxyXG4gICAgICAgICAgICAgICAgLmdldChBUElfQ09ORklHLkJBU0VfUk9VVEUgKyAnLycgKyByb3V0ZSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGdldERhdGEpXHJcbiAgICAgICAgICAgICAgICAudGhlbihhcGlUcmFuc2Zvcm1lclNlcnZpY2UucmVwbGFjZURhdGVUaW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldERhdGEocGF5bG9hZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcGF5bG9hZC5kYXRhXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXcmFwcGVyIGFyb3VuZCB0b2FzdHJcclxuICAgICAqL1xyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3V0aWxpdGllcy5sb2dnZXInKVxyXG4gICAgICAgIC5mYWN0b3J5KCdsb2dnZXJTZXJ2aWNlJywgbG9nZ2VyRmFjdG9yeSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWFscyB3aXRoIHJldmVhbGluZyAmIGxvZ2dpbmcuXHJcbiAgICAgKiBAcmV0dXJucyB7XHJcbiAgICAgKiB7c2hvd1RvYXN0czogYm9vbGVhbiwgZXJyb3I6IGVycm9yLCBpbmZvOiBpbmZvLCBzdWNjZXNzOiBzdWNjZXNzLCB3YXJuaW5nOiB3YXJuaW5nLCBsb2c6ICgkbG9nLmxvZ3wqKX19XHJcbiAgICAgKiBAbmdJbmplY3RcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gbG9nZ2VyRmFjdG9yeSgkbG9nLCB0b2FzdHIpIHtcclxuICAgICAgICB2YXIgc2VydmljZSA9IHtcclxuICAgICAgICAgICAgc2hvd1RvYXN0czogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIGVycm9yOiBlcnJvcixcclxuICAgICAgICAgICAgaW5mbzogaW5mbyxcclxuICAgICAgICAgICAgc3VjY2Vzczogc3VjY2VzcyxcclxuICAgICAgICAgICAgd2FybmluZzogd2FybmluZyxcclxuXHJcbiAgICAgICAgICAgIGxvZzogJGxvZy5sb2dcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gc2VydmljZTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVkIGVycm9yIHRvYXN0IHdpdGggYSBjcm9zc1xyXG4gICAgICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgICAgICogQHBhcmFtIGRhdGFcclxuICAgICAgICAgKiBAcGFyYW0gdGl0bGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBlcnJvcihtZXNzYWdlLCBkYXRhLCB0aXRsZSkge1xyXG4gICAgICAgICAgICB0b2FzdHIuZXJyb3IobWVzc2FnZSwgdGl0bGUpO1xyXG4gICAgICAgICAgICAkbG9nLmVycm9yKCdFcnJvcjogJyArIG1lc3NhZ2UsIGRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTGlnaHQgYmx1ZSB0b2FzdCB3aXRoIGV4Y2xhbWF0aW9uIG1hcmtcclxuICAgICAgICAgKiBAcGFyYW0gbWVzc2FnZVxyXG4gICAgICAgICAqIEBwYXJhbSBkYXRhXHJcbiAgICAgICAgICogQHBhcmFtIHRpdGxlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gaW5mbyhtZXNzYWdlLCBkYXRhLCB0aXRsZSkge1xyXG4gICAgICAgICAgICB0b2FzdHIuaW5mbyhtZXNzYWdlLCB0aXRsZSk7XHJcbiAgICAgICAgICAgICRsb2cuaW5mbygnSW5mbzogJyArIG1lc3NhZ2UsIGRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR3JlZW4gdG9hc3Qgd2l0aCB0aWNrXHJcbiAgICAgICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAgICAgKiBAcGFyYW0gZGF0YVxyXG4gICAgICAgICAqIEBwYXJhbSB0aXRsZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHN1Y2Nlc3MobWVzc2FnZSwgZGF0YSwgdGl0bGUpIHtcclxuICAgICAgICAgICAgdG9hc3RyLnN1Y2Nlc3MobWVzc2FnZSwgdGl0bGUpO1xyXG4gICAgICAgICAgICAkbG9nLmluZm8oJ1N1Y2Nlc3M6ICcgKyBtZXNzYWdlLCBkYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlZCB0b2FzdCB3aXRoIENyb3NzXHJcbiAgICAgICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAgICAgKiBAcGFyYW0gZGF0YVxyXG4gICAgICAgICAqIEBwYXJhbSB0aXRsZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHdhcm5pbmcobWVzc2FnZSwgZGF0YSwgdGl0bGUpIHtcclxuICAgICAgICAgICAgdG9hc3RyLndhcm5pbmcobWVzc2FnZSwgdGl0bGUpO1xyXG4gICAgICAgICAgICAkbG9nLndhcm4oJ1dhcm5pbmc6ICcgKyBtZXNzYWdlLCBkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCd1dGlsaXRpZXMucm91dGVyJylcclxuICAgICAgICAuZmFjdG9yeSgncm91dGVyU2VydmljZScsIHJvdXRlclNlcnZpY2UpO1xyXG5cclxuICAgIC8qIEBuZ0luamVjdCAqL1xyXG4gICAgZnVuY3Rpb24gcm91dGVyU2VydmljZSgkc3RhdGUsICRyb290U2NvcGUsIGxvZ2dlclNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgaGFuZGxpbmdSb3V0ZUNoYW5nZUVycm9yID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIHJvdXRlQ291bnRzID0ge1xyXG4gICAgICAgICAgICBlcnJvcnM6IDAsXHJcbiAgICAgICAgICAgIGNoYW5nZXM6IDBcclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciByb3V0ZXMgPSBbXTtcclxuICAgICAgICB2YXIgZ29EZWZhdWx0U3RhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygkc3RhdGUuJGN1cnJlbnQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZ29EZWZhdWx0U3RhdGU6IGdvRGVmYXVsdFN0YXRlXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICAgICAgaGFuZGxlUm91dGVFcnJvcnMoKTtcclxuICAgICAgICAgICAgaGFuZGxlUm91dGVTdWNjZXNzZXMoKTtcclxuICAgICAgICAgICAgaGFuZGxlUm91dGVOb3RGb3VuZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlUm91dGVOb3RGb3VuZCgpIHtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZU5vdEZvdW5kJyxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChldmVudCwgdW5mb3VuZFN0YXRlLCBmcm9tU3RhdGUsIGZyb21QYXJhbXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaGFuZGxpbmdSb3V0ZUNoYW5nZUVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcm91dGVDb3VudHMuZXJyb3JzKys7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxpbmdSb3V0ZUNoYW5nZUVycm9yID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTG9nIFN0YXRlIG5vdCBmb3VuZFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtc2cgPSAnW1N0YXRlIG5vdCBmb3VuZF0gRXJyb3Igcm91dGluZyB0byAnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdW5mb3VuZFN0YXRlLnRvICsgJyBmcm9tICcgKyBmcm9tU3RhdGUucGFyZW50ICsgJy4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJvbVN0YXRlLm5hbWUgKyAnLic7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyU2VydmljZS53YXJuaW5nKG1zZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ29EZWZhdWx0U3RhdGUoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlUm91dGVTdWNjZXNzZXMoKSB7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdWNjZXNzJyxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICByb3V0ZUNvdW50cy5jaGFuZ2VzKys7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxpbmdSb3V0ZUNoYW5nZUVycm9yID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZVJvdXRlRXJyb3JzKCkge1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlRXJyb3InLFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKGV2ZW50LCB0b1N0YXRlLCB0b1BhcmFtcywgZnJvbVN0YXRlLCBmcm9tUGFyYW1zLCBlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChoYW5kbGluZ1JvdXRlQ2hhbmdlRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByb3V0ZUNvdW50cy5lcnJvcnMrKztcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGluZ1JvdXRlQ2hhbmdlRXJyb3IgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBMb2cgU3RhdGUgcm91dGluZyBlcnJvclxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtc2cgPSAnW1N0YXRlIFJvdXRpbmcgRXJyb3JdICcgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnRXJyb3Igcm91dGluZyB0byAnICsgdG9TdGF0ZS5uYW1lICsgJyBmcm9tICcgKyBmcm9tU3RhdGUubmFtZSArICcuJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcgRXJyb3I6ICcgKyBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICBsb2dnZXJTZXJ2aWNlLndhcm5pbmcobXNnLCBbZXJyb3JdKTtcclxuICAgICAgICAgICAgICAgICAgICBnb0RlZmF1bHRTdGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnanAuc2NoZWR1bGUuZGF0YScpXHJcbiAgICAgICAgLmZhY3RvcnkoJ3NjaGVkdWxlU2VydmljZScsIHNjaGVkdWxlRmFjdG9yeSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcm92aWRlcyBhY3Rpdml0aWVzIGFuZCB0aGVpciBhY3Rpdml0eSBzZXNzaW9uc1xyXG4gICAgICogQHBhcmFtIGFwaVNlcnZpY2VcclxuICAgICAqIEBwYXJhbSBBUElfUk9VVEVTX0NPTkZJR1xyXG4gICAgICogQHBhcmFtIGV4Y2VwdGlvblNlcnZpY2VcclxuICAgICAqIEByZXR1cm5zIHt7Z2V0RHJvcGluczogZ2V0RHJvcGlucywgZ2V0QWN0aXZpdHlTZXNzaW9uczogZ2V0QWN0aXZpdHlTZXNzaW9uc319XHJcbiAgICAgKiBAbmdJbmplY3RcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gc2NoZWR1bGVGYWN0b3J5KGFwaVNlcnZpY2UsIEFQSV9ST1VURVNfQ09ORklHLCBleGNlcHRpb25TZXJ2aWNlLCBEYXRlVGltZVNlcnZpY2UpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBnZXREcm9waW5zOiBnZXREcm9waW5zLFxyXG4gICAgICAgICAgICBnZXRBY3Rpdml0eTogZ2V0QWN0aXZpdHksXHJcbiAgICAgICAgICAgIGdldEFjdGl2aXR5U2Vzc2lvbnM6IGdldEFjdGl2aXR5U2Vzc2lvbnNcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXRyaWV2ZXMgYWxsIGFjdGl2aXR5IHNlc3Npb25zIGZvciBhIGdpdmVuIGFjdGl2aXR5XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0gYWN0aXZpdHlJZCAtIEFjdGl2aXR5IElkXHJcbiAgICAgICAgICogQHJldHVybnMge25nLklQcm9taXNlPFRSZXN1bHQ+fCp9IC0gUHJvbWlzZSBvZiBhY3Rpdml0eSBzZXNzaW9uc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldEFjdGl2aXR5U2Vzc2lvbnMoYWN0aXZpdHlJZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXBpU2VydmljZVxyXG4gICAgICAgICAgICAgICAgLmdldChBUElfUk9VVEVTX0NPTkZJRy5EUk9QSU5TICsgJy8nICsgYWN0aXZpdHlJZClcclxuICAgICAgICAgICAgICAgIC50aGVuKGdldEFjdGl2aXR5U2Vzc2lvbnNDb21wbGV0ZSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGdyb3VwQnlEYXlPZldlZWspXHJcbiAgICAgICAgICAgICAgICAudGhlbihjb252ZXJ0SXNXb21lbkJvb2xlYW4pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXhjZXB0aW9uU2VydmljZS5jYXRjaGVyKCdYSFIgRmFpbGVkIGZvciBnZXRBY3Rpdml0eVNlc3Npb25zJykpO1xyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIFJldHVybnMgYWN0aXZpdHkgc2Vzc2lvbnMgZm9yIGEgZ2l2ZW4gYWN0aXZpdHlJZFxyXG4gICAgICAgICAgICAgKiBAcGFyYW0gYWN0aXZpdHlTZXNzaW9uc1xyXG4gICAgICAgICAgICAgKiBAcmV0dXJucyBbXHJcbiAgICAgICAgICAgICAqICAgIHtcclxuICAgICAgICAgICAgICogICAgICBcImlkXCI6IDEyLFxyXG4gICAgICAgICAgICAgKiAgICAgIFwiYWN0aXZpdHlfaWRcIjogOCxcclxuICAgICAgICAgICAgICogICAgICBcImNyYXdsX3Nlc3Npb25faWRcIjogMSxcclxuICAgICAgICAgICAgICogICAgICBcImRhdGVcIjogbW9tZW50LFxyXG4gICAgICAgICAgICAgKiAgICAgIFwic3RhcnRfdGltZVwiOiBtb21lbnQsXHJcbiAgICAgICAgICAgICAqICAgICAgXCJlbmRfdGltZVwiOiBtb21lbnQsXHJcbiAgICAgICAgICAgICAqICAgICAgXCJjcmVhdGVkX2F0XCI6IG1vbWVudCxcclxuICAgICAgICAgICAgICogICAgICBcInVwZGF0ZWRfYXRcIjogbW9tZW50XHJcbiAgICAgICAgICAgICAqICAgIH0sIC4uLlxyXG4gICAgICAgICAgICAgKiBdXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRBY3Rpdml0eVNlc3Npb25zQ29tcGxldGUoYWN0aXZpdHlTZXNzaW9ucykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjdGl2aXR5U2Vzc2lvbnM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBGb3JtYXQgYWN0aXZpdHkgc2Vzc2lvbnMgYnkgZGF5IG9mIHdlZWtcclxuICAgICAgICAgICAgICogQHBhcmFtIGFjdGl2aXR5U2Vzc2lvbnNcclxuICAgICAgICAgICAgICogQHJldHVybnMgW1xyXG4gICAgICAgICAgICAgKiAgICAgIHtcclxuICAgICAgICAgICAgICogICAgICAgICAgZGF0ZTogbW9tZW50LCAvLyBUaGVzZSBkYXlzIGFyZSB1bmlxdWUgZGF5c1xyXG4gICAgICAgICAgICAgKiAgICAgICAgICBzZXNzaW9uczogW1xyXG4gICAgICAgICAgICAgKiAgICAgICAgICAgICAgYWN0aXZpdHlzZXNzaW9uLFxyXG4gICAgICAgICAgICAgKiAgICAgICAgICAgICAgLi4uXHJcbiAgICAgICAgICAgICAqICAgICAgICAgIF1cclxuICAgICAgICAgICAgICogICAgICB9LFxyXG4gICAgICAgICAgICAgKiAgICAgIC4uLlxyXG4gICAgICAgICAgICAgKiBdXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBncm91cEJ5RGF5T2ZXZWVrKGFjdGl2aXR5U2Vzc2lvbnMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRlUHJvcGVydHkgPSAnZGF0ZSc7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmVkdWNlIGFjdGl2aXR5IHNlc3Npb25zXHJcbiAgICAgICAgICAgICAgICBhY3Rpdml0eVNlc3Npb25zID0gX1xyXG4gICAgICAgICAgICAgICAgICAgIC5jaGFpbihhY3Rpdml0eVNlc3Npb25zKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZWR1Y2UoZnVuY3Rpb24oZGljdCwgYWN0aXZpdHlTZXNzaW9uKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2Vzc2lvbkRhdGUgPSBhY3Rpdml0eVNlc3Npb25bJ2RhdGUnXS5zdGFydE9mKCdkYXknKS5mb3JtYXQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfLmhhcyhkaWN0LCBzZXNzaW9uRGF0ZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFwcGVuZCBhY3Rpdml0eSBzZXNzaW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWN0W3Nlc3Npb25EYXRlXVsnc2Vzc2lvbnMnXS5wdXNoKGFjdGl2aXR5U2Vzc2lvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYSBrZXkgZm9yIGEgbmV3IGRhdGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpY3Rbc2Vzc2lvbkRhdGVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGU6IGFjdGl2aXR5U2Vzc2lvblsnZGF0ZSddLnN0YXJ0T2YoJ2RheScpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlc3Npb25zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5U2Vzc2lvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRpY3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwge30pXHJcbiAgICAgICAgICAgICAgICAgICAgLnRvQXJyYXkoKVxyXG4gICAgICAgICAgICAgICAgICAgIC52YWx1ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpdml0eVNlc3Npb25zO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQ29udmVydHMgd29tZW5fb25seSBib29sZWFuIHZhbHVlIGZyb20gMCwxIHRvIGZhbHNlLCB0cnVlXHJcbiAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSBhY3Rpdml0eVNlc3Npb25zXHJcbiAgICAgICAgICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZnVuY3Rpb24gY29udmVydElzV29tZW5Cb29sZWFuKGFjdGl2aXR5U2Vzc2lvbnMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF8uZm9yRWFjaChhY3Rpdml0eVNlc3Npb25zLCBmdW5jdGlvbihlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgZWwud29tZW5fb25seSA9IGVsLndvbWVuX29ubHkgIT09IDA7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYWN0aXZpdHlTZXNzaW9ucztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmV0cmlldmVzIEFjdGl2aXR5IG9iamVjdCBnaXZlbiBhbiBhY3Rpdml0eSBJZFxyXG4gICAgICAgICAqIEBwYXJhbSBhY3Rpdml0eUlkXHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKiB7XHJcbiAgICAgICAgICogICAgICAgXCJpZFwiOjgsXHJcbiAgICAgICAgICogICAgICAgXCJhY3Rpdml0eVwiOlwiQmFkbWludG9uXCIsXHJcbiAgICAgICAgICogICAgICBcImNhdGVnb3J5XCI6XCJEcm9wIEluXCIsXHJcbiAgICAgICAgICogICAgICBcIndvbWVuX29ubHlcIjowLFxyXG4gICAgICAgICAqICAgICAgXCJjcmVhdGVkX2F0XCI6XCIyMDE0LTEyLTE0IDE2OjUxOjI1XCIsXHJcbiAgICAgICAgICogICAgICBcInVwZGF0ZWRfYXRcIjpcIjIwMTQtMTItMTQgMTY6NTE6MjVcIlxyXG4gICAgICAgICAqIH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBnZXRBY3Rpdml0eShhY3Rpdml0eUlkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFwaVNlcnZpY2VcclxuICAgICAgICAgICAgICAgIC5nZXQoQVBJX1JPVVRFU19DT05GSUcuQUNUSVZJVElFUyAgKyAnLycgKyBhY3Rpdml0eUlkKVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGV4Y2VwdGlvblNlcnZpY2UuY2F0Y2hlcignWEhSIEZhaWxlZCBmb3IgZ2V0QWN0aXZpdHlTZXNzaW9ucycpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJldHJpZXZlcyBhbGwgZHJvcGluIGFjdGl2aXRpZXNcclxuICAgICAgICAgKiBAcmV0dXJucyB7bmcuSVByb21pc2U8VFJlc3VsdD58Kn0gLSBQcm9taXNlIG9mIGFjdGl2aXRpZXNcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBnZXREcm9waW5zKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXBpU2VydmljZVxyXG4gICAgICAgICAgICAgICAgLmdldChBUElfUk9VVEVTX0NPTkZJRy5EUk9QSU5TKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZ2V0RHJvcGluc0NvbXBsZXRlKVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGV4Y2VwdGlvblNlcnZpY2UuY2F0Y2hlcignWEhSIEZhaWxlZCBmb3IgZ2V0RHJvcGlucycpKTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldERyb3BpbnNDb21wbGV0ZShhY3Rpdml0aWVzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYWN0aXZpdGllcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGF0YSBTZXJ2aWNlIG9iamVjdCB0byByZXRyaWV2ZSBkYXRhIGZvclxyXG4gICAgICogYWN0aXZpdHktc2Vzc2lvbnMtbGF5b3V0IENvbnRyb2xsZXJcclxuICAgICAqL1xyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2pwLnNjaGVkdWxlLmxheW91dHMnKVxyXG4gICAgICAgIC5mYWN0b3J5KCdhY3Rpdml0eVNlc3Npb25zTGF5b3V0RGF0YVNlcnZpY2UnLCBhY3Rpdml0eVNlc3Npb25zTGF5b3V0RGF0YUZhY3RvcnkpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0cmlldmVzIGRhdGEgZm9yIGFjdGl2aXR5LXNlc3Npb25zLWxheW91dCBDb250cm9sbGVyXHJcbiAgICAgKiBAcGFyYW0gJHEsXHJcbiAgICAgKiBAcmV0dXJucyB7e2FjdGl2aXR5U2Vzc2lvbnM6IGFjdGl2aXR5U2Vzc2lvbnN9fVxyXG4gICAgICogQG5nSW5qZWN0XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGFjdGl2aXR5U2Vzc2lvbnNMYXlvdXREYXRhRmFjdG9yeSgkcSwgc2NoZWR1bGVTZXJ2aWNlKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGxvYWQ6IGxvYWRcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBsb2FkKGFjdGl2aXR5SWQpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gW1xyXG4gICAgICAgICAgICAgICAgbG9hZEFjdGl2aXR5U2Vzc2lvbnMoYWN0aXZpdHlJZCksXHJcbiAgICAgICAgICAgICAgICBsb2FkQWN0aXZpdHkoYWN0aXZpdHlJZClcclxuICAgICAgICAgICAgXTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAkcS5hbGwoZGF0YSkudGhlbihcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHJlc3VsdHMpIHtcclxuICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZpdHlTZXNzaW9uczogcmVzdWx0c1swXSxcclxuICAgICAgICAgICAgICAgICAgICAgICBhY3Rpdml0eTogcmVzdWx0c1sxXVxyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBEYXRhIExvYWRlcnNcclxuICAgICAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgICAgICAgICAvLyBMb2FkcyBhbGwgZGF0YSBpbnRvIHRoaXMuZGF0YSBhbmQgcmV0dXJucyBhIHByb21pc2VcclxuICAgICAgICAgICAgZnVuY3Rpb24gbG9hZEFjdGl2aXR5U2Vzc2lvbnMoYWN0aXZpdHlJZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNjaGVkdWxlU2VydmljZS5nZXRBY3Rpdml0eVNlc3Npb25zKGFjdGl2aXR5SWQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBsb2FkQWN0aXZpdHkoYWN0aXZpdHlJZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNjaGVkdWxlU2VydmljZS5nZXRBY3Rpdml0eShhY3Rpdml0eUlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEYXRhIFNlcnZpY2Ugb2JqZWN0IHRvIHJldHJpZXZlIGRhdGEgZm9yXHJcbiAgICAgKiBzY2hlZHVsZS1iYXNlLWxheW91dCBDb250cm9sbGVyXHJcbiAgICAgKi9cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdqcC5zY2hlZHVsZS5sYXlvdXRzJylcclxuICAgICAgICAuZmFjdG9yeSgnc2NoZWR1bGVCYXNlTGF5b3V0RGF0YVNlcnZpY2UnLCBzY2hlZHVsZUJhc2VMYXlvdXREYXRhRmFjdG9yeSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZXMgZGF0YSBmb3Igc2NoZWR1bGUtYmFzZS1sYXlvdXQgQ29udHJvbGxlclxyXG4gICAgICogQHJldHVybnMge3tsb2FkOiBsb2FkfX1cclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBzY2hlZHVsZUJhc2VMYXlvdXREYXRhRmFjdG9yeSgkcSwgc2NoZWR1bGVTZXJ2aWNlKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGxvYWQ6IGxvYWRcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBMb2FkcyBhbGwgZGF0YSBpbnRvIHRoaXMuZGF0YSBhbmQgcmV0dXJucyBhIHByb21pc2VcclxuICAgICAgICBmdW5jdGlvbiBsb2FkKCkge1xyXG4gICAgICAgICAgICB2YXIgZHJvcGluQWN0aXZpdGllcyA9IHNjaGVkdWxlU2VydmljZS5nZXREcm9waW5zKCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gJHEuYWxsKFtkcm9waW5BY3Rpdml0aWVzXSkudGhlbihcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHJlc3VsdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9waW5BY3Rpdml0aWVzOiByZXN1bHRzWzBdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnanAuc2NoZWR1bGUud2lkZ2V0cy5hY3Rpdml0aWVzJylcclxuICAgICAgICAuZGlyZWN0aXZlKCdqcFNjaGVkdWxlQWN0aXZpdHlXaXphcmQnLCBqcFNjaGVkdWxlQWN0aXZpdHlXaXphcmQpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGpwU2NoZWR1bGVBY3Rpdml0eVdpemFyZCgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwL2NvbXBvbmVudHMvc2NoZWR1bGUvd2lkZ2V0cy9hY3Rpdml0aWVzL2FjdGl2aXRpZXMudG1wbC5odG1sXCIsXHJcbiAgICAgICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgICAgICBhY3Rpdml0aWVzOiBcIj1cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcclxuICAgIH1cclxuXHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnanAuc2NoZWR1bGUud2lkZ2V0cy5hY3Rpdml0eVNlc3Npb25zJylcclxuICAgICAgICAuZGlyZWN0aXZlKCdqcFNjaGVkdWxlQWN0aXZpdHlTZXNzaW9uc0RheUxpc3QnLCBqcFNjaGVkdWxlQWN0aXZpdHlTZXNzaW9uc0RheUxpc3QpO1xyXG5cclxuICAgIC8qIEBuZ0luZ2plY3QgKi9cclxuICAgIGZ1bmN0aW9uIGpwU2NoZWR1bGVBY3Rpdml0eVNlc3Npb25zRGF5TGlzdChEYXRlVGltZVNlcnZpY2UpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvY29tcG9uZW50cy9zY2hlZHVsZS93aWRnZXRzL2FjdGl2aXR5LXNlc3Npb25zL2FjdGl2aXR5LXNlc3Npb25zLWRheS1saXN0Lmh0bWwnLFxyXG4gICAgICAgICAgICBzY29wZToge1xyXG4gICAgICAgICAgICAgICAgc2Vzc2lvbnM6ICc9JyxcclxuICAgICAgICAgICAgICAgIGRheTogJz0nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSwgZWxlbWVudCwgYXR0cilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2cnKTtcclxuICAgICAgICAgICAgICAgICRzY29wZS50b2RheSA9IERhdGVUaW1lU2VydmljZS5ub3coKS5hZGQoMCwgJ2RheXMnKTtcclxuICAgICAgICAgICAgICAgICRzY29wZS50bSA9IERhdGVUaW1lU2VydmljZS5ub3coKS5hZGQoLTEsICdkYXlzJyk7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUudG1tID0gRGF0ZVRpbWVTZXJ2aWNlLm5vdygpLmFkZCgtMywgJ2RheXMnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XHJcbiAgICB9XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnanAuc2NoZWR1bGUud2lkZ2V0cy5hY3Rpdml0eVNlc3Npb25zJylcclxuICAgICAgICAuZGlyZWN0aXZlKCdqcFNjaGVkdWxlQWN0aXZpdHlTZXNzaW9uc0xpc3QnLCBqcFNjaGVkdWxlQWN0aXZpdHlTZXNzaW9uc0xpc3QpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGpwU2NoZWR1bGVBY3Rpdml0eVNlc3Npb25zTGlzdCgpIHtcclxuICAgICAgICB2YXIgZGlyZWN0aXZlID0ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9jb21wb25lbnRzL3NjaGVkdWxlL3dpZGdldHMvYWN0aXZpdHktc2Vzc2lvbnMvYWN0aXZpdHktc2Vzc2lvbnMtbGlzdC5odG1sJyxcclxuICAgICAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgICAgIHNjaGVkdWxlOiAnPSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24gKCRzY29wZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2YnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XHJcbiAgICB9XHJcblxyXG59KSgpOyIsIi8vIEluY2x1ZGUgaW4gaW5kZXguaHRtbCBzbyB0aGF0IGFwcCBsZXZlbCBleGNlcHRpb25zIGFyZSBoYW5kbGVkLlxyXG4vLyBTaG91bGQgZXhjbHVkZSBmcm9tIHRlc3QgcnVubmVyXHJcbihmdW5jdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgndXRpbGl0aWVzLmV4Y2VwdGlvbicpXHJcbiAgICAgICAgLnByb3ZpZGVyKCdleGNlcHRpb25IYW5kbGVyJywgZXhjZXB0aW9uSGFuZGxlclByb3ZpZGVyKVxyXG4gICAgICAgIC5jb25maWcoY29uZmlnKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE11c3QgY29uZmlndXJlIHRoZSBleGNlcHRpb24gaGFuZGxpbmdcclxuICAgICAqIEByZXR1cm4ge1t0eXBlXX1cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZXhjZXB0aW9uSGFuZGxlclByb3ZpZGVyKCkge1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0ge1xyXG4gICAgICAgICAgICBhcHBFcnJvclByZWZpeDogdW5kZWZpbmVkXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5jb25maWd1cmUgPSBmdW5jdGlvbiAoYXBwRXJyb3JQcmVmaXgpIHtcclxuICAgICAgICAgICAgdGhpcy5jb25maWcuYXBwRXJyb3JQcmVmaXggPSBhcHBFcnJvclByZWZpeDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLiRnZXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtjb25maWc6IHRoaXMuY29uZmlnfTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uZmlndXJlIGJ5IHNldHRpbmcgYW4gb3B0aW9uYWwgc3RyaW5nIHZhbHVlIGZvciBhcHBFcnJvclByZWZpeC5cclxuICAgICAqIEFjY2Vzc2libGUgdmlhIGNvbmZpZy5hcHBFcnJvclByZWZpeCAodmlhIGNvbmZpZyB2YWx1ZSkuXHJcbiAgICAgKiBAcGFyYW0gIHtbdHlwZV19ICRwcm92aWRlXHJcbiAgICAgKiBAcmV0dXJuIHtbdHlwZV19XHJcbiAgICAgKiBAbmdJbmplY3RcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gY29uZmlnKCRwcm92aWRlKSB7XHJcbiAgICAgICAgJHByb3ZpZGUuZGVjb3JhdG9yKCckZXhjZXB0aW9uSGFuZGxlcicsIGV4dGVuZEV4Y2VwdGlvbkhhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRXh0ZW5kIHRoZSAkZXhjZXB0aW9uSGFuZGxlciBzZXJ2aWNlIHRvIGFsc28gZGlzcGxheSBhIHRvYXN0LlxyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSAkZGVsZWdhdGVcclxuICAgICAqIEBwYXJhbSAge09iamVjdH0gZXhjZXB0aW9uSGFuZGxlclxyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBsb2dnZXJTZXJ2aWNlXHJcbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gdGhlIGRlY29yYXRlZCAkZXhjZXB0aW9uSGFuZGxlciBzZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGV4dGVuZEV4Y2VwdGlvbkhhbmRsZXIoJGRlbGVnYXRlLCBleGNlcHRpb25IYW5kbGVyLCBsb2dnZXJTZXJ2aWNlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGV4Y2VwdGlvbiwgY2F1c2UpIHtcclxuICAgICAgICAgICAgdmFyIGFwcEVycm9yUHJlZml4ID0gZXhjZXB0aW9uSGFuZGxlci5jb25maWcuYXBwRXJyb3JQcmVmaXggfHwgJyc7XHJcbiAgICAgICAgICAgIHZhciBlcnJvckRhdGEgPSB7ZXhjZXB0aW9uOiBleGNlcHRpb24sIGNhdXNlOiBjYXVzZX07XHJcbiAgICAgICAgICAgIGV4Y2VwdGlvbi5tZXNzYWdlID0gYXBwRXJyb3JQcmVmaXggKyBleGNlcHRpb24ubWVzc2FnZTtcclxuICAgICAgICAgICAgJGRlbGVnYXRlKGV4Y2VwdGlvbiwgY2F1c2UpO1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQ291bGQgYWRkIHRoZSBlcnJvciB0byBhIHNlcnZpY2UncyBjb2xsZWN0aW9uLFxyXG4gICAgICAgICAgICAgKiBhZGQgZXJyb3JzIHRvICRyb290U2NvcGUsIGxvZyBlcnJvcnMgdG8gcmVtb3RlIHdlYiBzZXJ2ZXIsXHJcbiAgICAgICAgICAgICAqIG9yIGxvZyBsb2NhbGx5LiBPciB0aHJvdyBoYXJkLlxyXG4gICAgICAgICAgICAgKiB0aHJvdyBleGNlcHRpb247XHJcbiAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICAgICAqICAgICB0aHJvdyB7IG1lc3NhZ2U6ICdlcnJvciBtZXNzYWdlIHdlIGFkZGVkJyB9O1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgbG9nZ2VyU2VydmljZS5lcnJvcihleGNlcHRpb24ubWVzc2FnZSwgZXJyb3JEYXRhKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59KSgpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==