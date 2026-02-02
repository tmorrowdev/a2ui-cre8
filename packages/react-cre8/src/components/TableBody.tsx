/**
 * @a2ui-bridge/react-cre8 - TableBody component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8TableBody as Cre8TableBodyWC } from '@tmorrow/cre8-wc/cdn';
import { createPermissiveComponent } from '../utils.js';

const Cre8TableBodyComponent = createPermissiveComponent('cre8-table-body', Cre8TableBodyWC);

export function TableBody({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  return <Cre8TableBodyComponent>{children}</Cre8TableBodyComponent>;
}
