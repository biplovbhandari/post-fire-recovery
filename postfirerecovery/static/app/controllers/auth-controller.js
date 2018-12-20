(function() {

    'use strict';
    angular.module('postfirerecovery')
    .controller('authController', function (appSettings, $location, $scope, $state, $timeout, $window, AuthService) {

        $scope.menus = appSettings.menus;
        $scope.applicationName = appSettings.applicationName;
        $scope.partnersHeader = appSettings.partnersHeader;
        $scope.userName = AuthService.getUserName();
        $scope.firstName = null;
        $scope.lastName = null;
        $scope.email = null;

        /**
         * Alert
         */
        $scope.closeAlert = function () {
            $('.custom-alert').addClass('display-none');
            $scope.alertContent = '';
        };

        var showErrorAlert = function (alertContent) {
            $scope.alertContent = alertContent;
            $('.custom-alert').removeClass('display-none').removeClass('alert-info').removeClass('alert-success').addClass('alert-danger');
        };

        var showSuccessAlert = function (alertContent) {
            $scope.alertContent = alertContent;
            $('.custom-alert').removeClass('display-none').removeClass('alert-info').removeClass('alert-danger').addClass('alert-success');
        };

        var showInfoAlert = function (alertContent) {
            $scope.alertContent = alertContent;
            $('.custom-alert').removeClass('display-none').removeClass('alert-success').removeClass('alert-danger').addClass('alert-info');
        };

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

        $scope.userLogin = function (user) {
            if (user.username && user.password) {
                AuthService.userLogin(user)
                .then(function () {
                    $scope.loginForm.$setPristine();
                    $scope.loginForm.$setUntouched();
                    //$location.path('/map');
                    $window.location.href = '/map';
                }, function (error) {
                    showErrorAlert(error.error);
                });
            } else {
                showErrorAlert('enter both username and password!');
            }
        };

        $scope.userLogout = function () {
            AuthService.userLogout();
            $window.location.href = '/map';
        };

        $scope.getProfile = function () {
            var username = AuthService.getUserName();
            var token = AuthService.getToken();

            if ((username !== null) && (token !== null)) {
                AuthService.getUserProfile (token)
                .then(function (data) {
                    $scope.firstName = data.first_name;
                    $scope.lastName = data.last_name;
                    $scope.email = data.email;
                }, function (error) {
                    showErrorAlert(error.status + ' ' + error.data.detail);
                });
            } else {
                $location.path('/login');
            }
        };

        if ($state.current.name === 'profile') {
            $scope.getProfile();
        }

        $scope.updateProfile = function (profile) {

            var user = {
                username : $scope.userName,
                firstName: $scope.firstName,
                lastName : $scope.lastName,
                email    : $scope.email
            };

            if (profile) {
                if (!(!profile.password && !profile.confirmPassword)) {
                    if (profile.password !== profile.confirmPassword) {
                        showErrorAlert('password does not match!');
                        return false;
                    } else {
                        user.password = profile.password;
                    }
                }
            } else {
                showErrorAlert('password is required!');
                return false;
            }

            AuthService.updateUserProfile (user, AuthService.getToken())
            .then(function (data) {
                $scope.profileForm.$setPristine();
                $scope.profileForm.$setUntouched();
                //$location.path('/map');
                $window.location.href = '/map';
            }, function (error) {
                showErrorAlert(error.status + ' ' + error.data.detail);
            });
        };

    });

})();