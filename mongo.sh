#!/bin/sh

PATH=`realpath .`
TARGET="/data"

DATAPATH=$PATH$TARGET

/usr/bin/mongod --dbpath $DATAPATH
