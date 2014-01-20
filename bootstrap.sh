#!/usr/bin/env bash

/etc/init.d/apache2 stop
sed -i 's/vagrant\/web/vagrant\/app/g' /etc/apache2/sites-available/apache2config.conf
/etc/init.d/apache2 start
apt-get install curl build-essential openssl libssl-dev
wget http://nodejs.org/dist/v0.10.17/node-v0.10.17.tar.gz
tar xzvf node-v0.10.17.tar.gz
cd node-v0.10.17
./configure
make
make install
curl http://npmjs.org/install.sh | sudo sh
npm install bower -g