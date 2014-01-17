'use strict';

describe('jenkinsLightApp', function() {
    it('should be blue when job success', function() {
        browser().navigateTo('/#/?view=blue');
        expect(element('.job.job-color-red').count()).toBeFalsy();
        expect(element('.job.job-color-blue').count()).toBeTruthy();
        expect(element('#jenkinsLight').attr('style')).toBe(undefined);
    });

    it('should be red when job fails', function() {
        browser().navigateTo('/#/?view=red');
        expect(element('.job.job-color-red').count()).toBeTruthy();
        expect(element('.job.job-color-blue').count()).toBeFalsy();
        expect(element('#jenkinsLight').attr('style')).toBe(undefined);
    });

    it('should be none when job fails', function() {
        browser().navigateTo('/#/?view=none');
        expect(element('.job.job-color-red').count()).toBeFalsy();
        expect(element('.job.job-color-blue').count()).toBeFalsy();
        expect(element('#jenkinsLight').attr('style')).toMatch('image-url-or-null');
    });
});
