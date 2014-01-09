'use strict';

var job_status = {};

angular.module('jenkinsLightApp')
    .controller('JenkinsLightCtrl', function JenkinsLightCtrl ($scope, CONFIG, $http, $interval, $location) {
        $scope.jobs        = [];
        $scope.jobsPerLine = CONFIG.DEFAULT_JOBS_PER_LINE;

        var viewParameter = CONFIG.DEFAULT_JENKINS_VIEW;
        if ($location.search().view) {

            // Set the value of the view query parameter
            viewParameter = $location.search().view;
        }

        var callAPI = function () {

            var js_alert_error = false;

            // Call Jenkins API
            $http({method: 'GET', url: CONFIG.JENKINS_URL + '/view/' + viewParameter + '/api/json'}).
                success(function(data) {

                    $scope.jobs = [];
                    
                    data.jobs.forEach(function(job) {

                        // Check if this `job` can be displayable
                        if (CONFIG.JOBS_TO_BE_DISPLAYED.indexOf(job.color) > -1) {
                            
                            if(job.color == CONFIG.JOBS_TO_BE_DISPLAYED[1]){
                                if(job_status[job.url] == undefined
                                    || job_status[job.url] == CONFIG.JOBS_TO_BE_DISPLAYED[0]){
                                    js_alert_error = true;
                                }
                            }
                            job_status[job.url] = job.color;
                            
                            job.name = job.name.
                                split('-').join(' ').

                                // Remove all occurrence of view name in `job` name
                                split(new RegExp(viewParameter, 'gi')).join('');

                            // Push job on screen
                            $scope.jobs.push(job);
                        }
                    });

                    // Set the number of job per line
                    if ($scope.jobs.length <= 4) {
                        $scope.jobsPerLine = $scope.jobs.length;
                    } else if (($scope.jobs.length % 5) === 0 && $scope.jobs.length >= 30) {
                        $scope.jobsPerLine = 5;
                    } else if (($scope.jobs.length % 4) === 0) {
                        $scope.jobsPerLine = 4;
                    } else if (($scope.jobs.length % 3) === 0) {
                        $scope.jobsPerLine = 3;
                    }
                    
                    if(CONFIG.JS_ALERT_FAIL && js_alert_error == true){
                        alert(CONFIG.JS_ALERT_FAIL_MESSAGE);
                    }
                    
                });
        };

        callAPI();

        // Begin interval
        $interval(callAPI, CONFIG.REFRESH_TIME);
    });
