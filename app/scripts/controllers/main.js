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
                    var minJobWidth  = 200;
                    var screenHeigth = $window.innerHeight;
                    var screenWidth  = $window.innerWidth;
                    var oneJobArea   = Math.floor(screenHeigth * screenWidth / jobs.length);

                    var oneJobWidth, oneJobHeight, jobsPerColumn, jobsPerLine;
                    var sizeSet      = [];
                    var noFitSizeSet = [];

                    for (var i = 1; i <= CONFIG.MAX_JOBS_PER_LINE; i++) {
                        jobsPerLine  = i;
                        oneJobWidth  = Math.floor(screenWidth / jobsPerLine);
                        oneJobHeight = Math.floor(oneJobArea / oneJobWidth);

                        if (oneJobHeight < minJobHeight) {
                            oneJobHeight = minJobHeight;
                        }

                        jobsPerColumn = Math.floor(screenHeigth / oneJobHeight);

                        if ((jobsPerColumn * jobsPerLine >= jobs.length) && (oneJobWidth >= minJobWidth)) {
                            sizeSet.push({'oneJobHeight': oneJobHeight, 'jobsPerLine': jobsPerLine});
                        } else if (oneJobWidth >= minJobWidth) {
                            noFitSizeSet.push({'oneJobHeight': oneJobHeight, 'jobsPerLine': jobsPerLine});
                        }
                    }

                    if (sizeSet.length == 1) {
                        oneJobHeight = sizeSet[0]['oneJobHeight'];
                        jobsPerLine  = sizeSet[0]['jobsPerLine'];
                    } else if (sizeSet.length > 1) {
                        var index = Math.ceil(sizeSet.length / 2) - 1;

                        oneJobHeight = sizeSet[index]['oneJobHeight'];
                        jobsPerLine  = sizeSet[index]['jobsPerLine'];
                    } else if (noFitSizeSet.length != CONFIG.MAX_JOBS_PER_LINE) {
                        var index = Math.ceil(noFitSizeSet.length / 2) - 1;

                        oneJobHeight = noFitSizeSet[index]['oneJobHeight'];
                        jobsPerLine  = noFitSizeSet[index]['jobsPerLine'];
                    }

                    var fontSize = Math.floor(15 * (oneJobHeight / minJobHeight));

                    $scope.oneJobHeight = oneJobHeight;
                    $scope.jobsPerLine  = jobsPerLine;
                    $scope.jobs         = jobs;
                    $scope.fontSize     = fontSize;
                });
        };

        callAPI();

        // Begin interval
        $interval(callAPI, CONFIG.REFRESH_TIME);
    });
