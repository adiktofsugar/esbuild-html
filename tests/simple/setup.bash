#!/usr/bin/env bash

esbuild "src/index.*" --bundle --loader:.html=copy --outdir=dist --metafile=meta.json && node ../../dist/cli.mjs