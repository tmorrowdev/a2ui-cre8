#!/usr/bin/env node
/**
 * Copy component JSON files from cre8-mcp to demo app for build-time bundling.
 */

import { copyFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const sourceDir = join(__dirname, '..', '..', 'cre8-mcp', 'data');
const destDir = join(__dirname, '..', 'src', 'data');

// Ensure destination directory exists
mkdirSync(destDir, { recursive: true });

// Copy both component files
const files = ['web-components.json', 'react-components.json'];

for (const file of files) {
  const source = join(sourceDir, file);
  const dest = join(destDir, file);
  copyFileSync(source, dest);
  console.log(`Copied ${file} to ${dest}`);
}
