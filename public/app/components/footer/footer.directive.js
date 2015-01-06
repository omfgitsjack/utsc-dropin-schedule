(function () {
    "use strict";

    angular
        .module('jp.footer')
        .directive('jpFooter', jpFooter);

    function jpFooter()
    {
        return {
            restrict: 'E',
            templateUrl: "app/components/footer/footer.html"
        }
    }

})();