'use strict';

angular.module('jenkinsLightApp')
    .controller('JenkinsLightCtrl', function JenkinsLightCtrl ($scope, CONFIG, $http, $timeout, $location) {
        $scope.jobsPerLine = CONFIG.DEFAULT_JOBS_PER_LINE;

        var viewParameter = $location.search().view ? $location.search().view : CONFIG.DEFAULT_JENKINS_VIEW,
            fetchView = function(viewName, url) {
                var cleanName = viewName.replace(/\/view\//gi, '/');

                if($scope.views.hasOwnProperty(cleanName) === false) {
                    $scope.views[cleanName] = { realname: viewName, jobs: {} };
                }

                $http({method: 'GET', url: url}).
                    success(function(data) {
                        if(data.views) {
                            data.views.forEach(function(view) {
                                fetchView(viewName + '/view/' + view.name, view.url + 'api/json');
                            });
                        } else {
                            data.jobs.forEach(function(job) {
                                // Check if this `job` can be displayable
                                if (CONFIG.JOBS_TO_BE_DISPLAYED.indexOf(job.color) > -1) {
                                    job.name = job.name.
                                        split('-').join(' ').
                                        split('_').join(' ').
                                        split('.').join(' ').
                                        // Remove all occurrence of view name in `job` name
                                        split(new RegExp(viewParameter, 'gi')).join('');

                                    $scope.views[cleanName].jobs[job.name] = job;
                                }
                            });
                        }
                    });
            },
            callAPI = function () {
                fetchView(viewParameter, CONFIG.JENKINS_URL + '/view/' + viewParameter + '/api/json');

                $timeout(callAPI, CONFIG.REFRESH_TIME);
            };

        $scope.views = {};
        $scope.viewCount = function(name) {
            return Object.keys($scope.views[name].jobs).length;
        };

        callAPI();
    });
