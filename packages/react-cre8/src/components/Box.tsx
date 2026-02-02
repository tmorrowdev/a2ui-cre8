/**
 * @a2ui-bridge/react-cre8 - Box component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import type { JSX } from 'react';
import { extractString, extractNumber } from '../utils.js';

export function Box({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const props = properties as any;

  const padding = extractNumber(props.padding) ?? extractString(props.padding);
  const margin = extractNumber(props.margin) ?? extractString(props.margin);
  const bg = extractString(props.background) ?? extractString(props.bg);

  const style: React.CSSProperties = {
    ...(padding && { padding: typeof padding === 'number' ? `${padding}px` : padding }),
    ...(margin && { margin: typeof margin === 'number' ? `${margin}px` : margin }),
    ...(bg && { background: bg }),
  };

  return <div style={style}>{children}</div>;
}
