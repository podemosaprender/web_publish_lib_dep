#!/usr/bin/bash

if jupyter 2>&1 | grep -q nbconvert ; then
	echo "nbconvert installed"
else 
	pip install jupyter nbconvert 2>&1 | tail 
fi

( cd site ; if ! [ -d node_modules ]; then npm ci --legacy-peer-deps ; fi )

cp -R _static/. site/public/ 
if [ -f site.js ]; then cp site.js site/src/config/site.js ; fi
if [ -f config.json ]; then cp config.json ./site/src/config/site_config.json ; fi
if [ -f template.html ]; then cat site/src/app/layout.js_head template.html site/src/app/layout.js_tail > site/src/app/layout.js ; fi
#A: archivos defaults y estaticos mas facil que hacerlo con node

node site/src/lib/to-next.mjs . ./site/src/app ./site/public

( cd site ; npm run build ) #OJO: Actions en RepoDocumentos espera HTML en site/out
