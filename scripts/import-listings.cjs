// One-off: import listings from a JSON file
const fs = require('fs');
const path = require('path');
const arg = process.argv[2];
if (!arg) { console.error('Usage: node import-listings.cjs <batchN.json>'); process.exit(1); }
const file = path.join(__dirname, '..', 'data', path.basename(arg));
const dir = path.join(__dirname, '..', 'data', 'listings');
const list = JSON.parse(fs.readFileSync(file, 'utf8'));
let written = 0;
for (const obj of list) {
  const out = path.join(dir, `${obj.slug}.json`);
  fs.writeFileSync(out, JSON.stringify(obj, null, 2) + '\n');
  written++;
}
console.log(`Imported ${written} listings from ${path.basename(arg)}`);
