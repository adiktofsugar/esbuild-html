#!/usr/bin/env bash
set -e

# Test 1: .meta.json
rm -rf dist1 && npx esbuild "src/index.*" --bundle --loader:.html=copy --outdir=dist1 --metafile=.meta.json && node ../../dist/cli.mjs dist1

# Test 2: meta.json
rm -rf dist2 && npx esbuild "src/index.*" --bundle --loader:.html=copy --outdir=dist2 --metafile=meta.json && node ../../dist/cli.mjs dist2

# Test 3: .metafile.json
rm -rf dist3 && npx esbuild "src/index.*" --bundle --loader:.html=copy --outdir=dist3 --metafile=.metafile.json && node ../../dist/cli.mjs dist3

# Test 4: metafile.json
rm -rf dist4 && npx esbuild "src/index.*" --bundle --loader:.html=copy --outdir=dist4 --metafile=metafile.json && node ../../dist/cli.mjs dist4