#!/usr/bin/env bash

sudo apt-get update
sudo apt-get -y install python-software-properties

sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update

sudo apt-get -y install build-essential 
sudo apt-get -y install git
sudo apt-get -y install nodejs

sudo npm install -g grunt-cli bower
