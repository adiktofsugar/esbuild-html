import path from "node:path";
import parseArgs from "minimist";
import esbuildHtml from "./index.mjs";

const usage = `
esbuild-html-link [-h][-m <metafile>] [<dirpath>]
-h              help
-m <metafile>   name of metafile, defaults to meta.json
                ** This is the same value as you pass to esbuild for --metafile **
<dirpath>       path to working dir, defaults to cwd

Finds html files you used as an entry point and copied over and rewrites <link>
  and <script> tags to reference the output bundles.

The html file's references must be to the entrypoint file.
`;

const args = parseArgs(process.argv.slice(2), {
	boolean: ["help"],
	string: ["metafile"],
	alias: {
		help: "h",
		metafile: "m",
	},
	default: {
		metafile: "meta.json",
	},
});

if (args.help) {
	console.log(usage);
	process.exit();
}

const workingDirpath = path.resolve(args._[0] || ".", process.cwd());
esbuildHtml(workingDirpath, args.metafile);
