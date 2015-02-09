(function () {
    "use strict";

    angular
        .module('jp.schedule.layouts')
        .controller('ActivitySessionLayoutController', ActivitySessionLayoutController);

    /**
     * Mediates data to underlying layout, activitySessionsData contains:
     * {
     *      activity: 'string',
     *      activitySession: [ { date: moment, sessions: [ session, session ] ]
     * }
     *
     * @param activitySessionsData
     * @param loggerService
     * @constructor
     * @ngInject
     */
    function ActivitySessionLayoutController(activitySessionsData, toastr)
    {

        var vm = this;

        activate();

        //

        function activate()
        {
            // Configure Week identifiers
            if (activitySessionsData.selectedWeek == 0)
            {
                vm.weekIdentifier = "This";
                vm.oppositeWeekIdentifier = "Next";
                vm.oppositeWeek = 1;
                vm.activitySessions = activitySessionsData.activitySessionsThisWeek;
                vm.enableWeekSwitch = activitySessionsData.activitySessionsNextWeek.length >= 1;
            }
            else if (activitySessionsData.selectedWeek == 1)
            {
                vm.weekIdentifier = "Next";
                vm.oppositeWeekIdentifier = "Last";
                vm.oppositeWeek = 0;
                vm.activitySessions = activitySessionsData.activitySessionsNextWeek;
                vm.enableWeekSwitch = true; // Should always be able to go back
            }

            // Display activity details
            vm.activityLabel = activitySessionsData.activity.activity;
            vm.activityId = activitySessionsData.activity.id;
            vm.activityCategory = activitySessionsData.activity.category;
            vm.activityIsWomenOnly = activitySessionsData.activity.women_only;
        }

    }

})();