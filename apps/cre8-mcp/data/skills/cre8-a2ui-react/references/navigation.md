# Navigation Components

16 components for navigation patterns and links.

## Cre8Header

Page header container.

| Prop | Type | Description |
|------|------|-------------|
| `children` | ReactNode | Header content |

```jsx
<Cre8Header>
  <Cre8Logo />
  <Cre8GlobalNav>
    <Cre8GlobalNavItem href="/">Home</Cre8GlobalNavItem>
    <Cre8GlobalNavItem href="/about">About</Cre8GlobalNavItem>
  </Cre8GlobalNav>
</Cre8Header>
```

---

## Cre8Footer

Page footer container.

| Prop | Type | Description |
|------|------|-------------|
| `children` | ReactNode | Footer content |

```jsx
<Cre8Footer>
  <Cre8LayoutContainer>
    <Cre8LinkList>
      <Cre8LinkListItem href="/privacy">Privacy</Cre8LinkListItem>
      <Cre8LinkListItem href="/terms">Terms</Cre8LinkListItem>
    </Cre8LinkList>
    <p>© 2024 Company. All rights reserved.</p>
  </Cre8LayoutContainer>
</Cre8Footer>
```

---

## Cre8GlobalNav

Global navigation bar container.

| Prop | Type | Description |
|------|------|-------------|
| `children` | ReactNode | Nav items |

```jsx
<Cre8GlobalNav>
  <Cre8GlobalNavItem href="/">Home</Cre8GlobalNavItem>
  <Cre8GlobalNavItem href="/products">Products</Cre8GlobalNavItem>
  <Cre8GlobalNavItem href="/contact">Contact</Cre8GlobalNavItem>
</Cre8GlobalNav>
```

---

## Cre8GlobalNavItem

Item within GlobalNav.

| Prop | Type | Description |
|------|------|-------------|
| `href` | string | Link destination |
| `children` | ReactNode | Item content |

```jsx
<Cre8GlobalNavItem href="/dashboard">Dashboard</Cre8GlobalNavItem>
```

---

## Cre8PrimaryNav

Primary navigation container.

| Prop | Type | Description |
|------|------|-------------|
| `children` | ReactNode | Nav items |

```jsx
<Cre8PrimaryNav>
  <Cre8PrimaryNavItem href="/features">Features</Cre8PrimaryNavItem>
  <Cre8PrimaryNavItem href="/pricing">Pricing</Cre8PrimaryNavItem>
  <Cre8PrimaryNavItem href="/docs">Docs</Cre8PrimaryNavItem>
</Cre8PrimaryNav>
```

---

## Cre8PrimaryNavItem

Item within PrimaryNav.

| Prop | Type | Description |
|------|------|-------------|
| `href` | string | Link destination |
| `children` | ReactNode | Item content |

---

## Cre8TertiaryNav

Tertiary navigation container.

| Prop | Type | Description |
|------|------|-------------|
| `children` | ReactNode | Nav items |

```jsx
<Cre8TertiaryNav>
  <Cre8TertiaryNavItem href="/help">Help</Cre8TertiaryNavItem>
  <Cre8TertiaryNavItem href="/login">Login</Cre8TertiaryNavItem>
</Cre8TertiaryNav>
```

---

## Cre8TertiaryNavItem

Item within TertiaryNav.

| Prop | Type | Description |
|------|------|-------------|
| `href` | string | Link destination |
| `children` | ReactNode | Item content |

---

## Cre8Breadcrumbs

Breadcrumb navigation container.

| Prop | Type | Description |
|------|------|-------------|
| `children` | ReactNode | Breadcrumb items |

```jsx
<Cre8Breadcrumbs>
  <Cre8BreadcrumbsItem href="/">Home</Cre8BreadcrumbsItem>
  <Cre8BreadcrumbsItem href="/products">Products</Cre8BreadcrumbsItem>
  <Cre8BreadcrumbsItem>Widget Pro</Cre8BreadcrumbsItem>
</Cre8Breadcrumbs>
```

---

## Cre8BreadcrumbsItem

Item within Breadcrumbs.

| Prop | Type | Description |
|------|------|-------------|
| `href` | string | Link destination (omit for current page) |
| `children` | ReactNode | Item content |

---

## Cre8Tabs

Tab navigation container.

| Prop | Type | Description |
|------|------|-------------|
| `children` | ReactNode | Tab and TabPanel components |

```jsx
<Cre8Tabs>
  <Cre8Tab label="Overview" selected />
  <Cre8Tab label="Features" />
  <Cre8Tab label="Pricing" />
  <Cre8TabPanel>Overview content here</Cre8TabPanel>
  <Cre8TabPanel>Features content here</Cre8TabPanel>
  <Cre8TabPanel>Pricing content here</Cre8TabPanel>
</Cre8Tabs>
```

---

## Cre8Tab

Individual tab within Tabs.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string | — | Tab label |
| `selected` | boolean | false | Active tab |

---

## Cre8TabPanel

Content panel for a Tab.

| Prop | Type | Description |
|------|------|-------------|
| `children` | ReactNode | Panel content |

---

## Cre8Pagination

Pagination controls for lists.

| Prop | Type | Description |
|------|------|-------------|
| `currentPage` | number | Current page number |
| `totalPages` | number | Total number of pages |

```jsx
<Cre8Pagination currentPage={3} totalPages={10} />
```

---

## Cre8Link

Navigation link component.

| Prop | Type | Description |
|------|------|-------------|
| `href` | string | **Required.** Link destination |
| `children` | ReactNode | Link content |

```jsx
<Cre8Link href="/about">About Us</Cre8Link>
```

---

## Cre8TextLink

Styled text link (inline within text).

| Prop | Type | Description |
|------|------|-------------|
| `href` | string | **Required.** Link destination |
| `target` | `"_blank" \| "_self"` | Link target |
| `children` | ReactNode | Link content |

```jsx
<Cre8TextPassage>
  <p>
    Read our <Cre8TextLink href="/docs">documentation</Cre8TextLink> 
    to get started.
  </p>
</Cre8TextPassage>
```

---

## Header Pattern Example

```jsx
<Cre8Header>
  <Cre8LayoutContainer>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Cre8Logo />
      
      <Cre8GlobalNav>
        <Cre8GlobalNavItem href="/">Home</Cre8GlobalNavItem>
        <Cre8GlobalNavItem href="/features">Features</Cre8GlobalNavItem>
        <Cre8GlobalNavItem href="/pricing">Pricing</Cre8GlobalNavItem>
        <Cre8GlobalNavItem href="/docs">Docs</Cre8GlobalNavItem>
      </Cre8GlobalNav>
      
      <div>
        <Cre8Button text="Log In" variant="tertiary" />
        <Cre8Button text="Sign Up" variant="primary" />
      </div>
    </div>
  </Cre8LayoutContainer>
</Cre8Header>
```
