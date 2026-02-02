/**
 * @a2ui-bridge/react-cre8 - Popover component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8Popover as Cre8PopoverWC } from '@tmorrow/cre8-wc/cdn';
import { extractString, extractBoolean, createPermissiveComponent } from '../utils.js';

const Cre8PopoverComponent = createPermissiveComponent('cre8-popover', Cre8PopoverWC);

export function Popover({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const position = extractString((properties as any).position) ?? 'bottom';
  const open = extractBoolean((properties as any).open) ?? false;

  return (
    <Cre8PopoverComponent position={position as any} isActive={open}>
      {children}
    </Cre8PopoverComponent>
  );
}
