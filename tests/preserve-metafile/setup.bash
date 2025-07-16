#!/usr/bin/env bash

npx esbuild "src/index.*" --bundle --loader:.html=copy --outdir=dist --metafile=meta.json && node ../../dist/cli.mjs -D