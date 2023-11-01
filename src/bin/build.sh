#!/usr/bin/bash

pip install jupyter nbconvert

( cd site ; npm ci --legacy-peer-deps )

node site/src/lib/to-next.mjs . ./site/src/app

( cd site ; npm run build ) #OJO Actions en RepoDocumentos espera HTML en site/out