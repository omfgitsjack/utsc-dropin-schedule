/**
 * Created by Jack on 2014-12-17.
 */
(function()
{
    "use strict";

    angular.module('places', [
        'ui.router',
        'app.places.activities',
        'app.components.schedule'
    ]);

    angular.module('places').config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise("/activities");

            $stateProvider
                .state('activities', {
                    url: "/activities",
                    templateUrl: "app/places/activities/activities.tmpl.html",
                    controller: "ActivityCtrl",
                    resolve: {
                        activities: function(scheduleFactory) {
                            return scheduleFactory.getDropins();
                        }
                    }
                });
        }]);

})();