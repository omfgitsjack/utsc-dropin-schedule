(function () {
    "use strict";

    angular
        .module('jp.schedule.widgets.activitySessions')
        .directive('jpParticipantJoin', jpParticipantJoin);

    // @ngInject
    function jpParticipantJoin(scheduleService, toastr, $state, DateTimeService)
    {
        return {
            restrict: 'E',
            templateUrl: 'app/components/schedule/widgets/activity-sessions/participant-join/participant-join.html',
            scope: {
                activity: '=',
                activitySession: '='
            },
            link: function($scope)
            {
                $scope.join = function() {
                    scheduleService
                        .joinActivitySession(
                            $scope.activitySession.activity_id,
                            $scope.activitySession.id,
                            parseCSV($scope.user.name))
                        .then(function() {
                            toastr.success('You have successfully joined! Have fun :)');
                            $state.go($state.$current, null, { reload: true });
                        });
                };

                activate();

                function activate()
                {
                    $scope.user = {};
                }

                function parseCSV(names)
                {
                    return names.split(",");
                }
            }
        }
    }


})();