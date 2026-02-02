/**
 * @a2ui-bridge/react-cre8 - ScrollArea component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import type { JSX } from 'react';
import { extractString, cn } from '../utils.js';

export function ScrollArea({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const height = extractString((properties as any).height);
  const width = extractString((properties as any).width);

  const style: React.CSSProperties = {
    overflow: 'auto',
    ...(height && { height }),
    ...(width && { width }),
  };

  return (
    <div className={cn('cre8-scroll-area')} style={style}>
      {children}
    </div>
  );
}
