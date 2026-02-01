# Railway Deployment Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Deploy cre8-mcp as a REST API and demo app to Railway with hybrid component data strategy.

**Architecture:** Two Railway services - cre8-mcp serves `/patterns`, `/search`, `/health` endpoints via Hono; demo bundles components.json at build time and fetches patterns/search at runtime. CORS restricts API access to demo app domain only.

**Tech Stack:** Hono (HTTP server), Vite (demo build), pnpm + Turbo (monorepo), Railway (hosting)

---

### Task 1: Add Hono dependency to cre8-mcp

**Files:**
- Modify: `apps/cre8-mcp/package.json`

**Step 1: Add hono dependency**

```bash
cd /Users/tylersmbp/Projects/a2ui-bridge && pnpm --filter @a2ui-bridge/cre8-mcp add hono
```

**Step 2: Verify installation**

Run: `cat apps/cre8-mcp/package.json | grep hono`
Expected: `"hono": "^X.X.X"`

**Step 3: Commit**

```bash
git add apps/cre8-mcp/package.json pnpm-lock.yaml
git commit -m "chore(cre8-mcp): add hono dependency for REST API"
```

---

### Task 2: Create Hono REST server

**Files:**
- Create: `apps/cre8-mcp/src/server.ts`

**Step 1: Create the Hono server file**

```typescript
/**
 * Cre8 MCP REST API Server
 *
 * Exposes component patterns and search as HTTP endpoints for Railway deployment.
 */

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

export default {
  port,
  fetch: app.fetch,
};
```

**Step 2: Verify TypeScript compiles**

Run: `cd /Users/tylersmbp/Projects/a2ui-bridge && pnpm --filter @a2ui-bridge/cre8-mcp build`
Expected: No errors, `dist/server.js` created

**Step 3: Commit**

```bash
git add apps/cre8-mcp/src/server.ts
git commit -m "feat(cre8-mcp): add Hono REST API server"
```

---

### Task 3: Update cre8-mcp package.json with API scripts

**Files:**
- Modify: `apps/cre8-mcp/package.json`

**Step 1: Add start:api script**

Update scripts section:

```json
{
  "scripts": {
    "build": "tsc",
    "dev": "tsx watch src/index.ts",
    "start": "node dist/index.js",
    "start:api": "node dist/server.js",
    "dev:api": "tsx watch src/server.ts"
  }
}
```

**Step 2: Test the API locally**

Run: `cd /Users/tylersmbp/Projects/a2ui-bridge && pnpm --filter @a2ui-bridge/cre8-mcp build && pnpm --filter @a2ui-bridge/cre8-mcp start:api &`
Then: `curl http://localhost:3001/health`
Expected: `{"status":"ok","service":"cre8-mcp"}`

Run: `curl http://localhost:3001/patterns`
Expected: JSON with patterns array

Run: `curl "http://localhost:3001/search?q=button"`
Expected: JSON with search results

Kill background process after testing.

**Step 3: Commit**

```bash
git add apps/cre8-mcp/package.json
git commit -m "chore(cre8-mcp): add start:api script for Railway deployment"
```

---

### Task 4: Create component data copy script for demo

**Files:**
- Create: `apps/demo/scripts/copy-components.js`

**Step 1: Create the script**

```javascript
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
```

**Step 2: Make executable and test**

Run: `chmod +x /Users/tylersmbp/Projects/a2ui-bridge/apps/demo/scripts/copy-components.js`
Run: `cd /Users/tylersmbp/Projects/a2ui-bridge && node apps/demo/scripts/copy-components.js`
Expected: "Copied components.json to .../src/data/components.json"

Run: `ls -la /Users/tylersmbp/Projects/a2ui-bridge/apps/demo/src/data/`
Expected: components.json exists

**Step 3: Add to .gitignore**

Add to `apps/demo/.gitignore`:
```
src/data/components.json
```

**Step 4: Commit**

```bash
git add apps/demo/scripts/copy-components.js apps/demo/.gitignore
git commit -m "feat(demo): add script to copy component data at build time"
```

---

### Task 5: Create API client for demo app

**Files:**
- Create: `apps/demo/src/api/client.ts`

**Step 1: Create the API client**

```typescript
/**
 * API client for cre8-mcp REST endpoints.
 *
 * Used at runtime for patterns and search (component data is bundled).
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface Pattern {
  name: string;
  description: string;
  template?: string;
}

export interface SearchResult {
  name: string;
  category: string;
  description: string;
}

export interface SearchResponse {
  query: string;
  results: SearchResult[];
  count: number;
}

export interface PatternsResponse {
  patterns: Pattern[];
}

/**
 * Fetch all patterns from the API.
 */
export async function fetchPatterns(): Promise<PatternsResponse> {
  const response = await fetch(`${API_URL}/patterns`);
  if (!response.ok) {
    throw new Error(`Failed to fetch patterns: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Fetch a specific pattern by name.
 */
