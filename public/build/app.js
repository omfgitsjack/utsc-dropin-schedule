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

    angular.module('jp.schedule.data', []);

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
     * API (non-route) constants, preferbly this should be refactored to be configured
     * by core
     */
    angular.module("utilities.api")
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
                url: '/sessions/{activityId}/{weeksFromToday}',
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
            return activitySessionsLayoutDataService.load($stateParams['activityId'], $stateParams['weeksFromToday']);
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
    function ActivitySessionLayoutController(activitySessionsData, loggerService, $state)
    {

        var vm = this;

        activate();

        //

        function activate()
        {
            // Configure Week identifiers
            if (activitySessionsData.selectedWeek == 0)
            {
                vm.weekIdentifier = "This";
                vm.oppositeWeekIdentifier = "Next";
                vm.oppositeWeek = 1;
                vm.activitySessions = activitySessionsData.activitySessionsThisWeek;
                vm.enableWeekSwitch = activitySessionsData.activitySessionsNextWeek.length >= 1;
            }
            else if (activitySessionsData.selectedWeek == 1)
            {
                vm.weekIdentifier = "Next";
                vm.oppositeWeekIdentifier = "Last";
                vm.oppositeWeek = 0;
                vm.activitySessions = activitySessionsData.activitySessionsNextWeek;
                vm.enableWeekSwitch = true; // Should always be able to go back
            }

            // Display activity details
            vm.activityLabel = activitySessionsData.activity.activity;
            vm.activityId = activitySessionsData.activity.id;
            vm.activityCategory = activitySessionsData.activity.category;
            vm.activityIsWomenOnly = activitySessionsData.activity.women_only;
        }

    }
    ActivitySessionLayoutController.$inject = ["activitySessionsData", "loggerService", "$state"];

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
     * @param apiTransformerService - transformer service
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
    function scheduleFactory(apiService, API_ROUTES_CONFIG, exceptionService) {
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
         * @param weeks - Week to retrieve (0 for this week)
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
    scheduleFactory.$inject = ["apiService", "API_ROUTES_CONFIG", "exceptionService"];

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

        function load(activityId, weeksFromToday) {

            var data = [
                loadActivitySessionsThisWeek(activityId),
                loadActivitySessionsNextWeek(activityId),
                loadActivity(activityId)
            ];

            return $q.all(data).then(
                function(results) {
                   return {
                       activitySessionsThisWeek: results[0],
                       activitySessionsNextWeek: results[1],
                       activity: results[2],
                       selectedWeek: weeksFromToday
                   }
                });

            // Data Loaders
            ///////////////////////////

            // Loads all data into this.data and returns a promise
            function loadActivitySessionsThisWeek(activityId) {
                return scheduleService.getActivitySessions(activityId, 0);
            }

            function loadActivitySessionsNextWeek(activityId) {
                return scheduleService.getActivitySessions(activityId, 1);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUuanMiLCJjb3JlL2NvcmUubW9kdWxlLmpzIiwicm91dGVzL2FwcC1yb3V0ZXMubW9kdWxlLmpzIiwiY29tcG9uZW50cy9mb290ZXIvZm9vdGVyLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvc2NoZWR1bGUubW9kdWxlLmpzIiwidXRpbGl0aWVzL2FwaS9hcGkubW9kdWxlLmpzIiwidXRpbGl0aWVzL2RhdGV0aW1lL2RhdGV0aW1lLm1vZHVsZS5qcyIsInV0aWxpdGllcy9leGNlcHRpb24vZXhjZXB0aW9uLm1vZHVsZS5qcyIsInV0aWxpdGllcy9nb29nbGVhbmFseXRpY3MvZ29vZ2xlYW5hbHl0aWNzLm1vZHVsZS5qcyIsInV0aWxpdGllcy9sb2dnZXIvbG9nZ2VyLm1vZHVsZS5qcyIsInV0aWxpdGllcy9yb3V0ZXIvcm91dGVyLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvZGF0YS9zY2hlZHVsZS1kYXRhLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvbGF5b3V0L2xheW91dC5tb2R1bGUuanMiLCJjb21wb25lbnRzL3NjaGVkdWxlL3JvdXRlcy9zY2hlZHVsZS1yb3V0ZXMubW9kdWxlLmpzIiwiY29tcG9uZW50cy9zY2hlZHVsZS93aWRnZXRzL3NjaGVkdWxlLXdpZGdldHMubW9kdWxlLmpzIiwiY29tcG9uZW50cy9zY2hlZHVsZS93aWRnZXRzL2FjdGl2aXR5LXBpY2tlci9hY3Rpdml0eS1waWNrZXIubW9kdWxlLmpzIiwiY29tcG9uZW50cy9zY2hlZHVsZS93aWRnZXRzL2FjdGl2aXR5LXNlc3Npb25zL2FjdGl2aXR5LXNlc3Npb25zLm1vZHVsZS5qcyIsImNvcmUvY29yZS5jb25zdGFudC5qcyIsInJvdXRlcy9hcHAtcm91dGVzLmNvbnN0YW50LmpzIiwidXRpbGl0aWVzL2FwaS9hcGkuY29uc3RhbnQuanMiLCJ1dGlsaXRpZXMvZGF0ZXRpbWUvZGF0ZXRpbWUuY29uc3RhbnQuanMiLCJ1dGlsaXRpZXMvbG9nZ2VyL2xvZ2dlci5jb25zdGFudC5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvcm91dGVzL3NjaGVkdWxlLXJvb3Qtcm91dGUuY29uc3RhbnQuanMiLCJjb3JlL2NvcmUuY29uZmlnLmpzIiwicm91dGVzL2FwcC1yb3V0ZXMuY29uZmlnLmpzIiwidXRpbGl0aWVzL2RhdGV0aW1lL2RhdGV0aW1lLmNvbmZpZy5qcyIsInV0aWxpdGllcy9nb29nbGVhbmFseXRpY3MvZ29vZ2xlYW5hbHl0aWNzLmNvbmZpZy5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvcm91dGVzL3NjaGVkdWxlLXJvdXRlcy5jb25maWcuanMiLCJsYXlvdXQvc2hlbGwuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvbGF5b3V0L2FjdGl2aXRpZXMvYWN0aXZpdGllcy1sYXlvdXQuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvbGF5b3V0L2FjdGl2aXR5LXNlc3Npb25zL2FjdGl2aXR5LXNlc3Npb25zLWxheW91dC5jb250cm9sbGVyLmpzIiwidXRpbGl0aWVzL2FwaS9hcGktdHJhbnNmb3JtZXIuZmFjdG9yeS5qcyIsInV0aWxpdGllcy9hcGkvYXBpLmZhY3RvcnkuanMiLCJ1dGlsaXRpZXMvZGF0ZXRpbWUvZGF0ZXRpbWUuZmFjdG9yeS5qcyIsInV0aWxpdGllcy9leGNlcHRpb24vZXhjZXB0aW9uLmZhY3RvcnkuanMiLCJ1dGlsaXRpZXMvbG9nZ2VyL2xvZ2dlci5mYWN0b3J5LmpzIiwidXRpbGl0aWVzL3JvdXRlci9yb3V0ZXIuZmFjdG9yeS5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvZGF0YS9zY2hlZHVsZS1kYXRhLmZhY3RvcnkuanMiLCJjb21wb25lbnRzL3NjaGVkdWxlL2xheW91dC9hY3Rpdml0aWVzL2FjdGl2aXRpZXMtbGF5b3V0LmRhdGEuZmFjdG9yeS5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvbGF5b3V0L2FjdGl2aXR5LXNlc3Npb25zL2FjdGl2aXR5LXNlc3Npb25zLWxheW91dC5kYXRhLmZhY3RvcnkuanMiLCJjb21wb25lbnRzL2Zvb3Rlci9mb290ZXIuZGlyZWN0aXZlLmpzIiwiY29tcG9uZW50cy9zY2hlZHVsZS93aWRnZXRzL2FjdGl2aXR5LXBpY2tlci9hY3Rpdml0eS1waWNrZXIuZGlyZWN0aXZlLmpzIiwiY29tcG9uZW50cy9zY2hlZHVsZS93aWRnZXRzL2FjdGl2aXR5LXNlc3Npb25zL2FjdGl2aXR5LXNlc3Npb24vYWN0aXZpdHktc2Vzc2lvbi5kaXJlY3RpdmUuanMiLCJjb21wb25lbnRzL3NjaGVkdWxlL3dpZGdldHMvYWN0aXZpdHktc2Vzc2lvbnMvZGF5LWxpc3QvYWN0aXZpdHktc2Vzc2lvbnMtZGF5LWxpc3QuZGlyZWN0aXZlLmpzIiwiY29tcG9uZW50cy9zY2hlZHVsZS93aWRnZXRzL2FjdGl2aXR5LXNlc3Npb25zL2hlYWRlci1zdW1tYXJ5L2hlYWRlci1zdW1tYXJ5LmRpcmVjdGl2ZS5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvd2lkZ2V0cy9hY3Rpdml0eS1zZXNzaW9ucy9saXN0L2FjdGl2aXR5LXNlc3Npb25zLWxpc3QuZGlyZWN0aXZlLmpzIiwiY29tcG9uZW50cy9zY2hlZHVsZS93aWRnZXRzL2FjdGl2aXR5LXNlc3Npb25zL3BhcnRpY2lwYW50LWpvaW4vcGFydGljaXBhbnQtam9pbi5kaXJlY3RpdmUuanMiLCJjb21wb25lbnRzL3NjaGVkdWxlL3dpZGdldHMvYWN0aXZpdHktc2Vzc2lvbnMvcGFydGljaXBhbnQtbGlzdC9wYXJ0aWNpcGFudC1saXN0LmRpcmVjdGl2ZS5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvd2lkZ2V0cy9hY3Rpdml0eS1zZXNzaW9ucy9zY2hlZHVsZS11bmF2YWlsYWJsZS9zY2hlZHVsZS11bmF2YWlsYWJsZS5kaXJlY3RpdmUuanMiLCJ1dGlsaXRpZXMvZXhjZXB0aW9uL2V4Y2VwdGlvbi1oYW5kbGVyLnByb3ZpZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLENBQUEsWUFBQTtJQUNBOzs7OztJQUtBLFFBQUEsT0FBQSxZQUFBO1FBQ0E7UUFDQTtRQUNBOzs7O0FDVEEsQ0FBQSxZQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBO1FBQ0E7Ozs7WUFJQTtZQUNBOzs7O1lBSUE7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBOzs7O1lBSUE7Ozs7O0FDdEJBLENBQUEsWUFBQTtJQUNBOzs7OztJQUtBLFFBQUEsT0FBQSxjQUFBO1FBQ0E7UUFDQTs7OztBQ1JBLENBQUEsWUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxhQUFBOzs7QUNIQSxDQUFBLFlBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUE7UUFDQTs7O0FDSkEsQ0FBQSxVQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLGlCQUFBOzs7O0FDSEEsQ0FBQSxZQUFBO0lBQ0E7Ozs7Ozs7O0lBUUEsUUFBQSxPQUFBO1FBQ0E7WUFDQTs7OztBQ1hBLENBQUEsWUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQTtRQUNBO1lBQ0E7Ozs7QUNMQSxDQUFBLFlBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUE7UUFDQTtZQUNBO1lBQ0E7Ozs7QUNOQSxDQUFBLFlBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUE7UUFDQTs7O0FDSkEsQ0FBQSxZQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBO1FBQ0E7WUFDQTs7Ozs7OztBQ0ZBLENBQUEsVUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxvQkFBQTs7O0FDTkEsQ0FBQSxZQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBO1FBQ0E7WUFDQTs7OztBQ0xBLENBQUEsWUFBQTtJQUNBOzs7OztJQUtBLFFBQUEsT0FBQSxzQkFBQTtRQUNBO1FBQ0E7UUFDQTs7OztBQ1RBLENBQUEsWUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQTtRQUNBO1lBQ0E7WUFDQTs7OztBQ05BLENBQUEsVUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxzQ0FBQTtRQUNBOzs7O0FDSkEsQ0FBQSxZQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLHdDQUFBOzs7QUNIQSxDQUFB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UUFDQSxPQUFBO1lBQ0EsVUFBQTtZQUNBLE9BQUE7WUFDQSxNQUFBLFNBQUEsUUFBQTtZQUNBO2dCQUNBLElBQUEsT0FBQSxJQUFBLFNBQUEsZ0JBQUEsTUFBQSxRQUFBO2dCQUNBO29CQUNBLFNBQUEsU0FBQTs7Ozs7Ozs7OztBQ2ZBLENBQUEsV0FBQTtJQUNBOztJQUVBO1NBQ0EsT0FBQTtTQUNBLFNBQUEsb0JBQUE7U0FDQSxPQUFBOzs7Ozs7SUFNQSxTQUFBLDJCQUFBO1FBQ0EsS0FBQSxTQUFBO1lBQ0EsZ0JBQUE7OztRQUdBLEtBQUEsWUFBQSxVQUFBLGdCQUFBO1lBQ0EsS0FBQSxPQUFBLGlCQUFBOzs7UUFHQSxLQUFBLE9BQUEsV0FBQTtZQUNBLE9BQUEsQ0FBQSxRQUFBLEtBQUE7Ozs7Ozs7Ozs7O0lBV0EsU0FBQSxPQUFBLFVBQUE7UUFDQSxTQUFBLFVBQUEscUJBQUE7Ozs7Ozs7Ozs7O0lBVUEsU0FBQSx1QkFBQSxXQUFBLGtCQUFBLGVBQUE7UUFDQSxPQUFBLFNBQUEsV0FBQSxPQUFBO1lBQ0EsSUFBQSxpQkFBQSxpQkFBQSxPQUFBLGtCQUFBO1lBQ0EsSUFBQSxZQUFBLENBQUEsV0FBQSxXQUFBLE9BQUE7WUFDQSxVQUFBLFVBQUEsaUJBQUEsVUFBQTtZQUNBLFVBQUEsV0FBQTs7Ozs7Ozs7OztZQVVBLGNBQUEsTUFBQSxVQUFBLFNBQUE7Ozs7S0FHQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYWluIEFwcGxpY2F0aW9uIE1vZHVsZVxyXG4gICAgICovXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLm1haW4nLCBbXHJcbiAgICAgICAgJ2FwcC5yb3V0ZXMnLFxyXG4gICAgICAgICdhcHAuY29yZScsXHJcbiAgICAgICAgJ2pwLnNjaGVkdWxlJ1xyXG4gICAgXSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvcmUnLFxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICogQW5ndWxhciBtb2R1bGVzXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAnbmdNYXRlcmlhbCcsXHJcbiAgICAgICAgICAgICduZ1RvdWNoJyxcclxuICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICogT3VyIHJldXNhYmxlIGNyb3NzIGFwcCBjb2RlIG1vZHVsZXNcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICd1dGlsaXRpZXMuYXBpJyxcclxuICAgICAgICAgICAgJ3V0aWxpdGllcy5leGNlcHRpb24nLFxyXG4gICAgICAgICAgICAndXRpbGl0aWVzLmxvZ2dlcicsXHJcbiAgICAgICAgICAgICd1dGlsaXRpZXMucm91dGVyJyxcclxuICAgICAgICAgICAgJ3V0aWxpdGllcy5kYXRldGltZScsXHJcbiAgICAgICAgICAgICd1dGlsaXRpZXMuZ29vZ2xlYW5hbHl0aWNzJyxcclxuICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICogM3JkIFBhcnR5IG1vZHVsZXNcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICd1aS5ib290c3RyYXAnIC8vIEFjY29yZGlvbiBhbmQgY29sbGFwc2VcclxuICAgICAgICBdKTtcclxuXHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFwcGxpY2F0aW9uIHJvdXRlc1xyXG4gICAgICovXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLnJvdXRlcycsIFtcclxuICAgICAgICAnanAuc2NoZWR1bGUucm91dGVzJyxcclxuICAgICAgICAndXRpbGl0aWVzLnJvdXRlcidcclxuICAgIF0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2pwLmZvb3RlcicsIFtdKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdqcC5zY2hlZHVsZScsXHJcbiAgICAgICAgW10pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKXtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCd1dGlsaXRpZXMuYXBpJywgW10pO1xyXG5cclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvdmlkZXMgYSBEYXRlVGltZVNlcnZpY2UgdXRpbGl0eSBjbGFzcyB0aGF0IHByb3ZpZGVzIGFuIGludGVyZmFjZSB0b1xyXG4gICAgICogbW9tZW50IG9iamVjdHMsIHV0aWxpdGllcyBmb3Igd29ya2luZyB3aXRoIE15U1FMIFVUQyB0aW1lcyBldGMuXHJcbiAgICAgKlxyXG4gICAgICogUmVmZXIgdG8gZGF0ZXRpbWUuZmFjdG9yeS5qcyBmb3IgZG9jdW1lbnRhdGlvbiAmIGF2YWlsYWJsZSB0b29sc1xyXG4gICAgICovXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgndXRpbGl0aWVzLmRhdGV0aW1lJyxcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgICdhbmd1bGFyTW9tZW50J1xyXG4gICAgICAgIF0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ3V0aWxpdGllcy5leGNlcHRpb24nLFxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgJ3V0aWxpdGllcy5sb2dnZXInXHJcbiAgICAgICAgXSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgndXRpbGl0aWVzLmdvb2dsZWFuYWx5dGljcycsXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICAnYW5ndWxhcnRpY3MnLFxyXG4gICAgICAgICAgICAnYW5ndWxhcnRpY3MuZ29vZ2xlLmFuYWx5dGljcydcclxuICAgICAgICBdKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCd1dGlsaXRpZXMubG9nZ2VyJyxcclxuICAgICAgICBbXSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgndXRpbGl0aWVzLnJvdXRlcicsXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICAndWkucm91dGVyJ1xyXG4gICAgICAgIF0pO1xyXG5cclxufSkoKTsiLCIvKipcclxuICpcclxuICovXHJcbihmdW5jdGlvbigpe1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2pwLnNjaGVkdWxlLmRhdGEnLCBbXSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnanAuc2NoZWR1bGUubGF5b3V0cycsXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICAnanAuZm9vdGVyJ1xyXG4gICAgICAgIF0pO1xyXG5cclxufSkoKTsgIiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2NoZWR1bGUgUm91dGluZyBtb2R1bGVcclxuICAgICAqL1xyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2pwLnNjaGVkdWxlLnJvdXRlcycsIFtcclxuICAgICAgICAndWkucm91dGVyJyxcclxuICAgICAgICAnanAuc2NoZWR1bGUud2lkZ2V0cycsXHJcbiAgICAgICAgJ2pwLnNjaGVkdWxlLmxheW91dHMnXHJcbiAgICBdKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdqcC5zY2hlZHVsZS53aWRnZXRzJyxcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgICdqcC5zY2hlZHVsZS53aWRnZXRzLmFjdGl2aXR5UGlja2VyJyxcclxuICAgICAgICAgICAgJ2pwLnNjaGVkdWxlLndpZGdldHMuYWN0aXZpdHlTZXNzaW9ucydcclxuICAgICAgICBdKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnanAuc2NoZWR1bGUud2lkZ2V0cy5hY3Rpdml0eVBpY2tlcicsIFtcclxuICAgICAgICAnanAuc2NoZWR1bGUuZGF0YSdcclxuICAgIF0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2pwLnNjaGVkdWxlLndpZGdldHMuYWN0aXZpdHlTZXNzaW9ucycsIFtdKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAuY29yZScpXHJcbiAgICAgICAgLy8gTG9kYXNoIERlZmluaXRpb25cclxuICAgICAgICAuY29uc3RhbnQoJ18nLCBfKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBUEkgUmVzb3VyY2VzIGNvbnN0YW50c1xyXG4gICAgICovXHJcbiAgICBhbmd1bGFyLm1vZHVsZShcImFwcC5yb3V0ZXNcIilcclxuICAgICAgICAuY29uc3RhbnQoJ0FQSV9ST1VURVNfQ09ORklHJyxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFDVElWSVRJRVM6ICdhY3Rpdml0aWVzJ1xyXG4gICAgICAgIH0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBUEkgKG5vbi1yb3V0ZSkgY29uc3RhbnRzLCBwcmVmZXJibHkgdGhpcyBzaG91bGQgYmUgcmVmYWN0b3JlZCB0byBiZSBjb25maWd1cmVkXHJcbiAgICAgKiBieSBjb3JlXHJcbiAgICAgKi9cclxuICAgIGFuZ3VsYXIubW9kdWxlKFwidXRpbGl0aWVzLmFwaVwiKVxyXG4gICAgICAgIC5jb25zdGFudCgnQVBJX0NPTkZJRycsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBCQVNFX1JPVVRFOiAnYXBpJ1xyXG4gICAgICAgIH0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXcmFwIG1vbWVudCBhcyBhbiBhbmd1bGFyIGRlcGVuZGVuY3lcclxuICAgICAqIHdoaWxzdCBzZXR0aW5nIHRoZSBkZWZhdWx0IHRpbWV6b25lIGZvciBhbmd1bGFyXHJcbiAgICAgKiBtb21lbnRcclxuICAgICAqL1xyXG4gICAgYW5ndWxhci5tb2R1bGUoXCJ1dGlsaXRpZXMuZGF0ZXRpbWVcIilcclxuICAgICAgICAuY29uc3RhbnQoJ21vbWVudCcsIG1vbWVudClcclxuICAgICAgICAuY29uc3RhbnQoJ2FuZ3VsYXJNb21lbnRDb25maWcnLCB7XHJcbiAgICAgICAgICAgIHRpbWV6b25lOiAnQW1lcmljYS9EZXRyb2l0J1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNvbnN0YW50KCdVVENfVElNRUZPUk1BVCcsIFwiWVlZWS1NTS1ERCBISDpNTTpTU1wiKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKFwidXRpbGl0aWVzLmxvZ2dlclwiKVxyXG4gICAgICAgIC5jb25zdGFudCgndG9hc3RyJywgdG9hc3RyKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2NoZWR1bGUncyBhYnN0cmFjdCByb290IHJvdXRlXHJcbiAgICAgKi9cclxuICAgIGFuZ3VsYXIubW9kdWxlKFwianAuc2NoZWR1bGUucm91dGVzXCIpXHJcbiAgICAgICAgLmNvbnN0YW50KCdTQ0hFRFVMRV9ST09UX1JPVVRFJyxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGFic3RyYWN0OiB0cnVlLFxyXG4gICAgICAgICAgICBuYW1lOiAnc2NoZWR1bGUnLFxyXG4gICAgICAgICAgICB1cmw6ICcvc2NoZWR1bGUnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJhcHAvY29tcG9uZW50cy9zY2hlZHVsZS9sYXlvdXQvc2NoZWR1bGUvc2NoZWR1bGUtYmFzZS1sYXlvdXQuaHRtbFwiXHJcbiAgICAgICAgfSk7XHJcbn0pKCk7IiwiXHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvcmUgbW9kdWxlIGNvbmZpZ3VyYXRpb25cclxuICAgICAqL1xyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcC5jb3JlJylcclxuICAgICAgICAuY29uZmlnKHRvYXN0ckNvbmZpZylcclxuICAgICAgICAuY29uZmlnKGxvZ1Byb3ZpZGVyQ29uZmlnKVxyXG4gICAgICAgIC5jb25maWcoZXhjZXB0aW9uSGFuZGxlclByb3ZpZGVyQ29uZmlnKVxyXG4gICAgICAgIC5jb25maWcobWRUaGVtaW5nUHJvdmlkZXJDb25maWcpXHJcbiAgICAgICAgLmNvbmZpZyhodHRwUHJvdmlkZXJDb25maWcpXHJcbiAgICAgICAgLnJ1bihpbml0Q29yZUNvbXBvbmVudHMpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVG9hc3RyIENvbmZpZ3VyYXRpb25cclxuICAgICAqIEBwYXJhbSB0b2FzdHJcclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiB0b2FzdHJDb25maWcodG9hc3RyKSB7XHJcbiAgICAgICAgdG9hc3RyLm9wdGlvbnMudGltZU91dCA9IDQwMDA7XHJcbiAgICAgICAgdG9hc3RyLm9wdGlvbnMucG9zaXRpb25DbGFzcyA9ICd0b2FzdC1ib3R0b20tcmlnaHQnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9nIFByb3ZpZGVyIENvbmZpZ3VyYXRpb25cclxuICAgICAqIEBwYXJhbSAkbG9nUHJvdmlkZXJcclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBsb2dQcm92aWRlckNvbmZpZygkbG9nUHJvdmlkZXIpIHtcclxuICAgICAgICBpZiAoJGxvZ1Byb3ZpZGVyLmRlYnVnRW5hYmxlZCkge1xyXG4gICAgICAgICAgICAkbG9nUHJvdmlkZXIuZGVidWdFbmFibGVkKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEV4Y2VwdGlvbiBIYW5kbGVyIFByb3ZpZGVyIGNvbmZpZ3VyYXRpb25cclxuICAgICAqIEBwYXJhbSBleGNlcHRpb25IYW5kbGVyUHJvdmlkZXJcclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBleGNlcHRpb25IYW5kbGVyUHJvdmlkZXJDb25maWcoZXhjZXB0aW9uSGFuZGxlclByb3ZpZGVyKSB7XHJcbiAgICAgICAgZXhjZXB0aW9uSGFuZGxlclByb3ZpZGVyLmNvbmZpZ3VyZSgnW05HLUpQIEVycm9yXSAnKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAbmdJbmplY3RcclxuICAgIGZ1bmN0aW9uIG1kVGhlbWluZ1Byb3ZpZGVyQ29uZmlnKCRtZFRoZW1pbmdQcm92aWRlcikge1xyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZG9jcy1kYXJrJywgJ2RlZmF1bHQnKVxyXG4gICAgICAgICAgICAuZGFyaygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBuZ0luamVjdFxyXG4gICAgZnVuY3Rpb24gaHR0cFByb3ZpZGVyQ29uZmlnKCRodHRwUHJvdmlkZXIpIHtcclxuICAgICAgICAkaHR0cFByb3ZpZGVyLmRlZmF1bHRzLnVzZVhEb21haW4gPSB0cnVlO1xyXG4gICAgICAgIGRlbGV0ZSAkaHR0cFByb3ZpZGVyLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uWydYLVJlcXVlc3RlZC1XaXRoJ107XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsemllIGNvcmUgY29tcG9uZW50c1xyXG4gICAgICogQHBhcmFtIHJvdXRlclNlcnZpY2VcclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBpbml0Q29yZUNvbXBvbmVudHMocm91dGVyU2VydmljZSkge1xyXG5cclxuICAgIH1cclxuXHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFwcCByb3V0ZSBjb25maWd1cmF0aW9uXHJcbiAgICAgKi9cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAucm91dGVzJylcclxuICAgICAgICAuY29uZmlnKHJvdXRlQ29uZmlnKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFVJLVJvdXRlciBzdGF0ZSBjb25maWd1cmF0aW9uLlxyXG4gICAgICogRmVhdHVyZSByb290IChhYnN0cmFjdCkgcm91dGVzIGFyZSBhbHNvIGluY2x1ZGVkLlxyXG4gICAgICogQHBhcmFtICRzdGF0ZVByb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0gJHVybFJvdXRlclByb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0gJGxvY2F0aW9uUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSBTQ0hFRFVMRV9ST09UX1JPVVRFIE5vdGUgdGhhdCB0aGlzIGlzIHBhcmVudGxlc3MuXHJcbiAgICAgKiBAbmdJbmplY3RcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcm91dGVDb25maWcoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIsIFNDSEVEVUxFX1JPT1RfUk9VVEUpXHJcbiAgICB7XHJcbiAgICAgICAgLy8gVXNlIGhhc2hiYW5nIG1vZGUgZm9yIHNlbyBwdXJwb3Nlc1xyXG4gICAgICAgICRsb2NhdGlvblByb3ZpZGVyLmhhc2hQcmVmaXgoJyEnKTtcclxuXHJcbiAgICAgICAgLy8gRGVmYXVsdCByb3V0ZSBicmluZ3MgdXNlcnMgdG8gYWN0aXZpdGllc1xyXG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlclxyXG4gICAgICAgICAgICAub3RoZXJ3aXNlKCcvc2NoZWR1bGUvYWN0aXZpdGllcycpO1xyXG5cclxuICAgICAgICAvLyBEZWZpbmUgUm9vdCBQYXJlbnRzXHJcbiAgICAgICAgU0NIRURVTEVfUk9PVF9ST1VURVsncGFyZW50J10gPSAnJztcclxuXHJcbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgLy8gTG9jYWwgUm91dGVzXHJcbiAgICAgICAgICAgIC8vIEZlYXR1cmUgUm91dGVzXHJcbiAgICAgICAgICAgIC5zdGF0ZShTQ0hFRFVMRV9ST09UX1JPVVRFKTtcclxuICAgIH1cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3V0aWxpdGllcy5kYXRldGltZScpXHJcbiAgICAgICAgLmNvbmZpZyhkYXRldGltZUNvbmZpZyk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25maWd1cmUgZGF0ZSB0aW1lIGNvbmZpZ3VyYXRpb24sIEFtZXJpY2EvRGV0cm9pdCBoYXMgc2FtZSB0aW1lem9uZSBhcyB0b3JvbnRvXHJcbiAgICAgKiBAcGFyYW0gbW9tZW50XHJcbiAgICAgKiBAbmdJbmplY3RcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZGF0ZXRpbWVDb25maWcobW9tZW50KVxyXG4gICAge1xyXG4gICAgICAgIC8vIE1ha2Ugc3VyZSBtb21lbnQgaXMgaW4gZW5nbGlzaCBhbmQgdGhlIGZpcnN0IGRheSBvZiB3ZWVrIGlzIGEgbW9uZGF5XHJcbiAgICAgICAgbW9tZW50LmxhbmcoJ2VuJywge1xyXG4gICAgICAgICAgICAvLyBjdXN0b21pemF0aW9ucy5cclxuICAgICAgICAgICAgd2Vlazoge1xyXG4gICAgICAgICAgICAgICAgZG93OiAxXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNhbGVuZGFyOiB7XHJcbiAgICAgICAgICAgICAgICBsYXN0RGF5OiAnW1llc3RlcmRheV0sIGRkZGQgTU1NIEQnLFxyXG4gICAgICAgICAgICAgICAgc2FtZURheSA6ICdbVG9kYXldLCBkZGRkIE1NTSBEJyxcclxuICAgICAgICAgICAgICAgIG5leHREYXkgOiAnW1RvbW9ycm93XSwgZGRkZCBNTU0gRCcsXHJcbiAgICAgICAgICAgICAgICBsYXN0V2VlayA6ICdkZGRkLCBNTU0gRCcsXHJcbiAgICAgICAgICAgICAgICBuZXh0V2VlayA6ICdkZGRkLCBNTU0gRCcsXHJcbiAgICAgICAgICAgICAgICBzYW1lRWxzZSA6ICdkZGRkLCBNTU0gRCdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBBZGQgQW1lcmljYS9EZXRyb2l0IHRpbWV6b25lLCBub3RlIHRoYXQgdGhpcyBpcyB0aGUgc2FtZSBhcyBUb3JvbnRvXHJcbiAgICAgICAgbW9tZW50LnR6LmFkZChcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgJ0FtZXJpY2EvRGV0cm9pdHxFU1QgRURUfDUwIDQwfDAxMDEwMTAxMDEwMTAxMDEwMTAxMDEwfDFCUVQwIDF6YjAgT3AwIDF6YjAgT3AwIDF6YjAgT3AwIDF6YjAgT3AwIDF6YjAgT3AwIDF6YjAgUmQwIDF6YjAgT3AwIDF6YjAgT3AwIDF6YjAgT3AwIDF6YjAgT3AwIDF6YjAnLFxyXG4gICAgICAgICAgICAgICAgXCJFdGMvVVRDfFVUQ3wwfDB8XCJcclxuICAgICAgICAgICAgXSk7XHJcbiAgICB9XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgndXRpbGl0aWVzLmdvb2dsZWFuYWx5dGljcycpXHJcbiAgICAgICAgLnJ1bihydW4pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHJ1bigpXHJcbiAgICB7XHJcbiAgICAgICAgKGZ1bmN0aW9uKGkscyxvLGcscixhLG0pe2lbJ0dvb2dsZUFuYWx5dGljc09iamVjdCddPXI7aVtyXT1pW3JdfHxmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAoaVtyXS5xPWlbcl0ucXx8W10pLnB1c2goYXJndW1lbnRzKX0saVtyXS5sPTEqbmV3IERhdGUoKTthPXMuY3JlYXRlRWxlbWVudChvKSxcclxuICAgICAgICAgICAgbT1zLmdldEVsZW1lbnRzQnlUYWdOYW1lKG8pWzBdO2EuYXN5bmM9MTthLnNyYz1nO20ucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYSxtKVxyXG4gICAgICAgIH0pKHdpbmRvdyxkb2N1bWVudCwnc2NyaXB0JywnLy93d3cuZ29vZ2xlLWFuYWx5dGljcy5jb20vYW5hbHl0aWNzLmpzJywnZ2EnKTtcclxuXHJcbiAgICAgICAgZ2EoJ2NyZWF0ZScsICdVQS01NDU1MzYxMi0xJywgJ2F1dG8nKTtcclxuICAgICAgICBnYSgncmVxdWlyZScsICdkaXNwbGF5ZmVhdHVyZXMnKTtcclxuICAgIH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2NoZWR1bGUgcm91dGUgY29uZmlndXJhdGlvblxyXG4gICAgICovXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnanAuc2NoZWR1bGUucm91dGVzJylcclxuICAgICAgICAuY29uZmlnKHNjaGVkdWxlUm91dGVDb25maWcpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUm91dGUgY29uZmlndXJhdGlvbixcclxuICAgICAqIHVzZXMgU0NIRURVTEVfUk9PVF9ST1VURSBhcyBhYnN0cmFjdCBwYXJlbnQgc3RhdGVcclxuICAgICAqIEBwYXJhbSAkc3RhdGVQcm92aWRlclxyXG4gICAgICogQHBhcmFtIFNDSEVEVUxFX1JPT1RfUk9VVEVcclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBzY2hlZHVsZVJvdXRlQ29uZmlnKCRzdGF0ZVByb3ZpZGVyLCBTQ0hFRFVMRV9ST09UX1JPVVRFKVxyXG4gICAge1xyXG4gICAgICAgIC8vIFBhcmVudCBTdGF0ZSdzIG5hbWUgdG8gYmUgaW5jbHVkZWQgaW4gZXZlcnkgc3RhdGVcclxuICAgICAgICB2YXIgcGFyZW50ID0gU0NIRURVTEVfUk9PVF9ST1VURS5uYW1lO1xyXG5cclxuICAgICAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgICAgICAgICAvLyBMb2NhbCByb3V0ZXNcclxuICAgICAgICAgICAgLnN0YXRlKHBhcmVudCsnLmFjdGl2aXRpZXMnLCB7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICcvYWN0aXZpdGllcycsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJhcHAvY29tcG9uZW50cy9zY2hlZHVsZS9sYXlvdXQvYWN0aXZpdGllcy9hY3Rpdml0aWVzLWxheW91dC5odG1sXCIsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiBcIkFjdGl2aXRpZXNMYXlvdXRDdHJsXCIsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyQXM6IFwidm1cIixcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpdml0aWVzRGF0YVNlcnZpY2U6IGdldEFjdGl2aXR5RGF0YVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhdGUocGFyZW50Kycuc2Vzc2lvbnMnLCB7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICcvc2Vzc2lvbnMve2FjdGl2aXR5SWR9L3t3ZWVrc0Zyb21Ub2RheX0nLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwL2NvbXBvbmVudHMvc2NoZWR1bGUvbGF5b3V0L2FjdGl2aXR5LXNlc3Npb25zL2FjdGl2aXR5LXNlc3Npb25zLWxheW91dC5odG1sXCIsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiBcIkFjdGl2aXR5U2Vzc2lvbkxheW91dENvbnRyb2xsZXJcIixcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXJBczogXCJ2bVwiLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5U2Vzc2lvbnNEYXRhOiBnZXRBY3Rpdml0eVNlc3Npb25zRGF0YVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gUm91dGUgUmVzb2x2ZXNcclxuXHJcbiAgICAgICAgLyogQG5nSW5qZWN0ICovXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0QWN0aXZpdHlEYXRhKHNjaGVkdWxlQmFzZUxheW91dERhdGFTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzY2hlZHVsZUJhc2VMYXlvdXREYXRhU2VydmljZS5sb2FkKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiBAbmdJbmplY3QgKi9cclxuICAgICAgICBmdW5jdGlvbiBnZXRBY3Rpdml0eVNlc3Npb25zRGF0YShhY3Rpdml0eVNlc3Npb25zTGF5b3V0RGF0YVNlcnZpY2UsICRzdGF0ZVBhcmFtcykge1xyXG4gICAgICAgICAgICByZXR1cm4gYWN0aXZpdHlTZXNzaW9uc0xheW91dERhdGFTZXJ2aWNlLmxvYWQoJHN0YXRlUGFyYW1zWydhY3Rpdml0eUlkJ10sICRzdGF0ZVBhcmFtc1snd2Vla3NGcm9tVG9kYXknXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcblxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2pwLnNjaGVkdWxlLmxheW91dHMnKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCdBY3Rpdml0aWVzTGF5b3V0Q3RybCcsIEFjdGl2aXRpZXNMYXlvdXRDdHJsKTtcclxuXHJcbiAgICAvKiBAbmdJbmplY3QgKi9cclxuICAgIGZ1bmN0aW9uIEFjdGl2aXRpZXNMYXlvdXRDdHJsKGFjdGl2aXRpZXNEYXRhU2VydmljZSlcclxuICAgIHtcclxuICAgICAgICB2YXIgdm0gPSB0aGlzO1xyXG5cclxuICAgICAgICBhY3RpdmF0ZSgpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcclxuICAgICAgICAgICAgdm0uYWN0aXZpdGllcyA9IGFjdGl2aXRpZXNEYXRhU2VydmljZS5kcm9waW5BY3Rpdml0aWVzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdqcC5zY2hlZHVsZS5sYXlvdXRzJylcclxuICAgICAgICAuY29udHJvbGxlcignQWN0aXZpdHlTZXNzaW9uTGF5b3V0Q29udHJvbGxlcicsIEFjdGl2aXR5U2Vzc2lvbkxheW91dENvbnRyb2xsZXIpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWVkaWF0ZXMgZGF0YSB0byB1bmRlcmx5aW5nIGxheW91dCwgYWN0aXZpdHlTZXNzaW9uc0RhdGEgY29udGFpbnM6XHJcbiAgICAgKiB7XHJcbiAgICAgKiAgICAgIGFjdGl2aXR5OiAnc3RyaW5nJyxcclxuICAgICAqICAgICAgYWN0aXZpdHlTZXNzaW9uOiBbIHsgZGF0ZTogbW9tZW50LCBzZXNzaW9uczogWyBzZXNzaW9uLCBzZXNzaW9uIF0gXVxyXG4gICAgICogfVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBhY3Rpdml0eVNlc3Npb25zRGF0YVxyXG4gICAgICogQHBhcmFtIGxvZ2dlclNlcnZpY2VcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICogQG5nSW5qZWN0XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIEFjdGl2aXR5U2Vzc2lvbkxheW91dENvbnRyb2xsZXIoYWN0aXZpdHlTZXNzaW9uc0RhdGEsIGxvZ2dlclNlcnZpY2UsICRzdGF0ZSlcclxuICAgIHtcclxuXHJcbiAgICAgICAgdmFyIHZtID0gdGhpcztcclxuXHJcbiAgICAgICAgYWN0aXZhdGUoKTtcclxuXHJcbiAgICAgICAgLy9cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWN0aXZhdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gQ29uZmlndXJlIFdlZWsgaWRlbnRpZmllcnNcclxuICAgICAgICAgICAgaWYgKGFjdGl2aXR5U2Vzc2lvbnNEYXRhLnNlbGVjdGVkV2VlayA9PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2bS53ZWVrSWRlbnRpZmllciA9IFwiVGhpc1wiO1xyXG4gICAgICAgICAgICAgICAgdm0ub3Bwb3NpdGVXZWVrSWRlbnRpZmllciA9IFwiTmV4dFwiO1xyXG4gICAgICAgICAgICAgICAgdm0ub3Bwb3NpdGVXZWVrID0gMTtcclxuICAgICAgICAgICAgICAgIHZtLmFjdGl2aXR5U2Vzc2lvbnMgPSBhY3Rpdml0eVNlc3Npb25zRGF0YS5hY3Rpdml0eVNlc3Npb25zVGhpc1dlZWs7XHJcbiAgICAgICAgICAgICAgICB2bS5lbmFibGVXZWVrU3dpdGNoID0gYWN0aXZpdHlTZXNzaW9uc0RhdGEuYWN0aXZpdHlTZXNzaW9uc05leHRXZWVrLmxlbmd0aCA+PSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGFjdGl2aXR5U2Vzc2lvbnNEYXRhLnNlbGVjdGVkV2VlayA9PSAxKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2bS53ZWVrSWRlbnRpZmllciA9IFwiTmV4dFwiO1xyXG4gICAgICAgICAgICAgICAgdm0ub3Bwb3NpdGVXZWVrSWRlbnRpZmllciA9IFwiTGFzdFwiO1xyXG4gICAgICAgICAgICAgICAgdm0ub3Bwb3NpdGVXZWVrID0gMDtcclxuICAgICAgICAgICAgICAgIHZtLmFjdGl2aXR5U2Vzc2lvbnMgPSBhY3Rpdml0eVNlc3Npb25zRGF0YS5hY3Rpdml0eVNlc3Npb25zTmV4dFdlZWs7XHJcbiAgICAgICAgICAgICAgICB2bS5lbmFibGVXZWVrU3dpdGNoID0gdHJ1ZTsgLy8gU2hvdWxkIGFsd2F5cyBiZSBhYmxlIHRvIGdvIGJhY2tcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gRGlzcGxheSBhY3Rpdml0eSBkZXRhaWxzXHJcbiAgICAgICAgICAgIHZtLmFjdGl2aXR5TGFiZWwgPSBhY3Rpdml0eVNlc3Npb25zRGF0YS5hY3Rpdml0eS5hY3Rpdml0eTtcclxuICAgICAgICAgICAgdm0uYWN0aXZpdHlJZCA9IGFjdGl2aXR5U2Vzc2lvbnNEYXRhLmFjdGl2aXR5LmlkO1xyXG4gICAgICAgICAgICB2bS5hY3Rpdml0eUNhdGVnb3J5ID0gYWN0aXZpdHlTZXNzaW9uc0RhdGEuYWN0aXZpdHkuY2F0ZWdvcnk7XHJcbiAgICAgICAgICAgIHZtLmFjdGl2aXR5SXNXb21lbk9ubHkgPSBhY3Rpdml0eVNlc3Npb25zRGF0YS5hY3Rpdml0eS53b21lbl9vbmx5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgndXRpbGl0aWVzLmFwaScpXHJcbiAgICAgICAgLmZhY3RvcnkoJ2FwaVRyYW5zZm9ybWVyU2VydmljZScsIGFwaVRyYW5zZm9ybWVyU2VydmljZSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVdGlsaXR5IGZ1bmN0aW9ucyB0byB0cmFuc2Zvcm0gQVBJIGNhbGxzXHJcbiAgICAgKiBAcmV0dXJucyB7e3Byb3A6IHByb3B9fVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBhcGlUcmFuc2Zvcm1lclNlcnZpY2UoRGF0ZVRpbWVTZXJ2aWNlLCBVVENfVElNRUZPUk1BVClcclxuICAgIHtcclxuICAgICAgICB2YXIgc2VydmljZSA9IHtcclxuICAgICAgICAgICAgcmVwbGFjZURhdGVUaW1lOiByZXBsYWNlRGF0ZVRpbWVcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gc2VydmljZTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVwbGFjZXMgYWxsIE15U1FMIERhdGVUaW1lIHN0cmluZ3MgaW4gYSBKU09OIG9iamVjdC9hcnJheVxyXG4gICAgICAgICAqIEBwYXJhbSBvYmpcclxuICAgICAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiByZXBsYWNlRGF0ZVRpbWUob2JqKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqID09PSBcInN0cmluZ1wiIHx8IG9iaiBpbnN0YW5jZW9mIFN0cmluZylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gU1FMIFRpbWUgbWF0Y2hpbmcgcGF0dGVyblxyXG4gICAgICAgICAgICAgICAgdmFyIHBhdHRlcm4gPSAvWzAtOV17NH0tWzAtMV17MX1bMC05XXsxfS1bMC0zXXsxfVswLTldezF9IFswLTJdezF9WzAtOV17MX06WzAtNV17MX1bMC05XXsxfTpbMC01XXsxfVswLTldezF9LztcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGF0dGVybi50ZXN0KG9iaikpIHsgIC8vIGQudmFsdWVPZigpIGNvdWxkIGFsc28gd29ya1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRhdGUgaXMgdmFsaWRcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gRGF0ZVRpbWVTZXJ2aWNlLnBhcnNlVVRDKG9iaik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBkYXRlIGlzIG5vdCB2YWxpZFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAob2JqLmNvbnN0cnVjdG9yID09PSBBcnJheSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNsb25lZE9iaiA9IFtdO1xyXG4gICAgICAgICAgICAgICAgLy8gRm9yIGVhY2ggaXRlbSwgd2UgcmVhc3NpZ24gJiByZWN1cnNpdmVseSBjYWxsIHJlcGxhY2VEYXRlVGltZVxyXG4gICAgICAgICAgICAgICAgb2JqLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgsIGFycmF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvbmVkT2JqLnB1c2gocmVwbGFjZURhdGVUaW1lKGVsZW1lbnQpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNsb25lZE9iajtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBPYmplY3QpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBjbG9uZWRPYmogPSB7fTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHByb3AgaW4gb2JqKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocHJvcCkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9uZWRPYmpbcHJvcF0gPSByZXBsYWNlRGF0ZVRpbWUob2JqW3Byb3BdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2xvbmVkT2JqO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3V0aWxpdGllcy5hcGknKVxyXG4gICAgICAgIC5mYWN0b3J5KCdhcGlTZXJ2aWNlJywgYXBpRmFjdG9yeSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXcmFwcGVyIGFyb3VuZCAkaHR0cCB0aGF0IGFjdHMgYXMgdGhlIGRhdGEgcHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSAkaHR0cCAtIGh0dHAgY2xpZW50XHJcbiAgICAgKiBAcGFyYW0gQVBJX0NPTkZJRyAtIEFQSSBjb25zdGFudHNcclxuICAgICAqIEBwYXJhbSBhcGlUcmFuc2Zvcm1lclNlcnZpY2UgLSB0cmFuc2Zvcm1lciBzZXJ2aWNlXHJcbiAgICAgKiBAcmV0dXJucyB7e2dldDogZ2V0LCBwb3N0OiBwb3N0fX0gLSBnZXQgYW5kIHBvc3Qgc2VydmljZXNcclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBhcGlGYWN0b3J5KCRodHRwLCBBUElfQ09ORklHLCBhcGlUcmFuc2Zvcm1lclNlcnZpY2UpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZ2V0OiBnZXQsXHJcbiAgICAgICAgICAgIHBvc3Q6IHBvc3RcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUYWtlcyBhbnkgaW5wdXQgYW5kIGNhbGxzIGEgSFRUUCBQT1NUIG9uIHRoZSBnaXZlbiByb3V0ZVxyXG4gICAgICAgICAqIEBwYXJhbSByb3V0ZSAtIFJvdXRlIGZvciBwb3N0aW5nXHJcbiAgICAgICAgICogQHBhcmFtIGlucHV0IC0gUGF5bG9hZFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHBvc3Qocm91dGUsIGlucHV0KSB7XHJcbiAgICAgICAgICAgIGlmICghaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgIGlucHV0ID0ge307XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KEFQSV9DT05GSUcuQkFTRV9ST1VURSArICcvJyArIHJvdXRlLCBpbnB1dCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDYWxscyBhIEhUVFAgR0VUIG9uIHRoZSBnaXZlbiByb3V0ZVxyXG4gICAgICAgICAqIEBwYXJhbSByb3V0ZSAtIFJvdXRlIHRvIGdldFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtuZy5JUHJvbWlzZTxUUmVzdWx0PnwqfSAtIFByb21pc2Ugb2YgcmVzdWx0c1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldChyb3V0ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHBcclxuICAgICAgICAgICAgICAgIC5nZXQoQVBJX0NPTkZJRy5CQVNFX1JPVVRFICsgJy8nICsgcm91dGUpXHJcbiAgICAgICAgICAgICAgICAudGhlbihnZXREYXRhKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oYXBpVHJhbnNmb3JtZXJTZXJ2aWNlLnJlcGxhY2VEYXRlVGltZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXREYXRhKHBheWxvYWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBheWxvYWQuZGF0YVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCd1dGlsaXRpZXMuZGF0ZXRpbWUnKVxyXG4gICAgICAgIC5mYWN0b3J5KCdEYXRlVGltZVNlcnZpY2UnLCBEYXRlVGltZUZhY3RvcnkpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGF0ZSBUaW1lIHV0aWxpdHkgYmVsdCB0aGF0IHV0aWxpemVzIG1vbWVudCAmIHN1cHBsaWVzIGtleVxyXG4gICAgICogdXRpbGl0aWVzIGZvciB3b3JraW5nIHdpdGggTXlTUUwgRGF0ZVRpbWUgJiB0aW1lIHpvbmUgaXNzdWVzXHJcbiAgICAgKiBAcmV0dXJucyB7e25vdzogbm93LCB0b1VUQzogdG9VVEMsIHBhcnNlVVRDOiBwYXJzZVVUQ319XHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBEYXRlVGltZUZhY3RvcnkoVVRDX1RJTUVGT1JNQVQpIHtcclxuXHJcbiAgICAgICAgdmFyIHNlcnZpY2UgPSB7XHJcbiAgICAgICAgICAgIG5vdzogbm93LFxyXG4gICAgICAgICAgICB0b1VUQzogdG9VVEMsXHJcbiAgICAgICAgICAgIHBhcnNlVVRDOiBwYXJzZVVUQyxcclxuICAgICAgICAgICAgZ2V0RGF5c0luVGhpc1dlZWs6IGdldERheXNJblRoaXNXZWVrXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNlcnZpY2U7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFByb3ZpZGUgYW4gaW50ZXJmYWNlIHRvIHJldHJpZXZlIGEgbW9tZW50L2RhdGVcclxuICAgICAgICAgKiBAcmV0dXJucyBtb21lbnRcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBub3coKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtb21lbnQudHoobmV3IERhdGUoKSwgJ0FtZXJpY2EvRGV0cm9pdCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVHJhbnNmb3JtcyBtb21lbnQgaW50byBNeVNRTCBhY2NlcHRhYmxlIFVUQyBEYXRlVGltZSBvYmplY3RcclxuICAgICAgICAgKiBAcGFyYW0gbW9tZW50T2JqXHJcbiAgICAgICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gdG9VVEMobW9tZW50T2JqKSB7XHJcbiAgICAgICAgICAgIGlmICghbW9tZW50LmlzTW9tZW50KG1vbWVudE9iaikpIHtcclxuICAgICAgICAgICAgICAgIGV4Y2VwdGlvblNlcnZpY2UuY2F0Y2hlcignTm9uLW1vbWVudCBvYmplY3QgZGV0ZWN0ZWQnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG1vbWVudE9iai50eihcIkV0Yy9VVENcIikuZm9ybWF0KFVUQ19USU1FRk9STUFUKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRyYW5zZm9ybXMgTXlTUUwgVVRDIHRpbWUgU3RyaW5ncyBpbnRvIG1vbWVudHNcclxuICAgICAgICAgKiBAcGFyYW0gdXRjU3RyaW5nXHJcbiAgICAgICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gcGFyc2VVVEModXRjU3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtb21lbnQudHoodXRjU3RyaW5nLCAnQW1lcmljYS9EZXRyb2l0Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXRyaWV2ZXMgYW4gYXJyYXkgb2YgbW9tZW50cyBmb3IgdGhpcyB3ZWVrLFxyXG4gICAgICAgICAqIGVhY2ggbW9tZW50IHJlcHJlc2VudHMgdGhlIHN0YXJ0IG9mIHRoZSBkYXkuXHJcbiAgICAgICAgICogQHJldHVybnM6XHJcbiAgICAgICAgICogW1xyXG4gICAgICAgICAqICAgICAgbW9tZW50LCAvLyBNb21lbnQgZm9yIE1vbmRheVxyXG4gICAgICAgICAqICAgICAgbW9tZW50IC8vICBNb21lbnQgZm9yIFR1ZXNkYXlcclxuICAgICAgICAgKiAgICAgIC4uLiAvLyBTbyBvbiB0aWwgU3VuZGF5XHJcbiAgICAgICAgICogXVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldERheXNJblRoaXNXZWVrKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZ2V0RGF5c0luV2Vlayhub3coKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXRyaWV2ZXMgYW4gYXJyYXkgb2YgbW9tZW50cyBmb3IgYSB3ZWVrLCB0aGUgd2VlayBpcyBiYXNlZFxyXG4gICAgICAgICAqIG9uIHRoZSBpbnB1dHRlZCBtb21lbnRcclxuICAgICAgICAgKiBAcGFyYW0gZGF5SW5XZWVrXHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKiBbXHJcbiAgICAgICAgICogICAgICBtb21lbnQsIC8vIE1vbWVudCBmb3IgTW9uZGF5XHJcbiAgICAgICAgICogICAgICBtb21lbnQgLy8gIE1vbWVudCBmb3IgVHVlc2RheVxyXG4gICAgICAgICAqICAgICAgLi4uIC8vIFNvIG9uIHRpbCBTdW5kYXlcclxuICAgICAgICAgKiBdXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0RGF5c0luV2VlayhkYXlJbldlZWspIHtcclxuICAgICAgICAgICAgdmFyIGZpcnN0RGF5T2ZXZWVrID0gZGF5SW5XZWVrLnN0YXJ0T2YoJ3dlZWsnKTtcclxuICAgICAgICAgICAgdmFyIGRheXNJbldlZWsgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNzsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBkYXlzSW5XZWVrLnB1c2goYW5ndWxhci5jb3B5KGZpcnN0RGF5T2ZXZWVrKS5hZGQoaSwgJ2RheXMnKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkYXlzSW5XZWVrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3V0aWxpdGllcy5leGNlcHRpb24nKVxyXG4gICAgICAgIC5mYWN0b3J5KCdleGNlcHRpb25TZXJ2aWNlJywgZXhjZXB0aW9uRmFjdG9yeSk7XHJcblxyXG4gICAgLyogQG5nSW5qZWN0ICovXHJcbiAgICBmdW5jdGlvbiBleGNlcHRpb25GYWN0b3J5KGxvZ2dlclNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgc2VydmljZSA9IHtcclxuICAgICAgICAgICAgY2F0Y2hlcjogY2F0Y2hlclxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDYXRjaGVzIGV4Y2VwdGlvbnMsIGxvZ3MgcmVhc29uIGludG8gY29uc29sZS5cclxuICAgICAgICAgKiBAcGFyYW0gbWVzc2FnZVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBjYXRjaGVyKG1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHJlYXNvbikge1xyXG4gICAgICAgICAgICAgICAgbG9nZ2VyU2VydmljZS5lcnJvcihtZXNzYWdlLCByZWFzb24pO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXcmFwcGVyIGFyb3VuZCB0b2FzdHJcclxuICAgICAqL1xyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3V0aWxpdGllcy5sb2dnZXInKVxyXG4gICAgICAgIC5mYWN0b3J5KCdsb2dnZXJTZXJ2aWNlJywgbG9nZ2VyRmFjdG9yeSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWFscyB3aXRoIHJldmVhbGluZyAmIGxvZ2dpbmcuXHJcbiAgICAgKiBAcmV0dXJucyB7XHJcbiAgICAgKiB7c2hvd1RvYXN0czogYm9vbGVhbiwgZXJyb3I6IGVycm9yLCBpbmZvOiBpbmZvLCBzdWNjZXNzOiBzdWNjZXNzLCB3YXJuaW5nOiB3YXJuaW5nLCBsb2c6ICgkbG9nLmxvZ3wqKX19XHJcbiAgICAgKiBAbmdJbmplY3RcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gbG9nZ2VyRmFjdG9yeSgkbG9nLCB0b2FzdHIpIHtcclxuICAgICAgICB2YXIgc2VydmljZSA9IHtcclxuICAgICAgICAgICAgc2hvd1RvYXN0czogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIGVycm9yOiBlcnJvcixcclxuICAgICAgICAgICAgaW5mbzogaW5mbyxcclxuICAgICAgICAgICAgc3VjY2Vzczogc3VjY2VzcyxcclxuICAgICAgICAgICAgd2FybmluZzogd2FybmluZyxcclxuXHJcbiAgICAgICAgICAgIGxvZzogJGxvZy5sb2dcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gc2VydmljZTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVkIGVycm9yIHRvYXN0IHdpdGggYSBjcm9zc1xyXG4gICAgICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgICAgICogQHBhcmFtIGRhdGFcclxuICAgICAgICAgKiBAcGFyYW0gdGl0bGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBlcnJvcihtZXNzYWdlLCBkYXRhLCB0aXRsZSkge1xyXG4gICAgICAgICAgICB0b2FzdHIuZXJyb3IobWVzc2FnZSwgdGl0bGUpO1xyXG4gICAgICAgICAgICAkbG9nLmVycm9yKCdFcnJvcjogJyArIG1lc3NhZ2UsIGRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTGlnaHQgYmx1ZSB0b2FzdCB3aXRoIGV4Y2xhbWF0aW9uIG1hcmtcclxuICAgICAgICAgKiBAcGFyYW0gbWVzc2FnZVxyXG4gICAgICAgICAqIEBwYXJhbSBkYXRhXHJcbiAgICAgICAgICogQHBhcmFtIHRpdGxlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gaW5mbyhtZXNzYWdlLCBkYXRhLCB0aXRsZSkge1xyXG4gICAgICAgICAgICB0b2FzdHIuaW5mbyhtZXNzYWdlLCB0aXRsZSk7XHJcbiAgICAgICAgICAgICRsb2cuaW5mbygnSW5mbzogJyArIG1lc3NhZ2UsIGRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR3JlZW4gdG9hc3Qgd2l0aCB0aWNrXHJcbiAgICAgICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAgICAgKiBAcGFyYW0gZGF0YVxyXG4gICAgICAgICAqIEBwYXJhbSB0aXRsZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHN1Y2Nlc3MobWVzc2FnZSwgZGF0YSwgdGl0bGUpIHtcclxuICAgICAgICAgICAgdG9hc3RyLnN1Y2Nlc3MobWVzc2FnZSwgdGl0bGUpO1xyXG4gICAgICAgICAgICAkbG9nLmluZm8oJ1N1Y2Nlc3M6ICcgKyBtZXNzYWdlLCBkYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlZCB0b2FzdCB3aXRoIENyb3NzXHJcbiAgICAgICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAgICAgKiBAcGFyYW0gZGF0YVxyXG4gICAgICAgICAqIEBwYXJhbSB0aXRsZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHdhcm5pbmcobWVzc2FnZSwgZGF0YSwgdGl0bGUpIHtcclxuICAgICAgICAgICAgdG9hc3RyLndhcm5pbmcobWVzc2FnZSwgdGl0bGUpO1xyXG4gICAgICAgICAgICAkbG9nLndhcm4oJ1dhcm5pbmc6ICcgKyBtZXNzYWdlLCBkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCd1dGlsaXRpZXMucm91dGVyJylcclxuICAgICAgICAuZmFjdG9yeSgncm91dGVyU2VydmljZScsIHJvdXRlclNlcnZpY2UpO1xyXG5cclxuICAgIC8qIEBuZ0luamVjdCAqL1xyXG4gICAgZnVuY3Rpb24gcm91dGVyU2VydmljZSgkc3RhdGUsICRyb290U2NvcGUsIGxvZ2dlclNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgaGFuZGxpbmdSb3V0ZUNoYW5nZUVycm9yID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIHJvdXRlQ291bnRzID0ge1xyXG4gICAgICAgICAgICBlcnJvcnM6IDAsXHJcbiAgICAgICAgICAgIGNoYW5nZXM6IDBcclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciByb3V0ZXMgPSBbXTtcclxuICAgICAgICB2YXIgZ29EZWZhdWx0U3RhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygkc3RhdGUuJGN1cnJlbnQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZ29EZWZhdWx0U3RhdGU6IGdvRGVmYXVsdFN0YXRlXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICAgICAgaGFuZGxlUm91dGVFcnJvcnMoKTtcclxuICAgICAgICAgICAgaGFuZGxlUm91dGVTdWNjZXNzZXMoKTtcclxuICAgICAgICAgICAgaGFuZGxlUm91dGVOb3RGb3VuZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlUm91dGVOb3RGb3VuZCgpIHtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZU5vdEZvdW5kJyxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChldmVudCwgdW5mb3VuZFN0YXRlLCBmcm9tU3RhdGUsIGZyb21QYXJhbXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaGFuZGxpbmdSb3V0ZUNoYW5nZUVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcm91dGVDb3VudHMuZXJyb3JzKys7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxpbmdSb3V0ZUNoYW5nZUVycm9yID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTG9nIFN0YXRlIG5vdCBmb3VuZFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtc2cgPSAnW1N0YXRlIG5vdCBmb3VuZF0gRXJyb3Igcm91dGluZyB0byAnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdW5mb3VuZFN0YXRlLnRvICsgJyBmcm9tICcgKyBmcm9tU3RhdGUucGFyZW50ICsgJy4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJvbVN0YXRlLm5hbWUgKyAnLic7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyU2VydmljZS53YXJuaW5nKG1zZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ29EZWZhdWx0U3RhdGUoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlUm91dGVTdWNjZXNzZXMoKSB7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdWNjZXNzJyxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICByb3V0ZUNvdW50cy5jaGFuZ2VzKys7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxpbmdSb3V0ZUNoYW5nZUVycm9yID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZVJvdXRlRXJyb3JzKCkge1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlRXJyb3InLFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKGV2ZW50LCB0b1N0YXRlLCB0b1BhcmFtcywgZnJvbVN0YXRlLCBmcm9tUGFyYW1zLCBlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChoYW5kbGluZ1JvdXRlQ2hhbmdlRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByb3V0ZUNvdW50cy5lcnJvcnMrKztcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGluZ1JvdXRlQ2hhbmdlRXJyb3IgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBMb2cgU3RhdGUgcm91dGluZyBlcnJvclxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtc2cgPSAnW1N0YXRlIFJvdXRpbmcgRXJyb3JdICcgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnRXJyb3Igcm91dGluZyB0byAnICsgdG9TdGF0ZS5uYW1lICsgJyBmcm9tICcgKyBmcm9tU3RhdGUubmFtZSArICcuJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcgRXJyb3I6ICcgKyBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICBsb2dnZXJTZXJ2aWNlLndhcm5pbmcobXNnLCBbZXJyb3JdKTtcclxuICAgICAgICAgICAgICAgICAgICBnb0RlZmF1bHRTdGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnanAuc2NoZWR1bGUuZGF0YScpXHJcbiAgICAgICAgLmZhY3RvcnkoJ3NjaGVkdWxlU2VydmljZScsIHNjaGVkdWxlRmFjdG9yeSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcm92aWRlcyBhY3Rpdml0aWVzIGFuZCB0aGVpciBhY3Rpdml0eSBzZXNzaW9uc1xyXG4gICAgICogQHBhcmFtIGFwaVNlcnZpY2VcclxuICAgICAqIEBwYXJhbSBBUElfUk9VVEVTX0NPTkZJR1xyXG4gICAgICogQHBhcmFtIGV4Y2VwdGlvblNlcnZpY2VcclxuICAgICAqIEByZXR1cm5zIHt7Z2V0RHJvcGluczogZ2V0RHJvcGlucywgZ2V0QWN0aXZpdHlTZXNzaW9uczogZ2V0QWN0aXZpdHlTZXNzaW9uc319XHJcbiAgICAgKiBAbmdJbmplY3RcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gc2NoZWR1bGVGYWN0b3J5KGFwaVNlcnZpY2UsIEFQSV9ST1VURVNfQ09ORklHLCBleGNlcHRpb25TZXJ2aWNlKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZ2V0RHJvcGluczogZ2V0RHJvcGlucyxcclxuICAgICAgICAgICAgZ2V0QWN0aXZpdHk6IGdldEFjdGl2aXR5LFxyXG4gICAgICAgICAgICBnZXRBY3Rpdml0eVNlc3Npb25zOiBnZXRBY3Rpdml0eVNlc3Npb25zLFxyXG4gICAgICAgICAgICBqb2luQWN0aXZpdHlTZXNzaW9uOiBqb2luQWN0aXZpdHlTZXNzaW9uXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmV0cmlldmVzIGFsbCBhY3Rpdml0eSBzZXNzaW9ucyBmb3IgYSBnaXZlbiBhY3Rpdml0eVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIGFjdGl2aXR5SWQgLSBBY3Rpdml0eSBJZFxyXG4gICAgICAgICAqIEBwYXJhbSB3ZWVrcyAtIFdlZWsgdG8gcmV0cmlldmUgKDAgZm9yIHRoaXMgd2VlaylcclxuICAgICAgICAgKiBAcmV0dXJucyB7bmcuSVByb21pc2U8VFJlc3VsdD58Kn0gLSBQcm9taXNlIG9mIGFjdGl2aXR5IHNlc3Npb25zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0QWN0aXZpdHlTZXNzaW9ucyhhY3Rpdml0eUlkLCB3ZWVrcykge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGFwaVNlcnZpY2VcclxuICAgICAgICAgICAgICAgIC5nZXQoQVBJX1JPVVRFU19DT05GSUcuQUNUSVZJVElFUyArICcvJyArIGFjdGl2aXR5SWQrJy9zZXNzaW9ucy8nKyB3ZWVrcylcclxuICAgICAgICAgICAgICAgIC50aGVuKGdyb3VwQnlEYXlPZldlZWspXHJcbiAgICAgICAgICAgICAgICAudGhlbihjb252ZXJ0SXNXb21lbkJvb2xlYW4pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXhjZXB0aW9uU2VydmljZS5jYXRjaGVyKCdYSFIgRmFpbGVkIGZvciBnZXRBY3Rpdml0eVNlc3Npb25zJykpO1xyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEZvcm1hdCBhY3Rpdml0eSBzZXNzaW9ucyBieSBkYXkgb2Ygd2Vla1xyXG4gICAgICAgICAgICAgKiBAcGFyYW0gYWN0aXZpdHlTZXNzaW9uc1xyXG4gICAgICAgICAgICAgKiBAcmV0dXJucyBbXHJcbiAgICAgICAgICAgICAqICAgICAge1xyXG4gICAgICAgICAgICAgKiAgICAgICAgICBkYXRlOiBtb21lbnQsIC8vIFRoZXNlIGRheXMgYXJlIHVuaXF1ZSBkYXlzXHJcbiAgICAgICAgICAgICAqICAgICAgICAgIHNlc3Npb25zOiBbXHJcbiAgICAgICAgICAgICAqICAgICAgICAgICAgICBhY3Rpdml0eXNlc3Npb24sXHJcbiAgICAgICAgICAgICAqICAgICAgICAgICAgICAuLi5cclxuICAgICAgICAgICAgICogICAgICAgICAgXVxyXG4gICAgICAgICAgICAgKiAgICAgIH0sXHJcbiAgICAgICAgICAgICAqICAgICAgLi4uXHJcbiAgICAgICAgICAgICAqIF1cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdyb3VwQnlEYXlPZldlZWsoYWN0aXZpdHlTZXNzaW9ucykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGVQcm9wZXJ0eSA9ICdkYXRlJztcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZWR1Y2UgYWN0aXZpdHkgc2Vzc2lvbnNcclxuICAgICAgICAgICAgICAgIGFjdGl2aXR5U2Vzc2lvbnMgPSBfXHJcbiAgICAgICAgICAgICAgICAgICAgLmNoYWluKGFjdGl2aXR5U2Vzc2lvbnMpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlZHVjZShmdW5jdGlvbihkaWN0LCBhY3Rpdml0eVNlc3Npb24pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZXNzaW9uRGF0ZSA9IGFjdGl2aXR5U2Vzc2lvblsnZGF0ZSddLnN0YXJ0T2YoJ2RheScpLmZvcm1hdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF8uaGFzKGRpY3QsIHNlc3Npb25EYXRlKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQXBwZW5kIGFjdGl2aXR5IHNlc3Npb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpY3Rbc2Vzc2lvbkRhdGVdWydzZXNzaW9ucyddLnB1c2goYWN0aXZpdHlTZXNzaW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhIGtleSBmb3IgYSBuZXcgZGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGljdFtzZXNzaW9uRGF0ZV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZTogYWN0aXZpdHlTZXNzaW9uWydkYXRlJ10uc3RhcnRPZignZGF5JyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vzc2lvbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZpdHlTZXNzaW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGljdDtcclxuICAgICAgICAgICAgICAgICAgICB9LCB7fSlcclxuICAgICAgICAgICAgICAgICAgICAudG9BcnJheSgpXHJcbiAgICAgICAgICAgICAgICAgICAgLnZhbHVlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjdGl2aXR5U2Vzc2lvbnM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJldHJpZXZlcyBBY3Rpdml0eSBvYmplY3QgZ2l2ZW4gYW4gYWN0aXZpdHkgSWRcclxuICAgICAgICAgKiBAcGFyYW0gYWN0aXZpdHlJZFxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICoge1xyXG4gICAgICAgICAqICAgICAgIFwiaWRcIjo4LFxyXG4gICAgICAgICAqICAgICAgIFwiYWN0aXZpdHlcIjpcIkJhZG1pbnRvblwiLFxyXG4gICAgICAgICAqICAgICAgXCJjYXRlZ29yeVwiOlwiRHJvcCBJblwiLFxyXG4gICAgICAgICAqICAgICAgXCJ3b21lbl9vbmx5XCI6MCxcclxuICAgICAgICAgKiAgICAgIFwiY3JlYXRlZF9hdFwiOlwiMjAxNC0xMi0xNCAxNjo1MToyNVwiLFxyXG4gICAgICAgICAqICAgICAgXCJ1cGRhdGVkX2F0XCI6XCIyMDE0LTEyLTE0IDE2OjUxOjI1XCJcclxuICAgICAgICAgKiB9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0QWN0aXZpdHkoYWN0aXZpdHlJZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBhcGlTZXJ2aWNlXHJcbiAgICAgICAgICAgICAgICAuZ2V0KEFQSV9ST1VURVNfQ09ORklHLkFDVElWSVRJRVMgICsgJy8nICsgYWN0aXZpdHlJZClcclxuICAgICAgICAgICAgICAgIC5jYXRjaChleGNlcHRpb25TZXJ2aWNlLmNhdGNoZXIoJ1hIUiBGYWlsZWQgZm9yIGdldEFjdGl2aXR5U2Vzc2lvbnMnKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXRyaWV2ZXMgYWxsIGRyb3BpbiBhY3Rpdml0aWVzXHJcbiAgICAgICAgICogQHJldHVybnMge25nLklQcm9taXNlPFRSZXN1bHQ+fCp9IC0gUHJvbWlzZSBvZiBhY3Rpdml0aWVzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0RHJvcGlucygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFwaVNlcnZpY2VcclxuICAgICAgICAgICAgICAgIC5nZXQoQVBJX1JPVVRFU19DT05GSUcuQUNUSVZJVElFUylcclxuICAgICAgICAgICAgICAgIC50aGVuKGdldERyb3BpbnNDb21wbGV0ZSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGNvbnZlcnRJc1dvbWVuQm9vbGVhbilcclxuICAgICAgICAgICAgICAgIC5jYXRjaChleGNlcHRpb25TZXJ2aWNlLmNhdGNoZXIoJ1hIUiBGYWlsZWQgZm9yIGdldERyb3BpbnMnKSk7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXREcm9waW5zQ29tcGxldGUoYWN0aXZpdGllcykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjdGl2aXRpZXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEhFTFBFUiBGVU5DVElPTlNcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ29udmVydHMgd29tZW5fb25seSBib29sZWFuIHZhbHVlIGZyb20gMCwxIHRvIGZhbHNlLCB0cnVlXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0gY29sbGVjdGlvblxyXG4gICAgICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGNvbnZlcnRJc1dvbWVuQm9vbGVhbihjb2xsZWN0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXy5mb3JFYWNoKGNvbGxlY3Rpb24sIGZ1bmN0aW9uKGVsKSB7XHJcbiAgICAgICAgICAgICAgICBlbC53b21lbl9vbmx5ID0gZWwud29tZW5fb25seSAhPT0gMDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29sbGVjdGlvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGpvaW5BY3Rpdml0eVNlc3Npb24oYWN0aXZpdHlJZCwgc2Vzc2lvbklkLCBuYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFwaVNlcnZpY2VcclxuICAgICAgICAgICAgICAgIC5wb3N0KEFQSV9ST1VURVNfQ09ORklHLkFDVElWSVRJRVNcclxuICAgICAgICAgICAgICAgICthY3Rpdml0eUlkKycvc2Vzc2lvbnMvJytzZXNzaW9uSWQrJy9wYXJ0aWNpcGFudHMnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogbmFtZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEYXRhIFNlcnZpY2Ugb2JqZWN0IHRvIHJldHJpZXZlIGRhdGEgZm9yXHJcbiAgICAgKiBzY2hlZHVsZS1iYXNlLWxheW91dCBDb250cm9sbGVyXHJcbiAgICAgKi9cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdqcC5zY2hlZHVsZS5sYXlvdXRzJylcclxuICAgICAgICAuZmFjdG9yeSgnc2NoZWR1bGVCYXNlTGF5b3V0RGF0YVNlcnZpY2UnLCBzY2hlZHVsZUJhc2VMYXlvdXREYXRhRmFjdG9yeSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZXMgZGF0YSBmb3Igc2NoZWR1bGUtYmFzZS1sYXlvdXQgQ29udHJvbGxlclxyXG4gICAgICogQHJldHVybnMge3tsb2FkOiBsb2FkfX1cclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBzY2hlZHVsZUJhc2VMYXlvdXREYXRhRmFjdG9yeSgkcSwgc2NoZWR1bGVTZXJ2aWNlKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGxvYWQ6IGxvYWRcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBMb2FkcyBhbGwgZGF0YSBpbnRvIHRoaXMuZGF0YSBhbmQgcmV0dXJucyBhIHByb21pc2VcclxuICAgICAgICBmdW5jdGlvbiBsb2FkKCkge1xyXG4gICAgICAgICAgICB2YXIgZHJvcGluQWN0aXZpdGllcyA9IHNjaGVkdWxlU2VydmljZS5nZXREcm9waW5zKCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gJHEuYWxsKFtkcm9waW5BY3Rpdml0aWVzXSkudGhlbihcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHJlc3VsdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9waW5BY3Rpdml0aWVzOiByZXN1bHRzWzBdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERhdGEgU2VydmljZSBvYmplY3QgdG8gcmV0cmlldmUgZGF0YSBmb3JcclxuICAgICAqIGFjdGl2aXR5LXNlc3Npb25zLWxheW91dCBDb250cm9sbGVyXHJcbiAgICAgKi9cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdqcC5zY2hlZHVsZS5sYXlvdXRzJylcclxuICAgICAgICAuZmFjdG9yeSgnYWN0aXZpdHlTZXNzaW9uc0xheW91dERhdGFTZXJ2aWNlJywgYWN0aXZpdHlTZXNzaW9uc0xheW91dERhdGFGYWN0b3J5KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlcyBkYXRhIGZvciBhY3Rpdml0eS1zZXNzaW9ucy1sYXlvdXQgQ29udHJvbGxlclxyXG4gICAgICogQHBhcmFtICRxLFxyXG4gICAgICogQHJldHVybnMge3thY3Rpdml0eVNlc3Npb25zOiBhY3Rpdml0eVNlc3Npb25zfX1cclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBhY3Rpdml0eVNlc3Npb25zTGF5b3V0RGF0YUZhY3RvcnkoJHEsIHNjaGVkdWxlU2VydmljZSlcclxuICAgIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBsb2FkOiBsb2FkXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gbG9hZChhY3Rpdml0eUlkLCB3ZWVrc0Zyb21Ub2RheSkge1xyXG5cclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBbXHJcbiAgICAgICAgICAgICAgICBsb2FkQWN0aXZpdHlTZXNzaW9uc1RoaXNXZWVrKGFjdGl2aXR5SWQpLFxyXG4gICAgICAgICAgICAgICAgbG9hZEFjdGl2aXR5U2Vzc2lvbnNOZXh0V2VlayhhY3Rpdml0eUlkKSxcclxuICAgICAgICAgICAgICAgIGxvYWRBY3Rpdml0eShhY3Rpdml0eUlkKVxyXG4gICAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuICRxLmFsbChkYXRhKS50aGVuKFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24ocmVzdWx0cykge1xyXG4gICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICBhY3Rpdml0eVNlc3Npb25zVGhpc1dlZWs6IHJlc3VsdHNbMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZpdHlTZXNzaW9uc05leHRXZWVrOiByZXN1bHRzWzFdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5OiByZXN1bHRzWzJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkV2Vlazogd2Vla3NGcm9tVG9kYXlcclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gRGF0YSBMb2FkZXJzXHJcbiAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgICAgICAgICAgLy8gTG9hZHMgYWxsIGRhdGEgaW50byB0aGlzLmRhdGEgYW5kIHJldHVybnMgYSBwcm9taXNlXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGxvYWRBY3Rpdml0eVNlc3Npb25zVGhpc1dlZWsoYWN0aXZpdHlJZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNjaGVkdWxlU2VydmljZS5nZXRBY3Rpdml0eVNlc3Npb25zKGFjdGl2aXR5SWQsIDApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBsb2FkQWN0aXZpdHlTZXNzaW9uc05leHRXZWVrKGFjdGl2aXR5SWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzY2hlZHVsZVNlcnZpY2UuZ2V0QWN0aXZpdHlTZXNzaW9ucyhhY3Rpdml0eUlkLCAxKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gbG9hZEFjdGl2aXR5KGFjdGl2aXR5SWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzY2hlZHVsZVNlcnZpY2UuZ2V0QWN0aXZpdHkoYWN0aXZpdHlJZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdqcC5mb290ZXInKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ2pwRm9vdGVyJywganBGb290ZXIpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGpwRm9vdGVyKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJhcHAvY29tcG9uZW50cy9mb290ZXIvZm9vdGVyLmh0bWxcIlxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdqcC5zY2hlZHVsZS53aWRnZXRzLmFjdGl2aXR5UGlja2VyJylcclxuICAgICAgICAuZGlyZWN0aXZlKCdqcFNjaGVkdWxlQWN0aXZpdHlQaWNrZXInLCBqcFNjaGVkdWxlQWN0aXZpdHlQaWNrZXIpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGpwU2NoZWR1bGVBY3Rpdml0eVBpY2tlcigpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwL2NvbXBvbmVudHMvc2NoZWR1bGUvd2lkZ2V0cy9hY3Rpdml0eS1waWNrZXIvYWN0aXZpdHktcGlja2VyLmh0bWxcIixcclxuICAgICAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgICAgIGFjdGl2aXRpZXM6IFwiPVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSkge1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XHJcbiAgICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdqcC5zY2hlZHVsZS53aWRnZXRzLmFjdGl2aXR5U2Vzc2lvbnMnKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ2pwQWN0aXZpdHlTZXNzaW9uJywganBBY3Rpdml0eVNlc3Npb24pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGpwQWN0aXZpdHlTZXNzaW9uKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2NvbXBvbmVudHMvc2NoZWR1bGUvd2lkZ2V0cy9hY3Rpdml0eS1zZXNzaW9ucy9hY3Rpdml0eS1zZXNzaW9uL2FjdGl2aXR5LXNlc3Npb24uaHRtbCcsXHJcbiAgICAgICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgICAgICBzZXNzaW9uOiAnPScsXHJcbiAgICAgICAgICAgICAgICBkYXk6ICc9JyxcclxuICAgICAgICAgICAgICAgIGZpcnN0U2Vzc2lvbjogJz0nLFxyXG4gICAgICAgICAgICAgICAgbGFzdFNlc3Npb246ICc9J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiAoJHNjb3BlKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuc2hvd0RldGFpbHMgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUudG9nZ2xlU2hvd0RldGFpbHMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2hvd0RldGFpbHMgPSAhJHNjb3BlLnNob3dEZXRhaWxzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2pwLnNjaGVkdWxlLndpZGdldHMuYWN0aXZpdHlTZXNzaW9ucycpXHJcbiAgICAgICAgLmRpcmVjdGl2ZSgnanBTY2hlZHVsZUFjdGl2aXR5U2Vzc2lvbnNEYXlMaXN0JywganBTY2hlZHVsZUFjdGl2aXR5U2Vzc2lvbnNEYXlMaXN0KTtcclxuXHJcbiAgICAvKiBAbmdJbmdqZWN0ICovXHJcbiAgICBmdW5jdGlvbiBqcFNjaGVkdWxlQWN0aXZpdHlTZXNzaW9uc0RheUxpc3QoRGF0ZVRpbWVTZXJ2aWNlKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2NvbXBvbmVudHMvc2NoZWR1bGUvd2lkZ2V0cy9hY3Rpdml0eS1zZXNzaW9ucy9kYXktbGlzdC9hY3Rpdml0eS1zZXNzaW9ucy1kYXktbGlzdC5odG1sJyxcclxuICAgICAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgICAgIHNlc3Npb25zOiAnPScsXHJcbiAgICAgICAgICAgICAgICBkYXk6ICc9J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcclxuICAgIH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdqcC5zY2hlZHVsZS53aWRnZXRzLmFjdGl2aXR5U2Vzc2lvbnMnKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ2pwSGVhZGVyU3VtbWFyeScsIGpwSGVhZGVyU3VtbWFyeSk7XHJcblxyXG4gICAgZnVuY3Rpb24ganBIZWFkZXJTdW1tYXJ5KCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2NvbXBvbmVudHMvc2NoZWR1bGUvd2lkZ2V0cy9hY3Rpdml0eS1zZXNzaW9ucy9oZWFkZXItc3VtbWFyeS9oZWFkZXItc3VtbWFyeS5odG1sJyxcclxuICAgICAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgICAgIGNvdW50OiAnPScsXHJcbiAgICAgICAgICAgICAgICBkYXk6ICc9JyxcclxuICAgICAgICAgICAgICAgIHNob3dMb2NhdGlvbjogJz0nLFxyXG4gICAgICAgICAgICAgICAgbG9jYXRpb246ICc9J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2pwLnNjaGVkdWxlLndpZGdldHMuYWN0aXZpdHlTZXNzaW9ucycpXHJcbiAgICAgICAgLmRpcmVjdGl2ZSgnanBTY2hlZHVsZUFjdGl2aXR5U2Vzc2lvbnNMaXN0JywganBTY2hlZHVsZUFjdGl2aXR5U2Vzc2lvbnNMaXN0KTtcclxuXHJcbiAgICBmdW5jdGlvbiBqcFNjaGVkdWxlQWN0aXZpdHlTZXNzaW9uc0xpc3QoKSB7XHJcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvY29tcG9uZW50cy9zY2hlZHVsZS93aWRnZXRzL2FjdGl2aXR5LXNlc3Npb25zL2xpc3QvYWN0aXZpdHktc2Vzc2lvbnMtbGlzdC5odG1sJyxcclxuICAgICAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgICAgIHNjaGVkdWxlOiAnPSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24gKCRzY29wZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2YnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XHJcbiAgICB9XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnanAuc2NoZWR1bGUud2lkZ2V0cy5hY3Rpdml0eVNlc3Npb25zJylcclxuICAgICAgICAuZGlyZWN0aXZlKCdqcFBhcnRpY2lwYW50Sm9pbicsIGpwUGFydGljaXBhbnRKb2luKTtcclxuXHJcbiAgICAvLyBAbmdJbmplY3RcclxuICAgIGZ1bmN0aW9uIGpwUGFydGljaXBhbnRKb2luKHNjaGVkdWxlU2VydmljZSwgdG9hc3RyLCAkc3RhdGUsIERhdGVUaW1lU2VydmljZSlcclxuICAgIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9jb21wb25lbnRzL3NjaGVkdWxlL3dpZGdldHMvYWN0aXZpdHktc2Vzc2lvbnMvcGFydGljaXBhbnQtam9pbi9wYXJ0aWNpcGFudC1qb2luLmh0bWwnLFxyXG4gICAgICAgICAgICBzY29wZToge1xyXG4gICAgICAgICAgICAgICAgYWN0aXZpdHk6ICc9JyxcclxuICAgICAgICAgICAgICAgIGFjdGl2aXR5U2Vzc2lvbjogJz0nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmpvaW4gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY2hlZHVsZVNlcnZpY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmpvaW5BY3Rpdml0eVNlc3Npb24oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuYWN0aXZpdHlTZXNzaW9uLmFjdGl2aXR5X2lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmFjdGl2aXR5U2Vzc2lvbi5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS51c2VyLm5hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9hc3RyLnN1Y2Nlc3MoJ1lvdSBoYXZlIHN1Y2Nlc3NmdWxseSBqb2luZWQhIEhhdmUgZnVuIDopJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJHN0YXRlLiRjdXJyZW50LCBudWxsLCB7IHJlbG9hZDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGFjdGl2YXRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gYWN0aXZhdGUoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS51c2VyID0ge307XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2pwLnNjaGVkdWxlLndpZGdldHMuYWN0aXZpdHlTZXNzaW9ucycpXHJcbiAgICAgICAgLmRpcmVjdGl2ZSgnanBQYXJ0aWNpcGFudExpc3QnLCBqcFBhcnRpY2lwYW50TGlzdCk7XHJcblxyXG4gICAgZnVuY3Rpb24ganBQYXJ0aWNpcGFudExpc3QoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvY29tcG9uZW50cy9zY2hlZHVsZS93aWRnZXRzL2FjdGl2aXR5LXNlc3Npb25zL3BhcnRpY2lwYW50LWxpc3QvcGFydGljaXBhbnQtbGlzdC5odG1sJyxcclxuICAgICAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50czogJz0nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSlcclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdqcC5zY2hlZHVsZS53aWRnZXRzLmFjdGl2aXR5U2Vzc2lvbnMnKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ2pwU2NoZWR1bGVVbmF2YWlsYWJsZScsIGpwU2NoZWR1bGVVbmF2YWlsYWJsZSk7XHJcblxyXG4gICAgLyogQG5nSW5qZWN0ICovXHJcbiAgICBmdW5jdGlvbiBqcFNjaGVkdWxlVW5hdmFpbGFibGUoRGF0ZVRpbWVTZXJ2aWNlKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnQScsXHJcbiAgICAgICAgICAgIHNjb3BlOiBmYWxzZSwgLy8gV2UncmUgdXNpbmcgc2Vzc2lvbi5wYXJ0aWNpcGFudHMubGVuZ3RoIGZyb20gcGFyZW50XHJcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICgkc2NvcGUuZGF5LmlzQmVmb3JlKERhdGVUaW1lU2VydmljZS5ub3coKS5zdGFydE9mKCdkYXknKSkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ3NjaGVkdWxlVW5hdmFpbGFibGUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pKCk7IiwiLy8gSW5jbHVkZSBpbiBpbmRleC5odG1sIHNvIHRoYXQgYXBwIGxldmVsIGV4Y2VwdGlvbnMgYXJlIGhhbmRsZWQuXHJcbi8vIFNob3VsZCBleGNsdWRlIGZyb20gdGVzdCBydW5uZXJcclxuKGZ1bmN0aW9uKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCd1dGlsaXRpZXMuZXhjZXB0aW9uJylcclxuICAgICAgICAucHJvdmlkZXIoJ2V4Y2VwdGlvbkhhbmRsZXInLCBleGNlcHRpb25IYW5kbGVyUHJvdmlkZXIpXHJcbiAgICAgICAgLmNvbmZpZyhjb25maWcpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTXVzdCBjb25maWd1cmUgdGhlIGV4Y2VwdGlvbiBoYW5kbGluZ1xyXG4gICAgICogQHJldHVybiB7W3R5cGVdfVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBleGNlcHRpb25IYW5kbGVyUHJvdmlkZXIoKSB7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSB7XHJcbiAgICAgICAgICAgIGFwcEVycm9yUHJlZml4OiB1bmRlZmluZWRcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmNvbmZpZ3VyZSA9IGZ1bmN0aW9uIChhcHBFcnJvclByZWZpeCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5hcHBFcnJvclByZWZpeCA9IGFwcEVycm9yUHJlZml4O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuJGdldCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge2NvbmZpZzogdGhpcy5jb25maWd9O1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25maWd1cmUgYnkgc2V0dGluZyBhbiBvcHRpb25hbCBzdHJpbmcgdmFsdWUgZm9yIGFwcEVycm9yUHJlZml4LlxyXG4gICAgICogQWNjZXNzaWJsZSB2aWEgY29uZmlnLmFwcEVycm9yUHJlZml4ICh2aWEgY29uZmlnIHZhbHVlKS5cclxuICAgICAqIEBwYXJhbSAge1t0eXBlXX0gJHByb3ZpZGVcclxuICAgICAqIEByZXR1cm4ge1t0eXBlXX1cclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBjb25maWcoJHByb3ZpZGUpIHtcclxuICAgICAgICAkcHJvdmlkZS5kZWNvcmF0b3IoJyRleGNlcHRpb25IYW5kbGVyJywgZXh0ZW5kRXhjZXB0aW9uSGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeHRlbmQgdGhlICRleGNlcHRpb25IYW5kbGVyIHNlcnZpY2UgdG8gYWxzbyBkaXNwbGF5IGEgdG9hc3QuXHJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9ICRkZWxlZ2F0ZVxyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBleGNlcHRpb25IYW5kbGVyXHJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGxvZ2dlclNlcnZpY2VcclxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSB0aGUgZGVjb3JhdGVkICRleGNlcHRpb25IYW5kbGVyIHNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZXh0ZW5kRXhjZXB0aW9uSGFuZGxlcigkZGVsZWdhdGUsIGV4Y2VwdGlvbkhhbmRsZXIsIGxvZ2dlclNlcnZpY2UpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oZXhjZXB0aW9uLCBjYXVzZSkge1xyXG4gICAgICAgICAgICB2YXIgYXBwRXJyb3JQcmVmaXggPSBleGNlcHRpb25IYW5kbGVyLmNvbmZpZy5hcHBFcnJvclByZWZpeCB8fCAnJztcclxuICAgICAgICAgICAgdmFyIGVycm9yRGF0YSA9IHtleGNlcHRpb246IGV4Y2VwdGlvbiwgY2F1c2U6IGNhdXNlfTtcclxuICAgICAgICAgICAgZXhjZXB0aW9uLm1lc3NhZ2UgPSBhcHBFcnJvclByZWZpeCArIGV4Y2VwdGlvbi5tZXNzYWdlO1xyXG4gICAgICAgICAgICAkZGVsZWdhdGUoZXhjZXB0aW9uLCBjYXVzZSk7XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBDb3VsZCBhZGQgdGhlIGVycm9yIHRvIGEgc2VydmljZSdzIGNvbGxlY3Rpb24sXHJcbiAgICAgICAgICAgICAqIGFkZCBlcnJvcnMgdG8gJHJvb3RTY29wZSwgbG9nIGVycm9ycyB0byByZW1vdGUgd2ViIHNlcnZlcixcclxuICAgICAgICAgICAgICogb3IgbG9nIGxvY2FsbHkuIE9yIHRocm93IGhhcmQuXHJcbiAgICAgICAgICAgICAqIHRocm93IGV4Y2VwdGlvbjtcclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgICAgICogICAgIHRocm93IHsgbWVzc2FnZTogJ2Vycm9yIG1lc3NhZ2Ugd2UgYWRkZWQnIH07XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBsb2dnZXJTZXJ2aWNlLmVycm9yKGV4Y2VwdGlvbi5tZXNzYWdlLCBlcnJvckRhdGEpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9