#!/bin/bash

export WORKDIR=`pwd`
export PYTHONPATH=$WORKDIR

source $WORKDIR/../env/bin/activate
python bin/create_super_user.py --email $1 --password $2