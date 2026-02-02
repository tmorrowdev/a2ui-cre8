/**
 * @a2ui-bridge/react-cre8 - Tooltip component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8Tooltip as Cre8TooltipWC } from '@tmorrow/cre8-wc/cdn';
import { extractString, createPermissiveComponent } from '../utils.js';

const Cre8TooltipComponent = createPermissiveComponent('cre8-tooltip', Cre8TooltipWC);

export function Tooltip({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const content = extractString((properties as any).content) ?? '';
  const position = extractString((properties as any).position) ?? 'top';

  return (
    <Cre8TooltipComponent content={content} position={position as any}>
      {children}
    </Cre8TooltipComponent>
  );
}
