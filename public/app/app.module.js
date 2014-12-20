(function () {
    "use strict";

    /**
     * Main Application Module
     */
    angular.module('app.main', [
        'app.routes'
    ]);

    angular.module('app.main')
        .constant('toastr', toastr);

})();