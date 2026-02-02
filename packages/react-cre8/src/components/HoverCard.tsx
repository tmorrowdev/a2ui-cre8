/**
 * @a2ui-bridge/react-cre8 - HoverCard component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8Popover as Cre8PopoverWC } from '@tmorrow/cre8-wc/cdn';
import React, { useState } from 'react';
import { extractString, createPermissiveComponent } from '../utils.js';

const Cre8PopoverComponent = createPermissiveComponent('cre8-popover', Cre8PopoverWC);

export function HoverCard({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const content = extractString((properties as any).content) ?? '';
  const position = extractString((properties as any).position) ?? 'bottom';

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      style={{ display: 'inline-block', position: 'relative' }}
    >
      {children}
      <Cre8PopoverComponent position={position as any} isActive={isOpen}>
        {content}
      </Cre8PopoverComponent>
    </div>
  );
}
