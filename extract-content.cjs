/* eslint-disable @typescript-eslint/no-require-imports */
// One-off extraction: port MDX content from the monorepo site into typed data files.
// Run from client/: node extract-content.cjs
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const SRC = "C:/Users/Kwena/Projects/project-net/apps/site/content";
const OUT = "C:/Users/Kwena/Projects/DataRadius/client/src/lib/content";

function slug(f) {
  return f.replace(/\.mdx$/, "");
}

function cleanBody(body) {
  return body
    .replace(/<Figure[^>]*caption="([^"]*)"[^>]*\/>/g, "\n> $1\n")
    .replace(/<Figure[^>]*\/>/g, "")
    .replace(/\]\(\/learn\//g, "](/resources/learn/")
    .replace(/\]\(\/docs\//g, "](/docs/")
    .split("\n")
    .map((line) => {
      line = line.replace(/(\d)\s*–\s*(\d)/g, "$1 to $2").replace(/–/g, "—");
      line = line.replace(/(\S)—(\S)/g, "$1: $2").replace(/(\S)— /g, "$1: ").replace(/ —(\S)/g, ": $1");
      const count = (line.match(/ — /g) || []).length;
      if (count === 1) return line.replace(" — ", ": ");
      if (count > 1) return line.replace(/ — /g, ", ");
      return line;
    })
    .join("\n")
    .trim();
}

function parseMdx(file) {
  const raw = fs.readFileSync(file, "utf-8");
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) throw new Error(`No frontmatter in ${file}`);
  return { meta: yaml.load(m[1]), body: cleanBody(m[2]) };
}

function list(dir) {
  return fs
    .readdirSync(path.join(SRC, dir))
    .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"))
    .map((f) => path.join(SRC, dir, f));
}

const guides = list("guides").map((f) => {
  const { meta, body } = parseMdx(f);
  return {
    slug: slug(path.basename(f)),
    title: meta.title,
    description: meta.description,
    pillar: meta.pillar ?? null,
    updatedAt: meta.updatedAt ?? meta.publishedAt ?? null,
    quickAnswer: meta.quickAnswer ?? null,
    takeaways: meta.takeaways ?? [],
    sources: meta.sources ?? [],
    faq: meta.faq ?? [],
    body,
  };
});

const docs = list("docs").map((f) => {
  const { meta, body } = parseMdx(f);
  return {
    slug: slug(path.basename(f)),
    title: meta.title,
    description: meta.description,
    section: meta.section ?? "General",
    order: meta.order ?? 99,
    updatedAt: meta.updatedAt ?? meta.publishedAt ?? null,
    body,
  };
});
docs.sort((a, b) => a.order - b.order);

const glossary = list("glossary").map((f) => {
  const { meta, body } = parseMdx(f);
  return {
    slug: slug(path.basename(f)),
    term: meta.term,
    definition: meta.definition,
    relatedTerms: meta.relatedTerms ?? [],
    body,
  };
});
glossary.sort((a, b) => a.term.localeCompare(b.term));

fs.mkdirSync(OUT, { recursive: true });
for (const [name, data] of Object.entries({ guides, docs, glossary })) {
  fs.writeFileSync(
    path.join(OUT, `${name}.ts`),
    `// Ported from dataradius.net content/${name} — regenerate with extract-content.cjs\nexport const ${name} = ${JSON.stringify(data, null, 2)} as const;\n`,
  );
  console.log(`${name}: ${data.length} entries`);
}
