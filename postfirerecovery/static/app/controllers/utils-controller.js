(function() {

    'use strict';
    angular.module('postfirerecovery')
    .controller('utilsController', function ($scope, appSettings) {

        $scope.menus = appSettings.menus;
        $scope.applicationName = appSettings.applicationName;
        $scope.partnersHeader = appSettings.partnersHeader;

    });

})();