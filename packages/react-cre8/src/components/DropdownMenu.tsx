/**
 * @a2ui-bridge/react-cre8 - DropdownMenu component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8Dropdown as Cre8DropdownWC, Cre8DropdownItem as Cre8DropdownItemWC } from '@tmorrow/cre8-wc/cdn';
import { extractString, createPermissiveComponent } from '../utils.js';

const Cre8Dropdown = createPermissiveComponent('cre8-dropdown', Cre8DropdownWC);
const Cre8DropdownItem = createPermissiveComponent('cre8-dropdown-item', Cre8DropdownItemWC, {
  onClick: 'click',
});

interface MenuItem {
  label: string | { literalString: string };
  action?: { name: string };
}

export function DropdownMenu({
  node,
  children,
  onAction,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const trigger = extractString((properties as any).trigger) ?? 'Menu';
  const items: MenuItem[] = (properties as any).items ?? [];

  const handleItemClick = (item: MenuItem) => {
    if (item.action?.name) {
      onAction({
        actionName: item.action.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: {},
      });
    }
  };

  return (
    <Cre8Dropdown buttonText={trigger}>
      {items.map((item, idx) => {
        const label = typeof item.label === 'object' ? item.label.literalString : item.label;
        return (
          <Cre8DropdownItem
            key={idx}
            onClick={() => handleItemClick(item)}
          >
            {label}
          </Cre8DropdownItem>
        );
      })}
      {children}
    </Cre8Dropdown>
  );
}