export async function fetchPattern(name: string): Promise<Pattern> {
  const response = await fetch(`${API_URL}/patterns/${encodeURIComponent(name)}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch pattern "${name}": ${response.statusText}`);
  }
  return response.json();
}

/**
 * Search components by query.
 */
export async function searchComponents(query: string): Promise<SearchResponse> {
  const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error(`Search failed: ${response.statusText}`);
  }
  return response.json();
}
```

**Step 2: Verify TypeScript**

Run: `cd /Users/tylersmbp/Projects/a2ui-bridge && pnpm --filter @a2ui-bridge/demo build`
Expected: No TypeScript errors

**Step 3: Commit**

```bash
git add apps/demo/src/api/client.ts
git commit -m "feat(demo): add API client for runtime patterns/search"
```

---

### Task 6: Update demo build script

**Files:**
- Modify: `apps/demo/package.json`

**Step 1: Update build script to copy components first**

```json
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node scripts/copy-components.js",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  }
}
```

**Step 2: Add sirv for static serving**

Run: `cd /Users/tylersmbp/Projects/a2ui-bridge && pnpm --filter @a2ui-bridge/demo add -D sirv-cli`

**Step 3: Test full build**

Run: `cd /Users/tylersmbp/Projects/a2ui-bridge && pnpm --filter @a2ui-bridge/demo build`
Expected: Build succeeds, components.json copied first

**Step 4: Commit**

```bash
git add apps/demo/package.json pnpm-lock.yaml
git commit -m "chore(demo): add prebuild step for component data"
```

---

### Task 7: Create Railway configuration

**Files:**
- Create: `railway.toml`

**Step 1: Create root Railway config**

```toml
# Railway deployment configuration for a2ui-bridge monorepo

[build]
builder = "nixpacks"

[deploy]
numReplicas = 1
healthcheckPath = "/health"
healthcheckTimeout = 30
```

**Step 2: Commit**

```bash
git add railway.toml
git commit -m "chore: add Railway configuration"
```

---

### Task 8: Test full local workflow

**Step 1: Build both services**

Run: `cd /Users/tylersmbp/Projects/a2ui-bridge && pnpm build`
Expected: Both cre8-mcp and demo build successfully

**Step 2: Start API in background**

Run: `cd /Users/tylersmbp/Projects/a2ui-bridge && pnpm --filter @a2ui-bridge/cre8-mcp start:api &`
Expected: "Cre8 MCP API starting on port 3001"

**Step 3: Test API endpoints**

Run: `curl http://localhost:3001/health`
Expected: `{"status":"ok","service":"cre8-mcp"}`

Run: `curl http://localhost:3001/patterns`
Expected: JSON with patterns

Run: `curl "http://localhost:3001/search?q=button"`
Expected: JSON with search results

**Step 4: Preview demo app**

Run: `cd /Users/tylersmbp/Projects/a2ui-bridge && pnpm --filter @a2ui-bridge/demo preview &`
Expected: Demo app serves on localhost:4173

**Step 5: Cleanup**

Kill background processes.

**Step 6: Final commit**

```bash
git add -A
git commit -m "feat: complete Railway deployment setup for cre8-mcp and demo"
```

---

### Task 9: Deploy to Railway

**Step 1: Create Railway project**

1. Go to https://railway.app and create new project
2. Select "Deploy from GitHub repo"
3. Connect to a2ui-bridge repository

**Step 2: Add cre8-mcp service**

1. Click "New Service" → "GitHub Repo"
2. Set Root Directory: `apps/cre8-mcp`
3. Set Build Command: `cd ../.. && pnpm install && pnpm --filter @a2ui-bridge/cre8-mcp build`
4. Set Start Command: `node dist/server.js`
5. Add env var: `PORT` = (Railway provides)

**Step 3: Add demo service**

1. Click "New Service" → "GitHub Repo"
2. Set Root Directory: `apps/demo`
3. Set Build Command: `cd ../.. && pnpm install && pnpm --filter @a2ui-bridge/demo build`
4. Set Start Command: `npx sirv dist --port $PORT --single`
5. Add env var: `VITE_API_URL` = (cre8-mcp service URL after deploy)

**Step 4: Configure CORS**

After both deploy:
1. Copy demo service URL
2. Add to cre8-mcp env vars: `ALLOWED_ORIGIN` = `https://demo-xxx.up.railway.app`
3. Redeploy cre8-mcp

**Step 5: Verify deployment**

- Visit demo URL: should load
- Check API health: `curl https://cre8-mcp-xxx.up.railway.app/health`
- Verify patterns/search work from demo app

---

## Summary

| Task | Description | Est. Steps |
|------|-------------|------------|
| 1 | Add Hono dependency | 3 |
| 2 | Create Hono REST server | 3 |
| 3 | Update package.json with scripts | 3 |
| 4 | Create component copy script | 4 |
| 5 | Create API client | 3 |
| 6 | Update demo build script | 4 |
| 7 | Create Railway config | 2 |
| 8 | Test local workflow | 6 |
| 9 | Deploy to Railway | 5 |
