(function () {
    "use strict";

    angular
        .module('jp.schedule.layouts')
        .controller('ActivitiesLayoutCtrl', ActivitiesLayoutCtrl);

    /* @ngInject */
    function ActivitiesLayoutCtrl(activitiesDataService)
    {
        var vm = this;

        activate();

        function activate() {
            vm.activities = activitiesDataService.dropinActivities;
        }
    }

})();