/**
 * @a2ui-bridge/react-cre8 - Code component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import type { JSX } from 'react';
import { extractString, extractBoolean } from '../utils.js';

export function Code({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const code = extractString((properties as any).code) ?? '';
  const isBlock = extractBoolean((properties as any).block) ?? false;

  const inlineStyle: React.CSSProperties = {
    fontFamily: 'var(--cre8-font-family-mono, monospace)',
    fontSize: '0.875em',
    backgroundColor: 'var(--cre8-color-background-secondary, #f3f4f6)',
    padding: '0.125rem 0.25rem',
    borderRadius: '0.25rem',
  };

  const blockStyle: React.CSSProperties = {
    ...inlineStyle,
    display: 'block',
    padding: '1rem',
    overflow: 'auto',
    whiteSpace: 'pre',
  };

  if (isBlock) {
    return <pre style={blockStyle}><code>{code || children}</code></pre>;
  }

  return <code style={inlineStyle}>{code || children}</code>;
}
