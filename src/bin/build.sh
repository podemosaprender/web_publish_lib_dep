#!/usr/bin/bash

if jupyter 2>&1 | grep -q nbconvert ; then
	echo "nbconvert installed"
else 
	pip install jupyter nbconvert 2>&1 | tail 
fi

( cd site ; if ! [ -d node_modules ]; then npm ci --legacy-peer-deps ; fi )

node site/src/lib/to-next.mjs . ./site/src/app ./site/public

( cd site ; npm run build ) #OJO Actions en RepoDocumentos espera HTML en site/out
