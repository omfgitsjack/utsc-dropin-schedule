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
(function() {
    "use strict";

    /**
     * API Resources constants
     */
    angular.module("app.routes")
        .constant('API_ROUTES_CONFIG',
        {
            ACTIVITIES: 'activities'
        });

})();
(function () {
    "use strict";

    /**
     * API (non-route) constants
     */
    angular.module("app.routes")
        .constant('API_CONFIG',
        {
            BASE_ROUTE: 'api'
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
        .config(mdThemingProviderConfig)
        .config(httpProviderConfig)
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

    // @ngInject
    function mdThemingProviderConfig($mdThemingProvider) {
        $mdThemingProvider.theme('docs-dark', 'default')
            .dark();
    }
    mdThemingProviderConfig.$inject = ["$mdThemingProvider"];

    // @ngInject
    function httpProviderConfig($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
    httpProviderConfig.$inject = ["$httpProvider"];

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
    function ActivitySessionLayoutController(activitySessionsData, loggerService, $stateParams)
    {

        var vm = this;

        activate();

        //

        function activate()
        {
            vm.activitySessions = activitySessionsData.activitySessionsThisWeek;
            vm.activityLabel = activitySessionsData.activity.activity;
            vm.activityCategory = activitySessionsData.activity.category;
            vm.activityIsWomenOnly = activitySessionsData.activity.women_only;

            // Show a toast for them to add to homescreen
/*            loggerService.info("Save app onto your phone: " +
            "Click Settings > Add to Home Screen", "title");*/
        }

    }
    ActivitySessionLayoutController.$inject = ["activitySessionsData", "loggerService", "$stateParams"];

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

            return $http.post(API_CONFIG.BASE_ROUTE + '/' + route, input);
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
            getActivitySessions: getActivitySessions,
            joinActivitySession: joinActivitySession
        };

        /**
         * Retrieves all activity sessions for a given activity
         *
         * @param activityId - Activity Id
         * @returns {ng.IPromise<TResult>|*} - Promise of activity sessions
         */
        function getActivitySessions(activityId, weeks) {

            return apiService
                .get(API_ROUTES_CONFIG.ACTIVITIES + '/' + activityId+'/sessions/'+ weeks)
                .then(groupByDayOfWeek)
                .then(convertIsWomenBoolean)
                .catch(exceptionService.catcher('XHR Failed for getActivitySessions'));

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
                .get(API_ROUTES_CONFIG.ACTIVITIES)
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
                .post(API_ROUTES_CONFIG.ACTIVITIES
                +activityId+'/sessions/'+sessionId+'/participants', {
                    name: name
                });
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
                       activitySessionsThisWeek: results[0],
                       activitySessionsNextWeek: results[0],
                       activity: results[1]
                   }
                });

            // Data Loaders
            ///////////////////////////

            // Loads all data into this.data and returns a promise
            function loadActivitySessions(activityId) {
                return scheduleService.getActivitySessions(activityId, 0);
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
        .directive('jpHeaderSummary', jpHeaderSummary);

    function jpHeaderSummary() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/schedule/widgets/activity-sessions/header-summary/header-summary.html',
            scope: {
                count: '=',
                day: '=',
                showLocation: '=',
                location: '='
            }
        }
    }

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
        .directive('jpParticipantList', jpParticipantList);

    function jpParticipantList() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/schedule/widgets/activity-sessions/participant-list/participant-list.html',
            scope: {
                participants: '='
            },
            link: function($scope)
            {

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
                if ($scope.day.isBefore(DateTimeService.now().startOf('day')))
                {
                    $element.addClass('scheduleUnavailable');
                }
            }
        }
    }
    jpScheduleUnavailable.$inject = ["DateTimeService"];

})();
(function () {
    "use strict";

    angular
        .module('jp.schedule.widgets.activitySessions')
        .directive('jpParticipantJoin', jpParticipantJoin);

    // @ngInject
    function jpParticipantJoin(scheduleService, toastr, $state, DateTimeService)
    {
        return {
            restrict: 'E',
            templateUrl: 'app/components/schedule/widgets/activity-sessions/participant-join/participant-join.html',
            scope: {
                activity: '=',
                activitySession: '='
            },
            link: function($scope)
            {
                $scope.join = function() {
                    scheduleService
                        .joinActivitySession(
                            $scope.activitySession.activity_id,
                            $scope.activitySession.id,
                            $scope.user.name)
                        .then(function() {
                            toastr.success('You have successfully joined! Have fun :)');
                            $state.go($state.$current, null, { reload: true });
                        });
                };

                activate();

                function activate()
                {
                    $scope.user = {};
                }
            }
        }
    }
    jpParticipantJoin.$inject = ["scheduleService", "toastr", "$state", "DateTimeService"];


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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUuanMiLCJjb3JlL2NvcmUubW9kdWxlLmpzIiwicm91dGVzL2FwcC1yb3V0ZXMubW9kdWxlLmpzIiwiY29tcG9uZW50cy9mb290ZXIvZm9vdGVyLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvc2NoZWR1bGUubW9kdWxlLmpzIiwidXRpbGl0aWVzL2FwaS9hcGkubW9kdWxlLmpzIiwidXRpbGl0aWVzL2RhdGV0aW1lL2RhdGV0aW1lLm1vZHVsZS5qcyIsInV0aWxpdGllcy9leGNlcHRpb24vZXhjZXB0aW9uLm1vZHVsZS5qcyIsInV0aWxpdGllcy9nb29nbGVhbmFseXRpY3MvZ29vZ2xlYW5hbHl0aWNzLm1vZHVsZS5qcyIsInV0aWxpdGllcy9sb2dnZXIvbG9nZ2VyLm1vZHVsZS5qcyIsInV0aWxpdGllcy9yb3V0ZXIvcm91dGVyLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvZGF0YS9zY2hlZHVsZS1kYXRhLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvbGF5b3V0L2xheW91dC5tb2R1bGUuanMiLCJjb21wb25lbnRzL3NjaGVkdWxlL3JvdXRlcy9zY2hlZHVsZS1yb3V0ZXMubW9kdWxlLmpzIiwiY29tcG9uZW50cy9zY2hlZHVsZS93aWRnZXRzL3NjaGVkdWxlLXdpZGdldHMubW9kdWxlLmpzIiwiY29tcG9uZW50cy9zY2hlZHVsZS93aWRnZXRzL2FjdGl2aXR5LXBpY2tlci9hY3Rpdml0eS1waWNrZXIubW9kdWxlLmpzIiwiY29tcG9uZW50cy9zY2hlZHVsZS93aWRnZXRzL2FjdGl2aXR5LXNlc3Npb25zL2FjdGl2aXR5LXNlc3Npb25zLm1vZHVsZS5qcyIsImNvcmUvY29yZS5jb25zdGFudC5qcyIsInJvdXRlcy9hcHAtcm91dGVzLmNvbnN0YW50LmpzIiwicm91dGVzL2FwcC5jb25zdGFudC5qcyIsInV0aWxpdGllcy9kYXRldGltZS9kYXRldGltZS5jb25zdGFudC5qcyIsInV0aWxpdGllcy9sb2dnZXIvbG9nZ2VyLmNvbnN0YW50LmpzIiwiY29tcG9uZW50cy9zY2hlZHVsZS9yb3V0ZXMvc2NoZWR1bGUtcm9vdC1yb3V0ZS5jb25zdGFudC5qcyIsImNvcmUvY29yZS5jb25maWcuanMiLCJyb3V0ZXMvYXBwLXJvdXRlcy5jb25maWcuanMiLCJ1dGlsaXRpZXMvZGF0ZXRpbWUvZGF0ZXRpbWUuY29uZmlnLmpzIiwidXRpbGl0aWVzL2dvb2dsZWFuYWx5dGljcy9nb29nbGVhbmFseXRpY3MuY29uZmlnLmpzIiwiY29tcG9uZW50cy9zY2hlZHVsZS9yb3V0ZXMvc2NoZWR1bGUtcm91dGVzLmNvbmZpZy5qcyIsImxheW91dC9zaGVsbC5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9zY2hlZHVsZS9sYXlvdXQvYWN0aXZpdGllcy9hY3Rpdml0aWVzLWxheW91dC5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9zY2hlZHVsZS9sYXlvdXQvYWN0aXZpdHktc2Vzc2lvbnMvYWN0aXZpdHktc2Vzc2lvbnMtbGF5b3V0LmNvbnRyb2xsZXIuanMiLCJ1dGlsaXRpZXMvYXBpL2FwaS10cmFuc2Zvcm1lci5mYWN0b3J5LmpzIiwidXRpbGl0aWVzL2FwaS9hcGkuZmFjdG9yeS5qcyIsInV0aWxpdGllcy9kYXRldGltZS9kYXRldGltZS5mYWN0b3J5LmpzIiwidXRpbGl0aWVzL2V4Y2VwdGlvbi9leGNlcHRpb24uZmFjdG9yeS5qcyIsInV0aWxpdGllcy9sb2dnZXIvbG9nZ2VyLmZhY3RvcnkuanMiLCJ1dGlsaXRpZXMvcm91dGVyL3JvdXRlci5mYWN0b3J5LmpzIiwiY29tcG9uZW50cy9zY2hlZHVsZS9kYXRhL3NjaGVkdWxlLWRhdGEuZmFjdG9yeS5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvbGF5b3V0L2FjdGl2aXRpZXMvYWN0aXZpdGllcy1sYXlvdXQuZGF0YS5mYWN0b3J5LmpzIiwiY29tcG9uZW50cy9zY2hlZHVsZS9sYXlvdXQvYWN0aXZpdHktc2Vzc2lvbnMvYWN0aXZpdHktc2Vzc2lvbnMtbGF5b3V0LmRhdGEuZmFjdG9yeS5qcyIsImNvbXBvbmVudHMvZm9vdGVyL2Zvb3Rlci5kaXJlY3RpdmUuanMiLCJjb21wb25lbnRzL3NjaGVkdWxlL3dpZGdldHMvYWN0aXZpdHktcGlja2VyL2FjdGl2aXR5LXBpY2tlci5kaXJlY3RpdmUuanMiLCJjb21wb25lbnRzL3NjaGVkdWxlL3dpZGdldHMvYWN0aXZpdHktc2Vzc2lvbnMvYWN0aXZpdHktc2Vzc2lvbi9hY3Rpdml0eS1zZXNzaW9uLmRpcmVjdGl2ZS5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvd2lkZ2V0cy9hY3Rpdml0eS1zZXNzaW9ucy9kYXktbGlzdC9hY3Rpdml0eS1zZXNzaW9ucy1kYXktbGlzdC5kaXJlY3RpdmUuanMiLCJjb21wb25lbnRzL3NjaGVkdWxlL3dpZGdldHMvYWN0aXZpdHktc2Vzc2lvbnMvaGVhZGVyLXN1bW1hcnkvaGVhZGVyLXN1bW1hcnkuZGlyZWN0aXZlLmpzIiwiY29tcG9uZW50cy9zY2hlZHVsZS93aWRnZXRzL2FjdGl2aXR5LXNlc3Npb25zL2xpc3QvYWN0aXZpdHktc2Vzc2lvbnMtbGlzdC5kaXJlY3RpdmUuanMiLCJjb21wb25lbnRzL3NjaGVkdWxlL3dpZGdldHMvYWN0aXZpdHktc2Vzc2lvbnMvcGFydGljaXBhbnQtbGlzdC9wYXJ0aWNpcGFudC1saXN0LmRpcmVjdGl2ZS5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvd2lkZ2V0cy9hY3Rpdml0eS1zZXNzaW9ucy9zY2hlZHVsZS11bmF2YWlsYWJsZS9zY2hlZHVsZS11bmF2YWlsYWJsZS5kaXJlY3RpdmUuanMiLCJjb21wb25lbnRzL3NjaGVkdWxlL3dpZGdldHMvYWN0aXZpdHktc2Vzc2lvbnMvcGFydGljaXBhbnQtam9pbi9wYXJ0aWNpcGFudC1qb2luLmRpcmVjdGl2ZS5qcyIsInV0aWxpdGllcy9leGNlcHRpb24vZXhjZXB0aW9uLWhhbmRsZXIucHJvdmlkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsQ0FBQSxZQUFBO0lBQ0E7Ozs7O0lBS0EsUUFBQSxPQUFBLFlBQUE7UUFDQTtRQUNBO1FBQ0E7Ozs7QUNUQSxDQUFBLFlBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUE7UUFDQTs7OztZQUlBO1lBQ0E7Ozs7WUFJQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7Ozs7WUFJQTs7Ozs7QUN0QkEsQ0FBQSxZQUFBO0lBQ0E7Ozs7O0lBS0EsUUFBQSxPQUFBLGNBQUE7UUFDQTtRQUNBOzs7O0FDUkEsQ0FBQSxZQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLGFBQUE7OztBQ0hBLENBQUEsWUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQTtRQUNBOzs7QUNKQSxDQUFBLFVBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsaUJBQUE7Ozs7QUNIQSxDQUFBLFlBQUE7SUFDQTs7Ozs7Ozs7SUFRQSxRQUFBLE9BQUE7UUFDQTtZQUNBOzs7O0FDWEEsQ0FBQSxZQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBO1FBQ0E7WUFDQTs7OztBQ0xBLENBQUEsWUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQTtRQUNBO1lBQ0E7WUFDQTs7OztBQ05BLENBQUEsWUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQTtRQUNBOzs7QUNKQSxDQUFBLFlBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUE7UUFDQTtZQUNBOzs7Ozs7O0FDRkEsQ0FBQSxVQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLG9CQUFBO1FBQ0E7Ozs7QUNQQSxDQUFBLFlBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUE7UUFDQTtZQUNBOzs7O0FDTEEsQ0FBQSxZQUFBO0lBQ0E7Ozs7O0lBS0EsUUFBQSxPQUFBLHNCQUFBO1FBQ0E7UUFDQTtRQUNBOzs7O0FDVEEsQ0FBQSxZQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBO1FBQ0E7WUFDQTtZQUNBOzs7O0FDTkEsQ0FBQSxVQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLHNDQUFBO1FBQ0E7Ozs7QUNKQSxDQUFBLFlBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsd0NBQUE7OztBQ0hBLENBQUEsWUFBQTtJQUNBOztJQUVBO1NBQ0EsT0FBQTs7U0FFQSxTQUFBLEtBQUE7OztBQ05BLENBQUEsV0FBQTtJQUNBOzs7OztJQUtBLFFBQUEsT0FBQTtTQUNBLFNBQUE7UUFDQTtZQUNBLFlBQUE7Ozs7QUNUQSxDQUFBLFlBQUE7SUFDQTs7Ozs7SUFLQSxRQUFBLE9BQUE7U0FDQSxTQUFBO1FBQ0E7WUFDQSxZQUFBOzs7O0FDVEEsQ0FBQSxZQUFBO0lBQ0E7Ozs7Ozs7SUFPQSxRQUFBLE9BQUE7U0FDQSxTQUFBLFVBQUE7U0FDQSxTQUFBLHVCQUFBO1lBQ0EsVUFBQTs7U0FFQSxTQUFBLGtCQUFBOzs7QUNiQSxDQUFBLFlBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUE7U0FDQSxTQUFBLFVBQUE7OztBQ0pBLENBQUEsWUFBQTtJQUNBOzs7OztJQUtBLFFBQUEsT0FBQTtTQUNBLFNBQUE7UUFDQTtZQUNBLFVBQUE7WUFDQSxNQUFBO1lBQ0EsS0FBQTtZQUNBLGFBQUE7Ozs7QUNYQSxDQUFBLFlBQUE7SUFDQTs7Ozs7SUFLQTtTQUNBLE9BQUE7U0FDQSxPQUFBO1NBQ0EsT0FBQTtTQUNBLE9BQUE7U0FDQSxPQUFBO1NBQ0EsT0FBQTtTQUNBLElBQUE7Ozs7Ozs7SUFPQSxTQUFBLGFBQUEsUUFBQTtRQUNBLE9BQUEsUUFBQSxVQUFBO1FBQ0EsT0FBQSxRQUFBLGdCQUFBOzs7Ozs7Ozs7SUFRQSxTQUFBLGtCQUFBLGNBQUE7UUFDQSxJQUFBLGFBQUEsY0FBQTtZQUNBLGFBQUEsYUFBQTs7Ozs7Ozs7OztJQVNBLFNBQUEsK0JBQUEsMEJBQUE7UUFDQSx5QkFBQSxVQUFBOzs7OztJQUlBLFNBQUEsd0JBQUEsb0JBQUE7UUFDQSxtQkFBQSxNQUFBLGFBQUE7YUFDQTs7Ozs7SUFJQSxTQUFBLG1CQUFBLGVBQUE7UUFDQSxjQUFBLFNBQUEsYUFBQTtRQUNBLE9BQUEsY0FBQSxTQUFBLFFBQUEsT0FBQTs7Ozs7Ozs7O0lBUUEsU0FBQSxtQkFBQSxlQUFBOzs7Ozs7O0FDL0RBLENBQUEsWUFBQTtJQUNBOzs7OztJQUtBO1NBQ0EsT0FBQTtTQUNBLE9BQUE7Ozs7Ozs7Ozs7O0lBV0EsU0FBQSxZQUFBLGdCQUFBLG9CQUFBLG1CQUFBO0lBQ0E7O1FBRUEsa0JBQUEsV0FBQTs7O1FBR0E7YUFDQSxVQUFBOzs7UUFHQSxvQkFBQSxZQUFBOztRQUVBOzs7YUFHQSxNQUFBOzs7O0FDbENBLENBQUEsWUFBQTtJQUNBOztJQUVBO1NBQ0EsT0FBQTtTQUNBLE9BQUE7Ozs7Ozs7SUFPQSxTQUFBLGVBQUE7SUFDQTs7UUFFQSxPQUFBLEtBQUEsTUFBQTs7WUFFQSxNQUFBO2dCQUNBLEtBQUE7O1lBRUEsVUFBQTtnQkFDQSxTQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsVUFBQTtnQkFDQSxXQUFBO2dCQUNBLFdBQUE7Z0JBQ0EsV0FBQTs7Ozs7UUFLQSxPQUFBLEdBQUE7WUFDQTtnQkFDQTtnQkFDQTs7Ozs7O0FDbENBLENBQUEsWUFBQTtJQUNBOztJQUVBO1NBQ0EsT0FBQTtTQUNBLElBQUE7O0lBRUEsU0FBQTtJQUNBO1FBQ0EsQ0FBQSxTQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsQ0FBQSxFQUFBLHlCQUFBLEVBQUEsRUFBQSxHQUFBLEVBQUEsSUFBQSxVQUFBO1lBQ0EsQ0FBQSxFQUFBLEdBQUEsRUFBQSxFQUFBLEdBQUEsR0FBQSxJQUFBLEtBQUEsWUFBQSxFQUFBLEdBQUEsRUFBQSxFQUFBLElBQUEsT0FBQSxFQUFBLEVBQUEsY0FBQTtZQUNBLEVBQUEsRUFBQSxxQkFBQSxHQUFBLEdBQUEsRUFBQSxNQUFBLEVBQUEsRUFBQSxJQUFBLEVBQUEsRUFBQSxXQUFBLGFBQUEsRUFBQTtXQUNBLE9BQUEsU0FBQSxTQUFBLDBDQUFBOztRQUVBLEdBQUEsVUFBQSxpQkFBQTtRQUNBLEdBQUEsV0FBQTs7OztBQ2ZBLENBQUEsWUFBQTtJQUNBOzs7OztJQUtBO1NBQ0EsT0FBQTtTQUNBLE9BQUE7Ozs7Ozs7OztJQVNBLFNBQUEsb0JBQUEsZ0JBQUE7SUFDQTs7UUFFQSxJQUFBLFNBQUEsb0JBQUE7O1FBRUE7O2FBRUEsTUFB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QVdBLFNBQUEsT0FBQSxVQUFBO1FBQ0EsU0FBQSxVQUFBLHFCQUFBOzs7Ozs7Ozs7OztJQVVBLFNBQUEsdUJBQUEsV0FBQSxrQkFBQSxlQUFBO1FBQ0EsT0FBQSxTQUFBLFdBQUEsT0FBQTtZQUNBLElBQUEsaUJBQUEsaUJBQUEsT0FBQSxrQkFBQTtZQUNBLElBQUEsWUFBQSxDQUFBLFdBQUEsV0FBQSxPQUFBO1lBQ0EsVUFBQSxVQUFBLGlCQUFBLFVBQUE7WUFDQSxVQUFBLFdBQUE7Ozs7Ozs7Ozs7WUFVQSxjQUFBLE1BQUEsVUFBQSxTQUFBOzs7O0tBR0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFpbiBBcHBsaWNhdGlvbiBNb2R1bGVcclxuICAgICAqL1xyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5tYWluJywgW1xyXG4gICAgICAgICdhcHAucm91dGVzJyxcclxuICAgICAgICAnYXBwLmNvcmUnLFxyXG4gICAgICAgICdqcC5zY2hlZHVsZSdcclxuICAgIF0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb3JlJyxcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAqIEFuZ3VsYXIgbW9kdWxlc1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgJ25nTWF0ZXJpYWwnLFxyXG4gICAgICAgICAgICAnbmdUb3VjaCcsXHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAqIE91ciByZXVzYWJsZSBjcm9zcyBhcHAgY29kZSBtb2R1bGVzXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAndXRpbGl0aWVzLmFwaScsXHJcbiAgICAgICAgICAgICd1dGlsaXRpZXMuZXhjZXB0aW9uJyxcclxuICAgICAgICAgICAgJ3V0aWxpdGllcy5sb2dnZXInLFxyXG4gICAgICAgICAgICAndXRpbGl0aWVzLnJvdXRlcicsXHJcbiAgICAgICAgICAgICd1dGlsaXRpZXMuZGF0ZXRpbWUnLFxyXG4gICAgICAgICAgICAndXRpbGl0aWVzLmdvb2dsZWFuYWx5dGljcycsXHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAqIDNyZCBQYXJ0eSBtb2R1bGVzXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAndWkuYm9vdHN0cmFwJyAvLyBBY2NvcmRpb24gYW5kIGNvbGxhcHNlXHJcbiAgICAgICAgXSk7XHJcblxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBcHBsaWNhdGlvbiByb3V0ZXNcclxuICAgICAqL1xyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5yb3V0ZXMnLCBbXHJcbiAgICAgICAgJ2pwLnNjaGVkdWxlLnJvdXRlcycsXHJcbiAgICAgICAgJ3V0aWxpdGllcy5yb3V0ZXInXHJcbiAgICBdKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdqcC5mb290ZXInLCBbXSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnanAuc2NoZWR1bGUnLFxyXG4gICAgICAgIFtdKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgndXRpbGl0aWVzLmFwaScsIFtdKTtcclxuXHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFByb3ZpZGVzIGEgRGF0ZVRpbWVTZXJ2aWNlIHV0aWxpdHkgY2xhc3MgdGhhdCBwcm92aWRlcyBhbiBpbnRlcmZhY2UgdG9cclxuICAgICAqIG1vbWVudCBvYmplY3RzLCB1dGlsaXRpZXMgZm9yIHdvcmtpbmcgd2l0aCBNeVNRTCBVVEMgdGltZXMgZXRjLlxyXG4gICAgICpcclxuICAgICAqIFJlZmVyIHRvIGRhdGV0aW1lLmZhY3RvcnkuanMgZm9yIGRvY3VtZW50YXRpb24gJiBhdmFpbGFibGUgdG9vbHNcclxuICAgICAqL1xyXG4gICAgYW5ndWxhci5tb2R1bGUoJ3V0aWxpdGllcy5kYXRldGltZScsXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICAnYW5ndWxhck1vbWVudCdcclxuICAgICAgICBdKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCd1dGlsaXRpZXMuZXhjZXB0aW9uJyxcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgICd1dGlsaXRpZXMubG9nZ2VyJ1xyXG4gICAgICAgIF0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ3V0aWxpdGllcy5nb29nbGVhbmFseXRpY3MnLFxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgJ2FuZ3VsYXJ0aWNzJyxcclxuICAgICAgICAgICAgJ2FuZ3VsYXJ0aWNzLmdvb2dsZS5hbmFseXRpY3MnXHJcbiAgICAgICAgXSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgndXRpbGl0aWVzLmxvZ2dlcicsXHJcbiAgICAgICAgW10pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ3V0aWxpdGllcy5yb3V0ZXInLFxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgJ3VpLnJvdXRlcidcclxuICAgICAgICBdKTtcclxuXHJcbn0pKCk7IiwiLyoqXHJcbiAqXHJcbiAqL1xyXG4oZnVuY3Rpb24oKXtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdqcC5zY2hlZHVsZS5kYXRhJywgW1xyXG4gICAgICAgICdhcHAuY29yZSdcclxuICAgIF0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2pwLnNjaGVkdWxlLmxheW91dHMnLFxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgJ2pwLmZvb3RlcidcclxuICAgICAgICBdKTtcclxuXHJcbn0pKCk7ICIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNjaGVkdWxlIFJvdXRpbmcgbW9kdWxlXHJcbiAgICAgKi9cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdqcC5zY2hlZHVsZS5yb3V0ZXMnLCBbXHJcbiAgICAgICAgJ3VpLnJvdXRlcicsXHJcbiAgICAgICAgJ2pwLnNjaGVkdWxlLndpZGdldHMnLFxyXG4gICAgICAgICdqcC5zY2hlZHVsZS5sYXlvdXRzJ1xyXG4gICAgXSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnanAuc2NoZWR1bGUud2lkZ2V0cycsXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICAnanAuc2NoZWR1bGUud2lkZ2V0cy5hY3Rpdml0eVBpY2tlcicsXHJcbiAgICAgICAgICAgICdqcC5zY2hlZHVsZS53aWRnZXRzLmFjdGl2aXR5U2Vzc2lvbnMnXHJcbiAgICAgICAgXSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpe1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2pwLnNjaGVkdWxlLndpZGdldHMuYWN0aXZpdHlQaWNrZXInLCBbXHJcbiAgICAgICAgJ2pwLnNjaGVkdWxlLmRhdGEnXHJcbiAgICBdKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdqcC5zY2hlZHVsZS53aWRnZXRzLmFjdGl2aXR5U2Vzc2lvbnMnLCBbXSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwLmNvcmUnKVxyXG4gICAgICAgIC8vIExvZGFzaCBEZWZpbml0aW9uXHJcbiAgICAgICAgLmNvbnN0YW50KCdfJywgXyk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQVBJIFJlc291cmNlcyBjb25zdGFudHNcclxuICAgICAqL1xyXG4gICAgYW5ndWxhci5tb2R1bGUoXCJhcHAucm91dGVzXCIpXHJcbiAgICAgICAgLmNvbnN0YW50KCdBUElfUk9VVEVTX0NPTkZJRycsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBQ1RJVklUSUVTOiAnYWN0aXZpdGllcydcclxuICAgICAgICB9KTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQVBJIChub24tcm91dGUpIGNvbnN0YW50c1xyXG4gICAgICovXHJcbiAgICBhbmd1bGFyLm1vZHVsZShcImFwcC5yb3V0ZXNcIilcclxuICAgICAgICAuY29uc3RhbnQoJ0FQSV9DT05GSUcnLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQkFTRV9ST1VURTogJ2FwaSdcclxuICAgICAgICB9KTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV3JhcCBtb21lbnQgYXMgYW4gYW5ndWxhciBkZXBlbmRlbmN5XHJcbiAgICAgKiB3aGlsc3Qgc2V0dGluZyB0aGUgZGVmYXVsdCB0aW1lem9uZSBmb3IgYW5ndWxhclxyXG4gICAgICogbW9tZW50XHJcbiAgICAgKi9cclxuICAgIGFuZ3VsYXIubW9kdWxlKFwidXRpbGl0aWVzLmRhdGV0aW1lXCIpXHJcbiAgICAgICAgLmNvbnN0YW50KCdtb21lbnQnLCBtb21lbnQpXHJcbiAgICAgICAgLmNvbnN0YW50KCdhbmd1bGFyTW9tZW50Q29uZmlnJywge1xyXG4gICAgICAgICAgICB0aW1lem9uZTogJ0FtZXJpY2EvRGV0cm9pdCdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jb25zdGFudCgnVVRDX1RJTUVGT1JNQVQnLCBcIllZWVktTU0tREQgSEg6TU06U1NcIik7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZShcInV0aWxpdGllcy5sb2dnZXJcIilcclxuICAgICAgICAuY29uc3RhbnQoJ3RvYXN0cicsIHRvYXN0cik7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNjaGVkdWxlJ3MgYWJzdHJhY3Qgcm9vdCByb3V0ZVxyXG4gICAgICovXHJcbiAgICBhbmd1bGFyLm1vZHVsZShcImpwLnNjaGVkdWxlLnJvdXRlc1wiKVxyXG4gICAgICAgIC5jb25zdGFudCgnU0NIRURVTEVfUk9PVF9ST1VURScsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcclxuICAgICAgICAgICAgbmFtZTogJ3NjaGVkdWxlJyxcclxuICAgICAgICAgICAgdXJsOiAnL3NjaGVkdWxlJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwL2NvbXBvbmVudHMvc2NoZWR1bGUvbGF5b3V0L3NjaGVkdWxlL3NjaGVkdWxlLWJhc2UtbGF5b3V0Lmh0bWxcIlxyXG4gICAgICAgIH0pO1xyXG59KSgpOyIsIlxyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb3JlIG1vZHVsZSBjb25maWd1cmF0aW9uXHJcbiAgICAgKi9cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAuY29yZScpXHJcbiAgICAgICAgLmNvbmZpZyh0b2FzdHJDb25maWcpXHJcbiAgICAgICAgLmNvbmZpZyhsb2dQcm92aWRlckNvbmZpZylcclxuICAgICAgICAuY29uZmlnKGV4Y2VwdGlvbkhhbmRsZXJQcm92aWRlckNvbmZpZylcclxuICAgICAgICAuY29uZmlnKG1kVGhlbWluZ1Byb3ZpZGVyQ29uZmlnKVxyXG4gICAgICAgIC5jb25maWcoaHR0cFByb3ZpZGVyQ29uZmlnKVxyXG4gICAgICAgIC5ydW4oaW5pdENvcmVDb21wb25lbnRzKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRvYXN0ciBDb25maWd1cmF0aW9uXHJcbiAgICAgKiBAcGFyYW0gdG9hc3RyXHJcbiAgICAgKiBAbmdJbmplY3RcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gdG9hc3RyQ29uZmlnKHRvYXN0cikge1xyXG4gICAgICAgIHRvYXN0ci5vcHRpb25zLnRpbWVPdXQgPSA0MDAwO1xyXG4gICAgICAgIHRvYXN0ci5vcHRpb25zLnBvc2l0aW9uQ2xhc3MgPSAndG9hc3QtYm90dG9tLXJpZ2h0JztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvZyBQcm92aWRlciBDb25maWd1cmF0aW9uXHJcbiAgICAgKiBAcGFyYW0gJGxvZ1Byb3ZpZGVyXHJcbiAgICAgKiBAbmdJbmplY3RcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gbG9nUHJvdmlkZXJDb25maWcoJGxvZ1Byb3ZpZGVyKSB7XHJcbiAgICAgICAgaWYgKCRsb2dQcm92aWRlci5kZWJ1Z0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgJGxvZ1Byb3ZpZGVyLmRlYnVnRW5hYmxlZCh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeGNlcHRpb24gSGFuZGxlciBQcm92aWRlciBjb25maWd1cmF0aW9uXHJcbiAgICAgKiBAcGFyYW0gZXhjZXB0aW9uSGFuZGxlclByb3ZpZGVyXHJcbiAgICAgKiBAbmdJbmplY3RcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZXhjZXB0aW9uSGFuZGxlclByb3ZpZGVyQ29uZmlnKGV4Y2VwdGlvbkhhbmRsZXJQcm92aWRlcikge1xyXG4gICAgICAgIGV4Y2VwdGlvbkhhbmRsZXJQcm92aWRlci5jb25maWd1cmUoJ1tORy1KUCBFcnJvcl0gJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQG5nSW5qZWN0XHJcbiAgICBmdW5jdGlvbiBtZFRoZW1pbmdQcm92aWRlckNvbmZpZygkbWRUaGVtaW5nUHJvdmlkZXIpIHtcclxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2RvY3MtZGFyaycsICdkZWZhdWx0JylcclxuICAgICAgICAgICAgLmRhcmsoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAbmdJbmplY3RcclxuICAgIGZ1bmN0aW9uIGh0dHBQcm92aWRlckNvbmZpZygkaHR0cFByb3ZpZGVyKSB7XHJcbiAgICAgICAgJGh0dHBQcm92aWRlci5kZWZhdWx0cy51c2VYRG9tYWluID0gdHJ1ZTtcclxuICAgICAgICBkZWxldGUgJGh0dHBQcm92aWRlci5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsnWC1SZXF1ZXN0ZWQtV2l0aCddO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbHppZSBjb3JlIGNvbXBvbmVudHNcclxuICAgICAqIEBwYXJhbSByb3V0ZXJTZXJ2aWNlXHJcbiAgICAgKiBAbmdJbmplY3RcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gaW5pdENvcmVDb21wb25lbnRzKHJvdXRlclNlcnZpY2UpIHtcclxuXHJcbiAgICB9XHJcblxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBcHAgcm91dGUgY29uZmlndXJhdGlvblxyXG4gICAgICovXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwLnJvdXRlcycpXHJcbiAgICAgICAgLmNvbmZpZyhyb3V0ZUNvbmZpZyk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVSS1Sb3V0ZXIgc3RhdGUgY29uZmlndXJhdGlvbi5cclxuICAgICAqIEZlYXR1cmUgcm9vdCAoYWJzdHJhY3QpIHJvdXRlcyBhcmUgYWxzbyBpbmNsdWRlZC5cclxuICAgICAqIEBwYXJhbSAkc3RhdGVQcm92aWRlclxyXG4gICAgICogQHBhcmFtICR1cmxSb3V0ZXJQcm92aWRlclxyXG4gICAgICogQHBhcmFtICRsb2NhdGlvblByb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0gU0NIRURVTEVfUk9PVF9ST1VURSBOb3RlIHRoYXQgdGhpcyBpcyBwYXJlbnRsZXNzLlxyXG4gICAgICogQG5nSW5qZWN0XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHJvdXRlQ29uZmlnKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyLCBTQ0hFRFVMRV9ST09UX1JPVVRFKVxyXG4gICAge1xyXG4gICAgICAgIC8vIFVzZSBoYXNoYmFuZyBtb2RlIGZvciBzZW8gcHVycG9zZXNcclxuICAgICAgICAkbG9jYXRpb25Qcm92aWRlci5oYXNoUHJlZml4KCchJyk7XHJcblxyXG4gICAgICAgIC8vIERlZmF1bHQgcm91dGUgYnJpbmdzIHVzZXJzIHRvIGFjdGl2aXRpZXNcclxuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXJcclxuICAgICAgICAgICAgLm90aGVyd2lzZSgnL3NjaGVkdWxlL2FjdGl2aXRpZXMnKTtcclxuXHJcbiAgICAgICAgLy8gRGVmaW5lIFJvb3QgUGFyZW50c1xyXG4gICAgICAgIFNDSEVEVUxFX1JPT1RfUk9VVEVbJ3BhcmVudCddID0gJyc7XHJcblxyXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAgIC8vIExvY2FsIFJvdXRlc1xyXG4gICAgICAgICAgICAvLyBGZWF0dXJlIFJvdXRlc1xyXG4gICAgICAgICAgICAuc3RhdGUoU0NIRURVTEVfUk9PVF9ST1VURSk7XHJcbiAgICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCd1dGlsaXRpZXMuZGF0ZXRpbWUnKVxyXG4gICAgICAgIC5jb25maWcoZGF0ZXRpbWVDb25maWcpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uZmlndXJlIGRhdGUgdGltZSBjb25maWd1cmF0aW9uLCBBbWVyaWNhL0RldHJvaXQgaGFzIHNhbWUgdGltZXpvbmUgYXMgdG9yb250b1xyXG4gICAgICogQHBhcmFtIG1vbWVudFxyXG4gICAgICogQG5nSW5qZWN0XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGRhdGV0aW1lQ29uZmlnKG1vbWVudClcclxuICAgIHtcclxuICAgICAgICAvLyBNYWtlIHN1cmUgbW9tZW50IGlzIGluIGVuZ2xpc2ggYW5kIHRoZSBmaXJzdCBkYXkgb2Ygd2VlayBpcyBhIG1vbmRheVxyXG4gICAgICAgIG1vbWVudC5sYW5nKCdlbicsIHtcclxuICAgICAgICAgICAgLy8gY3VzdG9taXphdGlvbnMuXHJcbiAgICAgICAgICAgIHdlZWs6IHtcclxuICAgICAgICAgICAgICAgIGRvdzogMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjYWxlbmRhcjoge1xyXG4gICAgICAgICAgICAgICAgbGFzdERheTogJ1tZZXN0ZXJkYXldLCBkZGRkIE1NTSBEJyxcclxuICAgICAgICAgICAgICAgIHNhbWVEYXkgOiAnW1RvZGF5XSwgZGRkZCBNTU0gRCcsXHJcbiAgICAgICAgICAgICAgICBuZXh0RGF5IDogJ1tUb21vcnJvd10sIGRkZGQgTU1NIEQnLFxyXG4gICAgICAgICAgICAgICAgbGFzdFdlZWsgOiAnZGRkZCwgTU1NIEQnLFxyXG4gICAgICAgICAgICAgICAgbmV4dFdlZWsgOiAnZGRkZCwgTU1NIEQnLFxyXG4gICAgICAgICAgICAgICAgc2FtZUVsc2UgOiAnZGRkZCwgTU1NIEQnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gQWRkIEFtZXJpY2EvRGV0cm9pdCB0aW1lem9uZSwgbm90ZSB0aGF0IHRoaXMgaXMgdGhlIHNhbWUgYXMgVG9yb250b1xyXG4gICAgICAgIG1vbWVudC50ei5hZGQoXHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICdBbWVyaWNhL0RldHJvaXR8RVNUIEVEVHw1MCA0MHwwMTAxMDEwMTAxMDEwMTAxMDEwMTAxMHwxQlFUMCAxemIwIE9wMCAxemIwIE9wMCAxemIwIE9wMCAxemIwIE9wMCAxemIwIE9wMCAxemIwIFJkMCAxemIwIE9wMCAxemIwIE9wMCAxemIwIE9wMCAxemIwIE9wMCAxemIwJyxcclxuICAgICAgICAgICAgICAgIFwiRXRjL1VUQ3xVVEN8MHwwfFwiXHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3V0aWxpdGllcy5nb29nbGVhbmFseXRpY3MnKVxyXG4gICAgICAgIC5ydW4ocnVuKTtcclxuXHJcbiAgICBmdW5jdGlvbiBydW4oKVxyXG4gICAge1xyXG4gICAgICAgIChmdW5jdGlvbihpLHMsbyxnLHIsYSxtKXtpWydHb29nbGVBbmFseXRpY3NPYmplY3QnXT1yO2lbcl09aVtyXXx8ZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgKGlbcl0ucT1pW3JdLnF8fFtdKS5wdXNoKGFyZ3VtZW50cyl9LGlbcl0ubD0xKm5ldyBEYXRlKCk7YT1zLmNyZWF0ZUVsZW1lbnQobyksXHJcbiAgICAgICAgICAgIG09cy5nZXRFbGVtZW50c0J5VGFnTmFtZShvKVswXTthLmFzeW5jPTE7YS5zcmM9ZzttLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGEsbSlcclxuICAgICAgICB9KSh3aW5kb3csZG9jdW1lbnQsJ3NjcmlwdCcsJy8vd3d3Lmdvb2dsZS1hbmFseXRpY3MuY29tL2FuYWx5dGljcy5qcycsJ2dhJyk7XHJcblxyXG4gICAgICAgIGdhKCdjcmVhdGUnLCAnVUEtNTQ1NTM2MTItMScsICdhdXRvJyk7XHJcbiAgICAgICAgZ2EoJ3JlcXVpcmUnLCAnZGlzcGxheWZlYXR1cmVzJyk7XHJcbiAgICB9XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNjaGVkdWxlIHJvdXRlIGNvbmZpZ3VyYXRpb25cclxuICAgICAqL1xyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2pwLnNjaGVkdWxlLnJvdXRlcycpXHJcbiAgICAgICAgLmNvbmZpZyhzY2hlZHVsZVJvdXRlQ29uZmlnKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJvdXRlIGNvbmZpZ3VyYXRpb24sXHJcbiAgICAgKiB1c2VzIFNDSEVEVUxFX1JPT1RfUk9VVEUgYXMgYWJzdHJhY3QgcGFyZW50IHN0YXRlXHJcbiAgICAgKiBAcGFyYW0gJHN0YXRlUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSBTQ0hFRFVMRV9ST09UX1JPVVRFXHJcbiAgICAgKiBAbmdJbmplY3RcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gc2NoZWR1bGVSb3V0ZUNvbmZpZygkc3RhdGVQcm92aWRlciwgU0NIRURVTEVfUk9PVF9ST1VURSlcclxuICAgIHtcclxuICAgICAgICAvLyBQYXJlbnQgU3RhdGUncyBuYW1lIHRvIGJlIGluY2x1ZGVkIGluIGV2ZXJ5IHN0YXRlXHJcbiAgICAgICAgdmFyIHBhcmVudCA9IFNDSEVEVUxFX1JPT1RfUk9VVEUubmFtZTtcclxuXHJcbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgLy8gTG9jYWwgcm91dGVzXHJcbiAgICAgICAgICAgIC5zdGF0ZShwYXJlbnQrJy5hY3Rpdml0aWVzJywge1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnL2FjdGl2aXRpZXMnLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwL2NvbXBvbmVudHMvc2NoZWR1bGUvbGF5b3V0L2FjdGl2aXRpZXMvYWN0aXZpdGllcy1sYXlvdXQuaHRtbFwiLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogXCJBY3Rpdml0aWVzTGF5b3V0Q3RybFwiLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlckFzOiBcInZtXCIsXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZpdGllc0RhdGFTZXJ2aWNlOiBnZXRBY3Rpdml0eURhdGFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXRlKHBhcmVudCsnLnNlc3Npb25zJywge1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnL3Nlc3Npb25zL3thY3Rpdml0eUlkfScsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJhcHAvY29tcG9uZW50cy9zY2hlZHVsZS9sYXlvdXQvYWN0aXZpdHktc2Vzc2lvbnMvYWN0aXZpdHktc2Vzc2lvbnMtbGF5b3V0Lmh0bWxcIixcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6IFwiQWN0aXZpdHlTZXNzaW9uTGF5b3V0Q29udHJvbGxlclwiLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlckFzOiBcInZtXCIsXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZpdHlTZXNzaW9uc0RhdGE6IGdldEFjdGl2aXR5U2Vzc2lvbnNEYXRhXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBSb3V0ZSBSZXNvbHZlc1xyXG5cclxuICAgICAgICAvKiBAbmdJbmplY3QgKi9cclxuICAgICAgICBmdW5jdGlvbiBnZXRBY3Rpdml0eURhdGEoc2NoZWR1bGVCYXNlTGF5b3V0RGF0YVNlcnZpY2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNjaGVkdWxlQmFzZUxheW91dERhdGFTZXJ2aWNlLmxvYWQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qIEBuZ0luamVjdCAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldEFjdGl2aXR5U2Vzc2lvbnNEYXRhKGFjdGl2aXR5U2Vzc2lvbnNMYXlvdXREYXRhU2VydmljZSwgJHN0YXRlUGFyYW1zKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhY3Rpdml0eVNlc3Npb25zTGF5b3V0RGF0YVNlcnZpY2UubG9hZCgkc3RhdGVQYXJhbXNbJ2FjdGl2aXR5SWQnXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcblxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2pwLnNjaGVkdWxlLmxheW91dHMnKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCdBY3Rpdml0aWVzTGF5b3V0Q3RybCcsIEFjdGl2aXRpZXNMYXlvdXRDdHJsKTtcclxuXHJcbiAgICAvKiBAbmdJbmplY3QgKi9cclxuICAgIGZ1bmN0aW9uIEFjdGl2aXRpZXNMYXlvdXRDdHJsKGFjdGl2aXRpZXNEYXRhU2VydmljZSlcclxuICAgIHtcclxuICAgICAgICB2YXIgdm0gPSB0aGlzO1xyXG5cclxuICAgICAgICBhY3RpdmF0ZSgpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcclxuICAgICAgICAgICAgdm0uYWN0aXZpdGllcyA9IGFjdGl2aXRpZXNEYXRhU2VydmljZS5kcm9waW5BY3Rpdml0aWVzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdqcC5zY2hlZHVsZS5sYXlvdXRzJylcclxuICAgICAgICAuY29udHJvbGxlcignQWN0aXZpdHlTZXNzaW9uTGF5b3V0Q29udHJvbGxlcicsIEFjdGl2aXR5U2Vzc2lvbkxheW91dENvbnRyb2xsZXIpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWVkaWF0ZXMgZGF0YSB0byB1bmRlcmx5aW5nIGxheW91dCwgYWN0aXZpdHlTZXNzaW9uc0RhdGEgY29udGFpbnM6XHJcbiAgICAgKiB7XHJcbiAgICAgKiAgICAgIGFjdGl2aXR5OiAnc3RyaW5nJyxcclxuICAgICAqICAgICAgYWN0aXZpdHlTZXNzaW9uOiBbIHsgZGF0ZTogbW9tZW50LCBzZXNzaW9uczogWyBzZXNzaW9uLCBzZXNzaW9uIF0gXVxyXG4gICAgICogfVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBhY3Rpdml0eVNlc3Npb25zRGF0YVxyXG4gICAgICogQHBhcmFtIGxvZ2dlclNlcnZpY2VcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICogQG5nSW5qZWN0XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIEFjdGl2aXR5U2Vzc2lvbkxheW91dENvbnRyb2xsZXIoYWN0aXZpdHlTZXNzaW9uc0RhdGEsIGxvZ2dlclNlcnZpY2UsICRzdGF0ZVBhcmFtcylcclxuICAgIHtcclxuXHJcbiAgICAgICAgdmFyIHZtID0gdGhpcztcclxuXHJcbiAgICAgICAgYWN0aXZhdGUoKTtcclxuXHJcbiAgICAgICAgLy9cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWN0aXZhdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdm0uYWN0aXZpdHlTZXNzaW9ucyA9IGFjdGl2aXR5U2Vzc2lvbnNEYXRhLmFjdGl2aXR5U2Vzc2lvbnNUaGlzV2VlaztcclxuICAgICAgICAgICAgdm0uYWN0aXZpdHlMYWJlbCA9IGFjdGl2aXR5U2Vzc2lvbnNEYXRhLmFjdGl2aXR5LmFjdGl2aXR5O1xyXG4gICAgICAgICAgICB2bS5hY3Rpdml0eUNhdGVnb3J5ID0gYWN0aXZpdHlTZXNzaW9uc0RhdGEuYWN0aXZpdHkuY2F0ZWdvcnk7XHJcbiAgICAgICAgICAgIHZtLmFjdGl2aXR5SXNXb21lbk9ubHkgPSBhY3Rpdml0eVNlc3Npb25zRGF0YS5hY3Rpdml0eS53b21lbl9vbmx5O1xyXG5cclxuICAgICAgICAgICAgLy8gU2hvdyBhIHRvYXN0IGZvciB0aGVtIHRvIGFkZCB0byBob21lc2NyZWVuXHJcbi8qICAgICAgICAgICAgbG9nZ2VyU2VydmljZS5pbmZvKFwiU2F2ZSBhcHAgb250byB5b3VyIHBob25lOiBcIiArXHJcbiAgICAgICAgICAgIFwiQ2xpY2sgU2V0dGluZ3MgPiBBZGQgdG8gSG9tZSBTY3JlZW5cIiwgXCJ0aXRsZVwiKTsqL1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgndXRpbGl0aWVzLmFwaScpXHJcbiAgICAgICAgLmZhY3RvcnkoJ2FwaVRyYW5zZm9ybWVyU2VydmljZScsIGFwaVRyYW5zZm9ybWVyU2VydmljZSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVdGlsaXR5IGZ1bmN0aW9ucyB0byB0cmFuc2Zvcm0gQVBJIGNhbGxzXHJcbiAgICAgKiBAcmV0dXJucyB7e3Byb3A6IHByb3B9fVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBhcGlUcmFuc2Zvcm1lclNlcnZpY2UoRGF0ZVRpbWVTZXJ2aWNlLCBVVENfVElNRUZPUk1BVClcclxuICAgIHtcclxuICAgICAgICB2YXIgc2VydmljZSA9IHtcclxuICAgICAgICAgICAgcmVwbGFjZURhdGVUaW1lOiByZXBsYWNlRGF0ZVRpbWVcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gc2VydmljZTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVwbGFjZXMgYWxsIE15U1FMIERhdGVUaW1lIHN0cmluZ3MgaW4gYSBKU09OIG9iamVjdC9hcnJheVxyXG4gICAgICAgICAqIEBwYXJhbSBvYmpcclxuICAgICAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiByZXBsYWNlRGF0ZVRpbWUob2JqKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqID09PSBcInN0cmluZ1wiIHx8IG9iaiBpbnN0YW5jZW9mIFN0cmluZylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gU1FMIFRpbWUgbWF0Y2hpbmcgcGF0dGVyblxyXG4gICAgICAgICAgICAgICAgdmFyIHBhdHRlcm4gPSAvWzAtOV17NH0tWzAtMV17MX1bMC05XXsxfS1bMC0zXXsxfVswLTldezF9IFswLTJdezF9WzAtOV17MX06WzAtNV17MX1bMC05XXsxfTpbMC01XXsxfVswLTldezF9LztcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGF0dGVybi50ZXN0KG9iaikpIHsgIC8vIGQudmFsdWVPZigpIGNvdWxkIGFsc28gd29ya1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRhdGUgaXMgdmFsaWRcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gRGF0ZVRpbWVTZXJ2aWNlLnBhcnNlVVRDKG9iaik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBkYXRlIGlzIG5vdCB2YWxpZFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAob2JqLmNvbnN0cnVjdG9yID09PSBBcnJheSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNsb25lZE9iaiA9IFtdO1xyXG4gICAgICAgICAgICAgICAgLy8gRm9yIGVhY2ggaXRlbSwgd2UgcmVhc3NpZ24gJiByZWN1cnNpdmVseSBjYWxsIHJlcGxhY2VEYXRlVGltZVxyXG4gICAgICAgICAgICAgICAgb2JqLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgsIGFycmF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvbmVkT2JqLnB1c2gocmVwbGFjZURhdGVUaW1lKGVsZW1lbnQpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNsb25lZE9iajtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBPYmplY3QpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBjbG9uZWRPYmogPSB7fTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHByb3AgaW4gb2JqKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocHJvcCkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9uZWRPYmpbcHJvcF0gPSByZXBsYWNlRGF0ZVRpbWUob2JqW3Byb3BdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2xvbmVkT2JqO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3V0aWxpdGllcy5hcGknKVxyXG4gICAgICAgIC5mYWN0b3J5KCdhcGlTZXJ2aWNlJywgYXBpRmFjdG9yeSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXcmFwcGVyIGFyb3VuZCAkaHR0cCB0aGF0IGFjdHMgYXMgdGhlIGRhdGEgcHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSAkaHR0cCAtIGh0dHAgY2xpZW50XHJcbiAgICAgKiBAcGFyYW0gQVBJX0NPTkZJRyAtIEFQSSBjb25zdGFudHNcclxuICAgICAqIEByZXR1cm5zIHt7Z2V0OiBnZXQsIHBvc3Q6IHBvc3R9fSAtIGdldCBhbmQgcG9zdCBzZXJ2aWNlc1xyXG4gICAgICogQG5nSW5qZWN0XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGFwaUZhY3RvcnkoJGh0dHAsIEFQSV9DT05GSUcsIGFwaVRyYW5zZm9ybWVyU2VydmljZSlcclxuICAgIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBnZXQ6IGdldCxcclxuICAgICAgICAgICAgcG9zdDogcG9zdFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRha2VzIGFueSBpbnB1dCBhbmQgY2FsbHMgYSBIVFRQIFBPU1Qgb24gdGhlIGdpdmVuIHJvdXRlXHJcbiAgICAgICAgICogQHBhcmFtIHJvdXRlIC0gUm91dGUgZm9yIHBvc3RpbmdcclxuICAgICAgICAgKiBAcGFyYW0gaW5wdXQgLSBQYXlsb2FkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gcG9zdChyb3V0ZSwgaW5wdXQpIHtcclxuICAgICAgICAgICAgaWYgKCFpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgaW5wdXQgPSB7fTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoQVBJX0NPTkZJRy5CQVNFX1JPVVRFICsgJy8nICsgcm91dGUsIGlucHV0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENhbGxzIGEgSFRUUCBHRVQgb24gdGhlIGdpdmVuIHJvdXRlXHJcbiAgICAgICAgICogQHBhcmFtIHJvdXRlIC0gUm91dGUgdG8gZ2V0XHJcbiAgICAgICAgICogQHJldHVybnMge25nLklQcm9taXNlPFRSZXN1bHQ+fCp9IC0gUHJvbWlzZSBvZiByZXN1bHRzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0KHJvdXRlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cFxyXG4gICAgICAgICAgICAgICAgLmdldChBUElfQ09ORklHLkJBU0VfUk9VVEUgKyAnLycgKyByb3V0ZSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGdldERhdGEpXHJcbiAgICAgICAgICAgICAgICAudGhlbihhcGlUcmFuc2Zvcm1lclNlcnZpY2UucmVwbGFjZURhdGVUaW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldERhdGEocGF5bG9hZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcGF5bG9hZC5kYXRhXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3V0aWxpdGllcy5kYXRldGltZScpXHJcbiAgICAgICAgLmZhY3RvcnkoJ0RhdGVUaW1lU2VydmljZScsIERhdGVUaW1lRmFjdG9yeSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEYXRlIFRpbWUgdXRpbGl0eSBiZWx0IHRoYXQgdXRpbGl6ZXMgbW9tZW50ICYgc3VwcGxpZXMga2V5XHJcbiAgICAgKiB1dGlsaXRpZXMgZm9yIHdvcmtpbmcgd2l0aCBNeVNRTCBEYXRlVGltZSAmIHRpbWUgem9uZSBpc3N1ZXNcclxuICAgICAqIEByZXR1cm5zIHt7bm93OiBub3csIHRvVVRDOiB0b1VUQywgcGFyc2VVVEM6IHBhcnNlVVRDfX1cclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICogQG5nSW5qZWN0XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIERhdGVUaW1lRmFjdG9yeShVVENfVElNRUZPUk1BVCkge1xyXG5cclxuICAgICAgICB2YXIgc2VydmljZSA9IHtcclxuICAgICAgICAgICAgbm93OiBub3csXHJcbiAgICAgICAgICAgIHRvVVRDOiB0b1VUQyxcclxuICAgICAgICAgICAgcGFyc2VVVEM6IHBhcnNlVVRDLFxyXG4gICAgICAgICAgICBnZXREYXlzSW5UaGlzV2VlazogZ2V0RGF5c0luVGhpc1dlZWtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gc2VydmljZTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUHJvdmlkZSBhbiBpbnRlcmZhY2UgdG8gcmV0cmlldmUgYSBtb21lbnQvZGF0ZVxyXG4gICAgICAgICAqIEByZXR1cm5zIG1vbWVudFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIG5vdygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1vbWVudC50eihuZXcgRGF0ZSgpLCAnQW1lcmljYS9EZXRyb2l0Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUcmFuc2Zvcm1zIG1vbWVudCBpbnRvIE15U1FMIGFjY2VwdGFibGUgVVRDIERhdGVUaW1lIG9iamVjdFxyXG4gICAgICAgICAqIEBwYXJhbSBtb21lbnRPYmpcclxuICAgICAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiB0b1VUQyhtb21lbnRPYmopIHtcclxuICAgICAgICAgICAgaWYgKCFtb21lbnQuaXNNb21lbnQobW9tZW50T2JqKSkge1xyXG4gICAgICAgICAgICAgICAgZXhjZXB0aW9uU2VydmljZS5jYXRjaGVyKCdOb24tbW9tZW50IG9iamVjdCBkZXRlY3RlZCcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbW9tZW50T2JqLnR6KFwiRXRjL1VUQ1wiKS5mb3JtYXQoVVRDX1RJTUVGT1JNQVQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVHJhbnNmb3JtcyBNeVNRTCBVVEMgdGltZSBTdHJpbmdzIGludG8gbW9tZW50c1xyXG4gICAgICAgICAqIEBwYXJhbSB1dGNTdHJpbmdcclxuICAgICAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBwYXJzZVVUQyh1dGNTdHJpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1vbWVudC50eih1dGNTdHJpbmcsICdBbWVyaWNhL0RldHJvaXQnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJldHJpZXZlcyBhbiBhcnJheSBvZiBtb21lbnRzIGZvciB0aGlzIHdlZWssXHJcbiAgICAgICAgICogZWFjaCBtb21lbnQgcmVwcmVzZW50cyB0aGUgc3RhcnQgb2YgdGhlIGRheS5cclxuICAgICAgICAgKiBAcmV0dXJuczpcclxuICAgICAgICAgKiBbXHJcbiAgICAgICAgICogICAgICBtb21lbnQsIC8vIE1vbWVudCBmb3IgTW9uZGF5XHJcbiAgICAgICAgICogICAgICBtb21lbnQgLy8gIE1vbWVudCBmb3IgVHVlc2RheVxyXG4gICAgICAgICAqICAgICAgLi4uIC8vIFNvIG9uIHRpbCBTdW5kYXlcclxuICAgICAgICAgKiBdXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0RGF5c0luVGhpc1dlZWsoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBnZXREYXlzSW5XZWVrKG5vdygpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJldHJpZXZlcyBhbiBhcnJheSBvZiBtb21lbnRzIGZvciBhIHdlZWssIHRoZSB3ZWVrIGlzIGJhc2VkXHJcbiAgICAgICAgICogb24gdGhlIGlucHV0dGVkIG1vbWVudFxyXG4gICAgICAgICAqIEBwYXJhbSBkYXlJbldlZWtcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqIFtcclxuICAgICAgICAgKiAgICAgIG1vbWVudCwgLy8gTW9tZW50IGZvciBNb25kYXlcclxuICAgICAgICAgKiAgICAgIG1vbWVudCAvLyAgTW9tZW50IGZvciBUdWVzZGF5XHJcbiAgICAgICAgICogICAgICAuLi4gLy8gU28gb24gdGlsIFN1bmRheVxyXG4gICAgICAgICAqIF1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBnZXREYXlzSW5XZWVrKGRheUluV2Vlaykge1xyXG4gICAgICAgICAgICB2YXIgZmlyc3REYXlPZldlZWsgPSBkYXlJbldlZWsuc3RhcnRPZignd2VlaycpO1xyXG4gICAgICAgICAgICB2YXIgZGF5c0luV2VlayA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA3OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGRheXNJbldlZWsucHVzaChhbmd1bGFyLmNvcHkoZmlyc3REYXlPZldlZWspLmFkZChpLCAnZGF5cycpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRheXNJbldlZWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgndXRpbGl0aWVzLmV4Y2VwdGlvbicpXHJcbiAgICAgICAgLmZhY3RvcnkoJ2V4Y2VwdGlvblNlcnZpY2UnLCBleGNlcHRpb25GYWN0b3J5KTtcclxuXHJcbiAgICAvKiBAbmdJbmplY3QgKi9cclxuICAgIGZ1bmN0aW9uIGV4Y2VwdGlvbkZhY3RvcnkobG9nZ2VyU2VydmljZSkge1xyXG4gICAgICAgIHZhciBzZXJ2aWNlID0ge1xyXG4gICAgICAgICAgICBjYXRjaGVyOiBjYXRjaGVyXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNlcnZpY2U7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENhdGNoZXMgZXhjZXB0aW9ucywgbG9ncyByZWFzb24gaW50byBjb25zb2xlLlxyXG4gICAgICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgICAgICogQHJldHVybnMge0Z1bmN0aW9ufVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGNhdGNoZXIobWVzc2FnZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24ocmVhc29uKSB7XHJcbiAgICAgICAgICAgICAgICBsb2dnZXJTZXJ2aWNlLmVycm9yKG1lc3NhZ2UsIHJlYXNvbik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFdyYXBwZXIgYXJvdW5kIHRvYXN0clxyXG4gICAgICovXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgndXRpbGl0aWVzLmxvZ2dlcicpXHJcbiAgICAgICAgLmZhY3RvcnkoJ2xvZ2dlclNlcnZpY2UnLCBsb2dnZXJGYWN0b3J5KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlYWxzIHdpdGggcmV2ZWFsaW5nICYgbG9nZ2luZy5cclxuICAgICAqIEByZXR1cm5zIHtcclxuICAgICAqIHtzaG93VG9hc3RzOiBib29sZWFuLCBlcnJvcjogZXJyb3IsIGluZm86IGluZm8sIHN1Y2Nlc3M6IHN1Y2Nlc3MsIHdhcm5pbmc6IHdhcm5pbmcsIGxvZzogKCRsb2cubG9nfCopfX1cclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBsb2dnZXJGYWN0b3J5KCRsb2csIHRvYXN0cikge1xyXG4gICAgICAgIHZhciBzZXJ2aWNlID0ge1xyXG4gICAgICAgICAgICBzaG93VG9hc3RzOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgZXJyb3I6IGVycm9yLFxyXG4gICAgICAgICAgICBpbmZvOiBpbmZvLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBzdWNjZXNzLFxyXG4gICAgICAgICAgICB3YXJuaW5nOiB3YXJuaW5nLFxyXG5cclxuICAgICAgICAgICAgbG9nOiAkbG9nLmxvZ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZWQgZXJyb3IgdG9hc3Qgd2l0aCBhIGNyb3NzXHJcbiAgICAgICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAgICAgKiBAcGFyYW0gZGF0YVxyXG4gICAgICAgICAqIEBwYXJhbSB0aXRsZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGVycm9yKG1lc3NhZ2UsIGRhdGEsIHRpdGxlKSB7XHJcbiAgICAgICAgICAgIHRvYXN0ci5lcnJvcihtZXNzYWdlLCB0aXRsZSk7XHJcbiAgICAgICAgICAgICRsb2cuZXJyb3IoJ0Vycm9yOiAnICsgbWVzc2FnZSwgZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBMaWdodCBibHVlIHRvYXN0IHdpdGggZXhjbGFtYXRpb24gbWFya1xyXG4gICAgICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgICAgICogQHBhcmFtIGRhdGFcclxuICAgICAgICAgKiBAcGFyYW0gdGl0bGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBpbmZvKG1lc3NhZ2UsIGRhdGEsIHRpdGxlKSB7XHJcbiAgICAgICAgICAgIHRvYXN0ci5pbmZvKG1lc3NhZ2UsIHRpdGxlKTtcclxuICAgICAgICAgICAgJGxvZy5pbmZvKCdJbmZvOiAnICsgbWVzc2FnZSwgZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHcmVlbiB0b2FzdCB3aXRoIHRpY2tcclxuICAgICAgICAgKiBAcGFyYW0gbWVzc2FnZVxyXG4gICAgICAgICAqIEBwYXJhbSBkYXRhXHJcbiAgICAgICAgICogQHBhcmFtIHRpdGxlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gc3VjY2VzcyhtZXNzYWdlLCBkYXRhLCB0aXRsZSkge1xyXG4gICAgICAgICAgICB0b2FzdHIuc3VjY2VzcyhtZXNzYWdlLCB0aXRsZSk7XHJcbiAgICAgICAgICAgICRsb2cuaW5mbygnU3VjY2VzczogJyArIG1lc3NhZ2UsIGRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVkIHRvYXN0IHdpdGggQ3Jvc3NcclxuICAgICAgICAgKiBAcGFyYW0gbWVzc2FnZVxyXG4gICAgICAgICAqIEBwYXJhbSBkYXRhXHJcbiAgICAgICAgICogQHBhcmFtIHRpdGxlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gd2FybmluZyhtZXNzYWdlLCBkYXRhLCB0aXRsZSkge1xyXG4gICAgICAgICAgICB0b2FzdHIud2FybmluZyhtZXNzYWdlLCB0aXRsZSk7XHJcbiAgICAgICAgICAgICRsb2cud2FybignV2FybmluZzogJyArIG1lc3NhZ2UsIGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3V0aWxpdGllcy5yb3V0ZXInKVxyXG4gICAgICAgIC5mYWN0b3J5KCdyb3V0ZXJTZXJ2aWNlJywgcm91dGVyU2VydmljZSk7XHJcblxyXG4gICAgLyogQG5nSW5qZWN0ICovXHJcbiAgICBmdW5jdGlvbiByb3V0ZXJTZXJ2aWNlKCRzdGF0ZSwgJHJvb3RTY29wZSwgbG9nZ2VyU2VydmljZSkge1xyXG4gICAgICAgIHZhciBoYW5kbGluZ1JvdXRlQ2hhbmdlRXJyb3IgPSBmYWxzZTtcclxuICAgICAgICB2YXIgcm91dGVDb3VudHMgPSB7XHJcbiAgICAgICAgICAgIGVycm9yczogMCxcclxuICAgICAgICAgICAgY2hhbmdlczogMFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIHJvdXRlcyA9IFtdO1xyXG4gICAgICAgIHZhciBnb0RlZmF1bHRTdGF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCRzdGF0ZS4kY3VycmVudCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBnb0RlZmF1bHRTdGF0ZTogZ29EZWZhdWx0U3RhdGVcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgICAgICAgICBoYW5kbGVSb3V0ZUVycm9ycygpO1xyXG4gICAgICAgICAgICBoYW5kbGVSb3V0ZVN1Y2Nlc3NlcygpO1xyXG4gICAgICAgICAgICBoYW5kbGVSb3V0ZU5vdEZvdW5kKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVSb3V0ZU5vdEZvdW5kKCkge1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlTm90Rm91bmQnLFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKGV2ZW50LCB1bmZvdW5kU3RhdGUsIGZyb21TdGF0ZSwgZnJvbVBhcmFtcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChoYW5kbGluZ1JvdXRlQ2hhbmdlRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByb3V0ZUNvdW50cy5lcnJvcnMrKztcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGluZ1JvdXRlQ2hhbmdlRXJyb3IgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBMb2cgU3RhdGUgbm90IGZvdW5kXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1zZyA9ICdbU3RhdGUgbm90IGZvdW5kXSBFcnJvciByb3V0aW5nIHRvICcgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1bmZvdW5kU3RhdGUudG8gKyAnIGZyb20gJyArIGZyb21TdGF0ZS5wYXJlbnQgKyAnLicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmcm9tU3RhdGUubmFtZSArICcuJztcclxuICAgICAgICAgICAgICAgICAgICBsb2dnZXJTZXJ2aWNlLndhcm5pbmcobXNnKTtcclxuICAgICAgICAgICAgICAgICAgICBnb0RlZmF1bHRTdGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVSb3V0ZVN1Y2Nlc3NlcygpIHtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN1Y2Nlc3MnLFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJvdXRlQ291bnRzLmNoYW5nZXMrKztcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGluZ1JvdXRlQ2hhbmdlRXJyb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlUm91dGVFcnJvcnMoKSB7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VFcnJvcicsXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZXZlbnQsIHRvU3RhdGUsIHRvUGFyYW1zLCBmcm9tU3RhdGUsIGZyb21QYXJhbXMsIGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhhbmRsaW5nUm91dGVDaGFuZ2VFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJvdXRlQ291bnRzLmVycm9ycysrO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsaW5nUm91dGVDaGFuZ2VFcnJvciA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIExvZyBTdGF0ZSByb3V0aW5nIGVycm9yXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1zZyA9ICdbU3RhdGUgUm91dGluZyBFcnJvcl0gJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdFcnJvciByb3V0aW5nIHRvICcgKyB0b1N0YXRlLm5hbWUgKyAnIGZyb20gJyArIGZyb21TdGF0ZS5uYW1lICsgJy4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJyBFcnJvcjogJyArIGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlclNlcnZpY2Uud2FybmluZyhtc2csIFtlcnJvcl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGdvRGVmYXVsdFN0YXRlKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdqcC5zY2hlZHVsZS5kYXRhJylcclxuICAgICAgICAuZmFjdG9yeSgnc2NoZWR1bGVTZXJ2aWNlJywgc2NoZWR1bGVGYWN0b3J5KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFByb3ZpZGVzIGFjdGl2aXRpZXMgYW5kIHRoZWlyIGFjdGl2aXR5IHNlc3Npb25zXHJcbiAgICAgKiBAcGFyYW0gYXBpU2VydmljZVxyXG4gICAgICogQHBhcmFtIEFQSV9ST1VURVNfQ09ORklHXHJcbiAgICAgKiBAcGFyYW0gZXhjZXB0aW9uU2VydmljZVxyXG4gICAgICogQHJldHVybnMge3tnZXREcm9waW5zOiBnZXREcm9waW5zLCBnZXRBY3Rpdml0eVNlc3Npb25zOiBnZXRBY3Rpdml0eVNlc3Npb25zfX1cclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBzY2hlZHVsZUZhY3RvcnkoYXBpU2VydmljZSwgQVBJX1JPVVRFU19DT05GSUcsIGV4Y2VwdGlvblNlcnZpY2UsIERhdGVUaW1lU2VydmljZSkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGdldERyb3BpbnM6IGdldERyb3BpbnMsXHJcbiAgICAgICAgICAgIGdldEFjdGl2aXR5OiBnZXRBY3Rpdml0eSxcclxuICAgICAgICAgICAgZ2V0QWN0aXZpdHlTZXNzaW9uczogZ2V0QWN0aXZpdHlTZXNzaW9ucyxcclxuICAgICAgICAgICAgam9pbkFjdGl2aXR5U2Vzc2lvbjogam9pbkFjdGl2aXR5U2Vzc2lvblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJldHJpZXZlcyBhbGwgYWN0aXZpdHkgc2Vzc2lvbnMgZm9yIGEgZ2l2ZW4gYWN0aXZpdHlcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSBhY3Rpdml0eUlkIC0gQWN0aXZpdHkgSWRcclxuICAgICAgICAgKiBAcmV0dXJucyB7bmcuSVByb21pc2U8VFJlc3VsdD58Kn0gLSBQcm9taXNlIG9mIGFjdGl2aXR5IHNlc3Npb25zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0QWN0aXZpdHlTZXNzaW9ucyhhY3Rpdml0eUlkLCB3ZWVrcykge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGFwaVNlcnZpY2VcclxuICAgICAgICAgICAgICAgIC5nZXQoQVBJX1JPVVRFU19DT05GSUcuQUNUSVZJVElFUyArICcvJyArIGFjdGl2aXR5SWQrJy9zZXNzaW9ucy8nKyB3ZWVrcylcclxuICAgICAgICAgICAgICAgIC50aGVuKGdyb3VwQnlEYXlPZldlZWspXHJcbiAgICAgICAgICAgICAgICAudGhlbihjb252ZXJ0SXNXb21lbkJvb2xlYW4pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXhjZXB0aW9uU2VydmljZS5jYXRjaGVyKCdYSFIgRmFpbGVkIGZvciBnZXRBY3Rpdml0eVNlc3Npb25zJykpO1xyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEZvcm1hdCBhY3Rpdml0eSBzZXNzaW9ucyBieSBkYXkgb2Ygd2Vla1xyXG4gICAgICAgICAgICAgKiBAcGFyYW0gYWN0aXZpdHlTZXNzaW9uc1xyXG4gICAgICAgICAgICAgKiBAcmV0dXJucyBbXHJcbiAgICAgICAgICAgICAqICAgICAge1xyXG4gICAgICAgICAgICAgKiAgICAgICAgICBkYXRlOiBtb21lbnQsIC8vIFRoZXNlIGRheXMgYXJlIHVuaXF1ZSBkYXlzXHJcbiAgICAgICAgICAgICAqICAgICAgICAgIHNlc3Npb25zOiBbXHJcbiAgICAgICAgICAgICAqICAgICAgICAgICAgICBhY3Rpdml0eXNlc3Npb24sXHJcbiAgICAgICAgICAgICAqICAgICAgICAgICAgICAuLi5cclxuICAgICAgICAgICAgICogICAgICAgICAgXVxyXG4gICAgICAgICAgICAgKiAgICAgIH0sXHJcbiAgICAgICAgICAgICAqICAgICAgLi4uXHJcbiAgICAgICAgICAgICAqIF1cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdyb3VwQnlEYXlPZldlZWsoYWN0aXZpdHlTZXNzaW9ucykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGVQcm9wZXJ0eSA9ICdkYXRlJztcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZWR1Y2UgYWN0aXZpdHkgc2Vzc2lvbnNcclxuICAgICAgICAgICAgICAgIGFjdGl2aXR5U2Vzc2lvbnMgPSBfXHJcbiAgICAgICAgICAgICAgICAgICAgLmNoYWluKGFjdGl2aXR5U2Vzc2lvbnMpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlZHVjZShmdW5jdGlvbihkaWN0LCBhY3Rpdml0eVNlc3Npb24pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZXNzaW9uRGF0ZSA9IGFjdGl2aXR5U2Vzc2lvblsnZGF0ZSddLnN0YXJ0T2YoJ2RheScpLmZvcm1hdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF8uaGFzKGRpY3QsIHNlc3Npb25EYXRlKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQXBwZW5kIGFjdGl2aXR5IHNlc3Npb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpY3Rbc2Vzc2lvbkRhdGVdWydzZXNzaW9ucyddLnB1c2goYWN0aXZpdHlTZXNzaW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhIGtleSBmb3IgYSBuZXcgZGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGljdFtzZXNzaW9uRGF0ZV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZTogYWN0aXZpdHlTZXNzaW9uWydkYXRlJ10uc3RhcnRPZignZGF5JyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vzc2lvbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZpdHlTZXNzaW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGljdDtcclxuICAgICAgICAgICAgICAgICAgICB9LCB7fSlcclxuICAgICAgICAgICAgICAgICAgICAudG9BcnJheSgpXHJcbiAgICAgICAgICAgICAgICAgICAgLnZhbHVlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjdGl2aXR5U2Vzc2lvbnM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJldHJpZXZlcyBBY3Rpdml0eSBvYmplY3QgZ2l2ZW4gYW4gYWN0aXZpdHkgSWRcclxuICAgICAgICAgKiBAcGFyYW0gYWN0aXZpdHlJZFxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICoge1xyXG4gICAgICAgICAqICAgICAgIFwiaWRcIjo4LFxyXG4gICAgICAgICAqICAgICAgIFwiYWN0aXZpdHlcIjpcIkJhZG1pbnRvblwiLFxyXG4gICAgICAgICAqICAgICAgXCJjYXRlZ29yeVwiOlwiRHJvcCBJblwiLFxyXG4gICAgICAgICAqICAgICAgXCJ3b21lbl9vbmx5XCI6MCxcclxuICAgICAgICAgKiAgICAgIFwiY3JlYXRlZF9hdFwiOlwiMjAxNC0xMi0xNCAxNjo1MToyNVwiLFxyXG4gICAgICAgICAqICAgICAgXCJ1cGRhdGVkX2F0XCI6XCIyMDE0LTEyLTE0IDE2OjUxOjI1XCJcclxuICAgICAgICAgKiB9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0QWN0aXZpdHkoYWN0aXZpdHlJZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBhcGlTZXJ2aWNlXHJcbiAgICAgICAgICAgICAgICAuZ2V0KEFQSV9ST1VURVNfQ09ORklHLkFDVElWSVRJRVMgICsgJy8nICsgYWN0aXZpdHlJZClcclxuICAgICAgICAgICAgICAgIC5jYXRjaChleGNlcHRpb25TZXJ2aWNlLmNhdGNoZXIoJ1hIUiBGYWlsZWQgZm9yIGdldEFjdGl2aXR5U2Vzc2lvbnMnKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXRyaWV2ZXMgYWxsIGRyb3BpbiBhY3Rpdml0aWVzXHJcbiAgICAgICAgICogQHJldHVybnMge25nLklQcm9taXNlPFRSZXN1bHQ+fCp9IC0gUHJvbWlzZSBvZiBhY3Rpdml0aWVzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0RHJvcGlucygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFwaVNlcnZpY2VcclxuICAgICAgICAgICAgICAgIC5nZXQoQVBJX1JPVVRFU19DT05GSUcuQUNUSVZJVElFUylcclxuICAgICAgICAgICAgICAgIC50aGVuKGdldERyb3BpbnNDb21wbGV0ZSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGNvbnZlcnRJc1dvbWVuQm9vbGVhbilcclxuICAgICAgICAgICAgICAgIC5jYXRjaChleGNlcHRpb25TZXJ2aWNlLmNhdGNoZXIoJ1hIUiBGYWlsZWQgZm9yIGdldERyb3BpbnMnKSk7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXREcm9waW5zQ29tcGxldGUoYWN0aXZpdGllcykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjdGl2aXRpZXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEhFTFBFUiBGVU5DVElPTlNcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ29udmVydHMgd29tZW5fb25seSBib29sZWFuIHZhbHVlIGZyb20gMCwxIHRvIGZhbHNlLCB0cnVlXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0gY29sbGVjdGlvblxyXG4gICAgICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGNvbnZlcnRJc1dvbWVuQm9vbGVhbihjb2xsZWN0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXy5mb3JFYWNoKGNvbGxlY3Rpb24sIGZ1bmN0aW9uKGVsKSB7XHJcbiAgICAgICAgICAgICAgICBlbC53b21lbl9vbmx5ID0gZWwud29tZW5fb25seSAhPT0gMDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29sbGVjdGlvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGpvaW5BY3Rpdml0eVNlc3Npb24oYWN0aXZpdHlJZCwgc2Vzc2lvbklkLCBuYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFwaVNlcnZpY2VcclxuICAgICAgICAgICAgICAgIC5wb3N0KEFQSV9ST1VURVNfQ09ORklHLkFDVElWSVRJRVNcclxuICAgICAgICAgICAgICAgICthY3Rpdml0eUlkKycvc2Vzc2lvbnMvJytzZXNzaW9uSWQrJy9wYXJ0aWNpcGFudHMnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogbmFtZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEYXRhIFNlcnZpY2Ugb2JqZWN0IHRvIHJldHJpZXZlIGRhdGEgZm9yXHJcbiAgICAgKiBzY2hlZHVsZS1iYXNlLWxheW91dCBDb250cm9sbGVyXHJcbiAgICAgKi9cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdqcC5zY2hlZHVsZS5sYXlvdXRzJylcclxuICAgICAgICAuZmFjdG9yeSgnc2NoZWR1bGVCYXNlTGF5b3V0RGF0YVNlcnZpY2UnLCBzY2hlZHVsZUJhc2VMYXlvdXREYXRhRmFjdG9yeSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZXMgZGF0YSBmb3Igc2NoZWR1bGUtYmFzZS1sYXlvdXQgQ29udHJvbGxlclxyXG4gICAgICogQHJldHVybnMge3tsb2FkOiBsb2FkfX1cclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBzY2hlZHVsZUJhc2VMYXlvdXREYXRhRmFjdG9yeSgkcSwgc2NoZWR1bGVTZXJ2aWNlKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGxvYWQ6IGxvYWRcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBMb2FkcyBhbGwgZGF0YSBpbnRvIHRoaXMuZGF0YSBhbmQgcmV0dXJucyBhIHByb21pc2VcclxuICAgICAgICBmdW5jdGlvbiBsb2FkKCkge1xyXG4gICAgICAgICAgICB2YXIgZHJvcGluQWN0aXZpdGllcyA9IHNjaGVkdWxlU2VydmljZS5nZXREcm9waW5zKCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gJHEuYWxsKFtkcm9waW5BY3Rpdml0aWVzXSkudGhlbihcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHJlc3VsdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9waW5BY3Rpdml0aWVzOiByZXN1bHRzWzBdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERhdGEgU2VydmljZSBvYmplY3QgdG8gcmV0cmlldmUgZGF0YSBmb3JcclxuICAgICAqIGFjdGl2aXR5LXNlc3Npb25zLWxheW91dCBDb250cm9sbGVyXHJcbiAgICAgKi9cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdqcC5zY2hlZHVsZS5sYXlvdXRzJylcclxuICAgICAgICAuZmFjdG9yeSgnYWN0aXZpdHlTZXNzaW9uc0xheW91dERhdGFTZXJ2aWNlJywgYWN0aXZpdHlTZXNzaW9uc0xheW91dERhdGFGYWN0b3J5KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlcyBkYXRhIGZvciBhY3Rpdml0eS1zZXNzaW9ucy1sYXlvdXQgQ29udHJvbGxlclxyXG4gICAgICogQHBhcmFtICRxLFxyXG4gICAgICogQHJldHVybnMge3thY3Rpdml0eVNlc3Npb25zOiBhY3Rpdml0eVNlc3Npb25zfX1cclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBhY3Rpdml0eVNlc3Npb25zTGF5b3V0RGF0YUZhY3RvcnkoJHEsIHNjaGVkdWxlU2VydmljZSlcclxuICAgIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBsb2FkOiBsb2FkXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gbG9hZChhY3Rpdml0eUlkKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IFtcclxuICAgICAgICAgICAgICAgIGxvYWRBY3Rpdml0eVNlc3Npb25zKGFjdGl2aXR5SWQpLFxyXG4gICAgICAgICAgICAgICAgbG9hZEFjdGl2aXR5KGFjdGl2aXR5SWQpXHJcbiAgICAgICAgICAgIF07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gJHEuYWxsKGRhdGEpLnRoZW4oXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbihyZXN1bHRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5U2Vzc2lvbnNUaGlzV2VlazogcmVzdWx0c1swXSxcclxuICAgICAgICAgICAgICAgICAgICAgICBhY3Rpdml0eVNlc3Npb25zTmV4dFdlZWs6IHJlc3VsdHNbMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZpdHk6IHJlc3VsdHNbMV1cclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gRGF0YSBMb2FkZXJzXHJcbiAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgICAgICAgICAgLy8gTG9hZHMgYWxsIGRhdGEgaW50byB0aGlzLmRhdGEgYW5kIHJldHVybnMgYSBwcm9taXNlXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGxvYWRBY3Rpdml0eVNlc3Npb25zKGFjdGl2aXR5SWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzY2hlZHVsZVNlcnZpY2UuZ2V0QWN0aXZpdHlTZXNzaW9ucyhhY3Rpdml0eUlkLCAwKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gbG9hZEFjdGl2aXR5KGFjdGl2aXR5SWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzY2hlZHVsZVNlcnZpY2UuZ2V0QWN0aXZpdHkoYWN0aXZpdHlJZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdqcC5mb290ZXInKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ2pwRm9vdGVyJywganBGb290ZXIpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGpwRm9vdGVyKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJhcHAvY29tcG9uZW50cy9mb290ZXIvZm9vdGVyLmh0bWxcIlxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdqcC5zY2hlZHVsZS53aWRnZXRzLmFjdGl2aXR5UGlja2VyJylcclxuICAgICAgICAuZGlyZWN0aXZlKCdqcFNjaGVkdWxlQWN0aXZpdHlQaWNrZXInLCBqcFNjaGVkdWxlQWN0aXZpdHlQaWNrZXIpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGpwU2NoZWR1bGVBY3Rpdml0eVBpY2tlcigpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwL2NvbXBvbmVudHMvc2NoZWR1bGUvd2lkZ2V0cy9hY3Rpdml0eS1waWNrZXIvYWN0aXZpdHktcGlja2VyLmh0bWxcIixcclxuICAgICAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgICAgIGFjdGl2aXRpZXM6IFwiPVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSkge1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XHJcbiAgICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdqcC5zY2hlZHVsZS53aWRnZXRzLmFjdGl2aXR5U2Vzc2lvbnMnKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ2pwQWN0aXZpdHlTZXNzaW9uJywganBBY3Rpdml0eVNlc3Npb24pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGpwQWN0aXZpdHlTZXNzaW9uKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2NvbXBvbmVudHMvc2NoZWR1bGUvd2lkZ2V0cy9hY3Rpdml0eS1zZXNzaW9ucy9hY3Rpdml0eS1zZXNzaW9uL2FjdGl2aXR5LXNlc3Npb24uaHRtbCcsXHJcbiAgICAgICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgICAgICBzZXNzaW9uOiAnPScsXHJcbiAgICAgICAgICAgICAgICBkYXk6ICc9JyxcclxuICAgICAgICAgICAgICAgIGZpcnN0U2Vzc2lvbjogJz0nLFxyXG4gICAgICAgICAgICAgICAgbGFzdFNlc3Npb246ICc9J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiAoJHNjb3BlKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuc2hvd0RldGFpbHMgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUudG9nZ2xlU2hvd0RldGFpbHMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2hvd0RldGFpbHMgPSAhJHNjb3BlLnNob3dEZXRhaWxzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2pwLnNjaGVkdWxlLndpZGdldHMuYWN0aXZpdHlTZXNzaW9ucycpXHJcbiAgICAgICAgLmRpcmVjdGl2ZSgnanBTY2hlZHVsZUFjdGl2aXR5U2Vzc2lvbnNEYXlMaXN0JywganBTY2hlZHVsZUFjdGl2aXR5U2Vzc2lvbnNEYXlMaXN0KTtcclxuXHJcbiAgICAvKiBAbmdJbmdqZWN0ICovXHJcbiAgICBmdW5jdGlvbiBqcFNjaGVkdWxlQWN0aXZpdHlTZXNzaW9uc0RheUxpc3QoRGF0ZVRpbWVTZXJ2aWNlKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2NvbXBvbmVudHMvc2NoZWR1bGUvd2lkZ2V0cy9hY3Rpdml0eS1zZXNzaW9ucy9kYXktbGlzdC9hY3Rpdml0eS1zZXNzaW9ucy1kYXktbGlzdC5odG1sJyxcclxuICAgICAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgICAgIHNlc3Npb25zOiAnPScsXHJcbiAgICAgICAgICAgICAgICBkYXk6ICc9J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcclxuICAgIH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdqcC5zY2hlZHVsZS53aWRnZXRzLmFjdGl2aXR5U2Vzc2lvbnMnKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ2pwSGVhZGVyU3VtbWFyeScsIGpwSGVhZGVyU3VtbWFyeSk7XHJcblxyXG4gICAgZnVuY3Rpb24ganBIZWFkZXJTdW1tYXJ5KCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2NvbXBvbmVudHMvc2NoZWR1bGUvd2lkZ2V0cy9hY3Rpdml0eS1zZXNzaW9ucy9oZWFkZXItc3VtbWFyeS9oZWFkZXItc3VtbWFyeS5odG1sJyxcclxuICAgICAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgICAgIGNvdW50OiAnPScsXHJcbiAgICAgICAgICAgICAgICBkYXk6ICc9JyxcclxuICAgICAgICAgICAgICAgIHNob3dMb2NhdGlvbjogJz0nLFxyXG4gICAgICAgICAgICAgICAgbG9jYXRpb246ICc9J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2pwLnNjaGVkdWxlLndpZGdldHMuYWN0aXZpdHlTZXNzaW9ucycpXHJcbiAgICAgICAgLmRpcmVjdGl2ZSgnanBTY2hlZHVsZUFjdGl2aXR5U2Vzc2lvbnNMaXN0JywganBTY2hlZHVsZUFjdGl2aXR5U2Vzc2lvbnNMaXN0KTtcclxuXHJcbiAgICBmdW5jdGlvbiBqcFNjaGVkdWxlQWN0aXZpdHlTZXNzaW9uc0xpc3QoKSB7XHJcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvY29tcG9uZW50cy9zY2hlZHVsZS93aWRnZXRzL2FjdGl2aXR5LXNlc3Npb25zL2xpc3QvYWN0aXZpdHktc2Vzc2lvbnMtbGlzdC5odG1sJyxcclxuICAgICAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgICAgIHNjaGVkdWxlOiAnPSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24gKCRzY29wZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2YnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XHJcbiAgICB9XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnanAuc2NoZWR1bGUud2lkZ2V0cy5hY3Rpdml0eVNlc3Npb25zJylcclxuICAgICAgICAuZGlyZWN0aXZlKCdqcFBhcnRpY2lwYW50TGlzdCcsIGpwUGFydGljaXBhbnRMaXN0KTtcclxuXHJcbiAgICBmdW5jdGlvbiBqcFBhcnRpY2lwYW50TGlzdCgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9jb21wb25lbnRzL3NjaGVkdWxlL3dpZGdldHMvYWN0aXZpdHktc2Vzc2lvbnMvcGFydGljaXBhbnQtbGlzdC9wYXJ0aWNpcGFudC1saXN0Lmh0bWwnLFxyXG4gICAgICAgICAgICBzY29wZToge1xyXG4gICAgICAgICAgICAgICAgcGFydGljaXBhbnRzOiAnPSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24oJHNjb3BlKVxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2pwLnNjaGVkdWxlLndpZGdldHMuYWN0aXZpdHlTZXNzaW9ucycpXHJcbiAgICAgICAgLmRpcmVjdGl2ZSgnanBTY2hlZHVsZVVuYXZhaWxhYmxlJywganBTY2hlZHVsZVVuYXZhaWxhYmxlKTtcclxuXHJcbiAgICAvKiBAbmdJbmplY3QgKi9cclxuICAgIGZ1bmN0aW9uIGpwU2NoZWR1bGVVbmF2YWlsYWJsZShEYXRlVGltZVNlcnZpY2UpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdBJyxcclxuICAgICAgICAgICAgc2NvcGU6IGZhbHNlLCAvLyBXZSdyZSB1c2luZyBzZXNzaW9uLnBhcnRpY2lwYW50cy5sZW5ndGggZnJvbSBwYXJlbnRcclxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24oJHNjb3BlLCAkZWxlbWVudClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKCRzY29wZS5kYXkuaXNCZWZvcmUoRGF0ZVRpbWVTZXJ2aWNlLm5vdygpLnN0YXJ0T2YoJ2RheScpKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5hZGRDbGFzcygnc2NoZWR1bGVVbmF2YWlsYWJsZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2pwLnNjaGVkdWxlLndpZGdldHMuYWN0aXZpdHlTZXNzaW9ucycpXHJcbiAgICAgICAgLmRpcmVjdGl2ZSgnanBQYXJ0aWNpcGFudEpvaW4nLCBqcFBhcnRpY2lwYW50Sm9pbik7XHJcblxyXG4gICAgLy8gQG5nSW5qZWN0XHJcbiAgICBmdW5jdGlvbiBqcFBhcnRpY2lwYW50Sm9pbihzY2hlZHVsZVNlcnZpY2UsIHRvYXN0ciwgJHN0YXRlLCBEYXRlVGltZVNlcnZpY2UpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvY29tcG9uZW50cy9zY2hlZHVsZS93aWRnZXRzL2FjdGl2aXR5LXNlc3Npb25zL3BhcnRpY2lwYW50LWpvaW4vcGFydGljaXBhbnQtam9pbi5odG1sJyxcclxuICAgICAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgICAgIGFjdGl2aXR5OiAnPScsXHJcbiAgICAgICAgICAgICAgICBhY3Rpdml0eVNlc3Npb246ICc9J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbigkc2NvcGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5qb2luID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NoZWR1bGVTZXJ2aWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5qb2luQWN0aXZpdHlTZXNzaW9uKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmFjdGl2aXR5U2Vzc2lvbi5hY3Rpdml0eV9pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5hY3Rpdml0eVNlc3Npb24uaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUudXNlci5uYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvYXN0ci5zdWNjZXNzKCdZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgam9pbmVkISBIYXZlIGZ1biA6KScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCRzdGF0ZS4kY3VycmVudCwgbnVsbCwgeyByZWxvYWQ6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBhY3RpdmF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGFjdGl2YXRlKClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUudXNlciA9IHt9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbn0pKCk7IiwiLy8gSW5jbHVkZSBpbiBpbmRleC5odG1sIHNvIHRoYXQgYXBwIGxldmVsIGV4Y2VwdGlvbnMgYXJlIGhhbmRsZWQuXHJcbi8vIFNob3VsZCBleGNsdWRlIGZyb20gdGVzdCBydW5uZXJcclxuKGZ1bmN0aW9uKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCd1dGlsaXRpZXMuZXhjZXB0aW9uJylcclxuICAgICAgICAucHJvdmlkZXIoJ2V4Y2VwdGlvbkhhbmRsZXInLCBleGNlcHRpb25IYW5kbGVyUHJvdmlkZXIpXHJcbiAgICAgICAgLmNvbmZpZyhjb25maWcpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTXVzdCBjb25maWd1cmUgdGhlIGV4Y2VwdGlvbiBoYW5kbGluZ1xyXG4gICAgICogQHJldHVybiB7W3R5cGVdfVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBleGNlcHRpb25IYW5kbGVyUHJvdmlkZXIoKSB7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSB7XHJcbiAgICAgICAgICAgIGFwcEVycm9yUHJlZml4OiB1bmRlZmluZWRcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmNvbmZpZ3VyZSA9IGZ1bmN0aW9uIChhcHBFcnJvclByZWZpeCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5hcHBFcnJvclByZWZpeCA9IGFwcEVycm9yUHJlZml4O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuJGdldCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge2NvbmZpZzogdGhpcy5jb25maWd9O1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25maWd1cmUgYnkgc2V0dGluZyBhbiBvcHRpb25hbCBzdHJpbmcgdmFsdWUgZm9yIGFwcEVycm9yUHJlZml4LlxyXG4gICAgICogQWNjZXNzaWJsZSB2aWEgY29uZmlnLmFwcEVycm9yUHJlZml4ICh2aWEgY29uZmlnIHZhbHVlKS5cclxuICAgICAqIEBwYXJhbSAge1t0eXBlXX0gJHByb3ZpZGVcclxuICAgICAqIEByZXR1cm4ge1t0eXBlXX1cclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBjb25maWcoJHByb3ZpZGUpIHtcclxuICAgICAgICAkcHJvdmlkZS5kZWNvcmF0b3IoJyRleGNlcHRpb25IYW5kbGVyJywgZXh0ZW5kRXhjZXB0aW9uSGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeHRlbmQgdGhlICRleGNlcHRpb25IYW5kbGVyIHNlcnZpY2UgdG8gYWxzbyBkaXNwbGF5IGEgdG9hc3QuXHJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9ICRkZWxlZ2F0ZVxyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBleGNlcHRpb25IYW5kbGVyXHJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGxvZ2dlclNlcnZpY2VcclxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSB0aGUgZGVjb3JhdGVkICRleGNlcHRpb25IYW5kbGVyIHNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZXh0ZW5kRXhjZXB0aW9uSGFuZGxlcigkZGVsZWdhdGUsIGV4Y2VwdGlvbkhhbmRsZXIsIGxvZ2dlclNlcnZpY2UpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oZXhjZXB0aW9uLCBjYXVzZSkge1xyXG4gICAgICAgICAgICB2YXIgYXBwRXJyb3JQcmVmaXggPSBleGNlcHRpb25IYW5kbGVyLmNvbmZpZy5hcHBFcnJvclByZWZpeCB8fCAnJztcclxuICAgICAgICAgICAgdmFyIGVycm9yRGF0YSA9IHtleGNlcHRpb246IGV4Y2VwdGlvbiwgY2F1c2U6IGNhdXNlfTtcclxuICAgICAgICAgICAgZXhjZXB0aW9uLm1lc3NhZ2UgPSBhcHBFcnJvclByZWZpeCArIGV4Y2VwdGlvbi5tZXNzYWdlO1xyXG4gICAgICAgICAgICAkZGVsZWdhdGUoZXhjZXB0aW9uLCBjYXVzZSk7XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBDb3VsZCBhZGQgdGhlIGVycm9yIHRvIGEgc2VydmljZSdzIGNvbGxlY3Rpb24sXHJcbiAgICAgICAgICAgICAqIGFkZCBlcnJvcnMgdG8gJHJvb3RTY29wZSwgbG9nIGVycm9ycyB0byByZW1vdGUgd2ViIHNlcnZlcixcclxuICAgICAgICAgICAgICogb3IgbG9nIGxvY2FsbHkuIE9yIHRocm93IGhhcmQuXHJcbiAgICAgICAgICAgICAqIHRocm93IGV4Y2VwdGlvbjtcclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgICAgICogICAgIHRocm93IHsgbWVzc2FnZTogJ2Vycm9yIG1lc3NhZ2Ugd2UgYWRkZWQnIH07XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBsb2dnZXJTZXJ2aWNlLmVycm9yKGV4Y2VwdGlvbi5tZXNzYWdlLCBlcnJvckRhdGEpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9