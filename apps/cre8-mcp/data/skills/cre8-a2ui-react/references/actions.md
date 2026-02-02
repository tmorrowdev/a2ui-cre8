# Actions Components

2 components for user interactions.

## Cre8Button

Primary interactive element for user actions.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | string | — | **Required.** Button text. Keep short, max 3 words. Title Case. |
| `variant` | `"primary" \| "secondary" \| "tertiary"` | "primary" | Visual priority level |
| `size` | `"sm" \| "md" \| "lg"` | "md" | Button size |
| `disabled` | boolean | false | Disabled state |
| `fullWidth` | boolean | false | 100% width |
| `loading` | boolean | false | Loading state |
| `iconName` | string | — | Icon name (deprecated, use svg) |
| `iconPosition` | `"before" \| "after"` | — | Icon placement |
| `href` | string | — | Makes button an anchor element |
| `type` | `"button" \| "submit" \| "reset"` | "button" | Button type |

```jsx
// Primary button
<Cre8Button text="Submit" variant="primary" />

// Secondary button
<Cre8Button text="Cancel" variant="secondary" />

// Loading state
<Cre8Button text="Saving..." loading={true} />

// Full width
<Cre8Button text="Sign In" variant="primary" fullWidth />

// Link button
<Cre8Button text="Learn More" href="/about" variant="tertiary" />

// With icon
<Cre8Button text="Download" iconName="download" iconPosition="before" />
```

**AI Rules:**
- One `variant="primary"` per screen/view
- Use `variant="secondary"` for secondary actions
- Use `variant="tertiary"` sparingly — consider if a link is more appropriate
- Keep `text` short: max 3 words, use Title Case
- Use `type="submit"` inside forms
- Use `href` for navigation instead of wrapping in anchor

---

## Cre8DangerButton

Button for destructive actions like delete or remove.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | string | — | **Required.** Button text |
| `disabled` | boolean | false | Disabled state |

```jsx
<Cre8DangerButton text="Delete" />

<Cre8DangerButton text="Remove Item" disabled={isProcessing} />
```

**AI Rules:**
- Reserve for destructive actions only (delete, remove, cancel irreversible)
- Always confirm dangerous actions with `Cre8Modal`
- Never use as primary page CTA
