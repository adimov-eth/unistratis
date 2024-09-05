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
    source_dir="../sdks/sdks/${sdk}/"
    dest_dir="./node_modules/@uniswap/${sdk}"
    
    if [ -d "$source_dir" ]; then
        echo "Copying ${sdk}..."
        rm -rf "$dest_dir"
        cp -R "$source_dir" "$dest_dir" || echo "Failed to copy ${sdk}"
    else
        echo "Warning: Source directory for ${sdk} not found"
    fi
done

sor_source="../smart-order-router/"
sor_dest="./node_modules/@uniswap/smart-order-router"

if [ -d "$sor_source" ]; then
    echo "Copying smart-order-router..."
    rm -rf "$sor_dest"
    cp -R "$sor_source" "$sor_dest" || echo "Failed to copy smart-order-router"
else
    echo "Warning: Source directory for smart-order-router not found"
fi

echo "Build script completed"