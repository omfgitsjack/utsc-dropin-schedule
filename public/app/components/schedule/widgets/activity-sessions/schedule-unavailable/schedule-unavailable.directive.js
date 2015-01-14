(function () {
    "use strict";

    angular
        .module('jp.schedule.widgets.activitySessions')
        .directive('jpScheduleUnavailable', jpScheduleUnavailable);

    /* @ngInject */
    function jpScheduleUnavailable(DateTimeService)
    {
        return {
            restrict: 'A',
            scope: false, // We're using session.participants.length from parent
            link: function($scope, $element)
            {
                if ($scope.day.isBefore(DateTimeService.now()))
                {
                    $element.addClass('scheduleUnavailable');
                }
            }
        }
    }

})();