/**
 * @a2ui-bridge/react-cre8 - TextArea component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import type { JSX } from 'react';
import { extractString, extractBoolean, extractNumber } from '../utils.js';

export function TextArea({
  node,
  onAction,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const props = properties as any;

  const placeholder = extractString(props.placeholder) ?? '';
  const value = extractString(props.value) ?? '';
  const disabled = extractBoolean(props.disabled) ?? false;
  const label = extractString(props.label) ?? '';
  const rows = extractNumber(props.rows) ?? 4;

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (props.action?.name) {
      onAction({
        actionName: props.action.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: { value: e.target.value },
      });
    }
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 'var(--cre8-typography-label-default-font-size, 0.875rem)',
    fontWeight: 'var(--cre8-typography-label-default-font-weight, 500)',
  };

  const textareaStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.5rem 0.75rem',
    fontSize: '1rem',
    border: '1px solid var(--cre8-color-border-default, #d1d5db)',
    borderRadius: '0.375rem',
    resize: 'vertical',
    fontFamily: 'inherit',
  };

  return (
    <div style={containerStyle}>
      {label && <label style={labelStyle}>{label}</label>}
      <textarea
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        rows={rows}
        onChange={handleInput}
        style={textareaStyle}
      />
    </div>
  );
}
