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
            templateUrl: 'app/components/schedule/widgets/activity-sessions/activity-sessions-day-list.html',
            scope: {
                sessions: '=',
                day: '='
            },
            link: function($scope, element, attr)
            {
                console.log('g');
                $scope.today = DateTimeService.now().add(0, 'days');
                $scope.tm = DateTimeService.now().add(-1, 'days');
                $scope.tmm = DateTimeService.now().add(-3, 'days');
            }
        };

        return directive;
    }

})();