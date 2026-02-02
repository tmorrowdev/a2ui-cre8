# Feedback Components

7 components for user feedback and status indicators.

## Cre8Alert

Alert message for important notifications.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `status` | `"info" \| "success" \| "warning" \| "error"` | "info" | Alert type |
| `children` | ReactNode | — | Alert content |

```jsx
<Cre8Alert status="success">
  Your changes have been saved successfully.
</Cre8Alert>

<Cre8Alert status="error">
  Something went wrong. Please try again.
</Cre8Alert>

<Cre8Alert status="warning">
  Your session will expire in 5 minutes.
</Cre8Alert>

<Cre8Alert status="info">
  New features are available. Check the changelog for details.
</Cre8Alert>
```

**AI Rules:**
- `error` — Failures, problems, blocking issues
- `warning` — Caution, attention needed, non-blocking
- `success` — Confirmations, completion
- `info` — Neutral information, tips

---

## Cre8InlineAlert

Inline alert for contextual messages.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `status` | `"info" \| "success" \| "warning" \| "error"` | "info" | Alert type |
| `children` | ReactNode | — | Alert content |

```jsx
<Cre8Field label="Email" type="email" />
<Cre8InlineAlert status="error">
  Please enter a valid email address.
</Cre8InlineAlert>
```

**AI Rules:** Use for field-level or contextual feedback within content.

---

## Cre8Badge

Badge for status indicators or counts.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | string | — | Badge text |
| `variant` | `"default" \| "success" \| "warning" \| "error"` | "default" | Badge style |

```jsx
<Cre8Badge text="Active" variant="success" />
<Cre8Badge text="Pending" variant="warning" />
<Cre8Badge text="Failed" variant="error" />
<Cre8Badge text="Draft" />

// Count badge
<Cre8Badge text="3" variant="error" />
```

---

## Cre8LoadingSpinner

Loading spinner indicator.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "md" \| "lg"` | "md" | Spinner size |

```jsx
// Inline loading
<Cre8LoadingSpinner size="sm" />

// Page loading
<div style={{ display: 'flex', justifyContent: 'center', padding: '48px' }}>
  <Cre8LoadingSpinner size="lg" />
</div>
```

---

## Cre8SkeletonLoader

Skeleton loading placeholder.

| Prop | Type | Description |
|------|------|-------------|
| — | — | No props |

```jsx
// Loading state for cards
<Cre8Grid>
  <Cre8GridItem><Cre8SkeletonLoader /></Cre8GridItem>
  <Cre8GridItem><Cre8SkeletonLoader /></Cre8GridItem>
  <Cre8GridItem><Cre8SkeletonLoader /></Cre8GridItem>
</Cre8Grid>
```

---

## Cre8ProgressMeter

Progress bar for completion status.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | number | — | Progress value 0-100 |
| `max` | number | 100 | Maximum value |

```jsx
<Cre8ProgressMeter value={65} />

<Cre8ProgressMeter value={3} max={5} />
```

---

## Cre8PercentBar

Percentage bar visualization.

| Prop | Type | Description |
|------|------|-------------|
| `value` | number | Percentage value 0-100 |

```jsx
<Cre8PercentBar value={75} />
```

---

## Loading State Pattern

```jsx
const [loading, setLoading] = useState(true);
const [data, setData] = useState(null);

if (loading) {
  return (
    <Cre8LayoutContainer>
      <Cre8Grid>
        <Cre8GridItem><Cre8SkeletonLoader /></Cre8GridItem>
        <Cre8GridItem><Cre8SkeletonLoader /></Cre8GridItem>
        <Cre8GridItem><Cre8SkeletonLoader /></Cre8GridItem>
      </Cre8Grid>
    </Cre8LayoutContainer>
  );
}

return (
  <Cre8LayoutContainer>
    <Cre8Grid>
      {data.map(item => (
        <Cre8GridItem key={item.id}>
          <Cre8Card>...</Cre8Card>
        </Cre8GridItem>
      ))}
    </Cre8Grid>
  </Cre8LayoutContainer>
);
```

## Form Submission Feedback Pattern

```jsx
const [status, setStatus] = useState(null);

<form onSubmit={handleSubmit}>
  {status === 'success' && (
    <Cre8Alert status="success">
      Your message has been sent successfully!
    </Cre8Alert>
  )}
  
  {status === 'error' && (
    <Cre8Alert status="error">
      Something went wrong. Please try again.
    </Cre8Alert>
  )}
  
  <Cre8Field label="Email" type="email" required />
  <Cre8Field label="Message" required />
  
  <Cre8Button 
    text={loading ? "Sending..." : "Send"} 
    variant="primary" 
    type="submit"
    loading={loading}
    disabled={loading}
  />
</form>
```

## Status Badge Table Pattern

```jsx
<Cre8Table>
  <Cre8TableHeader>
    <Cre8TableRow>
      <Cre8TableHeaderCell>Name</Cre8TableHeaderCell>
      <Cre8TableHeaderCell>Status</Cre8TableHeaderCell>
      <Cre8TableHeaderCell>Progress</Cre8TableHeaderCell>
    </Cre8TableRow>
  </Cre8TableHeader>
  <Cre8TableBody>
    <Cre8TableRow>
      <Cre8TableCell>Project Alpha</Cre8TableCell>
      <Cre8TableCell><Cre8Badge text="Active" variant="success" /></Cre8TableCell>
      <Cre8TableCell><Cre8ProgressMeter value={75} /></Cre8TableCell>
    </Cre8TableRow>
    <Cre8TableRow>
      <Cre8TableCell>Project Beta</Cre8TableCell>
      <Cre8TableCell><Cre8Badge text="Pending" variant="warning" /></Cre8TableCell>
      <Cre8TableCell><Cre8ProgressMeter value={30} /></Cre8TableCell>
    </Cre8TableRow>
  </Cre8TableBody>
</Cre8Table>
```
