(function() {

    'use strict';
    angular.module('postfirerecovery')
    .controller('loginController', function ($scope) {

        $scope.loginFormLinkClick = function (e) {
            $('#login-form-div').delay(100).fadeIn(100);
            $('#register-form-div').fadeOut(100);
            $('#register-form-link').removeClass('active');
            $(e.target).addClass('active');
            e.preventDefault();
        };

        $scope.registerFormLinkClick = function (e) {
            $('#register-form-div').delay(100).fadeIn(100);
            $('#login-form-div').fadeOut(100);
            $('#login-form-link').removeClass('active');
            $(e.target).addClass('active');
            e.preventDefault();
        };

        $scope.showPassword = function (e) {
            var target = e.target;
            $(target).text($(target).text() === 'Show' ? 'Hide' : 'Show');
            $(target).prev().attr('type', function(_, attr) {
                return attr === 'password' ? 'text' : 'password';
            });
        };
    });

})();