'use strict';

angular.module('e2e-mocks', ['ngMockE2E'])
    .run(function($httpBackend) {
        // Don't mock the html views
        $httpBackend.whenGET(/views\/\w+.*/).passThrough();

        $httpBackend.whenGET('{#JENKINS_URL#}/view/blue/api/json').respond(
            {'description':null,'jobs':[{'name':'panic-sdc-homepages','url':'https://jenkins-master.m6web.fr/job/panic-sdc-homepages/','color':'blue'}],'name':'blue','property':[],'url':'https://jenkins-master.m6web.fr/view/blue/'}
        );

        $httpBackend.whenGET('{#JENKINS_URL#}/view/red/api/json').respond(
            {'description':null,'jobs':[{'name':'panic-sdc-homepages','url':'https://jenkins-master.m6web.fr/job/panic-sdc-homepages/','color':'red'}],'name':'red','property':[],'url':'https://jenkins-master.m6web.fr/view/red/'}
        );

        $httpBackend.whenGET('{#JENKINS_URL#}/view/none/api/json').respond(
            {'description':null,'jobs':[],'name':'none','property':[],'url':'https://jenkins-master.m6web.fr/view/none/'}
        );
    });

angular.module('jenkinsLightApp').requires.push('e2e-mocks');
