# Disclosure Components

7 components for expandable/hideable content.

## Cre8Accordion

Accordion container for collapsible sections.

| Prop | Type | Description |
|------|------|-------------|
| `children` | ReactNode | AccordionItem components |

```jsx
<Cre8Accordion>
  <Cre8AccordionItem label="What is your refund policy?" expanded>
    We offer a 30-day money-back guarantee on all plans.
  </Cre8AccordionItem>
  <Cre8AccordionItem label="How do I cancel?">
    You can cancel anytime from your account settings.
  </Cre8AccordionItem>
  <Cre8AccordionItem label="Do you offer discounts?">
    Yes, we offer annual billing discounts and nonprofit pricing.
  </Cre8AccordionItem>
</Cre8Accordion>
```

---

## Cre8AccordionItem

Individual collapsible item within Accordion.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string | — | **Required.** Item heading |
| `expanded` | boolean | false | Open state |
| `children` | ReactNode | — | Item content |

```jsx
<Cre8AccordionItem label="Getting Started" expanded>
  <Cre8TextPassage>
    <p>Follow these steps to set up your account...</p>
  </Cre8TextPassage>
</Cre8AccordionItem>
```

---

## Cre8Modal

Modal dialog overlay.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | boolean | false | Modal visibility |
| `children` | ReactNode | — | Modal content |

```jsx
<Cre8Modal open={isOpen}>
  <Cre8Heading type="h2">Confirm Delete</Cre8Heading>
  <Cre8TextPassage>
    <p>Are you sure you want to delete this item? This cannot be undone.</p>
  </Cre8TextPassage>
  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
    <Cre8Button text="Cancel" variant="secondary" onClick={handleClose} />
    <Cre8DangerButton text="Delete" onClick={handleDelete} />
  </div>
</Cre8Modal>
```

**AI Rules:**
- Use for focused tasks, confirmations, forms
- Always provide clear close mechanism
- Keep content focused and minimal
- Use `Cre8DangerButton` for destructive confirmations

---

## Cre8Dropdown

Dropdown menu container.

| Prop | Type | Description |
|------|------|-------------|
| `children` | ReactNode | Dropdown trigger and items |

```jsx
<Cre8Dropdown>
  <Cre8Button text="Actions" variant="secondary" />
  <Cre8DropdownItem>Edit</Cre8DropdownItem>
  <Cre8DropdownItem>Duplicate</Cre8DropdownItem>
  <Cre8DropdownItem>Delete</Cre8DropdownItem>
</Cre8Dropdown>
```

---

## Cre8DropdownItem

Item within Dropdown.

| Prop | Type | Description |
|------|------|-------------|
| `children` | ReactNode | Item content |

```jsx
<Cre8DropdownItem onClick={handleEdit}>Edit</Cre8DropdownItem>
```

---

## Cre8Popover

Popover content container.

| Prop | Type | Description |
|------|------|-------------|
| `children` | ReactNode | Popover content |

```jsx
<Cre8Popover>
  <Cre8Card>
    <Cre8Heading type="h4">Quick Info</Cre8Heading>
    <Cre8TextPassage>
      <p>Additional context appears here.</p>
    </Cre8TextPassage>
  </Cre8Card>
</Cre8Popover>
```

---

## Cre8Tooltip

Tooltip for additional context.

| Prop | Type | Description |
|------|------|-------------|
| `content` | string | **Required.** Tooltip text |
| `children` | ReactNode | Element to attach tooltip to |

```jsx
<Cre8Tooltip content="Click to save your changes">
  <Cre8Button text="Save" variant="primary" />
</Cre8Tooltip>

<Cre8Tooltip content="Required field">
  <span>Email *</span>
</Cre8Tooltip>
```

**AI Rules:**
- Keep content brief (one sentence max)
- Use for supplementary information only
- Don't put essential information in tooltips

---

## FAQ Pattern Example

```jsx
<Cre8Section>
  <Cre8LayoutContainer>
    <Cre8Heading type="h2">Frequently Asked Questions</Cre8Heading>
    <Cre8Accordion>
      <Cre8AccordionItem label="How do I get started?">
        <Cre8TextPassage>
          <p>Sign up for a free account and follow our quick start guide.</p>
        </Cre8TextPassage>
      </Cre8AccordionItem>
      <Cre8AccordionItem label="What payment methods do you accept?">
        <Cre8TextPassage>
          <p>We accept all major credit cards, PayPal, and bank transfers.</p>
        </Cre8TextPassage>
      </Cre8AccordionItem>
      <Cre8AccordionItem label="Can I cancel anytime?">
        <Cre8TextPassage>
          <p>Yes, you can cancel your subscription at any time with no penalties.</p>
        </Cre8TextPassage>
      </Cre8AccordionItem>
    </Cre8Accordion>
  </Cre8LayoutContainer>
</Cre8Section>
```

## Confirmation Modal Pattern

```jsx
const [showDeleteModal, setShowDeleteModal] = useState(false);

<Cre8DangerButton text="Delete" onClick={() => setShowDeleteModal(true)} />

<Cre8Modal open={showDeleteModal}>
  <Cre8Heading type="h2">Delete Item?</Cre8Heading>
  <Cre8TextPassage>
    <p>This action cannot be undone. All associated data will be permanently removed.</p>
  </Cre8TextPassage>
  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '24px' }}>
    <Cre8Button text="Cancel" variant="secondary" onClick={() => setShowDeleteModal(false)} />
    <Cre8DangerButton text="Delete" onClick={handleConfirmDelete} />
  </div>
</Cre8Modal>
```
