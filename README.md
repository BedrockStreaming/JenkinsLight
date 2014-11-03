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

Jenkins options :

* **CI.JENKINS.URL** : Jenkins server url
* **CI.JENKINS.AUTHORIZATION_TOKEN** : authorization token if your Jenkins server is secured, eg: "Basic 0123456=" (opt.)
* **CI.JENKINS.DEFAULT_VIEW** : default Jenkins view to display, eg : "All"
* **CI.JENKINS.JOBS_TO_BE_DISPLAYED** : array of all job types that can be displayed :
  * *red* : failing job,
  * *red_anime* : building failed job,
  * *blue* : succeeding job,
  * *blue_anime* : building succeeded job.

Display options :

* **MAX_JOBS_PER_LINE** : maximum number of jobs displayed per line
* **REFRESH_TIME** : refresh time (ms)
* **BACKGROUND_BLANK_SCREEN_URL** : background image url use if no job are dislayed
* **JOBS_NOT_DISPLAYED_REGEXP** : exclude jobs which name match this regexp

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

#### Clone and init the project

```
$ git clone https://github.com/M6Web/JenkinsLight.git
$ cd JenkinsLight/vagrant
$ git submodule install --init
```

Install [Vagrant](http://www.vagrantup.com/downloads) and configure `Vagrantfile` :

```
$ cp Vagrantfile.dist Vagrantfile
```

*Note : configure your own Vagrantfile and provisionning if necessary.*

```
$ vagrant up
$ vagrant ssh
$ cd /vagrant
```

#### Install dependencies

```
$ sudo npm install --no-bin-links
$ bower install
```

[Configure your application](#configuration) via `app/scripts/config.js`.

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

Developed by the [Cytron Team](http://cytron.fr/) of [M6 Web](http://tech.m6web.fr/).

## License

[JenkinsLight](https://github.com/M6Web/JenkinsLight) is licensed under the [MIT license](LICENSE).
