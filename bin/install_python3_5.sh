#!/bin/bash

./

PYTHON_ARCHIVE=Python-3.5.1.tar.xz
echo "Starting install python 3.5..."

echo $PYTHON_ARCHIVE

if [ ! -f $PYTHON_ARCHIVE ]
then
    echo "$PYTHON_ARCHIVE not found! Will try to download..."
    echo "Downloading..."
    wget https://www.python.org/ftp/python/3.5.1/Python-3.5.1.tar.xz
    [ $CODE -ne 0 ] && exit $CODE
fi


echo "Unpacking $PYTHON_ARCHIVE package..."
tar xf Python-3.5.1.tar.xz
[ $CODE -ne 0 ] && exit $CODE

echo "Installion..."
cd Python-3.5.1
./configure
sudo make
sudo make altinstall
