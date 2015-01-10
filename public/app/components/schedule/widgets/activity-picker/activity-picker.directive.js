(function () {
    "use strict";

    angular
        .module('jp.schedule.widgets.activityPicker')
        .directive('jpScheduleActivityPicker', jpScheduleActivityPicker);

    function jpScheduleActivityPicker()
    {
        var directive = {
            restrict: 'E',
            templateUrl: "app/components/schedule/widgets/activity-picker/activity-picker.html",
            scope: {
                activities: "="
            },
            link: function($scope) {

            }
        };

        return directive;
    }
})();