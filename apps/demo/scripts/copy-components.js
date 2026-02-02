#!/usr/bin/env node
/**
 * Copy components.json from cre8-mcp to demo app for build-time bundling.
 */

import { copyFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const source = join(__dirname, '..', '..', 'cre8-mcp', 'data', 'components.json');
const destDir = join(__dirname, '..', 'src', 'data');
const dest = join(destDir, 'components.json');

// Ensure destination directory exists
mkdirSync(destDir, { recursive: true });

// Copy file
copyFileSync(source, dest);

console.log(`Copied components.json to ${dest}`);
