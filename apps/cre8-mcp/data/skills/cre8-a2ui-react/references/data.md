# Data Components

14 components for data display and visualization.

## Cre8Table

Data table container.

| Prop | Type | Description |
|------|------|-------------|
| `children` | ReactNode | Table sections |

```jsx
<Cre8Table>
  <Cre8TableHeader>
    <Cre8TableRow>
      <Cre8TableHeaderCell>Name</Cre8TableHeaderCell>
      <Cre8TableHeaderCell>Email</Cre8TableHeaderCell>
      <Cre8TableHeaderCell>Status</Cre8TableHeaderCell>
    </Cre8TableRow>
  </Cre8TableHeader>
  <Cre8TableBody>
    <Cre8TableRow>
      <Cre8TableCell>John Doe</Cre8TableCell>
      <Cre8TableCell>john@example.com</Cre8TableCell>
      <Cre8TableCell><Cre8Badge text="Active" variant="success" /></Cre8TableCell>
    </Cre8TableRow>
  </Cre8TableBody>
</Cre8Table>
```

---

## Cre8TableHeader

Table header section.

| Prop | Type | Description |
|------|------|-------------|
| `children` | ReactNode | Header row(s) |

---

## Cre8TableHeaderCell

Header cell in table.

| Prop | Type | Description |
|------|------|-------------|
| `children` | ReactNode | Cell content |

---

## Cre8TableBody

Table body section.

| Prop | Type | Description |
|------|------|-------------|
| `children` | ReactNode | Body rows |

---

## Cre8TableRow

Table row.

| Prop | Type | Description |
|------|------|-------------|
| `children` | ReactNode | Row cells |

---

## Cre8TableCell

Table cell.

| Prop | Type | Description |
|------|------|-------------|
| `children` | ReactNode | Cell content |

---

## Cre8List

List container.

| Prop | Type | Description |
|------|------|-------------|
| `children` | ReactNode | List items |

```jsx
<Cre8List>
  <Cre8ListItem>First item</Cre8ListItem>
  <Cre8ListItem>Second item</Cre8ListItem>
  <Cre8ListItem>Third item</Cre8ListItem>
</Cre8List>
```

---

## Cre8ListItem

Item within List.

| Prop | Type | Description |
|------|------|-------------|
| `children` | ReactNode | Item content |

---

## Cre8LinkList

List of links.

| Prop | Type | Description |
|------|------|-------------|
| `children` | ReactNode | Link list items |

```jsx
<Cre8LinkList>
  <Cre8LinkListItem href="/privacy">Privacy Policy</Cre8LinkListItem>
  <Cre8LinkListItem href="/terms">Terms of Service</Cre8LinkListItem>
  <Cre8LinkListItem href="/contact">Contact Us</Cre8LinkListItem>
</Cre8LinkList>
```

---

## Cre8LinkListItem

Link item within LinkList.

| Prop | Type | Description |
|------|------|-------------|
| `href` | string | Link destination |
| `children` | ReactNode | Link text |

---

## Cre8Tag

Tag/chip for categorization.

| Prop | Type | Description |
|------|------|-------------|
| `text` | string | Tag text |

```jsx
<Cre8Tag text="JavaScript" />
<Cre8Tag text="React" />
<Cre8Tag text="TypeScript" />
```

---

## Cre8TagList

Container for tags.

| Prop | Type | Description |
|------|------|-------------|
| `children` | ReactNode | Tag components |

```jsx
<Cre8TagList>
  <Cre8Tag text="JavaScript" />
  <Cre8Tag text="React" />
  <Cre8Tag text="Node.js" />
</Cre8TagList>
```

---

## Cre8RemoveTag

Removable tag with close button.

| Prop | Type | Description |
|------|------|-------------|
| `text` | string | Tag text |

```jsx
<Cre8RemoveTag text="Selected Item" onRemove={handleRemove} />
```

---

## Cre8Chart

Chart visualization component.

| Prop | Type | Description |
|------|------|-------------|
| — | — | Chart-specific props |

```jsx
<Cre8Chart />
```

---

## Complete Table Pattern

