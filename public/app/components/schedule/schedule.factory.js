(function(){
    "use strict";

    angular.module('app.components.schedule')
        .factory('scheduleFactory', ['$http', function($http) {

            return {
                getDropins: function() {
                    return $http.get('api/dropins').then(
                        function (obj) {
                            return obj.data;
                        }
                    )
                }
            }
        }]);

})();