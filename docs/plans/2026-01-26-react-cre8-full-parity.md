# React-Cre8 Full Parity Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add all 44 missing components to `@a2ui-bridge/react-cre8` to achieve full parity with `@a2ui-bridge/react-shadcn`.

**Architecture:** Each component wraps either a Cre8 web component (via `@lit/react`) or provides a semantic HTML fallback styled with CSS custom properties from `@cre8_dev/cre8-design-tokens`. Components follow the existing A2UI adapter pattern with `extractString`, `extractNumber`, `extractBoolean` utilities.

**Tech Stack:** React 18+, `@lit/react` for web component wrappers, `@tmorrow/cre8-wc` for Cre8 components, TypeScript

---

## Component Mapping Reference

| A2UI Component | Cre8 Web Component | Implementation Type |
|----------------|-------------------|---------------------|
| Separator | cre8-divider | Direct wrap |
| ScrollArea | - | HTML + CSS |
| AspectRatio | - | HTML + CSS |
| Flex | - | HTML + CSS |
| Grid | cre8-grid | Direct wrap |
| Center | - | HTML + CSS |
| Box | - | HTML + CSS |
| Container | cre8-layout-container | Direct wrap |
| Label | - | HTML (label element) |
| Link | cre8-text-link | Direct wrap |
| Avatar | - | HTML + CSS |
| Skeleton | cre8-skeleton-loader | Direct wrap |
| Title | cre8-heading | Direct wrap |
| Code | - | HTML (code/pre) |
| Blockquote | - | HTML (blockquote) |
| Input | cre8-field | Direct wrap |
| TextArea | cre8-field | Direct wrap |
| Switch | cre8-checkbox-field | Wrap with toggle variant |
| RadioGroup | cre8-radio-field | Direct wrap |
| Slider | - | HTML + CSS |
| ActionIcon | cre8-button | Wrap with icon-only variant |
| MultiSelect | cre8-multi-select | Direct wrap |
| NumberInput | cre8-field | Wrap with type="number" |
| DateTimeInput | cre8-date-picker | Direct wrap |
| Progress | cre8-progress-meter | Direct wrap |
| Toast | cre8-inline-alert | Direct wrap |
| Tooltip | cre8-tooltip | Direct wrap |
| Tabs | cre8-tabs | Direct wrap |
| TabPanel | cre8-tab-panel | Direct wrap |
| Breadcrumb | cre8-breadcrumbs | Direct wrap |
| Pagination | cre8-pagination | Direct wrap |
| List | cre8-list | Direct wrap |
| Table | cre8-table | Direct wrap |
| TableHeader | cre8-table-header | Direct wrap |
| TableBody | cre8-table-body | Direct wrap |
| TableRow | cre8-table-row | Direct wrap |
| TableCell | cre8-table-cell | Direct wrap |
| Accordion | cre8-accordion | Direct wrap |
| AccordionItem | cre8-accordion-item | Direct wrap |
| Collapsible | cre8-accordion-item | Wrap single item |
| Dialog | cre8-modal | Direct wrap |
| Sheet | cre8-modal | Wrap with slide variant |
| Popover | cre8-popover | Direct wrap |
| DropdownMenu | cre8-dropdown | Direct wrap |
| HoverCard | cre8-popover | Wrap with hover trigger |

---

## Batch 1: Layout Components (8 components)

### Task 1.1: Separator

**Files:**
- Create: `packages/react-cre8/src/components/Separator.tsx`

**Step 1: Create Separator component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - Separator component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { createComponent } from '@lit/react';
import { Cre8Divider as Cre8DividerWC } from '@tmorrow/cre8-wc';
import React from 'react';
import { extractString } from '../utils.js';

const Cre8DividerComponent = createComponent({
  react: React,
  tagName: 'cre8-divider',
  elementClass: Cre8DividerWC,
});

export function Separator({
  node,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const orientation = extractString((properties as any).orientation) ?? 'horizontal';

  return (
    <Cre8DividerComponent
      orientation={orientation as 'horizontal' | 'vertical'}
    />
  );
}
```

**Step 2: Export from components index**

Add to `packages/react-cre8/src/components/index.ts`:
```tsx
export { Separator } from './Separator.js';
```

---

### Task 1.2: ScrollArea

**Files:**
- Create: `packages/react-cre8/src/components/ScrollArea.tsx`

**Step 1: Create ScrollArea component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - ScrollArea component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import type { JSX } from 'react';
import { extractString, cn } from '../utils.js';

export function ScrollArea({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const height = extractString((properties as any).height);
  const width = extractString((properties as any).width);

  const style: React.CSSProperties = {
    overflow: 'auto',
    ...(height && { height }),
    ...(width && { width }),
  };

  return (
    <div className={cn('cre8-scroll-area')} style={style}>
      {children}
    </div>
  );
}
```

---

### Task 1.3: AspectRatio

**Files:**
- Create: `packages/react-cre8/src/components/AspectRatio.tsx`

**Step 1: Create AspectRatio component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - AspectRatio component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import type { JSX } from 'react';
import { extractNumber } from '../utils.js';

export function AspectRatio({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const ratio = extractNumber((properties as any).ratio) ?? 1;

  const style: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    paddingBottom: `${(1 / ratio) * 100}%`,
  };

  const innerStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
  };

  return (
    <div style={style}>
      <div style={innerStyle}>{children}</div>
    </div>
  );
}
```

---

### Task 1.4: Flex

**Files:**
- Create: `packages/react-cre8/src/components/Flex.tsx`

**Step 1: Create Flex component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - Flex component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import type { JSX } from 'react';
import { extractString, extractNumber, extractBoolean } from '../utils.js';

export function Flex({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const props = properties as any;

  const direction = extractString(props.direction) ?? 'row';
  const justify = extractString(props.justify) ?? 'flex-start';
  const align = extractString(props.align) ?? 'stretch';
  const wrap = extractBoolean(props.wrap) ?? false;
  const gap = extractNumber(props.gap) ?? extractString(props.gap);

  const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: direction as any,
    justifyContent: justify,
    alignItems: align,
    flexWrap: wrap ? 'wrap' : 'nowrap',
    ...(gap && { gap: typeof gap === 'number' ? `${gap}px` : gap }),
  };

  return <div style={style}>{children}</div>;
}
```

---

### Task 1.5: Grid

**Files:**
- Create: `packages/react-cre8/src/components/Grid.tsx`

**Step 1: Create Grid component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - Grid component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { createComponent } from '@lit/react';
import { Cre8Grid as Cre8GridWC } from '@tmorrow/cre8-wc';
import React from 'react';

const Cre8GridComponent = createComponent({
  react: React,
  tagName: 'cre8-grid',
  elementClass: Cre8GridWC,
});

