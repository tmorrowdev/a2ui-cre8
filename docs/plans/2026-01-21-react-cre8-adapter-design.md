# A2UI Bridge: React Cre8 Adapter Design

## Overview

Create a new adapter package `@a2ui-bridge/react-cre8` that maps A2UI protocol components to the cre8 design system (`@tmorrow/cre8-wc` and `@tmorrow/cre8-react`).

## Goals

1. Map core A2UI protocol types (~20 components) to cre8 equivalents
2. Extend the A2UI vocabulary with cre8-specific components (Hero, Band, Feature, etc.)
3. Follow the same patterns as `@a2ui-bridge/react-shadcn`

## Package Structure

```
packages/react-cre8/
├── src/
│   ├── components/           # Individual adapter components
│   │   ├── Button.tsx
│   │   ├── Text.tsx
│   │   ├── Row.tsx
│   │   ├── Column.tsx
│   │   ├── Card.tsx
│   │   ├── ... (core A2UI types)
│   │   ├── Hero.tsx          # cre8-specific extended types
│   │   ├── Band.tsx
│   │   ├── Feature.tsx
│   │   ├── ProgressSteps.tsx
│   │   └── index.ts
│   ├── mapping.ts            # Component registry with aliases
│   ├── utils.ts              # Helper functions
│   └── index.ts              # Main exports
├── package.json
└── tsconfig.json
```

## Dependencies

```json
{
  "dependencies": {
    "@a2ui-bridge/core": "workspace:*",
    "@a2ui-bridge/react": "workspace:*",
    "@tmorrow/cre8-react": "^1.0.15"
  },
  "peerDependencies": {
    "react": "^18 || ^19",
    "react-dom": "^18 || ^19"
  }
}
```

## Usage

```tsx
import { Surface } from '@a2ui-bridge/react';
import { cre8Components } from '@a2ui-bridge/react-cre8';

// Import cre8 design tokens (choose one):
// Via CDN in HTML: <link href="https://cdn.jsdelivr.net/npm/@cre8_dev/cre8-design-tokens@1.0.3/lib/web/brands/cre8/css/tokens_cre8.css" rel="stylesheet">
// Via npm: import '@cre8_dev/cre8-design-tokens/lib/web/brands/cre8/css/tokens_cre8.css';

<Surface
  processor={processor}
  components={cre8Components}
  onAction={handleAction}
/>
```

## Core A2UI Component Mappings

| A2UI Type | Cre8 Component | Notes |
|-----------|----------------|-------|
| Button | `Cre8Button` | Map action → click handler, variant → primary/secondary/tertiary |
| Text | `Cre8Heading` / `Cre8TextPassage` | Use Heading for h1-h5, TextPassage for body/caption |
| Row | `Cre8Grid` + flex direction | Or custom div with flexbox |
| Column | `Cre8Grid` + flex direction | Or custom div with flexbox |
| Card | `Cre8Card` | Direct mapping |
| Badge | `Cre8Badge` | Direct mapping |
| Divider | `Cre8Divider` | Direct mapping |
| TextField | `Cre8Field` | Map label, placeholder, value binding |
| Checkbox | `Cre8CheckboxField` + `Cre8CheckboxFieldItem` | Composite structure |
| Select | `Cre8Select` | Map options array |
| Tabs | `Cre8Tabs` + `Cre8Tab` + `Cre8TabPanel` | Composite structure |
| Modal | `Cre8Modal` | Map entryPoint/content children |
| List | `Cre8List` + `Cre8ListItem` | Or `Cre8LinkList` for link lists |
| Grid | `Cre8Grid` + `Cre8GridItem` | Map columns/gap |
| Slider | `Cre8ProgressMeter` | Closest equivalent (display only) |
| Image | Native `<img>` | Cre8 doesn't have dedicated Image component |
| Icon | `Cre8Icon` | Map svg prop |

**Missing in cre8:** Slider (interactive), AudioPlayer, Video - use native HTML elements or Fallback.

## Extended Cre8-Specific Components

### Layout & Structure

| Component | Purpose |
|-----------|---------|
| Hero | Hero banner sections with title, description, CTA |
| Band | Full-width content bands/sections |
| Feature | Feature highlight blocks |
| Section | Page section wrapper |
| Layout / LayoutContainer / LayoutSection | Page layout system |
| LinelengthContainer | Content width constraint |

### Navigation

