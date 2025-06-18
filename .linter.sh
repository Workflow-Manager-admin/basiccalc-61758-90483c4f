#!/bin/bash
cd /home/kavia/workspace/code-generation/basiccalc-61758-90483c4f/basiccalc
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

