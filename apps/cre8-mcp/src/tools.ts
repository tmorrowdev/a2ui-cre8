/**
 * Cre8 MCP Tool Definitions
 */

import { z } from 'zod';

export const tools = [
  {
    name: 'list_components',
    description:
      'Lists all available Cre8 React components from @tmorrow/cre8-react. ' +
      'Returns components grouped by category (Actions, Forms, Layout, Navigation, etc.). ' +
      'Optionally filter by category.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        category: {
          type: 'string',
          description:
            'Filter by category: Actions, Forms, Layout, Typography, Navigation, Disclosure, Feedback, Data, Media, Marketing',
        },
      },
    },
  },
  {
    name: 'get_component',
    description:
      'Gets detailed information about a specific Cre8 component including props, ' +
      'import statement, and usage examples. Works with or without the "Cre8" prefix.',
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
    description:
      'Gets pre-built UI patterns and templates using Cre8 components. ' +
      'Includes common patterns like Login Form, Data Table, Page Layout, etc. ' +
      'Optionally get a specific pattern by name.',
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
    description:
      'Search Cre8 components by name, description, or category. ' +
      'Useful for finding components that match a specific need.',
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

// Zod schemas for input validation
export const ListComponentsSchema = z.object({
  category: z.string().optional(),
});

export const GetComponentSchema = z.object({
  name: z.string(),
});

export const GetPatternsSchema = z.object({
  name: z.string().optional(),
});

export const SearchComponentsSchema = z.object({
  query: z.string(),
});
