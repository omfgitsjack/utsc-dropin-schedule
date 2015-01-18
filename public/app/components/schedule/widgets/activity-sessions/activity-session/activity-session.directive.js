(function () {
    "use strict";

    angular
        .module('jp.schedule.widgets.activitySessions')
        .directive('jpActivitySession', jpActivitySession);

    function jpActivitySession() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/schedule/widgets/activity-sessions/activity-session/activity-session.html',
            scope: {
                session: '=',
                day: '=',
                firstSession: '=',
                lastSession: '='
            },
            link: function ($scope) {
                $scope.showDetails = false;

                $scope.toggleShowDetails = function() {
                    $scope.showDetails = !$scope.showDetails;
                }
            }
        }
    }

})();