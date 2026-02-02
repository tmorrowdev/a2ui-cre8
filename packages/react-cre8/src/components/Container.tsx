/**
 * @a2ui-bridge/react-cre8 - Container component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8LayoutContainer as Cre8LayoutContainerWC } from '@tmorrow/cre8-wc/cdn';
import { createPermissiveComponent } from '../utils.js';

const Cre8LayoutContainerComponent = createPermissiveComponent('cre8-layout-container', Cre8LayoutContainerWC);

export function Container({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  return <Cre8LayoutContainerComponent>{children}</Cre8LayoutContainerComponent>;
}
