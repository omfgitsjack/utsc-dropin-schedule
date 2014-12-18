(function(){
    "use strict";

    angular.module('app.places.activities')
        .controller('ActivityCtrl', ActivityCtrl);

    /**
     * Dependency Injection
     * @type {string[]}
     */
    ActivityCtrl.$inject = ['$scope', 'activities'];

    /**
     * Activity Controller
     * @param $scope - Scope
     * @param activities - activities
     * @constructor
     */
    function ActivityCtrl($scope, activities) {

        function init()
        {
            $scope.activities = activities;
        }

        init();
    }

})();