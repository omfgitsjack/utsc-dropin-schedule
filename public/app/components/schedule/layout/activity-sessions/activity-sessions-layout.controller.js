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
     * @param toastr
     * @constructor
     * @ngInject
     */
    function ActivitySessionLayoutController(activitySessionsData, loggerService)
    {

        var vm = this;

        activate();

        //

        function activate()
        {
            vm.activitySessions = activitySessionsData.activitySessions;
            vm.activityLabel = activitySessionsData.activity.activity;
            vm.activityCategory = activitySessionsData.activity.category;
            vm.activityIsWomenOnly = activitySessionsData.activity.women_only;

            // Show a toast for them to add to homescreen
            loggerService.info("To add app to your phone, click Settings > Add to Home Screen", "title");
        }

    }

})();