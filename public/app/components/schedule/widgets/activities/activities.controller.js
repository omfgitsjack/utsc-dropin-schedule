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
     */
    ActivityCtrl.resolve = {
        activities: activities
    };

    /* @ngInject */
    function activities(scheduleService) {
        return scheduleService.getDropins();
    }

})();