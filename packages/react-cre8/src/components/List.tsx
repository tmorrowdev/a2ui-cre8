/**
 * @a2ui-bridge/react-cre8 - List component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8List as Cre8ListWC } from '@tmorrow/cre8-wc/cdn';
import { createPermissiveComponent } from '../utils.js';

const Cre8ListComponent = createPermissiveComponent('cre8-list', Cre8ListWC);

export function List({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  return <Cre8ListComponent>{children}</Cre8ListComponent>;
}
