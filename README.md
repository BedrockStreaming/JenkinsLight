# JenkinsLight [![Build Status](https://api.travis-ci.org/M6Web/JenkinsLight.png?branch=master)](http://travis-ci.org/M6Web/JenkinsLight)

A build monitoring tool (buildwall) that allows you to quickly detect failing projects for Jenkins.

![JenkinsLight](http://img818.imageshack.us/img818/6423/mz5c.png "JenkinsLight")

## Requirements

This project required a [cors-plugin Jenkins plugin](https://github.com/jhinrichsen/cors-plugin) to enabled CORS.
Enabling CORS would let you call the Jenkins REST API from javascript (you can use [the provided packaged plugin](bin/cors.hpi)).

## Installation

#### Clone the project

```
$ git clone https://github.com/M6Web/JenkinsLight.git
$ cd JenkinsLight
```

#### Install dependencies

```
$ npm install -g bower grunt-cli
$ npm install
$ bower install
```

## Configuration

Please configure a new `app/scripts/config.js` file from [`app/scripts/config.js.dist`](app/scripts/config.js.dist).

| Option | Description |
|--------|-------------|
| CI.JENKINS.URL | Jenkins server url |
| CI.JENKINS.AUTHORIZATION_TOKEN | If your jenkins server is secured, set your authoriaztion token like "Basic 0123456=" (opt.) |
| CI.JENKINS.DEFAULT_VIEW | Default view. Like "All"|
| CI.JENKINS.JOBS_TO_BE_DISPLAYED | Array of all jobs types that can be displayed |
| DEFAULT_JOBS_PER_LINE | Default number of jobs per line on a screen |
| REFRESH_TIME | Refresh time (ms) |
| BACKGROUND_BLANK_SCREEN_URL | Displays background if no job is displayed |
| JOBS_NOT_DISPLAYED_REGEXP | Not displayed jobs whose title is in the RegExp |


Then you have to build the server code.

```shell
$ grunt build
```

Your server root url must target the `dist` folder.

## Use

Use `view` query parameter for select a Jenkins view.

```
http://jenkins-light-url/index.html#?view=MyView
```

## Installation for dev

#### Clone the project

```
$ git clone https://github.com/M6Web/JenkinsLight.git
$ cd JenkinsLight/vagrant
```

Install [Vagrant](http://www.vagrantup.com/downloads) and run the VM :

```
$ vagrant up
$ vagrant ssh
$ cd /vagrant
```

*Note : configure your own Vagrantfile and provisionning if necessary.*

#### Install dependencies

```
$ sudo npm install
$ bower install
```

*Note : you must add `--no-bin-links` option to `npm install` on Windows.*

#### Run the server

```
$ grunt server
```

You can now access the application at `http://localhost:8888`.

## Tests

```shell
$ npm test
```

## Credits

Developped by the [Cytron Team](http://cytron.fr/) of [M6 Web](http://tech.m6web.fr/).

## License

[JenkinsLight](https://github.com/M6Web/JenkinsLight) is licensed under the [MIT license](LICENSE).
