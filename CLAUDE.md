# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`esbuild-html-link` is a post-processing tool for esbuild that updates `<script>` and `<link>` references in HTML files to point to bundled output files. It solves the problem where esbuild copies HTML entry points but doesn't update their asset references.

## Key Commands

### Development
- `npm run build` - Build TypeScript source to dist/
- `npm run dev` - Watch mode for development
- `npm run lint` - Run Biome linter
- `npm run fix` - Auto-fix linting issues
- `npm test` - Run the test suite (uses scripts/test.bash)

### Testing Individual Components
- Run tests: `bash scripts/test.bash`
- Test the CLI directly: `node dist/cli.mjs [options]`
- The test suite builds and runs the example in tests/simple/

## Architecture

### Core Components

1. **src/index.mts** - Main library logic
   - `updateHtmlLinks()`: Core function that processes HTML files
   - Reads esbuild metafile to map inputs to outputs
   - Uses cheerio to parse and update HTML
   - Handles hash removal from HTML filenames

2. **src/cli.mts** - CLI wrapper
   - Processes command-line arguments using minimist
   - Provides usage instructions with `--help`
   - Supports `--verbose` and `--quiet` logging modes
   - Expects `meta.json` in current directory by default

### Key Design Decisions

- **Metafile Required**: Relies on esbuild's `--metafile` output to map source files to bundles
- **HTML Processing**: Uses cheerio for reliable HTML parsing/manipulation
- **File Naming**: Removes hashes from HTML output filenames to preserve original names
- **Logging**: Uses js-logger with configurable verbosity

### Testing Approach

Tests use a real esbuild build scenario in tests/simple/:
1. Build the test project with esbuild
2. Run esbuild-html-link to process the HTML
3. Verify the output HTML has correct references

## Important Notes

- Minimum esbuild version: 0.24.1 (enforced in package.json)
- The tool expects `meta.json` in the current directory (esbuild default)
- Only processes HTML files that were entry points in the esbuild build
- Preserves all other HTML content/attributes unchanged