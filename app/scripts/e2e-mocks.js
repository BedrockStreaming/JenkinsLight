'use strict';

angular.module('e2e-mocks', ['ngMockE2E'])
    .run(function($httpBackend, CONFIG) {

        CONFIG.CI.JENKINS.JOBS_TO_BE_DISPLAYED = ['blue', 'red'];
        CONFIG.BACKGROUND_BLANK_SCREEN_URL     = 'image-url-or-null';
        CONFIG.JOBS_NOT_DISPLAYED_REGEXP       = '^regexp$';

        // Don't mock the html views
        $httpBackend.whenGET(/views\/\w+.*/).passThrough();

        $httpBackend.whenGET('{#JENKINS_URL#}/view/blue/api/json').respond(
            {'description':null,'jobs':[{'name':'panic-sdc-homepages','url':'https://jenkins-light-url/job/panic-sdc-homepages/','color':'blue'}],'name':'blue','property':[],'url':'https://jenkins-light-url/view/blue/'}
        );

        $httpBackend.whenGET('{#JENKINS_URL#}/view/red/api/json').respond(
            {'description':null,'jobs':[{'name':'panic-sdc-homepages','url':'https://jenkins-light-url/job/panic-sdc-homepages/','color':'red'}],'name':'red','property':[],'url':'https://jenkins-light-url/view/red/'}
        );

        $httpBackend.whenGET('{#JENKINS_URL#}/view/none/api/json').respond(
            {'description':null,'jobs':[],'name':'none','property':[],'url':'https://jenkins-light-url/view/none/'}
        );

        $httpBackend.whenGET('{#JENKINS_URL#}/view/regexp/api/json').respond(function () {
            var jobs = [
                {'name':'regexp','url':'https://jenkins-light-url/job/regexp/','color':'red'},
                {'name':'a-regexp','url':'https://jenkins-light-url/job/a-regexp/','color':'blue'},
                {'name':'regexp-troll','url':'https://jenkins-light-url/job/regexp-troll/','color':'red'}
            ];

            return [200, {'description':null,'jobs':jobs,'name':'regexp','property':[],'url':'https://jenkins-light-url/view/regexp/'}];
        });
    });

angular.module('jenkinsLightApp').requires.push('e2e-mocks');
