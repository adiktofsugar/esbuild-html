#!/usr/bin/env bash

esbuild "src/index.*" --bundle --loader:.html=copy --outdir=dist --metafile=meta.json && npx tsx ../../src/cli.mts