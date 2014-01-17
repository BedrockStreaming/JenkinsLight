'use strict';

describe('jenkinsLightApp', function() {
    it('should be blue when job success', function() {
        browser().navigateTo('/#/?view=blue');
        expect(element('.job.job-color-red').count()).toBe(0);
        expect(element('.job.job-color-blue').count()).toBe(1);
        expect(element('#jenkinsLight').attr('style')).toBe(undefined);
    });

    it('should be red when job fails', function() {
        browser().navigateTo('/#/?view=red');
        expect(element('.job.job-color-red').count()).toBe(1);
        expect(element('.job.job-color-blue').count()).toBe(0);
        expect(element('#jenkinsLight').attr('style')).toBe(undefined);
    });

    it('should be background when no jobs is displayed', function() {
        browser().navigateTo('/#/?view=none');
        expect(element('.job.job-color-red').count()).toBe(0);
        expect(element('.job.job-color-blue').count()).toBe(0);
        expect(element('#jenkinsLight').attr('style')).toMatch('image-url-or-null');
    });

    it('should be not displays job when the title containing "dev"', function() {
        browser().navigateTo('/#/?view=regexp');
        expect(element('.job.job-color-red').count()).toBe(1);
        expect(element('.job.job-color-blue').count()).toBe(1);
        expect(element('#jenkinsLight').attr('style')).toBe(undefined);
    });
});
