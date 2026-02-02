/**
 * @a2ui-bridge/react-cre8 - TableHeader component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8TableHeader as Cre8TableHeaderWC } from '@tmorrow/cre8-wc/cdn';
import { createPermissiveComponent } from '../utils.js';

const Cre8TableHeaderComponent = createPermissiveComponent('cre8-table-header', Cre8TableHeaderWC);

export function TableHeader({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  return <Cre8TableHeaderComponent>{children}</Cre8TableHeaderComponent>;
}
