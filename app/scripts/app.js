'use strict';

angular.module('jenkinsLightApp', ['config', 'ngRoute'])
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
            // Set authorization token (http://en.wikipedia.org/wiki/Basic_access_authentication#Client_side)
            $httpProvider.defaults.headers.common.Authorization = CONFIG.AUTHORIZATION_TOKEN;
        }
    });