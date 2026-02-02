# React Cre8 Adapter Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create `@a2ui-bridge/react-cre8` adapter package that maps A2UI protocol components to the cre8 design system.

**Architecture:** New package in `packages/react-cre8/` following the same structure as `react-shadcn`. Each adapter receives A2UI node props and renders corresponding cre8-react components. Extended cre8-specific components (Hero, Band, Feature, etc.) are exposed as additional node types.

**Tech Stack:** TypeScript, React 18/19, @tmorrow/cre8-react, @a2ui-bridge/core, @a2ui-bridge/react

---

## Task 1: Package Scaffold

**Files:**
- Create: `packages/react-cre8/package.json`
- Create: `packages/react-cre8/tsconfig.json`
- Create: `packages/react-cre8/src/index.ts`
- Create: `packages/react-cre8/src/utils.ts`

**Step 1: Create package.json**

```json
{
  "name": "@a2ui-bridge/react-cre8",
  "version": "0.1.0",
  "description": "Cre8 UI components for A2UI React applications",
  "author": "southleft",
  "license": "MIT",
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    }
  },
  "files": [
    "dist",
    "README.md"
  ],
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "clean": "rm -rf dist *.tsbuildinfo",
    "lint": "eslint src"
  },
  "dependencies": {
    "@a2ui-bridge/core": "workspace:*",
    "@a2ui-bridge/react": "workspace:*",
    "@tmorrow/cre8-react": "^1.0.15"
  },
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.0",
    "react": "^18.3.0",
    "typescript": "^5.7.2"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/southleft/a2ui-bridge.git",
    "directory": "packages/react-cre8"
  },
  "keywords": [
    "a2ui",
    "react",
    "cre8",
    "ui-components"
  ]
}
```

**Step 2: Create tsconfig.json**

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "composite": true,
    "jsx": "react-jsx"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"],
  "references": [
    { "path": "../core" },
    { "path": "../react" }
  ]
}
```

**Step 3: Create src/utils.ts**

```typescript
/**
 * @a2ui-bridge/react-cre8 - Utility functions
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode, DataValue } from '@a2ui-bridge/core';

/**
 * Extract a string value from A2UI DataValue types.
 */
export function extractString(value: unknown): string | undefined {
  if (value === null || value === undefined) return undefined;
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && 'literalString' in value) {
    return (value as { literalString: string }).literalString;
  }
  return undefined;
}

/**
 * Extract a number value from A2UI DataValue types.
 */
export function extractNumber(value: unknown): number | undefined {
  if (value === null || value === undefined) return undefined;
  if (typeof value === 'number') return value;
  if (typeof value === 'object' && 'literalNumber' in value) {
    return (value as { literalNumber: number }).literalNumber;
  }
  return undefined;
}

/**
 * Extract a boolean value from A2UI DataValue types.
 */
export function extractBoolean(value: unknown): boolean | undefined {
  if (value === null || value === undefined) return undefined;
  if (typeof value === 'boolean') return value;
  if (typeof value === 'object' && 'literalBoolean' in value) {
    return (value as { literalBoolean: boolean }).literalBoolean;
  }
  return undefined;
}

/**
 * Merge class names, filtering out falsy values.
 */
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
```

**Step 4: Create src/index.ts (placeholder)**

```typescript
/**
 * @a2ui-bridge/react-cre8
 * Cre8 UI components for A2UI React applications
 *
 * MIT License - Copyright (c) 2025 southleft
 */

// Component mapping - main export for using with Root/Surface
export { cre8Components } from './mapping.js';

// Individual components for customization
export * from './components/index.js';

// Utilities
export { cn, extractString, extractNumber, extractBoolean } from './utils.js';
```

**Step 5: Create directory structure**

Run: `mkdir -p packages/react-cre8/src/components`

**Step 6: Install dependencies**

Run: `pnpm install`

---

## Task 2: Fallback Component

**Files:**
- Create: `packages/react-cre8/src/components/Fallback.tsx`

**Step 1: Create Fallback.tsx**

```tsx
/**
 * @a2ui-bridge/react-cre8 - Fallback component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';

/**
 * Fallback component for unknown component types.
 */
