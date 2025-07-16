#!/usr/bin/env bash

# Use a custom metafile path in a subdirectory
mkdir -p build && npx esbuild "src/index.*" --bundle --loader:.html=copy --outdir=dist --metafile=build/my-custom-meta.json && node ../../dist/cli.mjs -m build/my-custom-meta.json