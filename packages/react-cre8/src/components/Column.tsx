/**
 * @a2ui-bridge/react-cre8 - Column component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { ColumnNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { renderChildren } from '@a2ui-bridge/react';

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

export function Column({
  node,
  onAction,
  components,
  surfaceId,
}: A2UIComponentProps<ColumnNode>): JSX.Element {
  const { properties } = node;

  const distribution = properties.distribution ?? 'start';
  const alignment = properties.alignment ?? 'stretch';

  const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: distributionStyles[distribution] ?? 'flex-start',
    alignItems: alignmentStyles[alignment] ?? 'stretch',
    gap: '8px',
  };

  return (
    <div style={style}>
      {renderChildren(properties.children ?? [], components, onAction, surfaceId)}
    </div>
  );
}
