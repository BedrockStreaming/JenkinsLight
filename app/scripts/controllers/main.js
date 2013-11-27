'use strict';

angular.module('jenkinsLightApp')
    .controller('JenkinsLightCtrl', function JenkinsLightCtrl ($scope, CONFIG, $http, $timeout, $location) {
        $scope.jobsPerLine = CONFIG.DEFAULT_JOBS_PER_LINE;

        var viewParameter = $location.search().view ? $location.search().view.split(',') : CONFIG.DEFAULT_JENKINS_VIEW,
            fetchView = function(viewName, url) {
                var cleanName = viewName.replace(/\/view\//gi, '/'),
                    currentView = _.find($scope.views, { name: cleanName });

                if(!currentView) {
                    $scope.views.push(currentView = { name: cleanName, realname: viewName, color: 'blue', jobs: {} });
                }

                $http({method: 'GET', url: url}).
                    success(function(data) {
                        if(data.views) {
                            data.views.forEach(function(view) {
                                fetchView(viewName + '/view/' + view.name, view.url + 'api/json');
                            });
                        } else {
                            data.jobs.forEach(function(job) {
                                if (CONFIG.JOBS_TO_BE_DISPLAYED.indexOf(job.color) > -1) {
                                    job.name = job.name
                                        .replace(/[\-_\.]/gi, ' ')
                                        .replace(new RegExp(viewName, 'gi'), '');

                                    currentView.jobs[job.name] = job;

                                    if(['disabled', 'disabled_anime'].indexOf(job.color) > -1) {
                                        currentView.disabled = true;
                                    }

                                    if(['red', 'red_anime'].indexOf(job.color) > -1) {
                                        currentView.color = 'red';

                                        $http({method: 'GET', url: job.url + 'api/json' }).
                                            success(function(data) {
                                                if((data.builds || []).length) {
                                                    currentView.jobs[job.name].build = data.builds[0].number;
                                                }
                                            });
                                    }
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
        $scope.viewCount = function(name) {
            var view;

            return (
                (view = _.find($scope.views, { name: name })) &&
                Object.keys(view.jobs).length > 0
            );
        };

        callAPI();
    });
