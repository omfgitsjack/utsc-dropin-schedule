describe("scheduleService Unit Tests", function () {
    "use strict";

    // Load modules
    beforeEach(function () {
        module('jp.schedule.data');
    });

    // Schedule data factory
    var scheduleDataService;

    // Inject schedule data factory
    beforeEach(inject(function (scheduleService) {
        scheduleDataService = scheduleService;
    }));

    describe("scheduleService.getDropins", function () {

        it('should be defined', function () {
            expect(scheduleDataService.getDropins).toBeDefined();
        });

        it('should make XHR call to app/api/dropins');

        it('should convert is_women from 0/1 to true/false');

        it('should return an array of dropins');

    });

    describe("scheduleService.getActivitySessions", function () {

        it('should be defined', function() {
            expect(scheduleDataService.getActivitySessions).toBeDefined();
        });

        it('should make XHR call to app/api/activities/{id}');

        it('should group activity sessions according to each unique day');

        it('should convert is_women from 0/1 to true/false');

        it('should return an array of unique days');

    })

});