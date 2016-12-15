#!/bin/bash

export WORKDIR=`pwd`
export PYTHONPATH=$WORKDIR

source $WORKDIR/../env/bin/activate
python app.py