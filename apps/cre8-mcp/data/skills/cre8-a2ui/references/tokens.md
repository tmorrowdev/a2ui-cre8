# CRE8 Design Tokens

Complete design token architecture for the CRE8 Web Components system.

## Token Namespace

All CSS custom properties follow: `--cre8-{category}-{property}-{variant}`

## Spacing Tokens

```css
--cre8-spacing-0      /* 0px - No spacing */
--cre8-spacing-2      /* 2px - Micro */
--cre8-spacing-4      /* 4px - Tight */
--cre8-spacing-8      /* 8px - Default */
--cre8-spacing-16     /* 16px - Standard */
--cre8-spacing-24     /* 24px - Large */
```

## Color Tokens

### Background Colors
```css
--cre8-color-bg-default
--cre8-color-bg-subtle
--cre8-color-bg-muted
--cre8-color-bg-inverse
--cre8-color-bg-brand-subtle
--cre8-color-bg-brand-strong
--cre8-color-bg-brand-xstrong
```

### Border Colors
```css
--cre8-color-border-default
--cre8-color-border-subtle
--cre8-color-border-strong
--cre8-color-border-inverse
--cre8-color-border-brand
```

### Content Colors
```css
--cre8-color-content-default
--cre8-color-content-subtle
--cre8-color-content-muted
--cre8-color-content-inverse
--cre8-color-content-brand
```

### Status Colors
```css
/* Error */
--cre8-color-bg-error
--cre8-color-border-error
--cre8-color-content-error

/* Warning */
--cre8-color-bg-warning
--cre8-color-border-warning
--cre8-color-content-warning

/* Success */
--cre8-color-bg-success
--cre8-color-border-success
--cre8-color-content-success

/* Info */
--cre8-color-bg-info
--cre8-color-border-info
--cre8-color-content-info

/* Attention */
--cre8-color-bg-attention
--cre8-color-border-attention
--cre8-color-content-attention
```

### Button Colors
```css
--cre8-color-button-primary-background
--cre8-color-button-primary-background-hover
--cre8-color-button-primary-border
--cre8-color-button-primary-content
--cre8-color-button-secondary-background
--cre8-color-button-secondary-border
--cre8-color-button-tertiary-background
```

### Link Colors
```css
--cre8-color-link-default
--cre8-color-link-hover
--cre8-color-link-visited
--cre8-color-link-inverse
```

## Border Tokens

### Width
```css
--cre8-border-width-default      /* 1px */
--cre8-border-width-thick        /* 2px */
--cre8-border-width-button-default
```

### Radius
```css
--cre8-border-radius-default     /* 4px */
--cre8-border-radius-lg          /* 8px */
--cre8-border-radius-full        /* 9999px */
--cre8-border-radius-button
--cre8-border-radius-card
--cre8-border-radius-input
```

## Shadow Tokens

```css
--cre8-shadow-default
--cre8-shadow-elevated
--cre8-shadow-button
--cre8-shadow-card
--cre8-shadow-dropdown
--cre8-shadow-modal
```

## Animation Tokens

```css
--cre8-anim-fade-quick           /* 150ms */
--cre8-anim-fade-default         /* 300ms */
--cre8-anim-ease                 /* cubic-bezier(0.4, 0, 0.2, 1) */
--cre8-anim-ease-in              /* cubic-bezier(0.4, 0, 1, 1) */
--cre8-anim-ease-out             /* cubic-bezier(0, 0, 0.2, 1) */
```

## Typography Tokens

```css
--cre8-font-family-default
--cre8-font-family-mono
--cre8-font-size-xs              /* 12px */
--cre8-font-size-sm              /* 14px */
--cre8-font-size-md              /* 16px */
--cre8-font-size-lg              /* 18px */
--cre8-font-size-xl              /* 20px */
--cre8-font-size-2xl             /* 24px */
--cre8-font-size-3xl             /* 30px */
--cre8-font-weight-normal        /* 400 */
--cre8-font-weight-medium        /* 500 */
--cre8-font-weight-semibold      /* 600 */
--cre8-font-weight-bold          /* 700 */
--cre8-line-height-tight         /* 1.25 */
--cre8-line-height-default       /* 1.5 */
--cre8-line-height-relaxed       /* 1.75 */
```

## Component-Specific Tokens

### Button
```css
--cre8-button-width
--cre8-button-height
--cre8-button-min-width
--cre8-button-min-height
--cre8-button-padding-x
--cre8-button-padding-y
--cre8-button-margin-x
--cre8-button-margin-y
```

### Input/Field
```css
--cre8-input-height
--cre8-input-padding-x
--cre8-input-padding-y
--cre8-input-border-width
```

### Card
```css
--cre8-card-padding
--cre8-card-border-radius
--cre8-card-shadow
```

### Header
```css
--cre8-header-background
--cre8-header-top-background
--cre8-header-middle-border-bottom-color
--cre8-header-bottom-background
--cre8-header-bottom-box-shadow
--cre8-color-header-bg-default
--cre8-color-header-menu-*
--cre8-color-header-submenu-*
```

### Sidebar
```css
--cre8-sidebar-width
```

### Layout
```css
--cre8-l-max-width               /* Container max-width */
--cre8-l-gutter                  /* Container padding */
```

### Icon
```css
--cre8-icon-size-sm              /* 16px */
--cre8-icon-size-md              /* 24px */
--cre8-icon-size-lg              /* 32px */
--cre8-icon-size-xl              /* 48px */
```

## Theming Example

Override tokens to apply brand theming:

```css
:root {
  /* Brand primary color */
  --cre8-color-bg-brand-strong: #6366F1;
  --cre8-color-bg-brand-xstrong: #0F172A;
  --cre8-color-content-brand: #6366F1;
  
  /* Button theming */
  --cre8-color-button-primary-background: #6366F1;
  --cre8-color-button-primary-background-hover: #4F46E5;
  
  /* Link theming */
  --cre8-color-link-default: #6366F1;
  --cre8-color-link-hover: #4F46E5;
}
```
