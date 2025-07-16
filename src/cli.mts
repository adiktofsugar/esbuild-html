#!/usr/bin/env node
import path from "node:path";
import Logger from "js-logger";
import parseArgs from "minimist";
import esbuildHtml from "./index.mjs";

const usage = `
esbuild-html-link [-h][-m <metafile>][-D] [<dirpath>]
-h              help
-m <metafile>   name of metafile, defaults to meta.json
                ** This is the same value as you pass to esbuild for --metafile **
-D, --preserve-metafile
                preserve the metafile after processing
-v 				verbose
-q 				quiet
<dirpath>       path to working dir, defaults to cwd

Finds html files you used as an entry point and copied over and rewrites <link>
  and <script> tags to reference the output bundles.

The html file's references must be to the entrypoint file.
`;

const args = parseArgs(process.argv.slice(2), {
	boolean: ["help", "verbose", "preserve-metafile"],
	string: ["metafile"],
	alias: {
		help: "h",
		metafile: "m",
		verbose: "v",
		quiet: "q",
		"preserve-metafile": "D",
	},
});

if (args.help) {
	console.log(usage);
	process.exit();
}

let loglevel = Logger.INFO;
if (args.verbose) {
	loglevel = Logger.DEBUG;
} else if (args.quiet) {
	loglevel = Logger.ERROR;
}
Logger.useDefaults({
	defaultLevel: loglevel,
});

const workingDirpath = path.resolve(args._[0] || ".", process.cwd());
esbuildHtml(workingDirpath, {
	metafileRelpath: args.metafile,
	deleteMetafile: !args["preserve-metafile"],
});
