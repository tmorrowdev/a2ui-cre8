/**
 * @a2ui-bridge/react-cre8 - NumberInput component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8Field as Cre8FieldWC } from '@tmorrow/cre8-wc/cdn';
import { extractString, extractBoolean, extractNumber, createPermissiveComponent } from '../utils.js';

const Cre8FieldComponent = createPermissiveComponent('cre8-field', Cre8FieldWC, {
  onInput: 'input',
});

export function NumberInput({
  node,
  onAction,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const props = properties as any;

  const value = extractNumber(props.value);
  const min = extractNumber(props.min);
  const max = extractNumber(props.max);
  const disabled = extractBoolean(props.disabled) ?? false;
  const label = extractString(props.label) ?? '';
  const placeholder = extractString(props.placeholder) ?? '';

  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (props.action?.name) {
      onAction({
        actionName: props.action.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: { value: parseFloat(target.value) },
      });
    }
  };

  return (
    <Cre8FieldComponent
      type="number"
      value={value?.toString() ?? ''}
      min={min?.toString()}
      max={max?.toString()}
      placeholder={placeholder}
      disabled={disabled}
      label={label}
      onInput={handleInput}
    />
  );
}
