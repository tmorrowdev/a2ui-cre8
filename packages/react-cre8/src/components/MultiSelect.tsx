/**
 * @a2ui-bridge/react-cre8 - MultiSelect component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8MultiSelect as Cre8MultiSelectWC } from '@tmorrow/cre8-wc/cdn';
import { extractString, extractBoolean, createPermissiveComponent } from '../utils.js';

const Cre8MultiSelectComponent = createPermissiveComponent('cre8-multi-select', Cre8MultiSelectWC, {
  onChange: 'change',
});

interface SelectOption {
  value: string | { literalString: string };
  label: string | { literalString: string };
}

export function MultiSelect({
  node,
  onAction,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const props = properties as any;

  const label = extractString(props.label) ?? '';
  const options: SelectOption[] = props.options ?? [];
  const disabled = extractBoolean(props.disabled) ?? false;

  // Format options for cre8-multi-select (uses string array)
  const items = options.map((opt) => {
    const optLabel = typeof opt.label === 'object' ? opt.label.literalString : opt.label;
    return optLabel;
  });

  const handleChange = (e: Event) => {
    const customEvent = e as CustomEvent;
    const selectedValues = customEvent.detail?.selectedItems ?? customEvent.detail?.values ?? [];
    if (props.action?.name) {
      onAction({
        actionName: props.action.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: { values: selectedValues },
      });
    }
  };

  return (
    <Cre8MultiSelectComponent
      label={label}
      items={items}
      disabled={disabled}
      onChange={handleChange}
    />
  );
}
