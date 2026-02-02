/**
 * @a2ui-bridge/react-cre8 - Select component
 * MIT License - Copyright (c) 2025 southleft
 */

import React, { useState } from 'react';
import type { SelectNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8Select as Cre8SelectWC } from '@tmorrow/cre8-wc/cdn';
import { extractString, createPermissiveComponent } from '../utils.js';

const Cre8Select = createPermissiveComponent('cre8-select', Cre8SelectWC);

export function Select({
  node,
}: A2UIComponentProps<SelectNode>): JSX.Element {
  const { properties } = node;

  const label = extractString(properties.label) ?? '';
  const placeholder = extractString(properties.placeholder) ?? 'Select an option';
  const initialValue = extractString(properties.value) ?? '';
  const [selectedValue, setSelectedValue] = useState(initialValue);

  // Map A2UI options to standard format
  const options = properties.options?.map((opt) => ({
    value: opt.value,
    label: opt.label?.literalString ?? opt.label?.path ?? opt.value,
  })) ?? [];

  const handleChange = (e: React.FormEvent<HTMLElement>) => {
    const target = e.target as HTMLSelectElement;
    setSelectedValue(target.value);
  };

  return (
    <Cre8Select
      label={label}
      value={selectedValue}
      onChange={handleChange}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </Cre8Select>
  );
}
