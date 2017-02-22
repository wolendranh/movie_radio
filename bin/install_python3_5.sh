#!/bin/bash

./

PYTHON_ARCHIVE=Python-3.5.1.tar.xz
PYTHON_DIR=Python-3.5.1
FTP_SOURCE=https://www.python.org/ftp/python/3.5.1/Python-3.5.1.tar.xz

echo "Starting install python 3.5..."


if [ ! -f $PYTHON_ARCHIVE ]
# skip downloading if archive already exists
then
    echo "$PYTHON_ARCHIVE not found! Will try to download..."
    echo "Downloading..."
    wget $FTP_SOURCE
    [ $CODE -ne 0 ] && exit $CODE
fi


echo "Unpacking $PYTHON_ARCHIVE package..."
tar xf $PYTHON_ARCHIVE
[ $CODE -ne 0 ] && exit $CODE

echo "Installion..."


cd $PYTHON_DIR
./configure
sudo make
sudo make altinstall
