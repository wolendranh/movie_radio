# movie_radio
simple radio page, that will play stream from Icecast server

[![Build Status](https://travis-ci.org/wolendranh/movie_radio.svg?branch=master)](https://travis-ci.org/wolendranh/movie_radio)
[![codecov](https://codecov.io/gh/wolendranh/movie_radio/branch/master/graph/badge.svg)](https://codecov.io/gh/wolendranh/movie_radio)


#####to install project on clean VM:
(Python related stuff)


```
1. sudo apt-get install git
2. sudo apt-get install python-pip
next line is for working python 3 terminal interpreter
3. sudo apt-get install libreadline-dev
 SSL related dev libs
4. sudo apt-get install -y make build-essential libssl-dev zlib1g-dev libbz2-dev libsqlite3-dev
5. sudo apt-get install build-essential python-dev python-setuptools python-pip python-smbus
6. sudo apt-get install libffi-dev
7. Install python >=3.5 (see Install Python Section)
8. pip install virtualenv
9. virtualenv -p python3.5 env
Activate virtual env
10.source env/bin/activate
11.pip install -r requirments.txt
```
#####Install python(if not already installed)
In case if you do not  have Python 3.5:
```
    wget https://www.python.org/ftp/python/3.5.1/Python-3.5.1.tar.xz
    tar xf Python-3.5.1.tar.xz
    cd Python-3.5.1
    ./configure
    make
    make altinstall
```


#####to install project on clean VM:
(JS related stuff)

```
1. sudo apt-get install nodejs
2. sudo apt-get install npm
3. npm install
4. ln -s /usr/bin/nodejs /usr/bin/node
5. ./build_js.sh
```
(to omit issue with /usr/bin/env: node: No such file or directory)

#####Install icecast2 server
server is being installed from Xiph repo's because Ubuntu one don't always have latest version.
```
sudo sh -c "echo deb http://download.opensuse.org/repositories/multimedia:/xiph/xUbuntu_14.04/ ./ >>/etc/apt/sources.list.d/icecast.list"
wget http://icecast.org/multimedia-obs.key
gpg multimedia-obs.key
sudo apt-key add multimedia-obs.key
sudo apt-get update
sudo apt-get
sudo apt-get install icecast2
```
(default icecast config is here /etc/icecast2/icecast.xml)


#####Production related
```
1. sudo apt-get install nginx
2. setup nginx conf file in sites-available(and simlink to sites enabled)
3. sudo apt-get install supervisor
```

#####Setup Mongo DB
```
sudo touch /etc/apt/sources.list.d/mongodb-org-3.2.list
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse"
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
sudo apt-get update
sudo apt-get install -y mongodb-org
```
In case if you have issues with encoding:
```
export LC_ALL=C
```



#####Setup Nginx

```
```

...
#####Setup Supervisor
...

To run project in dev env

```
python app.py
```
#####TODO:
 - add setup of streaming
 - add setup on production
 - pack this all monster into setup script, ansible, docker, anything...
