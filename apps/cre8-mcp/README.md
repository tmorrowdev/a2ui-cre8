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
      "args": ["-y", "cre8-mcp-proxy"]
    }
  }
}
```

## Format Parameter

All tools accept a `format` parameter to specify which schema to use:

- `"react"` - Returns React component data (props, JSX examples)
- `"web"` - Returns Web Component data (attributes, slots, events, HTML examples)

**Default:** `"web"`

```javascript
// Get React component details
await mcp.call("get_component", { name: "Button", format: "react" });

// Get Web Component details
await mcp.call("get_component", { name: "button", format: "web" });
```

## MCP Tools

### `list_components`

Lists all available Cre8 components grouped by category.

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | string | Filter by category (optional) |
| `format` | `"react"` \| `"web"` | Output format (default: `"web"`) |

**Categories:** Actions, Forms, Layout, Typography, Navigation, Disclosure, Feedback, Data, Media, Marketing

### `get_component`

Gets detailed information about a specific component.

| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | string | Component name (required) |
| `format` | `"react"` \| `"web"` | Output format (default: `"web"`) |

**React response includes:**
- Component name and import statement
- Props with types and descriptions
- JSX examples

**Web Components response includes:**
- Tag name and import statement
- Attributes (HTML attributes, kebab-case)
- Properties (JS-only, camelCase)
- Slots (content projection)
- Events (custom events)
- Usage examples

### `get_patterns`

Returns pre-built UI patterns.

| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | string | Pattern name (optional) |
| `format` | `"react"` \| `"web"` | Output format (default: `"web"`) |

**Available patterns:**
- Login Form
- Data Table
- Page Layout
- Alert Banner
- Tabbed Content
- Modal Dialog

### `search_components`

Search components by name, description, or category.

| Parameter | Type | Description |
|-----------|------|-------------|
| `query` | string | Search query (required) |
| `format` | `"react"` \| `"web"` | Output format (default: `"web"`) |

### `generate_code`

Generates React JSX or Web Component HTML from a JSON schema.

| Parameter | Type | Description |
|-----------|------|-------------|
| `schema` | object | Component tree schema (required) |
| `format` | `"react"` \| `"web"` | Output format (default: `"web"`) |

**Schema structure:**
```json
{
  "component": "Card",
  "props": { "variant": "default" },
  "children": [
    { "component": "Heading", "props": { "tagVariant": "h2" }, "children": "Title" },
    { "component": "Button", "props": { "text": "Click", "variant": "primary" } }
  ]
}
```

**React output (`format: "react"`):**
```jsx
<Cre8Card variant="default">
  <Cre8Heading tagVariant="h2">Title</Cre8Heading>
  <Cre8Button text="Click" variant="primary" />
</Cre8Card>
```

**Web Components output (`format: "web"`):**
```html
<cre8-card variant="default">
  <cre8-heading tag-variant="h2">Title</cre8-heading>
  <cre8-button text="Click" variant="primary"></cre8-button>
</cre8-card>
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

## Example Workflow

```javascript
// 1. List form components (React format)
const forms = await mcp.call("list_components", {
  category: "Forms",
  format: "react"
});

// 2. Get details for a specific component
const field = await mcp.call("get_component", {
  name: "Cre8Field",
  format: "react"
});

// 3. Generate code from a schema
const code = await mcp.call("generate_code", {
  schema: {
    component: "Card",
    children: [
      { component: "Field", props: { label: "Email", type: "email" } },
      { component: "Button", props: { text: "Submit", variant: "primary" } }
    ]
  },
  format: "react"
});
// Returns: { format: "react", code: "<Cre8Card>..." }
```

## Component Count

- **82 components** across 10 categories
- **6 pre-built patterns** for common UI layouts

## License

MIT
