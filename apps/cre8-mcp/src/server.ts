/**
 * Cre8 MCP REST API Server
 *
 * Exposes component patterns and search as HTTP endpoints.
 */

import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import {
  handleGetPatterns,
  handleSearchComponents,
  handleListComponents,
  handleGetComponent,
} from './handlers.js';
import type { GetPatternsInput, SearchComponentsInput } from './handlers.js';

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
  version: '0.1.0',
  description: 'Cre8 Design System MCP Server - Component intelligence for AI agents',
  endpoints: {
    health: 'GET /health',
    components: 'GET /components',
    component: 'GET /components/:name',
    patterns: 'GET /patterns',
    pattern: 'GET /patterns/:name',
    search: 'GET /search?q=query',
  },
  usage: 'npx @anthropic-ai/cre8-mcp (coming soon) or run locally with: npx -y cre8-mcp-proxy',
}));

// GET /components
app.get('/components', (c) => {
  const category = c.req.query('category');
  const result = handleListComponents({ category });
  return c.json(JSON.parse(result));
});

// GET /components/:name
app.get('/components/:name', (c) => {
  const result = handleGetComponent({ name: c.req.param('name') });
  return c.json(JSON.parse(result));
});

// GET /patterns
app.get('/patterns', (c) => {
  const input: GetPatternsInput = {};
  const result = handleGetPatterns(input);
  return c.json(JSON.parse(result));
});

// GET /patterns/:name
app.get('/patterns/:name', (c) => {
  const input: GetPatternsInput = { name: c.req.param('name') };
  const result = handleGetPatterns(input);
  return c.json(JSON.parse(result));
});

// GET /search?q=query
app.get('/search', (c) => {
  const q = c.req.query('q');
  if (!q) {
    return c.json({ error: 'Missing required query parameter: q' }, 400);
  }
  const input: SearchComponentsInput = { query: q };
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
