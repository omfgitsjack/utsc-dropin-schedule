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

})();