'use strict';

describe('jenkinsLightApp', function() {
    it('should be blue when job success', function() {
        browser().navigateTo('/#/?view=blue');
        expect(element('.job.job-color-red').count()).toBe(0);
        expect(element('.job.job-color-blue').count()).toBe(1);
    });

    it('should be red when job fails', function() {
        browser().navigateTo('/#/?view=red');
        expect(element('.job.job-color-red').count()).toBe(1);
        expect(element('.job.job-color-blue').count()).toBe(0);
    });
});
