# movie_radio
simple radio page, that will play stream from Icecast server

###to install project on clean VM:
#####Step 1 — Installing Ansible
Add the Ansible PPA and refresh your system's package index, install the ansible
by typing the following commands:

```
$ sudo apt-add-repository ppa:ansible/ansible
$ sudo apt-get update
$ sudo apt-get install ansible
```

#####Step 2 — Configuring Ansible Hosts
Open the file with root privileges like this:

```
$ sudo vim /etc/ansible/hosts
```

Add the following configuration:

```
[barmaglot]
your_server_ip
```

Make sure that you have ssh connection to host that was specified
and test connection via ansible:

```
$ ssh root@your_server_ip
$ ansible -m ping all
```

#####Step 3 — Install Python3.5(if not already installed)
In case if you do not have Python 3.5:

```
$ cd ansible
$ ansible-playbook -s playbooks/install_python.yml  --ask-sudo-pass
>>>
Please enter the app_dir: `project_root`/movie_radio
```

#####Step 4 — Run Building Env Playlist
For building environment

```
$ cd ansible
$ ansible-playbook -s playbooks/system_packages.yml  --ask-sudo-pass
>>>
Please enter the virtualenv_dir: `path_to_virtual_env`
Please enter the app_dir: `project_root`/movie_radio
```

###Install icecast2 server
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


###Production related
Run Ansible Production playbook

```
$  ansible-playbook -s playbooks/production.yml  --ask-sudo-pass
```

###Setup Mongo DB
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

To run project in dev env

```
$ ./bin/run_radio.sh
```

#####TODO:
 - add setup of streaming
 - add setup on production
 - pack this all monster into setup script, ansible, docker, anything...
