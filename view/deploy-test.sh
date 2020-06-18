#!/bin/bash
echo "Build the view in in test mode"
yarn build-dev
echo "Build completed in build folder, start copying to remote test1 server"
ssh test1 "rm -rf ~/light-chain/light-config-test/test1/lightapi/build"
scp -r ./build test1:/home/steve/light-chain/light-config-test/test1/lightapi
echo "Copied!"