| Component | Purpose |
|-----------|---------|
| GlobalNav / GlobalNavItem | Top-level navigation |
| PrimaryNav / PrimaryNavItem | Primary navigation menu |
| TertiaryNav / TertiaryNavItem | Tertiary navigation |
| Breadcrumbs / BreadcrumbsItem | Breadcrumb navigation |
| Submenu / SubmenuItem | Dropdown submenus |

### Feedback & Progress

| Component | Purpose |
|-----------|---------|
| Alert / InlineAlert | Alert messages |
| ProgressSteps / ProgressStepsItem | Multi-step progress indicators |
| PercentBar | Percentage progress bar |
| LoadingSpinner | Loading state indicator |
| SkeletonLoader | Content loading placeholder |

### Specialized

| Component | Purpose |
|-----------|---------|
| Accordion / AccordionItem | Collapsible content sections |
| Dropdown / DropdownItem | Dropdown menus |
| Popover | Popover overlays |
| Tooltip | Tooltips |
| Tag / TagList / RemoveTag | Tag/chip components |
| DatePicker | Date selection input |

## Adapter Implementation Pattern

Each adapter receives A2UI node props and renders the corresponding cre8 component:

```tsx
import type { ButtonNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { renderChild } from '@a2ui-bridge/react';
import { Cre8Button } from '@tmorrow/cre8-react';

export function Button({ node, onAction, components, surfaceId }: A2UIComponentProps<ButtonNode>) {
  const { properties } = node;

  // Map A2UI variant to cre8 variant
  const variant = properties.variant?.literalString as 'primary' | 'secondary' | 'tertiary' ?? 'primary';

  const handleClick = () => {
    if (properties.action) {
      onAction({
        actionName: properties.action.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: properties.action.context?.reduce(
          (acc, item) => {
            acc[item.key] = item.value.literalString ?? item.value.literalNumber ?? item.value.literalBoolean;
            return acc;
          },
          {} as Record<string, unknown>
        ),
      });
    }
  };

  return (
    <Cre8Button
      variant={variant}
      onClick={handleClick}
    >
      {renderChild(properties.child, components, onAction, surfaceId)}
    </Cre8Button>
  );
}
```

**Key patterns:**
- Extract values using `literalString`, `literalNumber`, `literalBoolean` from A2UI DataValue types
- Use `renderChild()` / `renderChildren()` helpers for nested components
- Create action handlers that dispatch `UserAction` events
- Map A2UI property names to cre8 prop names

## Component Registry

```tsx
import type { ComponentMapping } from '@a2ui-bridge/react';

export const cre8Components: ComponentMapping = {
  // Core A2UI types
  Button,
  Text,
  Row,
  Column,
  Card,
  Badge,
  Divider,
  TextField,
  Checkbox,
  Select,
  Tabs,
  Modal,
  List,
  Grid,
  Image,
  Icon,

  // Aliases for compatibility
  CheckBox: Checkbox,
  HStack: Row,
  VStack: Column,

  // Extended cre8-specific types
  Hero,
  Band,
  Feature,
  Section,
  Alert,
  InlineAlert,
  Accordion,
  AccordionItem,
  ProgressSteps,
  ProgressStepsItem,
  Breadcrumbs,
  BreadcrumbsItem,
  GlobalNav,
  PrimaryNav,
  Dropdown,
  Popover,
  Tooltip,
  Tag,
  TagList,
  DatePicker,
  LoadingSpinner,
  SkeletonLoader,
  // ... all extended components

  __fallback__: Fallback,
};
```

## CSS/Theming

Users are responsible for importing cre8 CSS tokens:

```tsx
// Option 1: Default cre8 theme
import '@tmorrow/cre8-wc/tokens_cre8.css';

// Option 2: Brand-specific theme
import '@tmorrow/cre8-wc/tokens_brand.css';
```

The adapter package does not bundle CSS - it only renders components.

## Implementation Order

1. Package setup (package.json, tsconfig.json, directory structure)
2. Core layout components (Row, Column, Card, Grid)
3. Typography (Text, Badge)
4. Form inputs (Button, TextField, Checkbox, Select)
5. Navigation (Tabs, Breadcrumbs)
6. Feedback (Alert, Modal, Tooltip)
7. Extended cre8-specific components
8. Fallback component for unknown types
9. Component registry and exports
10. Update demo app to support cre8 adapter
