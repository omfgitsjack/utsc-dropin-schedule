(function () {
    "use strict";

    angular
        .module('jp.schedule.widgets.activitySessions')
        .directive('jpParticipantCount', jpParticipantCount);

    function jpParticipantCount() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/schedule/widgets/activity-sessions/participant-count/participant-count.html',
            scope: {
                count: '=',
                day: '='
            }
        }
    }

})();