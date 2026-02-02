/**
 * Cre8 MCP REST API Server
 *
 * Exposes component patterns and search as HTTP endpoints for Railway deployment.
 */

import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import {
  handleGetPatterns,
  handleSearchComponents,
} from './handlers.js';
import type { GetPatternsInput, SearchComponentsInput } from './handlers.js';

const app = new Hono();

// CORS - restrict to demo app domain
const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
app.use('*', cors({
  origin: allowedOrigin,
  allowMethods: ['GET', 'OPTIONS'],
}));

// Health check
app.get('/health', (c) => c.json({ status: 'ok', service: 'cre8-mcp' }));

// GET /patterns - list all patterns
app.get('/patterns', (c) => {
  const input: GetPatternsInput = {};
  const result = handleGetPatterns(input);
  return c.json(JSON.parse(result));
});

// GET /patterns/:name - get specific pattern
app.get('/patterns/:name', (c) => {
  const input: GetPatternsInput = { name: c.req.param('name') };
  const result = handleGetPatterns(input);
  return c.json(JSON.parse(result));
});

// GET /search?q=query&category=category
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
console.log(`CORS origin: ${allowedOrigin}`);

const server = serve({
  fetch: app.fetch,
  port,
}, (info) => {
  console.log(`Server running on http://localhost:${info.port}`);
});

// Keep process alive and handle shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down...');
  server.close();
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down...');
  server.close();
});
