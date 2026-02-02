/**
 * @a2ui-bridge/react-cre8 - Slider component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import type { JSX } from 'react';
import { extractString, extractNumber, extractBoolean } from '../utils.js';

export function Slider({
  node,
  onAction,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const props = properties as any;

  const min = extractNumber(props.min) ?? 0;
  const max = extractNumber(props.max) ?? 100;
  const step = extractNumber(props.step) ?? 1;
  const value = extractNumber(props.value) ?? min;
  const disabled = extractBoolean(props.disabled) ?? false;
  const label = extractString(props.label) ?? '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.action?.name) {
      onAction({
        actionName: props.action.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: { value: parseFloat(e.target.value) },
      });
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    height: '8px',
    borderRadius: '4px',
    appearance: 'none',
    backgroundColor: 'var(--cre8-color-background-tertiary, #e5e7eb)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
  };

  return (
    <div style={{ width: '100%' }}>
      {label && (
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
          {label}
        </label>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={handleChange}
        style={inputStyle}
      />
    </div>
  );
}
