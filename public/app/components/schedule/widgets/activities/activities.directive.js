(function () {
    "use strict";

    angular
        .module('jp.schedule.widgets')
        .directive('jpScheduleActivityWizard', jpScheduleActivityWizard);

    function jpScheduleActivityWizard()
    {
        var directive = {
            restrict: 'E',
            templateUrl: "app/components/schedule/widgets/activities/activities.tmpl.html",
            scope: {
                activities: "="
            },
            link: function($scope, $element, $attr) {
                console.log($scope);
            }
        };

        return directive;
    }


})();