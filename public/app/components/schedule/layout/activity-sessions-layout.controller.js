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
     * @constructor
     * @ngInject
     */
    function ActivitySessionLayoutController(activitySessionsData)
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
        }

    }

})();