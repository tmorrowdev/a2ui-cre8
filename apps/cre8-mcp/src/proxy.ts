#!/usr/bin/env node
/**
 * Cre8 MCP Proxy - Local stdio server that proxies to remote REST API
 *
 * Usage: npx cre8-mcp-proxy
 *
 * Add to Claude Desktop config:
 * {
 *   "mcpServers": {
 *     "cre8-mcp": {
 *       "command": "npx",
 *       "args": ["-y", "cre8-mcp-proxy"]
 *     }
 *   }
 * }
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

const API_URL = process.env.CRE8_API_URL || 'https://a2ui-bridgecre8-mcp-production.up.railway.app';

const tools = [
  {
    name: 'list_components',
    description: 'Lists all available Cre8 React components grouped by category',
    inputSchema: {
      type: 'object' as const,
      properties: {
        category: {
          type: 'string',
          description: 'Filter by category: Actions, Forms, Layout, Typography, Navigation, Disclosure, Feedback, Data, Media, Marketing',
        },
      },
    },
  },
  {
    name: 'get_component',
    description: 'Gets detailed information about a specific Cre8 component',
    inputSchema: {
      type: 'object' as const,
      properties: {
        name: {
          type: 'string',
          description: 'Component name (e.g., "Cre8Button" or "Button")',
        },
      },
      required: ['name'],
    },
  },
  {
    name: 'get_patterns',
    description: 'Gets pre-built UI patterns and templates using Cre8 components',
    inputSchema: {
      type: 'object' as const,
      properties: {
        name: {
          type: 'string',
          description: 'Pattern name to get details (optional)',
        },
      },
    },
  },
  {
    name: 'search_components',
    description: 'Search Cre8 components by name, description, or category',
    inputSchema: {
      type: 'object' as const,
      properties: {
        query: {
          type: 'string',
          description: 'Search query (e.g., "button", "form", "navigation")',
        },
      },
      required: ['query'],
    },
  },
];

async function fetchAPI(endpoint: string): Promise<string> {
  const response = await fetch(`${API_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }
  return JSON.stringify(await response.json(), null, 2);
}

const server = new Server(
  { name: 'cre8-mcp', version: '0.1.0' },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools }));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    let result: string;

    switch (name) {
      case 'list_components': {
        const category = (args as { category?: string }).category;
        const endpoint = category ? `/components?category=${encodeURIComponent(category)}` : '/components';
        result = await fetchAPI(endpoint);
        break;
      }
      case 'get_component': {
        const componentName = (args as { name: string }).name;
        result = await fetchAPI(`/components/${encodeURIComponent(componentName)}`);
        break;
      }
      case 'get_patterns': {
        const patternName = (args as { name?: string }).name;
        const endpoint = patternName ? `/patterns/${encodeURIComponent(patternName)}` : '/patterns';
        result = await fetchAPI(endpoint);
        break;
      }
      case 'search_components': {
        const query = (args as { query: string }).query;
        result = await fetchAPI(`/search?q=${encodeURIComponent(query)}`);
        break;
      }
      default:
        throw new Error(`Unknown tool: ${name}`);
    }

    return { content: [{ type: 'text', text: result }] };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return { content: [{ type: 'text', text: `Error: ${message}` }], isError: true };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(`Cre8 MCP Proxy connected to ${API_URL}`);
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
