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
                job.name = job.name.replace(new RegExp(view.name, 'gi'), '').replace(/[\-_\.]/gi, ' ');
                job.status = job.color.replace('_anime', '');
                job.build = view.jobs[job.name] ? view.jobs[job.name].build : undefined;
                job.disabled = '';
                job.animated = false;

                if(['disabled', 'notbuilt', 'aborted'].indexOf(job.status) > -1) {
                    job.disabled = job.status.toUpperCase().substr(0, 1);
                }

                return job;
            },
            fetchView = function(viewName, url) {
                var currentView = _.find($scope.views, { realname: viewName });

                if(!currentView) {
                    currentView = {
                        name: viewName.replace(/\/view\//gi, '/'),
                        realname: viewName,
                        color: 'blue',
                        disabled: '',
                        animated: false,
                        jobs: {}
                    };

                    $scope.opened[currentView.name] = false;
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
                                    if(currentView.disabled.indexOf(job.disabled) === -1) {
                                        currentView.disabled = (currentView.disabled === undefined ? '' : currentView.disabled) + job.disabled;
                                    }
                                }

                                if(['red', 'yellow'].indexOf(job.status) > -1) {
                                    currentView.color = job.status;
                                }

                                if(job.color.indexOf('_anime') > -1) {
                                    job.animated = currentView.animated = true;
                                }

                                if(['red', 'yellow', 'notbuilt', 'aborted'].indexOf(job.status) > -1) {
                                    fetchBuilds(job);
                                }
                            });
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
