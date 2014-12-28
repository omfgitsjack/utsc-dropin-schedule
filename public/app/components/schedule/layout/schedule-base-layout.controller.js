(function () {
    "use strict";

    angular
        .module('jp.schedule.layouts')
        .controller('ScheduleBaseCtrl', ScheduleBaseController);

    /* @ngInject */
    function ScheduleBaseController(dataService)
    {
        var vm = this;

        activate();

        function activate() {

        }
    }

})();