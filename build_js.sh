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
    *)
esac

if [ $WATCH ];
then
    echo option used "${WATCH}"
    $command $WATCH
else
    $command
fi

