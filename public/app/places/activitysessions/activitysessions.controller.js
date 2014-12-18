(function () {
    "use strict";

    angular
        .module('app.places.activitysessions')
        .controller('activitysessionCtrl', activitysessionCtrl);

    /**
     * Dependency Injection
     * @type {string[]}
     */
    activitysessionCtrl.$inject = ['$scope','activitySessions'];

    /**
     * Activity Session Controller
     * @param $scope
     * @constructor
     */
    function activitysessionCtrl($scope)
    {

        function init()
        {
            $scope.activitySessions = activitySessions;
        }

        init();
    }


})();