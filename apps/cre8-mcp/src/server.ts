/**
 * Cre8 MCP Server with SSE Transport
 *
 * Provides MCP server over SSE for remote Claude Desktop connections,
 * plus REST API endpoints for direct access.
 */

import http from 'http';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import {
  handleGetPatterns,
  handleSearchComponents,
  handleListComponents,
  handleGetComponent,
} from './handlers.js';
import type { GetPatternsInput, SearchComponentsInput } from './handlers.js';
import { tools, ListComponentsSchema, GetComponentSchema, GetPatternsSchema, SearchComponentsSchema } from './tools.js';

const port = parseInt(process.env.PORT || '3001', 10);

// Store active transports by session ID
const transports = new Map<string, SSEServerTransport>();

// Create MCP server instance
function createMCPServer(): Server {
  const mcpServer = new Server(
    { name: 'cre8-mcp', version: '0.1.0' },
    { capabilities: { tools: {} } }
  );

  mcpServer.setRequestHandler(ListToolsRequestSchema, async () => ({ tools }));

  mcpServer.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    try {
      let result: string;
      switch (name) {
        case 'list_components':
          result = handleListComponents(ListComponentsSchema.parse(args));
          break;
        case 'get_component':
          result = handleGetComponent(GetComponentSchema.parse(args));
          break;
        case 'get_patterns':
          result = handleGetPatterns(GetPatternsSchema.parse(args));
          break;
        case 'search_components':
          result = handleSearchComponents(SearchComponentsSchema.parse(args));
          break;
        default:
          throw new Error(`Unknown tool: ${name}`);
      }
      return { content: [{ type: 'text', text: result }] };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return { content: [{ type: 'text', text: `Error: ${message}` }], isError: true };
    }
  });

  return mcpServer;
}

// CORS headers
function setCorsHeaders(res: http.ServerResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

// Create HTTP server
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://localhost:${port}`);

  setCorsHeaders(res);

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Health check
  if (url.pathname === '/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', service: 'cre8-mcp' }));
    return;
  }

  // Info endpoint
  if (url.pathname === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      name: 'cre8-mcp',
      version: '0.1.0',
      description: 'Cre8 Design System MCP Server',
      endpoints: {
        sse: '/sse - SSE endpoint for MCP connections (Claude Desktop)',
        message: '/message - POST endpoint for MCP messages',
        health: '/health - Health check',
        patterns: '/patterns - List UI patterns',
        search: '/search?q=query - Search components',
      },
      claude_desktop_config: {
        mcpServers: {
          'cre8-mcp': {
            transport: {
              type: 'sse',
              url: 'https://a2ui-bridgecre8-mcp-production.up.railway.app/sse'
            }
          }
        }
      }
    }));
    return;
  }

  // REST: patterns
  if (url.pathname === '/patterns' && req.method === 'GET') {
    const input: GetPatternsInput = {};
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(handleGetPatterns(input));
    return;
  }

  // REST: patterns/:name
  if (url.pathname.startsWith('/patterns/') && req.method === 'GET') {
    const name = decodeURIComponent(url.pathname.slice('/patterns/'.length));
    const input: GetPatternsInput = { name };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(handleGetPatterns(input));
    return;
  }

  // REST: search
  if (url.pathname === '/search' && req.method === 'GET') {
    const q = url.searchParams.get('q');
    if (!q) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing required query parameter: q' }));
      return;
    }
    const input: SearchComponentsInput = { query: q };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(handleSearchComponents(input));
    return;
  }

  // SSE endpoint for MCP
  if (url.pathname === '/sse' && req.method === 'GET') {
    console.log('New SSE connection');

    const transport = new SSEServerTransport('/message', res);
    const sessionId = transport.sessionId;
    transports.set(sessionId, transport);

    const mcpServer = createMCPServer();

    req.on('close', () => {
      console.log(`SSE connection closed: ${sessionId}`);
      transports.delete(sessionId);
      mcpServer.close();
    });

    await mcpServer.connect(transport);
    return;
  }

  // Message endpoint for MCP
  if (url.pathname === '/message' && req.method === 'POST') {
    const sessionId = url.searchParams.get('sessionId');
    if (!sessionId) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing sessionId' }));
      return;
    }

    const transport = transports.get(sessionId);
    if (!transport) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Session not found' }));
      return;
    }

    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        await transport.handlePostMessage(req, res, body);
      } catch (error) {
        console.error('Error handling message:', error);
        if (!res.headersSent) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Internal server error' }));
        }
      }
    });
    return;
  }

  // 404
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(port, () => {
  console.log(`Cre8 MCP Server running on port ${port}`);
  console.log(`REST API: http://localhost:${port}/`);
  console.log(`MCP SSE: http://localhost:${port}/sse`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down...');
  server.close();
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down...');
  server.close();
});
