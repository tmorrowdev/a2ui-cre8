/**
 * @a2ui-bridge/react-cre8 - TabPanel component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8TabPanel as Cre8TabPanelWC } from '@tmorrow/cre8-wc/cdn';
import { createPermissiveComponent } from '../utils.js';

const Cre8TabPanelComponent = createPermissiveComponent('cre8-tab-panel', Cre8TabPanelWC);

export function TabPanel({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  return <Cre8TabPanelComponent>{children}</Cre8TabPanelComponent>;
}
