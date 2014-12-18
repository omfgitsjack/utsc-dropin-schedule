(function () {
    "use strict";

    angular.module('app.components.api').factory('apiService', apiFactory);

    //var apiFactory;
    apiFactory.$inject = ['$http', 'API_CONFIG'];
    function apiFactory($http, API_CONFIG)
    {
        return {
            get: function (route) {
                return $http.get(API_CONFIG.BASE_ROUTE + '/' + route).then(
                    function (payload) {
                        return payload.data;
                    });
            },
            post: function (route, input) {
                if (!input) {
                    input = {};
                }

                $http.post(API_CONFIG.BASE_ROUTE + '/' + route, input);
            }
        }
    }



})();