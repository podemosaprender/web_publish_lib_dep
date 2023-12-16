#!/usr/bin/bash
#INFO: generate site locally using docker

APT_CACHE="`pwd`/x_run/apt"

docker run -it -v `pwd`:/app -w /app -v $APT_CACHE:/var/cache/apt ubuntu:22.04 /bin/bash -c './site/src/bin/setup-ubuntu.sh; $SHELL'


