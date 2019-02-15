#!/bin/bash 
set -e 

CANONICAL_APP_DIR="/Users/drio/dev/vizs/canonical_app"
NEW_APP_DIR=`pwd`

if [ ".$1" != "." ];then
  APP_NAME=$1    
else
  printf "app name?: "
  read APP_NAME
fi

echo "New app will be in: ${NEW_APP_DIR}/${APP_NAME}" 
printf "Is that ok? <ENTER> to continue ..."
read FOO

if [ $APP_NAME != ".$APP_NAME" ];then
  echo "cleaning canonical app dir"
  cd $CANONICAL_APP_DIR
  rm -rf dist
  rm -rf node_modules

  cd $NEW_APP_DIR
  echo "Copying canonical app contents ..."
  cp -r $CANONICAL_APP_DIR ./$APP_NAME
  cd $APP_NAME

  echo "installing packages ..."
  npm i
  echo "You can now run: npm run dev"
  echo "Done."
fi
