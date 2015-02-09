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
        [
            'jp.schedule.data',
            'jp.schedule.layouts',
            'jp.schedule.routes',
            'jp.schedule.widgets'
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
(function () {
    "use strict";

    angular.module('utilities.googleanalytics',
        [
            'angulartics',
            'angulartics.google.analytics'
        ]);

})();
(function(){
    "use strict";

    angular.module('utilities.api', [
        'utilities.datetime'
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
        'app.routes',
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
    function ActivitiesLayoutCtrl(activitiesDataService, toastr)
    {
        var vm = this;

        activate();

        function activate() {
            vm.activities = activitiesDataService.dropinActivities;
        }
    }
    ActivitiesLayoutCtrl.$inject = ["activitiesDataService", "toastr"];

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
    function ActivitySessionLayoutController(activitySessionsData, toastr)
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
    ActivitySessionLayoutController.$inject = ["activitySessionsData", "toastr"];

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

    angular
        .module('utilities.api')
        .factory('apiTransformerService', apiTransformerService);

    /**
     * Utility functions to transform API calls
     * @returns {{prop: prop}}
     */
    function apiTransformerService(DateTimeService)
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
    apiTransformerService.$inject = ["DateTimeService"];
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

        function joinActivitySession(activityId, sessionId, names)
        {
            return apiService
                .post(API_ROUTES_CONFIG.ACTIVITIES
                +'/'+activityId+'/sessions/'+sessionId+'/participants', {
                    names: names
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
                            parseCSV($scope.user.name))
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

                function parseCSV(names)
                {
                    return names.split(",");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUuanMiLCJjb3JlL2NvcmUubW9kdWxlLmpzIiwicm91dGVzL2FwcC1yb3V0ZXMubW9kdWxlLmpzIiwiY29tcG9uZW50cy9mb290ZXIvZm9vdGVyLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvc2NoZWR1bGUubW9kdWxlLmpzIiwidXRpbGl0aWVzL2RhdGV0aW1lL2RhdGV0aW1lLm1vZHVsZS5qcyIsInV0aWxpdGllcy9leGNlcHRpb24vZXhjZXB0aW9uLm1vZHVsZS5qcyIsInV0aWxpdGllcy9nb29nbGVhbmFseXRpY3MvZ29vZ2xlYW5hbHl0aWNzLm1vZHVsZS5qcyIsInV0aWxpdGllcy9hcGkvYXBpLm1vZHVsZS5qcyIsInV0aWxpdGllcy9sb2dnZXIvbG9nZ2VyLm1vZHVsZS5qcyIsInV0aWxpdGllcy9yb3V0ZXIvcm91dGVyLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvZGF0YS9zY2hlZHVsZS1kYXRhLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvbGF5b3V0L2xheW91dC5tb2R1bGUuanMiLCJjb21wb25lbnRzL3NjaGVkdWxlL3JvdXRlcy9zY2hlZHVsZS1yb3V0ZXMubW9kdWxlLmpzIiwiY29tcG9uZW50cy9zY2hlZHVsZS93aWRnZXRzL3NjaGVkdWxlLXdpZGdldHMubW9kdWxlLmpzIiwiY29tcG9uZW50cy9zY2hlZHVsZS93aWRnZXRzL2FjdGl2aXR5LXBpY2tlci9hY3Rpdml0eS1waWNrZXIubW9kdWxlLmpzIiwiY29tcG9uZW50cy9zY2hlZHVsZS93aWRnZXRzL2FjdGl2aXR5LXNlc3Npb25zL2FjdGl2aXR5LXNlc3Npb25zLm1vZHVsZS5qcyIsImNvcmUvY29yZS5jb25zdGFudC5qcyIsInJvdXRlcy9hcHAtcm91dGVzLmNvbnN0YW50LmpzIiwidXRpbGl0aWVzL2RhdGV0aW1lL2RhdGV0aW1lLmNvbnN0YW50LmpzIiwidXRpbGl0aWVzL2FwaS9hcGkuY29uc3RhbnQuanMiLCJ1dGlsaXRpZXMvbG9nZ2VyL2xvZ2dlci5jb25zdGFudC5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvcm91dGVzL3NjaGVkdWxlLXJvb3Qtcm91dGUuY29uc3RhbnQuanMiLCJjb3JlL2NvcmUuY29uZmlnLmpzIiwicm91dGVzL2FwcC1yb3V0ZXMuY29uZmlnLmpzIiwidXRpbGl0aWVzL2RhdGV0aW1lL2RhdGV0aW1lLmNvbmZpZy5qcyIsInV0aWxpdGllcy9nb29nbGVhbmFseXRpY3MvZ29vZ2xlYW5hbHl0aWNzLmNvbmZpZy5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvcm91dGVzL3NjaGVkdWxlLXJvdXRlcy5jb25maWcuanMiLCJsYXlvdXQvc2hlbGwuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvbGF5b3V0L2FjdGl2aXRpZXMvYWN0aXZpdGllcy1sYXlvdXQuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvbGF5b3V0L2FjdGl2aXR5LXNlc3Npb25zL2FjdGl2aXR5LXNlc3Npb25zLWxheW91dC5jb250cm9sbGVyLmpzIiwidXRpbGl0aWVzL2RhdGV0aW1lL2RhdGV0aW1lLmZhY3RvcnkuanMiLCJ1dGlsaXRpZXMvZXhjZXB0aW9uL2V4Y2VwdGlvbi5mYWN0b3J5LmpzIiwidXRpbGl0aWVzL2FwaS9hcGktdHJhbnNmb3JtZXIuZmFjdG9yeS5qcyIsInV0aWxpdGllcy9hcGkvYXBpLmZhY3RvcnkuanMiLCJ1dGlsaXRpZXMvbG9nZ2VyL2xvZ2dlci5mYWN0b3J5LmpzIiwidXRpbGl0aWVzL3JvdXRlci9yb3V0ZXIuZmFjdG9yeS5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvZGF0YS9zY2hlZHVsZS1kYXRhLmZhY3RvcnkuanMiLCJjb21wb25lbnRzL3NjaGVkdWxlL2xheW91dC9hY3Rpdml0aWVzL2FjdGl2aXRpZXMtbGF5b3V0LmRhdGEuZmFjdG9yeS5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvbGF5b3V0L2FjdGl2aXR5LXNlc3Npb25zL2FjdGl2aXR5LXNlc3Npb25zLWxheW91dC5kYXRhLmZhY3RvcnkuanMiLCJjb21wb25lbnRzL2Zvb3Rlci9mb290ZXIuZGlyZWN0aXZlLmpzIiwiY29tcG9uZW50cy9zY2hlZHVsZS93aWRnZXRzL2FjdGl2aXR5LXBpY2tlci9hY3Rpdml0eS1waWNrZXIuZGlyZWN0aXZlLmpzIiwiY29tcG9uZW50cy9zY2hlZHVsZS93aWRnZXRzL2FjdGl2aXR5LXNlc3Npb25zL2FjdGl2aXR5LXNlc3Npb24vYWN0aXZpdHktc2Vzc2lvbi5kaXJlY3RpdmUuanMiLCJjb21wb25lbnRzL3NjaGVkdWxlL3dpZGdldHMvYWN0aXZpdHktc2Vzc2lvbnMvaGVhZGVyLXN1bW1hcnkvaGVhZGVyLXN1bW1hcnkuZGlyZWN0aXZlLmpzIiwiY29tcG9uZW50cy9zY2hlZHVsZS93aWRnZXRzL2FjdGl2aXR5LXNlc3Npb25zL2xpc3QvYWN0aXZpdHktc2Vzc2lvbnMtbGlzdC5kaXJlY3RpdmUuanMiLCJjb21wb25lbnRzL3NjaGVkdWxlL3dpZGdldHMvYWN0aXZpdHktc2Vzc2lvbnMvZGF5LWxpc3QvYWN0aXZpdHktc2Vzc2lvbnMtZGF5LWxpc3QuZGlyZWN0aXZlLmpzIiwiY29tcG9uZW50cy9zY2hlZHVsZS93aWRnZXRzL2FjdGl2aXR5LXNlc3Npb25zL3BhcnRpY2lwYW50LWpvaW4vcGFydGljaXBhbnQtam9pbi5kaXJlY3RpdmUuanMiLCJjb21wb25lbnRzL3NjaGVkdWxlL3dpZGdldHMvYWN0aXZpdHktc2Vzc2lvbnMvcGFydGljaXBhbnQtbGlzdC9wYXJ0aWNpcGFudC1saXN0LmRpcmVjdGl2ZS5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvd2lkZ2V0cy9hY3Rpdml0eS1zZXNzaW9ucy9zY2hlZHVsZS11bmF2YWlsYWJsZS9zY2hlZHVsZS11bmF2YWlsYWJsZS5kaXJlY3RpdmUuanMiLCJ1dGlsaXRpZXMvZXhjZXB0aW9uL2V4Y2VwdGlvbi1oYW5kbGVyLnByb3ZpZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLENBQUEsWUFBQTtJQUNBOzs7OztJQUtBLFFBQUEsT0FBQSxZQUFBO1FBQ0E7UUFDQTtRQUNBOzs7O0FDVEEsQ0FBQSxZQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBO1FBQ0E7Ozs7WUFJQTtZQUNBOzs7O1lBSUE7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBOzs7O1lBSUE7Ozs7O0FDdEJBLENBQUEsWUFBQTtJQUNBOzs7OztJQUtBLFFBQUEsT0FBQSxjQUFBO1FBQ0E7UUFDQTs7OztBQ1JBLENBQUEsWUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxhQUFBOzs7QUNIQSxDQUFBLFlBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUE7UUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBOzs7O0FDUkEsQ0FBQSxZQUFBO0lBQ0E7Ozs7Ozs7O0lBUUEsUUFBQSxPQUFBO1FBQ0E7WUFDQTs7OztBQ1hBLENBQUEsWUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQTtRQUNBO1lBQ0E7Ozs7QUNMQSxDQUFBLFlBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUE7UUFDQTtZQUNBO1lBQ0E7Ozs7QUNOQSxDQUFBLFVBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsaUJBQUE7UUFDQTs7Ozs7QUNKQSxDQUFBLFlBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUE7UUFDQTs7O0FDSkEsQ0FBQSxZQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBO1FBQ0E7WUFDQTs7Ozs7OztBQ0ZBLENBQUEsVUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxvQkFBQTtRQUNBO1FBQ0E7Ozs7QUNSQSxDQUFBLFlBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUE7UUFDQTtZQUNBOzs7O0FDTEEsQ0FBQSxZQUFBO0lBQ0E7Ozs7O0lBS0EsUUFBQSxPQUFBLHNCQUFBO1FBQ0E7UUFDQTtRQUNBOzs7O0FDVEEsQ0FBQSxZQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBO1FBQ0E7WUFDQTtZQUNBOzs7O0FDTkEsQ0FBQSxVQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLHNDQUFBO1FBQ0E7Ozs7QUNKQSxDQUFBLFlBQUE7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QTtZQUNBOzs7Ozs7O0FDZkEsQ0FBQSxZQUFBO0lBQ0E7O0lBRUE7U0FDQSxPQUFBO1NBQ0EsVUFBQSx5QkFBQTs7O0lBR0EsU0FBQSxzQkFBQTtJQUNBO1FBQ0EsT0FBQTtZQUNBLFVBQUE7WUFDQSxPQUFBO1lBQ0EsTUFBQSxTQUFBLFFBQUE7WUFDQTtnQkFDQSxJQUFBLE9BQUEsSUFBQSxTQUFBLGdCQUFBLE1BQUEsUUFBQTtnQkFDQTtvQkFDQSxTQUFBLFNBQUE7Ozs7Ozs7Ozs7QUNmQSxDQUFBLFdBQUE7SUFDQTs7SUFFQTtTQUNBLE9BQUE7U0FDQSxTQUFBLG9CQUFBO1NBQ0EsT0FBQTs7Ozs7O0lBTUEsU0FBQSwyQkFBQTtRQUNBLEtBQUEsU0FBQTtZQUNBLGdCQUFBOzs7UUFHQSxLQUFBLFlBQUEsVUFBQSxnQkFBQTtZQUNBLEtBQUEsT0FBQSxpQkFBQTs7O1FBR0EsS0FBQSxPQUFBLFdBQUE7WUFDQSxPQUFBLENBQUEsUUFBQSxLQUFBOzs7Ozs7Ozs7OztJQVdBLFNBQUEsT0FBQSxVQUFBO1FBQ0EsU0FBQSxVQUFBLHFCQUFBOzs7Ozs7Ozs7OztJQVVBLFNBQUEsdUJBQUEsV0FBQSxrQkFBQSxlQUFBO1FBQ0EsT0FBQSxTQUFBLFdBQUEsT0FBQTtZQUNBLElBQUEsaUJBQUEsaUJBQUEsT0FBQSxrQkFBQTtZQUNBLElBQUEsWUFBQSxDQUFBLFdBQUEsV0FBQSxPQUFBO1lBQ0EsVUFBQSxVQUFBLGlCQUFBLFVBQUE7WUFDQSxVQUFBLFdBQUE7Ozs7Ozs7Ozs7WUFVQSxjQUFBLE1BQUEsVUFBQSxTQUFBOzs7O0tBR0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFpbiBBcHBsaWNhdGlvbiBNb2R1bGVcclxuICAgICAqL1xyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5tYWluJywgW1xyXG4gICAgICAgICdhcHAucm91dGVzJyxcclxuICAgICAgICAnYXBwLmNvcmUnLFxyXG4gICAgICAgICdqcC5zY2hlZHVsZSdcclxuICAgIF0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb3JlJyxcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAqIEFuZ3VsYXIgbW9kdWxlc1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgJ25nTWF0ZXJpYWwnLFxyXG4gICAgICAgICAgICAnbmdUb3VjaCcsXHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAqIE91ciByZXVzYWJsZSBjcm9zcyBhcHAgY29kZSBtb2R1bGVzXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAndXRpbGl0aWVzLmFwaScsXHJcbiAgICAgICAgICAgICd1dGlsaXRpZXMuZXhjZXB0aW9uJyxcclxuICAgICAgICAgICAgJ3V0aWxpdGllcy5sb2dnZXInLFxyXG4gICAgICAgICAgICAndXRpbGl0aWVzLnJvdXRlcicsXHJcbiAgICAgICAgICAgICd1dGlsaXRpZXMuZGF0ZXRpbWUnLFxyXG4gICAgICAgICAgICAndXRpbGl0aWVzLmdvb2dsZWFuYWx5dGljcycsXHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAqIDNyZCBQYXJ0eSBtb2R1bGVzXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAndWkuYm9vdHN0cmFwJyAvLyBBY2NvcmRpb24gYW5kIGNvbGxhcHNlXHJcbiAgICAgICAgXSk7XHJcblxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBcHBsaWNhdGlvbiByb3V0ZXNcclxuICAgICAqL1xyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5yb3V0ZXMnLCBbXHJcbiAgICAgICAgJ2pwLnNjaGVkdWxlLnJvdXRlcycsXHJcbiAgICAgICAgJ3V0aWxpdGllcy5yb3V0ZXInXHJcbiAgICBdKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdqcC5mb290ZXInLCBbXSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnanAuc2NoZWR1bGUnLFxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgJ2pwLnNjaGVkdWxlLmRhdGEnLFxyXG4gICAgICAgICAgICAnanAuc2NoZWR1bGUubGF5b3V0cycsXHJcbiAgICAgICAgICAgICdqcC5zY2hlZHVsZS5yb3V0ZXMnLFxyXG4gICAgICAgICAgICAnanAuc2NoZWR1bGUud2lkZ2V0cydcclxuICAgICAgICBdKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvdmlkZXMgYSBEYXRlVGltZVNlcnZpY2UgdXRpbGl0eSBjbGFzcyB0aGF0IHByb3ZpZGVzIGFuIGludGVyZmFjZSB0b1xyXG4gICAgICogbW9tZW50IG9iamVjdHMsIHV0aWxpdGllcyBmb3Igd29ya2luZyB3aXRoIE15U1FMIFVUQyB0aW1lcyBldGMuXHJcbiAgICAgKlxyXG4gICAgICogUmVmZXIgdG8gZGF0ZXRpbWUuZmFjdG9yeS5qcyBmb3IgZG9jdW1lbnRhdGlvbiAmIGF2YWlsYWJsZSB0b29sc1xyXG4gICAgICovXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgndXRpbGl0aWVzLmRhdGV0aW1lJyxcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgICdhbmd1bGFyTW9tZW50J1xyXG4gICAgICAgIF0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ3V0aWxpdGllcy5leGNlcHRpb24nLFxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgJ3V0aWxpdGllcy5sb2dnZXInXHJcbiAgICAgICAgXSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgndXRpbGl0aWVzLmdvb2dsZWFuYWx5dGljcycsXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICAnYW5ndWxhcnRpY3MnLFxyXG4gICAgICAgICAgICAnYW5ndWxhcnRpY3MuZ29vZ2xlLmFuYWx5dGljcydcclxuICAgICAgICBdKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgndXRpbGl0aWVzLmFwaScsIFtcclxuICAgICAgICAndXRpbGl0aWVzLmRhdGV0aW1lJ1xyXG4gICAgXSk7XHJcblxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ3V0aWxpdGllcy5sb2dnZXInLFxyXG4gICAgICAgIFtdKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCd1dGlsaXRpZXMucm91dGVyJyxcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgICd1aS5yb3V0ZXInXHJcbiAgICAgICAgXSk7XHJcblxyXG59KSgpOyIsIi8qKlxyXG4gKlxyXG4gKi9cclxuKGZ1bmN0aW9uKCl7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnanAuc2NoZWR1bGUuZGF0YScsIFtcclxuICAgICAgICAnYXBwLnJvdXRlcycsXHJcbiAgICAgICAgJ2FwcC5jb3JlJ1xyXG4gICAgXSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnanAuc2NoZWR1bGUubGF5b3V0cycsXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICAnanAuZm9vdGVyJ1xyXG4gICAgICAgIF0pO1xyXG5cclxufSkoKTsgIiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2NoZWR1bGUgUm91dGluZyBtb2R1bGVcclxuICAgICAqL1xyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2pwLnNjaGVkdWxlLnJvdXRlcycsIFtcclxuICAgICAgICAndWkucm91dGVyJyxcclxuICAgICAgICAnanAuc2NoZWR1bGUud2lkZ2V0cycsXHJcbiAgICAgICAgJ2pwLnNjaGVkdWxlLmxheW91dHMnXHJcbiAgICBdKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdqcC5zY2hlZHVsZS53aWRnZXRzJyxcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgICdqcC5zY2hlZHVsZS53aWRnZXRzLmFjdGl2aXR5UGlja2VyJyxcclxuICAgICAgICAgICAgJ2pwLnNjaGVkdWxlLndpZGdldHMuYWN0aXZpdHlTZXNzaW9ucydcclxuICAgICAgICBdKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnanAuc2NoZWR1bGUud2lkZ2V0cy5hY3Rpdml0eVBpY2tlcicsIFtcclxuICAgICAgICAnanAuc2NoZWR1bGUuZGF0YSdcclxuICAgIF0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2pwLnNjaGVkdWxlLndpZGdldHMuYWN0aXZpdHlTZXNzaW9ucycsIFtdKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAuY29yZScpXHJcbiAgICAgICAgLy8gTG9kYXNoIERlZmluaXRpb25cclxuICAgICAgICAuY29uc3RhbnQoJ18nLCBfKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBUEkgUmVzb3VyY2VzIGNvbnN0YW50c1xyXG4gICAgICovXHJcbiAgICBhbmd1bGFyLm1vZHVsZShcImFwcC5yb3V0ZXNcIilcclxuICAgICAgICAuY29uc3RhbnQoJ0FQSV9ST1VURVNfQ09ORklHJyxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFDVElWSVRJRVM6ICdhY3Rpdml0aWVzJ1xyXG4gICAgICAgIH0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXcmFwIG1vbWVudCBhcyBhbiBhbmd1bGFyIGRlcGVuZGVuY3lcclxuICAgICAqIHdoaWxzdCBzZXR0aW5nIHRoZSBkZWZhdWx0IHRpbWV6b25lIGZvciBhbmd1bGFyXHJcbiAgICAgKiBtb21lbnRcclxuICAgICAqL1xyXG4gICAgYW5ndWxhci5tb2R1bGUoXCJ1dGlsaXRpZXMuZGF0ZXRpbWVcIilcclxuICAgICAgICAuY29uc3RhbnQoJ21vbWVudCcsIG1vbWVudClcclxuICAgICAgICAuY29uc3RhbnQoJ2FuZ3VsYXJNb21lbnRDb25maWcnLCB7XHJcbiAgICAgICAgICAgIHRpbWV6b25lOiAnQW1lcmljYS9EZXRyb2l0J1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNvbnN0YW50KCdVVENfVElNRUZPUk1BVCcsIFwiWVlZWS1NTS1ERCBISDpNTTpTU1wiKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQVBJIChub24tcm91dGUpIGNvbnN0YW50cywgcHJlZmVyYmx5IHRoaXMgc2hvdWxkIGJlIHJlZmFjdG9yZWQgdG8gYmUgY29uZmlndXJlZFxyXG4gICAgICogYnkgY29yZVxyXG4gICAgICovXHJcbiAgICBhbmd1bGFyLm1vZHVsZShcInV0aWxpdGllcy5hcGlcIilcclxuICAgICAgICAuY29uc3RhbnQoJ0FQSV9DT05GSUcnLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQkFTRV9ST1VURTogJ2FwaSdcclxuICAgICAgICB9KTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKFwidXRpbGl0aWVzLmxvZ2dlclwiKVxyXG4gICAgICAgIC5jb25zdGFudCgndG9hc3RyJywgdG9hc3RyKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2NoZWR1bGUncyBhYnN0cmFjdCByb290IHJvdXRlXHJcbiAgICAgKi9cclxuICAgIGFuZ3VsYXIubW9kdWxlKFwianAuc2NoZWR1bGUucm91dGVzXCIpXHJcbiAgICAgICAgLmNvbnN0YW50KCdTQ0hFRFVMRV9ST09UX1JPVVRFJyxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGFic3RyYWN0OiB0cnVlLFxyXG4gICAgICAgICAgICBuYW1lOiAnc2NoZWR1bGUnLFxyXG4gICAgICAgICAgICB1cmw6ICcvc2NoZWR1bGUnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJhcHAvY29tcG9uZW50cy9zY2hlZHVsZS9sYXlvdXQvc2NoZWR1bGUvc2NoZWR1bGUtYmFzZS1sYXlvdXQuaHRtbFwiXHJcbiAgICAgICAgfSk7XHJcbn0pKCk7IiwiXHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvcmUgbW9kdWxlIGNvbmZpZ3VyYXRpb25cclxuICAgICAqL1xyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcC5jb3JlJylcclxuICAgICAgICAuY29uZmlnKHRvYXN0ckNvbmZpZylcclxuICAgICAgICAuY29uZmlnKGxvZ1Byb3ZpZGVyQ29uZmlnKVxyXG4gICAgICAgIC5jb25maWcoZXhjZXB0aW9uSGFuZGxlclByb3ZpZGVyQ29uZmlnKVxyXG4gICAgICAgIC5jb25maWcobWRUaGVtaW5nUHJvdmlkZXJDb25maWcpXHJcbiAgICAgICAgLmNvbmZpZyhodHRwUHJvdmlkZXJDb25maWcpXHJcbiAgICAgICAgLnJ1bihpbml0Q29yZUNvbXBvbmVudHMpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVG9hc3RyIENvbmZpZ3VyYXRpb25cclxuICAgICAqIEBwYXJhbSB0b2FzdHJcclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiB0b2FzdHJDb25maWcodG9hc3RyKSB7XHJcbiAgICAgICAgdG9hc3RyLm9wdGlvbnMudGltZU91dCA9IDQwMDA7XHJcbiAgICAgICAgdG9hc3RyLm9wdGlvbnMucG9zaXRpb25DbGFzcyA9ICd0b2FzdC1ib3R0b20tcmlnaHQnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9nIFByb3ZpZGVyIENvbmZpZ3VyYXRpb25cclxuICAgICAqIEBwYXJhbSAkbG9nUHJvdmlkZXJcclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBsb2dQcm92aWRlckNvbmZpZygkbG9nUHJvdmlkZXIpIHtcclxuICAgICAgICBpZiAoJGxvZ1Byb3ZpZGVyLmRlYnVnRW5hYmxlZCkge1xyXG4gICAgICAgICAgICAkbG9nUHJvdmlkZXIuZGVidWdFbmFibGVkKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEV4Y2VwdGlvbiBIYW5kbGVyIFByb3ZpZGVyIGNvbmZpZ3VyYXRpb25cclxuICAgICAqIEBwYXJhbSBleGNlcHRpb25IYW5kbGVyUHJvdmlkZXJcclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBleGNlcHRpb25IYW5kbGVyUHJvdmlkZXJDb25maWcoZXhjZXB0aW9uSGFuZGxlclByb3ZpZGVyKSB7XHJcbiAgICAgICAgZXhjZXB0aW9uSGFuZGxlclByb3ZpZGVyLmNvbmZpZ3VyZSgnW05HLUpQIEVycm9yXSAnKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAbmdJbmplY3RcclxuICAgIGZ1bmN0aW9uIG1kVGhlbWluZ1Byb3ZpZGVyQ29uZmlnKCRtZFRoZW1pbmdQcm92aWRlcikge1xyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZG9jcy1kYXJrJywgJ2RlZmF1bHQnKVxyXG4gICAgICAgICAgICAuZGFyaygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBuZ0luamVjdFxyXG4gICAgZnVuY3Rpb24gaHR0cFByb3ZpZGVyQ29uZmlnKCRodHRwUHJvdmlkZXIpIHtcclxuICAgICAgICAkaHR0cFByb3ZpZGVyLmRlZmF1bHRzLnVzZVhEb21haW4gPSB0cnVlO1xyXG4gICAgICAgIGRlbGV0ZSAkaHR0cFByb3ZpZGVyLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uWydYLVJlcXVlc3RlZC1XaXRoJ107XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsemllIGNvcmUgY29tcG9uZW50c1xyXG4gICAgICogQHBhcmFtIHJvdXRlclNlcnZpY2VcclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBpbml0Q29yZUNvbXBvbmVudHMocm91dGVyU2VydmljZSkge1xyXG5cclxuICAgIH1cclxuXHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFwcCByb3V0ZSBjb25maWd1cmF0aW9uXHJcbiAgICAgKi9cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAucm91dGVzJylcclxuICAgICAgICAuY29uZmlnKHJvdXRlQ29uZmlnKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFVJLVJvdXRlciBzdGF0ZSBjb25maWd1cmF0aW9uLlxyXG4gICAgICogRmVhdHVyZSByb290IChhYnN0cmFjdCkgcm91dGVzIGFyZSBhbHNvIGluY2x1ZGVkLlxyXG4gICAgICogQHBhcmFtICRzdGF0ZVByb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0gJHVybFJvdXRlclByb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0gJGxvY2F0aW9uUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSBTQ0hFRFVMRV9ST09UX1JPVVRFIE5vdGUgdGhhdCB0aGlzIGlzIHBhcmVudGxlc3MuXHJcbiAgICAgKiBAbmdJbmplY3RcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcm91dGVDb25maWcoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIsIFNDSEVEVUxFX1JPT1RfUk9VVEUpXHJcbiAgICB7XHJcbiAgICAgICAgLy8gVXNlIGhhc2hiYW5nIG1vZGUgZm9yIHNlbyBwdXJwb3Nlc1xyXG4gICAgICAgICRsb2NhdGlvblByb3ZpZGVyLmhhc2hQcmVmaXgoJyEnKTtcclxuXHJcbiAgICAgICAgLy8gRGVmYXVsdCByb3V0ZSBicmluZ3MgdXNlcnMgdG8gYWN0aXZpdGllc1xyXG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlclxyXG4gICAgICAgICAgICAub3RoZXJ3aXNlKCcvc2NoZWR1bGUvYWN0aXZpdGllcycpO1xyXG5cclxuICAgICAgICAvLyBEZWZpbmUgUm9vdCBQYXJlbnRzXHJcbiAgICAgICAgU0NIRURVTEVfUk9PVF9ST1VURVsncGFyZW50J10gPSAnJztcclxuXHJcbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgLy8gTG9jYWwgUm91dGVzXHJcbiAgICAgICAgICAgIC8vIEZlYXR1cmUgUm91dGVzXHJcbiAgICAgICAgICAgIC5zdGF0ZShTQ0hFRFVMRV9ST09UX1JPVVRFKTtcclxuICAgIH1cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3V0aWxpdGllcy5kYXRldGltZScpXHJcbiAgICAgICAgLmNvbmZpZyhkYXRldGltZUNvbmZpZyk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25maWd1cmUgZGF0ZSB0aW1lIGNvbmZpZ3VyYXRpb24sIEFtZXJpY2EvRGV0cm9pdCBoYXMgc2FtZSB0aW1lem9uZSBhcyB0b3JvbnRvXHJcbiAgICAgKiBAcGFyYW0gbW9tZW50XHJcbiAgICAgKiBAbmdJbmplY3RcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZGF0ZXRpbWVDb25maWcobW9tZW50KVxyXG4gICAge1xyXG4gICAgICAgIC8vIE1ha2Ugc3VyZSBtb21lbnQgaXMgaW4gZW5nbGlzaCBhbmQgdGhlIGZpcnN0IGRheSBvZiB3ZWVrIGlzIGEgbW9uZGF5XHJcbiAgICAgICAgbW9tZW50LmxhbmcoJ2VuJywge1xyXG4gICAgICAgICAgICAvLyBjdXN0b21pemF0aW9ucy5cclxuICAgICAgICAgICAgd2Vlazoge1xyXG4gICAgICAgICAgICAgICAgZG93OiAxXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNhbGVuZGFyOiB7XHJcbiAgICAgICAgICAgICAgICBsYXN0RGF5OiAnW1llc3RlcmRheV0sIGRkZGQgTU1NIEQnLFxyXG4gICAgICAgICAgICAgICAgc2FtZURheSA6ICdbVG9kYXldLCBkZGRkIE1NTSBEJyxcclxuICAgICAgICAgICAgICAgIG5leHREYXkgOiAnW1RvbW9ycm93XSwgZGRkZCBNTU0gRCcsXHJcbiAgICAgICAgICAgICAgICBsYXN0V2VlayA6ICdkZGRkLCBNTU0gRCcsXHJcbiAgICAgICAgICAgICAgICBuZXh0V2VlayA6ICdkZGRkLCBNTU0gRCcsXHJcbiAgICAgICAgICAgICAgICBzYW1lRWxzZSA6ICdkZGRkLCBNTU0gRCdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBBZGQgQW1lcmljYS9EZXRyb2l0IHRpbWV6b25lLCBub3RlIHRoYXQgdGhpcyBpcyB0aGUgc2FtZSBhcyBUb3JvbnRvXHJcbiAgICAgICAgbW9tZW50LnR6LmFkZChcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgJ0FtZXJpY2EvRGV0cm9pdHxFU1QgRURUfDUwIDQwfDAxMDEwMTAxMDEwMTAxMDEwMTAxMDEwfDFCUVQwIDF6YjAgT3AwIDF6YjAgT3AwIDF6YjAgT3AwIDF6YjAgT3AwIDF6YjAgT3AwIDF6YjAgUmQwIDF6YjAgT3AwIDF6YjAgT3AwIDF6YjAgT3AwIDF6YjAgT3AwIDF6YjAnLFxyXG4gICAgICAgICAgICAgICAgXCJFdGMvVVRDfFVUQ3wwfDB8XCJcclxuICAgICAgICAgICAgXSk7XHJcbiAgICB9XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgndXRpbGl0aWVzLmdvb2dsZWFuYWx5dGljcycpXHJcbiAgICAgICAgLnJ1bihydW4pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHJ1bigpXHJcbiAgICB7XHJcbiAgICAgICAgKGZ1bmN0aW9uKGkscyxvLGcscixhLG0pe2lbJ0dvb2dsZUFuYWx5dGljc09iamVjdCddPXI7aVtyXT1pW3JdfHxmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAoaVtyXS5xPWlbcl0ucXx8W10pLnB1c2goYXJndW1lbnRzKX0saVtyXS5sPTEqbmV3IERhdGUoKTthPXMuY3JlYXRlRWxlbWVudChvKSxcclxuICAgICAgICAgICAgbT1zLmdldEVsZW1lbnRzQnlUYWdOYW1lKG8pWzBdO2EuYXN5bmM9MTthLnNyYz1nO20ucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYSxtKVxyXG4gICAgICAgIH0pKHdpbmRvdyxkb2N1bWVudCwnc2NyaXB0JywnLy93d3cuZ29vZ2xlLWFuYWx5dGljcy5jb20vYW5hbHl0aWNzLmpzJywnZ2EnKTtcclxuXHJcbiAgICAgICAgZ2EoJ2NyZWF0ZScsICdVQS01NDU1MzYxMi0xJywgJ2F1dG8nKTtcclxuICAgICAgICBnYSgncmVxdWlyZScsICdkaXNwbGF5ZmVhdHVyZXMnKTtcclxuICAgIH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2NoZWR1bGUgcm91dGUgY29uZmlndXJhdGlvblxyXG4gICAgICovXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnanAuc2NoZWR1bGUucm91dGVzJylcclxuICAgICAgICAuY29uZmlnKHNjaGVkdWxlUm91dGVDb25maWcpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUm91dGUgY29uZmlndXJhdGlvbixcclxuICAgICAqIHVzZXMgU0NIRURVTEVfUk9PVF9ST1VURSBhcyBhYnN0cmFjdCBwYXJlbnQgc3RhdGVcclxuICAgICAqIEBwYXJhbSAkc3RhdGVQcm92aWRlclxyXG4gICAgICogQHBhcmFtIFNDSEVEVUxFX1JPT1RfUk9VVEVcclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBzY2hlZHVsZVJvdXRlQ29uZmlnKCRzdGF0ZVByb3ZpZGVyLCBTQ0hFRFVMRV9ST09UX1JPVVRFKVxyXG4gICAge1xyXG4gICAgICAgIC8vIFBhcmVudCBTdGF0ZSdzIG5hbWUgdG8gYmUgaW5jbHVkZWQgaW4gZXZlcnkgc3RhdGVcclxuICAgICAgICB2YXIgcGFyZW50ID0gU0NIRURVTEVfUk9PVF9ST1VURS5uYW1lO1xyXG5cclxuICAgICAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgICAgICAgICAvLyBMb2NhbCByb3V0ZXNcclxuICAgICAgICAgICAgLnN0YXRlKHBhcmVudCsnLmFjdGl2aXRpZXMnLCB7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICcvYWN0aXZpdGllcycsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJhcHAvY29tcG9uZW50cy9zY2hlZHVsZS9sYXlvdXQvYWN0aXZpdGllcy9hY3Rpdml0aWVzLWxheW91dC5odG1sXCIsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiBcIkFjdGl2aXRpZXNMYXlvdXRDdHJsXCIsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyQXM6IFwidm1cIixcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpdml0aWVzRGF0YVNlcnZpY2U6IGdldEFjdGl2aXR5RGF0YVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhdGUocGFyZW50Kycuc2Vzc2lvbnMnLCB7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICcvc2Vzc2lvbnMve2FjdGl2aXR5SWR9L3t3ZWVrc0Zyb21Ub2RheX0nLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwL2NvbXBvbmVudHMvc2NoZWR1bGUvbGF5b3V0L2FjdGl2aXR5LXNlc3Npb25zL2FjdGl2aXR5LXNlc3Npb25zLWxheW91dC5odG1sXCIsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiBcIkFjdGl2aXR5U2Vzc2lvbkxheW91dENvbnRyb2xsZXJcIixcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXJBczogXCJ2bVwiLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5U2Vzc2lvbnNEYXRhOiBnZXRBY3Rpdml0eVNlc3Npb25zRGF0YVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gUm91dGUgUmVzb2x2ZXNcclxuXHJcbiAgICAgICAgLyogQG5nSW5qZWN0ICovXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0QWN0aXZpdHlEYXRhKHNjaGVkdWxlQmFzZUxheW91dERhdGFTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzY2hlZHVsZUJhc2VMYXlvdXREYXRhU2VydmljZS5sb2FkKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiBAbmdJbmplY3QgKi9cclxuICAgICAgICBmdW5jdGlvbiBnZXRBY3Rpdml0eVNlc3Npb25zRGF0YShhY3Rpdml0eVNlc3Npb25zTGF5b3V0RGF0YVNlcnZpY2UsICRzdGF0ZVBhcmFtcykge1xyXG4gICAgICAgICAgICByZXR1cm4gYWN0aXZpdHlTZXNzaW9uc0xheW91dERhdGFTZXJ2aWNlLmxvYWQoJHN0YXRlUGFyYW1zWydhY3Rpdml0eUlkJ10sICRzdGF0ZVBhcmFtc1snd2Vla3NGcm9tVG9kYXknXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcblxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2pwLnNjaGVkdWxlLmxheW91dHMnKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCdBY3Rpdml0aWVzTGF5b3V0Q3RybCcsIEFjdGl2aXRpZXNMYXlvdXRDdHJsKTtcclxuXHJcbiAgICAvKiBAbmdJbmplY3QgKi9cclxuICAgIGZ1bmN0aW9uIEFjdGl2aXRpZXNMYXlvdXRDdHJsKGFjdGl2aXRpZXNEYXRhU2VydmljZSwgdG9hc3RyKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB2bSA9IHRoaXM7XHJcblxyXG4gICAgICAgIGFjdGl2YXRlKCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFjdGl2YXRlKCkge1xyXG4gICAgICAgICAgICB2bS5hY3Rpdml0aWVzID0gYWN0aXZpdGllc0RhdGFTZXJ2aWNlLmRyb3BpbkFjdGl2aXRpZXM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2pwLnNjaGVkdWxlLmxheW91dHMnKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCdBY3Rpdml0eVNlc3Npb25MYXlvdXRDb250cm9sbGVyJywgQWN0aXZpdHlTZXNzaW9uTGF5b3V0Q29udHJvbGxlcik7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNZWRpYXRlcyBkYXRhIHRvIHVuZGVybHlpbmcgbGF5b3V0LCBhY3Rpdml0eVNlc3Npb25zRGF0YSBjb250YWluczpcclxuICAgICAqIHtcclxuICAgICAqICAgICAgYWN0aXZpdHk6ICdzdHJpbmcnLFxyXG4gICAgICogICAgICBhY3Rpdml0eVNlc3Npb246IFsgeyBkYXRlOiBtb21lbnQsIHNlc3Npb25zOiBbIHNlc3Npb24sIHNlc3Npb24gXSBdXHJcbiAgICAgKiB9XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGFjdGl2aXR5U2Vzc2lvbnNEYXRhXHJcbiAgICAgKiBAcGFyYW0gbG9nZ2VyU2VydmljZVxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKiBAbmdJbmplY3RcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gQWN0aXZpdHlTZXNzaW9uTGF5b3V0Q29udHJvbGxlcihhY3Rpdml0eVNlc3Npb25zRGF0YSwgdG9hc3RyKVxyXG4gICAge1xyXG5cclxuICAgICAgICB2YXIgdm0gPSB0aGlzO1xyXG5cclxuICAgICAgICBhY3RpdmF0ZSgpO1xyXG5cclxuICAgICAgICAvL1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBhY3RpdmF0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBDb25maWd1cmUgV2VlayBpZGVudGlmaWVyc1xyXG4gICAgICAgICAgICBpZiAoYWN0aXZpdHlTZXNzaW9uc0RhdGEuc2VsZWN0ZWRXZWVrID09IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZtLndlZWtJZGVudGlmaWVyID0gXCJUaGlzXCI7XHJcbiAgICAgICAgICAgICAgICB2bS5vcHBvc2l0ZVdlZWtJZGVudGlmaWVyID0gXCJOZXh0XCI7XHJcbiAgICAgICAgICAgICAgICB2bS5vcHBvc2l0ZVdlZWsgPSAxO1xyXG4gICAgICAgICAgICAgICAgdm0uYWN0aXZpdHlTZXNzaW9ucyA9IGFjdGl2aXR5U2Vzc2lvbnNEYXRhLmFjdGl2aXR5U2Vzc2lvbnNUaGlzV2VlaztcclxuICAgICAgICAgICAgICAgIHZtLmVuYWJsZVdlZWtTd2l0Y2ggPSBhY3Rpdml0eVNlc3Npb25zRGF0YS5hY3Rpdml0eVNlc3Npb25zTmV4dFdlZWsubGVuZ3RoID49IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoYWN0aXZpdHlTZXNzaW9uc0RhdGEuc2VsZWN0ZWRXZWVrID09IDEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZtLndlZWtJZGVudGlmaWVyID0gXCJOZXh0XCI7XHJcbiAgICAgICAgICAgICAgICB2bS5vcHBvc2l0ZVdlZWtJZGVudGlmaWVyID0gXCJMYXN0XCI7XHJcbiAgICAgICAgICAgICAgICB2bS5vcHBvc2l0ZVdlZWsgPSAwO1xyXG4gICAgICAgICAgICAgICAgdm0uYWN0aXZpdHlTZXNzaW9ucyA9IGFjdGl2aXR5U2Vzc2lvbnNEYXRhLmFjdGl2aXR5U2Vzc2lvbnNOZXh0V2VlaztcclxuICAgICAgICAgICAgICAgIHZtLmVuYWJsZVdlZWtTd2l0Y2ggPSB0cnVlOyAvLyBTaG91bGQgYWx3YXlzIGJlIGFibGUgdG8gZ28gYmFja1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBEaXNwbGF5IGFjdGl2aXR5IGRldGFpbHNcclxuICAgICAgICAgICAgdm0uYWN0aXZpdHlMYWJlbCA9IGFjdGl2aXR5U2Vzc2lvbnNEYXRhLmFjdGl2aXR5LmFjdGl2aXR5O1xyXG4gICAgICAgICAgICB2bS5hY3Rpdml0eUlkID0gYWN0aXZpdHlTZXNzaW9uc0RhdGEuYWN0aXZpdHkuaWQ7XHJcbiAgICAgICAgICAgIHZtLmFjdGl2aXR5Q2F0ZWdvcnkgPSBhY3Rpdml0eVNlc3Npb25zRGF0YS5hY3Rpdml0eS5jYXRlZ29yeTtcclxuICAgICAgICAgICAgdm0uYWN0aXZpdHlJc1dvbWVuT25seSA9IGFjdGl2aXR5U2Vzc2lvbnNEYXRhLmFjdGl2aXR5LndvbWVuX29ubHk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCd1dGlsaXRpZXMuZGF0ZXRpbWUnKVxyXG4gICAgICAgIC5mYWN0b3J5KCdEYXRlVGltZVNlcnZpY2UnLCBEYXRlVGltZUZhY3RvcnkpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGF0ZSBUaW1lIHV0aWxpdHkgYmVsdCB0aGF0IHV0aWxpemVzIG1vbWVudCAmIHN1cHBsaWVzIGtleVxyXG4gICAgICogdXRpbGl0aWVzIGZvciB3b3JraW5nIHdpdGggTXlTUUwgRGF0ZVRpbWUgJiB0aW1lIHpvbmUgaXNzdWVzXHJcbiAgICAgKiBAcmV0dXJucyB7e25vdzogbm93LCB0b1VUQzogdG9VVEMsIHBhcnNlVVRDOiBwYXJzZVVUQ319XHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBEYXRlVGltZUZhY3RvcnkoVVRDX1RJTUVGT1JNQVQpIHtcclxuXHJcbiAgICAgICAgdmFyIHNlcnZpY2UgPSB7XHJcbiAgICAgICAgICAgIG5vdzogbm93LFxyXG4gICAgICAgICAgICB0b1VUQzogdG9VVEMsXHJcbiAgICAgICAgICAgIHBhcnNlVVRDOiBwYXJzZVVUQyxcclxuICAgICAgICAgICAgZ2V0RGF5c0luVGhpc1dlZWs6IGdldERheXNJblRoaXNXZWVrXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNlcnZpY2U7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFByb3ZpZGUgYW4gaW50ZXJmYWNlIHRvIHJldHJpZXZlIGEgbW9tZW50L2RhdGVcclxuICAgICAgICAgKiBAcmV0dXJucyBtb21lbnRcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBub3coKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtb21lbnQudHoobmV3IERhdGUoKSwgJ0FtZXJpY2EvRGV0cm9pdCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVHJhbnNmb3JtcyBtb21lbnQgaW50byBNeVNRTCBhY2NlcHRhYmxlIFVUQyBEYXRlVGltZSBvYmplY3RcclxuICAgICAgICAgKiBAcGFyYW0gbW9tZW50T2JqXHJcbiAgICAgICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gdG9VVEMobW9tZW50T2JqKSB7XHJcbiAgICAgICAgICAgIGlmICghbW9tZW50LmlzTW9tZW50KG1vbWVudE9iaikpIHtcclxuICAgICAgICAgICAgICAgIGV4Y2VwdGlvblNlcnZpY2UuY2F0Y2hlcignTm9uLW1vbWVudCBvYmplY3QgZGV0ZWN0ZWQnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG1vbWVudE9iai50eihcIkV0Yy9VVENcIikuZm9ybWF0KFVUQ19USU1FRk9STUFUKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRyYW5zZm9ybXMgTXlTUUwgVVRDIHRpbWUgU3RyaW5ncyBpbnRvIG1vbWVudHNcclxuICAgICAgICAgKiBAcGFyYW0gdXRjU3RyaW5nXHJcbiAgICAgICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gcGFyc2VVVEModXRjU3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtb21lbnQudHoodXRjU3RyaW5nLCAnQW1lcmljYS9EZXRyb2l0Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXRyaWV2ZXMgYW4gYXJyYXkgb2YgbW9tZW50cyBmb3IgdGhpcyB3ZWVrLFxyXG4gICAgICAgICAqIGVhY2ggbW9tZW50IHJlcHJlc2VudHMgdGhlIHN0YXJ0IG9mIHRoZSBkYXkuXHJcbiAgICAgICAgICogQHJldHVybnM6XHJcbiAgICAgICAgICogW1xyXG4gICAgICAgICAqICAgICAgbW9tZW50LCAvLyBNb21lbnQgZm9yIE1vbmRheVxyXG4gICAgICAgICAqICAgICAgbW9tZW50IC8vICBNb21lbnQgZm9yIFR1ZXNkYXlcclxuICAgICAgICAgKiAgICAgIC4uLiAvLyBTbyBvbiB0aWwgU3VuZGF5XHJcbiAgICAgICAgICogXVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldERheXNJblRoaXNXZWVrKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZ2V0RGF5c0luV2Vlayhub3coKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXRyaWV2ZXMgYW4gYXJyYXkgb2YgbW9tZW50cyBmb3IgYSB3ZWVrLCB0aGUgd2VlayBpcyBiYXNlZFxyXG4gICAgICAgICAqIG9uIHRoZSBpbnB1dHRlZCBtb21lbnRcclxuICAgICAgICAgKiBAcGFyYW0gZGF5SW5XZWVrXHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKiBbXHJcbiAgICAgICAgICogICAgICBtb21lbnQsIC8vIE1vbWVudCBmb3IgTW9uZGF5XHJcbiAgICAgICAgICogICAgICBtb21lbnQgLy8gIE1vbWVudCBmb3IgVHVlc2RheVxyXG4gICAgICAgICAqICAgICAgLi4uIC8vIFNvIG9uIHRpbCBTdW5kYXlcclxuICAgICAgICAgKiBdXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0RGF5c0luV2VlayhkYXlJbldlZWspIHtcclxuICAgICAgICAgICAgdmFyIGZpcnN0RGF5T2ZXZWVrID0gZGF5SW5XZWVrLnN0YXJ0T2YoJ3dlZWsnKTtcclxuICAgICAgICAgICAgdmFyIGRheXNJbldlZWsgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNzsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBkYXlzSW5XZWVrLnB1c2goYW5ndWxhci5jb3B5KGZpcnN0RGF5T2ZXZWVrKS5hZGQoaSwgJ2RheXMnKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkYXlzSW5XZWVrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3V0aWxpdGllcy5leGNlcHRpb24nKVxyXG4gICAgICAgIC5mYWN0b3J5KCdleGNlcHRpb25TZXJ2aWNlJywgZXhjZXB0aW9uRmFjdG9yeSk7XHJcblxyXG4gICAgLyogQG5nSW5qZWN0ICovXHJcbiAgICBmdW5jdGlvbiBleGNlcHRpb25GYWN0b3J5KGxvZ2dlclNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgc2VydmljZSA9IHtcclxuICAgICAgICAgICAgY2F0Y2hlcjogY2F0Y2hlclxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDYXRjaGVzIGV4Y2VwdGlvbnMsIGxvZ3MgcmVhc29uIGludG8gY29uc29sZS5cclxuICAgICAgICAgKiBAcGFyYW0gbWVzc2FnZVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBjYXRjaGVyKG1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHJlYXNvbikge1xyXG4gICAgICAgICAgICAgICAgbG9nZ2VyU2VydmljZS5lcnJvcihtZXNzYWdlLCByZWFzb24pO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3V0aWxpdGllcy5hcGknKVxyXG4gICAgICAgIC5mYWN0b3J5KCdhcGlUcmFuc2Zvcm1lclNlcnZpY2UnLCBhcGlUcmFuc2Zvcm1lclNlcnZpY2UpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXRpbGl0eSBmdW5jdGlvbnMgdG8gdHJhbnNmb3JtIEFQSSBjYWxsc1xyXG4gICAgICogQHJldHVybnMge3twcm9wOiBwcm9wfX1cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gYXBpVHJhbnNmb3JtZXJTZXJ2aWNlKERhdGVUaW1lU2VydmljZSlcclxuICAgIHtcclxuICAgICAgICB2YXIgc2VydmljZSA9IHtcclxuICAgICAgICAgICAgcmVwbGFjZURhdGVUaW1lOiByZXBsYWNlRGF0ZVRpbWVcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gc2VydmljZTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVwbGFjZXMgYWxsIE15U1FMIERhdGVUaW1lIHN0cmluZ3MgaW4gYSBKU09OIG9iamVjdC9hcnJheVxyXG4gICAgICAgICAqIEBwYXJhbSBvYmpcclxuICAgICAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiByZXBsYWNlRGF0ZVRpbWUob2JqKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqID09PSBcInN0cmluZ1wiIHx8IG9iaiBpbnN0YW5jZW9mIFN0cmluZylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gU1FMIFRpbWUgbWF0Y2hpbmcgcGF0dGVyblxyXG4gICAgICAgICAgICAgICAgdmFyIHBhdHRlcm4gPSAvWzAtOV17NH0tWzAtMV17MX1bMC05XXsxfS1bMC0zXXsxfVswLTldezF9IFswLTJdezF9WzAtOV17MX06WzAtNV17MX1bMC05XXsxfTpbMC01XXsxfVswLTldezF9LztcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGF0dGVybi50ZXN0KG9iaikpIHsgIC8vIGQudmFsdWVPZigpIGNvdWxkIGFsc28gd29ya1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRhdGUgaXMgdmFsaWRcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gRGF0ZVRpbWVTZXJ2aWNlLnBhcnNlVVRDKG9iaik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBkYXRlIGlzIG5vdCB2YWxpZFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAob2JqLmNvbnN0cnVjdG9yID09PSBBcnJheSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNsb25lZE9iaiA9IFtdO1xyXG4gICAgICAgICAgICAgICAgLy8gRm9yIGVhY2ggaXRlbSwgd2UgcmVhc3NpZ24gJiByZWN1cnNpdmVseSBjYWxsIHJlcGxhY2VEYXRlVGltZVxyXG4gICAgICAgICAgICAgICAgb2JqLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgsIGFycmF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvbmVkT2JqLnB1c2gocmVwbGFjZURhdGVUaW1lKGVsZW1lbnQpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNsb25lZE9iajtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBPYmplY3QpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBjbG9uZWRPYmogPSB7fTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHByb3AgaW4gb2JqKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocHJvcCkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9uZWRPYmpbcHJvcF0gPSByZXBsYWNlRGF0ZVRpbWUob2JqW3Byb3BdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2xvbmVkT2JqO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3V0aWxpdGllcy5hcGknKVxyXG4gICAgICAgIC5mYWN0b3J5KCdhcGlTZXJ2aWNlJywgYXBpRmFjdG9yeSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXcmFwcGVyIGFyb3VuZCAkaHR0cCB0aGF0IGFjdHMgYXMgdGhlIGRhdGEgcHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSAkaHR0cCAtIGh0dHAgY2xpZW50XHJcbiAgICAgKiBAcGFyYW0gQVBJX0NPTkZJRyAtIEFQSSBjb25zdGFudHNcclxuICAgICAqIEBwYXJhbSBhcGlUcmFuc2Zvcm1lclNlcnZpY2UgLSB0cmFuc2Zvcm1lciBzZXJ2aWNlXHJcbiAgICAgKiBAcmV0dXJucyB7e2dldDogZ2V0LCBwb3N0OiBwb3N0fX0gLSBnZXQgYW5kIHBvc3Qgc2VydmljZXNcclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBhcGlGYWN0b3J5KCRodHRwLCBBUElfQ09ORklHLCBhcGlUcmFuc2Zvcm1lclNlcnZpY2UpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZ2V0OiBnZXQsXHJcbiAgICAgICAgICAgIHBvc3Q6IHBvc3RcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUYWtlcyBhbnkgaW5wdXQgYW5kIGNhbGxzIGEgSFRUUCBQT1NUIG9uIHRoZSBnaXZlbiByb3V0ZVxyXG4gICAgICAgICAqIEBwYXJhbSByb3V0ZSAtIFJvdXRlIGZvciBwb3N0aW5nXHJcbiAgICAgICAgICogQHBhcmFtIGlucHV0IC0gUGF5bG9hZFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHBvc3Qocm91dGUsIGlucHV0KSB7XHJcbiAgICAgICAgICAgIGlmICghaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgIGlucHV0ID0ge307XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KEFQSV9DT05GSUcuQkFTRV9ST1VURSArICcvJyArIHJvdXRlLCBpbnB1dCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDYWxscyBhIEhUVFAgR0VUIG9uIHRoZSBnaXZlbiByb3V0ZVxyXG4gICAgICAgICAqIEBwYXJhbSByb3V0ZSAtIFJvdXRlIHRvIGdldFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtuZy5JUHJvbWlzZTxUUmVzdWx0PnwqfSAtIFByb21pc2Ugb2YgcmVzdWx0c1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldChyb3V0ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHBcclxuICAgICAgICAgICAgICAgIC5nZXQoQVBJX0NPTkZJRy5CQVNFX1JPVVRFICsgJy8nICsgcm91dGUpXHJcbiAgICAgICAgICAgICAgICAudGhlbihnZXREYXRhKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oYXBpVHJhbnNmb3JtZXJTZXJ2aWNlLnJlcGxhY2VEYXRlVGltZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXREYXRhKHBheWxvYWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBheWxvYWQuZGF0YVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV3JhcHBlciBhcm91bmQgdG9hc3RyXHJcbiAgICAgKi9cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCd1dGlsaXRpZXMubG9nZ2VyJylcclxuICAgICAgICAuZmFjdG9yeSgnbG9nZ2VyU2VydmljZScsIGxvZ2dlckZhY3RvcnkpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVhbHMgd2l0aCByZXZlYWxpbmcgJiBsb2dnaW5nLlxyXG4gICAgICogQHJldHVybnMge1xyXG4gICAgICoge3Nob3dUb2FzdHM6IGJvb2xlYW4sIGVycm9yOiBlcnJvciwgaW5mbzogaW5mbywgc3VjY2Vzczogc3VjY2Vzcywgd2FybmluZzogd2FybmluZywgbG9nOiAoJGxvZy5sb2d8Kil9fVxyXG4gICAgICogQG5nSW5qZWN0XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGxvZ2dlckZhY3RvcnkoJGxvZywgdG9hc3RyKSB7XHJcbiAgICAgICAgdmFyIHNlcnZpY2UgPSB7XHJcbiAgICAgICAgICAgIHNob3dUb2FzdHM6IHRydWUsXHJcblxyXG4gICAgICAgICAgICBlcnJvcjogZXJyb3IsXHJcbiAgICAgICAgICAgIGluZm86IGluZm8sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHN1Y2Nlc3MsXHJcbiAgICAgICAgICAgIHdhcm5pbmc6IHdhcm5pbmcsXHJcblxyXG4gICAgICAgICAgICBsb2c6ICRsb2cubG9nXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNlcnZpY2U7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlZCBlcnJvciB0b2FzdCB3aXRoIGEgY3Jvc3NcclxuICAgICAgICAgKiBAcGFyYW0gbWVzc2FnZVxyXG4gICAgICAgICAqIEBwYXJhbSBkYXRhXHJcbiAgICAgICAgICogQHBhcmFtIHRpdGxlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gZXJyb3IobWVzc2FnZSwgZGF0YSwgdGl0bGUpIHtcclxuICAgICAgICAgICAgdG9hc3RyLmVycm9yKG1lc3NhZ2UsIHRpdGxlKTtcclxuICAgICAgICAgICAgJGxvZy5lcnJvcignRXJyb3I6ICcgKyBtZXNzYWdlLCBkYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIExpZ2h0IGJsdWUgdG9hc3Qgd2l0aCBleGNsYW1hdGlvbiBtYXJrXHJcbiAgICAgICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAgICAgKiBAcGFyYW0gZGF0YVxyXG4gICAgICAgICAqIEBwYXJhbSB0aXRsZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGluZm8obWVzc2FnZSwgZGF0YSwgdGl0bGUpIHtcclxuICAgICAgICAgICAgdG9hc3RyLmluZm8obWVzc2FnZSwgdGl0bGUpO1xyXG4gICAgICAgICAgICAkbG9nLmluZm8oJ0luZm86ICcgKyBtZXNzYWdlLCBkYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdyZWVuIHRvYXN0IHdpdGggdGlja1xyXG4gICAgICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgICAgICogQHBhcmFtIGRhdGFcclxuICAgICAgICAgKiBAcGFyYW0gdGl0bGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBzdWNjZXNzKG1lc3NhZ2UsIGRhdGEsIHRpdGxlKSB7XHJcbiAgICAgICAgICAgIHRvYXN0ci5zdWNjZXNzKG1lc3NhZ2UsIHRpdGxlKTtcclxuICAgICAgICAgICAgJGxvZy5pbmZvKCdTdWNjZXNzOiAnICsgbWVzc2FnZSwgZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZWQgdG9hc3Qgd2l0aCBDcm9zc1xyXG4gICAgICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgICAgICogQHBhcmFtIGRhdGFcclxuICAgICAgICAgKiBAcGFyYW0gdGl0bGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiB3YXJuaW5nKG1lc3NhZ2UsIGRhdGEsIHRpdGxlKSB7XHJcbiAgICAgICAgICAgIHRvYXN0ci53YXJuaW5nKG1lc3NhZ2UsIHRpdGxlKTtcclxuICAgICAgICAgICAgJGxvZy53YXJuKCdXYXJuaW5nOiAnICsgbWVzc2FnZSwgZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgndXRpbGl0aWVzLnJvdXRlcicpXHJcbiAgICAgICAgLmZhY3RvcnkoJ3JvdXRlclNlcnZpY2UnLCByb3V0ZXJTZXJ2aWNlKTtcclxuXHJcbiAgICAvKiBAbmdJbmplY3QgKi9cclxuICAgIGZ1bmN0aW9uIHJvdXRlclNlcnZpY2UoJHN0YXRlLCAkcm9vdFNjb3BlLCBsb2dnZXJTZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIGhhbmRsaW5nUm91dGVDaGFuZ2VFcnJvciA9IGZhbHNlO1xyXG4gICAgICAgIHZhciByb3V0ZUNvdW50cyA9IHtcclxuICAgICAgICAgICAgZXJyb3JzOiAwLFxyXG4gICAgICAgICAgICBjaGFuZ2VzOiAwXHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgcm91dGVzID0gW107XHJcbiAgICAgICAgdmFyIGdvRGVmYXVsdFN0YXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc3RhdGUuZ28oJHN0YXRlLiRjdXJyZW50KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpbml0KCk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGdvRGVmYXVsdFN0YXRlOiBnb0RlZmF1bHRTdGF0ZVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgICAgIGhhbmRsZVJvdXRlRXJyb3JzKCk7XHJcbiAgICAgICAgICAgIGhhbmRsZVJvdXRlU3VjY2Vzc2VzKCk7XHJcbiAgICAgICAgICAgIGhhbmRsZVJvdXRlTm90Rm91bmQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZVJvdXRlTm90Rm91bmQoKSB7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVOb3RGb3VuZCcsXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZXZlbnQsIHVuZm91bmRTdGF0ZSwgZnJvbVN0YXRlLCBmcm9tUGFyYW1zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhhbmRsaW5nUm91dGVDaGFuZ2VFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJvdXRlQ291bnRzLmVycm9ycysrO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsaW5nUm91dGVDaGFuZ2VFcnJvciA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIExvZyBTdGF0ZSBub3QgZm91bmRcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbXNnID0gJ1tTdGF0ZSBub3QgZm91bmRdIEVycm9yIHJvdXRpbmcgdG8gJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuZm91bmRTdGF0ZS50byArICcgZnJvbSAnICsgZnJvbVN0YXRlLnBhcmVudCArICcuJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyb21TdGF0ZS5uYW1lICsgJy4nO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlclNlcnZpY2Uud2FybmluZyhtc2cpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdvRGVmYXVsdFN0YXRlKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZVJvdXRlU3VjY2Vzc2VzKCkge1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3VjY2VzcycsXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcm91dGVDb3VudHMuY2hhbmdlcysrO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsaW5nUm91dGVDaGFuZ2VFcnJvciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVSb3V0ZUVycm9ycygpIHtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZUVycm9yJyxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChldmVudCwgdG9TdGF0ZSwgdG9QYXJhbXMsIGZyb21TdGF0ZSwgZnJvbVBhcmFtcywgZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaGFuZGxpbmdSb3V0ZUNoYW5nZUVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcm91dGVDb3VudHMuZXJyb3JzKys7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxpbmdSb3V0ZUNoYW5nZUVycm9yID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTG9nIFN0YXRlIHJvdXRpbmcgZXJyb3JcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbXNnID0gJ1tTdGF0ZSBSb3V0aW5nIEVycm9yXSAnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ0Vycm9yIHJvdXRpbmcgdG8gJyArIHRvU3RhdGUubmFtZSArICcgZnJvbSAnICsgZnJvbVN0YXRlLm5hbWUgKyAnLicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnIEVycm9yOiAnICsgZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyU2VydmljZS53YXJuaW5nKG1zZywgW2Vycm9yXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ29EZWZhdWx0U3RhdGUoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2pwLnNjaGVkdWxlLmRhdGEnKVxyXG4gICAgICAgIC5mYWN0b3J5KCdzY2hlZHVsZVNlcnZpY2UnLCBzY2hlZHVsZUZhY3RvcnkpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvdmlkZXMgYWN0aXZpdGllcyBhbmQgdGhlaXIgYWN0aXZpdHkgc2Vzc2lvbnNcclxuICAgICAqIEBwYXJhbSBhcGlTZXJ2aWNlXHJcbiAgICAgKiBAcGFyYW0gQVBJX1JPVVRFU19DT05GSUdcclxuICAgICAqIEBwYXJhbSBleGNlcHRpb25TZXJ2aWNlXHJcbiAgICAgKiBAcmV0dXJucyB7e2dldERyb3BpbnM6IGdldERyb3BpbnMsIGdldEFjdGl2aXR5U2Vzc2lvbnM6IGdldEFjdGl2aXR5U2Vzc2lvbnN9fVxyXG4gICAgICogQG5nSW5qZWN0XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHNjaGVkdWxlRmFjdG9yeShhcGlTZXJ2aWNlLCBBUElfUk9VVEVTX0NPTkZJRywgZXhjZXB0aW9uU2VydmljZSkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGdldERyb3BpbnM6IGdldERyb3BpbnMsXHJcbiAgICAgICAgICAgIGdldEFjdGl2aXR5OiBnZXRBY3Rpdml0eSxcclxuICAgICAgICAgICAgZ2V0QWN0aXZpdHlTZXNzaW9uczogZ2V0QWN0aXZpdHlTZXNzaW9ucyxcclxuICAgICAgICAgICAgam9pbkFjdGl2aXR5U2Vzc2lvbjogam9pbkFjdGl2aXR5U2Vzc2lvblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJldHJpZXZlcyBhbGwgYWN0aXZpdHkgc2Vzc2lvbnMgZm9yIGEgZ2l2ZW4gYWN0aXZpdHlcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSBhY3Rpdml0eUlkIC0gQWN0aXZpdHkgSWRcclxuICAgICAgICAgKiBAcGFyYW0gd2Vla3MgLSBXZWVrIHRvIHJldHJpZXZlICgwIGZvciB0aGlzIHdlZWspXHJcbiAgICAgICAgICogQHJldHVybnMge25nLklQcm9taXNlPFRSZXN1bHQ+fCp9IC0gUHJvbWlzZSBvZiBhY3Rpdml0eSBzZXNzaW9uc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldEFjdGl2aXR5U2Vzc2lvbnMoYWN0aXZpdHlJZCwgd2Vla3MpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBhcGlTZXJ2aWNlXHJcbiAgICAgICAgICAgICAgICAuZ2V0KEFQSV9ST1VURVNfQ09ORklHLkFDVElWSVRJRVMgKyAnLycgKyBhY3Rpdml0eUlkKycvc2Vzc2lvbnMvJysgd2Vla3MpXHJcbiAgICAgICAgICAgICAgICAudGhlbihncm91cEJ5RGF5T2ZXZWVrKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oY29udmVydElzV29tZW5Cb29sZWFuKVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGV4Y2VwdGlvblNlcnZpY2UuY2F0Y2hlcignWEhSIEZhaWxlZCBmb3IgZ2V0QWN0aXZpdHlTZXNzaW9ucycpKTtcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBGb3JtYXQgYWN0aXZpdHkgc2Vzc2lvbnMgYnkgZGF5IG9mIHdlZWtcclxuICAgICAgICAgICAgICogQHBhcmFtIGFjdGl2aXR5U2Vzc2lvbnNcclxuICAgICAgICAgICAgICogQHJldHVybnMgW1xyXG4gICAgICAgICAgICAgKiAgICAgIHtcclxuICAgICAgICAgICAgICogICAgICAgICAgZGF0ZTogbW9tZW50LCAvLyBUaGVzZSBkYXlzIGFyZSB1bmlxdWUgZGF5c1xyXG4gICAgICAgICAgICAgKiAgICAgICAgICBzZXNzaW9uczogW1xyXG4gICAgICAgICAgICAgKiAgICAgICAgICAgICAgYWN0aXZpdHlzZXNzaW9uLFxyXG4gICAgICAgICAgICAgKiAgICAgICAgICAgICAgLi4uXHJcbiAgICAgICAgICAgICAqICAgICAgICAgIF1cclxuICAgICAgICAgICAgICogICAgICB9LFxyXG4gICAgICAgICAgICAgKiAgICAgIC4uLlxyXG4gICAgICAgICAgICAgKiBdXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBncm91cEJ5RGF5T2ZXZWVrKGFjdGl2aXR5U2Vzc2lvbnMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRlUHJvcGVydHkgPSAnZGF0ZSc7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmVkdWNlIGFjdGl2aXR5IHNlc3Npb25zXHJcbiAgICAgICAgICAgICAgICBhY3Rpdml0eVNlc3Npb25zID0gX1xyXG4gICAgICAgICAgICAgICAgICAgIC5jaGFpbihhY3Rpdml0eVNlc3Npb25zKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZWR1Y2UoZnVuY3Rpb24oZGljdCwgYWN0aXZpdHlTZXNzaW9uKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2Vzc2lvbkRhdGUgPSBhY3Rpdml0eVNlc3Npb25bJ2RhdGUnXS5zdGFydE9mKCdkYXknKS5mb3JtYXQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfLmhhcyhkaWN0LCBzZXNzaW9uRGF0ZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFwcGVuZCBhY3Rpdml0eSBzZXNzaW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWN0W3Nlc3Npb25EYXRlXVsnc2Vzc2lvbnMnXS5wdXNoKGFjdGl2aXR5U2Vzc2lvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYSBrZXkgZm9yIGEgbmV3IGRhdGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpY3Rbc2Vzc2lvbkRhdGVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGU6IGFjdGl2aXR5U2Vzc2lvblsnZGF0ZSddLnN0YXJ0T2YoJ2RheScpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlc3Npb25zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5U2Vzc2lvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRpY3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwge30pXHJcbiAgICAgICAgICAgICAgICAgICAgLnRvQXJyYXkoKVxyXG4gICAgICAgICAgICAgICAgICAgIC52YWx1ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpdml0eVNlc3Npb25zO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXRyaWV2ZXMgQWN0aXZpdHkgb2JqZWN0IGdpdmVuIGFuIGFjdGl2aXR5IElkXHJcbiAgICAgICAgICogQHBhcmFtIGFjdGl2aXR5SWRcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqIHtcclxuICAgICAgICAgKiAgICAgICBcImlkXCI6OCxcclxuICAgICAgICAgKiAgICAgICBcImFjdGl2aXR5XCI6XCJCYWRtaW50b25cIixcclxuICAgICAgICAgKiAgICAgIFwiY2F0ZWdvcnlcIjpcIkRyb3AgSW5cIixcclxuICAgICAgICAgKiAgICAgIFwid29tZW5fb25seVwiOjAsXHJcbiAgICAgICAgICogICAgICBcImNyZWF0ZWRfYXRcIjpcIjIwMTQtMTItMTQgMTY6NTE6MjVcIixcclxuICAgICAgICAgKiAgICAgIFwidXBkYXRlZF9hdFwiOlwiMjAxNC0xMi0xNCAxNjo1MToyNVwiXHJcbiAgICAgICAgICogfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldEFjdGl2aXR5KGFjdGl2aXR5SWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYXBpU2VydmljZVxyXG4gICAgICAgICAgICAgICAgLmdldChBUElfUk9VVEVTX0NPTkZJRy5BQ1RJVklUSUVTICArICcvJyArIGFjdGl2aXR5SWQpXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXhjZXB0aW9uU2VydmljZS5jYXRjaGVyKCdYSFIgRmFpbGVkIGZvciBnZXRBY3Rpdml0eVNlc3Npb25zJykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmV0cmlldmVzIGFsbCBkcm9waW4gYWN0aXZpdGllc1xyXG4gICAgICAgICAqIEByZXR1cm5zIHtuZy5JUHJvbWlzZTxUUmVzdWx0PnwqfSAtIFByb21pc2Ugb2YgYWN0aXZpdGllc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldERyb3BpbnMoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhcGlTZXJ2aWNlXHJcbiAgICAgICAgICAgICAgICAuZ2V0KEFQSV9ST1VURVNfQ09ORklHLkFDVElWSVRJRVMpXHJcbiAgICAgICAgICAgICAgICAudGhlbihnZXREcm9waW5zQ29tcGxldGUpXHJcbiAgICAgICAgICAgICAgICAudGhlbihjb252ZXJ0SXNXb21lbkJvb2xlYW4pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXhjZXB0aW9uU2VydmljZS5jYXRjaGVyKCdYSFIgRmFpbGVkIGZvciBnZXREcm9waW5zJykpO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0RHJvcGluc0NvbXBsZXRlKGFjdGl2aXRpZXMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpdml0aWVzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBIRUxQRVIgRlVOQ1RJT05TXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbnZlcnRzIHdvbWVuX29ubHkgYm9vbGVhbiB2YWx1ZSBmcm9tIDAsMSB0byBmYWxzZSwgdHJ1ZVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIGNvbGxlY3Rpb25cclxuICAgICAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBjb252ZXJ0SXNXb21lbkJvb2xlYW4oY29sbGVjdGlvbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF8uZm9yRWFjaChjb2xsZWN0aW9uLCBmdW5jdGlvbihlbCkge1xyXG4gICAgICAgICAgICAgICAgZWwud29tZW5fb25seSA9IGVsLndvbWVuX29ubHkgIT09IDA7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBqb2luQWN0aXZpdHlTZXNzaW9uKGFjdGl2aXR5SWQsIHNlc3Npb25JZCwgbmFtZXMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYXBpU2VydmljZVxyXG4gICAgICAgICAgICAgICAgLnBvc3QoQVBJX1JPVVRFU19DT05GSUcuQUNUSVZJVElFU1xyXG4gICAgICAgICAgICAgICAgKycvJythY3Rpdml0eUlkKycvc2Vzc2lvbnMvJytzZXNzaW9uSWQrJy9wYXJ0aWNpcGFudHMnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZXM6IG5hbWVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERhdGEgU2VydmljZSBvYmplY3QgdG8gcmV0cmlldmUgZGF0YSBmb3JcclxuICAgICAqIHNjaGVkdWxlLWJhc2UtbGF5b3V0IENvbnRyb2xsZXJcclxuICAgICAqL1xyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2pwLnNjaGVkdWxlLmxheW91dHMnKVxyXG4gICAgICAgIC5mYWN0b3J5KCdzY2hlZHVsZUJhc2VMYXlvdXREYXRhU2VydmljZScsIHNjaGVkdWxlQmFzZUxheW91dERhdGFGYWN0b3J5KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlcyBkYXRhIGZvciBzY2hlZHVsZS1iYXNlLWxheW91dCBDb250cm9sbGVyXHJcbiAgICAgKiBAcmV0dXJucyB7e2xvYWQ6IGxvYWR9fVxyXG4gICAgICogQG5nSW5qZWN0XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHNjaGVkdWxlQmFzZUxheW91dERhdGFGYWN0b3J5KCRxLCBzY2hlZHVsZVNlcnZpY2UpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbG9hZDogbG9hZFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIExvYWRzIGFsbCBkYXRhIGludG8gdGhpcy5kYXRhIGFuZCByZXR1cm5zIGEgcHJvbWlzZVxyXG4gICAgICAgIGZ1bmN0aW9uIGxvYWQoKSB7XHJcbiAgICAgICAgICAgIHZhciBkcm9waW5BY3Rpdml0aWVzID0gc2NoZWR1bGVTZXJ2aWNlLmdldERyb3BpbnMoKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAkcS5hbGwoW2Ryb3BpbkFjdGl2aXRpZXNdKS50aGVuKFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24ocmVzdWx0cykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3BpbkFjdGl2aXRpZXM6IHJlc3VsdHNbMF1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGF0YSBTZXJ2aWNlIG9iamVjdCB0byByZXRyaWV2ZSBkYXRhIGZvclxyXG4gICAgICogYWN0aXZpdHktc2Vzc2lvbnMtbGF5b3V0IENvbnRyb2xsZXJcclxuICAgICAqL1xyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2pwLnNjaGVkdWxlLmxheW91dHMnKVxyXG4gICAgICAgIC5mYWN0b3J5KCdhY3Rpdml0eVNlc3Npb25zTGF5b3V0RGF0YVNlcnZpY2UnLCBhY3Rpdml0eVNlc3Npb25zTGF5b3V0RGF0YUZhY3RvcnkpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0cmlldmVzIGRhdGEgZm9yIGFjdGl2aXR5LXNlc3Npb25zLWxheW91dCBDb250cm9sbGVyXHJcbiAgICAgKiBAcGFyYW0gJHEsXHJcbiAgICAgKiBAcmV0dXJucyB7e2FjdGl2aXR5U2Vzc2lvbnM6IGFjdGl2aXR5U2Vzc2lvbnN9fVxyXG4gICAgICogQG5nSW5qZWN0XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGFjdGl2aXR5U2Vzc2lvbnNMYXlvdXREYXRhRmFjdG9yeSgkcSwgc2NoZWR1bGVTZXJ2aWNlKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGxvYWQ6IGxvYWRcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBsb2FkKGFjdGl2aXR5SWQsIHdlZWtzRnJvbVRvZGF5KSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IFtcclxuICAgICAgICAgICAgICAgIGxvYWRBY3Rpdml0eVNlc3Npb25zVGhpc1dlZWsoYWN0aXZpdHlJZCksXHJcbiAgICAgICAgICAgICAgICBsb2FkQWN0aXZpdHlTZXNzaW9uc05leHRXZWVrKGFjdGl2aXR5SWQpLFxyXG4gICAgICAgICAgICAgICAgbG9hZEFjdGl2aXR5KGFjdGl2aXR5SWQpXHJcbiAgICAgICAgICAgIF07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gJHEuYWxsKGRhdGEpLnRoZW4oXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbihyZXN1bHRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5U2Vzc2lvbnNUaGlzV2VlazogcmVzdWx0c1swXSxcclxuICAgICAgICAgICAgICAgICAgICAgICBhY3Rpdml0eVNlc3Npb25zTmV4dFdlZWs6IHJlc3VsdHNbMV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZpdHk6IHJlc3VsdHNbMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRXZWVrOiB3ZWVrc0Zyb21Ub2RheVxyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBEYXRhIExvYWRlcnNcclxuICAgICAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgICAgICAgICAvLyBMb2FkcyBhbGwgZGF0YSBpbnRvIHRoaXMuZGF0YSBhbmQgcmV0dXJucyBhIHByb21pc2VcclxuICAgICAgICAgICAgZnVuY3Rpb24gbG9hZEFjdGl2aXR5U2Vzc2lvbnNUaGlzV2VlayhhY3Rpdml0eUlkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2NoZWR1bGVTZXJ2aWNlLmdldEFjdGl2aXR5U2Vzc2lvbnMoYWN0aXZpdHlJZCwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGxvYWRBY3Rpdml0eVNlc3Npb25zTmV4dFdlZWsoYWN0aXZpdHlJZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNjaGVkdWxlU2VydmljZS5nZXRBY3Rpdml0eVNlc3Npb25zKGFjdGl2aXR5SWQsIDEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBsb2FkQWN0aXZpdHkoYWN0aXZpdHlJZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNjaGVkdWxlU2VydmljZS5nZXRBY3Rpdml0eShhY3Rpdml0eUlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2pwLmZvb3RlcicpXHJcbiAgICAgICAgLmRpcmVjdGl2ZSgnanBGb290ZXInLCBqcEZvb3Rlcik7XHJcblxyXG4gICAgZnVuY3Rpb24ganBGb290ZXIoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcImFwcC9jb21wb25lbnRzL2Zvb3Rlci9mb290ZXIuaHRtbFwiXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2pwLnNjaGVkdWxlLndpZGdldHMuYWN0aXZpdHlQaWNrZXInKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ2pwU2NoZWR1bGVBY3Rpdml0eVBpY2tlcicsIGpwU2NoZWR1bGVBY3Rpdml0eVBpY2tlcik7XHJcblxyXG4gICAgZnVuY3Rpb24ganBTY2hlZHVsZUFjdGl2aXR5UGlja2VyKClcclxuICAgIHtcclxuICAgICAgICB2YXIgZGlyZWN0aXZlID0ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJhcHAvY29tcG9uZW50cy9zY2hlZHVsZS93aWRnZXRzL2FjdGl2aXR5LXBpY2tlci9hY3Rpdml0eS1waWNrZXIuaHRtbFwiLFxyXG4gICAgICAgICAgICBzY29wZToge1xyXG4gICAgICAgICAgICAgICAgYWN0aXZpdGllczogXCI9XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24oJHNjb3BlKSB7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcclxuICAgIH1cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2pwLnNjaGVkdWxlLndpZGdldHMuYWN0aXZpdHlTZXNzaW9ucycpXHJcbiAgICAgICAgLmRpcmVjdGl2ZSgnanBBY3Rpdml0eVNlc3Npb24nLCBqcEFjdGl2aXR5U2Vzc2lvbik7XHJcblxyXG4gICAgZnVuY3Rpb24ganBBY3Rpdml0eVNlc3Npb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvY29tcG9uZW50cy9zY2hlZHVsZS93aWRnZXRzL2FjdGl2aXR5LXNlc3Npb25zL2FjdGl2aXR5LXNlc3Npb24vYWN0aXZpdHktc2Vzc2lvbi5odG1sJyxcclxuICAgICAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgICAgIHNlc3Npb246ICc9JyxcclxuICAgICAgICAgICAgICAgIGRheTogJz0nLFxyXG4gICAgICAgICAgICAgICAgZmlyc3RTZXNzaW9uOiAnPScsXHJcbiAgICAgICAgICAgICAgICBsYXN0U2Vzc2lvbjogJz0nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uICgkc2NvcGUpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5zaG93RGV0YWlscyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgICRzY29wZS50b2dnbGVTaG93RGV0YWlscyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zaG93RGV0YWlscyA9ICEkc2NvcGUuc2hvd0RldGFpbHM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnanAuc2NoZWR1bGUud2lkZ2V0cy5hY3Rpdml0eVNlc3Npb25zJylcclxuICAgICAgICAuZGlyZWN0aXZlKCdqcEhlYWRlclN1bW1hcnknLCBqcEhlYWRlclN1bW1hcnkpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGpwSGVhZGVyU3VtbWFyeSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9jb21wb25lbnRzL3NjaGVkdWxlL3dpZGdldHMvYWN0aXZpdHktc2Vzc2lvbnMvaGVhZGVyLXN1bW1hcnkvaGVhZGVyLXN1bW1hcnkuaHRtbCcsXHJcbiAgICAgICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgICAgICBjb3VudDogJz0nLFxyXG4gICAgICAgICAgICAgICAgZGF5OiAnPScsXHJcbiAgICAgICAgICAgICAgICBzaG93TG9jYXRpb246ICc9JyxcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAnPSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdqcC5zY2hlZHVsZS53aWRnZXRzLmFjdGl2aXR5U2Vzc2lvbnMnKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ2pwU2NoZWR1bGVBY3Rpdml0eVNlc3Npb25zTGlzdCcsIGpwU2NoZWR1bGVBY3Rpdml0eVNlc3Npb25zTGlzdCk7XHJcblxyXG4gICAgZnVuY3Rpb24ganBTY2hlZHVsZUFjdGl2aXR5U2Vzc2lvbnNMaXN0KCkge1xyXG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2NvbXBvbmVudHMvc2NoZWR1bGUvd2lkZ2V0cy9hY3Rpdml0eS1zZXNzaW9ucy9saXN0L2FjdGl2aXR5LXNlc3Npb25zLWxpc3QuaHRtbCcsXHJcbiAgICAgICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgICAgICBzY2hlZHVsZTogJz0nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uICgkc2NvcGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xyXG4gICAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2pwLnNjaGVkdWxlLndpZGdldHMuYWN0aXZpdHlTZXNzaW9ucycpXHJcbiAgICAgICAgLmRpcmVjdGl2ZSgnanBTY2hlZHVsZUFjdGl2aXR5U2Vzc2lvbnNEYXlMaXN0JywganBTY2hlZHVsZUFjdGl2aXR5U2Vzc2lvbnNEYXlMaXN0KTtcclxuXHJcbiAgICAvKiBAbmdJbmdqZWN0ICovXHJcbiAgICBmdW5jdGlvbiBqcFNjaGVkdWxlQWN0aXZpdHlTZXNzaW9uc0RheUxpc3QoRGF0ZVRpbWVTZXJ2aWNlKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2NvbXBvbmVudHMvc2NoZWR1bGUvd2lkZ2V0cy9hY3Rpdml0eS1zZXNzaW9ucy9kYXktbGlzdC9hY3Rpdml0eS1zZXNzaW9ucy1kYXktbGlzdC5odG1sJyxcclxuICAgICAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgICAgIHNlc3Npb25zOiAnPScsXHJcbiAgICAgICAgICAgICAgICBkYXk6ICc9J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcclxuICAgIH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdqcC5zY2hlZHVsZS53aWRnZXRzLmFjdGl2aXR5U2Vzc2lvbnMnKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ2pwUGFydGljaXBhbnRKb2luJywganBQYXJ0aWNpcGFudEpvaW4pO1xyXG5cclxuICAgIC8vIEBuZ0luamVjdFxyXG4gICAgZnVuY3Rpb24ganBQYXJ0aWNpcGFudEpvaW4oc2NoZWR1bGVTZXJ2aWNlLCB0b2FzdHIsICRzdGF0ZSwgRGF0ZVRpbWVTZXJ2aWNlKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2NvbXBvbmVudHMvc2NoZWR1bGUvd2lkZ2V0cy9hY3Rpdml0eS1zZXNzaW9ucy9wYXJ0aWNpcGFudC1qb2luL3BhcnRpY2lwYW50LWpvaW4uaHRtbCcsXHJcbiAgICAgICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgICAgICBhY3Rpdml0eTogJz0nLFxyXG4gICAgICAgICAgICAgICAgYWN0aXZpdHlTZXNzaW9uOiAnPSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24oJHNjb3BlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuam9pbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjaGVkdWxlU2VydmljZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuam9pbkFjdGl2aXR5U2Vzc2lvbihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5hY3Rpdml0eVNlc3Npb24uYWN0aXZpdHlfaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuYWN0aXZpdHlTZXNzaW9uLmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VDU1YoJHNjb3BlLnVzZXIubmFtZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9hc3RyLnN1Y2Nlc3MoJ1lvdSBoYXZlIHN1Y2Nlc3NmdWxseSBqb2luZWQhIEhhdmUgZnVuIDopJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJHN0YXRlLiRjdXJyZW50LCBudWxsLCB7IHJlbG9hZDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGFjdGl2YXRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gYWN0aXZhdGUoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS51c2VyID0ge307XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gcGFyc2VDU1YobmFtZXMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5hbWVzLnNwbGl0KFwiLFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnanAuc2NoZWR1bGUud2lkZ2V0cy5hY3Rpdml0eVNlc3Npb25zJylcclxuICAgICAgICAuZGlyZWN0aXZlKCdqcFBhcnRpY2lwYW50TGlzdCcsIGpwUGFydGljaXBhbnRMaXN0KTtcclxuXHJcbiAgICBmdW5jdGlvbiBqcFBhcnRpY2lwYW50TGlzdCgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9jb21wb25lbnRzL3NjaGVkdWxlL3dpZGdldHMvYWN0aXZpdHktc2Vzc2lvbnMvcGFydGljaXBhbnQtbGlzdC9wYXJ0aWNpcGFudC1saXN0Lmh0bWwnLFxyXG4gICAgICAgICAgICBzY29wZToge1xyXG4gICAgICAgICAgICAgICAgcGFydGljaXBhbnRzOiAnPSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24oJHNjb3BlKVxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2pwLnNjaGVkdWxlLndpZGdldHMuYWN0aXZpdHlTZXNzaW9ucycpXHJcbiAgICAgICAgLmRpcmVjdGl2ZSgnanBTY2hlZHVsZVVuYXZhaWxhYmxlJywganBTY2hlZHVsZVVuYXZhaWxhYmxlKTtcclxuXHJcbiAgICAvKiBAbmdJbmplY3QgKi9cclxuICAgIGZ1bmN0aW9uIGpwU2NoZWR1bGVVbmF2YWlsYWJsZShEYXRlVGltZVNlcnZpY2UpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdBJyxcclxuICAgICAgICAgICAgc2NvcGU6IGZhbHNlLCAvLyBXZSdyZSB1c2luZyBzZXNzaW9uLnBhcnRpY2lwYW50cy5sZW5ndGggZnJvbSBwYXJlbnRcclxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24oJHNjb3BlLCAkZWxlbWVudClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKCRzY29wZS5kYXkuaXNCZWZvcmUoRGF0ZVRpbWVTZXJ2aWNlLm5vdygpLnN0YXJ0T2YoJ2RheScpKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5hZGRDbGFzcygnc2NoZWR1bGVVbmF2YWlsYWJsZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSkoKTsiLCIvLyBJbmNsdWRlIGluIGluZGV4Lmh0bWwgc28gdGhhdCBhcHAgbGV2ZWwgZXhjZXB0aW9ucyBhcmUgaGFuZGxlZC5cclxuLy8gU2hvdWxkIGV4Y2x1ZGUgZnJvbSB0ZXN0IHJ1bm5lclxyXG4oZnVuY3Rpb24oKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3V0aWxpdGllcy5leGNlcHRpb24nKVxyXG4gICAgICAgIC5wcm92aWRlcignZXhjZXB0aW9uSGFuZGxlcicsIGV4Y2VwdGlvbkhhbmRsZXJQcm92aWRlcilcclxuICAgICAgICAuY29uZmlnKGNvbmZpZyk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNdXN0IGNvbmZpZ3VyZSB0aGUgZXhjZXB0aW9uIGhhbmRsaW5nXHJcbiAgICAgKiBAcmV0dXJuIHtbdHlwZV19XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGV4Y2VwdGlvbkhhbmRsZXJQcm92aWRlcigpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IHtcclxuICAgICAgICAgICAgYXBwRXJyb3JQcmVmaXg6IHVuZGVmaW5lZFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuY29uZmlndXJlID0gZnVuY3Rpb24gKGFwcEVycm9yUHJlZml4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLmFwcEVycm9yUHJlZml4ID0gYXBwRXJyb3JQcmVmaXg7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy4kZ2V0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7Y29uZmlnOiB0aGlzLmNvbmZpZ307XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbmZpZ3VyZSBieSBzZXR0aW5nIGFuIG9wdGlvbmFsIHN0cmluZyB2YWx1ZSBmb3IgYXBwRXJyb3JQcmVmaXguXHJcbiAgICAgKiBBY2Nlc3NpYmxlIHZpYSBjb25maWcuYXBwRXJyb3JQcmVmaXggKHZpYSBjb25maWcgdmFsdWUpLlxyXG4gICAgICogQHBhcmFtICB7W3R5cGVdfSAkcHJvdmlkZVxyXG4gICAgICogQHJldHVybiB7W3R5cGVdfVxyXG4gICAgICogQG5nSW5qZWN0XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGNvbmZpZygkcHJvdmlkZSkge1xyXG4gICAgICAgICRwcm92aWRlLmRlY29yYXRvcignJGV4Y2VwdGlvbkhhbmRsZXInLCBleHRlbmRFeGNlcHRpb25IYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEV4dGVuZCB0aGUgJGV4Y2VwdGlvbkhhbmRsZXIgc2VydmljZSB0byBhbHNvIGRpc3BsYXkgYSB0b2FzdC5cclxuICAgICAqIEBwYXJhbSAge09iamVjdH0gJGRlbGVnYXRlXHJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGV4Y2VwdGlvbkhhbmRsZXJcclxuICAgICAqIEBwYXJhbSAge09iamVjdH0gbG9nZ2VyU2VydmljZVxyXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IHRoZSBkZWNvcmF0ZWQgJGV4Y2VwdGlvbkhhbmRsZXIgc2VydmljZVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBleHRlbmRFeGNlcHRpb25IYW5kbGVyKCRkZWxlZ2F0ZSwgZXhjZXB0aW9uSGFuZGxlciwgbG9nZ2VyU2VydmljZSkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihleGNlcHRpb24sIGNhdXNlKSB7XHJcbiAgICAgICAgICAgIHZhciBhcHBFcnJvclByZWZpeCA9IGV4Y2VwdGlvbkhhbmRsZXIuY29uZmlnLmFwcEVycm9yUHJlZml4IHx8ICcnO1xyXG4gICAgICAgICAgICB2YXIgZXJyb3JEYXRhID0ge2V4Y2VwdGlvbjogZXhjZXB0aW9uLCBjYXVzZTogY2F1c2V9O1xyXG4gICAgICAgICAgICBleGNlcHRpb24ubWVzc2FnZSA9IGFwcEVycm9yUHJlZml4ICsgZXhjZXB0aW9uLm1lc3NhZ2U7XHJcbiAgICAgICAgICAgICRkZWxlZ2F0ZShleGNlcHRpb24sIGNhdXNlKTtcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIENvdWxkIGFkZCB0aGUgZXJyb3IgdG8gYSBzZXJ2aWNlJ3MgY29sbGVjdGlvbixcclxuICAgICAgICAgICAgICogYWRkIGVycm9ycyB0byAkcm9vdFNjb3BlLCBsb2cgZXJyb3JzIHRvIHJlbW90ZSB3ZWIgc2VydmVyLFxyXG4gICAgICAgICAgICAgKiBvciBsb2cgbG9jYWxseS4gT3IgdGhyb3cgaGFyZC5cclxuICAgICAgICAgICAgICogdGhyb3cgZXhjZXB0aW9uO1xyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAgICAgKiAgICAgdGhyb3cgeyBtZXNzYWdlOiAnZXJyb3IgbWVzc2FnZSB3ZSBhZGRlZCcgfTtcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGxvZ2dlclNlcnZpY2UuZXJyb3IoZXhjZXB0aW9uLm1lc3NhZ2UsIGVycm9yRGF0YSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufSkoKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=