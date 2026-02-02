/**
 * @a2ui-bridge/react-cre8 - RadioGroup component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8RadioField as Cre8RadioFieldWC, Cre8RadioFieldItem as Cre8RadioFieldItemWC } from '@tmorrow/cre8-wc/cdn';
import { extractString, createPermissiveComponent } from '../utils.js';

const Cre8RadioField = createPermissiveComponent('cre8-radio-field', Cre8RadioFieldWC, {
  onChange: 'change',
});
const Cre8RadioFieldItem = createPermissiveComponent('cre8-radio-field-item', Cre8RadioFieldItemWC);

interface RadioOption {
  value: string | { literalString: string };
  label: string | { literalString: string };
}

export function RadioGroup({
  node,
  onAction,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const props = properties as any;

  const label = extractString(props.label) ?? '';
  const value = extractString(props.value) ?? '';
  const options: RadioOption[] = props.options ?? [];

  const handleChange = (e: Event) => {
    const customEvent = e as CustomEvent;
    const selectedValue = customEvent.detail?.value ?? (e.target as HTMLInputElement)?.value;
    if (props.action?.name) {
      onAction({
        actionName: props.action.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: { value: selectedValue },
      });
    }
  };

  return (
    <Cre8RadioField
      label={label}
      onChange={handleChange}
    >
      {options.map((opt, idx) => {
        const optValue = typeof opt.value === 'object' ? opt.value.literalString : opt.value;
        const optLabel = typeof opt.label === 'object' ? opt.label.literalString : opt.label;
        return (
          <Cre8RadioFieldItem
            key={idx}
            value={optValue}
            label={optLabel}
            checked={value === optValue}
          />
        );
      })}
    </Cre8RadioField>
  );
}