export function Fallback({ node, children }: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const componentType = node.type ?? 'Unknown';

  return (
    <div style={{
      border: '2px dashed #f59e0b',
      borderRadius: '4px',
      padding: '12px',
      backgroundColor: 'rgba(245, 158, 11, 0.1)',
    }}>
      <div style={{
        fontSize: '12px',
        color: '#d97706',
        marginBottom: '8px',
        fontFamily: 'monospace',
      }}>
        ⚠️ Unknown component: <code style={{
          backgroundColor: 'rgba(245, 158, 11, 0.2)',
          padding: '2px 4px',
          borderRadius: '2px',
        }}>{componentType}</code>
      </div>
      {children && <div style={{ marginTop: '8px' }}>{children}</div>}
      <details style={{ marginTop: '8px', fontSize: '12px' }}>
        <summary style={{ cursor: 'pointer', color: '#6b7280' }}>
          Component data
        </summary>
        <pre style={{
          marginTop: '8px',
          padding: '8px',
          backgroundColor: '#f3f4f6',
          borderRadius: '4px',
          fontSize: '11px',
          overflow: 'auto',
          maxHeight: '160px',
        }}>
          {JSON.stringify(node, null, 2)}
        </pre>
      </details>
    </div>
  );
}
```

---

## Task 3: Row Component

**Files:**
- Create: `packages/react-cre8/src/components/Row.tsx`

**Step 1: Create Row.tsx**

```tsx
/**
 * @a2ui-bridge/react-cre8 - Row component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { RowNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { renderChildren } from '@a2ui-bridge/react';
import { cn } from '../utils.js';

const distributionStyles: Record<string, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  spaceBetween: 'space-between',
  spaceAround: 'space-around',
  spaceEvenly: 'space-evenly',
};

const alignmentStyles: Record<string, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
};

export function Row({
  node,
  onAction,
  components,
  surfaceId,
}: A2UIComponentProps<RowNode>): JSX.Element {
  const { properties } = node;

  const distribution = properties.distribution ?? 'start';
  const alignment = properties.alignment ?? 'center';

  const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: distributionStyles[distribution] ?? 'flex-start',
    alignItems: alignmentStyles[alignment] ?? 'center',
    gap: '8px',
  };

  return (
    <div style={style}>
      {renderChildren(properties.children ?? [], components, onAction, surfaceId)}
    </div>
  );
}
```

---

## Task 4: Column Component

**Files:**
- Create: `packages/react-cre8/src/components/Column.tsx`

**Step 1: Create Column.tsx**

```tsx
/**
 * @a2ui-bridge/react-cre8 - Column component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { ColumnNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { renderChildren } from '@a2ui-bridge/react';

const distributionStyles: Record<string, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  spaceBetween: 'space-between',
  spaceAround: 'space-around',
  spaceEvenly: 'space-evenly',
};

const alignmentStyles: Record<string, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
};

export function Column({
  node,
  onAction,
  components,
  surfaceId,
}: A2UIComponentProps<ColumnNode>): JSX.Element {
  const { properties } = node;

  const distribution = properties.distribution ?? 'start';
  const alignment = properties.alignment ?? 'stretch';

  const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: distributionStyles[distribution] ?? 'flex-start',
    alignItems: alignmentStyles[alignment] ?? 'stretch',
    gap: '8px',
  };

  return (
    <div style={style}>
      {renderChildren(properties.children ?? [], components, onAction, surfaceId)}
    </div>
  );
}
```

---

## Task 5: Text Component

**Files:**
- Create: `packages/react-cre8/src/components/Text.tsx`

**Step 1: Create Text.tsx**

```tsx
/**
 * @a2ui-bridge/react-cre8 - Text component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { TextNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8Heading, Cre8TextPassage } from '@tmorrow/cre8-react';
import { extractString } from '../utils.js';

export function Text({ node }: A2UIComponentProps<TextNode>): JSX.Element {
  const { properties } = node;

  const text = extractString(properties.text) ?? '';
  const textType = properties.textType ?? 'body';

  // Map A2UI textType to cre8 components
  const headingTypes = ['h1', 'h2', 'h3', 'h4', 'h5'];

  if (headingTypes.includes(textType)) {
    // Use Cre8Heading for heading types
    const level = textType as 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
    return <Cre8Heading tagName={level}>{text}</Cre8Heading>;
  }

  // Use Cre8TextPassage for body text
  return <Cre8TextPassage>{text}</Cre8TextPassage>;
}
```

---

## Task 6: Button Component

**Files:**
- Create: `packages/react-cre8/src/components/Button.tsx`

**Step 1: Create Button.tsx**

```tsx
/**
 * @a2ui-bridge/react-cre8 - Button component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { ButtonNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { renderChild } from '@a2ui-bridge/react';
import { Cre8Button } from '@tmorrow/cre8-react';
import { extractString, extractBoolean } from '../utils.js';

// Extended properties that may be passed
interface ExtendedButtonProps {
  variant?: { literalString?: string };
  fullWidth?: { literalBoolean?: boolean };
  size?: { literalString?: string };
  disabled?: { literalBoolean?: boolean };
}

export function Button({
  node,
  onAction,
  components,
  surfaceId,
}: A2UIComponentProps<ButtonNode>): JSX.Element {
  const { properties } = node;
  const extendedProps = properties as typeof properties & ExtendedButtonProps;

  // Map A2UI variant to cre8 variant
  const variantMap: Record<string, 'primary' | 'secondary' | 'tertiary'> = {
    filled: 'primary',
    primary: 'primary',
    outline: 'secondary',
    secondary: 'secondary',
    subtle: 'tertiary',
    tertiary: 'tertiary',
    default: 'primary',
  };

  const variantStr = extractString(extendedProps.variant) ?? 'primary';
  const variant = variantMap[variantStr] ?? 'primary';

  const fullWidth = extractBoolean(extendedProps.fullWidth) ?? false;
  const disabled = extractBoolean(extendedProps.disabled) ?? false;
  const size = extractString(extendedProps.size) as 'sm' | 'md' | 'lg' | undefined ?? 'md';

  const handleClick = () => {
    if (properties.action) {
      onAction({
        actionName: properties.action.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: properties.action.context?.reduce(
          (acc, item) => {
            acc[item.key] =
              item.value.literalString ??
              item.value.literalNumber ??
              item.value.literalBoolean;
            return acc;
          },
          {} as Record<string, unknown>
        ),
      });
    }
  };

  // Extract button text from child if it's a Text node
  const child = properties.child;
  let buttonText = 'Button';
  if (child && typeof child === 'object' && 'type' in child) {
    if (child.type === 'Text' && child.properties?.text) {
      buttonText = extractString(child.properties.text) ?? 'Button';
    }
  }

  return (
    <Cre8Button
      variant={variant}
      text={buttonText}
      fullWidth={fullWidth}
      disabled={disabled}
      size={size}
      onClick={handleClick}
    />
  );
}
```

---

## Task 7: Card Component

**Files:**
- Create: `packages/react-cre8/src/components/Card.tsx`

**Step 1: Create Card.tsx**

```tsx
/**
 * @a2ui-bridge/react-cre8 - Card component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { CardNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { renderChild, renderChildren } from '@a2ui-bridge/react';
import { Cre8Card } from '@tmorrow/cre8-react';

export function Card({
  node,
  onAction,
  components,
  surfaceId,
}: A2UIComponentProps<CardNode>): JSX.Element {
  const { properties } = node;

  return (
    <Cre8Card>
      {properties.child && renderChild(properties.child, components, onAction, surfaceId)}
      {properties.children && renderChildren(properties.children, components, onAction, surfaceId)}
    </Cre8Card>
  );
}
```

---

## Task 8: Badge Component

**Files:**
- Create: `packages/react-cre8/src/components/Badge.tsx`

**Step 1: Create Badge.tsx**

```tsx
/**
 * @a2ui-bridge/react-cre8 - Badge component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { BadgeNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8Badge } from '@tmorrow/cre8-react';
import { extractString } from '../utils.js';

export function Badge({ node }: A2UIComponentProps<BadgeNode>): JSX.Element {
  const { properties } = node;

  const text = extractString(properties.text) ?? '';

  return <Cre8Badge text={text} />;
}
```

---

## Task 9: Divider Component

**Files:**
- Create: `packages/react-cre8/src/components/Divider.tsx`

**Step 1: Create Divider.tsx**

```tsx
/**
 * @a2ui-bridge/react-cre8 - Divider component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { DividerNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8Divider } from '@tmorrow/cre8-react';

export function Divider({ node }: A2UIComponentProps<DividerNode>): JSX.Element {
  return <Cre8Divider />;
}
```

---

## Task 10: Alert Component (Extended)

**Files:**
- Create: `packages/react-cre8/src/components/Alert.tsx`

**Step 1: Create Alert.tsx**

```tsx
/**
 * @a2ui-bridge/react-cre8 - Alert component (cre8 extended)
 * MIT License - Copyright (c) 2025 southleft
 */

