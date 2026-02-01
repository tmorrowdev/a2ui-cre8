# Railway Deployment Design

Deploy cre8-mcp and demo app to Railway as two services in a single project.

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  Railway Project                        │
│                                                         │
│  ┌─────────────────┐       ┌─────────────────────────┐ │
│  │   cre8-mcp      │       │      demo               │ │
│  │   (Hono API)    │◄──────│   (Vite Static +        │ │
│  │                 │ CORS  │    React SPA)           │ │
│  │ /patterns       │       │                         │ │
│  │ /search         │       │  Bundled: components    │ │
│  │ /health         │       │  Runtime: patterns,     │ │
│  └────────┬────────┘       │           search        │ │
│           │                └─────────────────────────┘ │
│           │ internal                                   │
│           ▼                                            │
│    components.json                                     │
└─────────────────────────────────────────────────────────┘
```

## Services

### cre8-mcp API

REST API exposing component patterns and search.

**Endpoints:**

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/patterns` | GET | List all UI patterns |
| `/patterns/:name` | GET | Get specific pattern |
| `/search?q=term&category=Forms` | GET | Search components |
| `/health` | GET | Health check for Railway |

**Implementation:**
- Hono-based HTTP server (already a dependency)
- Reuses existing handlers from MCP server
- CORS restricted to demo app domain via `ALLOWED_ORIGIN` env var
- Keeps existing stdio MCP server for local Claude Desktop use

**New files:**
- `apps/cre8-mcp/src/server.ts` - Hono HTTP server

**Modified files:**
- `apps/cre8-mcp/package.json` - Add `start:api` script

### Demo App

Static Vite build with hybrid data strategy.

**Data strategy:**
- **Bundled at build:** Core component data (list, details)
- **Fetched at runtime:** Patterns, search results

**New files:**
- `apps/demo/src/api/client.ts` - API fetch client
- `apps/demo/scripts/copy-components.js` - Copy components.json at build time

**Modified files:**
- `apps/demo/package.json` - Update build script to copy components

## Railway Configuration

### Root Config (railway.toml)

```toml
[build]
builder = "nixpacks"

[deploy]
numReplicas = 1
```

### Service: cre8-mcp

| Setting | Value |
|---------|-------|
| Root Directory | `apps/cre8-mcp` |
| Build Command | `cd ../.. && pnpm install && pnpm --filter @a2ui-bridge/cre8-mcp build` |
| Start Command | `node dist/server.js` |
| Port | 3001 (Railway auto-detects) |

### Service: demo

| Setting | Value |
|---------|-------|
| Root Directory | `apps/demo` |
| Build Command | `cd ../.. && pnpm install && pnpm --filter @a2ui-bridge/demo build` |
| Start Command | `npx sirv dist --port $PORT --single` |
| Port | 3000 (Railway auto-detects) |

## Environment Variables

### cre8-mcp
| Variable | Description |
|----------|-------------|
| `ALLOWED_ORIGIN` | Demo app URL (e.g., `https://demo-xxx.up.railway.app`) |
| `PORT` | Provided by Railway |

### demo
| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | cre8-mcp URL (e.g., `https://cre8-mcp-xxx.up.railway.app`) |

## Deployment Flow

1. Push to main triggers both services
2. cre8-mcp builds TypeScript, starts Hono server
3. Demo copies components.json, builds Vite static, serves with sirv
4. After first deploy, update env vars with actual Railway URLs

## Implementation Checklist

- [ ] Create `apps/cre8-mcp/src/server.ts` - Hono HTTP server
- [ ] Update `apps/cre8-mcp/package.json` - Add start:api script
- [ ] Create `apps/demo/scripts/copy-components.js` - Build helper
- [ ] Create `apps/demo/src/api/client.ts` - API client
- [ ] Update `apps/demo/package.json` - Modify build script
- [ ] Create `railway.toml` - Root config
- [ ] Deploy to Railway and configure env vars
