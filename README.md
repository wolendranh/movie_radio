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
7. pip install virtualenv
8. virtualenv -p python3.5 env
9. pip install - r requirments.txt
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
To run project

In case if you do not  have Python 3.5:
```
    wget https://www.python.org/ftp/python/3.5.1/Python-3.5.1.tar.xz
    tar xf Python-3.5.1.tar.xz
    cd Python-3.5.1.tar.xz
    ./configure
    make
    make altinstall
```
2. Install Prerequisites required for the packages this project uses:

```
    sudo apt-get install libreadline-dev 
    sudo apt-get install python3-dev    # debian / Ubuntu
```


- go to your project dir
- activate your virtual env
(source env/bin/activate)
- python app.py
 
