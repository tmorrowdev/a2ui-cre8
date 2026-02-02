/**
 * Cre8 MCP Tool Handlers
 *
 * Functions that implement the Cre8 Design System MCP tools.
 * Supports both Web Components (default) and React formats.
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Format type
export type ComponentFormat = 'web' | 'react';

// Common types
interface Pattern {
  name: string;
  description: string;
  template: string;
}

// Generic catalog interface for shared operations
interface BaseCatalog {
  version: string;
  library: string;
  components: Array<{ name: string; category: string; description: string }>;
  patterns: Pattern[];
}

// Cache for catalogs
const catalogs: Record<ComponentFormat, BaseCatalog | null> = {
  web: null,
  react: null,
};

function getCatalogPath(format: ComponentFormat): string {
  const filename = format === 'react' ? 'react-components.json' : 'web-components.json';

  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    return join(__dirname, '..', 'data', filename);
  } catch {
    return join(process.cwd(), 'apps', 'cre8-mcp', 'data', filename);
  }
}

function loadCatalog(format: ComponentFormat = 'web'): BaseCatalog {
  if (catalogs[format]) return catalogs[format]!;

  const catalogPath = getCatalogPath(format);
  catalogs[format] = JSON.parse(readFileSync(catalogPath, 'utf-8'));

  return catalogs[format]!;
}

// Tool Input Types
export interface ListComponentsInput {
  category?: string;
  format?: ComponentFormat;
}

export interface GetComponentInput {
  name: string;
  format?: ComponentFormat;
}

export interface GetPatternsInput {
  name?: string;
  format?: ComponentFormat;
}

export interface SearchComponentsInput {
  query: string;
  format?: ComponentFormat;
}

/**
 * list_components - Lists all available Cre8 components
 */
export function handleListComponents(input: ListComponentsInput): string {
  const format = input.format || 'web';
  const cat = loadCatalog(format);
  let components = cat.components;

  if (input.category) {
    components = components.filter(
      (c) => c.category.toLowerCase() === input.category!.toLowerCase()
    );
  }

  // Group by category
  const grouped: Record<string, Array<{ name: string; description: string }>> = {};
  for (const comp of components) {
    if (!grouped[comp.category]) {
      grouped[comp.category] = [];
    }
    grouped[comp.category].push({
      name: comp.name,
      description: comp.description,
    });
  }

  const result = {
    format,
    library: cat.library,
    version: cat.version,
    categories: Object.entries(grouped).map(([category, comps]) => ({
      category,
      components: comps,
    })),
    totalComponents: components.length,
  };

  return JSON.stringify(result, null, 2);
}

/**
 * get_component - Gets detailed info for a specific component
 */
export function handleGetComponent(input: GetComponentInput): string {
  const format = input.format || 'web';
  const cat = loadCatalog(format);

  // Normalize search name (handle both cre8-button and Cre8Button formats)
  const searchName = input.name.toLowerCase()
    .replace(/^cre8-?/, '')  // Remove cre8- or cre8 prefix
    .replace(/-/g, '');       // Remove hyphens for comparison

  const component = cat.components.find((c) => {
    const compName = c.name.toLowerCase()
      .replace(/^cre8-?/, '')
      .replace(/-/g, '');
    return compName === searchName || c.name.toLowerCase() === input.name.toLowerCase();
  });

  if (!component) {
    return JSON.stringify({
      error: `Component "${input.name}" not found`,
      suggestion: 'Use list_components to see available components',
    });
  }

  // Return format-specific details
  if (format === 'react') {
    const reactComp = component as { name: string; category: string; description: string; props?: Record<string, unknown>; examples?: Array<{ description: string; jsx: string }> };
    return JSON.stringify({
      format,
      name: reactComp.name,
      category: reactComp.category,
      description: reactComp.description,
      import: `import { ${reactComp.name} } from '@tmorrow/cre8-react';`,
      props: reactComp.props || {},
      examples: reactComp.examples || [],
    }, null, 2);
  }

  // Web component format
  const webComp = component as {
    name: string;
    category: string;
    description: string;
    attributes?: Record<string, unknown>;
    properties?: Record<string, unknown>;
    slots?: Record<string, unknown>;
    events?: Record<string, unknown>;
    cssProperties?: Record<string, unknown>;
    examples?: Array<{ description: string; html: string }>;
  };

  return JSON.stringify({
    format,
    name: webComp.name,
    tagName: webComp.name,
    category: webComp.category,
    description: webComp.description,
    import: `import '@tmorrow/cre8-wc/${webComp.name}';`,
    attributes: webComp.attributes || {},
    properties: webComp.properties || {},
    slots: webComp.slots || {},
    events: webComp.events || {},
    cssProperties: webComp.cssProperties || {},
    examples: webComp.examples || [],
  }, null, 2);
}

/**
 * get_patterns - Gets layout patterns and templates
 */
export function handleGetPatterns(input: GetPatternsInput): string {
  const format = input.format || 'web';
  const cat = loadCatalog(format);

  if (input.name) {
    const pattern = cat.patterns.find(
      (p) => p.name.toLowerCase() === input.name!.toLowerCase()
    );

    if (!pattern) {
      return JSON.stringify({
        error: `Pattern "${input.name}" not found`,
        available: cat.patterns.map((p) => p.name),
      });
    }

    return JSON.stringify({ format, ...pattern }, null, 2);
  }

  return JSON.stringify({
    format,
    patterns: cat.patterns.map((p) => ({
      name: p.name,
      description: p.description,
    })),
  }, null, 2);
}

/**
 * search_components - Search components by name or description
 */
export function handleSearchComponents(input: SearchComponentsInput): string {
  const format = input.format || 'web';
  const cat = loadCatalog(format);
  const query = input.query.toLowerCase();

  const matches = cat.components.filter(
    (c) =>
      c.name.toLowerCase().includes(query) ||
      c.description.toLowerCase().includes(query) ||
      c.category.toLowerCase().includes(query)
  );

  if (matches.length === 0) {
    return JSON.stringify({
      format,
      message: `No components found matching "${input.query}"`,
      suggestion: 'Try a broader search term or use list_components',
    });
  }

  return JSON.stringify({
    format,
    query: input.query,
    results: matches.map((c) => ({
      name: c.name,
      category: c.category,
      description: c.description,
    })),
    count: matches.length,
  }, null, 2);
}
