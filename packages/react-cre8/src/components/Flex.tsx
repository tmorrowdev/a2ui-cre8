/**
 * @a2ui-bridge/react-cre8 - Flex component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import type { JSX } from 'react';
import { extractString, extractNumber, extractBoolean } from '../utils.js';

export function Flex({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const props = properties as any;

  const direction = extractString(props.direction) ?? 'row';
  const justify = extractString(props.justify) ?? 'flex-start';
  const align = extractString(props.align) ?? 'stretch';
  const wrap = extractBoolean(props.wrap) ?? false;
  const gap = extractNumber(props.gap) ?? extractString(props.gap);

  const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: direction as any,
    justifyContent: justify,
    alignItems: align,
    flexWrap: wrap ? 'wrap' : 'nowrap',
    ...(gap && { gap: typeof gap === 'number' ? `${gap}px` : gap }),
  };

  return <div style={style}>{children}</div>;
}
