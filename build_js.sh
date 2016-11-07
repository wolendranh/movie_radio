#!/bin/bash
# run the WebPack build with command line args or without

key="$1"

#echo $1 $2 $3 ' -> echo $1 $2 $3'

WORK_DIR=eval 'pwd'
command=".$WORK_DIR/node_modules/webpack/bin/webpack.js"

case $key in
    -w|--watch)
    WATCH="$1"
    ;;
    -p|--production)
    PRODUCTION="$1"
    ;;
    -d|--dev)
    DEV="$1"
    ;;
    *)
esac

if [ $WATCH ];
then
    echo option used "${WATCH}"
    $command $WATCH
fi
if [ $PRODUCTION ];
then
    echo building production bundle ...
    $command -p --config ./webpack-prod.config.js
fi
if [ $DEV ];
then
    echo building dev bundle ...
    $command --config ./webpack.config.js
fi
if ! [ $key ];
then
    echo no options were provided. Building regular dev build
    $command
fi