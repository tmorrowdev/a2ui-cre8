/**
 * @a2ui-bridge/react-cre8 - Switch component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import type { JSX } from 'react';
import { extractString, extractBoolean } from '../utils.js';

export function Switch({
  node,
  onAction,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const props = properties as any;

  const label = extractString(props.label) ?? '';
  const checked = extractBoolean(props.checked) ?? false;
  const disabled = extractBoolean(props.disabled) ?? false;

  const handleChange = () => {
    if (props.action?.name) {
      onAction({
        actionName: props.action.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: { checked: !checked },
      });
    }
  };

  const trackStyle: React.CSSProperties = {
    position: 'relative',
    width: '44px',
    height: '24px',
    borderRadius: '12px',
    backgroundColor: checked
      ? 'var(--cre8-color-action-primary-default, #2563eb)'
      : 'var(--cre8-color-background-tertiary, #d1d5db)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'background-color 0.2s ease',
  };

  const thumbStyle: React.CSSProperties = {
    position: 'absolute',
    top: '2px',
    left: checked ? '22px' : '2px',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: 'white',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    transition: 'left 0.2s ease',
  };

  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: disabled ? 'not-allowed' : 'pointer' }}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={handleChange}
        style={{ ...trackStyle, border: 'none', padding: 0 }}
      >
        <span style={thumbStyle} />
      </button>
      {label && <span>{label}</span>}
    </label>
  );
}
