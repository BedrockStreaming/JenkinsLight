'use strict';

angular.module('e2e-mocks', ['ngMockE2E'])
    .run(function($httpBackend) {
        // Don't mock the html views
        $httpBackend.whenGET(/views\/\w+.*/).passThrough();

        $httpBackend.whenGET('{#JENKINS_URL#}/view/blue/api/json').respond(
            {'description':null,'jobs':[{'name':'panic-sdc-homepages','url':'https://jenkins-master.m6web.fr/job/panic-sdc-homepages/','color':'blue'}],'name':'Panic','property':[],'url':'https://jenkins-master.m6web.fr/view/Panic/'}
        );

        $httpBackend.whenGET('{#JENKINS_URL#}/view/red/api/json').respond(
            {'description':null,'jobs':[{'name':'panic-sdc-homepages','url':'https://jenkins-master.m6web.fr/job/panic-sdc-homepages/','color':'red'}],'name':'Panic','property':[],'url':'https://jenkins-master.m6web.fr/view/Panic/'}
        );
    });
 
angular.module('jenkinsLightApp').requires.push('e2e-mocks');