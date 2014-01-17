'use strict';

angular.module('jenkinsLightApp')
    .controller('JenkinsLightCtrl', function JenkinsLightCtrl ($scope, CONFIG, JenkinsService, $interval) {
        $scope.jobs        = [];
        $scope.jobsPerLine = CONFIG.DEFAULT_JOBS_PER_LINE;

        var callAPI = function () {
            JenkinsService.getJobs().
                then(function (jobs) {
                    $scope.jobs = jobs;

                    // Display background image on blank screen
                    if (CONFIG.BACKGROUND_BLANK_SCREEN && $scope.jobs.length == 0) {
                        $scope.backgroundBlankScreen = {
                            'background-image': 'url(' + CONFIG.BACKGROUND_BLANK_SCREEN + ')'
                        };
                    }
                });
        };

        callAPI();

        // Begin interval
        $interval(callAPI, CONFIG.REFRESH_TIME);
    });