export function Grid({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  return <Cre8GridComponent>{children}</Cre8GridComponent>;
}
```

---

### Task 1.6: Center

**Files:**
- Create: `packages/react-cre8/src/components/Center.tsx`

**Step 1: Create Center component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - Center component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import type { JSX } from 'react';

export function Center({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const style: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return <div style={style}>{children}</div>;
}
```

---

### Task 1.7: Box

**Files:**
- Create: `packages/react-cre8/src/components/Box.tsx`

**Step 1: Create Box component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - Box component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import type { JSX } from 'react';
import { extractString, extractNumber } from '../utils.js';

export function Box({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const props = properties as any;

  const padding = extractNumber(props.padding) ?? extractString(props.padding);
  const margin = extractNumber(props.margin) ?? extractString(props.margin);
  const bg = extractString(props.background) ?? extractString(props.bg);

  const style: React.CSSProperties = {
    ...(padding && { padding: typeof padding === 'number' ? `${padding}px` : padding }),
    ...(margin && { margin: typeof margin === 'number' ? `${margin}px` : margin }),
    ...(bg && { background: bg }),
  };

  return <div style={style}>{children}</div>;
}
```

---

### Task 1.8: Container

**Files:**
- Create: `packages/react-cre8/src/components/Container.tsx`

**Step 1: Create Container component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - Container component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { createComponent } from '@lit/react';
import { Cre8LayoutContainer as Cre8LayoutContainerWC } from '@tmorrow/cre8-wc';
import React from 'react';

const Cre8LayoutContainerComponent = createComponent({
  react: React,
  tagName: 'cre8-layout-container',
  elementClass: Cre8LayoutContainerWC,
});

export function Container({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  return <Cre8LayoutContainerComponent>{children}</Cre8LayoutContainerComponent>;
}
```

---

## Batch 2: Typography & Display Components (7 components)

### Task 2.1: Label

**Files:**
- Create: `packages/react-cre8/src/components/Label.tsx`

**Step 1: Create Label component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - Label component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import type { JSX } from 'react';
import { extractString } from '../utils.js';

export function Label({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const text = extractString((properties as any).text) ?? '';
  const htmlFor = extractString((properties as any).htmlFor);

  return (
    <label
      htmlFor={htmlFor}
      style={{
        fontSize: 'var(--cre8-typography-label-default-font-size, 0.875rem)',
        fontWeight: 'var(--cre8-typography-label-default-font-weight, 500)',
        lineHeight: 'var(--cre8-typography-label-default-line-height, 1.25rem)',
      }}
    >
      {text || children}
    </label>
  );
}
```

---

### Task 2.2: Link

**Files:**
- Create: `packages/react-cre8/src/components/Link.tsx`

**Step 1: Create Link component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - Link component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { createComponent } from '@lit/react';
import { Cre8TextLink as Cre8TextLinkWC } from '@tmorrow/cre8-wc';
import React from 'react';
import { extractString } from '../utils.js';

const Cre8TextLinkComponent = createComponent({
  react: React,
  tagName: 'cre8-text-link',
  elementClass: Cre8TextLinkWC,
});

export function Link({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const href = extractString((properties as any).href) ?? '#';
  const text = extractString((properties as any).text) ?? '';
  const target = extractString((properties as any).target);

  return (
    <Cre8TextLinkComponent href={href} target={target}>
      {text || children}
    </Cre8TextLinkComponent>
  );
}
```

---

### Task 2.3: Avatar

**Files:**
- Create: `packages/react-cre8/src/components/Avatar.tsx`

**Step 1: Create Avatar component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - Avatar component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import type { JSX } from 'react';
import { extractString, extractNumber, cn } from '../utils.js';

export function Avatar({
  node,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const props = properties as any;

  const src = extractString(props.src);
  const alt = extractString(props.alt) ?? '';
  const fallback = extractString(props.fallback) ?? '';
  const size = extractNumber(props.size) ?? 40;

  const style: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    overflow: 'hidden',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--cre8-color-background-secondary, #e5e7eb)',
    color: 'var(--cre8-color-text-primary, #374151)',
    fontWeight: 500,
    fontSize: `${size * 0.4}px`,
  };

  if (src) {
    return (
      <span style={style}>
        <img
          src={src}
          alt={alt}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </span>
    );
  }

  return <span style={style}>{fallback.slice(0, 2).toUpperCase()}</span>;
}
```

---

### Task 2.4: Skeleton

**Files:**
- Create: `packages/react-cre8/src/components/Skeleton.tsx`

**Step 1: Create Skeleton component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - Skeleton component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { createComponent } from '@lit/react';
import { Cre8SkeletonLoader as Cre8SkeletonLoaderWC } from '@tmorrow/cre8-wc';
import React from 'react';
import { extractString, extractNumber } from '../utils.js';

const Cre8SkeletonLoaderComponent = createComponent({
  react: React,
  tagName: 'cre8-skeleton-loader',
  elementClass: Cre8SkeletonLoaderWC,
});

export function Skeleton({
  node,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const width = extractString((properties as any).width) ?? '100%';
  const height = extractString((properties as any).height) ?? '1rem';

  return (
    <Cre8SkeletonLoaderComponent
      style={{ width, height, display: 'block' }}
    />
  );
}
```

---

### Task 2.5: Title (Heading)

**Files:**
- Create: `packages/react-cre8/src/components/Title.tsx`

**Step 1: Create Title component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - Title component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { createComponent } from '@lit/react';
import { Cre8Heading as Cre8HeadingWC } from '@tmorrow/cre8-wc';
import React from 'react';
import { extractString, extractNumber } from '../utils.js';

const Cre8HeadingComponent = createComponent({
  react: React,
  tagName: 'cre8-heading',
  elementClass: Cre8HeadingWC,
});

export function Title({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const text = extractString((properties as any).text) ?? '';
  const level = extractNumber((properties as any).level) ?? 2;

  return (
    <Cre8HeadingComponent type={`h${level}` as any}>
      {text || children}
    </Cre8HeadingComponent>
  );
}
```

---

### Task 2.6: Code

**Files:**
- Create: `packages/react-cre8/src/components/Code.tsx`

**Step 1: Create Code component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - Code component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import type { JSX } from 'react';
import { extractString, extractBoolean } from '../utils.js';

export function Code({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const code = extractString((properties as any).code) ?? '';
  const isBlock = extractBoolean((properties as any).block) ?? false;

  const inlineStyle: React.CSSProperties = {
    fontFamily: 'var(--cre8-font-family-mono, monospace)',
    fontSize: '0.875em',
    backgroundColor: 'var(--cre8-color-background-secondary, #f3f4f6)',
    padding: '0.125rem 0.25rem',
    borderRadius: '0.25rem',
  };

  const blockStyle: React.CSSProperties = {
    ...inlineStyle,
    display: 'block',
    padding: '1rem',
    overflow: 'auto',
    whiteSpace: 'pre',
  };

  if (isBlock) {
    return <pre style={blockStyle}><code>{code || children}</code></pre>;
  }

  return <code style={inlineStyle}>{code || children}</code>;
}
```

---

### Task 2.7: Blockquote

**Files:**
- Create: `packages/react-cre8/src/components/Blockquote.tsx`

**Step 1: Create Blockquote component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - Blockquote component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import type { JSX } from 'react';
import { extractString } from '../utils.js';

export function Blockquote({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const text = extractString((properties as any).text) ?? '';
  const cite = extractString((properties as any).cite);

  const style: React.CSSProperties = {
    borderLeft: '4px solid var(--cre8-color-border-default, #d1d5db)',
    paddingLeft: '1rem',
    margin: '1rem 0',
    fontStyle: 'italic',
    color: 'var(--cre8-color-text-secondary, #6b7280)',
  };

  return (
    <blockquote style={style} cite={cite}>
      {text || children}
    </blockquote>
  );
}
```

---

## Batch 3: Form Input Components (9 components)

### Task 3.1: Input

**Files:**
- Create: `packages/react-cre8/src/components/Input.tsx`

**Step 1: Create Input component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - Input component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { createComponent } from '@lit/react';
import { Cre8Field as Cre8FieldWC } from '@tmorrow/cre8-wc';
import React from 'react';
import { extractString, extractBoolean } from '../utils.js';

const Cre8FieldComponent = createComponent({
  react: React,
  tagName: 'cre8-field',
  elementClass: Cre8FieldWC,
  events: {
    onChange: 'change',
    onInput: 'input',
  },
});

export function Input({
  node,
  onAction,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const props = properties as any;

  const type = extractString(props.type) ?? 'text';
  const placeholder = extractString(props.placeholder) ?? '';
  const value = extractString(props.value) ?? '';
  const disabled = extractBoolean(props.disabled) ?? false;
  const label = extractString(props.label) ?? '';

  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (props.action?.name) {
      onAction({
        actionName: props.action.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: { value: target.value },
      });
    }
  };

  return (
    <Cre8FieldComponent
      type={type}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      label={label}
      onInput={handleInput}
    />
  );
}
```

---

### Task 3.2: TextArea

**Files:**
- Create: `packages/react-cre8/src/components/TextArea.tsx`

**Step 1: Create TextArea component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - TextArea component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { createComponent } from '@lit/react';
import { Cre8Field as Cre8FieldWC } from '@tmorrow/cre8-wc';
import React from 'react';
import { extractString, extractBoolean, extractNumber } from '../utils.js';

const Cre8FieldComponent = createComponent({
  react: React,
  tagName: 'cre8-field',
  elementClass: Cre8FieldWC,
  events: {
    onInput: 'input',
  },
});

export function TextArea({
  node,
  onAction,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const props = properties as any;

  const placeholder = extractString(props.placeholder) ?? '';
  const value = extractString(props.value) ?? '';
  const disabled = extractBoolean(props.disabled) ?? false;
  const label = extractString(props.label) ?? '';
  const rows = extractNumber(props.rows) ?? 4;

  const handleInput = (e: Event) => {
    const target = e.target as HTMLTextAreaElement;
    if (props.action?.name) {
      onAction({
        actionName: props.action.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: { value: target.value },
      });
    }
  };

  return (
    <Cre8FieldComponent
      type="textarea"
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      label={label}
      rows={rows}
      onInput={handleInput}
    />
  );
}
```

---

### Task 3.3: Switch

**Files:**
- Create: `packages/react-cre8/src/components/Switch.tsx`

**Step 1: Create Switch component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - Switch component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import type { JSX } from 'react';
import { extractString, extractBoolean } from '../utils.js';

export function Switch({
  node,
  onAction,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const props = properties as any;

  const label = extractString(props.label) ?? '';
  const checked = extractBoolean(props.checked) ?? false;
  const disabled = extractBoolean(props.disabled) ?? false;

  const handleChange = () => {
    if (props.action?.name) {
      onAction({
        actionName: props.action.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: { checked: !checked },
      });
    }
  };

  const trackStyle: React.CSSProperties = {
    position: 'relative',
    width: '44px',
    height: '24px',
    borderRadius: '12px',
    backgroundColor: checked
      ? 'var(--cre8-color-action-primary-default, #2563eb)'
      : 'var(--cre8-color-background-tertiary, #d1d5db)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'background-color 0.2s ease',
  };

  const thumbStyle: React.CSSProperties = {
    position: 'absolute',
    top: '2px',
    left: checked ? '22px' : '2px',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: 'white',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    transition: 'left 0.2s ease',
  };

  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: disabled ? 'not-allowed' : 'pointer' }}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={handleChange}
        style={{ ...trackStyle, border: 'none', padding: 0 }}
      >
        <span style={thumbStyle} />
      </button>
      {label && <span>{label}</span>}
    </label>
  );
}
```

---

### Task 3.4: RadioGroup

**Files:**
- Create: `packages/react-cre8/src/components/RadioGroup.tsx`

**Step 1: Create RadioGroup component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - RadioGroup component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { createComponent } from '@lit/react';
import { Cre8RadioField as Cre8RadioFieldWC } from '@tmorrow/cre8-wc';
import React from 'react';
import { extractString, extractBoolean } from '../utils.js';

const Cre8RadioFieldComponent = createComponent({
  react: React,
  tagName: 'cre8-radio-field',
  elementClass: Cre8RadioFieldWC,
  events: {
    onChange: 'change',
  },
});

interface RadioOption {
  value: string | { literalString: string };
  label: string | { literalString: string };
}

export function RadioGroup({
  node,
  onAction,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const props = properties as any;

  const label = extractString(props.label) ?? '';
  const name = extractString(props.name) ?? node.id;
  const value = extractString(props.value) ?? '';
  const options: RadioOption[] = props.options ?? [];
  const disabled = extractBoolean(props.disabled) ?? false;

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (props.action?.name) {
      onAction({
        actionName: props.action.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: { value: target.value },
      });
    }
  };

  return (
    <Cre8RadioFieldComponent
      label={label}
      name={name}
      value={value}
      disabled={disabled}
      onChange={handleChange}
    >
      {options.map((opt, idx) => {
        const optValue = typeof opt.value === 'object' ? opt.value.literalString : opt.value;
        const optLabel = typeof opt.label === 'object' ? opt.label.literalString : opt.label;
        return (
          <cre8-radio-field-item
            key={idx}
            value={optValue}
            label={optLabel}
          />
        );
      })}
    </Cre8RadioFieldComponent>
  );
}
```

---

### Task 3.5: Slider

**Files:**
- Create: `packages/react-cre8/src/components/Slider.tsx`

**Step 1: Create Slider component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - Slider component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import type { JSX } from 'react';
import { extractString, extractNumber, extractBoolean } from '../utils.js';

export function Slider({
  node,
  onAction,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const props = properties as any;

  const min = extractNumber(props.min) ?? 0;
  const max = extractNumber(props.max) ?? 100;
  const step = extractNumber(props.step) ?? 1;
  const value = extractNumber(props.value) ?? min;
  const disabled = extractBoolean(props.disabled) ?? false;
  const label = extractString(props.label) ?? '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.action?.name) {
      onAction({
        actionName: props.action.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: { value: parseFloat(e.target.value) },
      });
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    height: '8px',
    borderRadius: '4px',
    appearance: 'none',
    backgroundColor: 'var(--cre8-color-background-tertiary, #e5e7eb)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
  };

  return (
    <div style={{ width: '100%' }}>
      {label && (
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
          {label}
        </label>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={handleChange}
        style={inputStyle}
      />
    </div>
  );
}
```

---

### Task 3.6: ActionIcon

**Files:**
- Create: `packages/react-cre8/src/components/ActionIcon.tsx`

**Step 1: Create ActionIcon component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - ActionIcon component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { createComponent } from '@lit/react';
import { Cre8Button as Cre8ButtonWC } from '@tmorrow/cre8-wc';
import React from 'react';
import { extractString, extractBoolean } from '../utils.js';

const Cre8ButtonComponent = createComponent({
  react: React,
  tagName: 'cre8-button',
  elementClass: Cre8ButtonWC,
});

export function ActionIcon({
  node,
  onAction,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const props = properties as any;

  const icon = extractString(props.icon) ?? 'settings';
  const disabled = extractBoolean(props.disabled) ?? false;
  const variant = extractString(props.variant) ?? 'tertiary';
  const ariaLabel = extractString(props.ariaLabel) ?? extractString(props.label) ?? icon;

  const handleClick = () => {
    if (props.action?.name) {
      onAction({
        actionName: props.action.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: {},
      });
    }
  };

  return (
    <Cre8ButtonComponent
      variant={variant as any}
      iconOnly
      iconName={icon}
      disabled={disabled}
      onClick={handleClick}
      aria-label={ariaLabel}
    />
  );
}
```

---

### Task 3.7: MultiSelect

**Files:**
- Create: `packages/react-cre8/src/components/MultiSelect.tsx`

**Step 1: Create MultiSelect component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - MultiSelect component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { createComponent } from '@lit/react';
import { Cre8MultiSelect as Cre8MultiSelectWC } from '@tmorrow/cre8-wc';
import React from 'react';
import { extractString, extractBoolean } from '../utils.js';

const Cre8MultiSelectComponent = createComponent({
  react: React,
  tagName: 'cre8-multi-select',
  elementClass: Cre8MultiSelectWC,
  events: {
    onChange: 'change',
  },
});

interface SelectOption {
  value: string | { literalString: string };
  label: string | { literalString: string };
}

export function MultiSelect({
  node,
  onAction,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const props = properties as any;

  const label = extractString(props.label) ?? '';
  const placeholder = extractString(props.placeholder) ?? 'Select options';
  const options: SelectOption[] = props.options ?? [];
  const disabled = extractBoolean(props.disabled) ?? false;

  const handleChange = (e: Event) => {
    const target = e.target as any;
    if (props.action?.name) {
      onAction({
        actionName: props.action.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: { values: target.value },
      });
    }
  };

  return (
    <Cre8MultiSelectComponent
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      onChange={handleChange}
    >
      {options.map((opt, idx) => {
        const optValue = typeof opt.value === 'object' ? opt.value.literalString : opt.value;
        const optLabel = typeof opt.label === 'object' ? opt.label.literalString : opt.label;
        return (
          <option key={idx} value={optValue}>
            {optLabel}
          </option>
        );
      })}
    </Cre8MultiSelectComponent>
  );
}
```

---

### Task 3.8: NumberInput

**Files:**
- Create: `packages/react-cre8/src/components/NumberInput.tsx`

**Step 1: Create NumberInput component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - NumberInput component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { createComponent } from '@lit/react';
import { Cre8Field as Cre8FieldWC } from '@tmorrow/cre8-wc';
import React from 'react';
import { extractString, extractBoolean, extractNumber } from '../utils.js';

const Cre8FieldComponent = createComponent({
  react: React,
  tagName: 'cre8-field',
  elementClass: Cre8FieldWC,
  events: {
    onInput: 'input',
  },
});

export function NumberInput({
  node,
  onAction,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const props = properties as any;

  const value = extractNumber(props.value);
  const min = extractNumber(props.min);
  const max = extractNumber(props.max);
  const step = extractNumber(props.step) ?? 1;
  const disabled = extractBoolean(props.disabled) ?? false;
  const label = extractString(props.label) ?? '';
  const placeholder = extractString(props.placeholder) ?? '';

  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (props.action?.name) {
      onAction({
        actionName: props.action.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: { value: parseFloat(target.value) },
      });
    }
  };

  return (
    <Cre8FieldComponent
      type="number"
      value={value?.toString() ?? ''}
      min={min}
      max={max}
      step={step}
      placeholder={placeholder}
      disabled={disabled}
      label={label}
      onInput={handleInput}
    />
  );
}
```

---

### Task 3.9: DateTimeInput

**Files:**
- Create: `packages/react-cre8/src/components/DateTimeInput.tsx`

**Step 1: Create DateTimeInput component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - DateTimeInput component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { createComponent } from '@lit/react';
import { Cre8DatePicker as Cre8DatePickerWC } from '@tmorrow/cre8-wc';
import React from 'react';
import { extractString, extractBoolean } from '../utils.js';

const Cre8DatePickerComponent = createComponent({
  react: React,
  tagName: 'cre8-date-picker',
  elementClass: Cre8DatePickerWC,
  events: {
    onChange: 'change',
  },
});

export function DateTimeInput({
  node,
  onAction,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const props = properties as any;

  const label = extractString(props.label) ?? '';
  const value = extractString(props.value) ?? '';
  const disabled = extractBoolean(props.disabled) ?? false;
  const placeholder = extractString(props.placeholder) ?? 'Select date';

  const handleChange = (e: Event) => {
    const target = e.target as any;
    if (props.action?.name) {
      onAction({
        actionName: props.action.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: { value: target.value },
      });
    }
  };

  return (
    <Cre8DatePickerComponent
      label={label}
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
}
```

---

## Batch 4: Feedback & Status Components (4 components)

### Task 4.1: Progress

**Files:**
- Create: `packages/react-cre8/src/components/Progress.tsx`

**Step 1: Create Progress component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - Progress component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { createComponent } from '@lit/react';
import { Cre8ProgressMeter as Cre8ProgressMeterWC } from '@tmorrow/cre8-wc';
import React from 'react';
import { extractNumber, extractString } from '../utils.js';

const Cre8ProgressMeterComponent = createComponent({
  react: React,
  tagName: 'cre8-progress-meter',
  elementClass: Cre8ProgressMeterWC,
});

export function Progress({
  node,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const value = extractNumber((properties as any).value) ?? 0;
  const max = extractNumber((properties as any).max) ?? 100;
  const label = extractString((properties as any).label) ?? '';

  return (
    <Cre8ProgressMeterComponent
      value={value}
      max={max}
      label={label}
    />
  );
}
```

---

### Task 4.2: Toast

**Files:**
- Create: `packages/react-cre8/src/components/Toast.tsx`

**Step 1: Create Toast component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - Toast component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { createComponent } from '@lit/react';
import { Cre8InlineAlert as Cre8InlineAlertWC } from '@tmorrow/cre8-wc';
import React from 'react';
import { extractString, extractBoolean } from '../utils.js';

const Cre8InlineAlertComponent = createComponent({
  react: React,
  tagName: 'cre8-inline-alert',
  elementClass: Cre8InlineAlertWC,
});

export function Toast({
  node,
  onAction,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const props = properties as any;

  const title = extractString(props.title) ?? '';
  const description = extractString(props.description) ?? extractString(props.message) ?? '';
  const variant = extractString(props.variant) ?? 'info';
  const dismissible = extractBoolean(props.dismissible) ?? true;

  const variantMap: Record<string, 'error' | 'warning' | 'success' | 'info'> = {
    error: 'error',
    destructive: 'error',
    warning: 'warning',
    success: 'success',
    info: 'info',
    default: 'info',
  };

  const handleDismiss = () => {
    if (props.onDismiss?.name) {
      onAction({
        actionName: props.onDismiss.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: {},
      });
    }
  };

  return (
    <Cre8InlineAlertComponent
      status={variantMap[variant] ?? 'info'}
      heading={title}
      notDismissible={!dismissible}
      onClose={handleDismiss}
    >
      {description}
    </Cre8InlineAlertComponent>
  );
}
```

---

### Task 4.3: Tooltip

**Files:**
- Create: `packages/react-cre8/src/components/Tooltip.tsx`

**Step 1: Create Tooltip component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - Tooltip component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { createComponent } from '@lit/react';
import { Cre8Tooltip as Cre8TooltipWC } from '@tmorrow/cre8-wc';
import React from 'react';
import { extractString } from '../utils.js';

const Cre8TooltipComponent = createComponent({
  react: React,
  tagName: 'cre8-tooltip',
  elementClass: Cre8TooltipWC,
});

export function Tooltip({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const content = extractString((properties as any).content) ?? '';
  const position = extractString((properties as any).position) ?? 'top';

  return (
    <Cre8TooltipComponent content={content} position={position as any}>
      {children}
    </Cre8TooltipComponent>
  );
}
```

---

## Batch 5: Navigation Components (4 components)

### Task 5.1: Tabs

**Files:**
- Create: `packages/react-cre8/src/components/Tabs.tsx`

**Step 1: Create Tabs component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - Tabs component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { createComponent } from '@lit/react';
import { Cre8Tabs as Cre8TabsWC, Cre8Tab as Cre8TabWC, Cre8TabPanel as Cre8TabPanelWC } from '@tmorrow/cre8-wc';
import React from 'react';
import { extractString, extractNumber } from '../utils.js';

const Cre8TabsComponent = createComponent({
  react: React,
  tagName: 'cre8-tabs',
  elementClass: Cre8TabsWC,
  events: {
    onTabSelected: 'tabSelected',
  },
});

const Cre8TabComponent = createComponent({
  react: React,
  tagName: 'cre8-tab',
  elementClass: Cre8TabWC,
});

const Cre8TabPanelComponent = createComponent({
  react: React,
  tagName: 'cre8-tab-panel',
  elementClass: Cre8TabPanelWC,
});

interface TabItem {
  id: string;
  label: string | { literalString: string };
}

export function Tabs({
  node,
  children,
  onAction,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const props = properties as any;

  const tabs: TabItem[] = props.tabs ?? [];
  const defaultTab = extractString(props.defaultTab) ?? tabs[0]?.id ?? '';
  const activeIndex = tabs.findIndex(t => t.id === defaultTab);

  const handleTabSelected = (e: CustomEvent) => {
    const selectedIndex = e.detail?.activeIndex ?? 0;
    const selectedTab = tabs[selectedIndex];
    if (props.onChange?.name && selectedTab) {
      onAction({
        actionName: props.onChange.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: { tab: selectedTab.id },
      });
    }
  };

  return (
    <Cre8TabsComponent
      activeIndex={activeIndex >= 0 ? activeIndex : 0}
      onTabSelected={handleTabSelected}
    >
      {tabs.map((tab) => {
        const label = typeof tab.label === 'object' ? tab.label.literalString : tab.label;
        return <Cre8TabComponent key={tab.id}>{label}</Cre8TabComponent>;
      })}
      <div slot="panel">{children}</div>
    </Cre8TabsComponent>
  );
}
```

---

### Task 5.2: TabPanel

**Files:**
- Create: `packages/react-cre8/src/components/TabPanel.tsx`

**Step 1: Create TabPanel component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - TabPanel component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { createComponent } from '@lit/react';
import { Cre8TabPanel as Cre8TabPanelWC } from '@tmorrow/cre8-wc';
import React from 'react';

const Cre8TabPanelComponent = createComponent({
  react: React,
  tagName: 'cre8-tab-panel',
  elementClass: Cre8TabPanelWC,
});

export function TabPanel({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  return <Cre8TabPanelComponent>{children}</Cre8TabPanelComponent>;
}
```

---

### Task 5.3: Breadcrumb

**Files:**
- Create: `packages/react-cre8/src/components/Breadcrumb.tsx`

**Step 1: Create Breadcrumb component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - Breadcrumb component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { createComponent } from '@lit/react';
import { Cre8Breadcrumbs as Cre8BreadcrumbsWC, Cre8BreadcrumbsItem as Cre8BreadcrumbsItemWC } from '@tmorrow/cre8-wc';
import React from 'react';
import { extractString } from '../utils.js';

const Cre8BreadcrumbsComponent = createComponent({
  react: React,
  tagName: 'cre8-breadcrumbs',
  elementClass: Cre8BreadcrumbsWC,
});

const Cre8BreadcrumbsItemComponent = createComponent({
  react: React,
  tagName: 'cre8-breadcrumbs-item',
  elementClass: Cre8BreadcrumbsItemWC,
});

interface BreadcrumbItem {
  label: string | { literalString: string };
  href?: string | { literalString: string };
}

export function Breadcrumb({
  node,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const items: BreadcrumbItem[] = (properties as any).items ?? [];

  return (
    <Cre8BreadcrumbsComponent>
      {items.map((item, idx) => {
        const label = typeof item.label === 'object' ? item.label.literalString : item.label;
        const href = item.href
          ? typeof item.href === 'object'
            ? item.href.literalString
            : item.href
          : undefined;
        const isLast = idx === items.length - 1;

        return (
          <Cre8BreadcrumbsItemComponent
            key={idx}
            href={isLast ? undefined : href}
            ariaCurrent={isLast ? 'page' : undefined}
          >
            {label}
          </Cre8BreadcrumbsItemComponent>
        );
      })}
    </Cre8BreadcrumbsComponent>
  );
}
```

---

### Task 5.4: Pagination

**Files:**
- Create: `packages/react-cre8/src/components/Pagination.tsx`

**Step 1: Create Pagination component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - Pagination component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { createComponent } from '@lit/react';
import { Cre8Pagination as Cre8PaginationWC } from '@tmorrow/cre8-wc';
import React from 'react';
import { extractNumber } from '../utils.js';

const Cre8PaginationComponent = createComponent({
  react: React,
  tagName: 'cre8-pagination',
  elementClass: Cre8PaginationWC,
  events: {
    onPageChange: 'pageChange',
  },
});

export function Pagination({
  node,
  onAction,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const props = properties as any;

  const totalPages = extractNumber(props.totalPages) ?? 1;
  const currentPage = extractNumber(props.currentPage) ?? 1;

  const handlePageChange = (e: CustomEvent) => {
    if (props.onChange?.name) {
      onAction({
        actionName: props.onChange.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: { page: e.detail?.page ?? 1 },
      });
    }
  };

  return (
    <Cre8PaginationComponent
      totalPages={totalPages}
      currentPage={currentPage}
      onPageChange={handlePageChange}
    />
  );
}
```

---

## Batch 6: Data Display Components (6 components)

### Task 6.1: List

**Files:**
- Create: `packages/react-cre8/src/components/List.tsx`

**Step 1: Create List component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - List component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { createComponent } from '@lit/react';
import { Cre8List as Cre8ListWC } from '@tmorrow/cre8-wc';
import React from 'react';

const Cre8ListComponent = createComponent({
  react: React,
  tagName: 'cre8-list',
  elementClass: Cre8ListWC,
});

export function List({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  return <Cre8ListComponent>{children}</Cre8ListComponent>;
}
```

---

### Task 6.2: Table

**Files:**
- Create: `packages/react-cre8/src/components/Table.tsx`

**Step 1: Create Table component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - Table component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { createComponent } from '@lit/react';
import { Cre8Table as Cre8TableWC } from '@tmorrow/cre8-wc';
import React from 'react';
import { extractString, extractBoolean } from '../utils.js';

const Cre8TableComponent = createComponent({
  react: React,
  tagName: 'cre8-table',
  elementClass: Cre8TableWC,
});

export function Table({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const caption = extractString((properties as any).caption) ?? '';
  const striped = extractBoolean((properties as any).striped) ?? false;
  const hoverable = extractBoolean((properties as any).hoverable) ?? false;

  return (
    <Cre8TableComponent
      caption={caption || undefined}
      variant={striped ? 'striped' : undefined}
      isHoverable={hoverable}
    >
      {children}
    </Cre8TableComponent>
  );
}
```

---

### Task 6.3: TableHeader

**Files:**
- Create: `packages/react-cre8/src/components/TableHeader.tsx`

**Step 1: Create TableHeader component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - TableHeader component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { createComponent } from '@lit/react';
import { Cre8TableHeader as Cre8TableHeaderWC } from '@tmorrow/cre8-wc';
import React from 'react';

const Cre8TableHeaderComponent = createComponent({
  react: React,
  tagName: 'cre8-table-header',
  elementClass: Cre8TableHeaderWC,
});

export function TableHeader({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  return <Cre8TableHeaderComponent>{children}</Cre8TableHeaderComponent>;
}
```

---

### Task 6.4: TableBody

**Files:**
- Create: `packages/react-cre8/src/components/TableBody.tsx`

**Step 1: Create TableBody component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - TableBody component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { createComponent } from '@lit/react';
import { Cre8TableBody as Cre8TableBodyWC } from '@tmorrow/cre8-wc';
import React from 'react';

const Cre8TableBodyComponent = createComponent({
  react: React,
  tagName: 'cre8-table-body',
  elementClass: Cre8TableBodyWC,
});

export function TableBody({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  return <Cre8TableBodyComponent>{children}</Cre8TableBodyComponent>;
}
```

---

### Task 6.5: TableRow

**Files:**
- Create: `packages/react-cre8/src/components/TableRow.tsx`

**Step 1: Create TableRow component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - TableRow component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { createComponent } from '@lit/react';
import { Cre8TableRow as Cre8TableRowWC } from '@tmorrow/cre8-wc';
import React from 'react';

const Cre8TableRowComponent = createComponent({
  react: React,
  tagName: 'cre8-table-row',
  elementClass: Cre8TableRowWC,
});

export function TableRow({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  return <Cre8TableRowComponent>{children}</Cre8TableRowComponent>;
}
```

---

### Task 6.6: TableCell

**Files:**
- Create: `packages/react-cre8/src/components/TableCell.tsx`

**Step 1: Create TableCell component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - TableCell component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { createComponent } from '@lit/react';
import { Cre8TableCell as Cre8TableCellWC } from '@tmorrow/cre8-wc';
import React from 'react';
import { extractBoolean } from '../utils.js';

const Cre8TableCellComponent = createComponent({
  react: React,
  tagName: 'cre8-table-cell',
  elementClass: Cre8TableCellWC,
});

export function TableCell({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const isHeader = extractBoolean((properties as any).isHeader) ?? false;

  if (isHeader) {
    // Use table-header-cell for header cells
    return <cre8-table-header-cell>{children}</cre8-table-header-cell>;
  }

  return <Cre8TableCellComponent>{children}</Cre8TableCellComponent>;
}
```

---

## Batch 7: Disclosure & Overlay Components (8 components)

### Task 7.1: Accordion

**Files:**
- Create: `packages/react-cre8/src/components/Accordion.tsx`

**Step 1: Create Accordion component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - Accordion component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { createComponent } from '@lit/react';
import { Cre8Accordion as Cre8AccordionWC } from '@tmorrow/cre8-wc';
import React from 'react';

const Cre8AccordionComponent = createComponent({
  react: React,
  tagName: 'cre8-accordion',
  elementClass: Cre8AccordionWC,
});

export function Accordion({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  return <Cre8AccordionComponent>{children}</Cre8AccordionComponent>;
}
```

---

### Task 7.2: AccordionItem

**Files:**
- Create: `packages/react-cre8/src/components/AccordionItem.tsx`

**Step 1: Create AccordionItem component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - AccordionItem component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { createComponent } from '@lit/react';
import { Cre8AccordionItem as Cre8AccordionItemWC } from '@tmorrow/cre8-wc';
import React from 'react';
import { extractString, extractBoolean } from '../utils.js';

const Cre8AccordionItemComponent = createComponent({
  react: React,
  tagName: 'cre8-accordion-item',
  elementClass: Cre8AccordionItemWC,
});

export function AccordionItem({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const heading = extractString((properties as any).title) ?? extractString((properties as any).heading) ?? '';
  const isOpen = extractBoolean((properties as any).open) ?? extractBoolean((properties as any).isOpen) ?? false;

  return (
    <Cre8AccordionItemComponent heading={heading} isOpen={isOpen}>
      {children}
    </Cre8AccordionItemComponent>
  );
}
```

---

### Task 7.3: Collapsible

**Files:**
- Create: `packages/react-cre8/src/components/Collapsible.tsx`

**Step 1: Create Collapsible component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - Collapsible component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { createComponent } from '@lit/react';
import { Cre8AccordionItem as Cre8AccordionItemWC } from '@tmorrow/cre8-wc';
import React from 'react';
import { extractString, extractBoolean } from '../utils.js';

const Cre8AccordionItemComponent = createComponent({
  react: React,
  tagName: 'cre8-accordion-item',
  elementClass: Cre8AccordionItemWC,
});

export function Collapsible({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const title = extractString((properties as any).title) ?? '';
  const open = extractBoolean((properties as any).open) ?? false;

  return (
    <Cre8AccordionItemComponent heading={title} isOpen={open}>
      {children}
    </Cre8AccordionItemComponent>
  );
}
```

---

### Task 7.4: Dialog (Modal)

**Files:**
- Create: `packages/react-cre8/src/components/Dialog.tsx`

**Step 1: Create Dialog component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - Dialog component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { createComponent } from '@lit/react';
import { Cre8Modal as Cre8ModalWC } from '@tmorrow/cre8-wc';
import React from 'react';
import { extractString, extractBoolean } from '../utils.js';

const Cre8ModalComponent = createComponent({
  react: React,
  tagName: 'cre8-modal',
  elementClass: Cre8ModalWC,
  events: {
    onCloseModal: 'close-modal',
  },
});

export function Dialog({
  node,
  children,
  onAction,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const props = properties as any;

  const title = extractString(props.title) ?? '';
  const open = extractBoolean(props.open) ?? false;
  const ariaLabel = extractString(props.ariaLabel) ?? title;

  const handleClose = () => {
    if (props.onClose?.name) {
      onAction({
        actionName: props.onClose.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: {},
      });
    }
  };

  if (!open) return <></>;

  return (
    <Cre8ModalComponent
      isActive={open}
      utilityModalTitle={title}
      ariaLabel={ariaLabel}
      onCloseModal={handleClose}
    >
      {children}
    </Cre8ModalComponent>
  );
}
```

---

### Task 7.5: Sheet (Drawer)

**Files:**
- Create: `packages/react-cre8/src/components/Sheet.tsx`

**Step 1: Create Sheet component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - Sheet component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import type { JSX } from 'react';
import { extractString, extractBoolean } from '../utils.js';

export function Sheet({
  node,
  children,
  onAction,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const props = properties as any;

  const title = extractString(props.title) ?? '';
  const open = extractBoolean(props.open) ?? false;
  const side = extractString(props.side) ?? 'right';

  const handleClose = () => {
    if (props.onClose?.name) {
      onAction({
        actionName: props.onClose.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: {},
      });
    }
  };

  if (!open) return <></>;

  const positionStyles: Record<string, React.CSSProperties> = {
    left: { left: 0, top: 0, bottom: 0, width: '320px' },
    right: { right: 0, top: 0, bottom: 0, width: '320px' },
    top: { top: 0, left: 0, right: 0, height: '320px' },
    bottom: { bottom: 0, left: 0, right: 0, height: '320px' },
  };

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    zIndex: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  };

  const sheetStyle: React.CSSProperties = {
    position: 'fixed',
    zIndex: 51,
    backgroundColor: 'var(--cre8-color-background-primary, white)',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    padding: '1.5rem',
    overflow: 'auto',
    ...positionStyles[side],
  };

  return (
    <>
      <div style={overlayStyle} onClick={handleClose} />
      <div role="dialog" aria-modal="true" style={sheetStyle}>
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.5rem',
          }}
          aria-label="Close"
        >
          &times;
        </button>
        {title && (
          <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem', fontWeight: 600 }}>
            {title}
          </h2>
        )}
        {children}
      </div>
    </>
  );
}
```

---

### Task 7.6: Popover

**Files:**
- Create: `packages/react-cre8/src/components/Popover.tsx`

**Step 1: Create Popover component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - Popover component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { createComponent } from '@lit/react';
import { Cre8Popover as Cre8PopoverWC } from '@tmorrow/cre8-wc';
import React from 'react';
import { extractString, extractBoolean } from '../utils.js';

const Cre8PopoverComponent = createComponent({
  react: React,
  tagName: 'cre8-popover',
  elementClass: Cre8PopoverWC,
});

export function Popover({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const position = extractString((properties as any).position) ?? 'bottom';
  const open = extractBoolean((properties as any).open) ?? false;

  return (
    <Cre8PopoverComponent position={position as any} isActive={open}>
      {children}
    </Cre8PopoverComponent>
  );
}
```

---

### Task 7.7: DropdownMenu

**Files:**
- Create: `packages/react-cre8/src/components/DropdownMenu.tsx`

**Step 1: Create DropdownMenu component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - DropdownMenu component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { createComponent } from '@lit/react';
import { Cre8Dropdown as Cre8DropdownWC, Cre8DropdownItem as Cre8DropdownItemWC } from '@tmorrow/cre8-wc';
import React from 'react';
import { extractString } from '../utils.js';

const Cre8DropdownComponent = createComponent({
  react: React,
  tagName: 'cre8-dropdown',
  elementClass: Cre8DropdownWC,
});

const Cre8DropdownItemComponent = createComponent({
  react: React,
  tagName: 'cre8-dropdown-item',
  elementClass: Cre8DropdownItemWC,
});

interface MenuItem {
  label: string | { literalString: string };
  action?: { name: string };
}

export function DropdownMenu({
  node,
  children,
  onAction,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const trigger = extractString((properties as any).trigger) ?? 'Menu';
  const items: MenuItem[] = (properties as any).items ?? [];

  const handleItemClick = (item: MenuItem) => {
    if (item.action?.name) {
      onAction({
        actionName: item.action.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: {},
      });
    }
  };

  return (
    <Cre8DropdownComponent triggerText={trigger}>
      {items.map((item, idx) => {
        const label = typeof item.label === 'object' ? item.label.literalString : item.label;
        return (
          <Cre8DropdownItemComponent key={idx} onClick={() => handleItemClick(item)}>
            {label}
          </Cre8DropdownItemComponent>
        );
      })}
      {children}
    </Cre8DropdownComponent>
  );
}
```

---

### Task 7.8: HoverCard

**Files:**
- Create: `packages/react-cre8/src/components/HoverCard.tsx`

**Step 1: Create HoverCard component**

```tsx
/**
 * @a2ui-bridge/react-cre8 - HoverCard component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { createComponent } from '@lit/react';
import { Cre8Popover as Cre8PopoverWC } from '@tmorrow/cre8-wc';
import React, { useState } from 'react';
import { extractString } from '../utils.js';

const Cre8PopoverComponent = createComponent({
  react: React,
  tagName: 'cre8-popover',
  elementClass: Cre8PopoverWC,
});

export function HoverCard({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const content = extractString((properties as any).content) ?? '';
  const position = extractString((properties as any).position) ?? 'bottom';

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      style={{ display: 'inline-block', position: 'relative' }}
    >
      {children}
      <Cre8PopoverComponent position={position as any} isActive={isOpen}>
        {content}
      </Cre8PopoverComponent>
    </div>
  );
}
```

---

## Batch 8: Update Mapping & Exports

### Task 8.1: Update components/index.ts

**Files:**
- Modify: `packages/react-cre8/src/components/index.ts`

**Step 1: Export all new components**

Replace the entire file with:

```tsx
/**
 * @a2ui-bridge/react-cre8 - Component exports
 * MIT License - Copyright (c) 2025 southleft
 */

// Core A2UI adapters
export { Row } from './Row.js';
export { Column } from './Column.js';
export { Card } from './Card.js';
export { Divider } from './Divider.js';
export { Text } from './Text.js';
export { Badge } from './Badge.js';
export { Image } from './Image.js';
export { Icon } from './Icon.js';
export { Button } from './Button.js';
export { TextField } from './TextField.js';
export { Select } from './Select.js';
export { Checkbox } from './Checkbox.js';

// Extended cre8-specific adapters
export { Alert } from './Alert.js';
export { Hero } from './Hero.js';
export { Band } from './Band.js';
export { LoadingSpinner } from './LoadingSpinner.js';

// Layout (new)
export { Separator } from './Separator.js';
export { ScrollArea } from './ScrollArea.js';
export { AspectRatio } from './AspectRatio.js';
export { Flex } from './Flex.js';
export { Grid } from './Grid.js';
export { Center } from './Center.js';
export { Box } from './Box.js';
export { Container } from './Container.js';

// Typography & Display (new)
export { Label } from './Label.js';
export { Link } from './Link.js';
export { Avatar } from './Avatar.js';
export { Skeleton } from './Skeleton.js';
export { Title } from './Title.js';
export { Code } from './Code.js';
export { Blockquote } from './Blockquote.js';

// Form inputs (new)
export { Input } from './Input.js';
export { TextArea } from './TextArea.js';
export { Switch } from './Switch.js';
export { RadioGroup } from './RadioGroup.js';
export { Slider } from './Slider.js';
export { ActionIcon } from './ActionIcon.js';
export { MultiSelect } from './MultiSelect.js';
export { NumberInput } from './NumberInput.js';
export { DateTimeInput } from './DateTimeInput.js';

// Feedback & Status (new)
export { Progress } from './Progress.js';
export { Toast } from './Toast.js';
export { Tooltip } from './Tooltip.js';

// Navigation (new)
export { Tabs } from './Tabs.js';
export { TabPanel } from './TabPanel.js';
export { Breadcrumb } from './Breadcrumb.js';
export { Pagination } from './Pagination.js';

// Data display (new)
export { List } from './List.js';
export { Table } from './Table.js';
export { TableHeader } from './TableHeader.js';
export { TableBody } from './TableBody.js';
export { TableRow } from './TableRow.js';
export { TableCell } from './TableCell.js';

// Disclosure & Overlay (new)
export { Accordion } from './Accordion.js';
export { AccordionItem } from './AccordionItem.js';
export { Collapsible } from './Collapsible.js';
export { Dialog } from './Dialog.js';
export { Sheet } from './Sheet.js';
export { Popover } from './Popover.js';
export { DropdownMenu } from './DropdownMenu.js';
export { HoverCard } from './HoverCard.js';

// Utility
export { Fallback } from './Fallback.js';
```

---

### Task 8.2: Update mapping.ts

**Files:**
- Modify: `packages/react-cre8/src/mapping.ts`

**Step 1: Update component mapping with all new components**

Replace the entire file with:

```tsx
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
import { Image } from './components/Image.js';
import { Icon } from './components/Icon.js';
import { Button } from './components/Button.js';
import { TextField } from './components/TextField.js';
import { Select } from './components/Select.js';
import { Checkbox } from './components/Checkbox.js';

// Extended cre8-specific adapters
import { Alert } from './components/Alert.js';
import { Hero } from './components/Hero.js';
import { Band } from './components/Band.js';
import { LoadingSpinner } from './components/LoadingSpinner.js';

// Layout (new)
import { Separator } from './components/Separator.js';
import { ScrollArea } from './components/ScrollArea.js';
import { AspectRatio } from './components/AspectRatio.js';
import { Flex } from './components/Flex.js';
import { Grid } from './components/Grid.js';
import { Center } from './components/Center.js';
import { Box } from './components/Box.js';
import { Container } from './components/Container.js';

// Typography & Display (new)
import { Label } from './components/Label.js';
import { Link } from './components/Link.js';
import { Avatar } from './components/Avatar.js';
import { Skeleton } from './components/Skeleton.js';
import { Title } from './components/Title.js';
import { Code } from './components/Code.js';
import { Blockquote } from './components/Blockquote.js';

// Form inputs (new)
import { Input } from './components/Input.js';
import { TextArea } from './components/TextArea.js';
import { Switch } from './components/Switch.js';
import { RadioGroup } from './components/RadioGroup.js';
import { Slider } from './components/Slider.js';
import { ActionIcon } from './components/ActionIcon.js';
import { MultiSelect } from './components/MultiSelect.js';
import { NumberInput } from './components/NumberInput.js';
import { DateTimeInput } from './components/DateTimeInput.js';

// Feedback & Status (new)
import { Progress } from './components/Progress.js';
import { Toast } from './components/Toast.js';
import { Tooltip } from './components/Tooltip.js';

// Navigation (new)
import { Tabs } from './components/Tabs.js';
import { TabPanel } from './components/TabPanel.js';
import { Breadcrumb } from './components/Breadcrumb.js';
import { Pagination } from './components/Pagination.js';

// Data display (new)
import { List } from './components/List.js';
import { Table } from './components/Table.js';
import { TableHeader } from './components/TableHeader.js';
import { TableBody } from './components/TableBody.js';
import { TableRow } from './components/TableRow.js';
import { TableCell } from './components/TableCell.js';

// Disclosure & Overlay (new)
import { Accordion } from './components/Accordion.js';
import { AccordionItem } from './components/AccordionItem.js';
import { Collapsible } from './components/Collapsible.js';
import { Dialog } from './components/Dialog.js';
import { Sheet } from './components/Sheet.js';
import { Popover } from './components/Popover.js';
import { DropdownMenu } from './components/DropdownMenu.js';
import { HoverCard } from './components/HoverCard.js';

// Utility
import { Fallback } from './components/Fallback.js';

/**
 * Cre8 component mapping for A2UI.
 * Use this with the Root or Surface components.
 */
export const cre8Components: ComponentMapping = {
  // Core A2UI types
  Row,
  Column,
  Card,
  Divider,
  Text,
  Badge,
  Image,
  Icon,
  Button,
  TextField,
  Select,
  Checkbox,
  CheckBox: Checkbox,

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

  // Layout (new)
  Separator,
  ScrollArea,
  AspectRatio,
  Flex,
  Grid,
  Center,
  Box,
  Container,

  // Typography & Display (new)
  Label,
  Link,
  Avatar,
  Skeleton,
  Title,
  Code,
  Blockquote,
  // Typography aliases
  Heading: Title,
  H1: Title,
  H2: Title,
  H3: Title,
  H4: Title,
  H5: Title,
  H6: Title,

  // Form inputs (new)
  Input,
  TextArea,
  Switch,
  RadioGroup,
  Slider,
  ActionIcon,
  MultiSelect,
  NumberInput,
  DateTimeInput,
  // Form aliases
  IconButton: ActionIcon,
  TextInput: TextField,
  Textarea: TextArea,
  Toggle: Switch,

  // Feedback & Status (new)
  Progress,
  Toast,
  Tooltip,

  // Navigation (new)
  Tabs,
  TabPanel,
  Breadcrumb,
  Pagination,
  // Navigation aliases
  Breadcrumbs: Breadcrumb,

  // Data display (new)
  List,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,

  // Disclosure & Overlay (new)
  Accordion,
  AccordionItem,
  Collapsible,
  Dialog,
  Sheet,
  Popover,
  DropdownMenu,
  HoverCard,
  // Overlay aliases
  Modal: Dialog,
  Drawer: Sheet,
  Menu: DropdownMenu,

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

## Batch 9: Build & Verify

### Task 9.1: Build the package

**Step 1: Run build**

```bash
cd /Users/tylersmbp/Projects/a2ui-bridge && pnpm --filter @a2ui-bridge/react-cre8 build
```

Expected: Build succeeds with no errors

### Task 9.2: Fix any TypeScript errors

If build fails, fix type errors in individual components.

### Task 9.3: Test with demo app

```bash
cd /Users/tylersmbp/Projects/a2ui-bridge/apps/demo && pnpm run dev
```

---

## Summary

**Total Components Added:** 44
**Batches:** 9

| Batch | Components | Count |
|-------|------------|-------|
| 1 | Layout | 8 |
| 2 | Typography & Display | 7 |
| 3 | Form Inputs | 9 |
| 4 | Feedback & Status | 4 |
| 5 | Navigation | 4 |
| 6 | Data Display | 6 |
| 7 | Disclosure & Overlay | 8 |
| 8 | Update Exports | - |
| 9 | Build & Verify | - |

This brings `@a2ui-bridge/react-cre8` to full parity with `@a2ui-bridge/react-shadcn` (60 total components).
