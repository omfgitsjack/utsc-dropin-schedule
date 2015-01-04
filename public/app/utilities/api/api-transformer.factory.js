(function () {
    "use strict";

    angular
        .module('utilities.api')
        .factory('apiTransformerService', apiTransformerService);

    /**
     * Utility functions to transform API calls
     * @returns {{prop: prop}}
     */
    function apiTransformerService(DateTimeService, UTC_TIMEFORMAT)
    {
        var service = {
            replaceDateTime: replaceDateTime
        };

        return service;

        /**
         * Replaces all MySQL DateTime strings in a JSON object/array
         * @param obj
         * @returns {*}
         */
        function replaceDateTime(obj) {
            if (typeof obj === "string" || obj instanceof String)
            {
                // SQL Time matching pattern
                var pattern = /[0-9]{4}-[0-1]{1}[0-9]{1}-[0-3]{1}[0-9]{1} [0-2]{1}[0-9]{1}:[0-5]{1}[0-9]{1}:[0-5]{1}[0-9]{1}/;

                if (pattern.test(obj)) {  // d.valueOf() could also work
                    // date is valid
                    return DateTimeService.parseUTC(obj);
                }
                else {
                    // date is not valid
                    return obj;
                }
            }
            else if (obj.constructor === Array)
            {
                var clonedObj = [];
                // For each item, we reassign & recursively call replaceDateTime
                obj.forEach(function(element, index, array) {
                    clonedObj.push(replaceDateTime(element));
                });
                return clonedObj;
            }
            else if (obj instanceof Object)
            {
                var clonedObj = {};
                for (var prop in obj)
                {
                    if (obj.hasOwnProperty(prop))
                    {
                        clonedObj[prop] = replaceDateTime(obj[prop]);
                    }
                }
                return clonedObj;
            }
            else
            {
                return obj;
            }
        }
    }
})();