/**
 * @a2ui-bridge/react-cre8 - AccordionItem component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { CustomNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8AccordionItem as Cre8AccordionItemWC } from '@tmorrow/cre8-wc/cdn';
import { extractString, extractBoolean, createPermissiveComponent } from '../utils.js';

const Cre8AccordionItem = createPermissiveComponent('cre8-accordion-item', Cre8AccordionItemWC);

export function AccordionItem({
  node,
  children,
}: A2UIComponentProps<CustomNode>): JSX.Element {
  const { properties } = node;

  const heading = extractString(properties.heading);
  const isActive = extractBoolean(properties.isActive) ?? false;

  return (
    <Cre8AccordionItem heading={heading} isActive={isActive}>
      {children}
    </Cre8AccordionItem>
  );
}
