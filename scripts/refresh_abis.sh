#!/usr/bin/env bash

cd $(dirname $0)/..
mkdir -p ./src/abis/dahlia_contracts
cp -R ../dahlia_contracts/build/contracts/* ./src/abis/dahlia_contracts
cp -R ../dahlia_contracts/build/interfaces/* ./src/abis/dahlia_contracts
mkdir -p ./src/abis/fountain_of_youth
cp -R ../fountain_of_youth/build/abi/* ./src/abis/fountain_of_youth
