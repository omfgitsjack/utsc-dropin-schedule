describe("Schedule Factory Unit Tests", function() {
    "use strict";

    // Load modules
    beforeEach(function() {
        module('jp.schedule.data');
    });

    // Schedule data factory
    var scheduleDataService;

    // Inject schedule data factory
    beforeEach(inject(function(scheduleService) {
        scheduleDataService = scheduleService;
    }));

    it('should have schedule service defined', function() {
       expect(scheduleDataService).toBeDefined();
    });



});