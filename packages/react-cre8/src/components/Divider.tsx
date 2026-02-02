/**
 * @a2ui-bridge/react-cre8 - Divider component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { DividerNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8Divider as Cre8DividerWC } from '@tmorrow/cre8-wc/cdn';
import { createPermissiveComponent } from '../utils.js';

const Cre8Divider = createPermissiveComponent('cre8-divider', Cre8DividerWC);

export function Divider({ node }: A2UIComponentProps<DividerNode>): JSX.Element {
  return <Cre8Divider />;
}
