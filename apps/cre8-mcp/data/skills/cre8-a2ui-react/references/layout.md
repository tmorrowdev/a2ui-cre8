# Layout Components

10 components for page structure and content containers.

## Cre8Layout

Page layout wrapper. Top-level container for pages.

| Prop | Type | Description |
|------|------|-------------|
| `children` | ReactNode | Layout content |

```jsx
<Cre8Layout>
  <Cre8Header>...</Cre8Header>
  <main>...</main>
  <Cre8Footer />
</Cre8Layout>
```

**AI Rules:** Always use as root wrapper for full pages.

---

## Cre8LayoutSection

Section within a Layout.

| Prop | Type | Description |
|------|------|-------------|
| `children` | ReactNode | Section content |

```jsx
<Cre8Layout>
  <Cre8LayoutSection>
    <Cre8LayoutContainer>
      {/* Content */}
    </Cre8LayoutContainer>
  </Cre8LayoutSection>
</Cre8Layout>
```

---

## Cre8LayoutContainer

Content container with max-width constraints.

| Prop | Type | Description |
|------|------|-------------|
| `children` | ReactNode | Container content |

```jsx
<Cre8LayoutContainer>
  <Cre8Heading type="h1">Page Title</Cre8Heading>
  <Cre8TextPassage>
    <p>Content constrained to max-width for readability.</p>
  </Cre8TextPassage>
</Cre8LayoutContainer>
```

**AI Rules:** Use to constrain content width within sections/bands.

---

## Cre8Section

Generic section container.

| Prop | Type | Description |
|------|------|-------------|
| `children` | ReactNode | Section content |

```jsx
<Cre8Section>
  <Cre8LayoutContainer>
    <Cre8Heading type="h2">Features</Cre8Heading>
    <Cre8Grid>
      <Cre8GridItem><Cre8Card>...</Cre8Card></Cre8GridItem>
      <Cre8GridItem><Cre8Card>...</Cre8Card></Cre8GridItem>
    </Cre8Grid>
  </Cre8LayoutContainer>
</Cre8Section>
```

---

## Cre8Hero

Hero section for landing pages.

| Prop | Type | Description |
|------|------|-------------|
| `children` | ReactNode | Hero content |

```jsx
<Cre8Hero>
  <Cre8LayoutContainer>
    <Cre8Heading type="h1">Welcome to Our Platform</Cre8Heading>
    <Cre8TextPassage>
      <p>Build amazing things with our tools.</p>
    </Cre8TextPassage>
    <Cre8Button text="Get Started" variant="primary" />
  </Cre8LayoutContainer>
</Cre8Hero>
```

**AI Rules:** Use for prominent page introductions, typically at top of landing pages.

---

## Cre8Band

Full-width content band/section.

| Prop | Type | Description |
|------|------|-------------|
| `children` | ReactNode | Band content |

```jsx
<Cre8Band>
  <Cre8LayoutContainer>
    <Cre8Heading type="h2">Our Partners</Cre8Heading>
    {/* Partner logos */}
  </Cre8LayoutContainer>
</Cre8Band>
```

**AI Rules:** Use for full-width background sections, visual breaks between content.

---

## Cre8Card

Container card for grouping related content.

| Prop | Type | Description |
|------|------|-------------|
| `children` | ReactNode | Card content |

```jsx
<Cre8Card>
  <Cre8Heading type="h3">Card Title</Cre8Heading>
  <Cre8TextPassage>
    <p>Card description or content goes here.</p>
  </Cre8TextPassage>
  <Cre8Button text="Learn More" variant="tertiary" />
</Cre8Card>
```

**AI Rules:** Use to group related content, create visual hierarchy.

---

## Cre8Grid

CSS Grid layout container.

| Prop | Type | Description |
|------|------|-------------|
| `children` | ReactNode | Grid items |

```jsx
<Cre8Grid>
  <Cre8GridItem><Cre8Card>Item 1</Cre8Card></Cre8GridItem>
  <Cre8GridItem><Cre8Card>Item 2</Cre8Card></Cre8GridItem>
  <Cre8GridItem><Cre8Card>Item 3</Cre8Card></Cre8GridItem>
</Cre8Grid>
```

---

## Cre8GridItem

Item within a Grid container.

| Prop | Type | Description |
|------|------|-------------|
| `children` | ReactNode | Grid item content |

```jsx
<Cre8Grid>
  <Cre8GridItem>
    <Cre8Card>
      <Cre8Heading type="h3">Feature 1</Cre8Heading>
      <Cre8TextPassage><p>Description</p></Cre8TextPassage>
    </Cre8Card>
  </Cre8GridItem>
</Cre8Grid>
```

---

## Cre8Divider

Visual separator between content sections.

| Prop | Type | Description |
|------|------|-------------|
| — | — | No props |

```jsx
<Cre8TextPassage>
  <p>First section content</p>
</Cre8TextPassage>
<Cre8Divider />
<Cre8TextPassage>
  <p>Second section content</p>
</Cre8TextPassage>
```

---

## Landing Page Example

```jsx
<Cre8Layout>
  <Cre8Header>
    <Cre8GlobalNav>
      <Cre8GlobalNavItem href="/">Home</Cre8GlobalNavItem>
      <Cre8GlobalNavItem href="/features">Features</Cre8GlobalNavItem>
      <Cre8GlobalNavItem href="/pricing">Pricing</Cre8GlobalNavItem>
    </Cre8GlobalNav>
  </Cre8Header>
  
  <main>
    <Cre8Hero>
      <Cre8LayoutContainer>
        <Cre8Heading type="h1">Build Better Products</Cre8Heading>
        <Cre8TextPassage>
          <p>The platform for modern teams.</p>
        </Cre8TextPassage>
        <Cre8Button text="Start Free Trial" variant="primary" />
      </Cre8LayoutContainer>
    </Cre8Hero>
    
    <Cre8Section>
      <Cre8LayoutContainer>
        <Cre8Heading type="h2">Features</Cre8Heading>
        <Cre8Grid>
          <Cre8GridItem>
            <Cre8Card>
              <Cre8Heading type="h3">Fast</Cre8Heading>
              <Cre8TextPassage><p>Lightning quick performance.</p></Cre8TextPassage>
            </Cre8Card>
          </Cre8GridItem>
          <Cre8GridItem>
            <Cre8Card>
              <Cre8Heading type="h3">Secure</Cre8Heading>
              <Cre8TextPassage><p>Enterprise-grade security.</p></Cre8TextPassage>
            </Cre8Card>
          </Cre8GridItem>
          <Cre8GridItem>
            <Cre8Card>
              <Cre8Heading type="h3">Scalable</Cre8Heading>
              <Cre8TextPassage><p>Grows with your team.</p></Cre8TextPassage>
            </Cre8Card>
          </Cre8GridItem>
        </Cre8Grid>
      </Cre8LayoutContainer>
    </Cre8Section>
  </main>
  
  <Cre8Footer />
</Cre8Layout>
```
