(function () {
    "use strict";

    angular
        .module('jp.schedule.widgets')
        .directive('schedule', jpScheduleActivity);

    function jpScheduleActivity()
    {
        var directive = {
            restrict: 'E',
            templateUrl: "app/components/schedule/widgets/activities/activities.tmpl.html"
        };

        return directive;
    }


})();