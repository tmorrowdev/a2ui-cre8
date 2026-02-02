/**
 * Cre8 MCP Tool Handlers
 *
 * Functions that implement the Cre8 Design System MCP tools.
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Types
interface PropDef {
  type: string;
  description?: string;
  enum?: string[];
  default?: unknown;
  required?: boolean;
}

interface ComponentDef {
  name: string;
  category: string;
  description: string;
  props: Record<string, PropDef>;
  examples?: Array<{ description: string; jsx: string }>;
}

interface Pattern {
  name: string;
  description: string;
  template: string;
}

interface Catalog {
  version: string;
  library: string;
  components: ComponentDef[];
  patterns: Pattern[];
}

// Load catalog
let catalog: Catalog;

function loadCatalog(): Catalog {
  if (catalog) return catalog;

  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const catalogPath = join(__dirname, '..', 'data', 'components.json');
    catalog = JSON.parse(readFileSync(catalogPath, 'utf-8'));
  } catch {
    const catalogPath = join(process.cwd(), 'apps', 'cre8-mcp', 'data', 'components.json');
    catalog = JSON.parse(readFileSync(catalogPath, 'utf-8'));
  }

  return catalog;
}

// Tool Input Types
export interface ListComponentsInput {
  category?: string;
}

export interface GetComponentInput {
  name: string;
}

export interface GetPatternsInput {
  name?: string;
}

export interface SearchComponentsInput {
  query: string;
}

/**
 * list_components - Lists all available Cre8 components
 */
export function handleListComponents(input: ListComponentsInput): string {
  const cat = loadCatalog();
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
  const cat = loadCatalog();

  // Find component (case-insensitive, with or without Cre8 prefix)
  const searchName = input.name.toLowerCase().replace(/^cre8/, '');
  const component = cat.components.find(
    (c) => c.name.toLowerCase() === input.name.toLowerCase() ||
           c.name.toLowerCase().replace(/^cre8/, '') === searchName
  );

  if (!component) {
    return JSON.stringify({
      error: `Component "${input.name}" not found`,
      suggestion: 'Use list_components to see available components',
    });
  }

  const result = {
    name: component.name,
    category: component.category,
    description: component.description,
    import: `import { ${component.name} } from '@tmorrow/cre8-react';`,
    props: component.props,
    examples: component.examples || [],
  };

  return JSON.stringify(result, null, 2);
}

/**
 * get_patterns - Gets layout patterns and templates
 */
export function handleGetPatterns(input: GetPatternsInput): string {
  const cat = loadCatalog();

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

    return JSON.stringify(pattern, null, 2);
  }

  return JSON.stringify({
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
  const cat = loadCatalog();
  const query = input.query.toLowerCase();

  const matches = cat.components.filter(
    (c) =>
      c.name.toLowerCase().includes(query) ||
      c.description.toLowerCase().includes(query) ||
      c.category.toLowerCase().includes(query)
  );

  if (matches.length === 0) {
    return JSON.stringify({
      message: `No components found matching "${input.query}"`,
      suggestion: 'Try a broader search term or use list_components',
    });
  }

  return JSON.stringify({
    query: input.query,
    results: matches.map((c) => ({
      name: c.name,
      category: c.category,
      description: c.description,
    })),
    count: matches.length,
  }, null, 2);
}
