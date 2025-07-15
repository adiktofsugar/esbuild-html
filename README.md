# esbuild-html-link

Post processing for esbuild output to change copied html entry files to have `<script src>` and `<link href>` attributes that reference an entrypoint (like `index.ts`) to point to the output file instead, so `<script src="index.ts">` to `<script src="index.js">`, and `<link href="index.ts">` to `<link href="index.css">`.


The ideal supported command is this:
```
esbuild src/index.* --bundle --outdir=dist --metafile=meta.json --loader:.html=copy && esbuild-html-link
```

## Future features

### rename hashed html file

esbuild has an `--entry-names` options that you can add a hash in. This makes sense for JS/CSS, but not for html entries, since you need to know the name of the html file.

I'm going to make this a default, and just replace the base name with the base name of the source.

### handle meta.json location

esbuild's `--metafile` option specifies where the metafile goes _relative to your working directory_, which is annoying since you probably don't have that in your .gitignore. However, to determine the src/output, I need to know your working directory _and_ your metafile. If I wanted everything in `dist`, I'd have to do:
```
esbuild ... --metafile=dist/meta.json && esbuild-html-link -m dist/meta.json
```
Since it doesn't really make sense for me to assume your output is in `dist`, I can only default the name (defaults to meta.json).

A solution to this annoying thing is to either:
- specify metafile directory
- delete the meta.json on run
- other?

#### specify metafile directory

```
esbuild ... --outdir=dist --metafile=dist/meta.json && esbuild-html-link -m dist
```
Uses the same flag for "metafile", but since it resolves to a directory we'll just add "meta.json" to it. This seems like an easy change to deal with this issue.

#### delete meta.json on run
```
esbuild ... --outdir=dist --metafile=meta.json && esbuild-html-link
```
This is nice because you don't need to repeat "dist" twice, or give me any extra info. It's weird because you're deleting a file that, if something fails, may not get deleted.

## Potential future features

Not sure about these, but they're ideas.

### watch mode

this seems silly because you'd still need separate processes, but it's probably easier to set up with `concurrently` or something than `watchexec meta.json -- esbuild-html-link`


### non-entry html files

This could be useful if people like flows where they do `import './index.html'` from an `index.ts` file, but it seems weird. The main advantage I can think of is if you have a hash in your entry file and want an index.html (no hash) output, but there's a different feature for that.



## RE: esbuild min version
The metafile produced by esbuild doesn't mark an html file as an entrypoint until `0.24.1`.