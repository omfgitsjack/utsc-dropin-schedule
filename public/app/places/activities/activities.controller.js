(function(){
    "use strict";

    angular.module('app.places.activities')
        .controller('ActivityCtrl', ActivityCtrl);

    /**
     * Dependency Injection
     * @type {string[]}
     */
    ActivityCtrl.$inject = ['activities'];

    /**
     * Activity Controller
     * @param $scope - Scope
     * @param activities - activities
     * @constructor
     */
    function ActivityCtrl(activities) {

        var vm = this;

        activate();

        //////////////////////

        function activate()
        {
            vm.activities = activities;
        }

    }

    /**
     * Activity Controller dependencies
     * @type {{}}
     */
    ActivityCtrl.resolve = {
        activities: activities
    }

    activities.$inject = ['scheduleService'];
    function activities(scheduleService) {
        return scheduleService.getDropins();
    }

})();