/**
 * Cre8 MCP REST API Server
 *
 * Exposes component patterns and search as HTTP endpoints.
 */

import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { readFileSync, readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import {
  handleGetPatterns,
  handleSearchComponents,
  handleListComponents,
  handleGetComponent,
} from './handlers.js';
import type { GetPatternsInput, SearchComponentsInput, ComponentFormat } from './handlers.js';

// Get data directory path
function getDataDir(): string {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    return join(__dirname, '..', 'data');
  } catch {
    return join(process.cwd(), 'apps', 'cre8-mcp', 'data');
  }
}

// Load llms.txt
function loadLlmsTxt(): string {
  return readFileSync(join(getDataDir(), 'llms.txt'), 'utf-8');
}

// Load skill file
function loadSkillFile(skillName: string, filePath?: string): string {
  const dataDir = getDataDir();
  const skillDir = join(dataDir, 'skills', skillName);
  const targetPath = filePath ? join(skillDir, filePath) : join(skillDir, 'SKILL.md');
  return readFileSync(targetPath, 'utf-8');
}

// List skill reference files
function listSkillReferences(skillName: string): string[] {
  const dataDir = getDataDir();
  const refsDir = join(dataDir, 'skills', skillName, 'references');
  try {
    return readdirSync(refsDir).filter((f: string) => f.endsWith('.md'));
  } catch {
    return [];
  }
}

const app = new Hono();

// CORS - allow all
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'OPTIONS'],
}));

// Health check
app.get('/health', (c) => c.json({ status: 'ok', service: 'cre8-mcp' }));

// Info endpoint
app.get('/', (c) => c.json({
  name: 'cre8-mcp',
  version: '0.2.0',
  description: 'Cre8 Design System MCP Server - Component intelligence for AI agents',
  defaultFormat: 'web',
  endpoints: {
    health: 'GET /health',
    llms: 'GET /llms.txt',
    skills: {
      list: 'GET /skills',
      detail: 'GET /skills/:name',
      reference: 'GET /skills/:name/references/:ref',
    },
    webComponents: {
      list: 'GET /components',
      detail: 'GET /components/:name',
      patterns: 'GET /patterns',
      pattern: 'GET /patterns/:name',
      search: 'GET /search?q=query',
    },
    reactComponents: {
      list: 'GET /react/components',
      detail: 'GET /react/components/:name',
      patterns: 'GET /react/patterns',
      pattern: 'GET /react/patterns/:name',
      search: 'GET /react/search?q=query',
    },
  },
  usage: 'npx cre8-mcp-proxy',
}));

// LLMs.txt - AI agent instructions
app.get('/llms.txt', (c) => {
  const content = loadLlmsTxt();
  return c.text(content);
});

// ==========================================
// Skills API
// ==========================================

// List available skills
app.get('/skills', (c) => {
  return c.json({
    skills: [
      {
        name: 'cre8-a2ui',
        description: 'Web Components skill for CRE8 design system (@tmorrow/cre8-wc)',
        url: '/skills/cre8-a2ui',
      },
      {
        name: 'cre8-a2ui-react',
        description: 'React skill for CRE8 design system (@tmorrow/cre8-react)',
        url: '/skills/cre8-a2ui-react',
      },
    ],
  });
});

// Get skill main file
app.get('/skills/:name', (c) => {
  const skillName = c.req.param('name');
  if (!['cre8-a2ui', 'cre8-a2ui-react'].includes(skillName)) {
    return c.json({ error: `Skill "${skillName}" not found` }, 404);
  }
  try {
    const content = loadSkillFile(skillName);
    const refs = listSkillReferences(skillName);
    return c.json({
      name: skillName,
      content,
      references: refs.map(f => ({
        name: f.replace('.md', ''),
        url: `/skills/${skillName}/references/${f.replace('.md', '')}`,
      })),
    });
  } catch (err) {
    return c.json({ error: 'Failed to load skill' }, 500);
  }
});

// Get skill reference file
app.get('/skills/:name/references/:ref', (c) => {
  const skillName = c.req.param('name');
  const refName = c.req.param('ref');
  if (!['cre8-a2ui', 'cre8-a2ui-react'].includes(skillName)) {
    return c.json({ error: `Skill "${skillName}" not found` }, 404);
  }
  try {
    const content = loadSkillFile(skillName, `references/${refName}.md`);
    return c.json({
      skill: skillName,
      reference: refName,
      content,
    });
  } catch (err) {
    return c.json({ error: `Reference "${refName}" not found` }, 404);
  }
});

// ==========================================
// Web Components (default)
// ==========================================

// GET /components
app.get('/components', (c) => {
  const category = c.req.query('category');
  const result = handleListComponents({ category, format: 'web' });
  return c.json(JSON.parse(result));
});

// GET /components/:name
app.get('/components/:name', (c) => {
  const result = handleGetComponent({ name: c.req.param('name'), format: 'web' });
  return c.json(JSON.parse(result));
});

// GET /patterns
app.get('/patterns', (c) => {
  const input: GetPatternsInput = { format: 'web' };
  const result = handleGetPatterns(input);
  return c.json(JSON.parse(result));
});

// GET /patterns/:name
app.get('/patterns/:name', (c) => {
  const input: GetPatternsInput = { name: c.req.param('name'), format: 'web' };
  const result = handleGetPatterns(input);
  return c.json(JSON.parse(result));
});

// GET /search?q=query
app.get('/search', (c) => {
  const q = c.req.query('q');
  if (!q) {
    return c.json({ error: 'Missing required query parameter: q' }, 400);
  }
  const input: SearchComponentsInput = { query: q, format: 'web' };
  const result = handleSearchComponents(input);
  return c.json(JSON.parse(result));
});

// ==========================================
// React Components (/react/*)
// ==========================================

// GET /react/components
app.get('/react/components', (c) => {
  const category = c.req.query('category');
  const result = handleListComponents({ category, format: 'react' });
  return c.json(JSON.parse(result));
});

// GET /react/components/:name
app.get('/react/components/:name', (c) => {
  const result = handleGetComponent({ name: c.req.param('name'), format: 'react' });
  return c.json(JSON.parse(result));
});

// GET /react/patterns
app.get('/react/patterns', (c) => {
  const input: GetPatternsInput = { format: 'react' };
  const result = handleGetPatterns(input);
  return c.json(JSON.parse(result));
});

// GET /react/patterns/:name
app.get('/react/patterns/:name', (c) => {
  const input: GetPatternsInput = { name: c.req.param('name'), format: 'react' };
  const result = handleGetPatterns(input);
  return c.json(JSON.parse(result));
});

// GET /react/search?q=query
app.get('/react/search', (c) => {
  const q = c.req.query('q');
  if (!q) {
    return c.json({ error: 'Missing required query parameter: q' }, 400);
  }
  const input: SearchComponentsInput = { query: q, format: 'react' };
  const result = handleSearchComponents(input);
  return c.json(JSON.parse(result));
});

// Start server
const port = parseInt(process.env.PORT || '3001', 10);

console.log(`Cre8 MCP API starting on port ${port}`);

const server = serve({
  fetch: app.fetch,
  port,
}, (info) => {
  console.log(`Server running on http://localhost:${info.port}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down...');
  server.close();
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down...');
  server.close();
});
