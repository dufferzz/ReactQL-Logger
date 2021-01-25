#!/bin/bash

echo "Starting build.."

cd frontend && yarn build && cd ..

echo "Starting deploy.."

rsync -av -e "ssh -p 22" --info=progress2 --exclude='node_modules' --exclude='frontend/node_modules' --exclude='*.heapsnapshot'  --exclude='.git' --exclude='.env'  . dufferz@dufferz.net:/home/dufferz/jobs/

echo "Completed"

tput bel