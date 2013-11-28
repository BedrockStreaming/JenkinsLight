'use strict';

angular.module('JenkinsLightApp', ['config', 'ngRoute'])
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
    .config(function($httpProvider, CONFIG) {
        if (CONFIG.AUTHORIZATION_TOKEN) {
            $httpProvider.defaults.headers.common.Authorization = CONFIG.AUTHORIZATION_TOKEN;
        }
    });