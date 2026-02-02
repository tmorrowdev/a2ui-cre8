/**
 * @a2ui-bridge/react-cre8 - Blockquote component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import type { JSX } from 'react';
import { extractString } from '../utils.js';

export function Blockquote({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const text = extractString((properties as any).text) ?? '';
  const cite = extractString((properties as any).cite);

  const style: React.CSSProperties = {
    borderLeft: '4px solid var(--cre8-color-border-default, #d1d5db)',
    paddingLeft: '1rem',
    margin: '1rem 0',
    fontStyle: 'italic',
    color: 'var(--cre8-color-text-secondary, #6b7280)',
  };

  return (
    <blockquote style={style} cite={cite}>
      {text || children}
    </blockquote>
  );
}
