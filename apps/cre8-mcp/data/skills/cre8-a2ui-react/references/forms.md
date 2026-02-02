# Forms Components

10 components for user input and form controls.

## Cre8Field

Text input field with label and validation support.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string | — | **Required.** Field label |
| `value` | string | — | Input value |
| `type` | `"text" \| "email" \| "password" \| "tel" \| "url" \| "number"` | "text" | Input type |
| `placeholder` | string | — | Placeholder text |
| `disabled` | boolean | false | Disabled state |
| `required` | boolean | false | Required field |
| `errorNote` | string | — | Error message to display |

```jsx
// Basic text input
<Cre8Field label="Name" placeholder="Enter your name" />

// Email input
<Cre8Field label="Email" type="email" placeholder="Enter email" required />

// Password input
<Cre8Field label="Password" type="password" required />

// With error
<Cre8Field 
  label="Username" 
  value={username}
  errorNote="Username already taken" 
/>

// Phone input
<Cre8Field label="Phone" type="tel" placeholder="(555) 123-4567" />
```

**AI Rules:**
- Always provide `label`
- Use appropriate `type` for better mobile keyboards and validation
- Show `errorNote` when validation fails

---

## Cre8Select

Dropdown select input for choosing from options.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string | — | Field label |
| `value` | string | — | Selected value |
| `disabled` | boolean | false | Disabled state |
| `required` | boolean | false | Required field |

```jsx
<Cre8Select label="Country">
  <option value="">Select a country</option>
  <option value="us">United States</option>
  <option value="uk">United Kingdom</option>
  <option value="ca">Canada</option>
</Cre8Select>
```

---

## Cre8MultiSelect

Multi-select dropdown for choosing multiple options.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string | — | Field label |
| `disabled` | boolean | false | Disabled state |

```jsx
<Cre8MultiSelect label="Skills">
  <option value="js">JavaScript</option>
  <option value="py">Python</option>
  <option value="go">Go</option>
</Cre8MultiSelect>
```

---

## Cre8CheckboxField

Container for checkbox items.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string | — | Group label |
| `disabled` | boolean | false | Disabled state |

```jsx
<Cre8CheckboxField label="Interests">
  <Cre8CheckboxFieldItem label="Technology" value="tech" />
  <Cre8CheckboxFieldItem label="Sports" value="sports" />
  <Cre8CheckboxFieldItem label="Music" value="music" checked />
</Cre8CheckboxField>
```

---

## Cre8CheckboxFieldItem

Individual checkbox item within a CheckboxField.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string | — | **Required.** Checkbox label |
| `checked` | boolean | false | Checked state |
| `disabled` | boolean | false | Disabled state |
| `value` | string | — | Form value |

```jsx
<Cre8CheckboxFieldItem 
  label="I agree to the terms and conditions" 
  checked={agreed}
  onChange={handleChange}
/>
```

---

## Cre8RadioField

Container for radio button items.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string | — | Group label |
| `name` | string | — | **Required.** Radio group name |

```jsx
<Cre8RadioField label="Payment Method" name="payment">
  <Cre8RadioFieldItem label="Credit Card" value="card" checked />
  <Cre8RadioFieldItem label="PayPal" value="paypal" />
  <Cre8RadioFieldItem label="Bank Transfer" value="bank" />
</Cre8RadioField>
```

---

## Cre8RadioFieldItem

Individual radio button within a RadioField.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string | — | **Required.** Radio label |
| `value` | string | — | **Required.** Form value |
| `checked` | boolean | false | Checked state |

```jsx
<Cre8RadioFieldItem label="Monthly" value="monthly" />
<Cre8RadioFieldItem label="Annual" value="annual" checked />
```

---

## Cre8DatePicker

Date picker input component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string | — | Field label |
| `value` | string | — | Selected date |
| `disabled` | boolean | false | Disabled state |

```jsx
<Cre8DatePicker 
  label="Start Date" 
  value={startDate}
  onChange={handleDateChange}
/>
```

---

## Form Pattern Example

```jsx
<Cre8Card>
  <Cre8Heading type="h2">Contact Us</Cre8Heading>
  
  <Cre8Field label="Name" required />
  <Cre8Field label="Email" type="email" required />
  <Cre8Field label="Phone" type="tel" />
  
  <Cre8Select label="Subject" required>
    <option value="">Select a subject</option>
    <option value="support">Support</option>
    <option value="sales">Sales</option>
    <option value="other">Other</option>
  </Cre8Select>
  
  <Cre8CheckboxFieldItem 
    label="Subscribe to newsletter" 
    value="subscribe"
  />
  
  <Cre8Button text="Submit" variant="primary" type="submit" />
</Cre8Card>
```
