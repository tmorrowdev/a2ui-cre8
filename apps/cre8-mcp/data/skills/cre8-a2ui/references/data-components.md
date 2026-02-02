# Data Display Components

17 components for data visualization and content display. All extend `Cre8Element`.

## cre8-card

Content container with optional header/footer.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'default' \| 'elevated' \| 'outlined'` | "default" | Card style |
| `href` | string | - | Makes card clickable |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | "md" | Content padding |

**Slots:** `default`, `header`, `body`, `footer`, `media`

**Design Tokens:** `--cre8-card-padding`, `--cre8-card-border-radius`, `--cre8-card-shadow`

```html
<cre8-card>
  <img slot="media" src="image.jpg" alt="Card image">
  <div slot="body">
    <cre8-heading tagVariant="h3">Card Title</cre8-heading>
    <cre8-text-passage>Card description text.</cre8-text-passage>
  </div>
  <cre8-button slot="footer" text="Learn More" variant="tertiary"></cre8-button>
</cre8-card>

<!-- Clickable card -->
<cre8-card href="/details" variant="elevated">
  <div slot="body">Click to view details</div>
</cre8-card>
```

---

## cre8-accordion

Expandable content sections.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `allowMultiple` | boolean | false | Allow multiple open |
| `variant` | `'default' \| 'bordered'` | "default" | Visual style |

**Slots:** `default` — `cre8-accordion-item` elements

```html
<cre8-accordion>
  <cre8-accordion-item headline="What is your refund policy?" isOpen>
    We offer a 30-day money-back guarantee on all plans.
  </cre8-accordion-item>
  <cre8-accordion-item headline="How do I cancel my subscription?">
    You can cancel anytime from your account settings.
  </cre8-accordion-item>
</cre8-accordion>
```

---

## cre8-accordion-item

Individual accordion section.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `headline` | string | - | **Required.** Section title |
| `isOpen` | boolean | - | Expanded state |
| `disabled` | boolean | - | Disabled state |

**Events:** `accordion-toggle`

---

## cre8-table

Data table with sorting and selection.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `striped` | boolean | - | Alternating row colors |
| `hoverable` | boolean | - | Row hover effect |
| `bordered` | boolean | - | Cell borders |
| `compact` | boolean | - | Reduced padding |
| `stickyHeader` | boolean | - | Fixed header |
| `selectable` | boolean | - | Row selection |

**Slots:** `default` — Standard `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`

```html
<cre8-table striped hoverable>
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John Doe</td>
      <td>john@example.com</td>
      <td>Admin</td>
    </tr>
    <tr>
      <td>Jane Smith</td>
      <td>jane@example.com</td>
      <td>User</td>
    </tr>
  </tbody>
</cre8-table>
```

---

## cre8-badge

Small status or count indicator.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'default' \| 'success' \| 'warning' \| 'error' \| 'info' \| 'brand'` | "default" | Color variant |
| `size` | `'sm' \| 'md' \| 'lg'` | "md" | Badge size |
| `pill` | boolean | - | Rounded pill shape |

```html
<cre8-badge variant="success">Active</cre8-badge>
<cre8-badge variant="warning">Pending</cre8-badge>
<cre8-badge variant="error" pill>3</cre8-badge>
<cre8-badge variant="brand">New</cre8-badge>
```

---

## cre8-tag

Removable label or category.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'default' \| 'brand' \| 'success' \| 'warning' \| 'error'` | "default" | Color variant |
| `removable` | boolean | - | Show remove button |

**Events:** `tag-remove`

```html
<cre8-tag>JavaScript</cre8-tag>
<cre8-tag variant="brand" removable>React</cre8-tag>
<cre8-tag variant="success">Completed</cre8-tag>
```

---

## cre8-avatar

User or entity image.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `src` | string | - | Image URL |
| `alt` | string | - | Alt text |
| `initials` | string | - | Fallback initials |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | "md" | Avatar size |
| `variant` | `'circle' \| 'square'` | "circle" | Shape |
| `status` | `'online' \| 'offline' \| 'busy' \| 'away'` | - | Status indicator |

```html
<cre8-avatar 
  src="user.jpg" 
  alt="John Doe"
  size="lg"
  status="online"
></cre8-avatar>

