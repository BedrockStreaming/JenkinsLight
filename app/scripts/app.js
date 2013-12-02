'use strict';

angular.module('JenkinsLightApp', ['JenkinsLightConfig', 'ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'JenkinsLightCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .config(function($httpProvider, $config) {
        if ($config.AUTHORIZATION_TOKEN) {
            $httpProvider.defaults.headers.common.Authorization = $config.AUTHORIZATION_TOKEN;
        }
    });