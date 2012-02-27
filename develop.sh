#!/bin/sh
which git >/dev/null 2>&1 || (echo "Git not in PATH" >2 && exit 1)
git remote|grep -q impressjs || git remote add impressjs https://github.com/bartaz/impress.js.git
git checkout master
git fetch impressjs
git checkout impressjs/master -- js/impress.js
