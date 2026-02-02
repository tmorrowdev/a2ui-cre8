/**
 * @a2ui-bridge/react-cre8 - Checkbox component
 * MIT License - Copyright (c) 2025 southleft
 */

import React, { useState } from 'react';
import type { CheckboxNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8CheckboxField as Cre8CheckboxFieldWC, Cre8CheckboxFieldItem as Cre8CheckboxFieldItemWC } from '@tmorrow/cre8-wc/cdn';
import { extractString, extractBoolean, createPermissiveComponent } from '../utils.js';

const Cre8CheckboxField = createPermissiveComponent('cre8-checkbox-field', Cre8CheckboxFieldWC);
const Cre8CheckboxFieldItem = createPermissiveComponent('cre8-checkbox-field-item', Cre8CheckboxFieldItemWC);

export function Checkbox({
  node,
}: A2UIComponentProps<CheckboxNode>): JSX.Element {
  const { properties } = node;

  const label = extractString(properties.label) ?? '';
  const initialChecked = extractBoolean(properties.value) ?? false;
  const [checked, setChecked] = useState(initialChecked);

  const handleChange = (e: React.FormEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement;
    setChecked(target.checked);
  };

  return (
    <Cre8CheckboxField>
      <Cre8CheckboxFieldItem
        label={label}
        checked={checked}
        onChange={handleChange}
      />
    </Cre8CheckboxField>
  );
}
