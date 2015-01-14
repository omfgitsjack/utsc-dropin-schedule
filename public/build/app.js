(function () {
    "use strict";

    /**
     * Main Application Module
     */
    angular.module('app.main', [
        'app.routes',
        'app.core',
        'jp.schedule'
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
            'ngTouch',
            /*
             * Our reusable cross app code modules
             */
            'utilities.api',
            'utilities.exception',
            'utilities.logger',
            'utilities.router',
            'utilities.datetime',
            'utilities.googleanalytics',
            /*
             * 3rd Party modules
             */
            'ui.bootstrap' // Accordion and collapse
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

    angular.module('jp.footer', []);

})();
(function () {
    "use strict";

    angular.module('jp.schedule',
        []);

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

    angular.module('utilities.googleanalytics',
        [
            'angulartics',
            'angulartics.google.analytics'
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
        [
            'jp.footer'
        ]);

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
            'jp.schedule.widgets.activityPicker',
            'jp.schedule.widgets.activitySessions'
        ]);

})();
(function(){
    "use strict";

    angular.module('jp.schedule.widgets.activityPicker', [
        'jp.schedule.data'
    ]);

})();
(function () {
    "use strict";

    angular.module('jp.schedule.widgets.activitySessions', []);

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
            templateUrl: "app/components/schedule/layout/schedule/schedule-base-layout.html"
        });
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
     * @param $urlRouterProvider
     * @param $locationProvider
     * @param SCHEDULE_ROOT_ROUTE Note that this is parentless.
     * @ngInject
     */
    function routeConfig($stateProvider, $urlRouterProvider, $locationProvider, SCHEDULE_ROOT_ROUTE)
    {
        // Use hashbang mode for seo purposes
        $locationProvider.hashPrefix('!');

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
    routeConfig.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider", "SCHEDULE_ROOT_ROUTE"];
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

    angular
        .module('utilities.googleanalytics')
        .run(run);

    function run()
    {
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-54553612-1', 'auto');
        ga('require', 'displayfeatures');
    }

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
                templateUrl: "app/components/schedule/layout/activities/activities-layout.html",
                controller: "ActivitiesLayoutCtrl",
                controllerAs: "vm",
                resolve: {
                    activitiesDataService: getActivityData
                }
            })
            .state(parent+'.sessions', {
                url: '/sessions/{activityId}',
                templateUrl: "app/components/schedule/layout/activity-sessions/activity-sessions-layout.html",
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



})();
(function () {
    "use strict";

    angular
        .module('jp.schedule.layouts')
        .controller('ActivitiesLayoutCtrl', ActivitiesLayoutCtrl);

    /* @ngInject */
    function ActivitiesLayoutCtrl(activitiesDataService)
    {
        var vm = this;

        activate();

        function activate() {
            vm.activities = activitiesDataService.dropinActivities;
        }
    }
    ActivitiesLayoutCtrl.$inject = ["activitiesDataService"];

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
     * @param loggerService
     * @constructor
     * @ngInject
     */
    function ActivitySessionLayoutController(activitySessionsData, loggerService)
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

            // Show a toast for them to add to homescreen
            loggerService.info("Save app onto your phone: " +
            "Click Settings > Add to Home Screen", "title");
        }

    }
    ActivitySessionLayoutController.$inject = ["activitySessionsData", "loggerService"];

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
            return moment.tz(utcString, 'America/Detroit');
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

    angular
        .module('jp.footer')
        .directive('jpFooter', jpFooter);

    function jpFooter()
    {
        return {
            restrict: 'E',
            templateUrl: "app/components/footer/footer.html"
        }
    }

})();
(function () {
    "use strict";

    angular
        .module('jp.schedule.widgets.activityPicker')
        .directive('jpScheduleActivityPicker', jpScheduleActivityPicker);

    function jpScheduleActivityPicker()
    {
        var directive = {
            restrict: 'E',
            templateUrl: "app/components/schedule/widgets/activity-picker/activity-picker.html",
            scope: {
                activities: "="
            },
            link: function($scope) {

            }
        };

        return directive;
    }
})();
(function () {
    "use strict";

    angular
        .module('jp.schedule.widgets.activitySessions')
        .directive('jpActivitySession', jpActivitySession);

    function jpActivitySession() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/schedule/widgets/activity-sessions/activity-session/activity-session.html',
            scope: {
                session: '=',
                day: '=',
                firstSession: '=',
                lastSession: '='
            },
            link: function ($scope) {
                $scope.showDetails = false;

                $scope.toggleShowDetails = function() {
                    $scope.showDetails = !$scope.showDetails;
                }
            }
        }
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
            templateUrl: 'app/components/schedule/widgets/activity-sessions/day-list/activity-sessions-day-list.html',
            scope: {
                sessions: '=',
                day: '='
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
            templateUrl: 'app/components/schedule/widgets/activity-sessions/list/activity-sessions-list.html',
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
(function () {
    "use strict";

    angular
        .module('jp.schedule.widgets.activitySessions')
        .directive('jpParticipantCount', jpParticipantCount);

    function jpParticipantCount() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/schedule/widgets/activity-sessions/participant-count/participant-count.html',
            scope: {
                count: '=',
                day: '='
            }
        }
    }

})();
(function () {
    "use strict";

    angular
        .module('jp.schedule.widgets.activitySessions')
        .directive('jpScheduleUnavailable', jpScheduleUnavailable);

    /* @ngInject */
    function jpScheduleUnavailable(DateTimeService)
    {
        return {
            restrict: 'A',
            scope: false, // We're using session.participants.length from parent
            link: function($scope, $element)
            {
                if ($scope.day.isBefore(DateTimeService.now()))
                {
                    $element.addClass('scheduleUnavailable');
                }
            }
        }
    }
    jpScheduleUnavailable.$inject = ["DateTimeService"];

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUuanMiLCJjb3JlL2NvcmUubW9kdWxlLmpzIiwicm91dGVzL2FwcC1yb3V0ZXMubW9kdWxlLmpzIiwiY29tcG9uZW50cy9mb290ZXIvZm9vdGVyLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvc2NoZWR1bGUubW9kdWxlLmpzIiwidXRpbGl0aWVzL2FwaS9hcGkubW9kdWxlLmpzIiwidXRpbGl0aWVzL2RhdGV0aW1lL2RhdGV0aW1lLm1vZHVsZS5qcyIsInV0aWxpdGllcy9leGNlcHRpb24vZXhjZXB0aW9uLm1vZHVsZS5qcyIsInV0aWxpdGllcy9nb29nbGVhbmFseXRpY3MvZ29vZ2xlYW5hbHl0aWNzLm1vZHVsZS5qcyIsInV0aWxpdGllcy9sb2dnZXIvbG9nZ2VyLm1vZHVsZS5qcyIsInV0aWxpdGllcy9yb3V0ZXIvcm91dGVyLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvZGF0YS9zY2hlZHVsZS1kYXRhLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvbGF5b3V0L2xheW91dC5tb2R1bGUuanMiLCJjb21wb25lbnRzL3NjaGVkdWxlL3JvdXRlcy9zY2hlZHVsZS1yb3V0ZXMubW9kdWxlLmpzIiwiY29tcG9uZW50cy9zY2hlZHVsZS93aWRnZXRzL3NjaGVkdWxlLXdpZGdldHMubW9kdWxlLmpzIiwiY29tcG9uZW50cy9zY2hlZHVsZS93aWRnZXRzL2FjdGl2aXR5LXBpY2tlci9hY3Rpdml0eS1waWNrZXIubW9kdWxlLmpzIiwiY29tcG9uZW50cy9zY2hlZHVsZS93aWRnZXRzL2FjdGl2aXR5LXNlc3Npb25zL2FjdGl2aXR5LXNlc3Npb25zLm1vZHVsZS5qcyIsImNvcmUvY29yZS5jb25zdGFudC5qcyIsInV0aWxpdGllcy9hcGkvYXBpLmNvbnN0YW50LmpzIiwidXRpbGl0aWVzL2FwaS9hcGkucm91dGVzLmNvbnN0YW50LmpzIiwidXRpbGl0aWVzL2RhdGV0aW1lL2RhdGV0aW1lLmNvbnN0YW50LmpzIiwidXRpbGl0aWVzL2xvZ2dlci9sb2dnZXIuY29uc3RhbnQuanMiLCJjb21wb25lbnRzL3NjaGVkdWxlL3JvdXRlcy9zY2hlZHVsZS1yb290LXJvdXRlLmNvbnN0YW50LmpzIiwiY29yZS9jb3JlLmNvbmZpZy5qcyIsInJvdXRlcy9hcHAtcm91dGVzLmNvbmZpZy5qcyIsInV0aWxpdGllcy9kYXRldGltZS9kYXRldGltZS5jb25maWcuanMiLCJ1dGlsaXRpZXMvZ29vZ2xlYW5hbHl0aWNzL2dvb2dsZWFuYWx5dGljcy5jb25maWcuanMiLCJjb21wb25lbnRzL3NjaGVkdWxlL3JvdXRlcy9zY2hlZHVsZS1yb3V0ZXMuY29uZmlnLmpzIiwibGF5b3V0L3NoZWxsLmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL3NjaGVkdWxlL2xheW91dC9hY3Rpdml0aWVzL2FjdGl2aXRpZXMtbGF5b3V0LmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL3NjaGVkdWxlL2xheW91dC9hY3Rpdml0eS1zZXNzaW9ucy9hY3Rpdml0eS1zZXNzaW9ucy1sYXlvdXQuY29udHJvbGxlci5qcyIsInV0aWxpdGllcy9hcGkvYXBpLXRyYW5zZm9ybWVyLmZhY3RvcnkuanMiLCJ1dGlsaXRpZXMvYXBpL2FwaS5mYWN0b3J5LmpzIiwidXRpbGl0aWVzL2RhdGV0aW1lL2RhdGV0aW1lLmZhY3RvcnkuanMiLCJ1dGlsaXRpZXMvZXhjZXB0aW9uL2V4Y2VwdGlvbi5mYWN0b3J5LmpzIiwidXRpbGl0aWVzL2xvZ2dlci9sb2dnZXIuZmFjdG9yeS5qcyIsInV0aWxpdGllcy9yb3V0ZXIvcm91dGVyLmZhY3RvcnkuanMiLCJjb21wb25lbnRzL3NjaGVkdWxlL2RhdGEvc2NoZWR1bGUtZGF0YS5mYWN0b3J5LmpzIiwiY29tcG9uZW50cy9zY2hlZHVsZS9sYXlvdXQvYWN0aXZpdGllcy9hY3Rpdml0aWVzLWxheW91dC5kYXRhLmZhY3RvcnkuanMiLCJjb21wb25lbnRzL3NjaGVkdWxlL2xheW91dC9hY3Rpdml0eS1zZXNzaW9ucy9hY3Rpdml0eS1zZXNzaW9ucy1sYXlvdXQuZGF0YS5mYWN0b3J5LmpzIiwiY29tcG9uZW50cy9mb290ZXIvZm9vdGVyLmRpcmVjdGl2ZS5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvd2lkZ2V0cy9hY3Rpdml0eS1waWNrZXIvYWN0aXZpdHktcGlja2VyLmRpcmVjdGl2ZS5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvd2lkZ2V0cy9hY3Rpdml0eS1zZXNzaW9ucy9hY3Rpdml0eS1zZXNzaW9uL2FjdGl2aXR5LXNlc3Npb24uZGlyZWN0aXZlLmpzIiwiY29tcG9uZW50cy9zY2hlZHVsZS93aWRnZXRzL2FjdGl2aXR5LXNlc3Npb25zL2RheS1saXN0L2FjdGl2aXR5LXNlc3Npb25zLWRheS1saXN0LmRpcmVjdGl2ZS5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvd2lkZ2V0cy9hY3Rpdml0eS1zZXNzaW9ucy9saXN0L2FjdGl2aXR5LXNlc3Npb25zLWxpc3QuZGlyZWN0aXZlLmpzIiwiY29tcG9uZW50cy9zY2hlZHVsZS93aWRnZXRzL2FjdGl2aXR5LXNlc3Npb25zL3BhcnRpY2lwYW50LWNvdW50L3BhcnRpY2lwYW50LWNvdW50LmRpcmVjdGl2ZS5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvd2lkZ2V0cy9hY3Rpdml0eS1zZXNzaW9ucy9zY2hlZHVsZS11bmF2YWlsYWJsZS9zY2hlZHVsZS11bmF2YWlsYWJsZS5kaXJlY3RpdmUuanMiLCJ1dGlsaXRpZXMvZXhjZXB0aW9uL2V4Y2VwdGlvbi1oYW5kbGVyLnByb3ZpZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLENBQUEsWUFBQTtJQUNBOzs7OztJQUtBLFFBQUEsT0FBQSxZQUFBO1FBQ0E7UUFDQTtRQUNBOzs7O0FDVEEsQ0FBQSxZQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBO1FBQ0E7Ozs7WUFJQTtZQUNBOzs7O1lBSUE7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBOzs7O1lBSUE7Ozs7O0FDdEJBLENBQUEsWUFBQTtJQUNBOzs7OztJQUtBLFFBQUEsT0FBQSxjQUFBO1FBQ0E7UUFDQTs7OztBQ1JBLENBQUEsWUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxhQUFBOzs7QUNIQSxDQUFBLFlBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUE7UUFDQTs7O0FDSkEsQ0FBQSxVQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLGlCQUFBOzs7O0FDSEEsQ0FBQSxZQUFBO0lBQ0E7Ozs7Ozs7O0lBUUEsUUFBQSxPQUFBO1FBQ0E7WUFDQTs7OztBQ1hBLENBQUEsWUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQTtRQUNBO1lBQ0E7Ozs7QUNMQSxDQUFBLFlBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUE7UUFDQTtZQUNBO1lBQ0E7Ozs7QUNOQSxDQUFBLFlBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUE7UUFDQTs7O0FDSkEsQ0FBQSxZQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBO1FBQ0E7WUFDQTs7Ozs7OztBQ0ZBLENBQUEsVUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxvQkFBQTtRQUNBOzs7O0FDUEEsQ0FBQSxZQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBO1FBQ0E7WUFDQTs7OztBQ0xBLENBQUEsWUFBQTtJQUNBOzs7OztJQUtBLFFBQUEsT0FBQSxzQkFBQTtRQUNBO1FBQ0E7UUFDQTs7OztBQ1RBLENBQUEsWUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQTtRQUNBO1lBQ0E7WUFDQTs7OztBQ05BLENBQUEsVUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxzQ0FBQTtRQUNBOzs7O0FDSkEsQ0FBQSxZQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLHdDQUFBOzs7QUNIQSxDQUFBLFlBQUE7SUFDQTs7SUFFQTtTQUNBLE9BQUE7O1NBRUEsU0FBQSxLQUFBOzs7QUNOQSxDQUFBLFlBQUE7SUFDQTs7Ozs7SUFLQSxRQUFBLE9BQUE7U0FDQSxTQUFBO1FBQ0E7WUFDQSxZQUFBOzs7O0FDVEEsQ0FBQSxXQUFBO0lBQ0E7Ozs7O0lBS0EsUUFBQSxPQUFBO1NBQ0EsU0FBQTtRQUNBO1lBQ0Es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Ozs7Ozs7OztJQVVBLFNBQUEsdUJBQUEsV0FBQSxrQkFBQSxlQUFBO1FBQ0EsT0FBQSxTQUFBLFdBQUEsT0FBQTtZQUNBLElBQUEsaUJBQUEsaUJBQUEsT0FBQSxrQkFBQTtZQUNBLElBQUEsWUFBQSxDQUFBLFdBQUEsV0FBQSxPQUFBO1lBQ0EsVUFBQSxVQUFBLGlCQUFBLFVBQUE7WUFDQSxVQUFBLFdBQUE7Ozs7Ozs7Ozs7WUFVQSxjQUFBLE1BQUEsVUFBQSxTQUFBOzs7O0tBR0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFpbiBBcHBsaWNhdGlvbiBNb2R1bGVcclxuICAgICAqL1xyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5tYWluJywgW1xyXG4gICAgICAgICdhcHAucm91dGVzJyxcclxuICAgICAgICAnYXBwLmNvcmUnLFxyXG4gICAgICAgICdqcC5zY2hlZHVsZSdcclxuICAgIF0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb3JlJyxcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAqIEFuZ3VsYXIgbW9kdWxlc1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgJ25nTWF0ZXJpYWwnLFxyXG4gICAgICAgICAgICAnbmdUb3VjaCcsXHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAqIE91ciByZXVzYWJsZSBjcm9zcyBhcHAgY29kZSBtb2R1bGVzXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAndXRpbGl0aWVzLmFwaScsXHJcbiAgICAgICAgICAgICd1dGlsaXRpZXMuZXhjZXB0aW9uJyxcclxuICAgICAgICAgICAgJ3V0aWxpdGllcy5sb2dnZXInLFxyXG4gICAgICAgICAgICAndXRpbGl0aWVzLnJvdXRlcicsXHJcbiAgICAgICAgICAgICd1dGlsaXRpZXMuZGF0ZXRpbWUnLFxyXG4gICAgICAgICAgICAndXRpbGl0aWVzLmdvb2dsZWFuYWx5dGljcycsXHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAqIDNyZCBQYXJ0eSBtb2R1bGVzXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAndWkuYm9vdHN0cmFwJyAvLyBBY2NvcmRpb24gYW5kIGNvbGxhcHNlXHJcbiAgICAgICAgXSk7XHJcblxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBcHBsaWNhdGlvbiByb3V0ZXNcclxuICAgICAqL1xyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5yb3V0ZXMnLCBbXHJcbiAgICAgICAgJ2pwLnNjaGVkdWxlLnJvdXRlcycsXHJcbiAgICAgICAgJ3V0aWxpdGllcy5yb3V0ZXInXHJcbiAgICBdKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdqcC5mb290ZXInLCBbXSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnanAuc2NoZWR1bGUnLFxyXG4gICAgICAgIFtdKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgndXRpbGl0aWVzLmFwaScsIFtdKTtcclxuXHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFByb3ZpZGVzIGEgRGF0ZVRpbWVTZXJ2aWNlIHV0aWxpdHkgY2xhc3MgdGhhdCBwcm92aWRlcyBhbiBpbnRlcmZhY2UgdG9cclxuICAgICAqIG1vbWVudCBvYmplY3RzLCB1dGlsaXRpZXMgZm9yIHdvcmtpbmcgd2l0aCBNeVNRTCBVVEMgdGltZXMgZXRjLlxyXG4gICAgICpcclxuICAgICAqIFJlZmVyIHRvIGRhdGV0aW1lLmZhY3RvcnkuanMgZm9yIGRvY3VtZW50YXRpb24gJiBhdmFpbGFibGUgdG9vbHNcclxuICAgICAqL1xyXG4gICAgYW5ndWxhci5tb2R1bGUoJ3V0aWxpdGllcy5kYXRldGltZScsXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICAnYW5ndWxhck1vbWVudCdcclxuICAgICAgICBdKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCd1dGlsaXRpZXMuZXhjZXB0aW9uJyxcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgICd1dGlsaXRpZXMubG9nZ2VyJ1xyXG4gICAgICAgIF0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ3V0aWxpdGllcy5nb29nbGVhbmFseXRpY3MnLFxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgJ2FuZ3VsYXJ0aWNzJyxcclxuICAgICAgICAgICAgJ2FuZ3VsYXJ0aWNzLmdvb2dsZS5hbmFseXRpY3MnXHJcbiAgICAgICAgXSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgndXRpbGl0aWVzLmxvZ2dlcicsXHJcbiAgICAgICAgW10pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ3V0aWxpdGllcy5yb3V0ZXInLFxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgJ3VpLnJvdXRlcidcclxuICAgICAgICBdKTtcclxuXHJcbn0pKCk7IiwiLyoqXHJcbiAqXHJcbiAqL1xyXG4oZnVuY3Rpb24oKXtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdqcC5zY2hlZHVsZS5kYXRhJywgW1xyXG4gICAgICAgICdhcHAuY29yZSdcclxuICAgIF0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2pwLnNjaGVkdWxlLmxheW91dHMnLFxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgJ2pwLmZvb3RlcidcclxuICAgICAgICBdKTtcclxuXHJcbn0pKCk7ICIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNjaGVkdWxlIFJvdXRpbmcgbW9kdWxlXHJcbiAgICAgKi9cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdqcC5zY2hlZHVsZS5yb3V0ZXMnLCBbXHJcbiAgICAgICAgJ3VpLnJvdXRlcicsXHJcbiAgICAgICAgJ2pwLnNjaGVkdWxlLndpZGdldHMnLFxyXG4gICAgICAgICdqcC5zY2hlZHVsZS5sYXlvdXRzJ1xyXG4gICAgXSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnanAuc2NoZWR1bGUud2lkZ2V0cycsXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICAnanAuc2NoZWR1bGUud2lkZ2V0cy5hY3Rpdml0eVBpY2tlcicsXHJcbiAgICAgICAgICAgICdqcC5zY2hlZHVsZS53aWRnZXRzLmFjdGl2aXR5U2Vzc2lvbnMnXHJcbiAgICAgICAgXSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpe1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2pwLnNjaGVkdWxlLndpZGdldHMuYWN0aXZpdHlQaWNrZXInLCBbXHJcbiAgICAgICAgJ2pwLnNjaGVkdWxlLmRhdGEnXHJcbiAgICBdKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdqcC5zY2hlZHVsZS53aWRnZXRzLmFjdGl2aXR5U2Vzc2lvbnMnLCBbXSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwLmNvcmUnKVxyXG4gICAgICAgIC8vIExvZGFzaCBEZWZpbml0aW9uXHJcbiAgICAgICAgLmNvbnN0YW50KCdfJywgXyk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFQSSAobm9uLXJvdXRlKSBjb25zdGFudHNcclxuICAgICAqL1xyXG4gICAgYW5ndWxhci5tb2R1bGUoXCJ1dGlsaXRpZXMuYXBpXCIpXHJcbiAgICAgICAgLmNvbnN0YW50KCdBUElfQ09ORklHJyxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEJBU0VfUk9VVEU6ICdhcGknXHJcbiAgICAgICAgfSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQVBJIFJlc291cmNlcyBjb25zdGFudHNcclxuICAgICAqL1xyXG4gICAgYW5ndWxhci5tb2R1bGUoXCJ1dGlsaXRpZXMuYXBpXCIpXHJcbiAgICAgICAgLmNvbnN0YW50KCdBUElfUk9VVEVTX0NPTkZJRycsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEUk9QSU5TOiAnZHJvcGlucycsXHJcbiAgICAgICAgICAgIEFDVElWSVRJRVM6ICdhY3Rpdml0aWVzJ1xyXG4gICAgICAgIH0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXcmFwIG1vbWVudCBhcyBhbiBhbmd1bGFyIGRlcGVuZGVuY3lcclxuICAgICAqIHdoaWxzdCBzZXR0aW5nIHRoZSBkZWZhdWx0IHRpbWV6b25lIGZvciBhbmd1bGFyXHJcbiAgICAgKiBtb21lbnRcclxuICAgICAqL1xyXG4gICAgYW5ndWxhci5tb2R1bGUoXCJ1dGlsaXRpZXMuZGF0ZXRpbWVcIilcclxuICAgICAgICAuY29uc3RhbnQoJ21vbWVudCcsIG1vbWVudClcclxuICAgICAgICAuY29uc3RhbnQoJ2FuZ3VsYXJNb21lbnRDb25maWcnLCB7XHJcbiAgICAgICAgICAgIHRpbWV6b25lOiAnQW1lcmljYS9EZXRyb2l0J1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNvbnN0YW50KCdVVENfVElNRUZPUk1BVCcsIFwiWVlZWS1NTS1ERCBISDpNTTpTU1wiKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKFwidXRpbGl0aWVzLmxvZ2dlclwiKVxyXG4gICAgICAgIC5jb25zdGFudCgndG9hc3RyJywgdG9hc3RyKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2NoZWR1bGUncyBhYnN0cmFjdCByb290IHJvdXRlXHJcbiAgICAgKi9cclxuICAgIGFuZ3VsYXIubW9kdWxlKFwianAuc2NoZWR1bGUucm91dGVzXCIpXHJcbiAgICAgICAgLmNvbnN0YW50KCdTQ0hFRFVMRV9ST09UX1JPVVRFJyxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGFic3RyYWN0OiB0cnVlLFxyXG4gICAgICAgICAgICBuYW1lOiAnc2NoZWR1bGUnLFxyXG4gICAgICAgICAgICB1cmw6ICcvc2NoZWR1bGUnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJhcHAvY29tcG9uZW50cy9zY2hlZHVsZS9sYXlvdXQvc2NoZWR1bGUvc2NoZWR1bGUtYmFzZS1sYXlvdXQuaHRtbFwiXHJcbiAgICAgICAgfSk7XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29yZSBtb2R1bGUgY29uZmlndXJhdGlvblxyXG4gICAgICovXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwLmNvcmUnKVxyXG4gICAgICAgIC5jb25maWcodG9hc3RyQ29uZmlnKVxyXG4gICAgICAgIC5jb25maWcobG9nUHJvdmlkZXJDb25maWcpXHJcbiAgICAgICAgLmNvbmZpZyhleGNlcHRpb25IYW5kbGVyUHJvdmlkZXJDb25maWcpXHJcbiAgICAgICAgLnJ1bihpbml0Q29yZUNvbXBvbmVudHMpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVG9hc3RyIENvbmZpZ3VyYXRpb25cclxuICAgICAqIEBwYXJhbSB0b2FzdHJcclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiB0b2FzdHJDb25maWcodG9hc3RyKSB7XHJcbiAgICAgICAgdG9hc3RyLm9wdGlvbnMudGltZU91dCA9IDQwMDA7XHJcbiAgICAgICAgdG9hc3RyLm9wdGlvbnMucG9zaXRpb25DbGFzcyA9ICd0b2FzdC1ib3R0b20tcmlnaHQnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9nIFByb3ZpZGVyIENvbmZpZ3VyYXRpb25cclxuICAgICAqIEBwYXJhbSAkbG9nUHJvdmlkZXJcclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBsb2dQcm92aWRlckNvbmZpZygkbG9nUHJvdmlkZXIpIHtcclxuICAgICAgICBpZiAoJGxvZ1Byb3ZpZGVyLmRlYnVnRW5hYmxlZCkge1xyXG4gICAgICAgICAgICAkbG9nUHJvdmlkZXIuZGVidWdFbmFibGVkKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEV4Y2VwdGlvbiBIYW5kbGVyIFByb3ZpZGVyIGNvbmZpZ3VyYXRpb25cclxuICAgICAqIEBwYXJhbSBleGNlcHRpb25IYW5kbGVyUHJvdmlkZXJcclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBleGNlcHRpb25IYW5kbGVyUHJvdmlkZXJDb25maWcoZXhjZXB0aW9uSGFuZGxlclByb3ZpZGVyKSB7XHJcbiAgICAgICAgZXhjZXB0aW9uSGFuZGxlclByb3ZpZGVyLmNvbmZpZ3VyZSgnW05HLUpQIEVycm9yXSAnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWx6aWUgY29yZSBjb21wb25lbnRzXHJcbiAgICAgKiBAcGFyYW0gcm91dGVyU2VydmljZVxyXG4gICAgICogQG5nSW5qZWN0XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGluaXRDb3JlQ29tcG9uZW50cyhyb3V0ZXJTZXJ2aWNlKSB7XHJcblxyXG4gICAgfVxyXG5cclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXBwIHJvdXRlIGNvbmZpZ3VyYXRpb25cclxuICAgICAqL1xyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcC5yb3V0ZXMnKVxyXG4gICAgICAgIC5jb25maWcocm91dGVDb25maWcpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVUktUm91dGVyIHN0YXRlIGNvbmZpZ3VyYXRpb24uXHJcbiAgICAgKiBGZWF0dXJlIHJvb3QgKGFic3RyYWN0KSByb3V0ZXMgYXJlIGFsc28gaW5jbHVkZWQuXHJcbiAgICAgKiBAcGFyYW0gJHN0YXRlUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSAkdXJsUm91dGVyUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSAkbG9jYXRpb25Qcm92aWRlclxyXG4gICAgICogQHBhcmFtIFNDSEVEVUxFX1JPT1RfUk9VVEUgTm90ZSB0aGF0IHRoaXMgaXMgcGFyZW50bGVzcy5cclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiByb3V0ZUNvbmZpZygkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlciwgU0NIRURVTEVfUk9PVF9ST1VURSlcclxuICAgIHtcclxuICAgICAgICAvLyBVc2UgaGFzaGJhbmcgbW9kZSBmb3Igc2VvIHB1cnBvc2VzXHJcbiAgICAgICAgJGxvY2F0aW9uUHJvdmlkZXIuaGFzaFByZWZpeCgnIScpO1xyXG5cclxuICAgICAgICAvLyBEZWZhdWx0IHJvdXRlIGJyaW5ncyB1c2VycyB0byBhY3Rpdml0aWVzXHJcbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyXHJcbiAgICAgICAgICAgIC5vdGhlcndpc2UoJy9zY2hlZHVsZS9hY3Rpdml0aWVzJyk7XHJcblxyXG4gICAgICAgIC8vIERlZmluZSBSb290IFBhcmVudHNcclxuICAgICAgICBTQ0hFRFVMRV9ST09UX1JPVVRFWydwYXJlbnQnXSA9ICcnO1xyXG5cclxuICAgICAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgICAgICAgICAvLyBMb2NhbCBSb3V0ZXNcclxuICAgICAgICAgICAgLy8gRmVhdHVyZSBSb3V0ZXNcclxuICAgICAgICAgICAgLnN0YXRlKFNDSEVEVUxFX1JPT1RfUk9VVEUpO1xyXG4gICAgfVxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgndXRpbGl0aWVzLmRhdGV0aW1lJylcclxuICAgICAgICAuY29uZmlnKGRhdGV0aW1lQ29uZmlnKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbmZpZ3VyZSBkYXRlIHRpbWUgY29uZmlndXJhdGlvbiwgQW1lcmljYS9EZXRyb2l0IGhhcyBzYW1lIHRpbWV6b25lIGFzIHRvcm9udG9cclxuICAgICAqIEBwYXJhbSBtb21lbnRcclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBkYXRldGltZUNvbmZpZyhtb21lbnQpXHJcbiAgICB7XHJcbiAgICAgICAgLy8gTWFrZSBzdXJlIG1vbWVudCBpcyBpbiBlbmdsaXNoIGFuZCB0aGUgZmlyc3QgZGF5IG9mIHdlZWsgaXMgYSBtb25kYXlcclxuICAgICAgICBtb21lbnQubGFuZygnZW4nLCB7XHJcbiAgICAgICAgICAgIC8vIGN1c3RvbWl6YXRpb25zLlxyXG4gICAgICAgICAgICB3ZWVrOiB7XHJcbiAgICAgICAgICAgICAgICBkb3c6IDFcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2FsZW5kYXI6IHtcclxuICAgICAgICAgICAgICAgIGxhc3REYXk6ICdbWWVzdGVyZGF5XSwgZGRkZCBNTU0gRCcsXHJcbiAgICAgICAgICAgICAgICBzYW1lRGF5IDogJ1tUb2RheV0sIGRkZGQgTU1NIEQnLFxyXG4gICAgICAgICAgICAgICAgbmV4dERheSA6ICdbVG9tb3Jyb3ddLCBkZGRkIE1NTSBEJyxcclxuICAgICAgICAgICAgICAgIGxhc3RXZWVrIDogJ2RkZGQsIE1NTSBEJyxcclxuICAgICAgICAgICAgICAgIG5leHRXZWVrIDogJ2RkZGQsIE1NTSBEJyxcclxuICAgICAgICAgICAgICAgIHNhbWVFbHNlIDogJ2RkZGQsIE1NTSBEJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBBbWVyaWNhL0RldHJvaXQgdGltZXpvbmUsIG5vdGUgdGhhdCB0aGlzIGlzIHRoZSBzYW1lIGFzIFRvcm9udG9cclxuICAgICAgICBtb21lbnQudHouYWRkKFxyXG4gICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAnQW1lcmljYS9EZXRyb2l0fEVTVCBFRFR8NTAgNDB8MDEwMTAxMDEwMTAxMDEwMTAxMDEwMTB8MUJRVDAgMXpiMCBPcDAgMXpiMCBPcDAgMXpiMCBPcDAgMXpiMCBPcDAgMXpiMCBPcDAgMXpiMCBSZDAgMXpiMCBPcDAgMXpiMCBPcDAgMXpiMCBPcDAgMXpiMCBPcDAgMXpiMCcsXHJcbiAgICAgICAgICAgICAgICBcIkV0Yy9VVEN8VVRDfDB8MHxcIlxyXG4gICAgICAgICAgICBdKTtcclxuICAgIH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCd1dGlsaXRpZXMuZ29vZ2xlYW5hbHl0aWNzJylcclxuICAgICAgICAucnVuKHJ1bik7XHJcblxyXG4gICAgZnVuY3Rpb24gcnVuKClcclxuICAgIHtcclxuICAgICAgICAoZnVuY3Rpb24oaSxzLG8sZyxyLGEsbSl7aVsnR29vZ2xlQW5hbHl0aWNzT2JqZWN0J109cjtpW3JdPWlbcl18fGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIChpW3JdLnE9aVtyXS5xfHxbXSkucHVzaChhcmd1bWVudHMpfSxpW3JdLmw9MSpuZXcgRGF0ZSgpO2E9cy5jcmVhdGVFbGVtZW50KG8pLFxyXG4gICAgICAgICAgICBtPXMuZ2V0RWxlbWVudHNCeVRhZ05hbWUobylbMF07YS5hc3luYz0xO2Euc3JjPWc7bS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShhLG0pXHJcbiAgICAgICAgfSkod2luZG93LGRvY3VtZW50LCdzY3JpcHQnLCcvL3d3dy5nb29nbGUtYW5hbHl0aWNzLmNvbS9hbmFseXRpY3MuanMnLCdnYScpO1xyXG5cclxuICAgICAgICBnYSgnY3JlYXRlJywgJ1VBLTU0NTUzNjEyLTEnLCAnYXV0bycpO1xyXG4gICAgICAgIGdhKCdyZXF1aXJlJywgJ2Rpc3BsYXlmZWF0dXJlcycpO1xyXG4gICAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTY2hlZHVsZSByb3V0ZSBjb25maWd1cmF0aW9uXHJcbiAgICAgKi9cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdqcC5zY2hlZHVsZS5yb3V0ZXMnKVxyXG4gICAgICAgIC5jb25maWcoc2NoZWR1bGVSb3V0ZUNvbmZpZyk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSb3V0ZSBjb25maWd1cmF0aW9uLFxyXG4gICAgICogdXNlcyBTQ0hFRFVMRV9ST09UX1JPVVRFIGFzIGFic3RyYWN0IHBhcmVudCBzdGF0ZVxyXG4gICAgICogQHBhcmFtICRzdGF0ZVByb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0gU0NIRURVTEVfUk9PVF9ST1VURVxyXG4gICAgICogQG5nSW5qZWN0XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHNjaGVkdWxlUm91dGVDb25maWcoJHN0YXRlUHJvdmlkZXIsIFNDSEVEVUxFX1JPT1RfUk9VVEUpXHJcbiAgICB7XHJcbiAgICAgICAgLy8gUGFyZW50IFN0YXRlJ3MgbmFtZSB0byBiZSBpbmNsdWRlZCBpbiBldmVyeSBzdGF0ZVxyXG4gICAgICAgIHZhciBwYXJlbnQgPSBTQ0hFRFVMRV9ST09UX1JPVVRFLm5hbWU7XHJcblxyXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAgIC8vIExvY2FsIHJvdXRlc1xyXG4gICAgICAgICAgICAuc3RhdGUocGFyZW50KycuYWN0aXZpdGllcycsIHtcclxuICAgICAgICAgICAgICAgIHVybDogJy9hY3Rpdml0aWVzJyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcImFwcC9jb21wb25lbnRzL3NjaGVkdWxlL2xheW91dC9hY3Rpdml0aWVzL2FjdGl2aXRpZXMtbGF5b3V0Lmh0bWxcIixcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6IFwiQWN0aXZpdGllc0xheW91dEN0cmxcIixcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXJBczogXCJ2bVwiLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2aXRpZXNEYXRhU2VydmljZTogZ2V0QWN0aXZpdHlEYXRhXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGF0ZShwYXJlbnQrJy5zZXNzaW9ucycsIHtcclxuICAgICAgICAgICAgICAgIHVybDogJy9zZXNzaW9ucy97YWN0aXZpdHlJZH0nLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwL2NvbXBvbmVudHMvc2NoZWR1bGUvbGF5b3V0L2FjdGl2aXR5LXNlc3Npb25zL2FjdGl2aXR5LXNlc3Npb25zLWxheW91dC5odG1sXCIsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiBcIkFjdGl2aXR5U2Vzc2lvbkxheW91dENvbnRyb2xsZXJcIixcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXJBczogXCJ2bVwiLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5U2Vzc2lvbnNEYXRhOiBnZXRBY3Rpdml0eVNlc3Npb25zRGF0YVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gUm91dGUgUmVzb2x2ZXNcclxuXHJcbiAgICAgICAgLyogQG5nSW5qZWN0ICovXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0QWN0aXZpdHlEYXRhKHNjaGVkdWxlQmFzZUxheW91dERhdGFTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzY2hlZHVsZUJhc2VMYXlvdXREYXRhU2VydmljZS5sb2FkKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiBAbmdJbmplY3QgKi9cclxuICAgICAgICBmdW5jdGlvbiBnZXRBY3Rpdml0eVNlc3Npb25zRGF0YShhY3Rpdml0eVNlc3Npb25zTGF5b3V0RGF0YVNlcnZpY2UsICRzdGF0ZVBhcmFtcykge1xyXG4gICAgICAgICAgICByZXR1cm4gYWN0aXZpdHlTZXNzaW9uc0xheW91dERhdGFTZXJ2aWNlLmxvYWQoJHN0YXRlUGFyYW1zWydhY3Rpdml0eUlkJ10pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdqcC5zY2hlZHVsZS5sYXlvdXRzJylcclxuICAgICAgICAuY29udHJvbGxlcignQWN0aXZpdGllc0xheW91dEN0cmwnLCBBY3Rpdml0aWVzTGF5b3V0Q3RybCk7XHJcblxyXG4gICAgLyogQG5nSW5qZWN0ICovXHJcbiAgICBmdW5jdGlvbiBBY3Rpdml0aWVzTGF5b3V0Q3RybChhY3Rpdml0aWVzRGF0YVNlcnZpY2UpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHZtID0gdGhpcztcclxuXHJcbiAgICAgICAgYWN0aXZhdGUoKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWN0aXZhdGUoKSB7XHJcbiAgICAgICAgICAgIHZtLmFjdGl2aXRpZXMgPSBhY3Rpdml0aWVzRGF0YVNlcnZpY2UuZHJvcGluQWN0aXZpdGllcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnanAuc2NoZWR1bGUubGF5b3V0cycpXHJcbiAgICAgICAgLmNvbnRyb2xsZXIoJ0FjdGl2aXR5U2Vzc2lvbkxheW91dENvbnRyb2xsZXInLCBBY3Rpdml0eVNlc3Npb25MYXlvdXRDb250cm9sbGVyKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1lZGlhdGVzIGRhdGEgdG8gdW5kZXJseWluZyBsYXlvdXQsIGFjdGl2aXR5U2Vzc2lvbnNEYXRhIGNvbnRhaW5zOlxyXG4gICAgICoge1xyXG4gICAgICogICAgICBhY3Rpdml0eTogJ3N0cmluZycsXHJcbiAgICAgKiAgICAgIGFjdGl2aXR5U2Vzc2lvbjogWyB7IGRhdGU6IG1vbWVudCwgc2Vzc2lvbnM6IFsgc2Vzc2lvbiwgc2Vzc2lvbiBdIF1cclxuICAgICAqIH1cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gYWN0aXZpdHlTZXNzaW9uc0RhdGFcclxuICAgICAqIEBwYXJhbSBsb2dnZXJTZXJ2aWNlXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBBY3Rpdml0eVNlc3Npb25MYXlvdXRDb250cm9sbGVyKGFjdGl2aXR5U2Vzc2lvbnNEYXRhLCBsb2dnZXJTZXJ2aWNlKVxyXG4gICAge1xyXG5cclxuICAgICAgICB2YXIgdm0gPSB0aGlzO1xyXG5cclxuICAgICAgICBhY3RpdmF0ZSgpO1xyXG5cclxuICAgICAgICAvL1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBhY3RpdmF0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2bS5hY3Rpdml0eVNlc3Npb25zID0gYWN0aXZpdHlTZXNzaW9uc0RhdGEuYWN0aXZpdHlTZXNzaW9ucztcclxuICAgICAgICAgICAgdm0uYWN0aXZpdHlMYWJlbCA9IGFjdGl2aXR5U2Vzc2lvbnNEYXRhLmFjdGl2aXR5LmFjdGl2aXR5O1xyXG4gICAgICAgICAgICB2bS5hY3Rpdml0eUNhdGVnb3J5ID0gYWN0aXZpdHlTZXNzaW9uc0RhdGEuYWN0aXZpdHkuY2F0ZWdvcnk7XHJcbiAgICAgICAgICAgIHZtLmFjdGl2aXR5SXNXb21lbk9ubHkgPSBhY3Rpdml0eVNlc3Npb25zRGF0YS5hY3Rpdml0eS53b21lbl9vbmx5O1xyXG5cclxuICAgICAgICAgICAgLy8gU2hvdyBhIHRvYXN0IGZvciB0aGVtIHRvIGFkZCB0byBob21lc2NyZWVuXHJcbiAgICAgICAgICAgIGxvZ2dlclNlcnZpY2UuaW5mbyhcIlNhdmUgYXBwIG9udG8geW91ciBwaG9uZTogXCIgK1xyXG4gICAgICAgICAgICBcIkNsaWNrIFNldHRpbmdzID4gQWRkIHRvIEhvbWUgU2NyZWVuXCIsIFwidGl0bGVcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCd1dGlsaXRpZXMuYXBpJylcclxuICAgICAgICAuZmFjdG9yeSgnYXBpVHJhbnNmb3JtZXJTZXJ2aWNlJywgYXBpVHJhbnNmb3JtZXJTZXJ2aWNlKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFV0aWxpdHkgZnVuY3Rpb25zIHRvIHRyYW5zZm9ybSBBUEkgY2FsbHNcclxuICAgICAqIEByZXR1cm5zIHt7cHJvcDogcHJvcH19XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGFwaVRyYW5zZm9ybWVyU2VydmljZShEYXRlVGltZVNlcnZpY2UsIFVUQ19USU1FRk9STUFUKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBzZXJ2aWNlID0ge1xyXG4gICAgICAgICAgICByZXBsYWNlRGF0ZVRpbWU6IHJlcGxhY2VEYXRlVGltZVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXBsYWNlcyBhbGwgTXlTUUwgRGF0ZVRpbWUgc3RyaW5ncyBpbiBhIEpTT04gb2JqZWN0L2FycmF5XHJcbiAgICAgICAgICogQHBhcmFtIG9ialxyXG4gICAgICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHJlcGxhY2VEYXRlVGltZShvYmopIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmogPT09IFwic3RyaW5nXCIgfHwgb2JqIGluc3RhbmNlb2YgU3RyaW5nKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBTUUwgVGltZSBtYXRjaGluZyBwYXR0ZXJuXHJcbiAgICAgICAgICAgICAgICB2YXIgcGF0dGVybiA9IC9bMC05XXs0fS1bMC0xXXsxfVswLTldezF9LVswLTNdezF9WzAtOV17MX0gWzAtMl17MX1bMC05XXsxfTpbMC01XXsxfVswLTldezF9OlswLTVdezF9WzAtOV17MX0vO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChwYXR0ZXJuLnRlc3Qob2JqKSkgeyAgLy8gZC52YWx1ZU9mKCkgY291bGQgYWxzbyB3b3JrXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZGF0ZSBpcyB2YWxpZFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBEYXRlVGltZVNlcnZpY2UucGFyc2VVVEMob2JqKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRhdGUgaXMgbm90IHZhbGlkXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChvYmouY29uc3RydWN0b3IgPT09IEFycmF5KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2xvbmVkT2JqID0gW107XHJcbiAgICAgICAgICAgICAgICAvLyBGb3IgZWFjaCBpdGVtLCB3ZSByZWFzc2lnbiAmIHJlY3Vyc2l2ZWx5IGNhbGwgcmVwbGFjZURhdGVUaW1lXHJcbiAgICAgICAgICAgICAgICBvYmouZm9yRWFjaChmdW5jdGlvbihlbGVtZW50LCBpbmRleCwgYXJyYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbG9uZWRPYmoucHVzaChyZXBsYWNlRGF0ZVRpbWUoZWxlbWVudCkpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2xvbmVkT2JqO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIE9iamVjdClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNsb25lZE9iaiA9IHt9O1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBvYmopXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb25lZE9ialtwcm9wXSA9IHJlcGxhY2VEYXRlVGltZShvYmpbcHJvcF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBjbG9uZWRPYmo7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgndXRpbGl0aWVzLmFwaScpXHJcbiAgICAgICAgLmZhY3RvcnkoJ2FwaVNlcnZpY2UnLCBhcGlGYWN0b3J5KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFdyYXBwZXIgYXJvdW5kICRodHRwIHRoYXQgYWN0cyBhcyB0aGUgZGF0YSBwcm92aWRlclxyXG4gICAgICogQHBhcmFtICRodHRwIC0gaHR0cCBjbGllbnRcclxuICAgICAqIEBwYXJhbSBBUElfQ09ORklHIC0gQVBJIGNvbnN0YW50c1xyXG4gICAgICogQHJldHVybnMge3tnZXQ6IGdldCwgcG9zdDogcG9zdH19IC0gZ2V0IGFuZCBwb3N0IHNlcnZpY2VzXHJcbiAgICAgKiBAbmdJbmplY3RcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gYXBpRmFjdG9yeSgkaHR0cCwgQVBJX0NPTkZJRywgYXBpVHJhbnNmb3JtZXJTZXJ2aWNlKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGdldDogZ2V0LFxyXG4gICAgICAgICAgICBwb3N0OiBwb3N0XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGFrZXMgYW55IGlucHV0IGFuZCBjYWxscyBhIEhUVFAgUE9TVCBvbiB0aGUgZ2l2ZW4gcm91dGVcclxuICAgICAgICAgKiBAcGFyYW0gcm91dGUgLSBSb3V0ZSBmb3IgcG9zdGluZ1xyXG4gICAgICAgICAqIEBwYXJhbSBpbnB1dCAtIFBheWxvYWRcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBwb3N0KHJvdXRlLCBpbnB1dCkge1xyXG4gICAgICAgICAgICBpZiAoIWlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dCA9IHt9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkaHR0cC5wb3N0KEFQSV9DT05GSUcuQkFTRV9ST1VURSArICcvJyArIHJvdXRlLCBpbnB1dCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDYWxscyBhIEhUVFAgR0VUIG9uIHRoZSBnaXZlbiByb3V0ZVxyXG4gICAgICAgICAqIEBwYXJhbSByb3V0ZSAtIFJvdXRlIHRvIGdldFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtuZy5JUHJvbWlzZTxUUmVzdWx0PnwqfSAtIFByb21pc2Ugb2YgcmVzdWx0c1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldChyb3V0ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHBcclxuICAgICAgICAgICAgICAgIC5nZXQoQVBJX0NPTkZJRy5CQVNFX1JPVVRFICsgJy8nICsgcm91dGUpXHJcbiAgICAgICAgICAgICAgICAudGhlbihnZXREYXRhKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oYXBpVHJhbnNmb3JtZXJTZXJ2aWNlLnJlcGxhY2VEYXRlVGltZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXREYXRhKHBheWxvYWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBheWxvYWQuZGF0YVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCd1dGlsaXRpZXMuZGF0ZXRpbWUnKVxyXG4gICAgICAgIC5mYWN0b3J5KCdEYXRlVGltZVNlcnZpY2UnLCBEYXRlVGltZUZhY3RvcnkpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGF0ZSBUaW1lIHV0aWxpdHkgYmVsdCB0aGF0IHV0aWxpemVzIG1vbWVudCAmIHN1cHBsaWVzIGtleVxyXG4gICAgICogdXRpbGl0aWVzIGZvciB3b3JraW5nIHdpdGggTXlTUUwgRGF0ZVRpbWUgJiB0aW1lIHpvbmUgaXNzdWVzXHJcbiAgICAgKiBAcmV0dXJucyB7e25vdzogbm93LCB0b1VUQzogdG9VVEMsIHBhcnNlVVRDOiBwYXJzZVVUQ319XHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBEYXRlVGltZUZhY3RvcnkoVVRDX1RJTUVGT1JNQVQpIHtcclxuXHJcbiAgICAgICAgdmFyIHNlcnZpY2UgPSB7XHJcbiAgICAgICAgICAgIG5vdzogbm93LFxyXG4gICAgICAgICAgICB0b1VUQzogdG9VVEMsXHJcbiAgICAgICAgICAgIHBhcnNlVVRDOiBwYXJzZVVUQyxcclxuICAgICAgICAgICAgZ2V0RGF5c0luVGhpc1dlZWs6IGdldERheXNJblRoaXNXZWVrXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNlcnZpY2U7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFByb3ZpZGUgYW4gaW50ZXJmYWNlIHRvIHJldHJpZXZlIGEgbW9tZW50L2RhdGVcclxuICAgICAgICAgKiBAcmV0dXJucyBtb21lbnRcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBub3coKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtb21lbnQudHoobmV3IERhdGUoKSwgJ0FtZXJpY2EvRGV0cm9pdCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVHJhbnNmb3JtcyBtb21lbnQgaW50byBNeVNRTCBhY2NlcHRhYmxlIFVUQyBEYXRlVGltZSBvYmplY3RcclxuICAgICAgICAgKiBAcGFyYW0gbW9tZW50T2JqXHJcbiAgICAgICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gdG9VVEMobW9tZW50T2JqKSB7XHJcbiAgICAgICAgICAgIGlmICghbW9tZW50LmlzTW9tZW50KG1vbWVudE9iaikpIHtcclxuICAgICAgICAgICAgICAgIGV4Y2VwdGlvblNlcnZpY2UuY2F0Y2hlcignTm9uLW1vbWVudCBvYmplY3QgZGV0ZWN0ZWQnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG1vbWVudE9iai50eihcIkV0Yy9VVENcIikuZm9ybWF0KFVUQ19USU1FRk9STUFUKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRyYW5zZm9ybXMgTXlTUUwgVVRDIHRpbWUgU3RyaW5ncyBpbnRvIG1vbWVudHNcclxuICAgICAgICAgKiBAcGFyYW0gdXRjU3RyaW5nXHJcbiAgICAgICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gcGFyc2VVVEModXRjU3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtb21lbnQudHoodXRjU3RyaW5nLCAnQW1lcmljYS9EZXRyb2l0Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXRyaWV2ZXMgYW4gYXJyYXkgb2YgbW9tZW50cyBmb3IgdGhpcyB3ZWVrLFxyXG4gICAgICAgICAqIGVhY2ggbW9tZW50IHJlcHJlc2VudHMgdGhlIHN0YXJ0IG9mIHRoZSBkYXkuXHJcbiAgICAgICAgICogQHJldHVybnM6XHJcbiAgICAgICAgICogW1xyXG4gICAgICAgICAqICAgICAgbW9tZW50LCAvLyBNb21lbnQgZm9yIE1vbmRheVxyXG4gICAgICAgICAqICAgICAgbW9tZW50IC8vICBNb21lbnQgZm9yIFR1ZXNkYXlcclxuICAgICAgICAgKiAgICAgIC4uLiAvLyBTbyBvbiB0aWwgU3VuZGF5XHJcbiAgICAgICAgICogXVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldERheXNJblRoaXNXZWVrKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZ2V0RGF5c0luV2Vlayhub3coKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXRyaWV2ZXMgYW4gYXJyYXkgb2YgbW9tZW50cyBmb3IgYSB3ZWVrLCB0aGUgd2VlayBpcyBiYXNlZFxyXG4gICAgICAgICAqIG9uIHRoZSBpbnB1dHRlZCBtb21lbnRcclxuICAgICAgICAgKiBAcGFyYW0gZGF5SW5XZWVrXHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKiBbXHJcbiAgICAgICAgICogICAgICBtb21lbnQsIC8vIE1vbWVudCBmb3IgTW9uZGF5XHJcbiAgICAgICAgICogICAgICBtb21lbnQgLy8gIE1vbWVudCBmb3IgVHVlc2RheVxyXG4gICAgICAgICAqICAgICAgLi4uIC8vIFNvIG9uIHRpbCBTdW5kYXlcclxuICAgICAgICAgKiBdXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0RGF5c0luV2VlayhkYXlJbldlZWspIHtcclxuICAgICAgICAgICAgdmFyIGZpcnN0RGF5T2ZXZWVrID0gZGF5SW5XZWVrLnN0YXJ0T2YoJ3dlZWsnKTtcclxuICAgICAgICAgICAgdmFyIGRheXNJbldlZWsgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNzsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBkYXlzSW5XZWVrLnB1c2goYW5ndWxhci5jb3B5KGZpcnN0RGF5T2ZXZWVrKS5hZGQoaSwgJ2RheXMnKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkYXlzSW5XZWVrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3V0aWxpdGllcy5leGNlcHRpb24nKVxyXG4gICAgICAgIC5mYWN0b3J5KCdleGNlcHRpb25TZXJ2aWNlJywgZXhjZXB0aW9uRmFjdG9yeSk7XHJcblxyXG4gICAgLyogQG5nSW5qZWN0ICovXHJcbiAgICBmdW5jdGlvbiBleGNlcHRpb25GYWN0b3J5KGxvZ2dlclNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgc2VydmljZSA9IHtcclxuICAgICAgICAgICAgY2F0Y2hlcjogY2F0Y2hlclxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDYXRjaGVzIGV4Y2VwdGlvbnMsIGxvZ3MgcmVhc29uIGludG8gY29uc29sZS5cclxuICAgICAgICAgKiBAcGFyYW0gbWVzc2FnZVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBjYXRjaGVyKG1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHJlYXNvbikge1xyXG4gICAgICAgICAgICAgICAgbG9nZ2VyU2VydmljZS5lcnJvcihtZXNzYWdlLCByZWFzb24pO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXcmFwcGVyIGFyb3VuZCB0b2FzdHJcclxuICAgICAqL1xyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3V0aWxpdGllcy5sb2dnZXInKVxyXG4gICAgICAgIC5mYWN0b3J5KCdsb2dnZXJTZXJ2aWNlJywgbG9nZ2VyRmFjdG9yeSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWFscyB3aXRoIHJldmVhbGluZyAmIGxvZ2dpbmcuXHJcbiAgICAgKiBAcmV0dXJucyB7XHJcbiAgICAgKiB7c2hvd1RvYXN0czogYm9vbGVhbiwgZXJyb3I6IGVycm9yLCBpbmZvOiBpbmZvLCBzdWNjZXNzOiBzdWNjZXNzLCB3YXJuaW5nOiB3YXJuaW5nLCBsb2c6ICgkbG9nLmxvZ3wqKX19XHJcbiAgICAgKiBAbmdJbmplY3RcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gbG9nZ2VyRmFjdG9yeSgkbG9nLCB0b2FzdHIpIHtcclxuICAgICAgICB2YXIgc2VydmljZSA9IHtcclxuICAgICAgICAgICAgc2hvd1RvYXN0czogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIGVycm9yOiBlcnJvcixcclxuICAgICAgICAgICAgaW5mbzogaW5mbyxcclxuICAgICAgICAgICAgc3VjY2Vzczogc3VjY2VzcyxcclxuICAgICAgICAgICAgd2FybmluZzogd2FybmluZyxcclxuXHJcbiAgICAgICAgICAgIGxvZzogJGxvZy5sb2dcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gc2VydmljZTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVkIGVycm9yIHRvYXN0IHdpdGggYSBjcm9zc1xyXG4gICAgICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgICAgICogQHBhcmFtIGRhdGFcclxuICAgICAgICAgKiBAcGFyYW0gdGl0bGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBlcnJvcihtZXNzYWdlLCBkYXRhLCB0aXRsZSkge1xyXG4gICAgICAgICAgICB0b2FzdHIuZXJyb3IobWVzc2FnZSwgdGl0bGUpO1xyXG4gICAgICAgICAgICAkbG9nLmVycm9yKCdFcnJvcjogJyArIG1lc3NhZ2UsIGRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTGlnaHQgYmx1ZSB0b2FzdCB3aXRoIGV4Y2xhbWF0aW9uIG1hcmtcclxuICAgICAgICAgKiBAcGFyYW0gbWVzc2FnZVxyXG4gICAgICAgICAqIEBwYXJhbSBkYXRhXHJcbiAgICAgICAgICogQHBhcmFtIHRpdGxlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gaW5mbyhtZXNzYWdlLCBkYXRhLCB0aXRsZSkge1xyXG4gICAgICAgICAgICB0b2FzdHIuaW5mbyhtZXNzYWdlLCB0aXRsZSk7XHJcbiAgICAgICAgICAgICRsb2cuaW5mbygnSW5mbzogJyArIG1lc3NhZ2UsIGRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR3JlZW4gdG9hc3Qgd2l0aCB0aWNrXHJcbiAgICAgICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAgICAgKiBAcGFyYW0gZGF0YVxyXG4gICAgICAgICAqIEBwYXJhbSB0aXRsZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHN1Y2Nlc3MobWVzc2FnZSwgZGF0YSwgdGl0bGUpIHtcclxuICAgICAgICAgICAgdG9hc3RyLnN1Y2Nlc3MobWVzc2FnZSwgdGl0bGUpO1xyXG4gICAgICAgICAgICAkbG9nLmluZm8oJ1N1Y2Nlc3M6ICcgKyBtZXNzYWdlLCBkYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlZCB0b2FzdCB3aXRoIENyb3NzXHJcbiAgICAgICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAgICAgKiBAcGFyYW0gZGF0YVxyXG4gICAgICAgICAqIEBwYXJhbSB0aXRsZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHdhcm5pbmcobWVzc2FnZSwgZGF0YSwgdGl0bGUpIHtcclxuICAgICAgICAgICAgdG9hc3RyLndhcm5pbmcobWVzc2FnZSwgdGl0bGUpO1xyXG4gICAgICAgICAgICAkbG9nLndhcm4oJ1dhcm5pbmc6ICcgKyBtZXNzYWdlLCBkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCd1dGlsaXRpZXMucm91dGVyJylcclxuICAgICAgICAuZmFjdG9yeSgncm91dGVyU2VydmljZScsIHJvdXRlclNlcnZpY2UpO1xyXG5cclxuICAgIC8qIEBuZ0luamVjdCAqL1xyXG4gICAgZnVuY3Rpb24gcm91dGVyU2VydmljZSgkc3RhdGUsICRyb290U2NvcGUsIGxvZ2dlclNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgaGFuZGxpbmdSb3V0ZUNoYW5nZUVycm9yID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIHJvdXRlQ291bnRzID0ge1xyXG4gICAgICAgICAgICBlcnJvcnM6IDAsXHJcbiAgICAgICAgICAgIGNoYW5nZXM6IDBcclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciByb3V0ZXMgPSBbXTtcclxuICAgICAgICB2YXIgZ29EZWZhdWx0U3RhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygkc3RhdGUuJGN1cnJlbnQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZ29EZWZhdWx0U3RhdGU6IGdvRGVmYXVsdFN0YXRlXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICAgICAgaGFuZGxlUm91dGVFcnJvcnMoKTtcclxuICAgICAgICAgICAgaGFuZGxlUm91dGVTdWNjZXNzZXMoKTtcclxuICAgICAgICAgICAgaGFuZGxlUm91dGVOb3RGb3VuZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlUm91dGVOb3RGb3VuZCgpIHtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZU5vdEZvdW5kJyxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChldmVudCwgdW5mb3VuZFN0YXRlLCBmcm9tU3RhdGUsIGZyb21QYXJhbXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaGFuZGxpbmdSb3V0ZUNoYW5nZUVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcm91dGVDb3VudHMuZXJyb3JzKys7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxpbmdSb3V0ZUNoYW5nZUVycm9yID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTG9nIFN0YXRlIG5vdCBmb3VuZFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtc2cgPSAnW1N0YXRlIG5vdCBmb3VuZF0gRXJyb3Igcm91dGluZyB0byAnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdW5mb3VuZFN0YXRlLnRvICsgJyBmcm9tICcgKyBmcm9tU3RhdGUucGFyZW50ICsgJy4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJvbVN0YXRlLm5hbWUgKyAnLic7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyU2VydmljZS53YXJuaW5nKG1zZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ29EZWZhdWx0U3RhdGUoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlUm91dGVTdWNjZXNzZXMoKSB7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdWNjZXNzJyxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICByb3V0ZUNvdW50cy5jaGFuZ2VzKys7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxpbmdSb3V0ZUNoYW5nZUVycm9yID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZVJvdXRlRXJyb3JzKCkge1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlRXJyb3InLFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKGV2ZW50LCB0b1N0YXRlLCB0b1BhcmFtcywgZnJvbVN0YXRlLCBmcm9tUGFyYW1zLCBlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChoYW5kbGluZ1JvdXRlQ2hhbmdlRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByb3V0ZUNvdW50cy5lcnJvcnMrKztcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGluZ1JvdXRlQ2hhbmdlRXJyb3IgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBMb2cgU3RhdGUgcm91dGluZyBlcnJvclxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtc2cgPSAnW1N0YXRlIFJvdXRpbmcgRXJyb3JdICcgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnRXJyb3Igcm91dGluZyB0byAnICsgdG9TdGF0ZS5uYW1lICsgJyBmcm9tICcgKyBmcm9tU3RhdGUubmFtZSArICcuJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcgRXJyb3I6ICcgKyBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICBsb2dnZXJTZXJ2aWNlLndhcm5pbmcobXNnLCBbZXJyb3JdKTtcclxuICAgICAgICAgICAgICAgICAgICBnb0RlZmF1bHRTdGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnanAuc2NoZWR1bGUuZGF0YScpXHJcbiAgICAgICAgLmZhY3RvcnkoJ3NjaGVkdWxlU2VydmljZScsIHNjaGVkdWxlRmFjdG9yeSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcm92aWRlcyBhY3Rpdml0aWVzIGFuZCB0aGVpciBhY3Rpdml0eSBzZXNzaW9uc1xyXG4gICAgICogQHBhcmFtIGFwaVNlcnZpY2VcclxuICAgICAqIEBwYXJhbSBBUElfUk9VVEVTX0NPTkZJR1xyXG4gICAgICogQHBhcmFtIGV4Y2VwdGlvblNlcnZpY2VcclxuICAgICAqIEByZXR1cm5zIHt7Z2V0RHJvcGluczogZ2V0RHJvcGlucywgZ2V0QWN0aXZpdHlTZXNzaW9uczogZ2V0QWN0aXZpdHlTZXNzaW9uc319XHJcbiAgICAgKiBAbmdJbmplY3RcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gc2NoZWR1bGVGYWN0b3J5KGFwaVNlcnZpY2UsIEFQSV9ST1VURVNfQ09ORklHLCBleGNlcHRpb25TZXJ2aWNlLCBEYXRlVGltZVNlcnZpY2UpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBnZXREcm9waW5zOiBnZXREcm9waW5zLFxyXG4gICAgICAgICAgICBnZXRBY3Rpdml0eTogZ2V0QWN0aXZpdHksXHJcbiAgICAgICAgICAgIGdldEFjdGl2aXR5U2Vzc2lvbnM6IGdldEFjdGl2aXR5U2Vzc2lvbnNcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXRyaWV2ZXMgYWxsIGFjdGl2aXR5IHNlc3Npb25zIGZvciBhIGdpdmVuIGFjdGl2aXR5XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0gYWN0aXZpdHlJZCAtIEFjdGl2aXR5IElkXHJcbiAgICAgICAgICogQHJldHVybnMge25nLklQcm9taXNlPFRSZXN1bHQ+fCp9IC0gUHJvbWlzZSBvZiBhY3Rpdml0eSBzZXNzaW9uc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldEFjdGl2aXR5U2Vzc2lvbnMoYWN0aXZpdHlJZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXBpU2VydmljZVxyXG4gICAgICAgICAgICAgICAgLmdldChBUElfUk9VVEVTX0NPTkZJRy5EUk9QSU5TICsgJy8nICsgYWN0aXZpdHlJZClcclxuICAgICAgICAgICAgICAgIC50aGVuKGdldEFjdGl2aXR5U2Vzc2lvbnNDb21wbGV0ZSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGdyb3VwQnlEYXlPZldlZWspXHJcbiAgICAgICAgICAgICAgICAudGhlbihjb252ZXJ0SXNXb21lbkJvb2xlYW4pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXhjZXB0aW9uU2VydmljZS5jYXRjaGVyKCdYSFIgRmFpbGVkIGZvciBnZXRBY3Rpdml0eVNlc3Npb25zJykpO1xyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIFJldHVybnMgYWN0aXZpdHkgc2Vzc2lvbnMgZm9yIGEgZ2l2ZW4gYWN0aXZpdHlJZFxyXG4gICAgICAgICAgICAgKiBAcGFyYW0gYWN0aXZpdHlTZXNzaW9uc1xyXG4gICAgICAgICAgICAgKiBAcmV0dXJucyBbXHJcbiAgICAgICAgICAgICAqICAgIHtcclxuICAgICAgICAgICAgICogICAgICBcImlkXCI6IDEyLFxyXG4gICAgICAgICAgICAgKiAgICAgIFwiYWN0aXZpdHlfaWRcIjogOCxcclxuICAgICAgICAgICAgICogICAgICBcImNyYXdsX3Nlc3Npb25faWRcIjogMSxcclxuICAgICAgICAgICAgICogICAgICBcImRhdGVcIjogbW9tZW50LFxyXG4gICAgICAgICAgICAgKiAgICAgIFwic3RhcnRfdGltZVwiOiBtb21lbnQsXHJcbiAgICAgICAgICAgICAqICAgICAgXCJlbmRfdGltZVwiOiBtb21lbnQsXHJcbiAgICAgICAgICAgICAqICAgICAgXCJjcmVhdGVkX2F0XCI6IG1vbWVudCxcclxuICAgICAgICAgICAgICogICAgICBcInVwZGF0ZWRfYXRcIjogbW9tZW50XHJcbiAgICAgICAgICAgICAqICAgIH0sIC4uLlxyXG4gICAgICAgICAgICAgKiBdXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRBY3Rpdml0eVNlc3Npb25zQ29tcGxldGUoYWN0aXZpdHlTZXNzaW9ucykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjdGl2aXR5U2Vzc2lvbnM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBGb3JtYXQgYWN0aXZpdHkgc2Vzc2lvbnMgYnkgZGF5IG9mIHdlZWtcclxuICAgICAgICAgICAgICogQHBhcmFtIGFjdGl2aXR5U2Vzc2lvbnNcclxuICAgICAgICAgICAgICogQHJldHVybnMgW1xyXG4gICAgICAgICAgICAgKiAgICAgIHtcclxuICAgICAgICAgICAgICogICAgICAgICAgZGF0ZTogbW9tZW50LCAvLyBUaGVzZSBkYXlzIGFyZSB1bmlxdWUgZGF5c1xyXG4gICAgICAgICAgICAgKiAgICAgICAgICBzZXNzaW9uczogW1xyXG4gICAgICAgICAgICAgKiAgICAgICAgICAgICAgYWN0aXZpdHlzZXNzaW9uLFxyXG4gICAgICAgICAgICAgKiAgICAgICAgICAgICAgLi4uXHJcbiAgICAgICAgICAgICAqICAgICAgICAgIF1cclxuICAgICAgICAgICAgICogICAgICB9LFxyXG4gICAgICAgICAgICAgKiAgICAgIC4uLlxyXG4gICAgICAgICAgICAgKiBdXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBncm91cEJ5RGF5T2ZXZWVrKGFjdGl2aXR5U2Vzc2lvbnMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRlUHJvcGVydHkgPSAnZGF0ZSc7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmVkdWNlIGFjdGl2aXR5IHNlc3Npb25zXHJcbiAgICAgICAgICAgICAgICBhY3Rpdml0eVNlc3Npb25zID0gX1xyXG4gICAgICAgICAgICAgICAgICAgIC5jaGFpbihhY3Rpdml0eVNlc3Npb25zKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZWR1Y2UoZnVuY3Rpb24oZGljdCwgYWN0aXZpdHlTZXNzaW9uKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2Vzc2lvbkRhdGUgPSBhY3Rpdml0eVNlc3Npb25bJ2RhdGUnXS5zdGFydE9mKCdkYXknKS5mb3JtYXQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfLmhhcyhkaWN0LCBzZXNzaW9uRGF0ZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFwcGVuZCBhY3Rpdml0eSBzZXNzaW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWN0W3Nlc3Npb25EYXRlXVsnc2Vzc2lvbnMnXS5wdXNoKGFjdGl2aXR5U2Vzc2lvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYSBrZXkgZm9yIGEgbmV3IGRhdGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpY3Rbc2Vzc2lvbkRhdGVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGU6IGFjdGl2aXR5U2Vzc2lvblsnZGF0ZSddLnN0YXJ0T2YoJ2RheScpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlc3Npb25zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5U2Vzc2lvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRpY3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwge30pXHJcbiAgICAgICAgICAgICAgICAgICAgLnRvQXJyYXkoKVxyXG4gICAgICAgICAgICAgICAgICAgIC52YWx1ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpdml0eVNlc3Npb25zO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXRyaWV2ZXMgQWN0aXZpdHkgb2JqZWN0IGdpdmVuIGFuIGFjdGl2aXR5IElkXHJcbiAgICAgICAgICogQHBhcmFtIGFjdGl2aXR5SWRcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqIHtcclxuICAgICAgICAgKiAgICAgICBcImlkXCI6OCxcclxuICAgICAgICAgKiAgICAgICBcImFjdGl2aXR5XCI6XCJCYWRtaW50b25cIixcclxuICAgICAgICAgKiAgICAgIFwiY2F0ZWdvcnlcIjpcIkRyb3AgSW5cIixcclxuICAgICAgICAgKiAgICAgIFwid29tZW5fb25seVwiOjAsXHJcbiAgICAgICAgICogICAgICBcImNyZWF0ZWRfYXRcIjpcIjIwMTQtMTItMTQgMTY6NTE6MjVcIixcclxuICAgICAgICAgKiAgICAgIFwidXBkYXRlZF9hdFwiOlwiMjAxNC0xMi0xNCAxNjo1MToyNVwiXHJcbiAgICAgICAgICogfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldEFjdGl2aXR5KGFjdGl2aXR5SWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYXBpU2VydmljZVxyXG4gICAgICAgICAgICAgICAgLmdldChBUElfUk9VVEVTX0NPTkZJRy5BQ1RJVklUSUVTICArICcvJyArIGFjdGl2aXR5SWQpXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXhjZXB0aW9uU2VydmljZS5jYXRjaGVyKCdYSFIgRmFpbGVkIGZvciBnZXRBY3Rpdml0eVNlc3Npb25zJykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmV0cmlldmVzIGFsbCBkcm9waW4gYWN0aXZpdGllc1xyXG4gICAgICAgICAqIEByZXR1cm5zIHtuZy5JUHJvbWlzZTxUUmVzdWx0PnwqfSAtIFByb21pc2Ugb2YgYWN0aXZpdGllc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldERyb3BpbnMoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhcGlTZXJ2aWNlXHJcbiAgICAgICAgICAgICAgICAuZ2V0KEFQSV9ST1VURVNfQ09ORklHLkRST1BJTlMpXHJcbiAgICAgICAgICAgICAgICAudGhlbihnZXREcm9waW5zQ29tcGxldGUpXHJcbiAgICAgICAgICAgICAgICAudGhlbihjb252ZXJ0SXNXb21lbkJvb2xlYW4pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXhjZXB0aW9uU2VydmljZS5jYXRjaGVyKCdYSFIgRmFpbGVkIGZvciBnZXREcm9waW5zJykpO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0RHJvcGluc0NvbXBsZXRlKGFjdGl2aXRpZXMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpdml0aWVzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBIRUxQRVIgRlVOQ1RJT05TXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbnZlcnRzIHdvbWVuX29ubHkgYm9vbGVhbiB2YWx1ZSBmcm9tIDAsMSB0byBmYWxzZSwgdHJ1ZVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIGNvbGxlY3Rpb25cclxuICAgICAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBjb252ZXJ0SXNXb21lbkJvb2xlYW4oY29sbGVjdGlvbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF8uZm9yRWFjaChjb2xsZWN0aW9uLCBmdW5jdGlvbihlbCkge1xyXG4gICAgICAgICAgICAgICAgZWwud29tZW5fb25seSA9IGVsLndvbWVuX29ubHkgIT09IDA7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb247XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEYXRhIFNlcnZpY2Ugb2JqZWN0IHRvIHJldHJpZXZlIGRhdGEgZm9yXHJcbiAgICAgKiBzY2hlZHVsZS1iYXNlLWxheW91dCBDb250cm9sbGVyXHJcbiAgICAgKi9cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdqcC5zY2hlZHVsZS5sYXlvdXRzJylcclxuICAgICAgICAuZmFjdG9yeSgnc2NoZWR1bGVCYXNlTGF5b3V0RGF0YVNlcnZpY2UnLCBzY2hlZHVsZUJhc2VMYXlvdXREYXRhRmFjdG9yeSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZXMgZGF0YSBmb3Igc2NoZWR1bGUtYmFzZS1sYXlvdXQgQ29udHJvbGxlclxyXG4gICAgICogQHJldHVybnMge3tsb2FkOiBsb2FkfX1cclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBzY2hlZHVsZUJhc2VMYXlvdXREYXRhRmFjdG9yeSgkcSwgc2NoZWR1bGVTZXJ2aWNlKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGxvYWQ6IGxvYWRcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBMb2FkcyBhbGwgZGF0YSBpbnRvIHRoaXMuZGF0YSBhbmQgcmV0dXJucyBhIHByb21pc2VcclxuICAgICAgICBmdW5jdGlvbiBsb2FkKCkge1xyXG4gICAgICAgICAgICB2YXIgZHJvcGluQWN0aXZpdGllcyA9IHNjaGVkdWxlU2VydmljZS5nZXREcm9waW5zKCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gJHEuYWxsKFtkcm9waW5BY3Rpdml0aWVzXSkudGhlbihcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHJlc3VsdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9waW5BY3Rpdml0aWVzOiByZXN1bHRzWzBdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERhdGEgU2VydmljZSBvYmplY3QgdG8gcmV0cmlldmUgZGF0YSBmb3JcclxuICAgICAqIGFjdGl2aXR5LXNlc3Npb25zLWxheW91dCBDb250cm9sbGVyXHJcbiAgICAgKi9cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdqcC5zY2hlZHVsZS5sYXlvdXRzJylcclxuICAgICAgICAuZmFjdG9yeSgnYWN0aXZpdHlTZXNzaW9uc0xheW91dERhdGFTZXJ2aWNlJywgYWN0aXZpdHlTZXNzaW9uc0xheW91dERhdGFGYWN0b3J5KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlcyBkYXRhIGZvciBhY3Rpdml0eS1zZXNzaW9ucy1sYXlvdXQgQ29udHJvbGxlclxyXG4gICAgICogQHBhcmFtICRxLFxyXG4gICAgICogQHJldHVybnMge3thY3Rpdml0eVNlc3Npb25zOiBhY3Rpdml0eVNlc3Npb25zfX1cclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBhY3Rpdml0eVNlc3Npb25zTGF5b3V0RGF0YUZhY3RvcnkoJHEsIHNjaGVkdWxlU2VydmljZSlcclxuICAgIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBsb2FkOiBsb2FkXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gbG9hZChhY3Rpdml0eUlkKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IFtcclxuICAgICAgICAgICAgICAgIGxvYWRBY3Rpdml0eVNlc3Npb25zKGFjdGl2aXR5SWQpLFxyXG4gICAgICAgICAgICAgICAgbG9hZEFjdGl2aXR5KGFjdGl2aXR5SWQpXHJcbiAgICAgICAgICAgIF07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gJHEuYWxsKGRhdGEpLnRoZW4oXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbihyZXN1bHRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5U2Vzc2lvbnM6IHJlc3VsdHNbMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZpdHk6IHJlc3VsdHNbMV1cclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gRGF0YSBMb2FkZXJzXHJcbiAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgICAgICAgICAgLy8gTG9hZHMgYWxsIGRhdGEgaW50byB0aGlzLmRhdGEgYW5kIHJldHVybnMgYSBwcm9taXNlXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGxvYWRBY3Rpdml0eVNlc3Npb25zKGFjdGl2aXR5SWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzY2hlZHVsZVNlcnZpY2UuZ2V0QWN0aXZpdHlTZXNzaW9ucyhhY3Rpdml0eUlkKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gbG9hZEFjdGl2aXR5KGFjdGl2aXR5SWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzY2hlZHVsZVNlcnZpY2UuZ2V0QWN0aXZpdHkoYWN0aXZpdHlJZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdqcC5mb290ZXInKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ2pwRm9vdGVyJywganBGb290ZXIpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGpwRm9vdGVyKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJhcHAvY29tcG9uZW50cy9mb290ZXIvZm9vdGVyLmh0bWxcIlxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdqcC5zY2hlZHVsZS53aWRnZXRzLmFjdGl2aXR5UGlja2VyJylcclxuICAgICAgICAuZGlyZWN0aXZlKCdqcFNjaGVkdWxlQWN0aXZpdHlQaWNrZXInLCBqcFNjaGVkdWxlQWN0aXZpdHlQaWNrZXIpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGpwU2NoZWR1bGVBY3Rpdml0eVBpY2tlcigpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwL2NvbXBvbmVudHMvc2NoZWR1bGUvd2lkZ2V0cy9hY3Rpdml0eS1waWNrZXIvYWN0aXZpdHktcGlja2VyLmh0bWxcIixcclxuICAgICAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgICAgIGFjdGl2aXRpZXM6IFwiPVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSkge1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XHJcbiAgICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdqcC5zY2hlZHVsZS53aWRnZXRzLmFjdGl2aXR5U2Vzc2lvbnMnKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ2pwQWN0aXZpdHlTZXNzaW9uJywganBBY3Rpdml0eVNlc3Npb24pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGpwQWN0aXZpdHlTZXNzaW9uKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2NvbXBvbmVudHMvc2NoZWR1bGUvd2lkZ2V0cy9hY3Rpdml0eS1zZXNzaW9ucy9hY3Rpdml0eS1zZXNzaW9uL2FjdGl2aXR5LXNlc3Npb24uaHRtbCcsXHJcbiAgICAgICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgICAgICBzZXNzaW9uOiAnPScsXHJcbiAgICAgICAgICAgICAgICBkYXk6ICc9JyxcclxuICAgICAgICAgICAgICAgIGZpcnN0U2Vzc2lvbjogJz0nLFxyXG4gICAgICAgICAgICAgICAgbGFzdFNlc3Npb246ICc9J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiAoJHNjb3BlKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuc2hvd0RldGFpbHMgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUudG9nZ2xlU2hvd0RldGFpbHMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2hvd0RldGFpbHMgPSAhJHNjb3BlLnNob3dEZXRhaWxzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2pwLnNjaGVkdWxlLndpZGdldHMuYWN0aXZpdHlTZXNzaW9ucycpXHJcbiAgICAgICAgLmRpcmVjdGl2ZSgnanBTY2hlZHVsZUFjdGl2aXR5U2Vzc2lvbnNEYXlMaXN0JywganBTY2hlZHVsZUFjdGl2aXR5U2Vzc2lvbnNEYXlMaXN0KTtcclxuXHJcbiAgICAvKiBAbmdJbmdqZWN0ICovXHJcbiAgICBmdW5jdGlvbiBqcFNjaGVkdWxlQWN0aXZpdHlTZXNzaW9uc0RheUxpc3QoRGF0ZVRpbWVTZXJ2aWNlKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2NvbXBvbmVudHMvc2NoZWR1bGUvd2lkZ2V0cy9hY3Rpdml0eS1zZXNzaW9ucy9kYXktbGlzdC9hY3Rpdml0eS1zZXNzaW9ucy1kYXktbGlzdC5odG1sJyxcclxuICAgICAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgICAgIHNlc3Npb25zOiAnPScsXHJcbiAgICAgICAgICAgICAgICBkYXk6ICc9J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcclxuICAgIH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdqcC5zY2hlZHVsZS53aWRnZXRzLmFjdGl2aXR5U2Vzc2lvbnMnKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ2pwU2NoZWR1bGVBY3Rpdml0eVNlc3Npb25zTGlzdCcsIGpwU2NoZWR1bGVBY3Rpdml0eVNlc3Npb25zTGlzdCk7XHJcblxyXG4gICAgZnVuY3Rpb24ganBTY2hlZHVsZUFjdGl2aXR5U2Vzc2lvbnNMaXN0KCkge1xyXG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2NvbXBvbmVudHMvc2NoZWR1bGUvd2lkZ2V0cy9hY3Rpdml0eS1zZXNzaW9ucy9saXN0L2FjdGl2aXR5LXNlc3Npb25zLWxpc3QuaHRtbCcsXHJcbiAgICAgICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgICAgICBzY2hlZHVsZTogJz0nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uICgkc2NvcGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xyXG4gICAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2pwLnNjaGVkdWxlLndpZGdldHMuYWN0aXZpdHlTZXNzaW9ucycpXHJcbiAgICAgICAgLmRpcmVjdGl2ZSgnanBQYXJ0aWNpcGFudENvdW50JywganBQYXJ0aWNpcGFudENvdW50KTtcclxuXHJcbiAgICBmdW5jdGlvbiBqcFBhcnRpY2lwYW50Q291bnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvY29tcG9uZW50cy9zY2hlZHVsZS93aWRnZXRzL2FjdGl2aXR5LXNlc3Npb25zL3BhcnRpY2lwYW50LWNvdW50L3BhcnRpY2lwYW50LWNvdW50Lmh0bWwnLFxyXG4gICAgICAgICAgICBzY29wZToge1xyXG4gICAgICAgICAgICAgICAgY291bnQ6ICc9JyxcclxuICAgICAgICAgICAgICAgIGRheTogJz0nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnanAuc2NoZWR1bGUud2lkZ2V0cy5hY3Rpdml0eVNlc3Npb25zJylcclxuICAgICAgICAuZGlyZWN0aXZlKCdqcFNjaGVkdWxlVW5hdmFpbGFibGUnLCBqcFNjaGVkdWxlVW5hdmFpbGFibGUpO1xyXG5cclxuICAgIC8qIEBuZ0luamVjdCAqL1xyXG4gICAgZnVuY3Rpb24ganBTY2hlZHVsZVVuYXZhaWxhYmxlKERhdGVUaW1lU2VydmljZSlcclxuICAgIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgICAgICAgICBzY29wZTogZmFsc2UsIC8vIFdlJ3JlIHVzaW5nIHNlc3Npb24ucGFydGljaXBhbnRzLmxlbmd0aCBmcm9tIHBhcmVudFxyXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbigkc2NvcGUsICRlbGVtZW50KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJHNjb3BlLmRheS5pc0JlZm9yZShEYXRlVGltZVNlcnZpY2Uubm93KCkpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50LmFkZENsYXNzKCdzY2hlZHVsZVVuYXZhaWxhYmxlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KSgpOyIsIi8vIEluY2x1ZGUgaW4gaW5kZXguaHRtbCBzbyB0aGF0IGFwcCBsZXZlbCBleGNlcHRpb25zIGFyZSBoYW5kbGVkLlxyXG4vLyBTaG91bGQgZXhjbHVkZSBmcm9tIHRlc3QgcnVubmVyXHJcbihmdW5jdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgndXRpbGl0aWVzLmV4Y2VwdGlvbicpXHJcbiAgICAgICAgLnByb3ZpZGVyKCdleGNlcHRpb25IYW5kbGVyJywgZXhjZXB0aW9uSGFuZGxlclByb3ZpZGVyKVxyXG4gICAgICAgIC5jb25maWcoY29uZmlnKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE11c3QgY29uZmlndXJlIHRoZSBleGNlcHRpb24gaGFuZGxpbmdcclxuICAgICAqIEByZXR1cm4ge1t0eXBlXX1cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZXhjZXB0aW9uSGFuZGxlclByb3ZpZGVyKCkge1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0ge1xyXG4gICAgICAgICAgICBhcHBFcnJvclByZWZpeDogdW5kZWZpbmVkXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5jb25maWd1cmUgPSBmdW5jdGlvbiAoYXBwRXJyb3JQcmVmaXgpIHtcclxuICAgICAgICAgICAgdGhpcy5jb25maWcuYXBwRXJyb3JQcmVmaXggPSBhcHBFcnJvclByZWZpeDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLiRnZXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtjb25maWc6IHRoaXMuY29uZmlnfTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uZmlndXJlIGJ5IHNldHRpbmcgYW4gb3B0aW9uYWwgc3RyaW5nIHZhbHVlIGZvciBhcHBFcnJvclByZWZpeC5cclxuICAgICAqIEFjY2Vzc2libGUgdmlhIGNvbmZpZy5hcHBFcnJvclByZWZpeCAodmlhIGNvbmZpZyB2YWx1ZSkuXHJcbiAgICAgKiBAcGFyYW0gIHtbdHlwZV19ICRwcm92aWRlXHJcbiAgICAgKiBAcmV0dXJuIHtbdHlwZV19XHJcbiAgICAgKiBAbmdJbmplY3RcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gY29uZmlnKCRwcm92aWRlKSB7XHJcbiAgICAgICAgJHByb3ZpZGUuZGVjb3JhdG9yKCckZXhjZXB0aW9uSGFuZGxlcicsIGV4dGVuZEV4Y2VwdGlvbkhhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRXh0ZW5kIHRoZSAkZXhjZXB0aW9uSGFuZGxlciBzZXJ2aWNlIHRvIGFsc28gZGlzcGxheSBhIHRvYXN0LlxyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSAkZGVsZWdhdGVcclxuICAgICAqIEBwYXJhbSAge09iamVjdH0gZXhjZXB0aW9uSGFuZGxlclxyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBsb2dnZXJTZXJ2aWNlXHJcbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gdGhlIGRlY29yYXRlZCAkZXhjZXB0aW9uSGFuZGxlciBzZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGV4dGVuZEV4Y2VwdGlvbkhhbmRsZXIoJGRlbGVnYXRlLCBleGNlcHRpb25IYW5kbGVyLCBsb2dnZXJTZXJ2aWNlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGV4Y2VwdGlvbiwgY2F1c2UpIHtcclxuICAgICAgICAgICAgdmFyIGFwcEVycm9yUHJlZml4ID0gZXhjZXB0aW9uSGFuZGxlci5jb25maWcuYXBwRXJyb3JQcmVmaXggfHwgJyc7XHJcbiAgICAgICAgICAgIHZhciBlcnJvckRhdGEgPSB7ZXhjZXB0aW9uOiBleGNlcHRpb24sIGNhdXNlOiBjYXVzZX07XHJcbiAgICAgICAgICAgIGV4Y2VwdGlvbi5tZXNzYWdlID0gYXBwRXJyb3JQcmVmaXggKyBleGNlcHRpb24ubWVzc2FnZTtcclxuICAgICAgICAgICAgJGRlbGVnYXRlKGV4Y2VwdGlvbiwgY2F1c2UpO1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQ291bGQgYWRkIHRoZSBlcnJvciB0byBhIHNlcnZpY2UncyBjb2xsZWN0aW9uLFxyXG4gICAgICAgICAgICAgKiBhZGQgZXJyb3JzIHRvICRyb290U2NvcGUsIGxvZyBlcnJvcnMgdG8gcmVtb3RlIHdlYiBzZXJ2ZXIsXHJcbiAgICAgICAgICAgICAqIG9yIGxvZyBsb2NhbGx5LiBPciB0aHJvdyBoYXJkLlxyXG4gICAgICAgICAgICAgKiB0aHJvdyBleGNlcHRpb247XHJcbiAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICAgICAqICAgICB0aHJvdyB7IG1lc3NhZ2U6ICdlcnJvciBtZXNzYWdlIHdlIGFkZGVkJyB9O1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgbG9nZ2VyU2VydmljZS5lcnJvcihleGNlcHRpb24ubWVzc2FnZSwgZXJyb3JEYXRhKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59KSgpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==