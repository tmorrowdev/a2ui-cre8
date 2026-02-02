# Feedback Components

8 components for user feedback and status indicators. All extend `Cre8Element`.

## cre8-alert

Inline notification message.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | "info" | Alert type |
| `headline` | string | - | Alert title |
| `dismissible` | boolean | - | Show close button |
| `icon` | string | - | Custom icon SVG |

**Events:** `alert-dismiss`

**Slots:** `default` — Alert message content

```html
<cre8-alert variant="success" headline="Success!" dismissible>
  Your changes have been saved.
</cre8-alert>

<cre8-alert variant="error" headline="Error">
  Something went wrong. Please try again.
</cre8-alert>

<cre8-alert variant="warning">
  Your session will expire in 5 minutes.
</cre8-alert>

<cre8-alert variant="info">
  New features are available. Check out the changelog.
</cre8-alert>
```

**AI Rules:**
- `error` for failures and problems
- `warning` for caution/attention
- `success` for confirmations
- `info` for neutral information

---

## cre8-banner

Full-width notification banner.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'info' \| 'success' \| 'warning' \| 'error' \| 'brand'` | "info" | Banner type |
| `dismissible` | boolean | - | Show close button |
| `sticky` | boolean | - | Stick to top |

**Events:** `banner-dismiss`

```html
<cre8-banner variant="brand" sticky>
  🎉 New feature: AI-powered insights are now available!
  <cre8-link href="/features" slot="action">Learn more</cre8-link>
</cre8-banner>
```

---

## cre8-modal

Dialog overlay for focused content.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `isActive` | boolean | - | Modal visibility |
| `headline` | string | - | Modal title |
| `size` | `'sm' \| 'md' \| 'lg' \| 'full'` | "md" | Modal width |
| `closeOnOverlay` | boolean | true | Close on backdrop click |
| `closeOnEscape` | boolean | true | Close on Escape key |

**Events:** `modal-close`

**Slots:** `default`, `header`, `footer`

```html
<cre8-modal isActive headline="Confirm Delete" size="sm">
  <p>Are you sure you want to delete this item? This action cannot be undone.</p>
  
  <cre8-button-group slot="footer">
    <cre8-button text="Cancel" variant="secondary" @click="${closeModal}"></cre8-button>
    <cre8-danger-button text="Delete" @click="${handleDelete}"></cre8-danger-button>
  </cre8-button-group>
</cre8-modal>
```

**AI Rules:**
- Use for confirmations, forms, and focused tasks
- Provide clear close mechanism
- Include descriptive headline
- Keep content focused and minimal

---

## cre8-loading-spinner

Animated loading indicator.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | "md" | Spinner size |
| `label` | string | "Loading" | Accessible label |

```html
<cre8-loading-spinner size="lg" label="Loading results"></cre8-loading-spinner>
```

---

## cre8-skeleton

Loading placeholder for content.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'text' \| 'heading' \| 'avatar' \| 'card' \| 'button'` | "text" | Placeholder type |
| `width` | string | - | Custom width |
| `height` | string | - | Custom height |
| `lines` | number | 1 | Text line count |

```html
<!-- Text placeholder -->
<cre8-skeleton variant="text" lines="3"></cre8-skeleton>

<!-- Avatar placeholder -->
<cre8-skeleton variant="avatar"></cre8-skeleton>

<!-- Card placeholder -->
<cre8-skeleton variant="card" height="200px"></cre8-skeleton>
```

---

## cre8-progress-bar

Linear progress indicator.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | number | 0 | Current progress (0-100) |
| `max` | number | 100 | Maximum value |
| `variant` | `'default' \| 'success' \| 'warning' \| 'error'` | "default" | Color variant |
| `showLabel` | boolean | - | Show percentage |
| `indeterminate` | boolean | - | Unknown progress |
| `label` | string | - | Accessible label |

```html
<cre8-progress-bar value="65" showLabel label="Upload progress"></cre8-progress-bar>

<cre8-progress-bar indeterminate label="Processing"></cre8-progress-bar>

<cre8-progress-bar value="90" variant="success"></cre8-progress-bar>
```

---

## cre8-toast

Temporary notification popup.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | "info" | Toast type |
| `headline` | string | - | Toast title |
| `duration` | number | 5000 | Auto-dismiss ms (0 = manual) |
| `position` | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left'` | "top-right" | Screen position |

**Events:** `toast-dismiss`

```html
<cre8-toast 
  variant="success" 
  headline="Saved!"
  duration="3000"
>
  Your changes have been saved.
</cre8-toast>
```

**AI Rules:**
- Use for transient feedback
- Keep messages brief
- Provide `duration` for auto-dismiss
- Use `duration="0"` for important messages

---

## cre8-empty-state

Placeholder for empty content areas.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `headline` | string | - | Empty state title |
| `description` | string | - | Explanatory text |
| `icon` | string | - | Illustration/icon SVG |

**Slots:** `default` — Action buttons

```html
<cre8-empty-state 
  headline="No results found"
  description="Try adjusting your search or filters to find what you're looking for."
>
  <cre8-button text="Clear filters" variant="secondary"></cre8-button>
</cre8-empty-state>

<cre8-empty-state 
  headline="No projects yet"
  description="Create your first project to get started."
>
  <cre8-button text="Create Project" variant="primary"></cre8-button>
</cre8-empty-state>
```
