'use strict';

angular.module('JenkinsLightApp')
    .controller('JenkinsLightCtrl', function JenkinsLightCtrl ($scope, CONFIG, $http, $timeout, $location) {
        $scope.jobsPerLine = CONFIG.DEFAULT_JOBS_PER_LINE;

        var viewParameter = $location.search().view ? $location.search().view.split(',') : CONFIG.DEFAULT_JENKINS_VIEW,
            fetchBuilds = function(job, cb) {
                $http({method: 'GET', url: job.url + 'api/json'})
                    .success(function(data) {
                        if((data.builds || []).length) {
                            job.build = data.builds[0];
                        }

                        (cb || function() {})();
                    });
            },
            fetchJob = function(job, view) {
                job.realname = job.name;
                job.name = job.name.replace(/[\-_\.]/gi, ' ').replace(view.name, '');
                job.status = job.color.replace('_anime', '');
                job.build = view.jobs[job.name] ? view.jobs[job.name].build : undefined;

                return job;
            },
            fetchView = function(viewName, url) {
                var cleanName = viewName.replace(/\/view\//gi, '/'),
                    currentView = _.find($scope.views, { name: cleanName });

                if(!currentView) {
                    currentView = { name: cleanName, realname: viewName, color: 'blue', disabled: '', jobs: {} };
                    $scope.views.push(currentView);
                }

                $http({method: 'GET', url: url})
                    .success(function(data) {
                        if(data.views) {
                            data.views.forEach(function(view) {
                                fetchView(viewName + '/view/' + view.name, view.url + 'api/json');
                            });
                        } else {
                            data.jobs.forEach(function(job) {
                                job = fetchJob(job, currentView);
                                currentView.jobs[job.name] = job;

                                if(['disabled', 'notbuilt', 'aborted'].indexOf(job.status) > -1) {
                                    var abbr = job.status.toUpperCase().substr(0, 1);

                                    if(currentView.disabled.indexOf(abbr) === -1) {
                                        currentView.disabled = (currentView.disabled || '') + abbr;
                                    }
                                }

                                if(['red', 'yellow'].indexOf(job.status) > -1) {
                                    currentView.color = job.status;

                                    fetchBuilds(job);
                                }
                            });

                            if($scope.opened.hasOwnProperty(currentView.name) === false) {
                                $scope.opened[currentView.name] = false;
                            }
                        }
                    });
            },
            callAPI = function () {
                viewParameter.forEach(function(view) {
                    fetchView(view, CONFIG.JENKINS_URL + '/view/' + view + '/api/json');
                });

                $timeout(callAPI, CONFIG.REFRESH_TIME);
            };

        $scope.views = [];
        $scope.opened = {};
        $scope.viewCount = function(view) {
            return Object.keys(view.jobs).length;
        };
        $scope.openView = function(view) {
            $scope.fetchBuilds(
                view,
                function() {
                    $scope.opened[view.name] = !$scope.opened[view.name];
                }
            );
        };
        $scope.fetchBuilds = function(view, cb) {
            var done = 0,
                count = 0;

            cb = cb || function() {};

            if($scope.opened[view.name] === false) {
                count = Object.keys(view.jobs).length;

                angular.forEach(
                    view.jobs,
                    function(job) {
                        fetchBuilds(job, function() { if(++done === count) { cb(); } });
                    }
                );
            } else {
                cb();
            }
        };

        callAPI();
    });
