# movie_radio
simple radio page, that will play stream from Icecast server

#####to install project on clean VM:
(Python related stuff)


```
1. sudo apt-get install git
2. sudo apt-get install python-pip
next line is for working python 3 terminal interpreter
3. sudo apt-get install libreadline-dev
 SSL related dev libs
4. apt-get install -y make build-essential libssl-dev zlib1g-dev libbz2-dev libsqlite3-dev
5. sudo apt-get install build-essential python-dev python-setuptools python-pip python-smbus
6. sudo apt-get install libffi-dev
7. Install python >=3.5 (see Install Python Section)
8. pip install virtualenv
9. virtualenv -p python3.5 env
10. pip install - r requirments.txt
```
#####Install python(if not already installed)
In case if you do not  have Python 3.5:
```
    wget https://www.python.org/ftp/python/3.5.1/Python-3.5.1.tar.xz
    tar xf Python-3.5.1.tar.xz
    cd Python-3.5.1.tar.xz
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
```
(to omit issue with /usr/bin/env: node: No such file or directory)
 
#####Install icecast2 server
```
sudo apt-get install icecast2
```
(default icecast config is here /etc/icecast2/icecast.xml)

#####Install Redis
```
wget http://download.redis.io/releases/redis-stable.tar.gz
tar xzf redis-stable.tar.gz
cd redis-stable
make
make install
cd utils
sudo ./install_server.sh
```


#####Production related
```
1. sudo apt-get install nginx
2. setup nginx conf file in sites-available(and simlink to sites enabled)
3. sudo apt-et install supervisor  
```
#####Install Redis(for pub sub)
```
wget http://download.redis.io/redis-stable.tar.gz
tar xvzf redis-stable.tar.gz
cd redis-stable
make
```

#####Setup Nginx
...
#####Setup Supervisor
...

To run project in dev env

```
virtualenv env/bin/activate
python app.py
```
#####TODO:
 - add setup of streaming
 - add setup on production
 - pack this all monster into setup script, ansible, docker, anything...
