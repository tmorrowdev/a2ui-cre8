/**
 * @a2ui-bridge/react-cre8 - AspectRatio component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import type { JSX } from 'react';
import { extractNumber } from '../utils.js';

export function AspectRatio({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const ratio = extractNumber((properties as any).ratio) ?? 1;

  const style: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    paddingBottom: `${(1 / ratio) * 100}%`,
  };

  const innerStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
  };

  return (
    <div style={style}>
      <div style={innerStyle}>{children}</div>
    </div>
  );
}
