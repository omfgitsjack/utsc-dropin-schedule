(function () {
    "use strict";

    /**
     * Core module configuration
     */
    angular
        .module('app.core')
        .config(toastrConfig)
        .config(logProviderConfig)
        .config(exceptionHandlerProviderConfig);

    toastrConfig.$inject = ['toastr'];

    /**
     * Toastr Configuration
     * @param toastr
     */
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    logProviderConfig.$inject = ['$logProvider'];

    /**
     * Log Provider Configuration
     * @param $logProvider
     */
    function logProviderConfig($logProvider) {
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
    }

    exceptionHandlerProviderConfig.$inject = ['exceptionHandlerProvider'];

    /**
     * Exception Handler Provider configuration
     * @param exceptionHandlerProvider
     */
    function exceptionHandlerProviderConfig(exceptionHandlerProvider) {
        exceptionHandlerProvider.configure('[NG-JP Error] ');
    }

})();