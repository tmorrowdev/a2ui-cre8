# Cre8 MCP Server

MCP (Model Context Protocol) server that provides component intelligence for the Cre8 design system.

Supports both **Web Components** (`@tmorrow/cre8-wc`) and **React** (`@tmorrow/cre8-react`) formats.

## Installation

```bash
npm install cre8-mcp
# or
npx cre8-mcp-proxy
```

## Usage with Claude Desktop

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "cre8": {
      "command": "npx",
      "args": ["-y", "cre8-mcp"]
    }
  }
}
```

## REST API

The server also exposes a REST API for direct HTTP access.

### Endpoints

**Web Components (default):**
- `GET /components` - List all components
- `GET /components/:name` - Get component details
- `GET /patterns` - List UI patterns
- `GET /search?q=query` - Search components

**React:**
- `GET /react/components` - List all React components
- `GET /react/components/:name` - Get React component details
- `GET /react/patterns` - List React patterns
- `GET /react/search?q=query` - Search React components

## MCP Tools

### `list_components`

Lists all available Cre8 components grouped by category.

**Categories:** Actions, Forms, Layout, Typography, Navigation, Disclosure, Feedback, Data, Media, Marketing

### `get_component`

Gets detailed information about a specific component.

**Web Components response includes:**
- Tag name and import statement
- Attributes (HTML attributes, kebab-case)
- Properties (JS-only, camelCase)
- Slots (content projection)
- Events (custom events)
- CSS Custom Properties (design tokens)
- Usage examples

**React response includes:**
- Component name and import statement
- Props with types and descriptions
- JSX examples

### `get_patterns`

Returns pre-built UI patterns:
- Login Form
- Data Table
- Page Layout
- Alert Banner
- Tabbed Content

### `search_components`

Search components by name, description, or category.

## Example Queries

- "List all form components" → `list_components` with category "Forms"
- "How do I use the Button component?" → `get_component` with name "button"
- "Find components for navigation" → `search_components` with query "navigation"
- "Show me the login form pattern" → `get_patterns` with name "Login Form"

## Component Count

- **60+ components** across 10 categories
- **5 pre-built patterns** for common UI layouts

## License

MIT
