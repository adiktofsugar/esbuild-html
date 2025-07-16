# esbuild-html-link

Post processing for esbuild output to change copied html entry files to have `<script src>` and `<link href>` attributes that reference an entrypoint (like `index.ts`) to point to the output file instead, so `<script src="index.ts">` to `<script src="index.js">`, and `<link href="index.ts">` to `<link href="index.css">`.


The ideal supported command is this:
```
esbuild src/index.* --bundle --outdir=dist --metafile=.meta.json --loader:.html=copy && esbuild-html-link
```

## Description
- read the metafile by default at `meta.json` or `metafile.json`, or one of those preceded by a `.`
- delete meta file
- converts any html output files that are entry points to have correct references

## Future features

### rename hashed html file

esbuild has an `--entry-names` options that you can add a hash in. This makes sense for JS/CSS, but not for html entries, since you need to know the name of the html file.

I'm going to make this a default, and just replace the base name with the base name of the source.

## Potential future features

Not sure about these, but they're ideas.

### watch mode

this seems silly because you'd still need separate processes, but it's probably easier to set up with `concurrently` or something than `watchexec meta.json -- esbuild-html-link`


### non-entry html files

This could be useful if people like flows where they do `import './index.html'` from an `index.ts` file, but it seems weird. The main advantage I can think of is if you have a hash in your entry file and want an index.html (no hash) output, but there's a different feature for that.



## RE: esbuild min version
The metafile produced by esbuild doesn't mark an html file as an entrypoint until `0.24.1`.