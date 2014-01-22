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
                    var screenHeigth = $window.innerHeight - 40;
                    var screenWidth  = $window.innerWidth;
                    var sizeSet      = [];
                    var oneJobWidth, oneJobHeight, jobsPerColumn, jobsPerLine;

                    for (var i = 0; i <= CONFIG.MAX_JOBS_PER_LINE ; i++) {
                        jobsPerLine   = i;
                        jobsPerColumn = Math.ceil(jobs.length / jobsPerLine);
                        oneJobWidth   = Math.ceil(screenWidth / jobsPerLine);
                        oneJobHeight  = Math.ceil(screenHeigth / jobsPerColumn);

                        if (oneJobHeight < minJobHeight) {
                            oneJobHeight = minJobHeight;
                        }

                        sizeSet.push({'oneJobHeight': oneJobHeight, 'jobsPerLine': jobsPerLine, 'ratio': oneJobWidth / oneJobHeight});
                    }

                    // Searching ratio most closer to 4
                    var baseRatio = 4;
                    sizeSet.sort(function(a, b) {
                        return (Math.abs(a['ratio'] - baseRatio) > Math.abs(b['ratio'] - baseRatio)) ? 1 : -1;
                    });

                    oneJobHeight = sizeSet[0]['oneJobHeight'];
                    jobsPerLine  = sizeSet[0]['jobsPerLine'];

                    var fontSize = Math.floor(15 * (oneJobHeight / minJobHeight));

                    $scope.oneJobHeight = oneJobHeight;
                    $scope.jobsPerLine  = jobsPerLine;
                    $scope.fontSize     = fontSize;
                    $scope.jobs         = jobs;
                });
        };

        callAPI();

        // Begin interval
        $interval(callAPI, CONFIG.REFRESH_TIME);
    });
