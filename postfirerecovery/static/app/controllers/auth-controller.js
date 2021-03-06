(function() {

    'use strict';
    angular.module('postfirerecovery')
    .controller('authController', function (appSettings, $location, $scope, $state, $timeout, $window, AuthService) {

        $scope.menus = appSettings.menus;
        $scope.applicationName = appSettings.applicationName;
        $scope.partnersHeader = appSettings.partnersHeader;
        $scope.userName = AuthService.getCurrentUser();
        $scope.firstName = null;
        $scope.lastName = null;
        $scope.email = null;
        $scope.alertContent = '';

        /**
         * Alert
         */
        $scope.closeAlert = function () {
            $('.custom-alert').addClass('display-none');
            $scope.alertContent = '';
        };

        $scope.showAlert = function (className, alertContent) {
            var alertClass = ['info', 'success', 'danger'];
            var index = alertClass.indexOf(className);
            if (index > -1) {
                alertClass.splice(index, 1);
            }
            $('.custom-alert').removeClass('display-none').removeClass('alert-' + alertClass[0]).removeClass('alert-' + alertClass[1]).addClass('alert-' + className);
            $scope.alertContent = alertContent;
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
                    $scope.showAlert('success', 'Logged in successfully! Redirecting...');
                    $timeout(function () { $window.location.href = '/map'; }, 2000);
                }, function (error) {
                    $scope.showAlert('danger', error.error);
                    return false;
                });
            } else {
                $scope.showAlert('danger', 'enter both username and password!');
            }
        };

        $scope.userRegister = function (user) {
            if (user.userName && user.password) {
                if (user.password !== user.confirmPassword) {
                    $scope.showAlert('danger', 'password does not match!');
                    return false;
                }

                AuthService.userRegister(user)
                .then(function () {
                    $scope.registerForm.$setPristine();
                    $scope.registerForm.$setUntouched();
                    $scope.showAlert('success', 'Registration successful! Redirecting...');
                    $timeout(function () { $window.location.href = '/map'; }, 2000);
                }, function (error) {
                    $scope.showAlert('danger', error.error);
                    return false;
                });
            } else {
                $scope.showAlert('danger', 'enter both username and password!');
            }
        };

        $scope.userLogout = function () {
            AuthService.userLogout();
            // for some reason this is not working
            //$scope.showAlert('success', 'Logged out successfully! Redirecting...');
            $window.location.href = '/map';
        };

        $scope.changePassword = function (form) {
            if (!form) {
                $scope.showAlert('danger', 'enter the details!');
                return false;
            }
            if (form.newPassword !== form.confirmPassword) {
                $scope.showAlert('danger', 'new password and confirm password are not same!');
                return false;
            }
            var username = AuthService.getCurrentUser();
            var token = AuthService.getToken();
            console.log(token);
            if ((username !== null) && (token !== null)) {
                AuthService.changePassword (form, token)
                .then(function (data) {
                    $scope.changePasswordForm.$setPristine();
                    $scope.changePasswordForm.$setUntouched();
                    $scope.showAlert('success', 'Password changed! Redirecting...');
                    $timeout(function () { $window.location.href = '/map'; }, 2000);
                }, function (error) {
                    $scope.showAlert('danger', error.status + ' ' + error.data.detail);
                });
            }
        };

        $scope.getProfile = function () {
            var username = AuthService.getCurrentUser();
            var token = AuthService.getToken();

            if ((username !== null) && (token !== null)) {
                AuthService.getUserProfile (token)
                .then(function (data) {
                    $scope.firstName = data.first_name;
                    $scope.lastName = data.last_name;
                    $scope.email = data.email;
                }, function (error) {
                    $scope.showAlert('danger', error.status + ' ' + error.data.detail);
                });
            } else {
                $location.path('/login');
            }
        };

        if ($state.current.name === 'profile') {
            if (AuthService.getCurrentUser()) {
                $scope.getProfile();
            } else {
                $location.path('/login');
            }
        }

        $scope.updateProfile = function (profile) {

            var username = AuthService.getCurrentUser();
            var token = AuthService.getToken();

            var user = {
                username : $scope.userName,
                firstName: $scope.firstName,
                lastName : $scope.lastName,
                email    : $scope.email
            };

            /*if (profile) {
                if (!(!profile.password && !profile.confirmPassword)) {
                    if (profile.password !== profile.confirmPassword) {
                        $scope.showAlert('danger', 'password does not match!');
                        return false;
                    } else {
                        user.password = profile.password;
                    }
                }
            } else {
                $scope.showAlert('danger', 'password is required!');
                return false;
            }*/

            if ((username !== null) && (token !== null)) {
                AuthService.updateUserProfile (user, AuthService.getToken())
                .then(function (data) {
                    $scope.profileForm.$setPristine();
                    $scope.profileForm.$setUntouched();
                    //$location.path('/map');
                    $scope.showAlert('success', 'Profile updated successfully! Redirecting...');
                    $timeout(function () { $window.location.href = '/map'; }, 2000);
                }, function (error) {
                    $scope.showAlert('danger', error.status + ' ' + error.data.detail);
                });
            } else {
                $location.path('/login');
            }
        };

    });

})();