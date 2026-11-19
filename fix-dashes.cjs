/* eslint-disable @typescript-eslint/no-require-imports */
// One-off: replace em/en dashes in copy with colons (explanations) or
// commas (parenthetical asides). Keeps "—" standalone placeholders.
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "src");
const files = [];

(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(ts|tsx)$/.test(e.name)) files.push(p);
  }
})(ROOT);

function transformLine(line) {
  // numeric ranges: "200 – 1,000" / "200–1,000" -> "200 to 1,000"
  line = line.replace(/(\d)\s*–\s*(\d)/g, "$1 to $2");
  // remaining en-dashes behave like em-dashes
  line = line.replace(/–/g, "—");
  // "word—word" -> "word: word"
  line = line.replace(/(\S)—(\S)/g, "$1: $2");
  // "word— word" / "word —word" -> same
  line = line.replace(/(\S)— /g, "$1: ").replace(/ —(\S)/g, ": $1");

  const count = (line.match(/ — /g) || []).length;
  if (count === 0) return line;
  if (count === 1) return line.replace(" — ", ": ");
  // two or more spaced em-dashes on one line -> parenthetical aside -> commas
  return line.replace(/ — /g, ", ");
}

let total = 0;
for (const f of files) {
  const src = fs.readFileSync(f, "utf-8");
  const out = src
    .split("\n")
    .map((l) => transformLine(l))
    .join("\n");
  if (out !== src) {
    fs.writeFileSync(f, out);
    total++;
    console.log("updated", path.relative(ROOT, f));
  }
}
console.log(`\n${total} files changed`);
