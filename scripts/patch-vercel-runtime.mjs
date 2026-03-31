/**
 * Patches the Vercel Build Output to use nodejs20.x instead of nodejs18.x.
 * @astrojs/vercel@7 hardcodes nodejs18.x, which Vercel no longer accepts.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

function findVcConfigs(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...findVcConfigs(full));
    } else if (entry === '.vc-config.json') {
      results.push(full);
    }
  }
  return results;
}

const outputDir = join(process.cwd(), '.vercel', 'output');
const configs = findVcConfigs(outputDir);

for (const file of configs) {
  const config = JSON.parse(readFileSync(file, 'utf-8'));
  if (config.runtime === 'nodejs18.x') {
    config.runtime = 'nodejs20.x';
    writeFileSync(file, JSON.stringify(config, null, '\t'));
    console.log(`Patched runtime nodejs18.x → nodejs20.x: ${file.replace(process.cwd(), '')}`);
  }
}
