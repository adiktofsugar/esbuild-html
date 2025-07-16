#!/usr/bin/env tsx
import assert from "node:assert";
import fs from "node:fs";
import * as cheerio from "cheerio";

// Test all 4 default metafile outputs
const tests = [
    { dir: "dist1", metafile: ".meta.json" },
    { dir: "dist2", metafile: "meta.json" },
    { dir: "dist3", metafile: ".metafile.json" },
    { dir: "dist4", metafile: "metafile.json" }
];

for (const test of tests) {
    console.log(`Testing ${test.metafile}...`);
    
    // Check HTML was processed correctly
    const html = fs.readFileSync(`${test.dir}/index.html`);
    const $ = cheerio.load(html);
    assert.equal($('link[rel="stylesheet"]').attr("href"), "styles.css", `CSS link incorrect in ${test.dir}`);
    assert.equal($("script").attr("src"), "script.js", `Script src incorrect in ${test.dir}`);
    
    // Check that metafile was deleted by default
    assert.equal(fs.existsSync(`${test.dir}/${test.metafile}`), false, `${test.metafile} should be deleted after processing`);
    
    console.log(`✓ ${test.metafile} test passed`);
}