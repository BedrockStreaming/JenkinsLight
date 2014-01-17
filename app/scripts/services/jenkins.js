'use strict';

angular.module('jenkinsLightApp')
    .factory('JenkinsService', function (CONFIG, $location, $http) {
        return {
            getJobs: function () {
                var viewParameter = CONFIG.CI.JENKINS.DEFAULT_VIEW;
                if ($location.search().view) {

                    // Set the value of the view query parameter
                    viewParameter = $location.search().view;
                }

                // Call Jenkins API
                var promise = $http({method: 'GET', url: CONFIG.CI.JENKINS.URL + '/view/' + viewParameter + '/api/json'}).
                    then(function(response) {

                        // Initialize jobs data
                        var data = response.data;
                        var jobs = [];

                        data.jobs.forEach(function(job) {

                            // Check if this `job` can be displayable
                            if (CONFIG.CI.JENKINS.JOBS_TO_BE_DISPLAYED.indexOf(job.color) > -1) {

                                // Filter jobs not displayed
                                if (CONFIG.JOBS_NOT_DISPLAYED && new RegExp(CONFIG.JOBS_NOT_DISPLAYED, 'gi').test(job.name)) {
                                    return;
                                }

                                job.name = job.name.
                                    split('-').join(' ').

                                    // Remove all occurrence of view name in `job` name
                                    split(new RegExp(viewParameter, 'gi')).join('');

                                // Push job on screen
                                jobs .push(job);
                            }
                        });

                        // Return jobs filtered
                        return jobs;
                    });

                // Return the promise to the controller
                return promise;
            }
        };
    });
