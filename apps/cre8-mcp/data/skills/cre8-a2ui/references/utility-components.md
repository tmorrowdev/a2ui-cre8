# Utility Components

11 supporting and structural components. All extend `Cre8Element`.

## cre8-header

Page header container with slot-based structure.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `sticky` | boolean | false | Fixed positioning |

**Slots:** `top`, `middle`, `bottom`

**Design Tokens:**
- `--cre8-header-background`
- `--cre8-header-top-background`
- `--cre8-header-middle-border-bottom-color`
- `--cre8-header-bottom-background`
- `--cre8-header-bottom-box-shadow`
- `--cre8-color-header-bg-default`

```html
<cre8-header sticky>
  <cre8-utility-nav slot="top">
    <cre8-nav-item><cre8-link href="/help">Help</cre8-link></cre8-nav-item>
  </cre8-utility-nav>
  
  <div slot="middle" style="display: flex; justify-content: space-between; align-items: center;">
    <cre8-logo href="/"></cre8-logo>
    <cre8-primary-nav>
      <cre8-nav-item><cre8-link href="/features">Features</cre8-link></cre8-nav-item>
      <cre8-nav-item><cre8-link href="/pricing">Pricing</cre8-link></cre8-nav-item>
    </cre8-primary-nav>
    <cre8-button-group>
      <cre8-button text="Log In" variant="tertiary"></cre8-button>
      <cre8-button text="Sign Up" variant="primary"></cre8-button>
    </cre8-button-group>
  </div>
  
  <cre8-tertiary-nav slot="bottom">...</cre8-tertiary-nav>
</cre8-header>
```

---

## cre8-footer

Page footer container.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'default' \| 'minimal'` | "default" | Footer style |

**Slots:** `default`, `logo`, `navigation`, `social`, `legal`

**Design Tokens:** `--cre8-color-bg-brand-xstrong` (footer background)

```html
<cre8-footer>
  <cre8-layout-container>
    <cre8-grid variant="4up" gap="lg">
      <div>
        <cre8-logo variant="inverse" href="/"></cre8-logo>
        <cre8-text-passage style="color: rgba(255,255,255,0.7);">
          <p>Company tagline or description.</p>
        </cre8-text-passage>
      </div>
      
      <div>
        <strong style="color: white;">Product</strong>
        <cre8-link-list inverted>
          <cre8-link href="/features">Features</cre8-link>
          <cre8-link href="/pricing">Pricing</cre8-link>
        </cre8-link-list>
      </div>
      
      <div>
        <strong style="color: white;">Company</strong>
        <cre8-link-list inverted>
          <cre8-link href="/about">About</cre8-link>
          <cre8-link href="/careers">Careers</cre8-link>
        </cre8-link-list>
      </div>
      
      <div>
        <strong style="color: white;">Legal</strong>
        <cre8-link-list inverted>
          <cre8-link href="/privacy">Privacy</cre8-link>
          <cre8-link href="/terms">Terms</cre8-link>
        </cre8-link-list>
      </div>
    </cre8-grid>
    
    <cre8-divider style="--cre8-divider-color: rgba(255,255,255,0.1);"></cre8-divider>
    
    <div style="color: rgba(255,255,255,0.6);">
      © 2024 Company. All rights reserved.
    </div>
  </cre8-layout-container>
</cre8-footer>
```

---

## cre8-logo

Brand logo display.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'default' \| 'inverse'` | "default" | Color scheme |
| `size` | `'sm' \| 'md' \| 'lg'` | "md" | Logo size |
| `href` | string | "/" | Link destination |

```html
<cre8-logo href="/" variant="inverse" size="lg"></cre8-logo>
```

---

## cre8-icon

SVG icon display.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `svg` | string | - | **Required.** SVG markup |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | "md" | Icon size |
| `color` | string | "currentColor" | Icon color |
| `label` | string | - | Accessible label |

**Design Tokens:**
- `--cre8-icon-size-sm` (16px)
- `--cre8-icon-size-md` (24px)
- `--cre8-icon-size-lg` (32px)
- `--cre8-icon-size-xl` (48px)

```html
<cre8-icon 
  svg="<svg viewBox='0 0 24 24'>...</svg>"
  size="lg"
  label="Settings"
></cre8-icon>
```

---

## cre8-divider

Visual separator line.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | "horizontal" | Line direction |
| `variant` | `'solid' \| 'dashed'` | "solid" | Line style |

**Design Tokens:** `--cre8-divider-color`

```html
<cre8-divider></cre8-divider>

<cre8-divider orientation="vertical" style="height: 40px;"></cre8-divider>

<cre8-divider variant="dashed"></cre8-divider>
```

---

## cre8-form

Form container with validation.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `novalidate` | boolean | false | Disable native validation |

**Events:**
- `cre8-submit` — Valid form submission
- `cre8-invalid` — Validation failure

