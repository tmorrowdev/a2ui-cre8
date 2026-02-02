/**
 * @a2ui-bridge/react-cre8 - DateTimeInput component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8DatePicker as Cre8DatePickerWC } from '@tmorrow/cre8-wc/cdn';
import { extractString, extractBoolean, createPermissiveComponent } from '../utils.js';

const Cre8DatePickerComponent = createPermissiveComponent('cre8-date-picker', Cre8DatePickerWC, {
  onChange: 'change',
});

export function DateTimeInput({
  node,
  onAction,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const props = properties as any;

  const label = extractString(props.label) ?? '';
  const value = extractString(props.value) ?? '';
  const disabled = extractBoolean(props.disabled) ?? false;
  const placeholder = extractString(props.placeholder) ?? 'Select date';

  const handleChange = (e: Event) => {
    const target = e.target as any;
    if (props.action?.name) {
      onAction({
        actionName: props.action.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: { value: target.value },
      });
    }
  };

  return (
    <Cre8DatePickerComponent
      label={label}
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
}
