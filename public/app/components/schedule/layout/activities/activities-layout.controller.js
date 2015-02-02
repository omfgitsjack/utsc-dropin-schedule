(function () {
    "use strict";

    angular
        .module('jp.schedule.layouts')
        .controller('ActivitiesLayoutCtrl', ActivitiesLayoutCtrl);

    /* @ngInject */
    function ActivitiesLayoutCtrl(activitiesDataService, toastr)
    {
        var vm = this;

        activate();

        function activate() {
            vm.activities = activitiesDataService.dropinActivities;
            toastr.options.closeButton = true;
            toastr.options.timeout = 30;
            toastr.info("There are no dropins this week due to Pan Am Fencing Championships");

        }
    }

})();