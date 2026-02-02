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
