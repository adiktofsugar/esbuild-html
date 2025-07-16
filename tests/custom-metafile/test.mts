#!/usr/bin/env tsx
import assert from "node:assert";
import fs from "node:fs";
import * as cheerio from "cheerio";

const html = fs.readFileSync("dist/index.html");
const $ = cheerio.load(html);
assert.equal($('link[rel="stylesheet"]').attr("href"), "app.css");
assert.equal($("script").attr("src"), "app.js");

// Check that custom metafile was deleted by default
assert.equal(fs.existsSync("build/my-custom-meta.json"), false, "Custom metafile should be deleted after processing");