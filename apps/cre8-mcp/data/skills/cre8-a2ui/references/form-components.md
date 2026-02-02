# Form Components

15 components for user input and form controls. All extend `Cre8FormElement`.

## cre8-button

Primary interactive element for actions.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `text` | string | - | **Required.** Button label |
| `variant` | `'primary' \| 'secondary' \| 'tertiary'` | - | Visual style |
| `size` | `'sm' \| 'lg'` | - | Size variant |
| `type` | `'button' \| 'submit' \| 'reset'` | "button" | Button type |
| `disabled` | boolean | false | Disabled state |
| `href` | string | - | Makes button a link |
| `target` | `'_blank' \| '_self'` | - | Link target |
| `svg` | string | - | SVG icon as raw string |
| `iconPosition` | `'before' \| 'after'` | - | Icon placement |
| `hideText` | boolean | - | Hide text visually |
| `fullWidth` | boolean | - | 100% width |
| `loading` | boolean | - | Loading state |

**Slots:** `before`, `after`

```html
<cre8-button text="Submit" variant="primary"></cre8-button>
<cre8-button text="Cancel" variant="secondary"></cre8-button>
<cre8-button text="Learn More" href="/about" target="_blank"></cre8-button>
<cre8-button text="Saving..." loading></cre8-button>
```

**AI Rules:**
- One `variant="primary"` per screen
- Pair like sizes in groups
- Use `href` prop for links (not anchor wrapper)

---

## cre8-danger-button

Destructive action button. Same props as `cre8-button` with danger styling.

**AI Rules:** Reserve for delete/remove/destructive actions only. Confirm with modal.

---

## cre8-button-group

Container for grouping related buttons.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `orientation` | `'responsive-full-width'` | - | Layout behavior |

```html
<cre8-button-group>
  <cre8-button text="Cancel" variant="secondary"></cre8-button>
  <cre8-button text="Save" variant="primary"></cre8-button>
</cre8-button-group>
```

---

## cre8-field

Standard form input with label and validation.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | `'text' \| 'email' \| 'number' \| 'url' \| 'tel' \| 'password' \| 'date'` | "text" | Input type |
| `label` | string | "Label" | **Required.** Field label |
| `name` | string | - | Form field name |
| `fieldId` | string | - | Unique ID |
| `placeholder` | string | - | Placeholder text |
| `fieldNote` | string | - | Helper text |
| `required` | boolean | - | Required field |
| `disabled` | boolean | - | Disabled state |
| `readonly` | boolean | - | Read-only state |
| `isError` | boolean | - | Error state |
| `errorNote` | string | - | Error message |
| `isSuccess` | boolean | - | Success state |
| `successNote` | string | - | Success message |
| `autocomplete` | string | - | Autocomplete hint |
| `pattern` | string | - | Validation pattern |
| `maxlength` | number | - | Max characters |
| `min` | string | - | Min value |
| `max` | string | - | Max value |

**Slots:** `fieldNote`

```html
<cre8-field 
  type="email"
  label="Email Address"
  name="email"
  required
  fieldNote="We'll never share your email"
></cre8-field>

<cre8-field 
  type="text"
  label="Username"
  isError
  errorNote="Username already taken"
></cre8-field>
```

**AI Rules:**
- Always provide `label`
- Use appropriate `type` for input
- Use `autocomplete` for better UX
- Show `errorNote` when `isError` is true

---

## cre8-text-area

Multi-line text input.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | string | - | **Required.** Field label |
| `name` | string | - | Form field name |
| `rows` | number | 3 | Visible rows |
| `maxlength` | number | - | Max characters |
| `required` | boolean | - | Required field |
| `disabled` | boolean | - | Disabled state |
| `fieldNote` | string | - | Helper text |
| `isError` | boolean | - | Error state |
| `errorNote` | string | - | Error message |

```html
<cre8-text-area 
  label="Message"
  name="message"
  rows="5"
  required
></cre8-text-area>
```

---

## cre8-select

Dropdown selection input.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | string | - | **Required.** Field label |
| `name` | string | - | Form field name |
| `required` | boolean | - | Required field |
| `disabled` | boolean | - | Disabled state |
| `fieldNote` | string | - | Helper text |
| `isError` | boolean | - | Error state |
| `errorNote` | string | - | Error message |

