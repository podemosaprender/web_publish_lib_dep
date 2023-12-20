#!/usr/bin/bash
#INFO: generate site locally using docker

APT_CACHE="`pwd`/x_run/apt"

if pwd --help | grep -- -W ; then docker_pwd=`pwd -W` ; fi
if [ -z "$docker_pwd" ] && which cygpath ; then docker_pwd=`cygpath -w -a .`; fi
if [ -z "$docker_pwd" ]; then docker_pwd=`pwd`; fi

docker run -it -v "$docker_pwd":/app -w /app -v $APT_CACHE:/var/cache/apt ubuntu:22.04 /bin/bash -c './site/src/bin/setup-ubuntu.sh; $SHELL'


