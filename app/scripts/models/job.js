'use strict';

angular.module('jenkinsLightApp')

    /**
     * Defined Job prototype
     *
     * @type Job Object
     */
    .factory('JobModel', function (CONFIG) {
        return {

            /**
             * Status constant
             */
            STATUS_PASSED: 'passed',
            STATUS_FAILED: 'failed',
            STATUS_BUILDING: 'building',
            STATUS_UNKNOWN: 'unknown',

            /**
             * Object attributes
             */
            name: 'unknown',
            url: 'unknown',
            status: 'unknown',
            description: 'unknown',

            /**
             * Constructor
             *
             * @param string name
             * @param string url
             * @param string status
             *
             * @return Job
             */
            init: function (name, url, status, description) {
                this.name = name;
                this.url = url;
                this.status = status;
                this.description = description;

                return angular.copy(this);
            },

            /**
             * Check if job can be displayable
             *
             * @return boolean
             */
            isDisplayable: function () {

                // Check job status
                if (CONFIG.JOBS_TO_BE_DISPLAYED.indexOf(this.status) == -1) {
                    return false;
                }

                // Check regexp
                if (CONFIG.JOBS_NOT_DISPLAYED_REGEXP && new RegExp(CONFIG.JOBS_NOT_DISPLAYED_REGEXP, 'gi').test(this.name)) {
                    return false;
                }

                return true;
            },

            /**
             * Improve job name
             *
             * @param Function callback
             *
             * @return Job
             */
            improveName: function (callback) {
                this.name = this.name.
                    split('-').join(' ');

                // Specifics changes
                if (callback) {
                    this.name = callback(this.name);
                }

                return this;
            }
        }

    });
