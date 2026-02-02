/**
 * @a2ui-bridge/react-cre8 - Label component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import type { JSX } from 'react';
import { extractString } from '../utils.js';

export function Label({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const text = extractString((properties as any).text) ?? '';
  const htmlFor = extractString((properties as any).htmlFor);

  return (
    <label
      htmlFor={htmlFor}
      style={{
        fontSize: 'var(--cre8-typography-label-default-font-size, 0.875rem)',
        fontWeight: 'var(--cre8-typography-label-default-font-weight, 500)',
        lineHeight: 'var(--cre8-typography-label-default-line-height, 1.25rem)',
      }}
    >
      {text || children}
    </label>
  );
}
