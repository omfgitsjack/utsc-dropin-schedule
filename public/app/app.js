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
(function(){
    "use strict";

    angular.module('utilities.api', []);

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
(function(){
    "use strict";

    angular.module('jp.schedule.widgets', [
        'jp.schedule.data'
    ]);

})();
(function () {
    "use strict";

    angular.module('app.places.activitysessions', []);

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
            .state({
                name: 'activities',
                parent: parent,
                url: '/',
                templateUrl: "app/components/schedule/layout/schedule-base-layout.html",
                controller: "ScheduleBaseCtrl",
                controllerAs: "vm",
                resolve: {
                    dataService: scheduleBaseLayoutDataService
                }
            });

        // Route Resolves
        /* @ngInject */
        function scheduleBaseLayoutDataService(scheduleBaseLayoutDataService) {
            return scheduleBaseLayoutDataService.load();
        }
        scheduleBaseLayoutDataService.$inject = ["scheduleBaseLayoutDataService"];
    }
    scheduleRouteConfig.$inject = ["$stateProvider", "SCHEDULE_ROOT_ROUTE"];
})();
(function () {
    "use strict";

    angular
        .module('app.core');

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
            DROPINS: 'dropins'
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
        .controller('ScheduleBaseCtrl', ScheduleBaseController);

    /* @ngInject */
    function ScheduleBaseController(dataService)
    {
        var vm = this;
        this.dataService = dataService;

        activate();

        function activate() {
            vm.activities = dataService.dropinActivities;
        }
    }
    ScheduleBaseController.$inject = ["dataService"];

})();
(function(){
    "use strict";

    angular
        .module('jp.schedule.widgets')
        .controller('ActivityCtrl', ActivityCtrl);

    /**
     * Activity Controller
     * @param $scope - Scope
     * @param dataService - data service
     * @constructor
     * @ngInject
     */
    function ActivityCtrl() {

        var vm = this;

        activate();

        //////////////////////

        function activate()
        {
            vm.activities = [{activities:'hihi'}];//dataService.dropinActivities;
        }

    }

    /**
     * Activity Controller dependencies
     */
    ActivityCtrl.resolve = {
        activities: activities
    };

    /* @ngInject */
    function activities(scheduleService) {
        return scheduleService.getDropins();
    }
    activities.$inject = ["scheduleService"];

})();
(function () {
    "use strict";

    angular
        .module('app.places.activitysessions')
        .controller('ActivitySessionCtrl', ActivitySessionCtrl);

    /**
     * Dependency Injection
     * @type {string[]}
     */
    ActivitySessionCtrl.$inject = ['$scope','activitySessions'];

    /**
     * Activity Session Controller
     * @param $scope
     * @constructor
     */
    function ActivitySessionCtrl($scope)
    {

        function init()
        {
            $scope.activitySessions = activitySessions;
        }

        init();
    }


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
            if (!moment.isMoment(momentObj))
            {
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
         * @returns {*}
         */
        function getDaysInThisWeek()
        {
            return getDaysInWeek(now());
        }

        /**
         * Retrieves an array of moments for a week, the week is based
         * on the inputted moment
         * @param dayInWeek
         * @returns {Array}
         */
        function getDaysInWeek(dayInWeek)
        {
            var firstDayOfWeek = dayInWeek.startOf('week');

            var daysInWeek = [];

            for (var i = 0; i < 7; i++)
            {
                daysInWeek.push(angular.copy(firstDayOfWeek).add(i, 'days'));
            }

            return daysInWeek;
        }
    }
    DateTimeFactory.$inject = ["UTC_TIMEFORMAT"];
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
                        'Error routing to ' + toState + ' from ' + fromState + '.' +
                        ' Error: ' + error;
                    loggerService.warning(msg, [error]);
                    goDefaultState();
                });
        }
    }
    routerService.$inject = ["$state", "$rootScope", "loggerService"];
})();
(function(){
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
    function scheduleFactory(apiService, API_ROUTES_CONFIG, exceptionService, DateTimeService)
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
     * activities Controller
     */
    angular
        .module('jp.schedule.widgets')
            .factory('activitiesDataService', activitiesDataFactory);

    /**
     * Retrieves data for activities Controller
     * @param $q
     * @param scheduleService
     * @returns {{load: load}}
     * @ngInject
     */
    function activitiesDataFactory($q, scheduleService) {

        return {
            load: load
        };

        // Retrieves all data and returns an object
        // E.g. {
        //          item1: item1,
        //          item2: item2
        //      }
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
    activitiesDataFactory.$inject = ["$q", "scheduleService"];
})();
(function () {
    "use strict";

    angular
        .module('jp.schedule.widgets')
        .directive('jpScheduleActivityWizard', jpScheduleActivityWizard);

    function jpScheduleActivityWizard()
    {
        var directive = {
            restrict: 'E',
            templateUrl: "app/components/schedule/widgets/activities/activities.tmpl.html",
            scope: {
                activities: "="
            },
            link: function($scope, $element, $attr) {
                console.log($scope);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUuanMiLCJjb3JlL2NvcmUubW9kdWxlLmpzIiwicm91dGVzL2FwcC1yb3V0ZXMubW9kdWxlLmpzIiwidXRpbGl0aWVzL2FwaS9hcGkubW9kdWxlLmpzIiwidXRpbGl0aWVzL2V4Y2VwdGlvbi9leGNlcHRpb24ubW9kdWxlLmpzIiwidXRpbGl0aWVzL2RhdGV0aW1lL2RhdGV0aW1lLm1vZHVsZS5qcyIsInV0aWxpdGllcy9sb2dnZXIvbG9nZ2VyLm1vZHVsZS5qcyIsInV0aWxpdGllcy9yb3V0ZXIvcm91dGVyLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvZGF0YS9zY2hlZHVsZS5tb2R1bGUuanMiLCJjb21wb25lbnRzL3NjaGVkdWxlL2xheW91dC9zY2hlZHVsZS1sYXlvdXQubW9kdWxlLmpzIiwiY29tcG9uZW50cy9zY2hlZHVsZS9yb3V0ZXMvc2NoZWR1bGUtcm91dGVzLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvd2lkZ2V0cy9hY3Rpdml0aWVzL2FjdGl2aXRpZXMubW9kdWxlLmpzIiwiY29tcG9uZW50cy9zY2hlZHVsZS93aWRnZXRzL2FjdGl2aXR5LXNlc3Npb25zL2FjdGl2aXR5c2Vzc2lvbnMubW9kdWxlLmpzIiwiY29yZS9jb3JlLmNvbmZpZy5qcyIsInJvdXRlcy9hcHAtcm91dGVzLmNvbmZpZy5qcyIsInV0aWxpdGllcy9kYXRldGltZS9kYXRldGltZS5jb25maWcuanMiLCJjb21wb25lbnRzL3NjaGVkdWxlL3JvdXRlcy9zY2hlZHVsZS1yb3V0ZXMuY29uZmlnLmpzIiwiY29yZS9jb3JlLmNvbnN0YW50LmpzIiwidXRpbGl0aWVzL2FwaS9hcGkuY29uc3RhbnQuanMiLCJ1dGlsaXRpZXMvYXBpL2FwaS5yb3V0ZXMuY29uc3RhbnQuanMiLCJ1dGlsaXRpZXMvZGF0ZXRpbWUvZGF0ZXRpbWUuY29uc3RhbnQuanMiLCJ1dGlsaXRpZXMvbG9nZ2VyL2xvZ2dlci5jb25zdGFudC5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvcm91dGVzL3NjaGVkdWxlLXJvb3Qtcm91dGUuY29uc3RhbnQuanMiLCJsYXlvdXQvc2hlbGwuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvbGF5b3V0L3NjaGVkdWxlLWJhc2UtbGF5b3V0LmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL3NjaGVkdWxlL3dpZGdldHMvYWN0aXZpdGllcy9hY3Rpdml0aWVzLmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL3NjaGVkdWxlL3dpZGdldHMvYWN0aXZpdHktc2Vzc2lvbnMvYWN0aXZpdHlzZXNzaW9ucy5jb250cm9sbGVyLmpzIiwidXRpbGl0aWVzL2FwaS9hcGktdHJhbnNmb3JtZXIuZmFjdG9yeS5qcyIsInV0aWxpdGllcy9hcGkvYXBpLmZhY3RvcnkuanMiLCJ1dGlsaXRpZXMvZXhjZXB0aW9uL2V4Y2VwdGlvbi5mYWN0b3J5LmpzIiwidXRpbGl0aWVzL2RhdGV0aW1lL2RhdGV0aW1lLmZhY3RvcnkuanMiLCJ1dGlsaXRpZXMvbG9nZ2VyL2xvZ2dlci5mYWN0b3J5LmpzIiwidXRpbGl0aWVzL3JvdXRlci9yb3V0ZXIuZmFjdG9yeS5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvZGF0YS9zY2hlZHVsZS5mYWN0b3J5LmpzIiwiY29tcG9uZW50cy9zY2hlZHVsZS9sYXlvdXQvc2NoZWR1bGUtYmFzZS1sYXlvdXQuZGF0YS5mYWN0b3J5LmpzIiwiY29tcG9uZW50cy9zY2hlZHVsZS93aWRnZXRzL2FjdGl2aXRpZXMvYWN0aXZpdGllcy5kYXRhLmZhY3RvcnkuanMiLCJjb21wb25lbnRzL3NjaGVkdWxlL3dpZGdldHMvYWN0aXZpdGllcy9hY3Rpdml0aWVzLmRpcmVjdGl2ZS5qcyIsInV0aWxpdGllcy9leGNlcHRpb24vZXhjZXB0aW9uLWhhbmRsZXIucHJvdmlkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsQ0FBQSxZQUFBO0lBQ0E7Ozs7O0lBS0EsUUFBQSxPQUFBLFlBQUE7UUFDQTtRQUNBOzs7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LENBQUEsWUFBQTtJQUNBOzs7OztJQUtBLFFBQUEsT0FBQTtTQUNBLFNBQUE7UUFDQTtZQUNBLFVBQUE7WUFDQSxNQUFBO1lBQ0EsS0FBQTtZQUNBLFVBQUE7OztBQ1pBLENBQUEsWUFBQTtJQUNBOzs7OztBQ0RBLENBQUEsWUFBQTtJQUNBOztJQUVBO1NBQ0EsT0FBQTtTQUNBLFdBQUEsb0JBQUE7OztJQUdBLFNBQUEsdUJBQUE7SUFDQTtRQUNBLElBQUEsS0FBQTtRQUNBLEtBQUEsY0FBQTs7UUFFQTs7UUFFQSxTQUFBLFdBQUE7WUFDQSxHQUFBLGFBQUEsWUFBQTs7Ozs7O0FDaEJBLENBQUEsVUFBQTtJQUNBOztJQUVBO1NBQ0EsT0FBQTtTQUNBLFdBQUEsZ0JBQUE7Ozs7Ozs7OztJQVNBLFNBQUEsZUFBQTs7UUFFQSxJQUFBLEtBQUE7O1FBRUE7Ozs7UUFJQSxTQUFBO1FBQ0E7WUFDQSxHQUFBLGFBQUEsQ0FBQSxDQUFBLFdBQUE7Ozs7Ozs7O0lBUUEsYUFBQSxVQUFBO1FBQ0EsWUFBQTs7OztJQUlBLFNBQUEsV0FBQSxpQkFBQTtRQUNBLE9BQUEsZ0JBQUE7Ozs7O0FDdENBLENBQUEsWUFBQTtJQUNBOztJQUVBO1NBQ0EsT0FBQTtTQUNBLFdBQUEsdUJBQUE7Ozs7OztJQU1BLG9CQUFBLFVBQUEsQ0FBQSxTQUFBOzs7Ozs7O0lBT0EsU0FBQSxvQkFBQTtJQUNBOztRQUVBLFNBQUE7UUFDQTtZQUNBLE9BQUEsbUJBQUE7OztRQUdBOzs7OztBQzFCQSxDQUFBLFlBQUE7SUFDQTs7SUFFQTtTQUNBLE9BQUE7U0FDQSxRQUFBLHlCQUFBOzs7Ozs7SUFNQSxTQUFBLHNCQUFBLGlCQUFBO0lBQ0E7UUFDQSxJQUFBLFVBQUE7WUFDQSxpQkFBQTs7O1FBR0EsT0FBQTs7UUFFQSxTQUFBLGdCQUFBLEtBQUE7WUFDQSxJQUFBLE9BQUEsUUFBQSxZQUFBLGVBQUE7WUFDQTtnQkFDQSxJQUFBLFVBQUEsSUFBQSxLQUFBO2dCQUNBLEtBQUEsT0FBQSxVQUFBLFNBQUEsS0FBQSxZQUFBLG1CQUFBOztvQkFFQSxLQUFBLE9BQUEsUUFBQSxjQUFBOzt3QkFFQSxPQUFBOzt5QkFFQTs7d0JBRUEsT0FBQSxnQkFBQSxTQUFBOzs7cUJBR0E7O29CQUVBLE9BQUE7OztpQkFHQSxJQUFBLElBQUEsZ0JBQUE7WUFDQTtnQkFDQSxJQUFBLFlBQUE7O2dCQUVBLElBQUEsUUFBQSxTQUFBLFNBQUEsT0FBQSxPQUFBO29CQUNBLFVBQUEsS0FBQSxnQkFBQTs7Z0JBRUEsT0FBQTs7aUJBRUEsSUFBQSxlQUFBO1lBQ0E7Z0JBQ0EsSUFBQSxZQUFBO2dCQUNBLEtBQUEsSUFBQSxRQUFBO2dCQUNBO29CQUNBLElBQUEsSUFBQSxlQUFBO29CQUNBO3dCQUNBLFVBQUEsUUFBQSxnQkFBQSxJQUFBOzs7Z0JBR0EsT0FBQTs7O1lBR0E7Z0JBQ0EsT0FBQTs7Ozs7O0FDOURBLENBQUEsWUFBQTtJQUNBOztJQUVBO1NBQ0EsT0FBQTtTQUNBLFFBQUEsY0FBQTs7Ozs7Ozs7O0lBU0EsU0FBQSxXQUFBLE9BQUEsWUFBQTtJQUNBO1FBQ0EsT0FBQTtZQUNBLEtBQUE7WUFDQSxNQUFBOzs7Ozs7OztRQVFBLFNBQUEsS0FBQSxPQUFBLE9BQUE7WUFDQSxJQUFBLENBQUEsT0FBQTtnQkFDQSxRQUFBOzs7WUFHQSxNQUFBLEtBQUEsV0FBQSxhQUFBLE1BQUEsT0FBQTs7Ozs7Ozs7UUFRQSxTQUFBLElBQUEsT0FBQTtZQUNBLE9BQUE7aUJBQ0EsSUFBQSxXQUFBLGFBQUEsTUFBQTtpQkFDQSxLQUFBO2lCQUNBLEtBQUEsc0JBQUE7OztRQUdBLFNBQUEsUUFBQSxTQUFBO1lBQ0EsT0FBQSxRQUFBOzs7Ozs7QUMvQ0EsQ0FBQSxZQUFBO0lBQ0E7O0lBRUE7U0FDQSxPQUFBO1NBQ0EsUUFBQSxvQkFBQTs7O0lBR0EsU0FBQSxpQkFBQSxlQUFBO1FBQ0EsSUFBQSxVQUFBO1lBQ0EsU0FBQTs7O1FBR0EsT0FBQTs7Ozs7OztRQU9BLFNBQUEsUUFBQSxTQUFBO1lBQ0EsT0FBQSxTQUFBLFFBQUE7Z0JBQ0EsY0FBQSxNQUFBLFNBQUE7Ozs7OztBQ3RCQSxDQUFBLFlBQUE7SUFDQTs7SUFFQTtTQUNBLE9BQUE7U0FDQSxRQUFBLG1CQUFBOzs7Ozs7Ozs7SUFTQSxTQUFBLGdCQUFBLGdCQUFBOztRQUVBLElBQUEsVUFBQTtZQUNBLEtBQUE7WUFDQSxPQUFBO1lBQ0EsVUFBQTtZQUNBLG1CQUFBOzs7UUFHQSxPQUFBOzs7Ozs7UUFNQSxTQUFBLE1BQUE7WUFDQSxPQUFBLE9BQUEsR0FBQSxJQUFBLFFBQUE7Ozs7Ozs7O1FBUUEsU0FBQSxNQUFBLFdBQUE7WUFDQSxJQUFBLENBQUEsT0FBQSxTQUFBO1lBQ0E7Z0JBQ0EsaUJBQUEsUUFBQTs7O1lBR0EsT0FBQSxVQUFBLEdBQUEsV0FBQSxPQUFBOzs7Ozs7OztRQVFBLFNBQUEsU0FBQSxXQUFBO1lBQ0EsT0FBQSxPQUFBLEdBQUEsV0FBQSxXQUFBLEdBQUE7Ozs7Ozs7O1FBUUEsU0FBQTtRQUNBO1lBQ0EsT0FBQSxjQUFBOzs7Ozs7Ozs7UUFTQSxTQUFBLGNBQUE7UUFDQTtZQUNBLElBQUEsaUJBQUEsVUFBQSxRQUFBOztZQUVBLElBQUEsYUFBQTs7WUFFQSxLQUFBLElBQUEsSUFBQSxHQUFBLElBQUEsR0FBQTtZQUNBO2dCQUNBLFdBQUEsS0FBQSxRQUFBLEtBQUEsZ0JBQUEsSUFBQSxHQUFBOzs7WUFHQSxPQUFBOzs7OztBQ25GQSxDQUFBLFlBQUE7SUFDQTs7Ozs7SUFLQTtTQUNBLE9BQUE7U0FDQSxRQUFBLGlCQUFBOzs7Ozs7OztJQVFBLFNBQUEsY0FBQSxNQUFBLFFBQUE7UUFDQSxJQUFBLFVBQUE7WUFDQSxZQUFBOztZQUVBLE9BQUE7WUFDQSxNQUFBO1lBQ0EsU0FBQTtZQUNBLFNBQUE7O1lBRUEsS0FBQSxLQUFBOzs7UUFHQSxPQUFBOzs7Ozs7OztRQVFBLFNBQUEsTUFBQSxTQUFBLE1BQUEsT0FBQTtZQUNBLE9BQUEsTUFBQSxTQUFBO1lBQ0EsS0FBQSxNQUFBLFlBQUEsU0FBQTs7Ozs7Ozs7O1FBU0EsU0FBQSxLQUFBLFNBQUEsTUFBQSxPQUFBO1lBQ0EsT0FBQSxLQUFBLFNBQUE7WUFDQSxLQUFBLEtB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QUNBLE9BQUE7U0FDQSxVQUFBLDRCQUFBOztJQUVBLFNBQUE7SUFDQTtRQUNBLElBQUEsWUFBQTtZQUNBLFVBQUE7WUFDQSxhQUFBO1lBQ0EsT0FBQTtnQkFDQSxZQUFBOztZQUVBLE1BQUEsU0FBQSxRQUFBLFVBQUEsT0FBQTtnQkFDQSxRQUFBLElBQUE7Ozs7UUFJQSxPQUFBOzs7Ozs7O0FDbEJBLENBQUEsV0FBQTtJQUNBOztJQUVBO1NBQ0EsT0FBQTtTQUNBLFNBQUEsb0JBQUE7U0FDQSxPQUFBOzs7Ozs7SUFNQSxTQUFBLDJCQUFBO1FBQ0EsS0FBQSxTQUFBO1lBQ0EsZ0JBQUE7OztRQUdBLEtBQUEsWUFBQSxVQUFBLGdCQUFBO1lBQ0EsS0FBQSxPQUFBLGlCQUFBOzs7UUFHQSxLQUFBLE9BQUEsV0FBQTtZQUNBLE9BQUEsQ0FBQSxRQUFBLEtBQUE7Ozs7Ozs7Ozs7O0lBV0EsU0FBQSxPQUFBLFVBQUE7UUFDQSxTQUFBLFVBQUEscUJBQUE7Ozs7Ozs7Ozs7O0lBVUEsU0FBQSx1QkFBQSxXQUFBLGtCQUFBLGVBQUE7UUFDQSxPQUFBLFNBQUEsV0FBQSxPQUFBO1lBQ0EsSUFBQSxpQkFBQSxpQkFBQSxPQUFBLGtCQUFBO1lBQ0EsSUFBQSxZQUFBLENBQUEsV0FBQSxXQUFBLE9BQUE7WUFDQSxVQUFBLFVBQUEsaUJBQUEsVUFBQTtZQUNBLFVBQUEsV0FBQTs7Ozs7Ozs7OztZQVVBLGNBQUEsTUFBQSxVQUFBLFNBQUE7Ozs7S0FHQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYWluIEFwcGxpY2F0aW9uIE1vZHVsZVxyXG4gICAgICovXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLm1haW4nLCBbXHJcbiAgICAgICAgJ2FwcC5yb3V0ZXMnLFxyXG4gICAgICAgICdhcHAuY29yZSdcclxuICAgIF0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb3JlJyxcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAqIEFuZ3VsYXIgbW9kdWxlc1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgJ25nTWF0ZXJpYWwnLFxyXG4gICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgKiBPdXIgcmV1c2FibGUgY3Jvc3MgYXBwIGNvZGUgbW9kdWxlc1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgJ3V0aWxpdGllcy5hcGknLFxyXG4gICAgICAgICAgICAndXRpbGl0aWVzLmV4Y2VwdGlvbicsXHJcbiAgICAgICAgICAgICd1dGlsaXRpZXMubG9nZ2VyJyxcclxuICAgICAgICAgICAgJ3V0aWxpdGllcy5yb3V0ZXInLFxyXG4gICAgICAgICAgICAndXRpbGl0aWVzLmRhdGV0aW1lJ1xyXG4gICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgKiAzcmQgUGFydHkgbW9kdWxlc1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICBdKTtcclxuXHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFwcGxpY2F0aW9uIHJvdXRlc1xyXG4gICAgICovXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLnJvdXRlcycsIFtcclxuICAgICAgICAnanAuc2NoZWR1bGUucm91dGVzJyxcclxuICAgICAgICAndXRpbGl0aWVzLnJvdXRlcidcclxuICAgIF0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKXtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCd1dGlsaXRpZXMuYXBpJywgW10pO1xyXG5cclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCd1dGlsaXRpZXMuZXhjZXB0aW9uJyxcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgICd1dGlsaXRpZXMubG9nZ2VyJ1xyXG4gICAgICAgIF0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcm92aWRlcyBhIERhdGVUaW1lU2VydmljZSB1dGlsaXR5IGNsYXNzIHRoYXQgcHJvdmlkZXMgYW4gaW50ZXJmYWNlIHRvXHJcbiAgICAgKiBtb21lbnQgb2JqZWN0cywgdXRpbGl0aWVzIGZvciB3b3JraW5nIHdpdGggTXlTUUwgVVRDIHRpbWVzIGV0Yy5cclxuICAgICAqXHJcbiAgICAgKiBSZWZlciB0byBkYXRldGltZS5mYWN0b3J5LmpzIGZvciBkb2N1bWVudGF0aW9uICYgYXZhaWxhYmxlIHRvb2xzXHJcbiAgICAgKi9cclxuICAgIGFuZ3VsYXIubW9kdWxlKCd1dGlsaXRpZXMuZGF0ZXRpbWUnLFxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgJ2FuZ3VsYXJNb21lbnQnXHJcbiAgICAgICAgXSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgndXRpbGl0aWVzLmxvZ2dlcicsXHJcbiAgICAgICAgW10pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ3V0aWxpdGllcy5yb3V0ZXInLFxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgJ3VpLnJvdXRlcidcclxuICAgICAgICBdKTtcclxuXHJcbn0pKCk7IiwiLyoqXHJcbiAqXHJcbiAqL1xyXG4oZnVuY3Rpb24oKXtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdqcC5zY2hlZHVsZS5kYXRhJywgW1xyXG4gICAgICAgICdhcHAuY29yZSdcclxuICAgIF0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2pwLnNjaGVkdWxlLmxheW91dHMnLFxyXG4gICAgICAgIFtdKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2NoZWR1bGUgUm91dGluZyBtb2R1bGVcclxuICAgICAqL1xyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2pwLnNjaGVkdWxlLnJvdXRlcycsIFtcclxuICAgICAgICAndWkucm91dGVyJyxcclxuICAgICAgICAnanAuc2NoZWR1bGUud2lkZ2V0cycsXHJcbiAgICAgICAgJ2pwLnNjaGVkdWxlLmxheW91dHMnXHJcbiAgICBdKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnanAuc2NoZWR1bGUud2lkZ2V0cycsIFtcclxuICAgICAgICAnanAuc2NoZWR1bGUuZGF0YSdcclxuICAgIF0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5wbGFjZXMuYWN0aXZpdHlzZXNzaW9ucycsIFtdKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29yZSBtb2R1bGUgY29uZmlndXJhdGlvblxyXG4gICAgICovXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwLmNvcmUnKVxyXG4gICAgICAgIC5jb25maWcodG9hc3RyQ29uZmlnKVxyXG4gICAgICAgIC5jb25maWcobG9nUHJvdmlkZXJDb25maWcpXHJcbiAgICAgICAgLmNvbmZpZyhleGNlcHRpb25IYW5kbGVyUHJvdmlkZXJDb25maWcpXHJcbiAgICAgICAgLnJ1bihpbml0Q29yZUNvbXBvbmVudHMpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVG9hc3RyIENvbmZpZ3VyYXRpb25cclxuICAgICAqIEBwYXJhbSB0b2FzdHJcclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiB0b2FzdHJDb25maWcodG9hc3RyKSB7XHJcbiAgICAgICAgdG9hc3RyLm9wdGlvbnMudGltZU91dCA9IDQwMDA7XHJcbiAgICAgICAgdG9hc3RyLm9wdGlvbnMucG9zaXRpb25DbGFzcyA9ICd0b2FzdC1ib3R0b20tcmlnaHQnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9nIFByb3ZpZGVyIENvbmZpZ3VyYXRpb25cclxuICAgICAqIEBwYXJhbSAkbG9nUHJvdmlkZXJcclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBsb2dQcm92aWRlckNvbmZpZygkbG9nUHJvdmlkZXIpIHtcclxuICAgICAgICBpZiAoJGxvZ1Byb3ZpZGVyLmRlYnVnRW5hYmxlZCkge1xyXG4gICAgICAgICAgICAkbG9nUHJvdmlkZXIuZGVidWdFbmFibGVkKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEV4Y2VwdGlvbiBIYW5kbGVyIFByb3ZpZGVyIGNvbmZpZ3VyYXRpb25cclxuICAgICAqIEBwYXJhbSBleGNlcHRpb25IYW5kbGVyUHJvdmlkZXJcclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBleGNlcHRpb25IYW5kbGVyUHJvdmlkZXJDb25maWcoZXhjZXB0aW9uSGFuZGxlclByb3ZpZGVyKSB7XHJcbiAgICAgICAgZXhjZXB0aW9uSGFuZGxlclByb3ZpZGVyLmNvbmZpZ3VyZSgnW05HLUpQIEVycm9yXSAnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWx6aWUgY29yZSBjb21wb25lbnRzXHJcbiAgICAgKiBAcGFyYW0gcm91dGVyU2VydmljZVxyXG4gICAgICogQG5nSW5qZWN0XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGluaXRDb3JlQ29tcG9uZW50cyhyb3V0ZXJTZXJ2aWNlKSB7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFwcCByb3V0ZSBjb25maWd1cmF0aW9uXHJcbiAgICAgKi9cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAucm91dGVzJylcclxuICAgICAgICAuY29uZmlnKHJvdXRlQ29uZmlnKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFVJLVJvdXRlciBzdGF0ZSBjb25maWd1cmF0aW9uLlxyXG4gICAgICogRmVhdHVyZSByb290IChhYnN0cmFjdCkgcm91dGVzIGFyZSBhbHNvIGluY2x1ZGVkLlxyXG4gICAgICogQHBhcmFtICRzdGF0ZVByb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0gU0NIRURVTEVfUk9PVF9ST1VURSBOb3RlIHRoYXQgdGhpcyBpcyBwYXJlbnRsZXNzLlxyXG4gICAgICogQG5nSW5qZWN0XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHJvdXRlQ29uZmlnKCRzdGF0ZVByb3ZpZGVyLCBTQ0hFRFVMRV9ST09UX1JPVVRFKVxyXG4gICAge1xyXG4gICAgICAgIC8vIERlZmluZSBSb290IFBhcmVudHNcclxuICAgICAgICBTQ0hFRFVMRV9ST09UX1JPVVRFWydwYXJlbnQnXSA9ICcnO1xyXG5cclxuICAgICAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgICAgICAgICAvLyBMb2NhbCBSb3V0ZXNcclxuICAgICAgICAgICAgLy8gRmVhdHVyZSBSb3V0ZXNcclxuICAgICAgICAgICAgLnN0YXRlKFNDSEVEVUxFX1JPT1RfUk9VVEUpO1xyXG4gICAgfVxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgndXRpbGl0aWVzLmRhdGV0aW1lJylcclxuICAgICAgICAuY29uZmlnKGRhdGV0aW1lQ29uZmlnKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbmZpZ3VyZSBkYXRlIHRpbWUgY29uZmlndXJhdGlvbiwgQW1lcmljYS9EZXRyb2l0IGhhcyBzYW1lIHRpbWV6b25lIGFzIHRvcm9udG9cclxuICAgICAqIEBwYXJhbSBtb21lbnRcclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBkYXRldGltZUNvbmZpZyhtb21lbnQpXHJcbiAgICB7XHJcbiAgICAgICAgLy8gTWFrZSBzdXJlIG1vbWVudCBpcyBpbiBlbmdsaXNoIGFuZCB0aGUgZmlyc3QgZGF5IG9mIHdlZWsgaXMgYSBtb25kYXlcclxuICAgICAgICBtb21lbnQubGFuZygnZW4nLCB7XHJcbiAgICAgICAgICAgIC8vIGN1c3RvbWl6YXRpb25zLlxyXG4gICAgICAgICAgICB3ZWVrOiB7XHJcbiAgICAgICAgICAgICAgICBkb3c6IDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBBZGQgQW1lcmljYS9EZXRyb2l0IHRpbWV6b25lLCBub3RlIHRoYXQgdGhpcyBpcyB0aGUgc2FtZSBhcyBUb3JvbnRvXHJcbiAgICAgICAgbW9tZW50LnR6LmFkZChcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgJ0FtZXJpY2EvRGV0cm9pdHxFU1QgRURUfDUwIDQwfDAxMDEwMTAxMDEwMTAxMDEwMTAxMDEwfDFCUVQwIDF6YjAgT3AwIDF6YjAgT3AwIDF6YjAgT3AwIDF6YjAgT3AwIDF6YjAgT3AwIDF6YjAgUmQwIDF6YjAgT3AwIDF6YjAgT3AwIDF6YjAgT3AwIDF6YjAgT3AwIDF6YjAnLFxyXG4gICAgICAgICAgICAgICAgXCJFdGMvVVRDfFVUQ3wwfDB8XCJcclxuICAgICAgICAgICAgXSk7XHJcbiAgICB9XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNjaGVkdWxlIHJvdXRlIGNvbmZpZ3VyYXRpb25cclxuICAgICAqL1xyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2pwLnNjaGVkdWxlLnJvdXRlcycpXHJcbiAgICAgICAgLmNvbmZpZyhzY2hlZHVsZVJvdXRlQ29uZmlnKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJvdXRlIGNvbmZpZ3VyYXRpb24sXHJcbiAgICAgKiB1c2VzIFNDSEVEVUxFX1JPT1RfUk9VVEUgYXMgYWJzdHJhY3QgcGFyZW50IHN0YXRlXHJcbiAgICAgKiBAcGFyYW0gJHN0YXRlUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSBTQ0hFRFVMRV9ST09UX1JPVVRFXHJcbiAgICAgKiBAbmdJbmplY3RcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gc2NoZWR1bGVSb3V0ZUNvbmZpZygkc3RhdGVQcm92aWRlciwgU0NIRURVTEVfUk9PVF9ST1VURSlcclxuICAgIHtcclxuICAgICAgICAvLyBQYXJlbnQgU3RhdGUncyBuYW1lIHRvIGJlIGluY2x1ZGVkIGluIGV2ZXJ5IHN0YXRlXHJcbiAgICAgICAgdmFyIHBhcmVudCA9IFNDSEVEVUxFX1JPT1RfUk9VVEUubmFtZTtcclxuXHJcbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgLy8gTG9jYWwgcm91dGVzXHJcbiAgICAgICAgICAgIC5zdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnYWN0aXZpdGllcycsXHJcbiAgICAgICAgICAgICAgICBwYXJlbnQ6IHBhcmVudCxcclxuICAgICAgICAgICAgICAgIHVybDogJy8nLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwL2NvbXBvbmVudHMvc2NoZWR1bGUvbGF5b3V0L3NjaGVkdWxlLWJhc2UtbGF5b3V0Lmh0bWxcIixcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6IFwiU2NoZWR1bGVCYXNlQ3RybFwiLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlckFzOiBcInZtXCIsXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVNlcnZpY2U6IHNjaGVkdWxlQmFzZUxheW91dERhdGFTZXJ2aWNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBSb3V0ZSBSZXNvbHZlc1xyXG4gICAgICAgIC8qIEBuZ0luamVjdCAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHNjaGVkdWxlQmFzZUxheW91dERhdGFTZXJ2aWNlKHNjaGVkdWxlQmFzZUxheW91dERhdGFTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzY2hlZHVsZUJhc2VMYXlvdXREYXRhU2VydmljZS5sb2FkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwLmNvcmUnKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQVBJIChub24tcm91dGUpIGNvbnN0YW50c1xyXG4gICAgICovXHJcbiAgICBhbmd1bGFyLm1vZHVsZShcInV0aWxpdGllcy5hcGlcIilcclxuICAgICAgICAuY29uc3RhbnQoJ0FQSV9DT05GSUcnLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQkFTRV9ST1VURTogJ2FwaSdcclxuICAgICAgICB9KTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBUEkgUmVzb3VyY2VzIGNvbnN0YW50c1xyXG4gICAgICovXHJcbiAgICBhbmd1bGFyLm1vZHVsZShcInV0aWxpdGllcy5hcGlcIilcclxuICAgICAgICAuY29uc3RhbnQoJ0FQSV9ST1VURVNfQ09ORklHJyxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERST1BJTlM6ICdkcm9waW5zJ1xyXG4gICAgICAgIH0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXcmFwIG1vbWVudCBhcyBhbiBhbmd1bGFyIGRlcGVuZGVuY3lcclxuICAgICAqIHdoaWxzdCBzZXR0aW5nIHRoZSBkZWZhdWx0IHRpbWV6b25lIGZvciBhbmd1bGFyXHJcbiAgICAgKiBtb21lbnRcclxuICAgICAqL1xyXG4gICAgYW5ndWxhci5tb2R1bGUoXCJ1dGlsaXRpZXMuZGF0ZXRpbWVcIilcclxuICAgICAgICAuY29uc3RhbnQoJ21vbWVudCcsIG1vbWVudClcclxuICAgICAgICAuY29uc3RhbnQoJ2FuZ3VsYXJNb21lbnRDb25maWcnLCB7XHJcbiAgICAgICAgICAgIHRpbWV6b25lOiAnQW1lcmljYS9EZXRyb2l0J1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNvbnN0YW50KCdVVENfVElNRUZPUk1BVCcsIFwiWVlZWS1NTS1ERCBISDpNTTpTU1wiKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKFwidXRpbGl0aWVzLmxvZ2dlclwiKVxyXG4gICAgICAgIC5jb25zdGFudCgndG9hc3RyJywgdG9hc3RyKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2NoZWR1bGUncyBhYnN0cmFjdCByb290IHJvdXRlXHJcbiAgICAgKi9cclxuICAgIGFuZ3VsYXIubW9kdWxlKFwianAuc2NoZWR1bGUucm91dGVzXCIpXHJcbiAgICAgICAgLmNvbnN0YW50KCdTQ0hFRFVMRV9ST09UX1JPVVRFJyxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGFic3RyYWN0OiB0cnVlLFxyXG4gICAgICAgICAgICBuYW1lOiAnc2NoZWR1bGUnLFxyXG4gICAgICAgICAgICB1cmw6ICcvc2NoZWR1bGUnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZTogXCI8ZGl2IHVpLXZpZXc+PC9kaXY+XCJcclxuICAgICAgICB9KTtcclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdqcC5zY2hlZHVsZS5sYXlvdXRzJylcclxuICAgICAgICAuY29udHJvbGxlcignU2NoZWR1bGVCYXNlQ3RybCcsIFNjaGVkdWxlQmFzZUNvbnRyb2xsZXIpO1xyXG5cclxuICAgIC8qIEBuZ0luamVjdCAqL1xyXG4gICAgZnVuY3Rpb24gU2NoZWR1bGVCYXNlQ29udHJvbGxlcihkYXRhU2VydmljZSlcclxuICAgIHtcclxuICAgICAgICB2YXIgdm0gPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UgPSBkYXRhU2VydmljZTtcclxuXHJcbiAgICAgICAgYWN0aXZhdGUoKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWN0aXZhdGUoKSB7XHJcbiAgICAgICAgICAgIHZtLmFjdGl2aXRpZXMgPSBkYXRhU2VydmljZS5kcm9waW5BY3Rpdml0aWVzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnanAuc2NoZWR1bGUud2lkZ2V0cycpXHJcbiAgICAgICAgLmNvbnRyb2xsZXIoJ0FjdGl2aXR5Q3RybCcsIEFjdGl2aXR5Q3RybCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBY3Rpdml0eSBDb250cm9sbGVyXHJcbiAgICAgKiBAcGFyYW0gJHNjb3BlIC0gU2NvcGVcclxuICAgICAqIEBwYXJhbSBkYXRhU2VydmljZSAtIGRhdGEgc2VydmljZVxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKiBAbmdJbmplY3RcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gQWN0aXZpdHlDdHJsKCkge1xyXG5cclxuICAgICAgICB2YXIgdm0gPSB0aGlzO1xyXG5cclxuICAgICAgICBhY3RpdmF0ZSgpO1xyXG5cclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFjdGl2YXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZtLmFjdGl2aXRpZXMgPSBbe2FjdGl2aXRpZXM6J2hpaGknfV07Ly9kYXRhU2VydmljZS5kcm9waW5BY3Rpdml0aWVzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBY3Rpdml0eSBDb250cm9sbGVyIGRlcGVuZGVuY2llc1xyXG4gICAgICovXHJcbiAgICBBY3Rpdml0eUN0cmwucmVzb2x2ZSA9IHtcclxuICAgICAgICBhY3Rpdml0aWVzOiBhY3Rpdml0aWVzXHJcbiAgICB9O1xyXG5cclxuICAgIC8qIEBuZ0luamVjdCAqL1xyXG4gICAgZnVuY3Rpb24gYWN0aXZpdGllcyhzY2hlZHVsZVNlcnZpY2UpIHtcclxuICAgICAgICByZXR1cm4gc2NoZWR1bGVTZXJ2aWNlLmdldERyb3BpbnMoKTtcclxuICAgIH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAucGxhY2VzLmFjdGl2aXR5c2Vzc2lvbnMnKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCdBY3Rpdml0eVNlc3Npb25DdHJsJywgQWN0aXZpdHlTZXNzaW9uQ3RybCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXBlbmRlbmN5IEluamVjdGlvblxyXG4gICAgICogQHR5cGUge3N0cmluZ1tdfVxyXG4gICAgICovXHJcbiAgICBBY3Rpdml0eVNlc3Npb25DdHJsLiRpbmplY3QgPSBbJyRzY29wZScsJ2FjdGl2aXR5U2Vzc2lvbnMnXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFjdGl2aXR5IFNlc3Npb24gQ29udHJvbGxlclxyXG4gICAgICogQHBhcmFtICRzY29wZVxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIEFjdGl2aXR5U2Vzc2lvbkN0cmwoJHNjb3BlKVxyXG4gICAge1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBpbml0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgICRzY29wZS5hY3Rpdml0eVNlc3Npb25zID0gYWN0aXZpdHlTZXNzaW9ucztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgndXRpbGl0aWVzLmFwaScpXHJcbiAgICAgICAgLmZhY3RvcnkoJ2FwaVRyYW5zZm9ybWVyU2VydmljZScsIGFwaVRyYW5zZm9ybWVyU2VydmljZSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVdGlsaXR5IGZ1bmN0aW9ucyB0byB0cmFuc2Zvcm0gQVBJIGNhbGxzXHJcbiAgICAgKiBAcmV0dXJucyB7e3Byb3A6IHByb3B9fVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBhcGlUcmFuc2Zvcm1lclNlcnZpY2UoRGF0ZVRpbWVTZXJ2aWNlLCBVVENfVElNRUZPUk1BVClcclxuICAgIHtcclxuICAgICAgICB2YXIgc2VydmljZSA9IHtcclxuICAgICAgICAgICAgcmVwbGFjZURhdGVUaW1lOiByZXBsYWNlRGF0ZVRpbWVcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gc2VydmljZTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVwbGFjZURhdGVUaW1lKG9iaikge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9iaiA9PT0gXCJzdHJpbmdcIiB8fCBvYmogaW5zdGFuY2VvZiBTdHJpbmcpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRlT2JqID0gbmV3IERhdGUob2JqKVxyXG4gICAgICAgICAgICAgICAgaWYgKCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZGF0ZU9iaiA9PT0gXCJbb2JqZWN0IERhdGVdXCIgKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGl0IGlzIGEgZGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICggaXNOYU4oIGRhdGVPYmouZ2V0VGltZSgpICkgKSB7ICAvLyBkLnZhbHVlT2YoKSBjb3VsZCBhbHNvIHdvcmtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGF0ZSBpcyBub3QgdmFsaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRhdGUgaXMgdmFsaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIERhdGVUaW1lU2VydmljZS5wYXJzZVVUQyhvYmopO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG5vdCBhIGRhdGVcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG9iai5jb25zdHJ1Y3RvciA9PT0gQXJyYXkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBjbG9uZWRPYmogPSBbXTtcclxuICAgICAgICAgICAgICAgIC8vIEZvciBlYWNoIGl0ZW0sIHdlIHJlYXNzaWduICYgcmVjdXJzaXZlbHkgY2FsbCByZXBsYWNlRGF0ZVRpbWVcclxuICAgICAgICAgICAgICAgIG9iai5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQsIGluZGV4LCBhcnJheSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsb25lZE9iai5wdXNoKHJlcGxhY2VEYXRlVGltZShlbGVtZW50KSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjbG9uZWRPYmo7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgT2JqZWN0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2xvbmVkT2JqID0ge307XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBwcm9wIGluIG9iailcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHByb3ApKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmVkT2JqW3Byb3BdID0gcmVwbGFjZURhdGVUaW1lKG9ialtwcm9wXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNsb25lZE9iajtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCd1dGlsaXRpZXMuYXBpJylcclxuICAgICAgICAuZmFjdG9yeSgnYXBpU2VydmljZScsIGFwaUZhY3RvcnkpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV3JhcHBlciBhcm91bmQgJGh0dHAgdGhhdCBhY3RzIGFzIHRoZSBkYXRhIHByb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0gJGh0dHAgLSBodHRwIGNsaWVudFxyXG4gICAgICogQHBhcmFtIEFQSV9DT05GSUcgLSBBUEkgY29uc3RhbnRzXHJcbiAgICAgKiBAcmV0dXJucyB7e2dldDogZ2V0LCBwb3N0OiBwb3N0fX0gLSBnZXQgYW5kIHBvc3Qgc2VydmljZXNcclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBhcGlGYWN0b3J5KCRodHRwLCBBUElfQ09ORklHLCBhcGlUcmFuc2Zvcm1lclNlcnZpY2UpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZ2V0OiBnZXQsXHJcbiAgICAgICAgICAgIHBvc3Q6IHBvc3RcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUYWtlcyBhbnkgaW5wdXQgYW5kIGNhbGxzIGEgSFRUUCBQT1NUIG9uIHRoZSBnaXZlbiByb3V0ZVxyXG4gICAgICAgICAqIEBwYXJhbSByb3V0ZSAtIFJvdXRlIGZvciBwb3N0aW5nXHJcbiAgICAgICAgICogQHBhcmFtIGlucHV0IC0gUGF5bG9hZFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHBvc3Qocm91dGUsIGlucHV0KSB7XHJcbiAgICAgICAgICAgIGlmICghaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgIGlucHV0ID0ge307XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICRodHRwLnBvc3QoQVBJX0NPTkZJRy5CQVNFX1JPVVRFICsgJy8nICsgcm91dGUsIGlucHV0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENhbGxzIGEgSFRUUCBHRVQgb24gdGhlIGdpdmVuIHJvdXRlXHJcbiAgICAgICAgICogQHBhcmFtIHJvdXRlIC0gUm91dGUgdG8gZ2V0XHJcbiAgICAgICAgICogQHJldHVybnMge25nLklQcm9taXNlPFRSZXN1bHQ+fCp9IC0gUHJvbWlzZSBvZiByZXN1bHRzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0KHJvdXRlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cFxyXG4gICAgICAgICAgICAgICAgLmdldChBUElfQ09ORklHLkJBU0VfUk9VVEUgKyAnLycgKyByb3V0ZSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGdldERhdGEpXHJcbiAgICAgICAgICAgICAgICAudGhlbihhcGlUcmFuc2Zvcm1lclNlcnZpY2UucmVwbGFjZURhdGVUaW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldERhdGEocGF5bG9hZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcGF5bG9hZC5kYXRhXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3V0aWxpdGllcy5leGNlcHRpb24nKVxyXG4gICAgICAgIC5mYWN0b3J5KCdleGNlcHRpb25TZXJ2aWNlJywgZXhjZXB0aW9uRmFjdG9yeSk7XHJcblxyXG4gICAgLyogQG5nSW5qZWN0ICovXHJcbiAgICBmdW5jdGlvbiBleGNlcHRpb25GYWN0b3J5KGxvZ2dlclNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgc2VydmljZSA9IHtcclxuICAgICAgICAgICAgY2F0Y2hlcjogY2F0Y2hlclxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDYXRjaGVzIGV4Y2VwdGlvbnMsIGxvZ3MgcmVhc29uIGludG8gY29uc29sZS5cclxuICAgICAgICAgKiBAcGFyYW0gbWVzc2FnZVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBjYXRjaGVyKG1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHJlYXNvbikge1xyXG4gICAgICAgICAgICAgICAgbG9nZ2VyU2VydmljZS5lcnJvcihtZXNzYWdlLCByZWFzb24pO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3V0aWxpdGllcy5kYXRldGltZScpXHJcbiAgICAgICAgLmZhY3RvcnkoJ0RhdGVUaW1lU2VydmljZScsIERhdGVUaW1lRmFjdG9yeSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEYXRlIFRpbWUgdXRpbGl0eSBiZWx0IHRoYXQgdXRpbGl6ZXMgbW9tZW50ICYgc3VwcGxpZXMga2V5XHJcbiAgICAgKiB1dGlsaXRpZXMgZm9yIHdvcmtpbmcgd2l0aCBNeVNRTCBEYXRlVGltZSAmIHRpbWUgem9uZSBpc3N1ZXNcclxuICAgICAqIEByZXR1cm5zIHt7bm93OiBub3csIHRvVVRDOiB0b1VUQywgcGFyc2VVVEM6IHBhcnNlVVRDfX1cclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICogQG5nSW5qZWN0XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIERhdGVUaW1lRmFjdG9yeShVVENfVElNRUZPUk1BVCkge1xyXG5cclxuICAgICAgICB2YXIgc2VydmljZSA9IHtcclxuICAgICAgICAgICAgbm93OiBub3csXHJcbiAgICAgICAgICAgIHRvVVRDOiB0b1VUQyxcclxuICAgICAgICAgICAgcGFyc2VVVEM6IHBhcnNlVVRDLFxyXG4gICAgICAgICAgICBnZXREYXlzSW5UaGlzV2VlazogZ2V0RGF5c0luVGhpc1dlZWtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gc2VydmljZTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUHJvdmlkZSBhbiBpbnRlcmZhY2UgdG8gcmV0cmlldmUgYSBtb21lbnQvZGF0ZVxyXG4gICAgICAgICAqIEByZXR1cm5zIG1vbWVudFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIG5vdygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1vbWVudC50eihuZXcgRGF0ZSgpLCAnQW1lcmljYS9EZXRyb2l0Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUcmFuc2Zvcm1zIG1vbWVudCBpbnRvIE15U1FMIGFjY2VwdGFibGUgVVRDIERhdGVUaW1lIG9iamVjdFxyXG4gICAgICAgICAqIEBwYXJhbSBtb21lbnRPYmpcclxuICAgICAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiB0b1VUQyhtb21lbnRPYmopIHtcclxuICAgICAgICAgICAgaWYgKCFtb21lbnQuaXNNb21lbnQobW9tZW50T2JqKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZXhjZXB0aW9uU2VydmljZS5jYXRjaGVyKCdOb24tbW9tZW50IG9iamVjdCBkZXRlY3RlZCcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbW9tZW50T2JqLnR6KFwiRXRjL1VUQ1wiKS5mb3JtYXQoVVRDX1RJTUVGT1JNQVQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVHJhbnNmb3JtcyBNeVNRTCBVVEMgdGltZSBTdHJpbmdzIGludG8gbW9tZW50c1xyXG4gICAgICAgICAqIEBwYXJhbSB1dGNTdHJpbmdcclxuICAgICAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBwYXJzZVVUQyh1dGNTdHJpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1vbWVudC50eih1dGNTdHJpbmcsICdFdGMvVVRDJykudHooJ0FtZXJpY2EvRGV0cm9pdCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmV0cmlldmVzIGFuIGFycmF5IG9mIG1vbWVudHMgZm9yIHRoaXMgd2VlayxcclxuICAgICAgICAgKiBlYWNoIG1vbWVudCByZXByZXNlbnRzIHRoZSBzdGFydCBvZiB0aGUgZGF5LlxyXG4gICAgICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldERheXNJblRoaXNXZWVrKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBnZXREYXlzSW5XZWVrKG5vdygpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJldHJpZXZlcyBhbiBhcnJheSBvZiBtb21lbnRzIGZvciBhIHdlZWssIHRoZSB3ZWVrIGlzIGJhc2VkXHJcbiAgICAgICAgICogb24gdGhlIGlucHV0dGVkIG1vbWVudFxyXG4gICAgICAgICAqIEBwYXJhbSBkYXlJbldlZWtcclxuICAgICAgICAgKiBAcmV0dXJucyB7QXJyYXl9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0RGF5c0luV2VlayhkYXlJbldlZWspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZmlyc3REYXlPZldlZWsgPSBkYXlJbldlZWsuc3RhcnRPZignd2VlaycpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRheXNJbldlZWsgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNzsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkYXlzSW5XZWVrLnB1c2goYW5ndWxhci5jb3B5KGZpcnN0RGF5T2ZXZWVrKS5hZGQoaSwgJ2RheXMnKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkYXlzSW5XZWVrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXcmFwcGVyIGFyb3VuZCB0b2FzdHJcclxuICAgICAqL1xyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3V0aWxpdGllcy5sb2dnZXInKVxyXG4gICAgICAgIC5mYWN0b3J5KCdsb2dnZXJTZXJ2aWNlJywgbG9nZ2VyRmFjdG9yeSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWFscyB3aXRoIHJldmVhbGluZyAmIGxvZ2dpbmcuXHJcbiAgICAgKiBAcmV0dXJucyB7XHJcbiAgICAgKiB7c2hvd1RvYXN0czogYm9vbGVhbiwgZXJyb3I6IGVycm9yLCBpbmZvOiBpbmZvLCBzdWNjZXNzOiBzdWNjZXNzLCB3YXJuaW5nOiB3YXJuaW5nLCBsb2c6ICgkbG9nLmxvZ3wqKX19XHJcbiAgICAgKiBAbmdJbmplY3RcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gbG9nZ2VyRmFjdG9yeSgkbG9nLCB0b2FzdHIpIHtcclxuICAgICAgICB2YXIgc2VydmljZSA9IHtcclxuICAgICAgICAgICAgc2hvd1RvYXN0czogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIGVycm9yOiBlcnJvcixcclxuICAgICAgICAgICAgaW5mbzogaW5mbyxcclxuICAgICAgICAgICAgc3VjY2Vzczogc3VjY2VzcyxcclxuICAgICAgICAgICAgd2FybmluZzogd2FybmluZyxcclxuXHJcbiAgICAgICAgICAgIGxvZzogJGxvZy5sb2dcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gc2VydmljZTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVkIGVycm9yIHRvYXN0IHdpdGggYSBjcm9zc1xyXG4gICAgICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgICAgICogQHBhcmFtIGRhdGFcclxuICAgICAgICAgKiBAcGFyYW0gdGl0bGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBlcnJvcihtZXNzYWdlLCBkYXRhLCB0aXRsZSkge1xyXG4gICAgICAgICAgICB0b2FzdHIuZXJyb3IobWVzc2FnZSwgdGl0bGUpO1xyXG4gICAgICAgICAgICAkbG9nLmVycm9yKCdFcnJvcjogJyArIG1lc3NhZ2UsIGRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTGlnaHQgYmx1ZSB0b2FzdCB3aXRoIGV4Y2xhbWF0aW9uIG1hcmtcclxuICAgICAgICAgKiBAcGFyYW0gbWVzc2FnZVxyXG4gICAgICAgICAqIEBwYXJhbSBkYXRhXHJcbiAgICAgICAgICogQHBhcmFtIHRpdGxlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gaW5mbyhtZXNzYWdlLCBkYXRhLCB0aXRsZSkge1xyXG4gICAgICAgICAgICB0b2FzdHIuaW5mbyhtZXNzYWdlLCB0aXRsZSk7XHJcbiAgICAgICAgICAgICRsb2cuaW5mbygnSW5mbzogJyArIG1lc3NhZ2UsIGRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR3JlZW4gdG9hc3Qgd2l0aCB0aWNrXHJcbiAgICAgICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAgICAgKiBAcGFyYW0gZGF0YVxyXG4gICAgICAgICAqIEBwYXJhbSB0aXRsZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHN1Y2Nlc3MobWVzc2FnZSwgZGF0YSwgdGl0bGUpIHtcclxuICAgICAgICAgICAgdG9hc3RyLnN1Y2Nlc3MobWVzc2FnZSwgdGl0bGUpO1xyXG4gICAgICAgICAgICAkbG9nLmluZm8oJ1N1Y2Nlc3M6ICcgKyBtZXNzYWdlLCBkYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlZCB0b2FzdCB3aXRoIENyb3NzXHJcbiAgICAgICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAgICAgKiBAcGFyYW0gZGF0YVxyXG4gICAgICAgICAqIEBwYXJhbSB0aXRsZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHdhcm5pbmcobWVzc2FnZSwgZGF0YSwgdGl0bGUpIHtcclxuICAgICAgICAgICAgdG9hc3RyLndhcm5pbmcobWVzc2FnZSwgdGl0bGUpO1xyXG4gICAgICAgICAgICAkbG9nLndhcm4oJ1dhcm5pbmc6ICcgKyBtZXNzYWdlLCBkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCd1dGlsaXRpZXMucm91dGVyJylcclxuICAgICAgICAuZmFjdG9yeSgncm91dGVyU2VydmljZScsIHJvdXRlclNlcnZpY2UpO1xyXG5cclxuICAgIC8qIEBuZ0luamVjdCAqL1xyXG4gICAgZnVuY3Rpb24gcm91dGVyU2VydmljZSgkc3RhdGUsICRyb290U2NvcGUsIGxvZ2dlclNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgaGFuZGxpbmdSb3V0ZUNoYW5nZUVycm9yID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIHJvdXRlQ291bnRzID0ge1xyXG4gICAgICAgICAgICBlcnJvcnM6IDAsXHJcbiAgICAgICAgICAgIGNoYW5nZXM6IDBcclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciByb3V0ZXMgPSBbXTtcclxuICAgICAgICB2YXIgZ29EZWZhdWx0U3RhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygkc3RhdGUuJGN1cnJlbnQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZ29EZWZhdWx0U3RhdGU6IGdvRGVmYXVsdFN0YXRlXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICAgICAgaGFuZGxlUm91dGVFcnJvcnMoKTtcclxuICAgICAgICAgICAgaGFuZGxlUm91dGVTdWNjZXNzZXMoKTtcclxuICAgICAgICAgICAgaGFuZGxlUm91dGVOb3RGb3VuZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlUm91dGVOb3RGb3VuZCgpIHtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZU5vdEZvdW5kJyxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChldmVudCwgdW5mb3VuZFN0YXRlLCBmcm9tU3RhdGUsIGZyb21QYXJhbXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaGFuZGxpbmdSb3V0ZUNoYW5nZUVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcm91dGVDb3VudHMuZXJyb3JzKys7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxpbmdSb3V0ZUNoYW5nZUVycm9yID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTG9nIFN0YXRlIG5vdCBmb3VuZFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtc2cgPSAnW1N0YXRlIG5vdCBmb3VuZF0gRXJyb3Igcm91dGluZyB0byAnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdW5mb3VuZFN0YXRlLnRvICsgJyBmcm9tICcgKyBmcm9tU3RhdGUucGFyZW50ICsgJy4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJvbVN0YXRlLm5hbWUgKyAnLic7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyU2VydmljZS53YXJuaW5nKG1zZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ29EZWZhdWx0U3RhdGUoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlUm91dGVTdWNjZXNzZXMoKSB7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdWNjZXNzJyxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICByb3V0ZUNvdW50cy5jaGFuZ2VzKys7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxpbmdSb3V0ZUNoYW5nZUVycm9yID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZVJvdXRlRXJyb3JzKCkge1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlRXJyb3InLFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKGV2ZW50LCB0b1N0YXRlLCB0b1BhcmFtcywgZnJvbVN0YXRlLCBmcm9tUGFyYW1zLCBlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChoYW5kbGluZ1JvdXRlQ2hhbmdlRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByb3V0ZUNvdW50cy5lcnJvcnMrKztcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGluZ1JvdXRlQ2hhbmdlRXJyb3IgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBMb2cgU3RhdGUgcm91dGluZyBlcnJvclxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtc2cgPSAnW1N0YXRlIFJvdXRpbmcgRXJyb3JdICcgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnRXJyb3Igcm91dGluZyB0byAnICsgdG9TdGF0ZSArICcgZnJvbSAnICsgZnJvbVN0YXRlICsgJy4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJyBFcnJvcjogJyArIGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlclNlcnZpY2Uud2FybmluZyhtc2csIFtlcnJvcl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGdvRGVmYXVsdFN0YXRlKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnanAuc2NoZWR1bGUuZGF0YScpXHJcbiAgICAgICAgLmZhY3RvcnkoJ3NjaGVkdWxlU2VydmljZScsIHNjaGVkdWxlRmFjdG9yeSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcm92aWRlcyBhY3Rpdml0aWVzIGFuZCB0aGVpciBhY3Rpdml0eSBzZXNzaW9uc1xyXG4gICAgICogQHBhcmFtIGFwaVNlcnZpY2VcclxuICAgICAqIEBwYXJhbSBBUElfUk9VVEVTX0NPTkZJR1xyXG4gICAgICogQHBhcmFtIGV4Y2VwdGlvblNlcnZpY2VcclxuICAgICAqIEByZXR1cm5zIHt7Z2V0RHJvcGluczogZ2V0RHJvcGlucywgZ2V0QWN0aXZpdHlTZXNzaW9uczogZ2V0QWN0aXZpdHlTZXNzaW9uc319XHJcbiAgICAgKiBAbmdJbmplY3RcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gc2NoZWR1bGVGYWN0b3J5KGFwaVNlcnZpY2UsIEFQSV9ST1VURVNfQ09ORklHLCBleGNlcHRpb25TZXJ2aWNlLCBEYXRlVGltZVNlcnZpY2UpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZ2V0RHJvcGluczogZ2V0RHJvcGlucyxcclxuICAgICAgICAgICAgZ2V0QWN0aXZpdHlTZXNzaW9uczogZ2V0QWN0aXZpdHlTZXNzaW9uc1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJldHJpZXZlcyBhbGwgYWN0aXZpdHkgc2Vzc2lvbnMgZm9yIGEgZ2l2ZW4gYWN0aXZpdHlcclxuICAgICAgICAgKiBAcGFyYW0gYWN0aXZpdHlJZCAtIEFjdGl2aXR5IElkXHJcbiAgICAgICAgICogQHJldHVybnMge25nLklQcm9taXNlPFRSZXN1bHQ+fCp9IC0gUHJvbWlzZSBvZiBhY3Rpdml0eSBzZXNzaW9uc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldEFjdGl2aXR5U2Vzc2lvbnMoYWN0aXZpdHlJZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXBpU2VydmljZVxyXG4gICAgICAgICAgICAgICAgLmdldChBUElfUk9VVEVTX0NPTkZJRy5EUk9QSU5TICsgJy8nICsgYWN0aXZpdHlJZClcclxuICAgICAgICAgICAgICAgIC50aGVuKGdldEFjdGl2aXR5U2Vzc2lvbnNDb21wbGV0ZSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaChleGNlcHRpb25TZXJ2aWNlLmNhdGNoZXIoJ1hIUiBGYWlsZWQgZm9yIGdldEFjdGl2aXR5U2Vzc2lvbnMnKSk7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRBY3Rpdml0eVNlc3Npb25zQ29tcGxldGUoYWN0aXZpdHlTZXNzaW9ucykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjdGl2aXR5U2Vzc2lvbnM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJldHJpZXZlcyBhbGwgZHJvcGluIGFjdGl2aXRpZXNcclxuICAgICAgICAgKiBAcmV0dXJucyB7bmcuSVByb21pc2U8VFJlc3VsdD58Kn0gLSBQcm9taXNlIG9mIGFjdGl2aXRpZXNcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBnZXREcm9waW5zKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXBpU2VydmljZVxyXG4gICAgICAgICAgICAgICAgLmdldChBUElfUk9VVEVTX0NPTkZJRy5EUk9QSU5TKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZ2V0RHJvcGluc0NvbXBsZXRlKVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGV4Y2VwdGlvblNlcnZpY2UuY2F0Y2hlcignWEhSIEZhaWxlZCBmb3IgZ2V0RHJvcGlucycpKTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldERyb3BpbnNDb21wbGV0ZShhY3Rpdml0aWVzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYWN0aXZpdGllcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGF0YSBTZXJ2aWNlIG9iamVjdCB0byByZXRyaWV2ZSBkYXRhIGZvclxyXG4gICAgICogc2NoZWR1bGUtYmFzZS1sYXlvdXQgQ29udHJvbGxlclxyXG4gICAgICovXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnanAuc2NoZWR1bGUubGF5b3V0cycpXHJcbiAgICAgICAgLmZhY3RvcnkoJ3NjaGVkdWxlQmFzZUxheW91dERhdGFTZXJ2aWNlJywgc2NoZWR1bGVCYXNlTGF5b3V0RGF0YUZhY3RvcnkpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0cmlldmVzIGRhdGEgZm9yIHNjaGVkdWxlLWJhc2UtbGF5b3V0IENvbnRyb2xsZXJcclxuICAgICAqIEByZXR1cm5zIHt7bG9hZDogbG9hZH19XHJcbiAgICAgKiBAbmdJbmplY3RcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gc2NoZWR1bGVCYXNlTGF5b3V0RGF0YUZhY3RvcnkoJHEsIHNjaGVkdWxlU2VydmljZSlcclxuICAgIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBsb2FkOiBsb2FkXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gTG9hZHMgYWxsIGRhdGEgaW50byB0aGlzLmRhdGEgYW5kIHJldHVybnMgYSBwcm9taXNlXHJcbiAgICAgICAgZnVuY3Rpb24gbG9hZCgpIHtcclxuICAgICAgICAgICAgdmFyIGRyb3BpbkFjdGl2aXRpZXMgPSBzY2hlZHVsZVNlcnZpY2UuZ2V0RHJvcGlucygpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuICRxLmFsbChbZHJvcGluQWN0aXZpdGllc10pLnRoZW4oXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbihyZXN1bHRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGluQWN0aXZpdGllczogcmVzdWx0c1swXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEYXRhIFNlcnZpY2Ugb2JqZWN0IHRvIHJldHJpZXZlIGRhdGEgZm9yXHJcbiAgICAgKiBhY3Rpdml0aWVzIENvbnRyb2xsZXJcclxuICAgICAqL1xyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2pwLnNjaGVkdWxlLndpZGdldHMnKVxyXG4gICAgICAgICAgICAuZmFjdG9yeSgnYWN0aXZpdGllc0RhdGFTZXJ2aWNlJywgYWN0aXZpdGllc0RhdGFGYWN0b3J5KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlcyBkYXRhIGZvciBhY3Rpdml0aWVzIENvbnRyb2xsZXJcclxuICAgICAqIEBwYXJhbSAkcVxyXG4gICAgICogQHBhcmFtIHNjaGVkdWxlU2VydmljZVxyXG4gICAgICogQHJldHVybnMge3tsb2FkOiBsb2FkfX1cclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBhY3Rpdml0aWVzRGF0YUZhY3RvcnkoJHEsIHNjaGVkdWxlU2VydmljZSkge1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBsb2FkOiBsb2FkXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gUmV0cmlldmVzIGFsbCBkYXRhIGFuZCByZXR1cm5zIGFuIG9iamVjdFxyXG4gICAgICAgIC8vIEUuZy4ge1xyXG4gICAgICAgIC8vICAgICAgICAgIGl0ZW0xOiBpdGVtMSxcclxuICAgICAgICAvLyAgICAgICAgICBpdGVtMjogaXRlbTJcclxuICAgICAgICAvLyAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBsb2FkKCkge1xyXG4gICAgICAgICAgICB2YXIgZHJvcGluQWN0aXZpdGllcyA9IHNjaGVkdWxlU2VydmljZS5nZXREcm9waW5zKCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gJHEuYWxsKFtkcm9waW5BY3Rpdml0aWVzXSkudGhlbihcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHJlc3VsdHMpIHtcclxuICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgZHJvcGluQWN0aXZpdGllczogcmVzdWx0c1swXVxyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnanAuc2NoZWR1bGUud2lkZ2V0cycpXHJcbiAgICAgICAgLmRpcmVjdGl2ZSgnanBTY2hlZHVsZUFjdGl2aXR5V2l6YXJkJywganBTY2hlZHVsZUFjdGl2aXR5V2l6YXJkKTtcclxuXHJcbiAgICBmdW5jdGlvbiBqcFNjaGVkdWxlQWN0aXZpdHlXaXphcmQoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcImFwcC9jb21wb25lbnRzL3NjaGVkdWxlL3dpZGdldHMvYWN0aXZpdGllcy9hY3Rpdml0aWVzLnRtcGwuaHRtbFwiLFxyXG4gICAgICAgICAgICBzY29wZToge1xyXG4gICAgICAgICAgICAgICAgYWN0aXZpdGllczogXCI9XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24oJHNjb3BlLCAkZWxlbWVudCwgJGF0dHIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xyXG4gICAgfVxyXG5cclxuXHJcbn0pKCk7IiwiLy8gSW5jbHVkZSBpbiBpbmRleC5odG1sIHNvIHRoYXQgYXBwIGxldmVsIGV4Y2VwdGlvbnMgYXJlIGhhbmRsZWQuXHJcbi8vIFNob3VsZCBleGNsdWRlIGZyb20gdGVzdCBydW5uZXJcclxuKGZ1bmN0aW9uKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCd1dGlsaXRpZXMuZXhjZXB0aW9uJylcclxuICAgICAgICAucHJvdmlkZXIoJ2V4Y2VwdGlvbkhhbmRsZXInLCBleGNlcHRpb25IYW5kbGVyUHJvdmlkZXIpXHJcbiAgICAgICAgLmNvbmZpZyhjb25maWcpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTXVzdCBjb25maWd1cmUgdGhlIGV4Y2VwdGlvbiBoYW5kbGluZ1xyXG4gICAgICogQHJldHVybiB7W3R5cGVdfVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBleGNlcHRpb25IYW5kbGVyUHJvdmlkZXIoKSB7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSB7XHJcbiAgICAgICAgICAgIGFwcEVycm9yUHJlZml4OiB1bmRlZmluZWRcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmNvbmZpZ3VyZSA9IGZ1bmN0aW9uIChhcHBFcnJvclByZWZpeCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5hcHBFcnJvclByZWZpeCA9IGFwcEVycm9yUHJlZml4O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuJGdldCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge2NvbmZpZzogdGhpcy5jb25maWd9O1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25maWd1cmUgYnkgc2V0dGluZyBhbiBvcHRpb25hbCBzdHJpbmcgdmFsdWUgZm9yIGFwcEVycm9yUHJlZml4LlxyXG4gICAgICogQWNjZXNzaWJsZSB2aWEgY29uZmlnLmFwcEVycm9yUHJlZml4ICh2aWEgY29uZmlnIHZhbHVlKS5cclxuICAgICAqIEBwYXJhbSAge1t0eXBlXX0gJHByb3ZpZGVcclxuICAgICAqIEByZXR1cm4ge1t0eXBlXX1cclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBjb25maWcoJHByb3ZpZGUpIHtcclxuICAgICAgICAkcHJvdmlkZS5kZWNvcmF0b3IoJyRleGNlcHRpb25IYW5kbGVyJywgZXh0ZW5kRXhjZXB0aW9uSGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeHRlbmQgdGhlICRleGNlcHRpb25IYW5kbGVyIHNlcnZpY2UgdG8gYWxzbyBkaXNwbGF5IGEgdG9hc3QuXHJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9ICRkZWxlZ2F0ZVxyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBleGNlcHRpb25IYW5kbGVyXHJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGxvZ2dlclNlcnZpY2VcclxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSB0aGUgZGVjb3JhdGVkICRleGNlcHRpb25IYW5kbGVyIHNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZXh0ZW5kRXhjZXB0aW9uSGFuZGxlcigkZGVsZWdhdGUsIGV4Y2VwdGlvbkhhbmRsZXIsIGxvZ2dlclNlcnZpY2UpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oZXhjZXB0aW9uLCBjYXVzZSkge1xyXG4gICAgICAgICAgICB2YXIgYXBwRXJyb3JQcmVmaXggPSBleGNlcHRpb25IYW5kbGVyLmNvbmZpZy5hcHBFcnJvclByZWZpeCB8fCAnJztcclxuICAgICAgICAgICAgdmFyIGVycm9yRGF0YSA9IHtleGNlcHRpb246IGV4Y2VwdGlvbiwgY2F1c2U6IGNhdXNlfTtcclxuICAgICAgICAgICAgZXhjZXB0aW9uLm1lc3NhZ2UgPSBhcHBFcnJvclByZWZpeCArIGV4Y2VwdGlvbi5tZXNzYWdlO1xyXG4gICAgICAgICAgICAkZGVsZWdhdGUoZXhjZXB0aW9uLCBjYXVzZSk7XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBDb3VsZCBhZGQgdGhlIGVycm9yIHRvIGEgc2VydmljZSdzIGNvbGxlY3Rpb24sXHJcbiAgICAgICAgICAgICAqIGFkZCBlcnJvcnMgdG8gJHJvb3RTY29wZSwgbG9nIGVycm9ycyB0byByZW1vdGUgd2ViIHNlcnZlcixcclxuICAgICAgICAgICAgICogb3IgbG9nIGxvY2FsbHkuIE9yIHRocm93IGhhcmQuXHJcbiAgICAgICAgICAgICAqIHRocm93IGV4Y2VwdGlvbjtcclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgICAgICogICAgIHRocm93IHsgbWVzc2FnZTogJ2Vycm9yIG1lc3NhZ2Ugd2UgYWRkZWQnIH07XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBsb2dnZXJTZXJ2aWNlLmVycm9yKGV4Y2VwdGlvbi5tZXNzYWdlLCBlcnJvckRhdGEpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9