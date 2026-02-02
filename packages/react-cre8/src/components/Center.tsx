/**
 * @a2ui-bridge/react-cre8 - Center component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import type { JSX } from 'react';

export function Center({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const style: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return <div style={style}>{children}</div>;
}
