/**
 * @a2ui-bridge/react-cre8 - Input component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8Field as Cre8FieldWC } from '@tmorrow/cre8-wc/cdn';
import { extractString, extractBoolean, createPermissiveComponent } from '../utils.js';

const Cre8FieldComponent = createPermissiveComponent('cre8-field', Cre8FieldWC, {
  onChange: 'change',
  onInput: 'input',
});

type Cre8InputType = 'text' | 'number' | 'email' | 'url' | 'tel' | 'password' | 'date';

export function Input({
  node,
  onAction,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const props = properties as any;

  const typeMap: Record<string, Cre8InputType> = {
    text: 'text',
    number: 'number',
    email: 'email',
    url: 'url',
    tel: 'tel',
    password: 'password',
    date: 'date',
  };

  const rawType = extractString(props.type) ?? 'text';
  const type = typeMap[rawType] ?? 'text';
  const placeholder = extractString(props.placeholder) ?? '';
  const value = extractString(props.value) ?? '';
  const disabled = extractBoolean(props.disabled) ?? false;
  const label = extractString(props.label) ?? '';

  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
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
    <Cre8FieldComponent
      type={type}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      label={label}
      onInput={handleInput}
    />
  );
}