**Slots:** `default` — `<option>` elements

```html
<cre8-select label="Country" name="country" required>
  <option value="">Select a country</option>
  <option value="us">United States</option>
  <option value="uk">United Kingdom</option>
  <option value="ca">Canada</option>
</cre8-select>
```

---

## cre8-checkbox

Boolean toggle input.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | string | - | **Required.** Checkbox label |
| `name` | string | - | Form field name |
| `value` | string | - | Form value |
| `checked` | boolean | - | Checked state |
| `disabled` | boolean | - | Disabled state |
| `indeterminate` | boolean | - | Indeterminate state |

```html
<cre8-checkbox 
  label="I agree to the terms and conditions"
  name="terms"
  required
></cre8-checkbox>
```

---

## cre8-checkbox-group

Container for multiple checkboxes.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `legend` | string | - | **Required.** Group label |
| `orientation` | `'horizontal' \| 'vertical'` | "vertical" | Layout |

```html
<cre8-checkbox-group legend="Interests">
  <cre8-checkbox label="Technology" name="interests" value="tech"></cre8-checkbox>
  <cre8-checkbox label="Sports" name="interests" value="sports"></cre8-checkbox>
  <cre8-checkbox label="Music" name="interests" value="music"></cre8-checkbox>
</cre8-checkbox-group>
```

---

## cre8-radio-button

Single selection from group.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | string | - | **Required.** Radio label |
| `name` | string | - | **Required.** Group name |
| `value` | string | - | Form value |
| `checked` | boolean | - | Checked state |
| `disabled` | boolean | - | Disabled state |

---

## cre8-radio-button-group

Container for radio buttons.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `legend` | string | - | **Required.** Group label |
| `orientation` | `'horizontal' \| 'vertical'` | "vertical" | Layout |

```html
<cre8-radio-button-group legend="Payment Method">
  <cre8-radio-button label="Credit Card" name="payment" value="card"></cre8-radio-button>
  <cre8-radio-button label="PayPal" name="payment" value="paypal"></cre8-radio-button>
  <cre8-radio-button label="Bank Transfer" name="payment" value="bank"></cre8-radio-button>
</cre8-radio-button-group>
```

---

## cre8-toggle

On/off switch control.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | string | - | **Required.** Toggle label |
| `name` | string | - | Form field name |
| `checked` | boolean | - | On state |
| `disabled` | boolean | - | Disabled state |
| `labelPosition` | `'before' \| 'after'` | "after" | Label position |

```html
<cre8-toggle 
  label="Enable notifications"
  name="notifications"
  checked
></cre8-toggle>
```

---

## cre8-date-picker

Date selection input.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | string | - | **Required.** Field label |
| `name` | string | - | Form field name |
| `value` | string | - | ISO date string |
| `min` | string | - | Minimum date |
| `max` | string | - | Maximum date |
| `required` | boolean | - | Required field |
| `disabled` | boolean | - | Disabled state |

```html
<cre8-date-picker 
  label="Start Date"
  name="startDate"
  min="2024-01-01"
  required
></cre8-date-picker>
```

---

## cre8-file-upload

File input with drag-and-drop.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | string | - | **Required.** Field label |
| `name` | string | - | Form field name |
| `accept` | string | - | Accepted file types |
| `multiple` | boolean | - | Allow multiple files |
| `maxSize` | number | - | Max file size (bytes) |
| `required` | boolean | - | Required field |
| `disabled` | boolean | - | Disabled state |

```html
<cre8-file-upload 
  label="Upload Resume"
  name="resume"
  accept=".pdf,.doc,.docx"
  maxSize="5242880"
></cre8-file-upload>
```

---

## cre8-range-slider

Numeric range input.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | string | - | **Required.** Field label |
| `name` | string | - | Form field name |
| `value` | number | - | Current value |
| `min` | number | 0 | Minimum value |
| `max` | number | 100 | Maximum value |
| `step` | number | 1 | Step increment |
| `disabled` | boolean | - | Disabled state |

```html
<cre8-range-slider 
  label="Volume"
  name="volume"
  value="50"
  min="0"
  max="100"
></cre8-range-slider>
```
