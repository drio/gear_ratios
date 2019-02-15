#!/bin/bash

npm run build
mkdir -p dist/src
cp -r ./src/assets dist/src/