```jsx
<Cre8Card>
  <Cre8Heading type="h3">Users</Cre8Heading>
  <Cre8Table>
    <Cre8TableHeader>
      <Cre8TableRow>
        <Cre8TableHeaderCell>Name</Cre8TableHeaderCell>
        <Cre8TableHeaderCell>Email</Cre8TableHeaderCell>
        <Cre8TableHeaderCell>Role</Cre8TableHeaderCell>
        <Cre8TableHeaderCell>Status</Cre8TableHeaderCell>
        <Cre8TableHeaderCell>Actions</Cre8TableHeaderCell>
      </Cre8TableRow>
    </Cre8TableHeader>
    <Cre8TableBody>
      <Cre8TableRow>
        <Cre8TableCell>John Doe</Cre8TableCell>
        <Cre8TableCell>john@example.com</Cre8TableCell>
        <Cre8TableCell>Admin</Cre8TableCell>
        <Cre8TableCell><Cre8Badge text="Active" variant="success" /></Cre8TableCell>
        <Cre8TableCell>
          <Cre8Dropdown>
            <Cre8Button text="Actions" variant="tertiary" size="sm" />
            <Cre8DropdownItem>Edit</Cre8DropdownItem>
            <Cre8DropdownItem>Delete</Cre8DropdownItem>
          </Cre8Dropdown>
        </Cre8TableCell>
      </Cre8TableRow>
      <Cre8TableRow>
        <Cre8TableCell>Jane Smith</Cre8TableCell>
        <Cre8TableCell>jane@example.com</Cre8TableCell>
        <Cre8TableCell>Editor</Cre8TableCell>
        <Cre8TableCell><Cre8Badge text="Pending" variant="warning" /></Cre8TableCell>
        <Cre8TableCell>
          <Cre8Dropdown>
            <Cre8Button text="Actions" variant="tertiary" size="sm" />
            <Cre8DropdownItem>Edit</Cre8DropdownItem>
            <Cre8DropdownItem>Delete</Cre8DropdownItem>
          </Cre8Dropdown>
        </Cre8TableCell>
      </Cre8TableRow>
    </Cre8TableBody>
  </Cre8Table>
  <Cre8Pagination currentPage={1} totalPages={5} />
</Cre8Card>
```

## Tag Filter Pattern

```jsx
const [selectedTags, setSelectedTags] = useState(['react', 'typescript']);

<Cre8Card>
  <Cre8Heading type="h4">Filter by Technology</Cre8Heading>
  
  <Cre8TagList>
    {selectedTags.map(tag => (
      <Cre8RemoveTag 
        key={tag} 
        text={tag} 
        onRemove={() => removeTag(tag)} 
      />
    ))}
  </Cre8TagList>
  
  <Cre8Divider />
  
  <Cre8TagList>
    <Cre8Tag text="JavaScript" onClick={() => addTag('javascript')} />
    <Cre8Tag text="Python" onClick={() => addTag('python')} />
    <Cre8Tag text="Go" onClick={() => addTag('go')} />
  </Cre8TagList>
</Cre8Card>
```

## Footer Links Pattern

```jsx
<Cre8Footer>
  <Cre8LayoutContainer>
    <Cre8Grid>
      <Cre8GridItem>
        <Cre8Heading type="h4">Product</Cre8Heading>
        <Cre8LinkList>
          <Cre8LinkListItem href="/features">Features</Cre8LinkListItem>
          <Cre8LinkListItem href="/pricing">Pricing</Cre8LinkListItem>
          <Cre8LinkListItem href="/docs">Documentation</Cre8LinkListItem>
        </Cre8LinkList>
      </Cre8GridItem>
      <Cre8GridItem>
        <Cre8Heading type="h4">Company</Cre8Heading>
        <Cre8LinkList>
          <Cre8LinkListItem href="/about">About</Cre8LinkListItem>
          <Cre8LinkListItem href="/careers">Careers</Cre8LinkListItem>
          <Cre8LinkListItem href="/contact">Contact</Cre8LinkListItem>
        </Cre8LinkList>
      </Cre8GridItem>
      <Cre8GridItem>
        <Cre8Heading type="h4">Legal</Cre8Heading>
        <Cre8LinkList>
          <Cre8LinkListItem href="/privacy">Privacy</Cre8LinkListItem>
          <Cre8LinkListItem href="/terms">Terms</Cre8LinkListItem>
        </Cre8LinkList>
      </Cre8GridItem>
    </Cre8Grid>
  </Cre8LayoutContainer>
</Cre8Footer>
```
