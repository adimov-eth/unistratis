#!/bin/bash

declare -a sdks=(
  "permit2-sdk"
  "sdk-core"
  "v2-sdk"
  "v3-sdk"
  "router-sdk"
  "universal-router-sdk"
)

for sdk in "${sdks[@]}"; do

    cp -R ../sdks/sdks/$sdk/ node_modules/@uniswap/$sdk
done

cp -R ../smart-order-router/ node_modules/@uniswap/smart-order-router