```html
<cre8-form @cre8-submit="${handleSubmit}" @cre8-invalid="${handleError}">
  <cre8-field label="Email" type="email" required></cre8-field>
  <cre8-field label="Password" type="password" required></cre8-field>
  <cre8-button type="submit" text="Sign In" variant="primary"></cre8-button>
</cre8-form>
```

**AI Rules:**
- Always use for form submissions
- Handle both success and error events
- Works with all Cre8 form components

---

## cre8-fieldset

Form field grouping with legend.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `legend` | string | - | **Required.** Group label |
| `legendHidden` | boolean | false | Visually hide legend |

```html
<cre8-fieldset legend="Contact Information">
  <cre8-field label="First Name" required></cre8-field>
  <cre8-field label="Last Name" required></cre8-field>
  <cre8-field label="Phone" type="tel"></cre8-field>
</cre8-fieldset>

<cre8-fieldset legend="Shipping Address">
  <cre8-field label="Street Address" required></cre8-field>
  <cre8-grid variant="2up">
    <cre8-field label="City" required></cre8-field>
    <cre8-select label="State" required>...</cre8-select>
  </cre8-grid>
  <cre8-field label="ZIP Code" required></cre8-field>
</cre8-fieldset>
```

**AI Rules:**
- Use for logically related form fields
- Always provide meaningful legend
- Required for checkbox/radio groups

---

## cre8-field-note

Helper or error text for form fields.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `isError` | boolean | - | Error styling |
| `isSuccess` | boolean | - | Success styling |

```html
<cre8-field-note>Enter your email address</cre8-field-note>
<cre8-field-note isError>This field is required</cre8-field-note>
<cre8-field-note isSuccess>Email is available</cre8-field-note>
```

---

## cre8-visually-hidden

Hide content visually but keep accessible.

```html
<cre8-visually-hidden>
  This text is only visible to screen readers
</cre8-visually-hidden>
```

---

## cre8-remove-tag

Removable tag for multi-select displays.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `text` | string | - | **Required.** Tag text |

**Events:** `remove`

```html
<cre8-remove-tag text="JavaScript" @remove="${handleRemove}"></cre8-remove-tag>
```

---

## Overlay Components (4)

### cre8-popover

Contextual popup content.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `isActive` | boolean | - | Visibility |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | "bottom" | Popup position |

```html
<cre8-popover isActive position="bottom">
  <cre8-button slot="trigger" text="Options"></cre8-button>
  <cre8-menu>
    <cre8-menu-item>Edit</cre8-menu-item>
    <cre8-menu-item>Delete</cre8-menu-item>
  </cre8-menu>
</cre8-popover>
```

---

### cre8-dropdown

Dropdown menu trigger.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `isOpen` | boolean | - | Open state |
| `position` | `'bottom-start' \| 'bottom-end'` | "bottom-start" | Menu position |
| `closeOnSelect` | boolean | true | Close on selection |

**Events:** `dropdown-toggle`

```html
<cre8-dropdown>
  <cre8-button slot="trigger" text="Actions" iconPosition="after" svg="▼"></cre8-button>
  <cre8-menu slot="content">
    <cre8-menu-item>View</cre8-menu-item>
    <cre8-menu-item>Edit</cre8-menu-item>
    <cre8-menu-item variant="danger">Delete</cre8-menu-item>
  </cre8-menu>
</cre8-dropdown>
```

---

### cre8-drawer

Slide-in panel from screen edge.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `isActive` | boolean | - | Visibility |
| `position` | `'left' \| 'right'` | "right" | Slide direction |
| `size` | `'sm' \| 'md' \| 'lg'` | "md" | Drawer width |

**Events:** `close-drawer`

```html
<cre8-drawer isActive position="right" size="md">
  <cre8-heading slot="header" tagVariant="h2">Drawer Title</cre8-heading>
  <div slot="body">
    Drawer content here
  </div>
  <cre8-button-group slot="footer">
    <cre8-button text="Cancel" variant="secondary"></cre8-button>
    <cre8-button text="Save" variant="primary"></cre8-button>
  </cre8-button-group>
</cre8-drawer>
```

---

## Typography Components (2)

### cre8-heading

Semantic heading with styling.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `tagVariant` | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | "h2" | Heading level |
| `styleVariant` | `'display' \| 'headline' \| 'title' \| 'subtitle'` | - | Visual style override |

```html
<cre8-heading tagVariant="h1">Page Title</cre8-heading>
<cre8-heading tagVariant="h2" styleVariant="display">Large Display</cre8-heading>
<cre8-heading tagVariant="h3">Section Title</cre8-heading>
```

---

### cre8-text-passage

Body text container with typography styling.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | "md" | Text size |

```html
<cre8-text-passage>
  <p>This is a paragraph with proper typography styling including line-height, letter-spacing, and responsive sizing.</p>
  <p>Multiple paragraphs are properly spaced.</p>
</cre8-text-passage>

<cre8-text-passage size="lg">
  <p>Larger text for emphasis or readability.</p>
</cre8-text-passage>
```
