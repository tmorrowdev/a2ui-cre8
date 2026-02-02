/**
 * @a2ui-bridge/react-cre8 - TableRow component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8TableRow as Cre8TableRowWC } from '@tmorrow/cre8-wc/cdn';
import { createPermissiveComponent } from '../utils.js';

const Cre8TableRowComponent = createPermissiveComponent('cre8-table-row', Cre8TableRowWC);

export function TableRow({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  return <Cre8TableRowComponent>{children}</Cre8TableRowComponent>;
}
