# Cre8 MCP Server

MCP (Model Context Protocol) server that provides component intelligence for the `@tmorrow/cre8-react` design system.

## Tools

### `list_components`

Lists all available Cre8 React components grouped by category.

**Categories:** Actions, Forms, Layout, Typography, Navigation, Disclosure, Feedback, Data, Media, Marketing

### `get_component`

Gets detailed information about a specific component including:

- Import statement
- Props with types and descriptions
- Usage examples

### `get_patterns`

Returns pre-built UI patterns using Cre8 components:

- Login Form
- Data Table
- Page Layout
- Alert Banner
- Tabbed Content

### `search_components`

Search components by name, description, or category.

## Usage with Claude Desktop

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "cre8-mcp": {
      "command": "node",
      "args": ["/Users/tylersmbp/Projects/a2ui-bridge/apps/cre8-mcp/dist/index.js"]
    }
  }
}
```

## Development

```bash
# Install dependencies
pnpm install

# Build
pnpm run build

# Run in watch mode
pnpm run dev
```

## Example Queries

- "List all form components" → `list_components` with category "Forms"
- "How do I use the Button component?" → `get_component` with name "Button"
- "Find components for navigation" → `search_components` with query "navigation"
- "Show me the login form pattern" → `get_patterns` with name "Login Form"