import type { CustomNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8Alert } from '@tmorrow/cre8-react';
import { extractString, extractBoolean } from '../utils.js';

export function Alert({ node }: A2UIComponentProps<CustomNode>): JSX.Element {
  const { properties } = node;

  const headingText = extractString(properties.headingText);
  const bodyText = extractString(properties.bodyText);
  const status = extractString(properties.status) as 'info' | 'success' | 'warning' | 'error' | undefined;
  const dismissible = extractBoolean(properties.dismissible);

  return (
    <Cre8Alert
      headingText={headingText}
      bodyText={bodyText}
      status={status}
      dismissible={dismissible}
    />
  );
}
```

---

## Task 11: Hero Component (Extended)

**Files:**
- Create: `packages/react-cre8/src/components/Hero.tsx`

**Step 1: Create Hero.tsx**

```tsx
/**
 * @a2ui-bridge/react-cre8 - Hero component (cre8 extended)
 * MIT License - Copyright (c) 2025 southleft
 */

import type { CustomNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { renderChildren } from '@a2ui-bridge/react';
import { Cre8Hero } from '@tmorrow/cre8-react';

export function Hero({
  node,
  onAction,
  components,
  surfaceId,
}: A2UIComponentProps<CustomNode>): JSX.Element {
  const { properties } = node;

  const children = properties.children as any[] | undefined;

  return (
    <Cre8Hero>
      {children && renderChildren(children, components, onAction, surfaceId)}
    </Cre8Hero>
  );
}
```

---

## Task 12: Band Component (Extended)

**Files:**
- Create: `packages/react-cre8/src/components/Band.tsx`

**Step 1: Create Band.tsx**

```tsx
/**
 * @a2ui-bridge/react-cre8 - Band component (cre8 extended)
 * MIT License - Copyright (c) 2025 southleft
 */

import type { CustomNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { renderChildren } from '@a2ui-bridge/react';
import { Cre8Band } from '@tmorrow/cre8-react';

export function Band({
  node,
  onAction,
  components,
  surfaceId,
}: A2UIComponentProps<CustomNode>): JSX.Element {
  const { properties } = node;

  const children = properties.children as any[] | undefined;

  return (
    <Cre8Band>
      {children && renderChildren(children, components, onAction, surfaceId)}
    </Cre8Band>
  );
}
```

---

## Task 13: LoadingSpinner Component (Extended)

**Files:**
- Create: `packages/react-cre8/src/components/LoadingSpinner.tsx`

**Step 1: Create LoadingSpinner.tsx**

```tsx
/**
 * @a2ui-bridge/react-cre8 - LoadingSpinner component (cre8 extended)
 * MIT License - Copyright (c) 2025 southleft
 */

import type { CustomNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8LoadingSpinner } from '@tmorrow/cre8-react';
import { extractString } from '../utils.js';

export function LoadingSpinner({ node }: A2UIComponentProps<CustomNode>): JSX.Element {
  const { properties } = node;

  const size = extractString(properties.size) as 'small' | 'medium' | 'large' | undefined;

  return <Cre8LoadingSpinner size={size} />;
}
```

---

## Task 14: Components Index

**Files:**
- Create: `packages/react-cre8/src/components/index.ts`

**Step 1: Create components/index.ts**

```typescript
/**
 * @a2ui-bridge/react-cre8 - Component exports
 */

// Layout components
export { Row } from './Row.js';
export { Column } from './Column.js';
export { Card } from './Card.js';
export { Divider } from './Divider.js';

// Typography & Display
export { Text } from './Text.js';
export { Badge } from './Badge.js';

// Form inputs
export { Button } from './Button.js';

// Extended cre8-specific components
export { Alert } from './Alert.js';
export { Hero } from './Hero.js';
export { Band } from './Band.js';
export { LoadingSpinner } from './LoadingSpinner.js';

// Utility
export { Fallback } from './Fallback.js';
```

---

## Task 15: Component Mapping

**Files:**
- Create: `packages/react-cre8/src/mapping.ts`

**Step 1: Create mapping.ts**

```typescript
/**
 * @a2ui-bridge/react-cre8 - Component mapping
 * MIT License - Copyright (c) 2025 southleft
 */

import type { ComponentMapping } from '@a2ui-bridge/react';

// Core A2UI adapters
import { Row } from './components/Row.js';
import { Column } from './components/Column.js';
import { Card } from './components/Card.js';
import { Divider } from './components/Divider.js';
import { Text } from './components/Text.js';
import { Badge } from './components/Badge.js';
import { Button } from './components/Button.js';

// Extended cre8-specific adapters
import { Alert } from './components/Alert.js';
import { Hero } from './components/Hero.js';
import { Band } from './components/Band.js';
import { LoadingSpinner } from './components/LoadingSpinner.js';

// Utility
import { Fallback } from './components/Fallback.js';

/**
 * Cre8 component mapping for A2UI.
 * Use this with the Root or Surface components.
 *
 * @example
 * ```tsx
 * import { Surface } from '@a2ui-bridge/react';
 * import { cre8Components } from '@a2ui-bridge/react-cre8';
 * import '@tmorrow/cre8-wc/tokens_cre8.css';
 *
 * <Surface
 *   processor={processor}
 *   components={cre8Components}
 *   onAction={handleAction}
 * />
 * ```
 */
export const cre8Components: ComponentMapping = {
  // Core A2UI types
  Row,
  Column,
  Card,
  Divider,
  Text,
  Badge,
  Button,

  // Layout aliases
  HStack: Row,
  VStack: Column,
  Stack: Column,

  // Extended cre8-specific types
  Alert,
  Hero,
  Band,
  LoadingSpinner,
  Spinner: LoadingSpinner,
  Loader: LoadingSpinner,

  // Fallback for unknown components
  __fallback__: Fallback,
};

/**
 * Creates a component mapping with custom overrides.
 */
export function createComponentsWithFallback(
  customComponents?: Partial<ComponentMapping>
): ComponentMapping {
  return {
    ...cre8Components,
    ...customComponents,
  };
}

/**
 * Re-export the Fallback component for direct use
 */
export { Fallback };
```

---

## Task 16: Build and Verify

**Step 1: Build the package**

Run: `cd packages/react-cre8 && pnpm build`

Expected: TypeScript compiles without errors, creates `dist/` folder

**Step 2: Run workspace build**

Run: `pnpm run build`

Expected: All packages build successfully including react-cre8

---

## Task 17: Additional Core Components (TextField, Select, Checkbox)

**Files:**
- Create: `packages/react-cre8/src/components/TextField.tsx`
- Create: `packages/react-cre8/src/components/Select.tsx`
- Create: `packages/react-cre8/src/components/Checkbox.tsx`

**Step 1: Create TextField.tsx**

```tsx
/**
 * @a2ui-bridge/react-cre8 - TextField component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { TextFieldNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8Field } from '@tmorrow/cre8-react';
import { extractString, extractBoolean } from '../utils.js';

export function TextField({
  node,
  onAction,
}: A2UIComponentProps<TextFieldNode>): JSX.Element {
  const { properties } = node;

  const label = extractString(properties.label);
  const placeholder = extractString(properties.placeholder);
  const value = extractString(properties.value);
  const disabled = extractBoolean(properties.disabled);
  const required = extractBoolean(properties.required);

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (properties.action) {
      onAction({
        actionName: properties.action.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: { value: target.value },
      });
    }
  };

  return (
    <Cre8Field
      label={label}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      required={required}
      onInput={handleChange}
    />
  );
}
```

**Step 2: Create Select.tsx**

```tsx
/**
 * @a2ui-bridge/react-cre8 - Select component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { SelectNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8Select } from '@tmorrow/cre8-react';
import { extractString, extractBoolean } from '../utils.js';

export function Select({
  node,
  onAction,
}: A2UIComponentProps<SelectNode>): JSX.Element {
  const { properties } = node;

  const label = extractString(properties.label);
  const placeholder = extractString(properties.placeholder);
  const disabled = extractBoolean(properties.disabled);
  const required = extractBoolean(properties.required);

  // Map options
  const options = properties.options?.map((opt) => ({
    value: extractString(opt.value) ?? '',
    label: extractString(opt.label) ?? extractString(opt.value) ?? '',
  })) ?? [];

  const handleChange = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    if (properties.action) {
      onAction({
        actionName: properties.action.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: { value: target.value },
      });
    }
  };

  return (
    <Cre8Select
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      onChange={handleChange}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </Cre8Select>
  );
}
```

**Step 3: Create Checkbox.tsx**

```tsx
/**
 * @a2ui-bridge/react-cre8 - Checkbox component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { CheckboxNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8CheckboxField, Cre8CheckboxFieldItem } from '@tmorrow/cre8-react';
import { extractString, extractBoolean } from '../utils.js';

export function Checkbox({
  node,
  onAction,
}: A2UIComponentProps<CheckboxNode>): JSX.Element {
  const { properties } = node;

  const label = extractString(properties.label);
  const checked = extractBoolean(properties.checked);
  const disabled = extractBoolean(properties.disabled);

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (properties.action) {
      onAction({
        actionName: properties.action.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: { checked: target.checked },
      });
    }
  };

  return (
    <Cre8CheckboxField>
      <Cre8CheckboxFieldItem
        label={label}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
      />
    </Cre8CheckboxField>
  );
}
```

**Step 4: Update components/index.ts**

Add exports:
```typescript
export { TextField } from './TextField.js';
export { Select } from './Select.js';
export { Checkbox } from './Checkbox.js';
```

**Step 5: Update mapping.ts**

Add to imports and cre8Components:
```typescript
import { TextField } from './components/TextField.js';
import { Select } from './components/Select.js';
import { Checkbox } from './components/Checkbox.js';

// In cre8Components:
TextField,
Select,
Checkbox,
CheckBox: Checkbox,
```

---

## Task 18: Image and Icon Components

**Files:**
- Create: `packages/react-cre8/src/components/Image.tsx`
- Create: `packages/react-cre8/src/components/Icon.tsx`

**Step 1: Create Image.tsx**

```tsx
/**
 * @a2ui-bridge/react-cre8 - Image component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { ImageNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { extractString } from '../utils.js';

export function Image({ node }: A2UIComponentProps<ImageNode>): JSX.Element {
  const { properties } = node;

  const src = extractString(properties.src) ?? '';
  const alt = extractString(properties.altText) ?? '';

  return (
    <img
      src={src}
      alt={alt}
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  );
}
```

**Step 2: Create Icon.tsx**

```tsx
/**
 * @a2ui-bridge/react-cre8 - Icon component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { IconNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8Icon } from '@tmorrow/cre8-react';
import { extractString } from '../utils.js';

export function Icon({ node }: A2UIComponentProps<IconNode>): JSX.Element {
  const { properties } = node;

  const svg = extractString(properties.svg);
  const name = extractString(properties.name);

  if (svg) {
    return <Cre8Icon svg={svg} />;
  }

  // If no svg provided, render empty icon or placeholder
  return <Cre8Icon svg={name ?? ''} />;
}
```

**Step 3: Update exports and mapping**

Add to components/index.ts and mapping.ts as in previous tasks.

---

## Task 19: Final Build and Verification

**Step 1: Update all exports**

Ensure `components/index.ts` exports all components.
Ensure `mapping.ts` includes all components in cre8Components.

**Step 2: Full build**

Run: `pnpm run build`

Expected: All packages build without errors

**Step 3: Verify package**

Run: `ls packages/react-cre8/dist`

Expected: See compiled `.js` and `.d.ts` files

---

## Summary

This plan creates the `@a2ui-bridge/react-cre8` package with:

- **Core A2UI components:** Row, Column, Card, Divider, Text, Badge, Button, TextField, Select, Checkbox, Image, Icon
- **Extended cre8 components:** Alert, Hero, Band, LoadingSpinner
- **Utility:** Fallback component for unknown types
- **Mapping:** `cre8Components` registry with aliases

Additional components (Tabs, Modal, Accordion, Breadcrumbs, etc.) can be added incrementally following the same pattern.
