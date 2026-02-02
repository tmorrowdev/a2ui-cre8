/**
 * @a2ui-bridge/react-cre8 - Row component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { RowNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { renderChildren } from '@a2ui-bridge/react';
import { cn } from '../utils.js';

const distributionStyles: Record<string, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  spaceBetween: 'space-between',
  spaceAround: 'space-around',
  spaceEvenly: 'space-evenly',
};

const alignmentStyles: Record<string, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
};

export function Row({
  node,
  onAction,
  components,
  surfaceId,
}: A2UIComponentProps<RowNode>): JSX.Element {
  const { properties } = node;

  const distribution = properties.distribution ?? 'start';
  const alignment = properties.alignment ?? 'center';

  const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: distributionStyles[distribution] ?? 'flex-start',
    alignItems: alignmentStyles[alignment] ?? 'center',
    gap: '8px',
  };

  return (
    <div style={style}>
      {renderChildren(properties.children ?? [], components, onAction, surfaceId)}
    </div>
  );
}
