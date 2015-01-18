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
    function ActivitySessionLayoutController(activitySessionsData, loggerService, $stateParams)
    {

        var vm = this;

        activate();

        //

        function activate()
        {
            vm.activitySessions = activitySessionsData.activitySessionsThisWeek;
            vm.activityLabel = activitySessionsData.activity.activity;
            vm.activityCategory = activitySessionsData.activity.category;
            vm.activityIsWomenOnly = activitySessionsData.activity.women_only;

            // Show a toast for them to add to homescreen
/*            loggerService.info("Save app onto your phone: " +
            "Click Settings > Add to Home Screen", "title");*/
        }

    }

})();