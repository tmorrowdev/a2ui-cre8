/**
 * @a2ui-bridge/react-cre8 - TextField component
 * MIT License - Copyright (c) 2025 southleft
 */

import React, { useState } from 'react';
import type { TextFieldNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8Field as Cre8FieldWC } from '@tmorrow/cre8-wc/cdn';
import { extractString, createPermissiveComponent } from '../utils.js';

const Cre8Field = createPermissiveComponent('cre8-field', Cre8FieldWC);

export function TextField({
  node,
}: A2UIComponentProps<TextFieldNode>): JSX.Element {
  const { properties } = node;

  const label = extractString(properties.label) ?? '';
  const initialValue = extractString(properties.text) ?? '';
  const [value, setValue] = useState(initialValue);

  // Map A2UI type to HTML input type
  const typeMap: Record<string, 'text' | 'number' | 'date' | 'email' | 'url' | 'tel' | 'password'> = {
    shortText: 'text',
    number: 'number',
    date: 'date',
    longText: 'text',
    email: 'email',
    url: 'url',
    tel: 'tel',
    password: 'password',
  };
  const inputType = properties.type ? typeMap[properties.type] ?? 'text' : 'text';

  const handleInput = (e: React.FormEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement;
    setValue(target.value);
  };

  return (
    <Cre8Field
      label={label}
      value={value}
      type={inputType}
      onInput={handleInput}
    />
  );
}
