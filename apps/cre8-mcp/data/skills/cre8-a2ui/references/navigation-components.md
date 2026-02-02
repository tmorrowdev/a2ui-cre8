# Navigation Components

18 components for navigation patterns and links. All extend `Cre8Element`.

## cre8-primary-nav

Main site navigation bar.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | "horizontal" | Layout direction |

**Slots:** `default` — `cre8-nav-item` elements

```html
<cre8-primary-nav>
  <cre8-nav-item>
    <cre8-link href="/features">Features</cre8-link>
  </cre8-nav-item>
  <cre8-nav-item>
    <cre8-link href="/pricing">Pricing</cre8-link>
  </cre8-nav-item>
  <cre8-nav-item hasDropdown>
    <cre8-link href="/products">Products</cre8-link>
    <cre8-dropdown-panel slot="dropdown">...</cre8-dropdown-panel>
  </cre8-nav-item>
</cre8-primary-nav>
```

---

## cre8-nav-item

Individual navigation item container.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `hasDropdown` | boolean | - | Has dropdown submenu |
| `isActive` | boolean | - | Active/current page |

**Slots:** `default`, `dropdown`

---

## cre8-tertiary-nav

Secondary/utility navigation bar.

```html
<cre8-tertiary-nav>
  <cre8-nav-item>
    <cre8-link href="/docs">Documentation</cre8-link>
  </cre8-nav-item>
  <cre8-nav-item>
    <cre8-link href="/support">Support</cre8-link>
  </cre8-nav-item>
</cre8-tertiary-nav>
```

---

## cre8-utility-nav

Top utility navigation (login, account, etc).

```html
<cre8-utility-nav>
  <cre8-nav-item>
    <cre8-link href="/login">Sign In</cre8-link>
  </cre8-nav-item>
  <cre8-nav-item>
    <cre8-button text="Get Started" variant="primary" size="sm"></cre8-button>
  </cre8-nav-item>
</cre8-utility-nav>
```

---

## cre8-vertical-nav

Sidebar vertical navigation.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `collapsed` | boolean | - | Collapsed icon-only mode |

**Slots:** `default` — `cre8-vertical-nav-item` elements

```html
<cre8-vertical-nav>
  <cre8-vertical-nav-item href="/dashboard" icon="home" label="Dashboard" isActive></cre8-vertical-nav-item>
  <cre8-vertical-nav-item href="/analytics" icon="chart" label="Analytics"></cre8-vertical-nav-item>
  <cre8-vertical-nav-item href="/settings" icon="gear" label="Settings"></cre8-vertical-nav-item>
</cre8-vertical-nav>
```

---

## cre8-vertical-nav-item

Vertical navigation item.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `href` | string | - | Link destination |
| `icon` | string | - | Icon name |
| `label` | string | - | Item label |
| `isActive` | boolean | - | Current page |
| `hasSubmenu` | boolean | - | Has nested items |
| `expanded` | boolean | - | Submenu expanded |

---

## cre8-tabs

Tabbed navigation container.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'default' \| 'pills' \| 'underline'` | "default" | Visual style |
| `selectedIndex` | number | 0 | Active tab index |

**Events:** `tab-change`

**Slots:** `default` — `cre8-tab` elements

```html
<cre8-tabs variant="underline">
  <cre8-tab label="Overview" isSelected>
    <p>Overview content</p>
  </cre8-tab>
  <cre8-tab label="Features">
    <p>Features content</p>
  </cre8-tab>
  <cre8-tab label="Pricing">
    <p>Pricing content</p>
  </cre8-tab>
</cre8-tabs>
```

---

## cre8-tab

Individual tab panel.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | string | - | **Required.** Tab label |
| `isSelected` | boolean | - | Active tab |
| `disabled` | boolean | - | Disabled state |

---

## cre8-breadcrumbs

Breadcrumb navigation trail.

**Slots:** `default` — `cre8-breadcrumb-item` elements

```html
<cre8-breadcrumbs>
  <cre8-breadcrumb-item href="/">Home</cre8-breadcrumb-item>
  <cre8-breadcrumb-item href="/products">Products</cre8-breadcrumb-item>
  <cre8-breadcrumb-item isCurrent>Widget Pro</cre8-breadcrumb-item>
</cre8-breadcrumbs>
```

---

## cre8-breadcrumb-item

Individual breadcrumb.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `href` | string | - | Link destination |
| `isCurrent` | boolean | - | Current page (no link) |

---

## cre8-pagination

Page navigation for lists.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `currentPage` | number | 1 | Current page |
| `totalPages` | number | - | **Required.** Total pages |
| `visiblePages` | number | 5 | Pages to show |

**Events:** `page-change`

```html
<cre8-pagination 
  currentPage="3"
  totalPages="10"
  visiblePages="5"
  @page-change="${handlePageChange}"
></cre8-pagination>
```

---

## cre8-link

Styled anchor link.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `href` | string | - | **Required.** Link destination |
| `target` | `'_blank' \| '_self'` | - | Link target |
| `variant` | `'default' \| 'standalone' \| 'inline'` | "default" | Visual style |
| `inverted` | boolean | - | Light-on-dark style |
| `svg` | string | - | Icon SVG |
| `iconPosition` | `'before' \| 'after'` | - | Icon placement |

```html
<cre8-link href="/about">About Us</cre8-link>
<cre8-link href="/docs" target="_blank" iconPosition="after">
  Documentation ↗
</cre8-link>
```

---

## cre8-link-list

Vertical list of links.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `inverted` | boolean | - | Light-on-dark style |

**Slots:** `default` — `cre8-link` elements

```html
<cre8-link-list inverted>
  <cre8-link href="/privacy">Privacy Policy</cre8-link>
  <cre8-link href="/terms">Terms of Service</cre8-link>
  <cre8-link href="/contact">Contact Us</cre8-link>
</cre8-link-list>
```

---

## cre8-skip-nav

Accessibility skip-to-content link.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `href` | string | "#main" | Target ID |
| `text` | string | "Skip to main content" | Link text |

```html
<cre8-skip-nav href="#main-content"></cre8-skip-nav>
```

**AI Rules:** Always include as first focusable element for WCAG compliance.

---

## cre8-stepper

Multi-step progress indicator.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `currentStep` | number | 1 | Current step |
| `orientation` | `'horizontal' \| 'vertical'` | "horizontal" | Layout |

**Slots:** `default` — `cre8-step` elements

```html
<cre8-stepper currentStep="2">
  <cre8-step label="Account" completed></cre8-step>
  <cre8-step label="Profile" isActive></cre8-step>
  <cre8-step label="Review"></cre8-step>
</cre8-stepper>
```

---

## cre8-step

Individual step indicator.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | string | - | **Required.** Step label |
| `completed` | boolean | - | Step completed |
| `isActive` | boolean | - | Current step |
| `disabled` | boolean | - | Step disabled |

---

## cre8-menu

Dropdown menu list.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `isOpen` | boolean | - | Menu visibility |

**Events:** `menu-select`

**Slots:** `default` — `cre8-menu-item` elements

```html
<cre8-menu isOpen>
  <cre8-menu-item>Edit</cre8-menu-item>
  <cre8-menu-item>Duplicate</cre8-menu-item>
  <cre8-divider></cre8-divider>
  <cre8-menu-item variant="danger">Delete</cre8-menu-item>
</cre8-menu>
```

---

## cre8-menu-item

Menu list item.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `href` | string | - | Link destination |
| `variant` | `'default' \| 'danger'` | "default" | Visual style |
| `disabled` | boolean | - | Disabled state |
| `icon` | string | - | Leading icon |
