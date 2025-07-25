#!/usr/bin/env tsx
import assert from "node:assert";
import fs from "node:fs";
import * as cheerio from "cheerio";

const html = fs.readFileSync("dist/index.html");
const $ = cheerio.load(html);
assert.equal($('link[rel="stylesheet"]').attr("href"), "index.css");
assert.equal($("script").attr("src"), "index.js");

// Check that meta.json was deleted by default
assert.equal(fs.existsSync("meta.json"), false, "meta.json should be deleted after processing");
