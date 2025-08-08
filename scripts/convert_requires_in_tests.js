const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const testsDir = path.resolve(root, 'tests');

function isSrcPath(p) {
  return p.startsWith('../../src/');
}

function addJsExt(p) {
  return p.endsWith('.js') ? p : p + '.js';
}

function transform(content) {
  let out = content;
  // chai expect
  out = out.replace(/\bconst\s+chai\s*=\s*require\(\"chai\"\);\s*const\s+expect\s*=\s*chai\.expect;?/g, 'import { expect } from "chai";');
  out = out.replace(/\blet\s+chai\s*=\s*require\(\"chai\"\);\s*const\s+expect\s*=\s*chai\.expect;?/g, 'import { expect } from "chai";');

  // errors namespace
  out = out.replace(/const\s+errors\s*=\s*require\(\"(\.\.\/\.\.\/src\/Errors)\"\);/g, (m, p1) => `import * as errors from "${addJsExt(p1)}";`);

  // us_enrichment Response named imports
  out = out.replace(/const\s*\{\s*Response\s*,\s*FinancialResponse\s*,\s*GeoResponse\s*\}\s*=\s*require\(\"(\.\.\/\.\.\/src\/us_enrichment\/Response)\"\);/g,
    (m, p1) => `import { Response, FinancialResponse, GeoResponse } from "${addJsExt(p1)}";`);
  out = out.replace(/const\s*\{\s*Response\s*\}\s*=\s*require\(\"(\.\.\/\.\.\/src\/us_enrichment\/Response(?:\.js)?)\"\);/g,
    (m, p1) => `import { Response } from "${p1.endsWith('.js') ? p1 : p1 + '.js'}";`);

  // fixtures mock_senders named imports
  out = out.replace(/const\s+MockSender\s*=\s*require\(\"(\.\.\/fixtures\/mock_senders)\"\)\.MockSender;/g,
    (m, p1) => `import { MockSender } from "${addJsExt(p1)}";`);
  out = out.replace(/const\s+MockSenderWithResponse\s*=\s*require\(\"(\.\.\/fixtures\/mock_senders)\"\)\.MockSenderWithResponse;/g,
    (m, p1) => `import { MockSenderWithResponse } from "${addJsExt(p1)}";`);

  // Generic default requires from src -> default import
  out = out.replace(/const\s+(\w+)\s*=\s*require\(\"(\.\.\/\.\.\/src\/[^"]+)\"\);/g, (m, name, p) => {
    if (p.includes('us_enrichment/Response')) return m; // handled above
    if (p.endsWith('/Errors')) return m; // handled earlier
    const full = addJsExt(p);
    return `import ${name} from "${full}";`;
  });

  // Any remaining require(...).property patterns are rare; ignore.
  return out;
}

function processFile(file) {
  const content = fs.readFileSync(file, 'utf8');
  const transformed = transform(content);
  if (transformed !== content) {
    fs.writeFileSync(file, transformed);
    return true;
  }
  return false;
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.isFile() && p.endsWith('.ts')) {
      processFile(p);
    }
  }
}

walk(testsDir);
console.log('Converted require() to import in tests');
