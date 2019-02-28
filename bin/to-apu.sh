#!/bin/bash
set -e

dir_name=`basename $(pwd)`
echo "We'll build and transfer the app to: public/v/${dir_name}"
echo "Is that ok? <ENTER> to continue ..."
read FOO

echo "Building ..."
./bin/build.sh

echo "Transferring to apu ..."
echo "dir: $dir_name"
ssh apu mkdir -p /usr/local/www/drio.org/public/v/$dir_name
scp -r dist/* apu:/usr/local/www/drio.org/public/v/$dir_name

echo "🙌 http://drio.org/v/$dir_name"
