angular.module('config', [])
    .constant('CONFIG', {
        'JENKINS_URL': 'https://jenkins-master.m6web.fr',
        'AUTHORIZATION_TOKEN': 'Basic bV9icnVub3Q6bmNMbms5TU0=',
        'DEFAULT_JENKINS_VIEW': 'All',
        'JOBS_TO_BE_DISPLAYED': ['blue', 'red', 'blue_anime', 'red_anime'],
        'DEFAULT_JOBS_PER_LINE': 4,
        'REFRESH_TIME': 10000
    });
