#!/bin/sh
FILES="index.html lectures img myjs css"
which git >/dev/null 2>&1 || (echo "Git not in PATH" >2 && exit 1)
git remote|grep -q impressjs || git remote add impressjs https://github.com/bartaz/impress.js.git
git checkout gh-pages
git checkout master -- $FILES
git fetch impressjs
git checkout impressjs/master -- js/impress.js
git add $FILES js/impress.js
git commit -v
git push
git checkout master
