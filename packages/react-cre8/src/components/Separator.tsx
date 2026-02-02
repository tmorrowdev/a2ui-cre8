/**
 * @a2ui-bridge/react-cre8 - Separator component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8Divider as Cre8DividerWC } from '@tmorrow/cre8-wc/cdn';
import { extractString, createPermissiveComponent } from '../utils.js';

const Cre8DividerComponent = createPermissiveComponent('cre8-divider', Cre8DividerWC);

export function Separator({
  node,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const orientationStr = extractString((properties as any).orientation) ?? 'horizontal';
  const orientation: 'horizontal' | 'vertical' = orientationStr === 'vertical' ? 'vertical' : 'horizontal';

  return <Cre8DividerComponent variant={orientation} />;
}
