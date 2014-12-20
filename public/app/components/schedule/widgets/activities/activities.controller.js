(function(){
    "use strict";

    angular.module('app.activities.widgets')
        .controller('ActivityCtrl', ActivityCtrl);

    /**
     * Dependency Injection
     * @type {string[]}
     */
    ActivityCtrl.$inject = ['dataService'];

    /**
     * Activity Controller
     * @param $scope - Scope
     * @param dataService - data service
     * @constructor
     */
    function ActivityCtrl(dataService) {

        var vm = this;

        activate();

        //////////////////////

        function activate()
        {
            vm.activities = dataService.dropinActivities;
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