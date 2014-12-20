(function () {
    "use strict";

    angular
        .module('utilities.exception')
        .factory('exceptionService', exceptionFactory);

    exceptionFactory.$inject = ['loggerService'];
    function exceptionFactory(loggerService) {
        var service = {
            catcher: catcher
        };

        return service;

        /**
         * Catches exceptions, logs reason into console.
         * @param message
         * @returns {Function}
         */
        function catcher(message) {
            return function(reason) {
                loggerService.error(message, reason);
            };
        }
    }
})();