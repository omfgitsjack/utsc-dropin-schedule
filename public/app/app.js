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
            'utilities.router'
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
        .module('app.core')
        .constant('toastr', toastr);

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
        .factory('apiService', apiFactory);

    /**
     * Wrapper around $http that acts as the data provider
     * @param $http - http client
     * @param API_CONFIG - API constants
     * @returns {{get: get, post: post}} - get and post services
     * @ngInject
     */
    function apiFactory($http, API_CONFIG)
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
            return $http.get(API_CONFIG.BASE_ROUTE + '/' + route).then(
                function (payload) {
                    return payload.data;
                });
        }
    }
    apiFactory.$inject = ["$http", "API_CONFIG"];

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUuanMiLCJjb3JlL2NvcmUubW9kdWxlLmpzIiwicm91dGVzL2FwcC1yb3V0ZXMubW9kdWxlLmpzIiwidXRpbGl0aWVzL2FwaS9hcGkubW9kdWxlLmpzIiwidXRpbGl0aWVzL2V4Y2VwdGlvbi9leGNlcHRpb24ubW9kdWxlLmpzIiwidXRpbGl0aWVzL2xvZ2dlci9sb2dnZXIubW9kdWxlLmpzIiwidXRpbGl0aWVzL3JvdXRlci9yb3V0ZXIubW9kdWxlLmpzIiwiY29tcG9uZW50cy9zY2hlZHVsZS9kYXRhL3NjaGVkdWxlLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvbGF5b3V0L3NjaGVkdWxlLWxheW91dC5tb2R1bGUuanMiLCJjb21wb25lbnRzL3NjaGVkdWxlL3JvdXRlcy9zY2hlZHVsZS1yb3V0ZXMubW9kdWxlLmpzIiwiY29tcG9uZW50cy9zY2hlZHVsZS93aWRnZXRzL2FjdGl2aXRpZXMvYWN0aXZpdGllcy5tb2R1bGUuanMiLCJjb21wb25lbnRzL3NjaGVkdWxlL3dpZGdldHMvYWN0aXZpdHktc2Vzc2lvbnMvYWN0aXZpdHlzZXNzaW9ucy5tb2R1bGUuanMiLCJjb3JlL2NvcmUuY29uZmlnLmpzIiwicm91dGVzL2FwcC1yb3V0ZXMuY29uZmlnLmpzIiwiY29tcG9uZW50cy9zY2hlZHVsZS9yb3V0ZXMvc2NoZWR1bGUtcm91dGVzLmNvbmZpZy5qcyIsImNvcmUvY29yZS5jb25zdGFudC5qcyIsInV0aWxpdGllcy9hcGkvYXBpLmNvbnN0YW50LmpzIiwidXRpbGl0aWVzL2FwaS9hcGkucm91dGVzLmNvbnN0YW50LmpzIiwiY29tcG9uZW50cy9zY2hlZHVsZS9yb3V0ZXMvc2NoZWR1bGUtcm9vdC1yb3V0ZS5jb25zdGFudC5qcyIsImxheW91dC9zaGVsbC5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9zY2hlZHVsZS9sYXlvdXQvc2NoZWR1bGUtYmFzZS1sYXlvdXQuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvd2lkZ2V0cy9hY3Rpdml0aWVzL2FjdGl2aXRpZXMuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvd2lkZ2V0cy9hY3Rpdml0eS1zZXNzaW9ucy9hY3Rpdml0eXNlc3Npb25zLmNvbnRyb2xsZXIuanMiLCJ1dGlsaXRpZXMvYXBpL2FwaS5mYWN0b3J5LmpzIiwidXRpbGl0aWVzL2V4Y2VwdGlvbi9leGNlcHRpb24uZmFjdG9yeS5qcyIsInV0aWxpdGllcy9sb2dnZXIvbG9nZ2VyLmZhY3RvcnkuanMiLCJ1dGlsaXRpZXMvcm91dGVyL3JvdXRlci5mYWN0b3J5LmpzIiwiY29tcG9uZW50cy9zY2hlZHVsZS9kYXRhL3NjaGVkdWxlLmZhY3RvcnkuanMiLCJjb21wb25lbnRzL3NjaGVkdWxlL2xheW91dC9zY2hlZHVsZS1iYXNlLWxheW91dC5kYXRhLmZhY3RvcnkuanMiLCJjb21wb25lbnRzL3NjaGVkdWxlL3dpZGdldHMvYWN0aXZpdGllcy9hY3Rpdml0aWVzLmRhdGEuZmFjdG9yeS5qcyIsImNvbXBvbmVudHMvc2NoZWR1bGUvd2lkZ2V0cy9hY3Rpdml0aWVzL2FjdGl2aXRpZXMuZGlyZWN0aXZlLmpzIiwidXRpbGl0aWVzL2V4Y2VwdGlvbi9leGNlcHRpb24taGFuZGxlci5wcm92aWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxDQUFBLFlBQUE7SUFDQTs7Ozs7SUFLQSxRQUFBLE9BQUEsWUFBQTtRQUNBO1FBQ0E7Ozs7QUNSQSxDQUFBLFlBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUE7UUFDQTs7OztZQUlBOzs7O1lBSUE7WUFDQTtZQUNBO1lBQ0E7Ozs7Ozs7O0FDZkEsQ0FBQSxZQUFBO0lBQ0E7Ozs7O0lBS0EsUUFBQSxPQUFBLGNBQUE7UUFDQTtRQUNBOzs7O0FDUkEsQ0FBQSxVQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLGlCQUFBOzs7O0FDSEEsQ0FBQSxZQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBO1FBQ0E7WUFDQTs7OztBQ0xBLENBQUEsWUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQTtRQUNBOzs7QUNKQSxDQUFBLFlBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUE7UUFDQTtZQUNBOzs7Ozs7O0FDRkEsQ0FBQSxVQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLG9CQUFBO1FBQ0E7Ozs7QUNQQSxDQUFBLFlBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUE7UUFDQTs7O0FDSkEsQ0FBQSxZQUFBO0lBQ0E7Ozs7O0lBS0EsUUFBQSxPQUFBLHNCQUFBO1FBQ0E7UUFDQTtRQUNBOzs7O0FDVEEsQ0FBQSxVQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLHVCQUFBO1FBQ0E7Ozs7QUNKQSxDQUFBLFlBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsK0JBQUE7OztBQ0hBLENBQUEsWUFBQTtJQUNBOzs7OztJQUtBO1NBQ0EsT0FBQTtTQUNBLE9BQUE7U0FDQSxPQUFBO1NBQ0EsT0FBQTtTQUNBLElBQUE7Ozs7Ozs7SUFPQSxTQUFBLGFBQUEsUUFBQTtRQUNBLE9BQUEsUUFBQSxVQUFBO1FBQ0EsT0FBQSxRQUFBLGdCQUFBOzs7Ozs7Ozs7SUFRQSxTQUFBLGtCQUFBLGNBQUE7UUFDQSxJQUFBLGFBQUEsY0FBQTtZQUNBLGFBQUEsYUFBQTs7Ozs7Ozs7OztJQVNBLFNBQUEsK0JBQUEsMEJBQUE7UUFDQSx5QkFBQSxVQUFBOzs7Ozs7Ozs7SUFRQSxTQUFBLG1CQUFBLGVBQUE7Ozs7Ozs7O0FDaERBLENBQUEsWUFBQTtJQUNBOzs7OztJQUtBO1NBQ0EsT0FBQTtTQUNBLE9BQUE7Ozs7Ozs7OztJQVNBLFNBQUEsWUFBQSxnQkFBQTtJQUNBOztRQUVBLG9CQUFBLFlBQUE7O1FBRUE7OzthQUdBLE1BQUE7Ozs7QUN6QkEsQ0FBQSxZQUFBO0lBQ0E7Ozs7O0lBS0E7U0FDQSxPQUFBO1NBQ0EsT0FBQTs7Ozs7Ozs7O0lBU0EsU0FBQSxvQkFBQSxnQkFBQTtJQUNBOztRQUVBLElBQUEsU0FBQSxvQkFBQTs7UUFFQTs7YUFFQSxNQUFBO2dCQUNBLE1BQUE7Z0JBQ0EsUUFBQTtnQkFDQSxLQUFBO2dCQUNBLGFBQUE7Z0JBQ0EsWUFBQTtnQkFDQSxjQUFBO2dCQUNBLFNBQUE7b0JBQ0EsYUFBQTs7Ozs7O1FBTUEsU0FBQSw4QkFBQSwrQkFBQTtZQUNBLE9BQUEsOEJBQUE7Ozs7OztBQ3ZDQSxDQUFBLFlBQUE7SUFDQTs7SUFFQTtTQUNBLE9BQUE7U0FDQSxTQUFBLFVBQUE7OztBQ0xBLENBQUEsWUFBQTtJQUNBOzs7OztJQUtBLFFBQUEsT0FBQTtTQUNBLFNBQUE7UUFDQTtZQUNBLFlBQUE7Ozs7QUNUQSxDQUFBLFdBQUE7SUFDQTs7Ozs7SUFLQSxRQUFBLE9BQUE7U0FDQSxTQUFBO1FBQ0E7WUFDQSxTQUFBOzs7O0FDVEEsQ0FBQSxZQUFBO0lBQ0E7Ozs7O0lBS0EsUUFBQSxPQUFBO1NBQ0EsU0FBQTtRQUNBO1lBQ0EsVUFBQTtZQUNBLE1BQUE7WUFDQSxLQUFBO1lBQ0EsVUFBQTs7O0FDWkEsQ0FBQSxZQUFBO0lBQ0E7Ozs7O0FDREEsQ0FBQSxZQUFBO0lBQ0E7O0lBRUE7U0FDQSxPQUFBO1NBQ0EsV0FBQSxvQkFBQTs7O0lBR0EsU0FBQSx1QkFBQTtJQUNBO1FBQ0EsSUFBQSxLQUFBO1FBQ0EsS0FBQSxjQUFBOztRQUVBOztRQUVBLFNBQUEsV0FBQTtZQUNBLEdBQUEsYUFBQSxZQUFBOzs7Ozs7QUNoQkEsQ0FBQSxVQUFBO0lBQ0E7O0lBRUE7U0FDQSxPQUFBO1NBQ0EsV0FBQSxnQkFBQTs7Ozs7Ozs7O0lBU0EsU0FBQSxlQUFBOztRQUVBLElBQUEsS0FBQTs7UUFFQTs7OztRQUlBLFNBQUE7UUFDQTtZQUNBLEdBQUEsYUFBQSxDQUFBLENBQUEsV0FBQTs7Ozs7Ozs7SUFRQSxhQUFBLFVBQUE7UUFDQSxZQUFBOzs7O0lBSUEsU0FBQSxXQUFBLGlCQUFBO1FBQ0EsT0FBQSxnQkFBQTs7Ozs7QUN0Q0EsQ0FBQSxZQUFBO0lBQ0E7O0lBRUE7U0FDQSxPQUFBO1NBQ0EsV0FBQSx1QkFBQTs7Ozs7O0lBTUEsb0JBQUEsVUFBQSxDQUFBLFNBQUE7Ozs7Ozs7SUFPQSxTQUFBLG9CQUFBO0lBQ0E7O1FBRUEsU0FBQTtRQUNBO1lBQ0EsT0FBQSxtQkFBQTs7O1FBR0E7Ozs7O0FDMUJBLENBQUEsWUFBQTtJQUNBOztJQUVBO1NBQ0EsT0FBQTtTQUNBLFFBQUEsY0FBQTs7Ozs7Ozs7O0lBU0EsU0FBQSxXQUFBLE9BQUE7SUFDQTtRQUNBLE9BQUE7WUFDQSxLQUFBO1lBQ0EsTUFBQTs7Ozs7Ozs7UUFRQSxTQUFBLEtBQUEsT0FBQSxPQUFBO1lBQ0EsSUFBQSxDQUFBLE9BQUE7Z0JBQ0EsUUFBQTs7O1lBR0EsTUFBQSxLQUFBLFdBQUEsYUFBQSxNQUFBLE9BQUE7Ozs7Ozs7O1FBUUEsU0FBQSxJQUFBLE9BQUE7WUFDQSxPQUFBLE1BQUEsSUFBQSxXQUFBLGFBQUEsTUFBQSxPQUFBO2dCQUNBLFVBQUEsU0FBQTtvQkFDQSxPQUFBLFFBQUE7Ozs7Ozs7QUMxQ0EsQ0FBQSxZQUFBO0lBQ0E7O0lBRUE7U0FDQSxPQUFBO1NBQ0EsUUFBQSxvQkFBQTs7O0lBR0EsU0FBQSxpQkFBQSxlQUFBO1FBQ0EsSUFBQSxVQUFBO1lBQ0EsU0FBQTs7O1FBR0EsT0FBQTs7Ozs7OztRQU9BLFNBQUEsUUFBQSxTQUFBO1lBQ0EsT0FBQSxTQUFBLFFBQUE7Z0JBQ0EsY0FBQSxNQUFBLFNBQUE7Ozs7OztBQ3RCQSxDQUFBLFlBQUE7SUFDQTs7Ozs7SUFLQTtTQUNBLE9BQUE7U0FDQSxRQUFBLGlCQUFBOzs7Ozs7OztJQVFBLFNBQUEsY0FBQSxNQUFBLFFBQUE7UUFDQSxJQUFBLFVBQUE7WUFDQSxZQUFBOztZQUVBLE9BQUE7WUFDQSxNQUFBO1lBQ0EsU0FBQTtZQUNBLFNBQUE7O1lBRUEsS0FBQSxLQUFBOzs7UUFHQSxPQUFBOzs7Ozs7OztRQVFBLFNBQUEsTUFBQSxTQUFBLE1BQUEsT0FBQTtZQUNBLE9BQUEsTUFBQSxTQUFBO1lBQ0EsS0FBQSxNQUFBLFlBQUEsU0FBQTs7Ozs7Ozs7O1FBU0EsU0FBQSxLQUFBLFNBQUEsTUFBQSxPQUFBO1lBQ0EsT0FBQSxLQUFBLFNBQUE7WUFDQSxLQUFBLEtBQUEsV0FBQSxTQUFBOzs7Ozs7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OztJQUVBLFNBQUE7SUFDQTtRQUNBLElBQUEsWUFBQTtZQUNBLFVBQUE7WUFDQSxhQUFBO1lBQ0EsT0FBQTtnQkFDQSxZQUFBOztZQUVBLE1BQUEsU0FBQSxRQUFBLFVBQUEsT0FBQTtnQkFDQSxRQUFBLElBQUE7Ozs7UUFJQSxPQUFBOzs7Ozs7O0FDbEJBLENBQUEsV0FBQTtJQUNBOztJQUVBO1NBQ0EsT0FBQTtTQUNBLFNBQUEsb0JBQUE7U0FDQSxPQUFBOzs7Ozs7SUFNQSxTQUFBLDJCQUFBO1FBQ0EsS0FBQSxTQUFBO1lBQ0EsZ0JBQUE7OztRQUdBLEtBQUEsWUFBQSxVQUFBLGdCQUFBO1lBQ0EsS0FBQSxPQUFBLGlCQUFBOzs7UUFHQSxLQUFBLE9BQUEsV0FBQTtZQUNBLE9BQUEsQ0FBQSxRQUFBLEtBQUE7Ozs7Ozs7Ozs7O0lBV0EsU0FBQSxPQUFBLFVBQUE7UUFDQSxTQUFBLFVBQUEscUJBQUE7Ozs7Ozs7Ozs7O0lBVUEsU0FBQSx1QkFBQSxXQUFBLGtCQUFBLGVBQUE7UUFDQSxPQUFBLFNBQUEsV0FBQSxPQUFBO1lBQ0EsSUFBQSxpQkFBQSxpQkFBQSxPQUFBLGtCQUFBO1lBQ0EsSUFBQSxZQUFBLENBQUEsV0FBQSxXQUFBLE9BQUE7WUFDQSxVQUFBLFVBQUEsaUJBQUEsVUFBQTtZQUNBLFVBQUEsV0FBQTs7Ozs7Ozs7OztZQVVBLGNBQUEsTUFBQSxVQUFBLFNBQUE7Ozs7S0FHQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYWluIEFwcGxpY2F0aW9uIE1vZHVsZVxyXG4gICAgICovXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLm1haW4nLCBbXHJcbiAgICAgICAgJ2FwcC5yb3V0ZXMnLFxyXG4gICAgICAgICdhcHAuY29yZSdcclxuICAgIF0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb3JlJyxcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAqIEFuZ3VsYXIgbW9kdWxlc1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgJ25nTWF0ZXJpYWwnLFxyXG4gICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgKiBPdXIgcmV1c2FibGUgY3Jvc3MgYXBwIGNvZGUgbW9kdWxlc1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgJ3V0aWxpdGllcy5hcGknLFxyXG4gICAgICAgICAgICAndXRpbGl0aWVzLmV4Y2VwdGlvbicsXHJcbiAgICAgICAgICAgICd1dGlsaXRpZXMubG9nZ2VyJyxcclxuICAgICAgICAgICAgJ3V0aWxpdGllcy5yb3V0ZXInXHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAqIDNyZCBQYXJ0eSBtb2R1bGVzXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgIF0pO1xyXG5cclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXBwbGljYXRpb24gcm91dGVzXHJcbiAgICAgKi9cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAucm91dGVzJywgW1xyXG4gICAgICAgICdqcC5zY2hlZHVsZS5yb3V0ZXMnLFxyXG4gICAgICAgICd1dGlsaXRpZXMucm91dGVyJ1xyXG4gICAgXSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpe1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ3V0aWxpdGllcy5hcGknLCBbXSk7XHJcblxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ3V0aWxpdGllcy5leGNlcHRpb24nLFxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgJ3V0aWxpdGllcy5sb2dnZXInXHJcbiAgICAgICAgXSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgndXRpbGl0aWVzLmxvZ2dlcicsXHJcbiAgICAgICAgW10pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ3V0aWxpdGllcy5yb3V0ZXInLFxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgJ3VpLnJvdXRlcidcclxuICAgICAgICBdKTtcclxuXHJcbn0pKCk7IiwiLyoqXHJcbiAqXHJcbiAqL1xyXG4oZnVuY3Rpb24oKXtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdqcC5zY2hlZHVsZS5kYXRhJywgW1xyXG4gICAgICAgICdhcHAuY29yZSdcclxuICAgIF0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2pwLnNjaGVkdWxlLmxheW91dHMnLFxyXG4gICAgICAgIFtdKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2NoZWR1bGUgUm91dGluZyBtb2R1bGVcclxuICAgICAqL1xyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2pwLnNjaGVkdWxlLnJvdXRlcycsIFtcclxuICAgICAgICAndWkucm91dGVyJyxcclxuICAgICAgICAnanAuc2NoZWR1bGUud2lkZ2V0cycsXHJcbiAgICAgICAgJ2pwLnNjaGVkdWxlLmxheW91dHMnXHJcbiAgICBdKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnanAuc2NoZWR1bGUud2lkZ2V0cycsIFtcclxuICAgICAgICAnanAuc2NoZWR1bGUuZGF0YSdcclxuICAgIF0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5wbGFjZXMuYWN0aXZpdHlzZXNzaW9ucycsIFtdKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29yZSBtb2R1bGUgY29uZmlndXJhdGlvblxyXG4gICAgICovXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwLmNvcmUnKVxyXG4gICAgICAgIC5jb25maWcodG9hc3RyQ29uZmlnKVxyXG4gICAgICAgIC5jb25maWcobG9nUHJvdmlkZXJDb25maWcpXHJcbiAgICAgICAgLmNvbmZpZyhleGNlcHRpb25IYW5kbGVyUHJvdmlkZXJDb25maWcpXHJcbiAgICAgICAgLnJ1bihpbml0Q29yZUNvbXBvbmVudHMpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVG9hc3RyIENvbmZpZ3VyYXRpb25cclxuICAgICAqIEBwYXJhbSB0b2FzdHJcclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiB0b2FzdHJDb25maWcodG9hc3RyKSB7XHJcbiAgICAgICAgdG9hc3RyLm9wdGlvbnMudGltZU91dCA9IDQwMDA7XHJcbiAgICAgICAgdG9hc3RyLm9wdGlvbnMucG9zaXRpb25DbGFzcyA9ICd0b2FzdC1ib3R0b20tcmlnaHQnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9nIFByb3ZpZGVyIENvbmZpZ3VyYXRpb25cclxuICAgICAqIEBwYXJhbSAkbG9nUHJvdmlkZXJcclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBsb2dQcm92aWRlckNvbmZpZygkbG9nUHJvdmlkZXIpIHtcclxuICAgICAgICBpZiAoJGxvZ1Byb3ZpZGVyLmRlYnVnRW5hYmxlZCkge1xyXG4gICAgICAgICAgICAkbG9nUHJvdmlkZXIuZGVidWdFbmFibGVkKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEV4Y2VwdGlvbiBIYW5kbGVyIFByb3ZpZGVyIGNvbmZpZ3VyYXRpb25cclxuICAgICAqIEBwYXJhbSBleGNlcHRpb25IYW5kbGVyUHJvdmlkZXJcclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBleGNlcHRpb25IYW5kbGVyUHJvdmlkZXJDb25maWcoZXhjZXB0aW9uSGFuZGxlclByb3ZpZGVyKSB7XHJcbiAgICAgICAgZXhjZXB0aW9uSGFuZGxlclByb3ZpZGVyLmNvbmZpZ3VyZSgnW05HLUpQIEVycm9yXSAnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWx6aWUgY29yZSBjb21wb25lbnRzXHJcbiAgICAgKiBAcGFyYW0gcm91dGVyU2VydmljZVxyXG4gICAgICogQG5nSW5qZWN0XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGluaXRDb3JlQ29tcG9uZW50cyhyb3V0ZXJTZXJ2aWNlKSB7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFwcCByb3V0ZSBjb25maWd1cmF0aW9uXHJcbiAgICAgKi9cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAucm91dGVzJylcclxuICAgICAgICAuY29uZmlnKHJvdXRlQ29uZmlnKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFVJLVJvdXRlciBzdGF0ZSBjb25maWd1cmF0aW9uLlxyXG4gICAgICogRmVhdHVyZSByb290IChhYnN0cmFjdCkgcm91dGVzIGFyZSBhbHNvIGluY2x1ZGVkLlxyXG4gICAgICogQHBhcmFtICRzdGF0ZVByb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0gU0NIRURVTEVfUk9PVF9ST1VURSBOb3RlIHRoYXQgdGhpcyBpcyBwYXJlbnRsZXNzLlxyXG4gICAgICogQG5nSW5qZWN0XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHJvdXRlQ29uZmlnKCRzdGF0ZVByb3ZpZGVyLCBTQ0hFRFVMRV9ST09UX1JPVVRFKVxyXG4gICAge1xyXG4gICAgICAgIC8vIERlZmluZSBSb290IFBhcmVudHNcclxuICAgICAgICBTQ0hFRFVMRV9ST09UX1JPVVRFWydwYXJlbnQnXSA9ICcnO1xyXG5cclxuICAgICAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgICAgICAgICAvLyBMb2NhbCBSb3V0ZXNcclxuICAgICAgICAgICAgLy8gRmVhdHVyZSBSb3V0ZXNcclxuICAgICAgICAgICAgLnN0YXRlKFNDSEVEVUxFX1JPT1RfUk9VVEUpO1xyXG4gICAgfVxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNjaGVkdWxlIHJvdXRlIGNvbmZpZ3VyYXRpb25cclxuICAgICAqL1xyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2pwLnNjaGVkdWxlLnJvdXRlcycpXHJcbiAgICAgICAgLmNvbmZpZyhzY2hlZHVsZVJvdXRlQ29uZmlnKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJvdXRlIGNvbmZpZ3VyYXRpb24sXHJcbiAgICAgKiB1c2VzIFNDSEVEVUxFX1JPT1RfUk9VVEUgYXMgYWJzdHJhY3QgcGFyZW50IHN0YXRlXHJcbiAgICAgKiBAcGFyYW0gJHN0YXRlUHJvdmlkZXJcclxuICAgICAqIEBwYXJhbSBTQ0hFRFVMRV9ST09UX1JPVVRFXHJcbiAgICAgKiBAbmdJbmplY3RcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gc2NoZWR1bGVSb3V0ZUNvbmZpZygkc3RhdGVQcm92aWRlciwgU0NIRURVTEVfUk9PVF9ST1VURSlcclxuICAgIHtcclxuICAgICAgICAvLyBQYXJlbnQgU3RhdGUncyBuYW1lIHRvIGJlIGluY2x1ZGVkIGluIGV2ZXJ5IHN0YXRlXHJcbiAgICAgICAgdmFyIHBhcmVudCA9IFNDSEVEVUxFX1JPT1RfUk9VVEUubmFtZTtcclxuXHJcbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgLy8gTG9jYWwgcm91dGVzXHJcbiAgICAgICAgICAgIC5zdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnYWN0aXZpdGllcycsXHJcbiAgICAgICAgICAgICAgICBwYXJlbnQ6IHBhcmVudCxcclxuICAgICAgICAgICAgICAgIHVybDogJy8nLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwL2NvbXBvbmVudHMvc2NoZWR1bGUvbGF5b3V0L3NjaGVkdWxlLWJhc2UtbGF5b3V0Lmh0bWxcIixcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6IFwiU2NoZWR1bGVCYXNlQ3RybFwiLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlckFzOiBcInZtXCIsXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVNlcnZpY2U6IHNjaGVkdWxlQmFzZUxheW91dERhdGFTZXJ2aWNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBSb3V0ZSBSZXNvbHZlc1xyXG4gICAgICAgIC8qIEBuZ0luamVjdCAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHNjaGVkdWxlQmFzZUxheW91dERhdGFTZXJ2aWNlKHNjaGVkdWxlQmFzZUxheW91dERhdGFTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzY2hlZHVsZUJhc2VMYXlvdXREYXRhU2VydmljZS5sb2FkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwLmNvcmUnKVxyXG4gICAgICAgIC5jb25zdGFudCgndG9hc3RyJywgdG9hc3RyKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQVBJIChub24tcm91dGUpIGNvbnN0YW50c1xyXG4gICAgICovXHJcbiAgICBhbmd1bGFyLm1vZHVsZShcInV0aWxpdGllcy5hcGlcIilcclxuICAgICAgICAuY29uc3RhbnQoJ0FQSV9DT05GSUcnLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQkFTRV9ST1VURTogJ2FwaSdcclxuICAgICAgICB9KTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBUEkgUmVzb3VyY2VzIGNvbnN0YW50c1xyXG4gICAgICovXHJcbiAgICBhbmd1bGFyLm1vZHVsZShcInV0aWxpdGllcy5hcGlcIilcclxuICAgICAgICAuY29uc3RhbnQoJ0FQSV9ST1VURVNfQ09ORklHJyxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERST1BJTlM6ICdkcm9waW5zJ1xyXG4gICAgICAgIH0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTY2hlZHVsZSdzIGFic3RyYWN0IHJvb3Qgcm91dGVcclxuICAgICAqL1xyXG4gICAgYW5ndWxhci5tb2R1bGUoXCJqcC5zY2hlZHVsZS5yb3V0ZXNcIilcclxuICAgICAgICAuY29uc3RhbnQoJ1NDSEVEVUxFX1JPT1RfUk9VVEUnLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYWJzdHJhY3Q6IHRydWUsXHJcbiAgICAgICAgICAgIG5hbWU6ICdzY2hlZHVsZScsXHJcbiAgICAgICAgICAgIHVybDogJy9zY2hlZHVsZScsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiBcIjxkaXYgdWktdmlldz48L2Rpdj5cIlxyXG4gICAgICAgIH0pO1xyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcblxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2pwLnNjaGVkdWxlLmxheW91dHMnKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCdTY2hlZHVsZUJhc2VDdHJsJywgU2NoZWR1bGVCYXNlQ29udHJvbGxlcik7XHJcblxyXG4gICAgLyogQG5nSW5qZWN0ICovXHJcbiAgICBmdW5jdGlvbiBTY2hlZHVsZUJhc2VDb250cm9sbGVyKGRhdGFTZXJ2aWNlKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB2bSA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZSA9IGRhdGFTZXJ2aWNlO1xyXG5cclxuICAgICAgICBhY3RpdmF0ZSgpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcclxuICAgICAgICAgICAgdm0uYWN0aXZpdGllcyA9IGRhdGFTZXJ2aWNlLmRyb3BpbkFjdGl2aXRpZXM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKXtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdqcC5zY2hlZHVsZS53aWRnZXRzJylcclxuICAgICAgICAuY29udHJvbGxlcignQWN0aXZpdHlDdHJsJywgQWN0aXZpdHlDdHJsKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFjdGl2aXR5IENvbnRyb2xsZXJcclxuICAgICAqIEBwYXJhbSAkc2NvcGUgLSBTY29wZVxyXG4gICAgICogQHBhcmFtIGRhdGFTZXJ2aWNlIC0gZGF0YSBzZXJ2aWNlXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBBY3Rpdml0eUN0cmwoKSB7XHJcblxyXG4gICAgICAgIHZhciB2bSA9IHRoaXM7XHJcblxyXG4gICAgICAgIGFjdGl2YXRlKCk7XHJcblxyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWN0aXZhdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdm0uYWN0aXZpdGllcyA9IFt7YWN0aXZpdGllczonaGloaSd9XTsvL2RhdGFTZXJ2aWNlLmRyb3BpbkFjdGl2aXRpZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFjdGl2aXR5IENvbnRyb2xsZXIgZGVwZW5kZW5jaWVzXHJcbiAgICAgKi9cclxuICAgIEFjdGl2aXR5Q3RybC5yZXNvbHZlID0ge1xyXG4gICAgICAgIGFjdGl2aXRpZXM6IGFjdGl2aXRpZXNcclxuICAgIH07XHJcblxyXG4gICAgLyogQG5nSW5qZWN0ICovXHJcbiAgICBmdW5jdGlvbiBhY3Rpdml0aWVzKHNjaGVkdWxlU2VydmljZSkge1xyXG4gICAgICAgIHJldHVybiBzY2hlZHVsZVNlcnZpY2UuZ2V0RHJvcGlucygpO1xyXG4gICAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcC5wbGFjZXMuYWN0aXZpdHlzZXNzaW9ucycpXHJcbiAgICAgICAgLmNvbnRyb2xsZXIoJ0FjdGl2aXR5U2Vzc2lvbkN0cmwnLCBBY3Rpdml0eVNlc3Npb25DdHJsKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlcGVuZGVuY3kgSW5qZWN0aW9uXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nW119XHJcbiAgICAgKi9cclxuICAgIEFjdGl2aXR5U2Vzc2lvbkN0cmwuJGluamVjdCA9IFsnJHNjb3BlJywnYWN0aXZpdHlTZXNzaW9ucyddO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWN0aXZpdHkgU2Vzc2lvbiBDb250cm9sbGVyXHJcbiAgICAgKiBAcGFyYW0gJHNjb3BlXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gQWN0aXZpdHlTZXNzaW9uQ3RybCgkc2NvcGUpXHJcbiAgICB7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGluaXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgJHNjb3BlLmFjdGl2aXR5U2Vzc2lvbnMgPSBhY3Rpdml0eVNlc3Npb25zO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCd1dGlsaXRpZXMuYXBpJylcclxuICAgICAgICAuZmFjdG9yeSgnYXBpU2VydmljZScsIGFwaUZhY3RvcnkpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV3JhcHBlciBhcm91bmQgJGh0dHAgdGhhdCBhY3RzIGFzIHRoZSBkYXRhIHByb3ZpZGVyXHJcbiAgICAgKiBAcGFyYW0gJGh0dHAgLSBodHRwIGNsaWVudFxyXG4gICAgICogQHBhcmFtIEFQSV9DT05GSUcgLSBBUEkgY29uc3RhbnRzXHJcbiAgICAgKiBAcmV0dXJucyB7e2dldDogZ2V0LCBwb3N0OiBwb3N0fX0gLSBnZXQgYW5kIHBvc3Qgc2VydmljZXNcclxuICAgICAqIEBuZ0luamVjdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBhcGlGYWN0b3J5KCRodHRwLCBBUElfQ09ORklHKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGdldDogZ2V0LFxyXG4gICAgICAgICAgICBwb3N0OiBwb3N0XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGFrZXMgYW55IGlucHV0IGFuZCBjYWxscyBhIEhUVFAgUE9TVCBvbiB0aGUgZ2l2ZW4gcm91dGVcclxuICAgICAgICAgKiBAcGFyYW0gcm91dGUgLSBSb3V0ZSBmb3IgcG9zdGluZ1xyXG4gICAgICAgICAqIEBwYXJhbSBpbnB1dCAtIFBheWxvYWRcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBwb3N0KHJvdXRlLCBpbnB1dCkge1xyXG4gICAgICAgICAgICBpZiAoIWlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dCA9IHt9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkaHR0cC5wb3N0KEFQSV9DT05GSUcuQkFTRV9ST1VURSArICcvJyArIHJvdXRlLCBpbnB1dCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDYWxscyBhIEhUVFAgR0VUIG9uIHRoZSBnaXZlbiByb3V0ZVxyXG4gICAgICAgICAqIEBwYXJhbSByb3V0ZSAtIFJvdXRlIHRvIGdldFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtuZy5JUHJvbWlzZTxUUmVzdWx0PnwqfSAtIFByb21pc2Ugb2YgcmVzdWx0c1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldChyb3V0ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KEFQSV9DT05GSUcuQkFTRV9ST1VURSArICcvJyArIHJvdXRlKS50aGVuKFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKHBheWxvYWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGF5bG9hZC5kYXRhO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3V0aWxpdGllcy5leGNlcHRpb24nKVxyXG4gICAgICAgIC5mYWN0b3J5KCdleGNlcHRpb25TZXJ2aWNlJywgZXhjZXB0aW9uRmFjdG9yeSk7XHJcblxyXG4gICAgLyogQG5nSW5qZWN0ICovXHJcbiAgICBmdW5jdGlvbiBleGNlcHRpb25GYWN0b3J5KGxvZ2dlclNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgc2VydmljZSA9IHtcclxuICAgICAgICAgICAgY2F0Y2hlcjogY2F0Y2hlclxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDYXRjaGVzIGV4Y2VwdGlvbnMsIGxvZ3MgcmVhc29uIGludG8gY29uc29sZS5cclxuICAgICAgICAgKiBAcGFyYW0gbWVzc2FnZVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBjYXRjaGVyKG1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHJlYXNvbikge1xyXG4gICAgICAgICAgICAgICAgbG9nZ2VyU2VydmljZS5lcnJvcihtZXNzYWdlLCByZWFzb24pO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXcmFwcGVyIGFyb3VuZCB0b2FzdHJcclxuICAgICAqL1xyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3V0aWxpdGllcy5sb2dnZXInKVxyXG4gICAgICAgIC5mYWN0b3J5KCdsb2dnZXJTZXJ2aWNlJywgbG9nZ2VyRmFjdG9yeSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWFscyB3aXRoIHJldmVhbGluZyAmIGxvZ2dpbmcuXHJcbiAgICAgKiBAcmV0dXJucyB7XHJcbiAgICAgKiB7c2hvd1RvYXN0czogYm9vbGVhbiwgZXJyb3I6IGVycm9yLCBpbmZvOiBpbmZvLCBzdWNjZXNzOiBzdWNjZXNzLCB3YXJuaW5nOiB3YXJuaW5nLCBsb2c6ICgkbG9nLmxvZ3wqKX19XHJcbiAgICAgKiBAbmdJbmplY3RcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gbG9nZ2VyRmFjdG9yeSgkbG9nLCB0b2FzdHIpIHtcclxuICAgICAgICB2YXIgc2VydmljZSA9IHtcclxuICAgICAgICAgICAgc2hvd1RvYXN0czogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIGVycm9yOiBlcnJvcixcclxuICAgICAgICAgICAgaW5mbzogaW5mbyxcclxuICAgICAgICAgICAgc3VjY2Vzczogc3VjY2VzcyxcclxuICAgICAgICAgICAgd2FybmluZzogd2FybmluZyxcclxuXHJcbiAgICAgICAgICAgIGxvZzogJGxvZy5sb2dcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gc2VydmljZTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVkIGVycm9yIHRvYXN0IHdpdGggYSBjcm9zc1xyXG4gICAgICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgICAgICogQHBhcmFtIGRhdGFcclxuICAgICAgICAgKiBAcGFyYW0gdGl0bGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBlcnJvcihtZXNzYWdlLCBkYXRhLCB0aXRsZSkge1xyXG4gICAgICAgICAgICB0b2FzdHIuZXJyb3IobWVzc2FnZSwgdGl0bGUpO1xyXG4gICAgICAgICAgICAkbG9nLmVycm9yKCdFcnJvcjogJyArIG1lc3NhZ2UsIGRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTGlnaHQgYmx1ZSB0b2FzdCB3aXRoIGV4Y2xhbWF0aW9uIG1hcmtcclxuICAgICAgICAgKiBAcGFyYW0gbWVzc2FnZVxyXG4gICAgICAgICAqIEBwYXJhbSBkYXRhXHJcbiAgICAgICAgICogQHBhcmFtIHRpdGxlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gaW5mbyhtZXNzYWdlLCBkYXRhLCB0aXRsZSkge1xyXG4gICAgICAgICAgICB0b2FzdHIuaW5mbyhtZXNzYWdlLCB0aXRsZSk7XHJcbiAgICAgICAgICAgICRsb2cuaW5mbygnSW5mbzogJyArIG1lc3NhZ2UsIGRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR3JlZW4gdG9hc3Qgd2l0aCB0aWNrXHJcbiAgICAgICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAgICAgKiBAcGFyYW0gZGF0YVxyXG4gICAgICAgICAqIEBwYXJhbSB0aXRsZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHN1Y2Nlc3MobWVzc2FnZSwgZGF0YSwgdGl0bGUpIHtcclxuICAgICAgICAgICAgdG9hc3RyLnN1Y2Nlc3MobWVzc2FnZSwgdGl0bGUpO1xyXG4gICAgICAgICAgICAkbG9nLmluZm8oJ1N1Y2Nlc3M6ICcgKyBtZXNzYWdlLCBkYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlZCB0b2FzdCB3aXRoIENyb3NzXHJcbiAgICAgICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAgICAgKiBAcGFyYW0gZGF0YVxyXG4gICAgICAgICAqIEBwYXJhbSB0aXRsZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHdhcm5pbmcobWVzc2FnZSwgZGF0YSwgdGl0bGUpIHtcclxuICAgICAgICAgICAgdG9hc3RyLndhcm5pbmcobWVzc2FnZSwgdGl0bGUpO1xyXG4gICAgICAgICAgICAkbG9nLndhcm4oJ1dhcm5pbmc6ICcgKyBtZXNzYWdlLCBkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCd1dGlsaXRpZXMucm91dGVyJylcclxuICAgICAgICAuZmFjdG9yeSgncm91dGVyU2VydmljZScsIHJvdXRlclNlcnZpY2UpO1xyXG5cclxuICAgIC8qIEBuZ0luamVjdCAqL1xyXG4gICAgZnVuY3Rpb24gcm91dGVyU2VydmljZSgkc3RhdGUsICRyb290U2NvcGUsIGxvZ2dlclNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgaGFuZGxpbmdSb3V0ZUNoYW5nZUVycm9yID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIHJvdXRlQ291bnRzID0ge1xyXG4gICAgICAgICAgICBlcnJvcnM6IDAsXHJcbiAgICAgICAgICAgIGNoYW5nZXM6IDBcclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciByb3V0ZXMgPSBbXTtcclxuICAgICAgICB2YXIgZ29EZWZhdWx0U3RhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygkc3RhdGUuJGN1cnJlbnQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZ29EZWZhdWx0U3RhdGU6IGdvRGVmYXVsdFN0YXRlXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICAgICAgaGFuZGxlUm91dGVFcnJvcnMoKTtcclxuICAgICAgICAgICAgaGFuZGxlUm91dGVTdWNjZXNzZXMoKTtcclxuICAgICAgICAgICAgaGFuZGxlUm91dGVOb3RGb3VuZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlUm91dGVOb3RGb3VuZCgpIHtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZU5vdEZvdW5kJyxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChldmVudCwgdW5mb3VuZFN0YXRlLCBmcm9tU3RhdGUsIGZyb21QYXJhbXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaGFuZGxpbmdSb3V0ZUNoYW5nZUVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcm91dGVDb3VudHMuZXJyb3JzKys7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxpbmdSb3V0ZUNoYW5nZUVycm9yID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTG9nIFN0YXRlIG5vdCBmb3VuZFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtc2cgPSAnW1N0YXRlIG5vdCBmb3VuZF0gRXJyb3Igcm91dGluZyB0byAnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdW5mb3VuZFN0YXRlLnRvICsgJyBmcm9tICcgKyBmcm9tU3RhdGUucGFyZW50ICsgJy4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJvbVN0YXRlLm5hbWUgKyAnLic7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyU2VydmljZS53YXJuaW5nKG1zZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ29EZWZhdWx0U3RhdGUoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlUm91dGVTdWNjZXNzZXMoKSB7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdWNjZXNzJyxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICByb3V0ZUNvdW50cy5jaGFuZ2VzKys7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxpbmdSb3V0ZUNoYW5nZUVycm9yID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZVJvdXRlRXJyb3JzKCkge1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlRXJyb3InLFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKGV2ZW50LCB0b1N0YXRlLCB0b1BhcmFtcywgZnJvbVN0YXRlLCBmcm9tUGFyYW1zLCBlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChoYW5kbGluZ1JvdXRlQ2hhbmdlRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByb3V0ZUNvdW50cy5lcnJvcnMrKztcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGluZ1JvdXRlQ2hhbmdlRXJyb3IgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBMb2cgU3RhdGUgcm91dGluZyBlcnJvclxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtc2cgPSAnW1N0YXRlIFJvdXRpbmcgRXJyb3JdICcgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnRXJyb3Igcm91dGluZyB0byAnICsgdG9TdGF0ZSArICcgZnJvbSAnICsgZnJvbVN0YXRlICsgJy4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJyBFcnJvcjogJyArIGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlclNlcnZpY2Uud2FybmluZyhtc2csIFtlcnJvcl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGdvRGVmYXVsdFN0YXRlKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnanAuc2NoZWR1bGUuZGF0YScpXHJcbiAgICAgICAgLmZhY3RvcnkoJ3NjaGVkdWxlU2VydmljZScsIHNjaGVkdWxlRmFjdG9yeSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcm92aWRlcyBhY3Rpdml0aWVzIGFuZCB0aGVpciBhY3Rpdml0eSBzZXNzaW9uc1xyXG4gICAgICogQHBhcmFtIGFwaVNlcnZpY2VcclxuICAgICAqIEBwYXJhbSBBUElfUk9VVEVTX0NPTkZJR1xyXG4gICAgICogQHBhcmFtIGV4Y2VwdGlvblNlcnZpY2VcclxuICAgICAqIEByZXR1cm5zIHt7Z2V0RHJvcGluczogZ2V0RHJvcGlucywgZ2V0QWN0aXZpdHlTZXNzaW9uczogZ2V0QWN0aXZpdHlTZXNzaW9uc319XHJcbiAgICAgKiBAbmdJbmplY3RcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gc2NoZWR1bGVGYWN0b3J5KGFwaVNlcnZpY2UsIEFQSV9ST1VURVNfQ09ORklHLCBleGNlcHRpb25TZXJ2aWNlKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGdldERyb3BpbnM6IGdldERyb3BpbnMsXHJcbiAgICAgICAgICAgIGdldEFjdGl2aXR5U2Vzc2lvbnM6IGdldEFjdGl2aXR5U2Vzc2lvbnNcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXRyaWV2ZXMgYWxsIGFjdGl2aXR5IHNlc3Npb25zIGZvciBhIGdpdmVuIGFjdGl2aXR5XHJcbiAgICAgICAgICogQHBhcmFtIGFjdGl2aXR5SWQgLSBBY3Rpdml0eSBJZFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtuZy5JUHJvbWlzZTxUUmVzdWx0PnwqfSAtIFByb21pc2Ugb2YgYWN0aXZpdHkgc2Vzc2lvbnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBnZXRBY3Rpdml0eVNlc3Npb25zKGFjdGl2aXR5SWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFwaVNlcnZpY2VcclxuICAgICAgICAgICAgICAgIC5nZXQoQVBJX1JPVVRFU19DT05GSUcuRFJPUElOUyArICcvJyArIGFjdGl2aXR5SWQpXHJcbiAgICAgICAgICAgICAgICAudGhlbihnZXRBY3Rpdml0eVNlc3Npb25zQ29tcGxldGUpXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXhjZXB0aW9uU2VydmljZS5jYXRjaGVyKCdYSFIgRmFpbGVkIGZvciBnZXRBY3Rpdml0eVNlc3Npb25zJykpO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0QWN0aXZpdHlTZXNzaW9uc0NvbXBsZXRlKGFjdGl2aXR5U2Vzc2lvbnMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpdml0eVNlc3Npb25zO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXRyaWV2ZXMgYWxsIGRyb3BpbiBhY3Rpdml0aWVzXHJcbiAgICAgICAgICogQHJldHVybnMge25nLklQcm9taXNlPFRSZXN1bHQ+fCp9IC0gUHJvbWlzZSBvZiBhY3Rpdml0aWVzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0RHJvcGlucygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFwaVNlcnZpY2VcclxuICAgICAgICAgICAgICAgIC5nZXQoQVBJX1JPVVRFU19DT05GSUcuRFJPUElOUylcclxuICAgICAgICAgICAgICAgIC50aGVuKGdldERyb3BpbnNDb21wbGV0ZSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaChleGNlcHRpb25TZXJ2aWNlLmNhdGNoZXIoJ1hIUiBGYWlsZWQgZm9yIGdldERyb3BpbnMnKSk7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXREcm9waW5zQ29tcGxldGUoYWN0aXZpdGllcykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjdGl2aXRpZXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERhdGEgU2VydmljZSBvYmplY3QgdG8gcmV0cmlldmUgZGF0YSBmb3JcclxuICAgICAqIHNjaGVkdWxlLWJhc2UtbGF5b3V0IENvbnRyb2xsZXJcclxuICAgICAqL1xyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2pwLnNjaGVkdWxlLmxheW91dHMnKVxyXG4gICAgICAgIC5mYWN0b3J5KCdzY2hlZHVsZUJhc2VMYXlvdXREYXRhU2VydmljZScsIHNjaGVkdWxlQmFzZUxheW91dERhdGFGYWN0b3J5KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlcyBkYXRhIGZvciBzY2hlZHVsZS1iYXNlLWxheW91dCBDb250cm9sbGVyXHJcbiAgICAgKiBAcmV0dXJucyB7e2xvYWQ6IGxvYWR9fVxyXG4gICAgICogQG5nSW5qZWN0XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHNjaGVkdWxlQmFzZUxheW91dERhdGFGYWN0b3J5KCRxLCBzY2hlZHVsZVNlcnZpY2UpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbG9hZDogbG9hZFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIExvYWRzIGFsbCBkYXRhIGludG8gdGhpcy5kYXRhIGFuZCByZXR1cm5zIGEgcHJvbWlzZVxyXG4gICAgICAgIGZ1bmN0aW9uIGxvYWQoKSB7XHJcbiAgICAgICAgICAgIHZhciBkcm9waW5BY3Rpdml0aWVzID0gc2NoZWR1bGVTZXJ2aWNlLmdldERyb3BpbnMoKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAkcS5hbGwoW2Ryb3BpbkFjdGl2aXRpZXNdKS50aGVuKFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24ocmVzdWx0cykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3BpbkFjdGl2aXRpZXM6IHJlc3VsdHNbMF1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGF0YSBTZXJ2aWNlIG9iamVjdCB0byByZXRyaWV2ZSBkYXRhIGZvclxyXG4gICAgICogYWN0aXZpdGllcyBDb250cm9sbGVyXHJcbiAgICAgKi9cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdqcC5zY2hlZHVsZS53aWRnZXRzJylcclxuICAgICAgICAgICAgLmZhY3RvcnkoJ2FjdGl2aXRpZXNEYXRhU2VydmljZScsIGFjdGl2aXRpZXNEYXRhRmFjdG9yeSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZXMgZGF0YSBmb3IgYWN0aXZpdGllcyBDb250cm9sbGVyXHJcbiAgICAgKiBAcGFyYW0gJHFcclxuICAgICAqIEBwYXJhbSBzY2hlZHVsZVNlcnZpY2VcclxuICAgICAqIEByZXR1cm5zIHt7bG9hZDogbG9hZH19XHJcbiAgICAgKiBAbmdJbmplY3RcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gYWN0aXZpdGllc0RhdGFGYWN0b3J5KCRxLCBzY2hlZHVsZVNlcnZpY2UpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbG9hZDogbG9hZFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIFJldHJpZXZlcyBhbGwgZGF0YSBhbmQgcmV0dXJucyBhbiBvYmplY3RcclxuICAgICAgICAvLyBFLmcuIHtcclxuICAgICAgICAvLyAgICAgICAgICBpdGVtMTogaXRlbTEsXHJcbiAgICAgICAgLy8gICAgICAgICAgaXRlbTI6IGl0ZW0yXHJcbiAgICAgICAgLy8gICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gbG9hZCgpIHtcclxuICAgICAgICAgICAgdmFyIGRyb3BpbkFjdGl2aXRpZXMgPSBzY2hlZHVsZVNlcnZpY2UuZ2V0RHJvcGlucygpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuICRxLmFsbChbZHJvcGluQWN0aXZpdGllc10pLnRoZW4oXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbihyZXN1bHRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGRyb3BpbkFjdGl2aXRpZXM6IHJlc3VsdHNbMF1cclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2pwLnNjaGVkdWxlLndpZGdldHMnKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ2pwU2NoZWR1bGVBY3Rpdml0eVdpemFyZCcsIGpwU2NoZWR1bGVBY3Rpdml0eVdpemFyZCk7XHJcblxyXG4gICAgZnVuY3Rpb24ganBTY2hlZHVsZUFjdGl2aXR5V2l6YXJkKClcclxuICAgIHtcclxuICAgICAgICB2YXIgZGlyZWN0aXZlID0ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJhcHAvY29tcG9uZW50cy9zY2hlZHVsZS93aWRnZXRzL2FjdGl2aXRpZXMvYWN0aXZpdGllcy50bXBsLmh0bWxcIixcclxuICAgICAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgICAgIGFjdGl2aXRpZXM6IFwiPVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcclxuICAgIH1cclxuXHJcblxyXG59KSgpOyIsIi8vIEluY2x1ZGUgaW4gaW5kZXguaHRtbCBzbyB0aGF0IGFwcCBsZXZlbCBleGNlcHRpb25zIGFyZSBoYW5kbGVkLlxyXG4vLyBTaG91bGQgZXhjbHVkZSBmcm9tIHRlc3QgcnVubmVyXHJcbihmdW5jdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgndXRpbGl0aWVzLmV4Y2VwdGlvbicpXHJcbiAgICAgICAgLnByb3ZpZGVyKCdleGNlcHRpb25IYW5kbGVyJywgZXhjZXB0aW9uSGFuZGxlclByb3ZpZGVyKVxyXG4gICAgICAgIC5jb25maWcoY29uZmlnKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE11c3QgY29uZmlndXJlIHRoZSBleGNlcHRpb24gaGFuZGxpbmdcclxuICAgICAqIEByZXR1cm4ge1t0eXBlXX1cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZXhjZXB0aW9uSGFuZGxlclByb3ZpZGVyKCkge1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0ge1xyXG4gICAgICAgICAgICBhcHBFcnJvclByZWZpeDogdW5kZWZpbmVkXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5jb25maWd1cmUgPSBmdW5jdGlvbiAoYXBwRXJyb3JQcmVmaXgpIHtcclxuICAgICAgICAgICAgdGhpcy5jb25maWcuYXBwRXJyb3JQcmVmaXggPSBhcHBFcnJvclByZWZpeDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLiRnZXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtjb25maWc6IHRoaXMuY29uZmlnfTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uZmlndXJlIGJ5IHNldHRpbmcgYW4gb3B0aW9uYWwgc3RyaW5nIHZhbHVlIGZvciBhcHBFcnJvclByZWZpeC5cclxuICAgICAqIEFjY2Vzc2libGUgdmlhIGNvbmZpZy5hcHBFcnJvclByZWZpeCAodmlhIGNvbmZpZyB2YWx1ZSkuXHJcbiAgICAgKiBAcGFyYW0gIHtbdHlwZV19ICRwcm92aWRlXHJcbiAgICAgKiBAcmV0dXJuIHtbdHlwZV19XHJcbiAgICAgKiBAbmdJbmplY3RcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gY29uZmlnKCRwcm92aWRlKSB7XHJcbiAgICAgICAgJHByb3ZpZGUuZGVjb3JhdG9yKCckZXhjZXB0aW9uSGFuZGxlcicsIGV4dGVuZEV4Y2VwdGlvbkhhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRXh0ZW5kIHRoZSAkZXhjZXB0aW9uSGFuZGxlciBzZXJ2aWNlIHRvIGFsc28gZGlzcGxheSBhIHRvYXN0LlxyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSAkZGVsZWdhdGVcclxuICAgICAqIEBwYXJhbSAge09iamVjdH0gZXhjZXB0aW9uSGFuZGxlclxyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBsb2dnZXJTZXJ2aWNlXHJcbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gdGhlIGRlY29yYXRlZCAkZXhjZXB0aW9uSGFuZGxlciBzZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGV4dGVuZEV4Y2VwdGlvbkhhbmRsZXIoJGRlbGVnYXRlLCBleGNlcHRpb25IYW5kbGVyLCBsb2dnZXJTZXJ2aWNlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGV4Y2VwdGlvbiwgY2F1c2UpIHtcclxuICAgICAgICAgICAgdmFyIGFwcEVycm9yUHJlZml4ID0gZXhjZXB0aW9uSGFuZGxlci5jb25maWcuYXBwRXJyb3JQcmVmaXggfHwgJyc7XHJcbiAgICAgICAgICAgIHZhciBlcnJvckRhdGEgPSB7ZXhjZXB0aW9uOiBleGNlcHRpb24sIGNhdXNlOiBjYXVzZX07XHJcbiAgICAgICAgICAgIGV4Y2VwdGlvbi5tZXNzYWdlID0gYXBwRXJyb3JQcmVmaXggKyBleGNlcHRpb24ubWVzc2FnZTtcclxuICAgICAgICAgICAgJGRlbGVnYXRlKGV4Y2VwdGlvbiwgY2F1c2UpO1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQ291bGQgYWRkIHRoZSBlcnJvciB0byBhIHNlcnZpY2UncyBjb2xsZWN0aW9uLFxyXG4gICAgICAgICAgICAgKiBhZGQgZXJyb3JzIHRvICRyb290U2NvcGUsIGxvZyBlcnJvcnMgdG8gcmVtb3RlIHdlYiBzZXJ2ZXIsXHJcbiAgICAgICAgICAgICAqIG9yIGxvZyBsb2NhbGx5LiBPciB0aHJvdyBoYXJkLlxyXG4gICAgICAgICAgICAgKiB0aHJvdyBleGNlcHRpb247XHJcbiAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICAgICAqICAgICB0aHJvdyB7IG1lc3NhZ2U6ICdlcnJvciBtZXNzYWdlIHdlIGFkZGVkJyB9O1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgbG9nZ2VyU2VydmljZS5lcnJvcihleGNlcHRpb24ubWVzc2FnZSwgZXJyb3JEYXRhKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59KSgpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==