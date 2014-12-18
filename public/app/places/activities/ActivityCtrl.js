(function(){
    "use strict";

    angular.module('app.places.activities')
        .controller('ActivityCtrl',
        ['$scope', 'activities', function($scope, activities) {

            function init()
            {
                $scope.activities = activities;
            }

            init();

        }]);

})();