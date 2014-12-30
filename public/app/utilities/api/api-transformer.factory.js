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
                var dateObj = new Date(obj)
                if ( Object.prototype.toString.call(dateObj === "[object Date]" )) {
                    // it is a date
                    if ( isNaN( dateObj.getTime() ) ) {  // d.valueOf() could also work
                        // date is not valid
                        return obj;
                    }
                    else {
                        // date is valid
                        return DateTimeService.parseUTC(obj);
                    }
                }
                else {
                    // not a date
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