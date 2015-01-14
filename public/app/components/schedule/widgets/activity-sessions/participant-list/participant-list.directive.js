(function () {
    "use strict";

    angular
        .module('jp.schedule.widgets.activitySessions')
        .directive('jpParticipantList', jpParticipantList);

    function jpParticipantList() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/schedule/widgets/activity-sessions/participant-list/participant-list.html',
            scope: {
                participants: '='
            },
            link: function($scope)
            {

            }
        }
    }

})();