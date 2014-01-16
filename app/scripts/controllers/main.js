'use strict';

angular.module('jenkinsLightApp')
    .controller('JenkinsLightCtrl', function JenkinsLightCtrl ($scope, CONFIG, JenkinsService, $interval) {
        $scope.jobs        = [];
        $scope.jobsPerLine = CONFIG.DEFAULT_JOBS_PER_LINE;

        var callAPI = function () {
            JenkinsService.getJobs().
                then(function (jobs) {
                    $scope.jobs = jobs;
                });
        };

        callAPI();

        // Begin interval
        $interval(callAPI, CONFIG.REFRESH_TIME);
    });
