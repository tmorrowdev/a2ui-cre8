/**
 * @a2ui-bridge/react-cre8 - TableCell component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8TableCell as Cre8TableCellWC, Cre8TableHeaderCell as Cre8TableHeaderCellWC } from '@tmorrow/cre8-wc/cdn';
import { extractBoolean, createPermissiveComponent } from '../utils.js';

const Cre8TableCellComponent = createPermissiveComponent('cre8-table-cell', Cre8TableCellWC);
const Cre8TableHeaderCellComponent = createPermissiveComponent('cre8-table-header-cell', Cre8TableHeaderCellWC);

export function TableCell({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const isHeader = extractBoolean((properties as any).isHeader) ?? false;

  if (isHeader) {
    return <Cre8TableHeaderCellComponent>{children}</Cre8TableHeaderCellComponent>;
  }

  return <Cre8TableCellComponent>{children}</Cre8TableCellComponent>;
}