<cre8-avatar initials="JD" size="md"></cre8-avatar>
```

---

## cre8-avatar-group

Stacked avatar collection.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `max` | number | 4 | Max visible avatars |
| `size` | `'sm' \| 'md' \| 'lg'` | "md" | Avatar size |

```html
<cre8-avatar-group max="3">
  <cre8-avatar src="user1.jpg" alt="User 1"></cre8-avatar>
  <cre8-avatar src="user2.jpg" alt="User 2"></cre8-avatar>
  <cre8-avatar src="user3.jpg" alt="User 3"></cre8-avatar>
  <cre8-avatar src="user4.jpg" alt="User 4"></cre8-avatar>
</cre8-avatar-group>
```

---

## cre8-tooltip

Contextual information popup.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `content` | string | - | **Required.** Tooltip text |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | "top" | Popup position |
| `trigger` | `'hover' \| 'click' \| 'focus'` | "hover" | Trigger event |
| `delay` | number | 200 | Show delay (ms) |

```html
<cre8-tooltip content="Click to save your changes" position="bottom">
  <cre8-button text="Save"></cre8-button>
</cre8-tooltip>
```

---

## cre8-description-list

Key-value pair display.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | "vertical" | Layout direction |

**Slots:** `default` — `cre8-description-item` elements

```html
<cre8-description-list orientation="horizontal">
  <cre8-description-item term="Name">John Doe</cre8-description-item>
  <cre8-description-item term="Email">john@example.com</cre8-description-item>
  <cre8-description-item term="Role">Administrator</cre8-description-item>
</cre8-description-list>
```

---

## cre8-description-item

Individual key-value pair.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `term` | string | - | **Required.** Label/key |

---

## cre8-stat

Metric or statistic display.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | string | - | **Required.** Stat label |
| `value` | string | - | **Required.** Stat value |
| `change` | string | - | Change indicator |
| `changeType` | `'positive' \| 'negative' \| 'neutral'` | - | Change direction |
| `icon` | string | - | Leading icon |

```html
<cre8-stat 
  label="Total Revenue"
  value="$124,500"
  change="+12.5%"
  changeType="positive"
></cre8-stat>

<cre8-stat 
  label="Active Users"
  value="8,420"
  change="-3.2%"
  changeType="negative"
></cre8-stat>
```

---

## cre8-timeline

Vertical event timeline.

**Slots:** `default` — `cre8-timeline-item` elements

```html
<cre8-timeline>
  <cre8-timeline-item 
    headline="Order Placed"
    timestamp="Jan 15, 2024"
    completed
  >
    Your order has been confirmed.
  </cre8-timeline-item>
  <cre8-timeline-item 
    headline="Processing"
    timestamp="Jan 16, 2024"
    isActive
  >
    Your order is being prepared.
  </cre8-timeline-item>
  <cre8-timeline-item 
    headline="Shipped"
  >
    Awaiting shipment.
  </cre8-timeline-item>
</cre8-timeline>
```

---

## cre8-timeline-item

Individual timeline entry.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `headline` | string | - | **Required.** Event title |
| `timestamp` | string | - | Event date/time |
| `completed` | boolean | - | Completed state |
| `isActive` | boolean | - | Current event |
| `icon` | string | - | Custom icon |

---

## cre8-list

Styled list container.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'unordered' \| 'ordered' \| 'none'` | "unordered" | List style |
| `spacing` | `'compact' \| 'default' \| 'relaxed'` | "default" | Item spacing |

```html
<cre8-list variant="unordered">
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</cre8-list>
```

---

## cre8-code-block

Syntax-highlighted code display.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `language` | string | - | Code language |
| `showLineNumbers` | boolean | - | Line numbers |
| `copyable` | boolean | - | Copy button |
| `maxHeight` | string | - | Scrollable height |

```html
<cre8-code-block language="javascript" copyable showLineNumbers>
const greeting = "Hello, World!";
console.log(greeting);
</cre8-code-block>
```

---

## cre8-blockquote

Styled quotation block.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `citation` | string | - | Quote source |
| `variant` | `'default' \| 'branded'` | "default" | Visual style |

```html
<cre8-blockquote citation="Albert Einstein">
  Imagination is more important than knowledge.
</cre8-blockquote>
```
