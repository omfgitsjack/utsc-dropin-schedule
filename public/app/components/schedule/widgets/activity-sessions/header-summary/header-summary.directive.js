(function () {
    "use strict";

    angular
        .module('jp.schedule.widgets.activitySessions')
        .directive('jpHeaderSummary', jpHeaderSummary);

    function jpHeaderSummary() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/schedule/widgets/activity-sessions/header-summary/header-summary.html',
            scope: {
                count: '=',
                day: '=',
                showLocation: '=',
                location: '='
            }
        }
    }

})();