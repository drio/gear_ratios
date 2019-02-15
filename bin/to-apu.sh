#!/bin/bash
set -e

dir_name=`basename $(pwd)`
echo "We'll build and transfer the app to: publis/viz/${dir_name}"
echo "Is that ok? <ENTER> to continue ..."
read FOO

echo "Building ..."
./bin/build.sh

echo "Transferring to apu ..."
echo "dir: $dir_name"
ssh apu mkdir -p /usr/local/www/drio.org/public/vizs/$dir_name
scp -r dist/* apu:/usr/local/www/drio.org/public/vizs/$dir_name

echo "🙌 http://drio.org/vizs/$dir_name"
