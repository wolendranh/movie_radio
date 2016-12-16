#!/bin/bash

export WORKDIR=`pwd`
echo "(RE)Building Project ..."

echo "Activating virtual enviroment..."
source ../env/bin/activate

echo "Installing Python Dependencies..."
pip install -r requirements.txt
echo
CODE=$?
[ $CODE -ne 0 ] && exit $CODE

echo "Updating NPM packages..."
npm install
echo
CODE=$?
[ $CODE -ne 0 ] && exit $CODE

echo "Building Webpack Dev build ..."
./build_js.sh
echo
CODE=$?
[ $CODE -ne 0 ] && exit $CODE

echo "Project is built!!!"


