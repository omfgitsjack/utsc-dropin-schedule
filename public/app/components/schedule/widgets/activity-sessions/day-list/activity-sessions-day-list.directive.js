(function () {
    "use strict";

    angular
        .module('jp.schedule.widgets.activitySessions')
        .directive('jpScheduleActivitySessionsDayList', jpScheduleActivitySessionsDayList);

    /* @ngIngject */
    function jpScheduleActivitySessionsDayList(DateTimeService)
    {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/schedule/widgets/activity-sessions/day-list/activity-sessions-day-list.html',
            scope: {
                sessions: '=',
                day: '='
            }
        };

        return directive;
    }

})();