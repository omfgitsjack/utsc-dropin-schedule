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
            'utilities.datetime',
            /*
             * 3rd Party modules
             */
            'ui.bootstrap'
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
(function(){
    "use strict";

    angular.module('utilities.api', []);

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
    function routeConfig($stateProvider, $urlRouterProvider, SCHEDULE_ROOT_ROUTE)
    {
        // Default route brings users to activities
        $urlRouterProvider
            .otherwise('/schedule/activities');

        // Define Root Parents
        SCHEDULE_ROOT_ROUTE['parent'] = '';

        $stateProvider
            // Local Routes
            // Feature Routes
            .state(SCHEDULE_ROOT_ROUTE);
    }
    routeConfig.$inject = ["$stateProvider", "$urlRouterProvider", "SCHEDULE_ROOT_ROUTE"];
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
            .state(parent+'.sessions', {
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
            template: "<div class='schedule' ui-view></div>"
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
                // SQL Time matching pattern
                var pattern = /[0-9]{4}-[0-1]{1}[0-9]{1}-[0-3]{1}[0-9]{1} [0-2]{1}[0-9]{1}:[0-5]{1}[0-9]{1}:[0-5]{1}[0-9]{1}/;

                if (pattern.test(obj)) {  // d.valueOf() could also work
                    // date is valid
                    return DateTimeService.parseUTC(obj);
                }
                else {
                    // date is not valid
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
            },
            link: function($scope) {
                console.log('hi');
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