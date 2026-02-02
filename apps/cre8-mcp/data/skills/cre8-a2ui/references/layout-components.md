# Layout Components

10 components for page structure and containers. All extend `Cre8Element`.

## cre8-layout

Top-level page layout wrapper with optional sidebar.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'left-sidebar'` | - | Layout with sidebar |

**Slots:** `default`

```html
<cre8-layout>
  <cre8-header>...</cre8-header>
  <cre8-main>...</cre8-main>
  <cre8-footer>...</cre8-footer>
</cre8-layout>

<cre8-layout variant="left-sidebar">
  <cre8-sidebar slot="sidebar">...</cre8-sidebar>
  <cre8-main>...</cre8-main>
</cre8-layout>
```

**AI Rules:** Always use as root wrapper for full pages.

---

## cre8-layout-container

Max-width content container with responsive padding.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg' \| 'full'` | "lg" | Container width |

**Design Tokens:** `--cre8-l-max-width`, `--cre8-l-gutter`

```html
<cre8-layout-container>
  <!-- Content constrained to max-width -->
</cre8-layout-container>

<cre8-layout-container size="sm">
  <!-- Narrower content for readability -->
</cre8-layout-container>
```

**AI Rules:** Use inside `cre8-band` or `cre8-section` to constrain content width.

---

## cre8-main

Main content area wrapper. Semantic `<main>` element.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `fullHeight` | boolean | - | 100% viewport height |

```html
<cre8-main>
  <cre8-section>...</cre8-section>
</cre8-main>

<cre8-main fullHeight>
  <!-- Full height layout -->
</cre8-main>
```

---

## cre8-section

Content section with optional headline.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `headline` | string | - | Section heading |

**Slots:** `default`, `header`

```html
<cre8-section headline="Features">
  <cre8-layout-container>
    <cre8-grid variant="3up">...</cre8-grid>
  </cre8-layout-container>
</cre8-section>

<cre8-section>
  <cre8-heading slot="header" tagVariant="h2">Custom Header</cre8-heading>
  <!-- Content -->
</cre8-section>
```

---

## cre8-band

Full-width background section for visual separation.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'branded'` | - | Brand background color |
| `fullHeight` | boolean | - | 100% viewport height |

```html
<cre8-band variant="branded">
  <cre8-layout-container>
    <!-- Hero content on brand background -->
  </cre8-layout-container>
</cre8-band>

<cre8-band style="background: linear-gradient(135deg, #0F172A, #4F46E5);">
  <!-- Custom gradient background -->
</cre8-band>
```

**AI Rules:** Use for hero sections, CTAs, or visual breaks between sections.

---

## cre8-grid

CSS Grid layout system with preset patterns.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'side-by-side' \| '2up' \| '3up' \| '1-3up' \| '4up' \| '1-4up' \| '1-2-4up' \| '2-4-6up'` | - | Grid pattern |
| `gap` | `'none' \| 'sm' \| 'lg'` | - | Gutter size |
| `break` | `'faster' \| 'slower'` | - | Breakpoint timing |

**Slots:** `default` — Grid items

```html
<!-- 3-column grid -->
<cre8-grid variant="3up" gap="lg">
  <cre8-card>...</cre8-card>
  <cre8-card>...</cre8-card>
  <cre8-card>...</cre8-card>
</cre8-grid>

<!-- Responsive: 1 col → 2 col → 4 col -->
<cre8-grid variant="1-2-4up" gap="lg">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</cre8-grid>

<!-- Side-by-side layout -->
<cre8-grid variant="side-by-side">
  <div>Left content</div>
  <div>Right content</div>
</cre8-grid>
```

### Grid Variants

| Variant | Description |
|---------|-------------|
| `side-by-side` | Two equal columns |
| `2up` | 2-column grid |
| `3up` | 3-column grid |
| `4up` | 4-column grid |
| `1-3up` | 1 col → 3 col responsive |
| `1-4up` | 1 col → 4 col responsive |
| `1-2-4up` | 1 → 2 → 4 col responsive |
| `2-4-6up` | 2 → 4 → 6 col responsive |

---

## cre8-grid-item

Individual grid cell for custom positioning.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `colSpan` | number | 1 | Columns to span |
| `rowSpan` | number | 1 | Rows to span |

```html
<cre8-grid variant="4up">
  <cre8-grid-item colSpan="2">Wide item</cre8-grid-item>
  <cre8-grid-item>Normal item</cre8-grid-item>
  <cre8-grid-item>Normal item</cre8-grid-item>
</cre8-grid>
```

---

## cre8-sidebar

Side navigation container.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `position` | `'left' \| 'right'` | "left" | Side placement |
| `sticky` | boolean | false | Fixed positioning |
| `collapsible` | boolean | false | Allow collapse |
| `collapsed` | boolean | false | Collapsed state |

**Events:** `sidebar-toggle`

**Design Tokens:** `--cre8-sidebar-width`

```html
<cre8-layout variant="left-sidebar">
  <cre8-sidebar slot="sidebar" sticky collapsible>
    <cre8-vertical-nav>...</cre8-vertical-nav>
  </cre8-sidebar>
  <cre8-main>...</cre8-main>
</cre8-layout>
```

---

## cre8-sticky-container

Makes content sticky within scroll context.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `behavior` | `'sticky'` | - | Enable sticky |
| `top` | string | "1rem" | Sticky offset |

```html
<cre8-sticky-container behavior="sticky" top="80px">
  <cre8-card>Sticky sidebar content</cre8-card>
</cre8-sticky-container>
```

---

## cre8-aspect-ratio

Maintains aspect ratio for content.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `ratio` | `'1:1' \| '4:3' \| '16:9' \| '21:9'` | "16:9" | Aspect ratio |

```html
<cre8-aspect-ratio ratio="16:9">
  <img src="video-thumbnail.jpg" alt="Video">
</cre8-aspect-ratio>
```
