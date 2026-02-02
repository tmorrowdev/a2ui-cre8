/**
 * @a2ui-bridge/react-cre8 - Grid component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8Grid as Cre8GridWC } from '@tmorrow/cre8-wc/cdn';
import { createPermissiveComponent } from '../utils.js';

const Cre8GridComponent = createPermissiveComponent('cre8-grid', Cre8GridWC);

export function Grid({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  return <Cre8GridComponent>{children}</Cre8GridComponent>;
}
