#!/bin/bash
./
echo "Starting install python 3.5..."

echo "Downloading..."
wget https://www.python.org/ftp/python/3.5.1/Python-3.5.1.tar.xz
[ $CODE -ne 0 ] && exit $CODE

echo "Unpacking package..."
tar xf Python-3.5.1.tar.xz
[ $CODE -ne 0 ] && exit $CODE

echo "Installion..."
cd Python-3.5.1
./configure
sudo make
sudo make altinstall
