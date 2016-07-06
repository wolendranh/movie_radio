#!/bin/bash
echo 'Running build script...'
echo 'Downloading Redis'
set -e
wget http://download.redis.io/redis-stable.tar.gz &&
tar xvzf redis-stable.tar.gz &&
cd redis-stable &&
make

echo 'Starting Redis'
redis-server

