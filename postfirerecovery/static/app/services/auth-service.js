(function() {

    'use strict';

    angular.module('postfirerecovery')
    .service('AuthService', function ($http, $localStorage) {

        var service = this;

        service.setAuthToken = function (data) {
            var authToken = {
                username: data.username,
                token: data.token
            };
            $localStorage.authToken = authToken;
        };

        service.getUserName = function () {
            if ($localStorage.authToken) {
                return $localStorage.authToken.username;
            } else {
                return null;
            }
        };

        service.getToken = function () {
            if ($localStorage.authToken) {
                return $localStorage.authToken.token;
            } else {
                return null;
            }
        };

        service.userLogin = function (user) {
            var req = {
                method: 'POST',
                url: '/api/v1/user/login/',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    username: user.username,
                    password: user.password
                }
            };

            var promise = $http(req)
                .then(function (response) {
                    service.setAuthToken(response.data);
                    return true;
                })
                .catch(function (e) {
                    console.log('Error: ', e);
                    throw e.data;
                });
            return promise;
        };

        service.userLogout = function () {
            $localStorage.$reset();
            $localStorage.authToken = {};
        };

        service.getUserProfile = function (token) {
            var req = {
                method: 'GET',
                url: '/api/v1/user/profile/',
                headers: {
                    'Authorization': 'Token ' + token,
                }
            };

            var promise = $http(req)
            .then(function (response) {
                return response.data;
            })
            .catch(function (e) {
                console.log('Error: ', e);
                throw e;
            });
            return promise;
        };

        service.updateUserProfile = function (user, token) {
            var req = {
                method: 'PUT',
                url: '/api/v1/user/profile/',
                headers: {
                    'Authorization': 'Token ' + token,
                    'Content-Type': 'application/json'
                },
                data: {
                    username: user.username,
                    password: user.password,
                    'first_name': user.firstName,
                    'last_name': user.lastName,
                    'email': user.email
                }
            };

            var promise = $http(req)
            .then(function (response) {
                return response.data;
            })
            .catch(function (e) {
                console.log('Error: ', e);
                throw e;
            });
            return promise;
        };

    });

})();
