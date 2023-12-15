#!/usr/bin/bash
#INFO: setup packages inside ubuntu docker container

apt update
apt install -y python3.10 pip graphviz curl
#A: installed packages from apt

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
. ~/.bashrc
nvm install 18
nvm use 18

