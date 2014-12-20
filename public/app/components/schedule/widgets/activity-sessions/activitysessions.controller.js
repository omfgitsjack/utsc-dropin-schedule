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