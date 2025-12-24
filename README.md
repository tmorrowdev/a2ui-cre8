# A2UI Bridge

Framework adapters for Google's [Adaptive Agent UI (A2UI) Protocol](https://github.com/nickclaw/nickclaw.github.io/blob/main/agentic-ui-spec.md), enabling LLM-driven UI generation across different frameworks and design systems.

## Overview

A2UI Bridge provides a modular architecture for rendering LLM-generated UIs:

```
                    A2UI Protocol (JSONL)
                           |
                           v
              +------------------------+
              |   @a2ui-bridge/core    |  <-- Framework-agnostic protocol processing
              +------------------------+
                           |
                           v
              +------------------------+
              |   @a2ui-bridge/react   |  <-- React rendering layer
              +------------------------+
                           |
                           v
              +------------------------+
              | @a2ui-bridge/react-    |  <-- ShadCN UI components
              |       shadcn           |
              +------------------------+
```

## Packages

| Package | Description |
|---------|-------------|
| `@a2ui-bridge/core` | Protocol processing, state management, data binding |
| `@a2ui-bridge/react` | React adapter with hooks and Surface component |
| `@a2ui-bridge/react-shadcn` | ShadCN/Tailwind component implementations |

## Quick Start

```bash
# Install packages
npm install @a2ui-bridge/core @a2ui-bridge/react @a2ui-bridge/react-shadcn
```

```tsx
import { Surface, useA2uiProcessor } from '@a2ui-bridge/react';
import { shadcnComponents } from '@a2ui-bridge/react-shadcn';

function App() {
  const processor = useA2uiProcessor();

  // Process messages from LLM
  useEffect(() => {
    processor.processMessages([
      {
        beginRendering: {
          surfaceId: '@default',
          root: 'greeting-card',
        },
      },
      {
        surfaceUpdate: {
          surfaceId: '@default',
          components: [
            {
              id: 'greeting-card',
              component: {
                componentType: 'Card',
                properties: {
                  children: ['greeting-text'],
                },
              },
            },
            {
              id: 'greeting-text',
              component: {
                componentType: 'Text',
                properties: {
                  text: { literalString: 'Hello from A2UI!' },
                  usageHint: 'h2',
                },
              },
            },
          ],
        },
      },
    ]);
  }, [processor]);

  return (
    <Surface
      processor={processor}
      components={shadcnComponents}
      onAction={(action) => console.log('Action:', action)}
    />
  );
}
```

## Protocol Messages

### beginRendering
Sets up the surface and specifies the root component:

```json
{
  "beginRendering": {
    "surfaceId": "@default",
    "root": "my-component-id"
  }
}
```

### surfaceUpdate
Updates components on the surface:

```json
{
  "surfaceUpdate": {
    "surfaceId": "@default",
    "components": [
      {
        "id": "my-component",
        "component": {
          "componentType": "Text",
          "properties": {
            "text": { "literalString": "Hello World" }
          }
        }
      }
    ]
  }
}
```

### dataModelUpdate
Updates data model values for data binding:

```json
{
  "dataModelUpdate": {
    "surfaceId": "@default",
    "path": "/",
    "contents": [
      { "key": "user.name", "value": { "valueString": "John" } }
    ]
  }
}
```

### deleteSurface
Removes a surface entirely:

```json
{
  "deleteSurface": {
    "surfaceId": "@default"
  }
}
```

## Supported Components

| Component | Description |
|-----------|-------------|
| `Text` | Text display with usage hints (h1, h2, body, caption, etc.) |
| `Button` | Clickable button with action callbacks |
| `Card` | Container with elevated styling |
| `Row` | Horizontal flex layout |
| `Column` | Vertical flex layout |
| `List` | Ordered/unordered list container |
| `TextField` | Text input with data binding |
| `Badge` | Small status indicator |
| `Divider` | Visual separator |
| `Image` | Image display |

## Data Binding

Components can bind to data model values using path references:

```json
{
  "componentType": "TextField",
  "properties": {
    "text": { "path": "form.email" },
    "label": { "literalString": "Email" }
  }
}
```

Actions can include context with data binding:

```json
{
  "action": {
    "name": "submit-form",
    "context": [
      { "key": "email", "value": { "path": "form.email" } }
    ]
  }
}
```

## Theming

The ShadCN components support theming via CSS variables:

```css
:root {
  --primary: 220 90% 56%;
  --primary-foreground: 0 0% 100%;
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  --card: 0 0% 100%;
  --card-foreground: 222 47% 11%;
  /* ... more variables */
}

.dark {
  --primary: 217 91% 60%;
  --background: 222 47% 11%;
  --foreground: 210 40% 98%;
  /* ... dark mode overrides */
}
```

## Development

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm run build

# Run demo
cd apps/demo && pnpm run dev
```

## Architecture

### Core Layer (`@a2ui-bridge/core`)
- Processes A2UI protocol messages
- Manages surface state and component trees
- Handles data model with path-based binding
- Framework-agnostic, design-system-agnostic

### React Layer (`@a2ui-bridge/react`)
- `useA2uiProcessor()` - Hook to create processor instance
- `Surface` - Main rendering component
- Uses `useSyncExternalStore` for React 18 concurrent mode compatibility
- Pluggable component mapping

### Component Layer (`@a2ui-bridge/react-shadcn`)
- Implements A2UI components using ShadCN/Radix primitives
- Tailwind CSS styling with full theming support
- Accessible, production-ready components

## License

MIT
