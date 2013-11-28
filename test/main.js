'use strict';

describe('JenkinsLightCtrl', function() {
    var $scope;
    var $ctrl;

    beforeEach(module('JenkinsLightApp'));

    beforeEach(inject(function($rootScope, $controller, $httpBackend) {
        $httpBackend.when('GET', '{#AUTHORIZATION_TOKEN#}/view/All/api/json')
            .respond(201, [
                {key: 'app_recueil_mco_enabled', value: 1},
                {key: 'app_recueil_had_enabled', value: 1},
            ]);

        $scope = $rootScope.$new();
        $ctrl = $controller(
            'JenkinsLightCtrl',
            {
                $scope: $scope
            }
        );
    }));

    it('Scope initialization', function() {
        expect($scope.views).toBeDefined();
        expect($scope.opened).toBeDefined();
        expect($scope.viewCount).toBeDefined();
    });
});