'use strict';

angular.module('jenkinsLightApp')
    .controller('JenkinsLightCtrl', function JenkinsLightCtrl ($scope, $window, CONFIG, JenkinsService, $interval) {
        $scope.jobs                  = [];
        $scope.jobsPerLine           = CONFIG.DEFAULT_JOBS_PER_LINE;
        $scope.backgroundBlankScreen = null;

        var callAPI = function () {
            JenkinsService.getJobs().
                then(function (jobs) {

                    // Display background image on blank screen
                    if (CONFIG.BACKGROUND_BLANK_SCREEN_URL) {
                        if (jobs.length == 0) {
                            $scope.backgroundBlankScreen = {
                                'background-image': 'url(' + CONFIG.BACKGROUND_BLANK_SCREEN_URL + ')'
                            };
                        } else {
                            $scope.backgroundBlankScreen = null;
                        }
                    }

                    // Calculation of optimized job area
                    var minJobHeight = 100;
                    var screenHeigth = $window.innerHeight;
                    var screenWidth  = $window.innerWidth;
                    var oneJobArea   = Math.floor(screenHeigth * screenWidth / jobs.length);

                    var oneJobWidth, oneJobHeight, jobsPerColumn, jobsPerLine;

                    for (var i = 1; i <= CONFIG.MAX_JOBS_PER_LINE; i++) {
                        jobsPerLine  = i;
                        oneJobWidth  = Math.floor(screenWidth / jobsPerLine);
                        oneJobHeight = Math.floor(oneJobArea / oneJobWidth);

                        if (oneJobHeight < minJobHeight) {
                            oneJobHeight = minJobHeight;
                        }

                        jobsPerColumn = Math.floor(screenHeigth / oneJobHeight);

                        if (jobsPerColumn * jobsPerLine >= jobs.length) {
                            break;
                        }
                    }

                    $scope.oneJobHeight = oneJobHeight;
                    $scope.jobsPerLine = jobsPerLine;
                    $scope.jobs = jobs;
                });
        };

        callAPI();

        // Begin interval
        $interval(callAPI, CONFIG.REFRESH_TIME);
    });
